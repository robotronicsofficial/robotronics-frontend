export const queryKeys = {
  auth: {
    user: ["auth", "user"],
  },
  blogs: {
    all: ["blogs"],
    detail: (blogId) => ["blogs", blogId],
  },
  childCourses: {
    plan: (childId) => ["child-courses", childId, "plan"],
    selectable: (childId) => ["child-courses", childId, "selectable"],
    active: (childId) => ["child-courses", childId, "active"],
    detail: (childId, courseId) => ["child-courses", childId, courseId],
    progress: (childId) => ["child-courses", childId, "progress"],
  },
  courses: {
    all: ["courses"],
    detail: (courseId) => ["courses", courseId],
  },
  jobs: {
    all: ["jobs"],
    detail: (jobId) => ["jobs", jobId],
  },
  payments: {
    all: ["payments"],
  },
  products: {
    all: ["products"],
    detail: (productId) => ["products", productId],
    related: (scope) => ["products", "related", scope],
  },
  savedItems: {
    all: ["saved-items"],
  },
  services: {
    all: ["services"],
    detail: (serviceId) => ["services", serviceId],
  },
  subscription: {
    plans: ["subscription", "plans"],
    parent: (userId) => ["subscription", "parent", userId],
    children: ["subscription", "children"],
  },
  videoGallery: {
    all: ["video-gallery"],
  },
};
