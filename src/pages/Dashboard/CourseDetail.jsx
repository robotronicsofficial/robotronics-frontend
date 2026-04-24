import video from "../../assets/videos/video-preview.mp4";
import { useState } from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  CirclePlayIcon,
  ChevronRightIcon,
  ClipboardListIcon,
  DownloadIcon,
  GraduationCapIcon,
  LaptopIcon,
  LockKeyholeIcon,
  RotateCcwIcon,
  XIcon,
} from "lucide-react";
import ReviewsComponent from "../../pages/subscriptions/SubscriptionTestimonials";
import { useParams } from "react-router-dom";
import ChatSupport from "../../component/ChatSupport"
import { getActiveChildSession } from "../../utils/childSessionRequest";
import { openExternalUrl } from "../../utils/openExternalUrl";
import {
  useChildCourseDetail,
  useDownloadChildCourseContentMutation,
  useUpdateChildCourseProgressMutation,
} from "../../hooks/useChildCourses";
import VideoPlayer from "../../component/VideoPlayer";
import CenteredState from "../../components/layout/CenteredState";
import { getHeaderOffsetClass } from "../../components/layout/headerOffset";
import DialogShell from "../../components/ui/dialog-shell";
import { Spinner } from "../../components/ui/spinner";
import { resolveBackendAssetUrl } from "../../utils/mediaUrl";
import StarRating from "../../components/rating/StarRating";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const MAX_ATTEMPTS = {
  BASIC: 2,
  PRO: Infinity
};

const statusIconClassName = "mr-3 size-5 shrink-0";

const isExternalUrl = (value) => /^https?:\/\//i.test(String(value || ""));
const isProtectedCourseDownload = (value) =>
  String(value || "").replace(/\\/g, "/").startsWith("uploads/Courses/");

const getModuleKey = (module, sectionIndex, moduleIndex) =>
  module?.id || module?._id || `${sectionIndex}-${moduleIndex}`;

const CourseDetail = () => {
  const { id } = useParams();
  const activeChildSession = getActiveChildSession();
  const childId = activeChildSession?.childId || null;
  const [actionError, setActionError] = useState(null);

  // State for managing UI
  const [expandedModules, setExpandedModules] = useState({});
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResults, setQuizResults] = useState({});
  const [quizRetakes, setQuizRetakes] = useState({});
  const {
    data: courseDetail,
    isLoading: loading,
    error,
  } = useChildCourseDetail({ childId, courseId: id });
  const updateChildCourseProgressMutation = useUpdateChildCourseProgressMutation();
  const downloadChildCourseContentMutation = useDownloadChildCourseContentMutation();
  const courseData = courseDetail?.courseDetails || null;
  const childCourseData = courseDetail?.childCourse || null;
  const plan = courseDetail?.plan || null;
  const courseSections = Array.isArray(courseData?.sections) ? courseData.sections : [];
  const childSections = Array.isArray(childCourseData?.Sections) ? childCourseData.Sections : [];
  const courseReviews = Number(courseData?.reviews) || 0;

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
      setActionError("Child session not found. Please re-enter the PIN.");
      return;
    }

    if (isExternalUrl(content.file) && !isProtectedCourseDownload(content.file)) {
      if (!openExternalUrl(content.file)) {
        setActionError("Unable to open this download link.");
      }
      return;
    }

    try {
      setActionError(null);
      const blob = await downloadChildCourseContentMutation.mutateAsync({
        childId,
        courseId: id,
        contentId,
      });
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = content.name || "course-content";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
    } catch (downloadError) {
      setActionError(downloadError.message || "Failed to download course content");
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
      setActionError(null);
      const responsePayload = await updateChildCourseProgressMutation.mutateAsync({
        childId,
        courseId: id,
        sectionIndex,
        answers,
      });

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
      setActionError(error.message || "Failed to update quiz results");
    }
  };

  if (loading) {
    return (
      <CenteredState className="h-screen">
        <Spinner className="size-12 text-primary" />
      </CenteredState>
    );
  }

  if (error) {
    return (
      <CenteredState className="h-screen">
        <div className="text-destructive poppins-medium">{error.message}</div>
      </CenteredState>
    );
  }

  if (!courseData || !childCourseData) {
    return (
      <CenteredState className="h-screen">
        <div className="text-muted-foreground poppins-medium">Course data not found</div>
      </CenteredState>
    );
  }

  return (
    <div>
      <div className={getHeaderOffsetClass("page", "bg-background")}>
        <div className="bg-muted p-6">
          <div className="max-w-7xl mx-auto">
            <div className="lg:flex flex-wrap lg:flex-nowrap lg:gap-x-6">
              {/* Left Side */}
              <div
                className="flex flex-col w-full lg:w-2/3 gap-y-4"
                data-aos="fade-up"


              >
                <div className="">
                  <img
                    src={resolveBackendAssetUrl(courseData.banner)}
                    alt="Course"
                    className="aspect-video w-full rounded-2xl object-cover object-center shadow-md"
                  />
                </div>
                <div className="flex items-center gap-8 pt-4">
                  <span className="bg-muted text-muted-foreground text-sm font-medium px-3 py-1 bg-card rounded-full">
                    {courseData.category}
                  </span>
                  <div className="flex items-center justify-center gap-2">
                    <StarRating value={courseReviews} className="text-2xl" />

                    <span className="text-foreground text-sm">({courseReviews} Reviews)</span>
                  </div>
                </div>
                <div>
                  <div className="flex w-full max-w-3xl items-center">
                    <h1 className="lg:text-5xl text-2xl text-foreground font-medium mb-4">
                      {courseData.title}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-2 text-muted-foreground">
                    <GraduationCapIcon />
                    <span className="text-muted-foreground my-2">{courseData.studentsDownloaded ?? 0} Students Enrolled</span>
                  </div>

                  <div className="mt-6 flex min-h-20 w-full max-w-3xl items-center justify-between rounded-lg bg-muted px-8 text-muted-foreground">
                    <div className="inline-block">{courseData.month ?? 0} Months </div>
                    <div className="inline-block">{courseData.numLessons ?? 0} Lectures</div>
                    <div className="inline-block">{courseData.numModules ?? 0} Module</div>
                    <div className="inline-block">{courseData.numQuizzes ?? 0} Quizes</div>
                  </div>
                </div>
              </div>

              {/* Right Side with Video */}
              <div className="mt-6 flex w-full flex-col gap-y-4 rounded-2xl bg-accent lg:mt-0 lg:w-1/3">
                <div className="aspect-video w-full overflow-hidden rounded-2xl bg-muted">
                  <VideoPlayer
                    src={video}
                    title="Course preview video"
                    autoPlay
                    muted
                    loop
                    controls
                    className="h-full w-full rounded-lg object-cover"
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
            className="bg-card p-8 py-10 shadow-xl rounded-md"
            data-aos="fade-up"


          >
            {actionError ? (
              <div className="mb-4 rounded-lg bg-destructive/10 p-4 text-sm font-semibold text-destructive">
                {actionError}
              </div>
            ) : null}
            {/* Course Description */}
            <div className="py-5">
              <h1 className="poppins-bold text-2xl mb-4">Course Description</h1>
              <p className="poppins-light text-wrap text-foreground">{courseData.description}</p>
            </div>

            {/* What You'll Learn */}
            <div className="lg:flex flex-row flex-wrap justify-between gap-8">
              {/* left */}
              <div className="flex flex-col gap-y-4 flex-1">
                <h1 className="poppins-bold text-xl">
                  What you will learn in this course?
                </h1>
                <ul className="flex flex-col gap-y-2">
                  {courseSections.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-primary rounded-full h-4 w-4 flex items-center justify-center mt-1 mr-2 flex-shrink-0">
                        <ChevronRightIcon className="text-background text-xs" />
                      </div>
                      <span className="poppins-light text-foreground">{item.name}</span>
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
                      <div className="w-3 h-8 bg-primary rounded mr-3"></div>
                      <div className="flex justify-between items-center w-full">
                        <h2 className="poppins-bold text-xl text-muted-foreground">
                          Module {sectionIndex + 1}: {section.name}
                          {!sectionUnlocked && (
                            <span className="text-destructive ml-2 text-sm">
                              {sectionIndex > 0 && childSections[sectionIndex - 1]?.quiz?.result !== "pass" ?
                                "(Locked - Complete previous module quiz to unlock)" :
                                `(Locked - Available from ${sectionDates?.startDate ?
                                  new Date(sectionDates.startDate).toLocaleDateString() : 'a future date'})`}
                            </span>
                          )}
                        </h2>
                        <div className="poppins-bold text-l text-primary ml-4 flex gap-4">
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
                          className={`mb-6 rounded-lg ${sectionUnlocked ? "bg-card" : "bg-muted opacity-80"
                            } transition-colors duration-200`}
                        >
                          {/* Module Header */}
                          <div
                            className={`p-5 flex justify-between items-center ${sectionUnlocked ? 'cursor-pointer hover:bg-muted' : 'cursor-not-allowed'
                              } transition-colors duration-200`}
                            onClick={() => sectionUnlocked && toggleModule(moduleKey)}
                          >
                            <div className="flex items-center">
                              {!sectionUnlocked && (
                                <LockKeyholeIcon
                                  aria-hidden="true"
                                  className={`${statusIconClassName} text-primary`}
                                />
                              )}
                              <span className="poppins-bold mr-3 text-primary">
                                <CirclePlayIcon className="text-2xl" />
                              </span>
                              <h3 className="poppins-bold text-muted-foreground">
                                <span className="text-primary">Lecture {moduleIndex + 1}:</span> {module.name}
                              </h3>
                            </div>
                            <div className="flex items-center gap-x-6">
                              {sectionUnlocked && (
                                <span className="poppins-bold text-primary text-sm bg-muted px-3 py-1 rounded-full">
                                  Preview
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Module Content (collapsible) */}
                          {expandedModules[moduleKey] && sectionUnlocked && (
                            <div className="px-6 py-4 bg-muted border-t border-border">
                              {/* Learning Objectives */}
                              {module.learningObjectives && module.learningObjectives.length > 0 && (
                                <div className="mb-6 p-4 bg-background rounded-lg border border-border">
                                  <div className="flex items-center mb-3">
                                    <h4 className="poppins-semibold text-foreground">
                                      What You&apos;ll Learn in this lecture
                                    </h4>
                                  </div>
                                  <ul className="flex flex-col gap-y-2">
                                    {module.learningObjectives.map((obj, idx) => (
                                      <li key={idx} className="flex items-start">
                                        <span className="poppins-light text-muted-foreground">• {obj}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Content Items */}
                              <div className="flex flex-col gap-y-3">
                                {(module.contents || []).map((content) => {
                                  const fileUrl = resolveBackendAssetUrl(content.file);

                                  return (
                                    <div
                                      key={content.id || content._id || `${moduleKey}-${content.type}-${content.name}`}
                                      className="flex justify-between items-center p-3 hover:bg-background rounded-lg transition-colors duration-200"
                                    >
                                      <div className="flex items-center gap-2">
                                        {content.type === "video" && (
                                          <>
                                            <CirclePlayIcon className="text-primary text-lg" />
                                            <Button
                                              type="button"
                                              variant="link"
                                              onClick={() => handlePlayVideo(fileUrl)}
                                              className="h-auto p-0 font-normal text-foreground"
                                            >
                                              {content.name}
                                            </Button>
                                          </>
                                        )}
                                        {(content.type === "assignment" || content.type === "book") && (
                                          <>
                                            {content.type === "assignment" ? (
                                              <ClipboardListIcon className="text-primary text-lg" />
                                            ) : (
                                              <LaptopIcon className="text-primary text-lg" />
                                            )}
                                            <span className="poppins-light">
                                              {content.name}
                                            </span>
                                          </>
                                        )}
                                      </div>
                                      <div className="flex items-center gap-x-4">
                                        {content.type === "video" && (
                                          <span className="poppins-medium text-primary text-sm hover:text-primary">
                                            10 min
                                          </span>
                                        )}
                                        {(content.type === "assignment" || content.type === "book") && (
                                          <Button
                                            type="button"
                                            variant="link"
                                            onClick={() => handleDownloadContent(content)}
                                            className="h-auto p-0 text-sm font-medium text-primary hover:text-primary"
                                          >
                                            <DownloadIcon className="mr-1" />
                                            Download
                                          </Button>
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
                      <div className={`mt-8 rounded-lg p-6 border ${quizCompleted ? 'border-success/20 bg-success/10' :
                        attemptsExhausted ? 'border-destructive/20 bg-destructive/10' :
                          'border-info/20 bg-muted'
                        } ${!sectionUnlocked ? 'opacity-60' : ''}`}>
                        <div className="flex items-center mb-4">
                          <div className="w-3 h-8 bg-primary rounded mr-3"></div>
                          <h3 className="poppins-bold text-xl text-foreground">
                            Module {sectionIndex + 1} Quiz
                            {!sectionUnlocked && " (Locked)"}
                            {quizCompleted && " (Completed)"}
                            {attemptsExhausted && " (Attempts Exhausted for Today)"}
                          </h3>
                        </div>

                        {attemptsExhausted ? (
                          <div className="p-4 bg-card rounded-lg shadow-sm">
                            <div className="poppins-bold text-destructive text-lg mb-2">
                              You&apos;ve used all {maxAttempts} attempts for today.
                            </div>
                            <div className="poppins-light text-muted-foreground">
                              {childPlan === 'basic' ?
                                "You can try again tomorrow with fresh attempts." :
                                "You can continue attempting this quiz as you have unlimited attempts."}
                            </div>
                          </div>
                        ) : (
                          <div className="bg-card rounded-lg shadow-sm overflow-hidden">
                            {/* Quiz Header */}
                            <div
                              className="p-4 flex justify-between items-center cursor-pointer hover:bg-muted transition-colors duration-200"
                              onClick={() => sectionUnlocked && toggleModule(`quiz-${sectionIndex}`)}
                            >
                              <div className="flex items-center">
                                {!sectionUnlocked ? (
                                  <LockKeyholeIcon
                                    aria-hidden="true"
                                    className={`${statusIconClassName} text-primary`}
                                  />
                                ) : quizCompleted ? (
                                  <CheckIcon
                                    aria-hidden="true"
                                    className={`${statusIconClassName} text-success`}
                                  />
                                ) : quizAttempted ? (
                                  <RotateCcwIcon
                                    aria-hidden="true"
                                    className={`${statusIconClassName} text-warning`}
                                  />
                                ) : (
                                  <ClipboardListIcon
                                    aria-hidden="true"
                                    className={`${statusIconClassName} text-primary`}
                                  />
                                )}
                                <h4 className="poppins-medium text-muted-foreground">
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
                              <div className="flex items-center gap-x-4">
                                <span className="poppins-light text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                                  {quizQuestions.length} questions
                                </span>
                                {sectionUnlocked && (
                                  <span className="poppins-bold text-primary">
                                    {expandedModules[`quiz-${sectionIndex}`] ? (
                                      <ChevronDownIcon aria-hidden="true" className="size-5" />
                                    ) : (
                                      <ChevronRightIcon aria-hidden="true" className="size-5" />
                                    )}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Quiz Content */}
                            {expandedModules[`quiz-${sectionIndex}`] && sectionUnlocked && (
                              <div className="px-6 py-4 bg-muted border-t border-border">
                                {showQuizResults ? (
                                  <div className="bg-card p-4 rounded-lg shadow-sm mb-4">
                                    <div className={`poppins-bold text-lg mb-2 ${quizCompleted ? 'text-success' : 'text-destructive'}`}>
                                      Quiz Results: {childSection.quiz.obtainedScore}/{quizQuestions.length}
                                      {quizCompleted ? " (Passed)" : " (Failed - Score at least 60% to unlock next module)"}
                                    </div>
                                    <div className="flex flex-col gap-y-3">
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
                                            <div className="poppins-light text-sm text-muted-foreground mb-1">
                                              Your answer: {userAnswer}
                                            </div>
                                            <div className={`flex items-center gap-1 poppins-medium text-sm ${isCorrect ? 'text-success' : 'text-destructive'}`}>
                                              {isCorrect ? (
                                                <>
                                                  <CheckIcon aria-hidden="true" className="size-4" />
                                                  Correct
                                                </>
                                              ) : (
                                                <>
                                                  <XIcon aria-hidden="true" className="size-4" />
                                                  Incorrect
                                                </>
                                              )}
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
                                        <div className="mt-4 poppins-medium text-muted-foreground">
                                          You&apos;ve used all {maxAttempts} attempts for today. Try again tomorrow.
                                        </div>
                                      ) : (
                                        <Button
                                          type="button"
                                          variant="link"
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
                                          className="mt-4 h-auto p-0 font-medium text-info hover:text-info"
                                        >
                                          {childPlan === 'basic' ?
                                            (isSameDay(childSection.quiz.lastAttemptDate, new Date().toISOString()) ?
                                              `Retake Quiz (Attempt ${childSection.quiz.attempts + 1} of ${maxAttempts} today)` :
                                              `Retake Quiz (${maxAttempts} fresh attempts available)`) :
                                            'Retake Quiz'}
                                        </Button>
                                      )
                                    )}
                                  </div>
                                ) : (
                                  <div className="flex flex-col gap-y-4">
                                    {childPlan === 'basic' && (
                                      <div className="poppins-medium text-sm text-muted-foreground mb-2">
                                        Attempt {childSection.quiz.attempts + 1} of {maxAttempts} today
                                      </div>
                                    )}
                                    {quizQuestions.map((question, qIndex) => (
                                      <div key={question._id} className="bg-card p-4 rounded-lg shadow-sm">
                                        <div className="poppins-medium mb-2">
                                          {qIndex + 1}. {question.questionText}
                                        </div>
                                        <RadioGroup
                                          value={quizAnswers[`${sectionIndex}-${question._id}`] || ""}
                                          onValueChange={(option) => handleQuizAnswer(sectionIndex, question._id, option)}
                                          className="flex flex-col gap-y-2"
                                        >
                                          {(question.options || []).map((option, oIndex) => (
                                            <label key={oIndex} className="flex items-center gap-x-2 poppins-light">
                                              <RadioGroupItem
                                                value={option}
                                                id={`quiz-${sectionIndex}-${question._id}-${oIndex}`}
                                              />
                                              <span>{option}</span>
                                            </label>
                                          ))}
                                        </RadioGroup>
                                      </div>
                                    ))}
                                    <Button
                                      type="button"
                                      onClick={() => submitQuiz(sectionIndex)}
                                      disabled={updateChildCourseProgressMutation.isPending}
                                      className="h-auto rounded-lg bg-info px-4 py-2 font-medium text-background hover:bg-info"
                                    >
                                      {updateChildCourseProgressMutation.isPending ? "Submitting..." : "Submit Quiz"}
                                    </Button>
                                    <div className="poppins-light text-sm text-muted-foreground mt-2">
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

        <DialogShell
          isOpen={showVideoModal}
          onClose={() => setShowVideoModal(false)}
          title="Course lesson video"
          titleClassName="sr-only"
          className="h-[90vh] max-w-5xl p-4 sm:max-w-5xl"
        >
          <div className="flex min-h-0 flex-1 items-center justify-center">
            <VideoPlayer
              src={currentVideo}
              title="Course lesson video"
              autoPlay
              controls
              className="min-h-[70vh] w-full"
            />
          </div>
        </DialogShell>

        <ReviewsComponent />
      </>
      <ChatSupport />
    </div>
  );
}

export default CourseDetail;
