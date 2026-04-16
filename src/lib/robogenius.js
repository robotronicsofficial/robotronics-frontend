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
