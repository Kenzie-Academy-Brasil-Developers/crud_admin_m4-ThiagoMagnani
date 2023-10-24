export interface courses {
    name: string,
    description: string,
}
export type coursesBody = Omit<courses, "id">;
