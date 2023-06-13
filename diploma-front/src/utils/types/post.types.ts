import {IComment} from "./comment.types";
import {IUser} from "./user.types";

export interface IPost {
    _id: string,
    title: string,
    description: string,
    photo: string,
    video: string,
    category: string,
    createdBy: IUser,
    approved: number,
    liked: IUser[],
    comments: IComment[],
    viewed: IUser[]
}

export interface IPostCreation {
    title: string,
    description: string,
    photo: string,
    video: string,
    category: string,
    createdBy: string,
    approved?: EApprove
}

export interface ILikePost {
    userId: string,
    postId: string,
    isLike: boolean
}

export enum EApprove {
    NOT_APPROVED,
    PENDING,
    APPROVED
}

