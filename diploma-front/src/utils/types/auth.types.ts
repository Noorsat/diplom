import {IUser} from "./user.types";

export type IRegister = Omit<IUser, 'role'>
export type ILogin = Omit<IUser, 'role' | 'fullName'>
