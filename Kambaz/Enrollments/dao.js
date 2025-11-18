import Database from "../Database/index.js";

export function findEnrollmentsForUser(userId) {
  const { enrollments } = Database;
  return enrollments.filter((enrollment) => enrollment.user === userId);
}

export function findEnrollmentsForCourse(courseId) {
  const { enrollments } = Database;
  return enrollments.filter((enrollment) => enrollment.course === courseId);
}

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  
  // Check if already enrolled
  const existing = enrollments.find(
    (e) => e.user === userId && e.course === courseId
  );
  if (existing) {
    return existing;
  }

  // Create new enrollment
  const enrollment = {
    _id: Date.now().toString(),
    user: userId,
    course: courseId,
  };
  enrollments.push(enrollment);
  return enrollment;
}

export function unenrollUserFromCourse(userId, courseId) {
  const { enrollments } = Database;
  const index = enrollments.findIndex(
    (e) => e.user === userId && e.course === courseId
  );
  if (index !== -1) {
    enrollments.splice(index, 1);
  }
}