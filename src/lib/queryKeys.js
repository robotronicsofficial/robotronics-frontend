export const queryKeys = {
  auth: {
    socialProviders: ["auth", "social-providers"],
    user: ["auth", "user"],
  },
  blogs: {
    all: ["blogs"],
    detail: (blogId) => ["blogs", blogId],
  },
  childCourses: {
    plan: (childId) => ["child-courses", childId, "plan"],
    enrollment: (childId) => ["child-courses", childId, "enrollment"],
    selectable: (childId) => ["child-courses", childId, "selectable"],
    active: (childId) => ["child-courses", childId, "active"],
    detail: (childId, courseId) => ["child-courses", childId, courseId],
    progress: (childId) => ["child-courses", childId, "progress"],
  },
  childSession: {
    verify: (childId, sessionId) => ["child-session", childId, sessionId, "verify"],
  },
  courses: {
    all: ["courses"],
    detail: (courseId) => ["courses", courseId],
    categories: ["courses", "categories"],
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
    categories: ["products", "categories"],
    detail: (productId) => ["products", productId],
    related: (scope) => ["products", "related", scope],
  },
  savedItems: {
    all: ["saved-items"],
    user: (userId) => ["saved-items", userId],
  },
  shop: {
    cartQuote: (items) => ["shop", "cart-quote", items],
  },
  services: {
    all: ["services"],
    detail: (serviceId) => ["services", serviceId],
  },
  subscription: {
    plans: ["subscription", "plans"],
    currentParent: (userId) => ["subscription", "current-parent", userId],
    currentParentRoot: ["subscription", "current-parent"],
    childAccounts: (userId) => ["subscription", "child-accounts", userId],
    childAccountsRoot: ["subscription", "child-accounts"],
  },
  videoGallery: {
    all: ["video-gallery"],
  },
};
