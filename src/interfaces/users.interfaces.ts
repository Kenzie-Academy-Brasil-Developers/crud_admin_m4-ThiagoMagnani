export interface users {
    id: number,
    name: string,
    email: string,
    password: string,
    admin: boolean,
}
export type usersBody = Omit<users, "id">;
