import {IComment, ICommentDelete, ICommentReq, UpvoteReq} from "../../utils/types/comment.types";
import instance from "../../axios/axios.instance";
import {IRes} from "../../utils/types/api.types";

export const comment = async (data: ICommentReq) => {
    return (await instance.post('/comments', data, {
        headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}
    })).data
}

export const upvoteForComment = async (data: UpvoteReq): Promise<IRes<IComment>> => {
    return (await instance.put('/comments', data, {
        headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}
    }))
}

export const deleteComment = async ({postId, commentId}: ICommentDelete) => {
    return (await instance.delete(`/comments/${postId}/${commentId}`, {
        headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}
    })).data
}

