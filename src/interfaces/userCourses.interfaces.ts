export interface userCourses {
    active: boolean,
    userId: number,
    courseId: number,
}
export type userCoursesBody = Omit<userCourses, "id">;
