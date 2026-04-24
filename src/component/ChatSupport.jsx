// components/ChatSupport.jsx
import { useState, useEffect, useRef, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import chatLogo from "../assets/chatLogo.png";
import { RxCrossCircled } from "react-icons/rx";
import { TbWindowMaximize, TbWindowMinimize } from "react-icons/tb";
import { IoArrowUpCircleSharp, IoMicOutline } from "react-icons/io5";
import { ImAttachment } from "react-icons/im";

// Constants
const BOT_RESPONSES = [
  "I'm here to help with your course questions!",
  "That's a great question! Let me check that for you.",
  "I can help you navigate through the course materials.",
  "Have you checked the module resources for this information?",
  "Let me guide you to the right section for your query."
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const BOT_RESPONSE_DELAY = 1000;

// Memoized sub-components
const ChatHeader = memo(function ChatHeader({ isMaximized, toggleMaximize, toggleChat }) {
  return (
  <div className="bg-card text-foreground p-4 flex justify-between items-center border-b border-border">
    <h2 className="text-xl font-bold">Robotronics AI</h2>
    <div className="flex items-center gap-x-2">
      <button
        onClick={toggleMaximize}
        className="text-muted-foreground hover:text-muted-foreground text-xl p-1"
        aria-label={isMaximized ? "Minimize" : "Maximize"}
        aria-expanded={isMaximized}
      >
        {isMaximized ? <TbWindowMinimize size={20} /> : <TbWindowMaximize size={20} />}
      </button>
      <button
        onClick={toggleChat}
        className="text-muted-foreground hover:text-muted-foreground text-xl p-1"
        aria-label="Close chat"
      >
        <RxCrossCircled size={20} />
      </button>
    </div>
  </div>
  );
});

const Message = memo(function Message({ message }) {
  return (
  <div
    className={`max-w-[80%] p-4 rounded-lg ${message.sender === 'user'
      ? 'bg-primary text-background rounded-br-none'
      : 'bg-card text-muted-foreground rounded-bl-none border border-border'}`}
    role={message.sender === 'user' ? 'status' : 'article'}
    aria-live={message.sender === 'bot' ? 'polite' : 'off'}
  >
    {message.file && (
      <div className="mb-2 flex items-center">
        <ImAttachment className="mr-2" />
        <span className="text-sm">{message.file.name}</span>
      </div>
    )}
    <div className="text-base break-words whitespace-pre-wrap">
      {message.text}
    </div>
    <div className={`text-xs mt-2 ${message.sender === 'user' ? 'text-background' : 'text-muted-foreground'}`}>
      {message.time}
    </div>
  </div>
  );
});

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);

  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Initialize chat with welcome message
  const initializeChat = useCallback(() => {
    setMessages([{
      text: "Hello! I'm Robotronic's AI. How can I help you with your course today?",
      sender: "bot",
      time: formatTime(new Date())
    }]);
  }, []);

  // Format time helper
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Check for speech recognition support
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      setIsSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(prev => prev ? `${prev} ${transcript}` : transcript);
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        alert('Speech recognition failed. Please try again.');
      };

      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
      }
    };
  }, []);

  // Initialize chat on first render
  useEffect(() => {
    initializeChat();
  }, [initializeChat]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleChat = () => {
    setIsOpen(prev => {
      const newState = !prev;
      if (!newState) {
        setIsMaximized(false);
      }
      return newState;
    });
  };

  const toggleMaximize = () => {
    setIsMaximized(prev => !prev);
  };

  const toggleVoiceInput = useCallback(() => {
    if (!isSpeechSupported) {
      alert('Voice input is not supported in your browser. Try Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        alert('Error starting voice input. Please try again.');
      }
    }
  }, [isListening, isSpeechSupported]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert('File size too large (max 5MB)');
      return;
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      alert('Only JPEG, PNG, and PDF files are allowed');
      return;
    }

    setSelectedFile(file);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if ((inputMessage.trim() === "" && !selectedFile) || isSending) return;

    setIsSending(true);

    const newMessage = {
      text: inputMessage,
      sender: "user",
      time: formatTime(new Date()),
      file: selectedFile ? {
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size
      } : null
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");
    setSelectedFile(null);

    // Show typing indicator
    setIsBotTyping(true);

    // Simulate bot response with delay
    setTimeout(() => {
      const botMessage = {
        text: BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)],
        sender: "bot",
        time: formatTime(new Date())
      };

      setMessages(prev => [...prev, botMessage]);
      setIsSending(false);
      setIsBotTyping(false);
    }, BOT_RESPONSE_DELAY);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage(e);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-floating" ref={chatContainerRef}>
      {!isOpen ? (
        <button
          onClick={toggleChat}
          className="focus:outline-none focus:ring-2 focus:ring-ring rounded-2xl"
          aria-label="Open chat support"
        >
          <img
            src={chatLogo}
            alt="Chat Support"
            className="w-[186px] h-[70px] cursor-pointer hover:opacity-90 transition-opacity rounded-2xl"
          />
        </button>
      ) : (
        <div
          className={`
            fixed ${isMaximized ?
              'inset-0 m-auto w-chat-panel-width h-chat-panel-height rounded-3xl flex' :
              'bottom-0 right-0 w-[450px] h-[600px] rounded-3xl'
            } bg-card shadow-xl overflow-hidden border border-primary transition-all duration-300 relative
          `}
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-header"
        >
          <div
  className={`
    absolute bottom-0 left-1/2 transform -translate-x-1/2
    ${isMaximized ? 'w-[900px] h-[400px] left-[calc(50%+130px)]' : 'w-[600px] h-[300px]'}
    bg-gradient-to-br from-primary to-accent
    opacity-35 blur-xl z-base
    rounded-t-full
    pointer-events-none
  `}
/>




          {isMaximized && (
            <div className="w-64 bg-info/10 border-r border-border flex flex-col">
              <div className="p-4 border-b border-border">
                <h2 className="text-lg font-semibold">Chat History</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="p-3 hover:bg-background rounded-lg cursor-pointer border-t border-border first:border-t-0"
                  >
                    <p className="text-sm font-medium truncate">Sample conversation {item}</p>
                    <p className="text-xs text-muted-foreground">{item === 1 ? 'Yesterday' : `${item} days ago`}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-border">
                <button
                  className="w-full py-2 bg-primary text-background rounded-lg hover:bg-accent transition-colors"
                  onClick={initializeChat}
                  aria-label="Start new chat"
                >
                  New Chat
                </button>
              </div>
            </div>
          )}

          <div className="flex-1 flex flex-col h-full">
            <ChatHeader
              isMaximized={isMaximized}
              toggleMaximize={toggleMaximize}
              toggleChat={toggleChat}
            />

            <div
              className="flex-1 p-4 overflow-y-auto overflow-x-hidden bg-card"
              aria-live="polite"
              aria-atomic="true"
            >
              {messages.map((message, index) => (
                <div
                  key={`${index}-${message.time}`}
                  className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <Message message={message} />
                </div>
              ))}
              {isBotTyping && (
                <div className="mb-4 flex justify-start">
                  <div className="max-w-[80%] p-4 rounded-lg bg-card text-muted-foreground rounded-bl-none border border-border">
                    <div className="flex gap-x-2">
                      <div className="size-2 rounded-full bg-muted animate-bounce"></div>
                      <div className="size-2 rounded-full bg-muted animate-bounce animation-delay-200"></div>
                      <div className="size-2 rounded-full bg-muted animate-bounce animation-delay-400"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4  relative">
              {selectedFile && (
                <div className="flex items-center justify-between mb-2 px-3 py-2 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <ImAttachment className="mr-2 text-muted-foreground" />
                    <span className="text-sm truncate max-w-xs">{selectedFile.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="text-muted-foreground hover:text-muted-foreground ml-2"
                    aria-label="Remove file"
                  >
                    ×
                  </button>
                </div>
              )}
              <div className="relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="w-full border border-foreground rounded-3xl px-14 py-3 bg-transparent shadow-md focus:outline-none focus:ring-2 focus:ring-ring text-base"
                  aria-label="Type your message"
                  disabled={isSending}
                />

                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex gap-x-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="text-muted-foreground hover:text-primary focus:text-primary focus:outline-none"
                    aria-label="Attach file"
                    disabled={isSending}
                  >
                    <ImAttachment size={20} />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.pdf"
                    disabled={isSending}
                  />
                </div>

                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-x-2">
                  {isSpeechSupported && (
                    <button
                      type="button"
                      onClick={toggleVoiceInput}
                      className={`${isListening ? 'text-destructive animate-pulse' : 'text-muted-foreground hover:text-primary'} focus:outline-none`}
                      aria-label={isListening ? "Stop listening" : "Start voice input"}
                      disabled={isSending}
                    >
                      <IoMicOutline size={20} />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="text-primary hover:text-accent disabled:opacity-50 focus:outline-none"
                    disabled={isSending || (!inputMessage.trim() && !selectedFile)}
                    aria-label="Send message"
                  >
                    <IoArrowUpCircleSharp size={35} />
                  </button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Robotronics AI can make mistakes. Check our
                <Link to="/TermsConditions" className="ml-1 text-primary hover:underline">Terms & Conditions</Link>.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSupport;
