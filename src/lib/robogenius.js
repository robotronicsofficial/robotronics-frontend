export const ensureArray = (value) => (Array.isArray(value) ? value : []);

export const normalizeChildProfile = (child = {}) => ({
  ...child,
  firstName: child.firstName || "",
  lastName: child.lastName || "",
  email: child.email || "",
  phone: child.phone || "",
  country: child.country || "",
  schoolName: child.schoolName || "",
  streetAddress: child.streetAddress || "",
  city: child.city || "",
  postalCode: child.postalCode || "",
  dateOfBirth: child.dateOfBirth || null,
});

export const normalizeParentRecord = (parent = {}) => ({
  ...parent,
  firstName: parent.firstName || "",
  lastName: parent.lastName || "",
  email: parent.email || "",
  country: parent.country || "",
  companyName: parent.companyName || "",
  streetAddress: parent.streetAddress || "",
  aptSuite: parent.aptSuite || "",
  city: parent.city || "",
  state: parent.state || "",
  phone: parent.phone || "",
  postalCode: parent.postalCode || "",
  deliveryInstruction: parent.deliveryInstruction || "",
  children: ensureArray(parent.children).map(normalizeChildProfile),
});

export const normalizeChildCourseRecord = (childCourse = {}) => ({
  ...childCourse,
  childId: childCourse.childId || "",
  pin: typeof childCourse.pin === "string" ? childCourse.pin : null,
  courses: ensureArray(childCourse.courses),
});

export const formatDisplayDate = (value) => {
  if (!value) {
    return "N/A";
  }

  const parsedDate = new Date(value);
  return Number.isNaN(parsedDate.getTime()) ? "N/A" : parsedDate.toLocaleDateString();
};

export const normalizeQuiz = (quiz = null) => {
  if (!quiz) {
    return null;
  }

  return {
    ...quiz,
    questions: ensureArray(quiz.questions),
    attempts: Number(quiz.attempts) || 0,
    obtainedScore: Number(quiz.obtainedScore) || 0,
    lastAttemptDate: quiz.lastAttemptDate || null,
  };
};

export const normalizeChildSection = (section = {}) => ({
  ...section,
  modules: ensureArray(section.modules),
  quiz: normalizeQuiz(section.quiz),
});

export const normalizeChildCourse = (course) => {
  if (!course) {
    return null;
  }

  return {
    ...course,
    Sections: ensureArray(course.Sections).map(normalizeChildSection),
    progress: Number(course.progress) || 0,
  };
};

export const normalizeCourseDetail = (course) => {
  if (!course) {
    return null;
  }

  return {
    ...course,
    sections: ensureArray(course.sections).map((section) => ({
      ...section,
      modules: ensureArray(section.modules).map((module) => ({
        ...module,
        learningObjectives: ensureArray(module?.learningObjectives),
        contents: ensureArray(module?.contents),
      })),
    })),
    reviews: Number(course.reviews) || 0,
  };
};

export const normalizeProgressPayload = (progress = {}) => ({
  ...progress,
  childName: progress.childName || "Student",
  courses: ensureArray(progress.courses).map((course) => ({
    ...course,
    status: course?.status || "active",
    completed: Number(course?.completed) || 0,
    certificateAvailable: Boolean(course?.certificateAvailable),
  })),
});
