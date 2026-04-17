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
import ChatSupport from "../../component/ChatSupport"
import {
  buildChildSessionRequest,
  getActiveChildSession,
} from "../../utils/childSessionRequest";
import { openExternalUrl } from "../../utils/openExternalUrl";
import {
  normalizeChildCourse,
  normalizeCourseDetail,
} from "../../lib/robogenius";

const MAX_ATTEMPTS = {
  BASIC: 2,
  PRO: Infinity
};

const toAssetUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${import.meta.env.VITE_BACKEND_URL}/${path.replace(/\\/g, "/")}`;
};

const isExternalUrl = (value) => /^https?:\/\//i.test(String(value || ""));
const isProtectedCourseDownload = (value) =>
  String(value || "").replace(/\\/g, "/").startsWith("uploads/Courses/");

const getModuleKey = (module, sectionIndex, moduleIndex) =>
  module?.id || module?._id || `${sectionIndex}-${moduleIndex}`;

const CourseDetail = () => {
  const { id } = useParams();
  const activeChildSession = getActiveChildSession();
  const childId = activeChildSession?.childId || null;
  const [courseData, setCourseData] = useState(null);
  const [childCourseData, setChildCourseData] = useState(null);
  const [plan, setPlan] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for managing UI
  const [expandedModules, setExpandedModules] = useState({});
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResults, setQuizResults] = useState({});
  const [quizRetakes, setQuizRetakes] = useState({});
  const courseSections = Array.isArray(courseData?.sections) ? courseData.sections : [];
  const childSections = Array.isArray(childCourseData?.Sections) ? childCourseData.Sections : [];
  const courseReviews = Number(courseData?.reviews) || 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!childId) {
          throw new Error("Child session not found. Please re-enter the PIN.");
        }

        const childCourseRequest = buildChildSessionRequest({
          method: "GET",
          childId,
        });

        if (!childCourseRequest) {
          throw new Error("Child session not found. Please re-enter the PIN.");
        }

        const childCourseRes = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/getChildById/${childId}/ByCourseId/${id}`,
          childCourseRequest
        );

        if (!childCourseRes.ok) {
          throw new Error('Failed to load course details');
        }

        const childCoursePayload = await childCourseRes.json();

        setCourseData(normalizeCourseDetail(childCoursePayload?.courseDetails));
        setChildCourseData(normalizeChildCourse(childCoursePayload?.course));
        setPlan(childCoursePayload?.plan || null);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [childId, id]);

  const isSectionUnlocked = (section, sectionIndex) => {
    if (!section?.startDate || !section?.endDate) return true;

    const now = new Date();
    const startDate = new Date(section.startDate);
    // const endDate = new Date(section.endDate);

    const isDateValid = now >= startDate;

    if (sectionIndex > 0) {
      const prevSection = childSections[sectionIndex - 1];
      const prevQuizPassed = prevSection?.quiz?.result === "pass";
      return isDateValid && prevQuizPassed;
    }

    return isDateValid;
  };

  const isModuleUnlocked = (sectionIndex) => {
    if (childSections[sectionIndex]) {
      return isSectionUnlocked(childSections[sectionIndex], sectionIndex);
    }
    return true;
  };

const updateChildCourseProgress = async ({ courseId, sectionIndex, answers }) => {
  try {
    if (!childId) {
      throw new Error("Child session not found. Please re-enter the PIN.");
    }

    const childSessionRequest = buildChildSessionRequest({
      method: 'PUT',
      childId,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        courseId,
        sectionIndex,
        answers,
      },
    });

    if (!childSessionRequest) {
      throw new Error("Child session not found. Please re-enter the PIN.");
    }

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/updateChildCourse/${childId}`,
      childSessionRequest
    );

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => null);
      throw new Error(errorPayload?.message || 'Failed to update child course progress');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating child course:', error);
    throw error;
  }
};

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const handlePlayVideo = (url) => {
    setCurrentVideo(url);
    setShowVideoModal(true);
  };

  const handleDownloadContent = async (content) => {
    const contentId = content?.id || content?._id;

    if (!childId || !contentId) {
      setError("Child session not found. Please re-enter the PIN.");
      return;
    }

    if (isExternalUrl(content.file) && !isProtectedCourseDownload(content.file)) {
      if (!openExternalUrl(content.file)) {
        setError("Unable to open this download link.");
      }
      return;
    }

    const childSessionRequest = buildChildSessionRequest({
      method: "GET",
      childId,
    });

    if (!childSessionRequest) {
      setError("Child session not found. Please re-enter the PIN.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/child/${childId}/courses/${id}/content/${contentId}/download`,
        childSessionRequest
      );

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null);
        throw new Error(errorPayload?.message || "Failed to download course content");
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = content.name || "course-content";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
    } catch (downloadError) {
      setError(downloadError.message || "Failed to download course content");
    }
  };

  const handleQuizAnswer = (sectionIndex, questionId, answer) => {
    setQuizAnswers(prev => ({
      ...prev,
      [`${sectionIndex}-${questionId}`]: answer
    }));
  };

  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const submitQuiz = async (sectionIndex) => {
    const childPlan = plan?.name?.toLowerCase() || 'basic';
    const section = childSections[sectionIndex];

    if (!section?.quiz) {
      return;
    }

    const questions = Array.isArray(section.quiz.questions) ? section.quiz.questions : [];
    if (questions.length === 0) {
      return;
    }

    const maxAttempts = childPlan === 'pro' ? MAX_ATTEMPTS.PRO : MAX_ATTEMPTS.BASIC;
    if (childPlan === 'basic' && section.quiz.lastAttemptDate && isSameDay(section.quiz.lastAttemptDate, new Date())) {
      if (section.quiz.attempts >= maxAttempts) {
        alert(`You've reached the maximum number of attempts (${maxAttempts}) for today. Try again tomorrow.`);
        return;
      }
    }

    if (!section?.quiz?.questions?.length) {
      return;
    }

    const answers = questions.map((question) => ({
      questionId: question._id,
      answer: quizAnswers[`${sectionIndex}-${question._id}`] || "",
    }));

    try {
      const responsePayload = await updateChildCourseProgress({
        courseId: id,
        sectionIndex,
        answers,
      });

      setChildCourseData(normalizeChildCourse(responsePayload?.data));
      setQuizResults(prev => ({
        ...prev,
        [sectionIndex]: {
          score: responsePayload?.quiz?.score ?? 0,
          total: responsePayload?.quiz?.total ?? questions.length,
          details: responsePayload?.quiz?.details || {},
          passed: Boolean(responsePayload?.quiz?.passed)
        }
      }));
      setQuizRetakes(prev => ({
        ...prev,
        [sectionIndex]: false
      }));

    } catch (error) {
      console.error("Failed to update quiz results:", error);
    }
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

  if (!courseData || !childCourseData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500 poppins-medium">Course data not found</div>
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
                    src={toAssetUrl(courseData.banner)}
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
                        const fullStars = Math.floor(courseReviews);
                        const hasHalfStar = courseReviews % 1 >= 0.5;

                        if (i < fullStars) {
                          return <span key={i} className="text-yellow text-2xl">★</span>;
                        } else if (i === fullStars && hasHalfStar) {
                          return <span key={i} className="text-yellow text-2xl">☆</span>;
                        } else {
                          return <span key={i} className="text-white text-2xl">★</span>;
                        }
                      })}
                    </div>

                    <span className="text-brown text-sm">({courseReviews} Reviews)</span>
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
                    <span className="text-gray-500 my-2">{courseData.studentsDownloaded ?? 0} Students Enrolled</span>
                  </div>

                  <div className="h-[12vh] w-[40vw] bg-[#D9D9D9] flex items-center px-8 justify-between mt-6 rounded-lg text-[#7D7D7D]">
                    <div className="inline-block">{courseData.month ?? 0} Months </div>
                    <div className="inline-block">{courseData.numLessons ?? 0} Lectures</div>
                    <div className="inline-block">{courseData.numModules ?? 0} Module</div>
                    <div className="inline-block">{courseData.numQuizzes ?? 0} Quizes</div>
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
                  {courseSections.map((item, index) => (
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
              {courseSections.map((section, sectionIndex) => {
                const childSection = childSections[sectionIndex];
                const quizQuestions = childSection?.quiz?.questions || [];
                const sectionUnlocked = isModuleUnlocked(sectionIndex);
                const sectionDates = childSections[sectionIndex];
                const quizCompleted = childSection?.quiz?.result === "pass";
                const quizAttempted = childSection?.quiz?.attempts > 0;
                const isRetakingQuiz = quizRetakes[sectionIndex];
                const showQuizResults = !isRetakingQuiz && (quizResults[sectionIndex] || quizCompleted);
                const childPlan = plan?.name?.toLowerCase() || 'basic';
                const maxAttempts = childPlan === 'pro' ? MAX_ATTEMPTS.PRO : MAX_ATTEMPTS.BASIC;
                const attemptsExhausted = childPlan === 'basic' &&
                  childSection?.quiz?.lastAttemptDate &&
                  isSameDay(childSection.quiz.lastAttemptDate, new Date().toISOString()) &&
                  childSection?.quiz?.attempts >= maxAttempts;

                return (
                  <div key={sectionIndex} className="mb-10">
                    <div className="flex items-center mb-6">
                      <div className="w-3 h-8 bg-yellow rounded mr-3"></div>
                      <div className="flex justify-between items-center w-full">
                        <h2 className="poppins-bold text-xl text-gray-800">
                          Module {sectionIndex + 1}: {section.name}
                          {!sectionUnlocked && (
                            <span className="text-red-500 ml-2 text-sm">
                              {sectionIndex > 0 && childSections[sectionIndex - 1]?.quiz?.result !== "pass" ?
                                "(Locked - Complete previous module quiz to unlock)" :
                                `(Locked - Available from ${sectionDates?.startDate ?
                                  new Date(sectionDates.startDate).toLocaleDateString() : 'a future date'})`}
                            </span>
                          )}
                        </h2>
                        <div className="poppins-bold text-l text-yellow ml-4 flex gap-4">
                          <span>{section.modules?.length || 0} Lectures </span> -
                          <span>{section.timeDuration} mins </span>
                        </div>
                      </div>
                    </div>

                    {/* Always show all modules but mark locked ones */}
                    {(section.modules || []).map((module, moduleIndex) => {
                      const moduleKey = getModuleKey(module, sectionIndex, moduleIndex);

                      return (
                        <div
                          key={moduleKey}
                          className={`mb-6 rounded-lg ${sectionUnlocked ? "bg-white" : "bg-gray-100 opacity-80"
                            } transition-colors duration-200`}
                        >
                          {/* Module Header */}
                          <div
                            className={`p-5 flex justify-between items-center ${sectionUnlocked ? 'cursor-pointer hover:bg-gray-50' : 'cursor-not-allowed'
                              } transition-colors duration-200`}
                            onClick={() => sectionUnlocked && toggleModule(moduleKey)}
                          >
                            <div className="flex items-center">
                              {!sectionUnlocked && (
                                <span className="poppins-bold text-yellow-500 mr-3">🔒</span>
                              )}
                              <span className="poppins-bold mr-3 text-yellow">
                                <FaCirclePlay className="text-2xl" />
                              </span>
                              <h3 className="poppins-bold text-gray-800">
                                <span className="text-yellow-500">Lecture {moduleIndex + 1}:</span> {module.name}
                              </h3>
                            </div>
                            <div className="flex items-center space-x-6">
                              {sectionUnlocked && (
                                <span className="poppins-bold text-yellow text-sm bg-gray-100 px-3 py-1 rounded-full">
                                  Preview
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Module Content (collapsible) */}
                          {expandedModules[moduleKey] && sectionUnlocked && (
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                              {/* Learning Objectives */}
                              {module.learningObjectives && module.learningObjectives.length > 0 && (
                                <div className="mb-6 p-4 bg-gray rounded-lg border border-gray">
                                  <div className="flex items-center mb-3">
                                    <h4 className="poppins-semibold text-black">
                                      What You&apos;ll Learn in this lecture
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
                                {(module.contents || []).map((content) => {
                                  const fileUrl = toAssetUrl(content.file);

                                  return (
                                    <div
                                      key={content.id || content._id || `${moduleKey}-${content.type}-${content.name}`}
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
                                          <button
                                            type="button"
                                            onClick={() => handleDownloadContent(content)}
                                            className="flex items-center poppins-medium text-yellow text-sm hover:text-yellow-600"
                                          >
                                            <FiDownload className="mr-1" />
                                            Download
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Quiz Section for the Module */}
                    {quizQuestions.length > 0 && (
                      <div className={`mt-8 rounded-lg p-6 border ${quizCompleted ? 'border-green-200 bg-green-50' :
                        attemptsExhausted ? 'border-red-200 bg-red-50' :
                          'border-blue-200 bg-gray-50'
                        } ${!sectionUnlocked ? 'opacity-60' : ''}`}>
                        <div className="flex items-center mb-4">
                          <div className="w-3 h-8 bg-yellow rounded mr-3"></div>
                          <h3 className="poppins-bold text-xl text-black">
                            Module {sectionIndex + 1} Quiz
                            {!sectionUnlocked && " (Locked)"}
                            {quizCompleted && " (Completed)"}
                            {attemptsExhausted && " (Attempts Exhausted for Today)"}
                          </h3>
                        </div>

                        {attemptsExhausted ? (
                          <div className="p-4 bg-white rounded-lg shadow-sm">
                            <div className="poppins-bold text-red-600 text-lg mb-2">
                              You&apos;ve used all {maxAttempts} attempts for today.
                            </div>
                            <div className="poppins-light text-gray-700">
                              {childPlan === 'basic' ?
                                "You can try again tomorrow with fresh attempts." :
                                "You can continue attempting this quiz as you have unlimited attempts."}
                            </div>
                          </div>
                        ) : (
                          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            {/* Quiz Header */}
                            <div
                              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                              onClick={() => sectionUnlocked && toggleModule(`quiz-${sectionIndex}`)}
                            >
                              <div className="flex items-center">
                                {!sectionUnlocked ? (
                                  <span className="poppins-bold text-yellow-500 mr-3">🔒</span>
                                ) : quizCompleted ? (
                                  <span className="poppins-bold text-green-500 mr-3">✓</span>
                                ) : quizAttempted ? (
                                  <span className="poppins-bold text-orange-500 mr-3">↻</span>
                                ) : (
                                  <span className="poppins-bold text-yellow-500 mr-3">📝</span>
                                )}
                                <h4 className="poppins-medium text-gray-800">
                                  Test your knowledge from this module
                                  {quizCompleted && " (Completed)"}
                                  {quizAttempted && !quizCompleted && (
                                    childPlan === 'basic' ? (
                                      isSameDay(childSection.quiz.lastAttemptDate, new Date().toISOString()) ?
                                        ` (Attempt ${childSection.quiz.attempts} of ${maxAttempts} today)` :
                                        ` (${maxAttempts} fresh attempts available today)`
                                    ) : ` (Attempt ${childSection.quiz.attempts})`
                                  )}
                                  {!sectionUnlocked && (sectionIndex > 0 ?
                                    " (Complete previous module quiz to unlock)" :
                                    " (Complete previous modules to unlock)")}
                                </h4>
                              </div>
                              <div className="flex items-center space-x-4">
                                <span className="poppins-light text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                  {quizQuestions.length} questions
                                </span>
                                {sectionUnlocked && (
                                  <span className="poppins-bold text-yellow">
                                    {expandedModules[`quiz-${sectionIndex}`] ? "⮟" : "➤"}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Quiz Content */}
                            {expandedModules[`quiz-${sectionIndex}`] && sectionUnlocked && (
                              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                {showQuizResults ? (
                                  <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                                    <div className={`poppins-bold text-lg mb-2 ${quizCompleted ? 'text-green-600' : 'text-red-600'}`}>
                                      Quiz Results: {childSection.quiz.obtainedScore}/{quizQuestions.length}
                                      {quizCompleted ? " (Passed)" : " (Failed - Score at least 60% to unlock next module)"}
                                    </div>
                                    <div className="space-y-3">
                                      {quizQuestions.map((question, qIndex) => {
                                        const userAnswer = quizAnswers[`${sectionIndex}-${question._id}`] || question.childAnswer;
                                        const isCorrect = Boolean(
                                          quizResults[sectionIndex]?.details?.[question._id] ?? question.isCorrect
                                        );

                                        return (
                                          <div key={question._id} className="border-b pb-3">
                                            <div className="poppins-medium mb-1">
                                              {qIndex + 1}. {question.questionText}
                                            </div>
                                            <div className="poppins-light text-sm text-gray-600 mb-1">
                                              Your answer: {userAnswer}
                                            </div>
                                            <div className={`poppins-medium text-sm ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                              {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                                            </div>

                                          </div>
                                        );
                                      })}
                                    </div>
                                    {!quizCompleted && (
                                      childPlan === 'basic' &&
                                        childSection.quiz.lastAttemptDate &&
                                        isSameDay(childSection.quiz.lastAttemptDate, new Date().toISOString()) &&
                                        childSection.quiz.attempts >= maxAttempts ? (
                                        <div className="mt-4 poppins-medium text-gray-600">
                                          You&apos;ve used all {maxAttempts} attempts for today. Try again tomorrow.
                                        </div>
                                      ) : (
                                        <button
                                          onClick={() => {
                                            setQuizResults(prev => {
                                              const newResults = { ...prev };
                                              delete newResults[sectionIndex];
                                              return newResults;
                                            });
                                            setQuizAnswers(prev => {
                                              const nextAnswers = { ...prev };
                                              Object.keys(nextAnswers).forEach((key) => {
                                                if (key.startsWith(`${sectionIndex}-`)) {
                                                  delete nextAnswers[key];
                                                }
                                              });
                                              return nextAnswers;
                                            });
                                            setQuizRetakes(prev => ({
                                              ...prev,
                                              [sectionIndex]: true
                                            }));
                                          }}
                                          className="mt-4 poppins-medium text-blue-600 hover:text-blue-800"
                                        >
                                          {childPlan === 'basic' ?
                                            (isSameDay(childSection.quiz.lastAttemptDate, new Date().toISOString()) ?
                                              `Retake Quiz (Attempt ${childSection.quiz.attempts + 1} of ${maxAttempts} today)` :
                                              `Retake Quiz (${maxAttempts} fresh attempts available)`) :
                                            'Retake Quiz'}
                                        </button>
                                      )
                                    )}
                                  </div>
                                ) : (
                                  <div className="space-y-4">
                                    {childPlan === 'basic' && (
                                      <div className="poppins-medium text-sm text-gray-600 mb-2">
                                        Attempt {childSection.quiz.attempts + 1} of {maxAttempts} today
                                      </div>
                                    )}
                                    {quizQuestions.map((question, qIndex) => (
                                      <div key={question._id} className="bg-white p-4 rounded-lg shadow-sm">
                                        <div className="poppins-medium mb-2">
                                          {qIndex + 1}. {question.questionText}
                                        </div>
                                        <div className="space-y-2">
                                          {(question.options || []).map((option, oIndex) => (
                                            <label key={oIndex} className="flex items-center space-x-2 poppins-light">
                                              <input
                                                type="radio"
                                                name={`quiz-${sectionIndex}-${question._id}`}
                                                value={option}
                                                checked={quizAnswers[`${sectionIndex}-${question._id}`] === option}
                                                onChange={() => handleQuizAnswer(sectionIndex, question._id, option)}
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
                                    <div className="poppins-light text-sm text-gray-600 mt-2">
                                      Note: You need to score at least 60% to unlock the next module.
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
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
      <ChatSupport />
    </div>
  );
}

export default CourseDetail;
