import { useState, useEffect } from "react";

const PinModal = ({ isOpen, onClose, onPinSubmit }) => {
  const [pin, setPin] = useState(["", "", "", ""]); // Array to store each digit of the PIN
  const [counter, setCounter] = useState(30); // 30-second timer
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  // Handle timer countdown
  useEffect(() => {
    let timer;
    if (isOpen && counter > 0) {
      timer = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
    } else if (counter === 0) {
      setIsResendDisabled(false);
    }
    return () => clearInterval(timer);
  }, [isOpen, counter]);

  // Handle PIN input change
  const handlePinChange = (index, value) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto-focus to the next input
    if (value && index < 3) {
      document.getElementById(`pin-input-${index + 1}`).focus();
    }
  };

  // Handle resend PIN
  const handleResend = () => {
    setCounter(30);
    setIsResendDisabled(true);
    // Add logic to resend the PIN here
    console.log("Resend PIN clicked");
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const fullPin = pin.join("");
    onPinSubmit(fullPin);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto h-auto max-h-[80vh] overflow-y-auto flex flex-col gap-4">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-xl sm:text-2xl font-bold text-center">Set Up a PIN</h2>
        <p className="text-gray-600 text-center text-sm sm:text-base">
          Enter your 4 digits pin
        </p>

        {/* PIN Input Fields */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="flex justify-center gap-3 sm:gap-4">
            {pin.map((digit, index) => (
              <input
                key={index}
                id={`pin-input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handlePinChange(index, e.target.value)}
                className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 text-lg"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            ))}
          </div>

          {/* Verify Button */}
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className="w-full bg-yellow-500 bg-yellow text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors text-sm sm:text-base"
            >
              CONFIRM PIN
            </button>
            
            <div className="text-center text-gray-500 text-xs sm:text-sm">
              {isResendDisabled ? (
                `Resend in 00:${counter < 10 ? `0${counter}` : counter}`
              ) : (
                <button
                  onClick={handleResend}
                  className="w-full bg-yellow-500 bg-yellow text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors text-sm sm:text-base"
                >
                  Resend PIN
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PinModal;