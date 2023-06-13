import {Response} from "../types/global.types";

export const responseWrapper = <T>(data: T | T[], message: string, status: boolean): Response<T | T[]> => ({
    data,
    message,
    status
})
