import { useState } from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CirclePlayIcon,
  ClipboardListIcon,
  DownloadIcon,
  GraduationCapIcon,
  LaptopIcon,
  LockKeyholeIcon,
  RotateCcwIcon,
  XIcon,
} from "lucide-react";
import { useParams } from "@tanstack/react-router";

import video from "../../assets/videos/video-preview.mp4";
import ReviewsComponent from "../../pages/subscriptions/SubscriptionTestimonials";
import ChatSupport from "@/components/site/ChatSupport";
import VideoPlayer from "@/components/site/VideoPlayer";
import CenteredState from "@/components/layout/CenteredState";
import { getHeaderOffsetClass } from "@/components/layout/headerOffset";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import DialogShell from "@/components/ui/dialog-shell";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";
import { Display, Heading, Text } from "@/components/ui/typography";
import StarRating from "@/components/rating/StarRating";
import { cn } from "@/lib/utils";
import { resolveBackendAssetUrl } from "../../utils/mediaUrl";
import { getActiveChildSession } from "../../utils/childSessionRequest";
import { openExternalUrl } from "../../utils/openExternalUrl";
import {
  useChildCourseDetail,
  useDownloadChildCourseContentMutation,
  useUpdateChildCourseProgressMutation,
} from "../../hooks/useChildCourses";

const MAX_ATTEMPTS = { BASIC: 2, PRO: Infinity };
const UNLOCK_SCORE_THRESHOLD = 60;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

const isExternalUrl = (value) => /^https?:\/\//i.test(String(value || ""));
const isProtectedCourseDownload = (value) =>
  String(value || "").replace(/\\/g, "/").startsWith("uploads/Courses/");

const getModuleKey = (module, sectionIndex, moduleIndex) =>
  module?.id || module?._id || `${sectionIndex}-${moduleIndex}`;

const shortDateFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
  day: "numeric",
  month: "short",
});

const formatUnlockDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfTarget = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const daysUntil = Math.round((startOfTarget - startOfToday) / MS_PER_DAY);
  const formatted = shortDateFormatter.format(date);
  if (daysUntil > 0 && daysUntil <= 7) {
    return `Unlocks in ${daysUntil} day${daysUntil === 1 ? "" : "s"} — ${formatted}`;
  }
  return `Unlocks ${formatted}`;
};

const getQuizScorePercent = (quiz, totalQuestions) => {
  if (!quiz) return null;
  const total = Number(totalQuestions) || quiz.total || 0;
  if (!total) return null;
  const obtained = Number(quiz.obtainedScore);
  if (Number.isNaN(obtained)) return null;
  return Math.round((obtained / total) * 100);
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

const QuizQuestionResult = ({ index, question, userAnswer, isCorrect }) => (
  <div className="border-b border-border pb-3 last:border-b-0">
    <Text size="sm" className="mb-1 font-medium">
      {index + 1}. {question.questionText}
    </Text>
    <Text size="sm" tone="muted" className="mb-1">
      Your answer: {userAnswer}
    </Text>
    <span
      className={cn(
        "flex items-center gap-1 text-caption",
        isCorrect ? "text-success" : "text-destructive",
      )}
    >
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
    </span>
  </div>
);

const ModuleContentRow = ({ content, fileUrl, onPlayVideo, onDownload }) => (
  <div className="flex items-center justify-between gap-4 rounded-lg p-3 transition-colors hover:bg-background">
    <div className="flex min-w-0 items-center gap-2">
      {content.type === "video" && (
        <>
          <CirclePlayIcon className="size-5 shrink-0 text-primary" />
          <Button
            type="button"
            variant="link"
            onClick={() => onPlayVideo(fileUrl)}
            className="h-auto p-0 font-normal text-foreground"
          >
            {content.name}
          </Button>
        </>
      )}
      {(content.type === "assignment" || content.type === "book") && (
        <>
          {content.type === "assignment" ? (
            <ClipboardListIcon className="size-5 shrink-0 text-primary" />
          ) : (
            <LaptopIcon className="size-5 shrink-0 text-primary" />
          )}
          <Text size="sm" className="truncate">{content.name}</Text>
        </>
      )}
    </div>
    <div className="flex shrink-0 items-center gap-4">
      {content.type === "video" && (
        <Text size="sm" tone="muted">10 min</Text>
      )}
      {(content.type === "assignment" || content.type === "book") && (
        <Button
          type="button"
          variant="link"
          onClick={() => onDownload(content)}
          className="h-auto gap-1 p-0 text-body-sm"
        >
          <DownloadIcon className="size-4" />
          Download
        </Button>
      )}
    </div>
  </div>
);

const CourseDetail = () => {
  const { id } = useParams({ strict: false });
  const activeChildSession = getActiveChildSession();
  const childId = activeChildSession?.childId || null;
  const [actionError, setActionError] = useState(null);
  const [expandedModules, setExpandedModules] = useState({});
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResults, setQuizResults] = useState({});
  const [quizRetakes, setQuizRetakes] = useState({});
  const [quizStatusMessage, setQuizStatusMessage] = useState("");

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
    setExpandedModules((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }));
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
    setQuizAnswers((prev) => ({
      ...prev,
      [`${sectionIndex}-${questionId}`]: answer,
    }));
  };

  const submitQuiz = async (sectionIndex) => {
    const childPlan = plan?.name?.toLowerCase() || "basic";
    const section = childSections[sectionIndex];
    if (!section?.quiz) return;

    const questions = Array.isArray(section.quiz.questions) ? section.quiz.questions : [];
    if (questions.length === 0) return;

    const maxAttempts = childPlan === "pro" ? MAX_ATTEMPTS.PRO : MAX_ATTEMPTS.BASIC;
    if (
      childPlan === "basic" &&
      section.quiz.lastAttemptDate &&
      isSameDay(section.quiz.lastAttemptDate, new Date())
    ) {
      if (section.quiz.attempts >= maxAttempts) {
        setActionError(
          `You've reached the maximum number of attempts (${maxAttempts}) for today. Try again tomorrow.`,
        );
        return;
      }
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

      setQuizResults((prev) => ({
        ...prev,
        [sectionIndex]: {
          score: responsePayload?.quiz?.score ?? 0,
          total: responsePayload?.quiz?.total ?? questions.length,
          details: responsePayload?.quiz?.details || {},
          passed: Boolean(responsePayload?.quiz?.passed),
        },
      }));
      setQuizRetakes((prev) => ({ ...prev, [sectionIndex]: false }));
    } catch (err) {
      console.error("Failed to update quiz results:", err);
      setActionError(err.message || "Failed to update quiz results");
    }
  };

  const retakeQuiz = (sectionIndex) => {
    setQuizResults((prev) => {
      const next = { ...prev };
      delete next[sectionIndex];
      return next;
    });
    setQuizAnswers((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((key) => {
        if (key.startsWith(`${sectionIndex}-`)) delete next[key];
      });
      return next;
    });
    setQuizRetakes((prev) => ({ ...prev, [sectionIndex]: true }));
    setQuizStatusMessage(`Module ${sectionIndex + 1} quiz reset. Ready for another attempt.`);
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
      <CenteredState className="min-h-screen px-6">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </CenteredState>
    );
  }

  if (!courseData || !childCourseData) {
    return (
      <CenteredState className="h-screen">
        <Text tone="muted">Course data not found.</Text>
      </CenteredState>
    );
  }

  return (
    <div className="bg-background">
      <section className={getHeaderOffsetClass("bg-background pb-10")}>
        <Container size="wide">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]" data-aos="fade-up">
            <div className="flex flex-col gap-5">
              <img
                src={resolveBackendAssetUrl(courseData.banner)}
                alt={courseData.title || "Course banner"}
                className="aspect-video w-full rounded-2xl object-cover"
              />

              <div className="flex flex-wrap items-center gap-4">
                {courseData.category && (
                  <Badge variant="secondary" className="rounded-full">
                    {courseData.category}
                  </Badge>
                )}
                <div className="flex items-center gap-2">
                  <StarRating value={courseReviews} className="text-h5" />
                  <Text size="sm" tone="muted">({courseReviews} reviews)</Text>
                </div>
              </div>

              <Display size="md" className="text-balance">
                {courseData.title}
              </Display>

              <div className="flex items-center gap-2 text-muted-foreground">
                <GraduationCapIcon className="size-5" aria-hidden="true" />
                <Text size="sm" tone="muted">
                  {courseData.studentsDownloaded ?? 0} students enrolled
                </Text>
              </div>

              <Card>
                <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {[
                    { label: "Months", value: courseData.month ?? 0 },
                    { label: "Lectures", value: courseData.numLessons ?? 0 },
                    { label: "Modules", value: courseData.numModules ?? 0 },
                    { label: "Quizzes", value: courseData.numQuizzes ?? 0 },
                  ].map((stat) => (
                    <div key={stat.label} className="flex flex-col">
                      <Text size="xs" tone="muted" className="uppercase tracking-wide">
                        {stat.label}
                      </Text>
                      <Text size="lg" weight="semibold">{stat.value}</Text>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card className="overflow-hidden p-0">
              <div className="aspect-video bg-muted">
                <VideoPlayer
                  src={video}
                  title="Course preview video"
                  autoPlay
                  muted
                  loop
                  controls
                  className="h-full w-full object-cover"
                />
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <Container size="wide" className="pb-16">
        <Card data-aos="fade-up">
          <CardContent className="flex flex-col gap-10 py-8">
            {actionError && (
              <Alert variant="destructive">
                <AlertDescription>{actionError}</AlertDescription>
              </Alert>
            )}
            <div aria-live="polite" role="status" className="sr-only">
              {quizStatusMessage}
            </div>

            <div className="flex flex-col gap-3">
              <Heading level={2} className="text-h3">Course description</Heading>
              <Text tone="muted">{courseData.description}</Text>
            </div>

            <div className="flex flex-col gap-3">
              <Heading level={3} className="text-h4">
                What you will learn in this course
              </Heading>
              <ul className="flex flex-col gap-2">
                {courseSections.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-primary"
                    >
                      <ChevronRightIcon className="size-3 text-primary-foreground" />
                    </span>
                    <Text>{item.name}</Text>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-10">
              {courseSections.map((section, sectionIndex) => {
                const childSection = childSections[sectionIndex];
                const quizQuestions = childSection?.quiz?.questions || [];
                const sectionUnlocked = isModuleUnlocked(sectionIndex);
                const sectionDates = childSections[sectionIndex];
                const quizCompleted = childSection?.quiz?.result === "pass";
                const quizAttempted = childSection?.quiz?.attempts > 0;
                const isRetakingQuiz = quizRetakes[sectionIndex];
                const showQuizResults =
                  !isRetakingQuiz && (quizResults[sectionIndex] || quizCompleted);
                const childPlan = plan?.name?.toLowerCase() || "basic";
                const maxAttempts = childPlan === "pro" ? MAX_ATTEMPTS.PRO : MAX_ATTEMPTS.BASIC;
                const attemptsExhausted =
                  childPlan === "basic" &&
                  childSection?.quiz?.lastAttemptDate &&
                  isSameDay(childSection.quiz.lastAttemptDate, new Date().toISOString()) &&
                  childSection?.quiz?.attempts >= maxAttempts;

                return (
                  <section key={sectionIndex} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2 border-b border-border pb-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex flex-col gap-1">
                        <Heading level={2} className="text-h4">
                          Module {sectionIndex + 1}: {section.name}
                        </Heading>
                        {!sectionUnlocked && (
                          <div className="flex flex-col gap-1">
                            {sectionIndex > 0 &&
                            childSections[sectionIndex - 1]?.quiz?.result !== "pass" ? (
                              (() => {
                                const prevQuiz = childSections[sectionIndex - 1]?.quiz;
                                const prevQuestionCount = Array.isArray(prevQuiz?.questions)
                                  ? prevQuiz.questions.length
                                  : 0;
                                const prevPercent = getQuizScorePercent(
                                  prevQuiz,
                                  prevQuestionCount,
                                );
                                return (
                                  <>
                                    <Text size="sm" className="text-destructive">
                                      Complete previous module quiz to unlock
                                    </Text>
                                    {prevPercent !== null && (
                                      <Text size="xs" tone="muted">
                                        You scored {prevPercent}% on the quiz — need{" "}
                                        {UNLOCK_SCORE_THRESHOLD}%
                                      </Text>
                                    )}
                                  </>
                                );
                              })()
                            ) : (
                              <Text size="sm" className="text-destructive">
                                {sectionDates?.startDate
                                  ? formatUnlockDate(sectionDates.startDate)
                                  : "Unlocks on a future date"}
                              </Text>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex shrink-0 gap-3 text-body-sm text-primary">
                        <span>{section.modules?.length || 0} lectures</span>
                        <span aria-hidden="true">·</span>
                        <span>{section.timeDuration} mins</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      {(section.modules || []).map((module, moduleIndex) => {
                        const moduleKey = getModuleKey(module, sectionIndex, moduleIndex);
                        const isExpanded = expandedModules[moduleKey];

                        return (
                          <div
                            key={moduleKey}
                            className={cn(
                              "overflow-hidden rounded-xl border border-border transition-colors",
                              sectionUnlocked ? "bg-card" : "bg-muted opacity-80",
                            )}
                          >
                            <button
                              type="button"
                              onClick={() => sectionUnlocked && toggleModule(moduleKey)}
                              disabled={!sectionUnlocked}
                              className={cn(
                                "flex w-full items-center justify-between gap-4 p-5 text-left",
                                sectionUnlocked
                                  ? "cursor-pointer hover:bg-muted"
                                  : "cursor-not-allowed",
                              )}
                            >
                              <div className="flex min-w-0 items-center gap-3">
                                {!sectionUnlocked ? (
                                  <LockKeyholeIcon
                                    aria-hidden="true"
                                    className="size-5 shrink-0 text-primary"
                                  />
                                ) : (
                                  <CirclePlayIcon
                                    aria-hidden="true"
                                    className="size-5 shrink-0 text-primary"
                                  />
                                )}
                                <Text className="truncate">
                                  <span className="font-semibold text-primary">
                                    Lecture {moduleIndex + 1}:
                                  </span>{" "}
                                  {module.name}
                                </Text>
                              </div>
                              <div className="flex shrink-0 items-center gap-3">
                                {sectionUnlocked && (
                                  <Badge variant="secondary" className="rounded-full">
                                    Preview
                                  </Badge>
                                )}
                                {sectionUnlocked &&
                                  (isExpanded ? (
                                    <ChevronDownIcon
                                      aria-hidden="true"
                                      className="size-5 text-primary"
                                    />
                                  ) : (
                                    <ChevronRightIcon
                                      aria-hidden="true"
                                      className="size-5 text-primary"
                                    />
                                  ))}
                              </div>
                            </button>

                            {isExpanded && sectionUnlocked && (
                              <div className="flex flex-col gap-4 border-t border-border bg-muted px-6 py-5">
                                {module.learningObjectives?.length > 0 && (
                                  <div className="flex flex-col gap-3 rounded-lg border border-border bg-background p-4">
                                    <Heading level={4} className="text-h5">
                                      What you&apos;ll learn in this lecture
                                    </Heading>
                                    <ul className="flex flex-col gap-2">
                                      {module.learningObjectives.map((obj, idx) => (
                                        <li key={idx}>
                                          <Text size="sm" tone="muted">
                                            • {obj}
                                          </Text>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                <div className="flex flex-col gap-2">
                                  {(module.contents || []).map((content) => (
                                    <ModuleContentRow
                                      key={
                                        content.id ||
                                        content._id ||
                                        `${moduleKey}-${content.type}-${content.name}`
                                      }
                                      content={content}
                                      fileUrl={resolveBackendAssetUrl(content.file)}
                                      onPlayVideo={handlePlayVideo}
                                      onDownload={handleDownloadContent}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {quizQuestions.length > 0 && (
                      <Card
                        className={cn(
                          "border",
                          quizCompleted && "border-success/40 bg-success/10",
                          attemptsExhausted && "border-destructive/40 bg-destructive/10",
                          !sectionUnlocked && "opacity-60",
                        )}
                      >
                        <CardContent className="flex flex-col gap-4">
                          <div className="flex items-center gap-3">
                            <Heading level={3} className="text-h5">
                              Module {sectionIndex + 1} quiz
                            </Heading>
                            {!sectionUnlocked && (
                              <Badge variant="secondary" className="rounded-full">
                                Locked
                              </Badge>
                            )}
                            {quizCompleted && (
                              <Badge className="rounded-full">Completed</Badge>
                            )}
                            {attemptsExhausted && (
                              <Badge variant="destructive" className="rounded-full">
                                Attempts exhausted
                              </Badge>
                            )}
                          </div>

                          {attemptsExhausted ? (
                            <div className="rounded-lg border border-border bg-card p-4">
                              <Text className="text-destructive">
                                You&apos;ve used all {maxAttempts} attempts for today.
                              </Text>
                              <Text size="sm" tone="muted" className="mt-1">
                                {childPlan === "basic"
                                  ? "You can try again tomorrow with fresh attempts."
                                  : "You can continue attempting this quiz as you have unlimited attempts."}
                              </Text>
                            </div>
                          ) : (
                            <div className="overflow-hidden rounded-xl border border-border bg-card">
                              <button
                                type="button"
                                onClick={() =>
                                  sectionUnlocked && toggleModule(`quiz-${sectionIndex}`)
                                }
                                disabled={!sectionUnlocked}
                                className="flex w-full items-center justify-between gap-4 p-4 text-left transition-colors hover:bg-muted disabled:cursor-not-allowed"
                              >
                                <div className="flex min-w-0 items-center gap-3">
                                  {!sectionUnlocked ? (
                                    <LockKeyholeIcon
                                      aria-hidden="true"
                                      className="size-5 shrink-0 text-primary"
                                    />
                                  ) : quizCompleted ? (
                                    <CheckIcon
                                      aria-hidden="true"
                                      className="size-5 shrink-0 text-success"
                                    />
                                  ) : quizAttempted ? (
                                    <RotateCcwIcon
                                      aria-hidden="true"
                                      className="size-5 shrink-0 text-warning"
                                    />
                                  ) : (
                                    <ClipboardListIcon
                                      aria-hidden="true"
                                      className="size-5 shrink-0 text-primary"
                                    />
                                  )}
                                  <Text size="sm" tone="muted" className="truncate">
                                    Test your knowledge from this module
                                    {quizAttempted && !quizCompleted && (
                                      childPlan === "basic"
                                        ? isSameDay(
                                            childSection.quiz.lastAttemptDate,
                                            new Date().toISOString(),
                                          )
                                          ? ` (Attempt ${childSection.quiz.attempts} of ${maxAttempts} today)`
                                          : ` (${maxAttempts} fresh attempts available today)`
                                        : ` (Attempt ${childSection.quiz.attempts})`
                                    )}
                                  </Text>
                                </div>
                                <div className="flex shrink-0 items-center gap-3">
                                  <Badge variant="secondary" className="rounded-full">
                                    {quizQuestions.length} questions
                                  </Badge>
                                  {sectionUnlocked &&
                                    (expandedModules[`quiz-${sectionIndex}`] ? (
                                      <ChevronDownIcon
                                        aria-hidden="true"
                                        className="size-5 text-primary"
                                      />
                                    ) : (
                                      <ChevronRightIcon
                                        aria-hidden="true"
                                        className="size-5 text-primary"
                                      />
                                    ))}
                                </div>
                              </button>

                              {expandedModules[`quiz-${sectionIndex}`] && sectionUnlocked && (
                                <div className="border-t border-border bg-muted px-6 py-5">
                                  {showQuizResults ? (
                                    <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4">
                                      <Text
                                        className={
                                          quizCompleted
                                            ? "font-semibold text-success"
                                            : "font-semibold text-destructive"
                                        }
                                      >
                                        Quiz results: {childSection.quiz.obtainedScore}/
                                        {quizQuestions.length}
                                        {quizCompleted
                                          ? " (Passed)"
                                          : ` (Failed — score at least ${UNLOCK_SCORE_THRESHOLD}% to unlock next module)`}
                                      </Text>
                                      <div className="flex flex-col gap-3">
                                        {quizQuestions.map((question, qIndex) => {
                                          const userAnswer =
                                            quizAnswers[`${sectionIndex}-${question._id}`] ||
                                            question.childAnswer;
                                          const isCorrect = Boolean(
                                            quizResults[sectionIndex]?.details?.[question._id] ??
                                              question.isCorrect,
                                          );
                                          return (
                                            <QuizQuestionResult
                                              key={question._id}
                                              index={qIndex}
                                              question={question}
                                              userAnswer={userAnswer}
                                              isCorrect={isCorrect}
                                            />
                                          );
                                        })}
                                      </div>
                                      {!quizCompleted &&
                                        (childPlan === "basic" &&
                                        childSection.quiz.lastAttemptDate &&
                                        isSameDay(
                                          childSection.quiz.lastAttemptDate,
                                          new Date().toISOString(),
                                        ) &&
                                        childSection.quiz.attempts >= maxAttempts ? (
                                          <Text size="sm" tone="muted">
                                            You&apos;ve used all {maxAttempts} attempts for today.
                                            Try again tomorrow.
                                          </Text>
                                        ) : (
                                          <Button
                                            type="button"
                                            variant="link"
                                            onClick={() => retakeQuiz(sectionIndex)}
                                            className="h-auto self-start p-0 font-medium"
                                          >
                                            {childPlan === "basic"
                                              ? isSameDay(
                                                  childSection.quiz.lastAttemptDate,
                                                  new Date().toISOString(),
                                                )
                                                ? `Retake quiz (Attempt ${
                                                    childSection.quiz.attempts + 1
                                                  } of ${maxAttempts} today)`
                                                : `Retake quiz (${maxAttempts} fresh attempts available)`
                                              : "Retake quiz"}
                                          </Button>
                                        ))}
                                    </div>
                                  ) : (
                                    <div className="flex flex-col gap-4">
                                      {childPlan === "basic" && (
                                        <Text size="sm" tone="muted">
                                          Attempt {childSection.quiz.attempts + 1} of{" "}
                                          {maxAttempts} today
                                        </Text>
                                      )}
                                      {quizQuestions.map((question, qIndex) => (
                                        <div
                                          key={question._id}
                                          className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4"
                                        >
                                          <Text className="font-medium">
                                            {qIndex + 1}. {question.questionText}
                                          </Text>
                                          <RadioGroup
                                            value={
                                              quizAnswers[`${sectionIndex}-${question._id}`] || ""
                                            }
                                            onValueChange={(option) =>
                                              handleQuizAnswer(sectionIndex, question._id, option)
                                            }
                                            className="flex flex-col gap-2"
                                          >
                                            {(question.options || []).map((option, oIndex) => (
                                              <label
                                                key={oIndex}
                                                className="flex items-center gap-2 text-body-sm"
                                              >
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
                                        className="self-start"
                                      >
                                        {updateChildCourseProgressMutation.isPending
                                          ? "Submitting…"
                                          : "Submit quiz"}
                                      </Button>
                                      <Text size="sm" tone="muted">
                                        Note: You need to score at least{" "}
                                        {UNLOCK_SCORE_THRESHOLD}% to unlock the next module.
                                      </Text>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </section>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </Container>

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
      <ChatSupport />
    </div>
  );
};

export default CourseDetail;
