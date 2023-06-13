export type IUserRole = 'member' | 'admin'

export interface IUser {
    _id?: string,
    fullName: string,
    email: string,
    password: string,
    role: IUserRole
}

export type AuthLogin = Pick<IUser, 'email' | 'password'>
