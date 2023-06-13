import {IUser} from "./user.types";

export interface IComment {
    _id: string,
    author: IUser
    text: string
    upvote: IUser[],
    updatedAt: string
}

export interface ICommentReq {
    postId: string,
    userId: string,
    commentText: string
}

export interface UpvoteReq {
    commentId: string,
    userId: string,
    isUpvote: boolean
}

export interface ICommentDelete {
    commentId: string,
    postId: string
}
