import {responseWrapper} from "../../utils/utils";
import CommentService from "./service";

export const comment = async (req: any, res: any) => {
    const comment = await CommentService.commentAPost(req.body)
    if (!comment) return res.status(400).json(responseWrapper(null, 'Error while commenting post.', false))
    res.status(200).json(responseWrapper(comment, 'Post commented successfully!', true))
}

export const voteForComment = async (req: any, res: any) => {
    const upvoted = await CommentService.vote(req.body);
    res.status(200).json(responseWrapper(upvoted, 'Comment upvoted!', true))
}

export const deleteComment = async (req: any, res: any) => {
    const deleted = await CommentService.delete(req.params.postId, req.params.commentId)
    if (!deleted) return res.status(400).json(responseWrapper(null, 'Error while deleting comment.', false))
    res.status(200).json(responseWrapper(deleted, 'Successfully deleted comment!', true))
}

