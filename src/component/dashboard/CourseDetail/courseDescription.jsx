import { useState } from "react";
import { AiOutlineRight, AiOutlineDown } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import ReactPlayer from "react-player";
import ReviewsComponent from "../../../pages/RoboGenius/Robogeniusreview";

const CourseDescription = () => {
  // Sample course data in JSON format
  const courseData = {
    _id: {
      $oid: "67dcf32eda1d2db35bb0b0a7",
    },
    title: "Advanced Web Development",
    description:
      "Animations & Game Development COurse is one of the most vibrant, colorful and interesting course. In this course, students will build interactive Animations and Games using block-based coding technique. The course will be conducted on Scratch 3.0 which is build by MIT University. Scratch 3.0 is one of the best tool to learn Programming Basics. This course is the best option to start your Coding and Programming Journey with Scratch.",
    category: "Development",
    comingSoon: false,
    reviews: 11033,
    date: {
      $date: {
        $numberLong: "-23890291200000",
      },
    },
    studentsDownloaded: 113,
    freeTrial: true,
    features: [
      "Hands-on projects",
      "Certificate of completion",
      "24/7 support",
      "Community access",
    ],
    whatYouLearn: [
      "Introduction to Software and Blocks",
      "World of Animations",
      "Animate a Conversational Story",
      "Let's make a Magic Show",
      "Welcome to Game Development",
      "The Ping Pong Game",

    ],
    options: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    thumbnail: "uploads/Courses/1742533422531-Picture1.png",
    banner: "uploads/Courses/1742533422532-Picture1.png",
    video: "uploads/Courses/1742533422535-Recording 2024-12-27 162607.mp4",
    numModules: 4,
    numLessons: 24,
    numQuizzes: 4,
    month: 3,
    sections: [
      {
        name: "Introduction to Software and Blocks",
        modules: [
          {
            id: "5fe135a5-eb5d-44d0-af49-4784efeaedbc",
            name: "What is Scratch?",
            contents: [
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f198",
                type: "video",
                name: "Lecture No 1",
                file: "https://youtu.be/xLdXMzlDonI",
              },
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f199",
                type: "pdf",
                name: "Project Code",
                file: "http://localhost:8080/uploads/Courses/1.pdf",
              },
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f190",
                type: "pdf",
                name: "Practice Assignment",
                file: "http://localhost:8080/uploads/Courses/1.pdf",
              },
            ],
          },
          {
            id: "5fe135a5-eb5d-44d0-af49-4784efeaedbd",
            name: "Learn about Blocks and Commands",
            contents: [
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f201",
                type: "video",
                name: "Lecture No 2",
                file: "https://youtu.be/xL6Ke6ELqP8",
              },
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f199",
                type: "pdf",
                name: "Project Code",
                file: "http://localhost:8080/uploads/Courses/1.pdf",
              },
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f190",
                type: "pdf",
                name: "Practice Assignment",
                file: "http://localhost:8080/uploads/Courses/1.pdf",
              },
            ],
         
          },
          {
            id: "5fe135a5-eb5d-44d0-af49-4784efeaedbe",
            name: "Select your backdrop and sprites",
            contents: [
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f203",
                type: "video",
                name: "Lecture No 3",
                file: "https://youtu.be/F4ZimL5dhvM",
              },
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f199",
                type: "pdf",
                name: "Project Code",
                file: "http://localhost:8080/uploads/Courses/1.pdf",
              },
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f190",
                type: "pdf",
                name: "Practice Assignment",
                file: "http://localhost:8080/uploads/Courses/1.pdf",
              },
            ],
          
          },
          {
            id: "5fe135a5-eb5d-44d0-af49-4784efeaedbf",
            name: "Move your sprite, Draw different shapes and Make it Run",
            contents: [
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f204",
                type: "video",
                name: "Lecture No 4",
                file: "https://youtu.be/nrO8CM_rZg0",
              },
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f199",
                type: "pdf",
                name: "Project Code",
                file: "http://localhost:8080/uploads/Courses/1.pdf",
              },
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f190",
                type: "pdf",
                name: "Practice Assignment",
                file: "http://localhost:8080/uploads/Courses/1.pdf",
              },
            ],
          
          },
        ],
        quiz: {
          questions: [
            {
              id: "q1",
              question: "What is the purpose of HTML?",
              options: [
                "To style web pages",
                "To structure web content",
                "To add interactivity to web pages",
                "To create databases"
              ],
              correctAnswer: "To structure web content"
            },
            {
              id: "q2",
              question: "Which tag is used to create a hyperlink in HTML?",
              options: [
                "<link>",
                "<a>",
                "<href>",
                "<url>"
              ],
              correctAnswer: "<a>"
            }
          ],
        },
        quizEnabled: true,
      },
      {
        name: "World of Animations",
        modules: [
          {
            id: "5fe135a5-eb5d-44d0-af49-4784efeaedc0",
            name: "How are Animations created?",
            contents: [
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f205",
                type: "video",
                name: "Introduction to JavaScript",
                file: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
              },
            ],
            learningObjectives: [
              "Understand JavaScript syntax",
              "Learn about variables and data types",
              "Write your first JavaScript program",
            ],
          },
          {
            id: "5fe135a5-eb5d-44d0-af49-4784efeaedc1",
            name: "Let's start animating our name.",
            contents: [
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f206",
                type: "video",
                name: "JavaScript Functions",
                file: "https://www.youtube.com/watch?v=N8ap4k_1QEQ",
              },
            ],
            learningObjectives: [
              "Understand function declarations",
              "Learn about scope and closures",
              "Write reusable code with functions",
            ],
          },
          {
            id: "5fe135a5-eb5d-44d0-af49-4784efeaedc2",
            name: "Select your backdrop and sprites",
            contents: [
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f207",
                type: "video",
                name: "Working with the DOM",
                file: "https://www.youtube.com/watch?v=0ik6X4DJKCc",
              },
            ],
            learningObjectives: [
              "Select and modify DOM elements",
              "Handle browser events",
              "Create dynamic web content",
            ],
          },
          {
            id: "5fe135a5-eb5d-44d0-af49-4784efeaedc3",
            name: "Programming your name and other characters to animate simultaneously",
            contents: [
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f208",
                type: "video",
                name: "Promises and Async/Await",
                file: "https://www.youtube.com/watch?v=PoRJizFvM7s",
              },
            ],
            learningObjectives: [
              "Understand asynchronous programming",
              "Work with Promises",
              "Use async/await syntax",
            ],
          },
        ],
        quiz: {
          questions: [
            {
              id: "q1",
              question: "What is JavaScript primarily used for?",
              options: [
                "Styling web pages",
                "Adding interactivity to web pages",
                "Creating database schemas",
                "Defining page structure"
              ],
              correctAnswer: "Adding interactivity to web pages"
            },
            {
              id: "q2",
              question: "Which of these is NOT a JavaScript data type?",
              options: [
                "String",
                "Boolean",
                "Number",
                "Element"
              ],
              correctAnswer: "Element"
            }
          ],
        },
        quizEnabled: true,
      },
      {
        name: "Animate a Conversational Story",
        modules: [
          {
            id: "5fe135a5-eb5d-44d0-af49-4784efeaedc4",
            name: "How to create a story?",
            contents: [
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f209",
                type: "video",
                name: "Introduction to React",
                file: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
              },
            ],
            learningObjectives: [
              "Understand React components",
              "Learn about state and props",
              "Create your first React application",
            ],
          },
          {
            id: "5fe135a5-eb5d-44d0-af49-4784efeaedc5",
            name: "Choose a theme for your story",
            contents: [
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f210",
                type: "video",
                name: "React Hooks",
                file: "https://www.youtube.com/watch?v=TNhaISOUy6Q",
              },
            ],
            learningObjectives: [
              "Use useState and useEffect hooks",
              "Manage component state",
              "Understand side effects",
            ],
          },
          {
            id: "5fe135a5-eb5d-44d0-af49-4784efeaedc6",
            name: "Select your backdrop and sprites",
            contents: [
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f211",
                type: "video",
                name: "React Router",
                file: "https://www.youtube.com/watch?v=Law7wfdg_ls",
              },
            ],
            learningObjectives: [
              "Implement client-side routing",
              "Create navigation in React apps",
              "Handle dynamic routes",
            ],
          },
          {
            id: "5fe135a5-eb5d-44d0-af49-4784efeaedc7",
            name: "Program your story with different characters having a conversation and changing their location",
            contents: [
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f212",
                type: "video",
                name: "Fetching Data in React",
                file: "https://www.youtube.com/watch?v=hzLDsxPGctY",
              },
            ],
            learningObjectives: [
              "Fetch data from APIs",
              "Handle loading states",
              "Manage API errors",
            ],
          },
        ],
        quiz: {
          questions: [
            {
              id: "q1",
              question: "What is React primarily used for?",
              options: [
                "Backend development",
                "Building user interfaces",
                "Database management",
                "Server configuration"
              ],
              correctAnswer: "Building user interfaces"
            },
            {
              id: "q2",
              question: "Which hook is used for side effects in React?",
              options: [
                "useState",
                "useEffect",
                "useContext",
                "useReducer"
              ],
              correctAnswer: "useEffect"
            }
          ],
        },
        quizEnabled: true,
      },
      {
        name: "Let's make a Magic Show",
        modules: [
          {
            id: "5fe135a5-eb5d-44d0-af49-4784efeaedc4",
            name: "What is the story of your show?",
            contents: [
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f209",
                type: "video",
                name: "Introduction to React",
                file: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
              },
            ],
            learningObjectives: [
              "Understand React components",
              "Learn about state and props",
              "Create your first React application",
            ],
          },
          {
            id: "5fe135a5-eb5d-44d0-af49-4784efeaedc5",
            name: "Select your backdrop and sprites",
            contents: [
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f210",
                type: "video",
                name: "React Hooks",
                file: "https://www.youtube.com/watch?v=TNhaISOUy6Q",
              },
            ],
            learningObjectives: [
              "Use useState and useEffect hooks",
              "Manage component state",
              "Understand side effects",
            ],
          },
          {
            id: "5fe135a5-eb5d-44d0-af49-4784efeaedc6",
            name: "Program your props in the show",
            contents: [
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f211",
                type: "video",
                name: "React Router",
                file: "https://www.youtube.com/watch?v=Law7wfdg_ls",
              },
            ],
            learningObjectives: [
              "Implement client-side routing",
              "Create navigation in React apps",
              "Handle dynamic routes",
            ],
          },
          {
            id: "5fe135a5-eb5d-44d0-af49-4784efeaedc7",
            name: "Program your characters and enjoy an amazing magic show",
            contents: [
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f212",
                type: "video",
                name: "Fetching Data in React",
                file: "https://www.youtube.com/watch?v=hzLDsxPGctY",
              },
            ],
            learningObjectives: [
              "Fetch data from APIs",
              "Handle loading states",
              "Manage API errors",
            ],
          },
        ],
        quiz: {
          questions: [
            {
              id: "q1",
              question: "What is React primarily used for?",
              options: [
                "Backend development",
                "Building user interfaces",
                "Database management",
                "Server configuration"
              ],
              correctAnswer: "Building user interfaces"
            },
            {
              id: "q2",
              question: "Which hook is used for side effects in React?",
              options: [
                "useState",
                "useEffect",
                "useContext",
                "useReducer"
              ],
              correctAnswer: "useEffect"
            }
          ],
        },
        quizEnabled: true,
      },
      {
        name: "Welcome to Game Development",
        modules: [
          {
            id: "5fe135a5-eb5d-44d0-af49-4784efeaedc4",
            name: "Introduction to Chase Game in Scratch",
            contents: [
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f209",
                type: "video",
                name: "Introduction to React",
                file: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
              },
            ],
            learningObjectives: [
              "Understand React components",
              "Learn about state and props",
              "Create your first React application",
            ],
          },
          {
            id: "5fe135a5-eb5d-44d0-af49-4784efeaedc5",
            name: "Select your backdrop and sprites",
            contents: [
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f210",
                type: "video",
                name: "React Hooks",
                file: "https://www.youtube.com/watch?v=TNhaISOUy6Q",
              },
            ],
            learningObjectives: [
              "Use useState and useEffect hooks",
              "Manage component state",
              "Understand side effects",
            ],
          },
          {
            id: "5fe135a5-eb5d-44d0-af49-4784efeaedc6",
            name: "Program your characters in the game",
            contents: [
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f211",
                type: "video",
                name: "React Router",
                file: "https://www.youtube.com/watch?v=Law7wfdg_ls",
              },
            ],
            learningObjectives: [
              "Implement client-side routing",
              "Create navigation in React apps",
              "Handle dynamic routes",
            ],
          },
          {
            id: "5fe135a5-eb5d-44d0-af49-4784efeaedc7",
            name: "Program the winning/losing scenario and you're good to go!",
            contents: [
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f212",
                type: "video",
                name: "Fetching Data in React",
                file: "https://www.youtube.com/watch?v=hzLDsxPGctY",
              },
            ],
            learningObjectives: [
              "Fetch data from APIs",
              "Handle loading states",
              "Manage API errors",
            ],
          },
        ],
        quiz: {
          questions: [
            {
              id: "q1",
              question: "What is React primarily used for?",
              options: [
                "Backend development",
                "Building user interfaces",
                "Database management",
                "Server configuration"
              ],
              correctAnswer: "Building user interfaces"
            },
            {
              id: "q2",
              question: "Which hook is used for side effects in React?",
              options: [
                "useState",
                "useEffect",
                "useContext",
                "useReducer"
              ],
              correctAnswer: "useEffect"
            }
          ],
        },
        quizEnabled: true,
      },
      {
        name: "The Ping Pong Game",
        modules: [
          {
            id: "5fe135a5-eb5d-44d0-af49-4784efeaedc4",
            name: "Introduction to the Ping Pong game",
            contents: [
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f209",
                type: "video",
                name: "Introduction to React",
                file: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
              },
            ],
            learningObjectives: [
              "Understand React components",
              "Learn about state and props",
              "Create your first React application",
            ],
          },
          {
            id: "5fe135a5-eb5d-44d0-af49-4784efeaedc5",
            name: "Select your backdrop and sprites",
            contents: [
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f210",
                type: "video",
                name: "React Hooks",
                file: "https://www.youtube.com/watch?v=TNhaISOUy6Q",
              },
            ],
            learningObjectives: [
              "Use useState and useEffect hooks",
              "Manage component state",
              "Understand side effects",
            ],
          },
          {
            id: "5fe135a5-eb5d-44d0-af49-4784efeaedc6",
            name: "Program the ball and paddle to have lots of fun",
            contents: [
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f211",
                type: "video",
                name: "React Router",
                file: "https://www.youtube.com/watch?v=Law7wfdg_ls",
              },
            ],
            learningObjectives: [
              "Implement client-side routing",
              "Create navigation in React apps",
              "Handle dynamic routes",
            ],
          },
          {
            id: "5fe135a5-eb5d-44d0-af49-4784efeaedc7",
            name: "Program the red line and keep playing till you strike it!",
            contents: [
              {
                id: "fc51ced4-5b85-4cf2-9b60-673f52e9f212",
                type: "video",
                name: "Fetching Data in React",
                file: "https://www.youtube.com/watch?v=hzLDsxPGctY",
              },
            ],
            learningObjectives: [
              "Fetch data from APIs",
              "Handle loading states",
              "Manage API errors",
            ],
          },
        ],
        quiz: {
          questions: [
            {
              id: "q1",
              question: "What is React primarily used for?",
              options: [
                "Backend development",
                "Building user interfaces",
                "Database management",
                "Server configuration"
              ],
              correctAnswer: "Building user interfaces"
            },
            {
              id: "q2",
              question: "Which hook is used for side effects in React?",
              options: [
                "useState",
                "useEffect",
                "useContext",
                "useReducer"
              ],
              correctAnswer: "useEffect"
            }
          ],
        },
        quizEnabled: true,
      },
    ],
    __v: 0,
  };

  // State for managing UI
  const [expandedModules, setExpandedModules] = useState({});
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [currentPdf, setCurrentPdf] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResults, setQuizResults] = useState({});

  // Toggle module expansion
  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  // Handle video play
  const handlePlayVideo = (url) => {
    setCurrentVideo(url);
    setShowVideoModal(true);
  };

  // PDF load success handler
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleViewPdf = (url) => {
    console.log("Attempting to load PDF from URL:", url);
    setCurrentPdf(url);
    setShowPdfModal(true);
  };

  // Handle quiz answer selection
  const handleQuizAnswer = (sectionIndex, questionId, answer) => {
    setQuizAnswers(prev => ({
      ...prev,
      [`${sectionIndex}-${questionId}`]: answer
    }));
  };

  // Submit quiz
  const submitQuiz = (sectionIndex) => {
    const section = courseData.sections[sectionIndex];
    const results = {};
    let score = 0;

    section.quiz.questions.forEach(question => {
      const userAnswer = quizAnswers[`${sectionIndex}-${question.id}`];
      const isCorrect = userAnswer === question.correctAnswer;
      results[question.id] = isCorrect;
      if (isCorrect) score++;
    });

    setQuizResults(prev => ({
      ...prev,
      [sectionIndex]: {
        score,
        total: section.quiz.questions.length,
        details: results
      }
    }));
  };

  // Check if module is unlocked (only first module is unlocked)
  const isModuleUnlocked = (moduleIndex) => {
    return moduleIndex === 0; // Only first module is unlocked
  };

  // Check if content is unlocked (only first module's content is unlocked)
  const isContentUnlocked = (moduleIndex, contentIndex) => {
    return moduleIndex === 0; // Only first module's content is unlocked
  };

  return (
    <>
      <div className="bg-background lg:px-24 py-8 rounded-3xl">
        <div
          className="bg-white p-8 py-10 shadow-xl rounded-md"
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-delay="4000"
        >
          {/* Course Description */}
          <div className="py-5">
            <h1 className="poppins-bold text-2xl mb-4">Course Description</h1>
            <p className="poppins-light text-wrap text-lightblack">{courseData.description}</p>
          </div>

          {/* What You'll Learn */}
          <div className="lg:flex flex-row flex-wrap justify-between gap-8">
            {/* left */}
            <div className="space-y-4 flex-1">
              <h1 className="poppins-bold text-xl">
                What you will learn in this course?
              </h1>
              <ul className="space-y-2">
                {courseData.whatYouLearn.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-yellow rounded-full h-4 w-4 flex items-center justify-center mt-1 mr-2 flex-shrink-0">
                      <AiOutlineRight className="text-white text-xs" />
                    </div>
                    <span className="poppins-light text-lightblack">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Course Curriculum */}
          <div className="mt-12">
            {courseData.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-10">
                <div className="flex items-center mb-6">
                  <div className="w-3 h-8 bg-yellow-500 rounded mr-3"></div>
                  <h2 className="poppins-bold text-xl text-gray-800">
                    Module {sectionIndex + 1}: {section.name}
                    {!isModuleUnlocked(sectionIndex) && " (Locked)"}
                  </h2>
                </div>

                {/* Always show all modules but mark locked ones */}
                {section.modules.map((module, moduleIndex) => (
                  <div
                    key={module.id}
                    className={`mb-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${
                      isModuleUnlocked(sectionIndex) ? "bg-white" : "bg-gray-100 opacity-80"
                    }`}
                  >
                    {/* Module Header */}
                    <div
                      className="p-5 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => isModuleUnlocked(sectionIndex) && toggleModule(module.id)}
                    >
                      <div className="flex items-center">
                        {!isModuleUnlocked(sectionIndex) && (
                          <span className="poppins-bold text-yellow-500 mr-3">🔒</span>
                        )}
                        <span className="poppins-bold mr-3 text-yellow">
                          {expandedModules[module.id] ? "⮟" : "➤"}
                        </span>
                        <h3 className="poppins-bold text-gray-800">
                          <span className="text-yellow-500">Lecture {moduleIndex + 1}:</span> {module.name}
                          {!isModuleUnlocked(sectionIndex) && " (Locked)"}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-6">
                        <span className="poppins-light text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {module.contents.length} {module.contents.length === 1 ? 'item' : 'items'}
                        </span>
                        {/* <span className="poppins-light text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {Math.floor(module.contents.length * 10)} min
                        </span> */}
                      </div>
                    </div>

                    {/* Module Content (collapsible) */}
                    {expandedModules[module.id] && isModuleUnlocked(sectionIndex) && (
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        {/* Learning Objectives */}
                        {module.learningObjectives && module.learningObjectives.length > 0 && (
                          <div className="mb-6 p-4 bg-gray rounded-lg border border-gray">
                            <div className="flex items-center mb-3">
                              <span className="poppins-bold text-yellow mr-2">•</span>
                              <h4 className="poppins-semibold text-black">
                                What You'll Learn in this lecture
                              </h4>
                            </div>
                            <ul className="space-y-2">
                              {module.learningObjectives.map((obj, idx) => (
                                <li key={idx} className="flex items-start">
                                  <span className="poppins-bold text-yellow mt-1 mr-2">✓</span>
                                  <span className="poppins-light text-gray-700">{obj}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Content Items */}
                        <div className="space-y-3">
                          {module.contents.map((content, contentIndex) => (
                            <div
                              key={content.id}
                              className="flex justify-between items-center p-3 hover:bg-gray rounded-lg transition-colors duration-200"
                            >
                              <div className="flex items-center">
                                <span className="poppins-bold text-yellow-500 mr-3">
                                  {content.type === "video" && "▶"}
                                  {content.type === "pdf" && "📄"}
                                  {content.type === "quiz" && "📝"}
                                </span>
                                <span className="poppins-light text-gray-800">
                                  {content.name}
                                </span>
                              </div>
                              <div className="flex items-center space-x-4">
                                {content.type === "video" && (
                                  <button
                                    onClick={() => handlePlayVideo(content.file)}
                                    className="poppins-medium text-yellow-500 text-sm hover:text-yellow-600"
                                  >
                                    Play
                                  </button>
                                )}
                                {content.type === "pdf" && (
                                  <button
                                    onClick={() => handleViewPdf(content.file)}
                                    className="poppins-medium text-yellow-500 text-sm hover:text-yellow-600"
                                  >
                                    Download
                                  </button>
                                )}
                                {/* <span className="poppins-light text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                  {Math.floor(Math.random() * 5) + 1} min
                                </span> */}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Quiz Section for the Module */}
                {section.quizEnabled && section.quiz.questions.length > 0 && (
                  <div className="mt-8 bg-gray rounded-lg p-6 border border-blue-200">
                    <div className="flex items-center mb-4">
                      <div className="w-3 h-8 bg-yellow rounded mr-3"></div>
                      <h3 className="poppins-bold text-xl text-black">
                        Module {sectionIndex + 1} Quiz
                        {!isModuleUnlocked(sectionIndex) && " (Locked)"}
                      </h3>
                    </div>

                    {/* Collapse Card for Quiz */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                      {/* Quiz Header */}
                      <div 
                        className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                        onClick={() => isModuleUnlocked(sectionIndex) && toggleModule(`quiz-${sectionIndex}`)}
                      >
                        <div className="flex items-center">
                          {!isModuleUnlocked(sectionIndex) ? (
                            <span className="poppins-bold text-yellow-500 mr-3">🔒</span>
                          ) : quizResults[sectionIndex] ? (
                            <span className="poppins-bold text-green-500 mr-3">✓</span>
                          ) : (
                            <span className="poppins-bold text-yellow-500 mr-3">📝</span>
                          )}
                          <h4 className="poppins-medium text-gray-800">
                            Test your knowledge from this module
                            {quizResults[sectionIndex] && " (Completed)"}
                            {!isModuleUnlocked(sectionIndex) && " (Complete previous modules to unlock)"}
                          </h4>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="poppins-light text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            {section.quiz.questions.length} questions
                          </span>
                          {isModuleUnlocked(sectionIndex) && (
                            <span className="poppins-bold text-yellow">
                              {expandedModules[`quiz-${sectionIndex}`] ? "⮟" : "➤"}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quiz Content */}
                      {expandedModules[`quiz-${sectionIndex}`] && isModuleUnlocked(sectionIndex) && (
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                          {quizResults[sectionIndex] ? (
                            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                              <div className="poppins-bold text-lg mb-2">
                                Quiz Results: {quizResults[sectionIndex].score}/{quizResults[sectionIndex].total}
                              </div>
                              <div className="space-y-3">
                                {section.quiz.questions.map((question, qIndex) => (
                                  <div key={question.id} className="border-b pb-3">
                                    <div className="poppins-medium mb-1">
                                      {qIndex + 1}. {question.question}
                                    </div>
                                    <div className="poppins-light text-sm text-gray-600 mb-1">
                                      Your answer: {quizAnswers[`${sectionIndex}-${question.id}`]}
                                    </div>
                                    <div className={`poppins-medium text-sm ${quizResults[sectionIndex].details[question.id]
                                        ? 'text-green-600'
                                        : 'text-red-600'
                                      }`}>
                                      {quizResults[sectionIndex].details[question.id]
                                        ? '✓ Correct'
                                        : `✗ Incorrect (Correct answer: ${question.correctAnswer})`}
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <button
                                onClick={() => setQuizResults(prev => {
                                  const newResults = { ...prev };
                                  delete newResults[sectionIndex];
                                  return newResults;
                                })}
                                className="mt-4 poppins-medium text-blue-600 hover:text-blue-800"
                              >
                                Retake Quiz
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {section.quiz.questions.map((question, qIndex) => (
                                <div key={question.id} className="bg-white p-4 rounded-lg shadow-sm">
                                  <div className="poppins-medium mb-2">
                                    {qIndex + 1}. {question.question}
                                  </div>
                                  <div className="space-y-2">
                                    {question.options.map((option, oIndex) => (
                                      <label key={oIndex} className="flex items-center space-x-2 poppins-light">
                                        <input
                                          type="radio"
                                          name={`quiz-${sectionIndex}-${question.id}`}
                                          value={option}
                                          onChange={() => handleQuizAnswer(sectionIndex, question.id, option)}
                                          className="text-blue-600 focus:ring-blue-500"
                                        />
                                        <span>{option}</span>
                                      </label>
                                    ))}
                                  </div>
                                </div>
                              ))}
                              <button
                                onClick={() => submitQuiz(sectionIndex)}
                                className="poppins-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                              >
                                Submit Quiz
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-5xl h-[90vh] relative flex flex-col">
            <button
              onClick={() => setShowVideoModal(false)}
              className="poppins-bold absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
            >
              &times;
            </button>
            <div className="p-4 flex-1 flex items-center justify-center">
              <div className="w-full h-full">
                <ReactPlayer
                  url={currentVideo}
                  width="100%"
                  height="100%"
                  controls={true}
                  style={{ minHeight: '70vh' }}
                  config={{
                    youtube: {
                      playerVars: {
                        modestbranding: 1,
                        rel: 0,
                        showinfo: 0
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {showPdfModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-5xl h-[90vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="poppins-bold text-lg">PDF Viewer</h3>
              <button
                onClick={() => setShowPdfModal(false)}
                className="poppins-bold text-gray-700 hover:text-gray-900 text-2xl"
              >
                &times;
              </button>
            </div>
            <div className="p-2 bg-gray-100">
              <p className="poppins-light text-sm text-gray-600 break-all">
                Current PDF URL: {currentPdf}
              </p>
            </div>
            <div className="flex-1 overflow-auto">
              {/* PDF Viewer with multiple fallback options */}
              <div className="h-full flex flex-col items-center justify-center">
                {/* Attempt 1: Direct embed */}
                <iframe
                  src={currentPdf}
                  className="w-full h-full min-h-[50vh]"
                  frameBorder="0"
                  title="PDF Viewer"
                  onError={() => console.error("Failed to load PDF in iframe")}
                />

                {/* Fallback options */}
                <div className="p-4 text-center">
                  <p className="poppins-light mb-4 text-gray-600">If the PDF doesn't load above:</p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <a
                      href={`https://docs.google.com/viewer?url=${encodeURIComponent(currentPdf)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="poppins-medium inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                      onClick={() => console.log("Trying Google Docs viewer with URL:", currentPdf)}
                    >
                      Try Google Docs Viewer
                    </a>
                    <a
                      href={currentPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="poppins-medium inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Open in New Tab
                    </a>
                    <a
                      href={currentPdf}
                      download
                      className="poppins-medium inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      <FiDownload className="mr-2" size={16} />
                      Download PDF
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ReviewsComponent />
    </>
  );
};

export default CourseDescription;