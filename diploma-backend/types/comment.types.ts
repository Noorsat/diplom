import {IUser} from "./auth.types";

export interface IComment {
    author: IUser,
    text: string,
    upvote: number
}

export interface ICommentReq {
    postId: string,
    userId: string,
    commentText: string
}

export interface IUpvoteComment {
    commentId: string,
    userId: string,
    isUpvote: boolean
}
