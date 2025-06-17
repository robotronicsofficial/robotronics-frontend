import { PiGraduationCapLight } from "react-icons/pi";
import ReactPlayer from "react-player";
import video from "../../assets/videos/video.mp4"; 
import { useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import ReviewsComponent from "../../pages/RoboGenius/Robogeniusreview";
import { useParams } from "react-router-dom";
import { FaCirclePlay } from "react-icons/fa6";
import { FaLaptopCode } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { AiOutlineRight } from "react-icons/ai";

const CourseDetail = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for managing UI
  const [expandedModules, setExpandedModules] = useState({});
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResults, setQuizResults] = useState({});

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/coursesById/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch course data');
        }
        const data = await response.json();
        setCourseData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

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

  // Check if module is unlocked
  const isModuleUnlocked = (moduleIndex) => {
    return true;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 poppins-medium">{error}</div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500 poppins-medium">Course not found</div>
      </div>
    );
  }

  return (
    <div>             
      <div className="bg-background pt-44">
        <div className="bg-gray-100 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="lg:flex flex-wrap lg:flex-nowrap lg:space-x-6">
              {/* Left Side */}
              <div
                className="w-full lg:w-2/3 space-y-4"
                data-aos="fade-up"
                data-aos-duration="2000"
                data-aos-delay="4000"
              >
                <div className="">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${courseData.banner}`}
                    alt="Course"
                    className="w-full h-[50vw] sm:h-[40vw] md:h-[30vw] lg:h-[23.8vw] object-center rounded-2xl shadow-md"
                  />
                </div>
                <div className="flex items-center gap-8 pt-4">
                  <span className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 bg-white rounded-full">
                    {courseData.category}
                  </span>
                  <div className="flex items-center justify-center gap-2">
                    <div>
                      {Array.from({ length: 5 }, (_, i) => {
                        const fullStars = Math.floor(courseData.reviews);
                        const hasHalfStar = courseData.reviews % 1 >= 0.5;
                        
                        if (i < fullStars) {
                          return <span key={i} className="text-yellow text-2xl">★</span>; // full star
                        } else if (i === fullStars && hasHalfStar) {
                          return <span key={i} className="text-yellow text-2xl">☆</span>; // half star
                        } else {
                          return <span key={i} className="text-white text-2xl">★</span>; // empty star
                        }
                      })}
                    </div>

                    <span className="text-brown text-sm">({courseData.reviews} Reviews)</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center w-[40vw]">
                    <h1 className="lg:text-5xl text-2xl text-brown font-medium mb-4">
                      {courseData.title}
                    </h1>
                  </div>
                  <div className="flex items-center space-x-2 text-[#7F7E97]">
                    <PiGraduationCapLight />
                    <span className="text-gray-500 my-2">{courseData.studentsDownloaded} Students Enrolled</span>
                  </div>

                  <div className="h-[12vh] w-[40vw] bg-[#D9D9D9] flex items-center px-8 justify-between mt-6 rounded-lg text-[#7D7D7D]">
                    <div className="inline-block">{courseData.month} Months </div>
                    <div className="inline-block">{courseData.numLessons} Lectures</div>
                    <div className="inline-block">{courseData.numModules} Module</div>
                    <div className="inline-block">{courseData.numQuizzes} Quizes</div>
                  </div>
                </div>
              </div>

              {/* Right Side with Video */}
              <div className="w-full lg:w-1/3 mt-6 lg:mt-0 space-y-4 bg-[#0f1586] h-[23.8vw] rounded-2xl">
                <div className="bg-gray-300 w-full h-full rounded-2xl overflow-hidden">
                  <ReactPlayer
                    url={video}
                    playing
                    muted
                    loop
                    controls
                    width="100%"
                    height="100%"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                  {courseData.sections.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-yellow rounded-full h-4 w-4 flex items-center justify-center mt-1 mr-2 flex-shrink-0">
                        <AiOutlineRight className="text-white text-xs" />
                      </div>
                      <span className="poppins-light text-lightblack">{item.name}</span>
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
                    <div className="w-3 h-8 bg-yellow rounded mr-3"></div>
                      <div className="flex justify-between items-center w-full">
                        <h2 className="poppins-bold text-xl text-gray-800">
                          Module {sectionIndex + 1}: {section.name}
                          {!isModuleUnlocked(sectionIndex) && " (Locked)"}
                        </h2>
                        <div className="poppins-bold  text-l text-yellow ml-4 flex gap-4">
                          <span>{section.modules.length || 0} Lectures </span> -
                          <span>{section.timeDuration} mins </span>
                        </div>
                      </div>
                    </div>
              
                  {/* Always show all modules but mark locked ones */}
                  {section.modules.map((module, moduleIndex) => (
                    <div
                      key={module.id}
                      className={`mb-6 rounded-lg bg-[#F0F0F0] ${
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
                            <FaCirclePlay className="text-2xl" />
                            {expandedModules[module.id]}
                          </span>
                          <h3 className="poppins-bold text-gray-800">
                            <span className="text-yellow-500">Lecture {moduleIndex + 1}:</span> {module.name}
                            {!isModuleUnlocked(sectionIndex) && " (Locked)"}
                          </h3>
                        </div>
                        <div className="flex items-center space-x-6">
                          <span className="poppins-bold text-yellow text-sm bg-gray-100 px-3 py-1 rounded-full">
                            Preview
                          </span>
                        </div>
                      </div>
                          
                      {/* Module Content (collapsible) */}
                      {expandedModules[module.id] && isModuleUnlocked(sectionIndex) && (
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                          {/* Learning Objectives */}
                          {module.learningObjectives && module.learningObjectives.length > 0 && (
                            <div className="mb-6 p-4 bg-gray rounded-lg border border-gray">
                              <div className="flex items-center mb-3">
                                <h4 className="poppins-semibold text-black">
                                  What You'll Learn in this lecture
                                </h4>
                              </div>
                              <ul className="space-y-2">
                                {module.learningObjectives.map((obj, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <span className="poppins-light text-gray-700">• {obj}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
  
                          {/* Content Items */}
                          <div className="space-y-3">
                            {module.contents.map((content) => {
                              const fileUrl = `${import.meta.env.VITE_BACKEND_URL}${content.file}`;

                              return (
                                <div
                                  key={content.id}
                                  className="flex justify-between items-center p-3 hover:bg-gray rounded-lg transition-colors duration-200"
                                >
                                  <div className="flex items-center gap-2">
                                    {content.type === "video" && (
                                      <>
                                        <FaCirclePlay className="text-yellow text-lg" />
                                        <button
                                          onClick={() => handlePlayVideo(fileUrl)}
                                          className="poppins-light"
                                        >
                                          {content.name}
                                        </button>
                                      </>
                                    )}
                                    {(content.type === "assignment" || content.type === "book") && (
                                      <>
                                        {content.type === "assignment" ? (
                                          <MdAssignment className="text-yellow text-lg" />
                                        ) : (
                                          <FaLaptopCode className="text-yellow text-lg" />
                                        )}
                                        <span className="poppins-light">
                                          {content.name}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                  <div className="flex items-center space-x-4">
                                    {content.type === "video" && (
                                      <span className="poppins-medium text-yellow text-sm hover:text-yellow-600">
                                        10 min
                                      </span>
                                    )}
                                    {(content.type === "assignment" || content.type === "book") && (
                                      <a
                                        href={fileUrl}
                                        download
                                        className="flex items-center poppins-medium text-yellow text-sm hover:text-yellow-600"
                                      >
                                        <FiDownload className="mr-1" />
                                        Download
                                      </a>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
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
      
        <ReviewsComponent />
      </>
    </div>
  )
}

export default CourseDetail