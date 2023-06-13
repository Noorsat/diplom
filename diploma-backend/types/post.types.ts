import {IComment} from "./comment.types";
import {IUser} from "./auth.types";

export interface IPost {
    _id: string,
    title: string,
    category: string,
    description: string,
    photo: string,
    video: string,
    createdBy: string,
    liked: IUser[],
    comments: IComment[]
}

export interface ILikePost {
    userId: string,
    postId: string,
    isLike: boolean
}

export interface ApprovalStatus {
    postId: string,
    approved: ApprovalEnum
}

export enum ApprovalEnum {
    NOT_APPROVED,
    PENDING,
    APPROVED
}


