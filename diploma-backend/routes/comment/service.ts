import {ICommentReq, IUpvoteComment} from "../../types/comment.types";
import UserService from "../user/service";
import CommentModel from "../../db/models/comment.model";
import PostModel from "../../db/models/post.model";
import mongoose from "mongoose";
import {user} from "../../utils/mock";
import PostService from "../post/service";
import {comment} from "./controller";

export default class CommentService {
    static async commentAPost({userId, postId, commentText}: ICommentReq) {
        const user = await UserService.getUserById(userId)
        const newComment = await new CommentModel({author: user, text: commentText})
        await newComment.save()
        return PostModel.findOneAndUpdate({_id: postId as unknown as mongoose.Types.ObjectId}, {
            $push: {comments: newComment}
        }, {new: true});
    }

    static async vote({commentId, userId, isUpvote}: IUpvoteComment) {
        const upvotedUser = await UserService.getUserById(userId);
        return CommentModel.findOneAndUpdate({_id: commentId as unknown as mongoose.Types.ObjectId}, {
            [isUpvote ? '$push' : '$pull']: {upvote: upvotedUser._id}
        }, {new: true}).populate('upvote')
    }

    static async findCommentById(commentId: string) {
        return CommentModel.findOne({_id: commentId as unknown as mongoose.Types.ObjectId})
    }

    static async delete(postId: string, commentId: string) {
        const comment = await this.findCommentById(commentId)
        return PostService.update(postId, {
            $pull: {
                comments: comment._id
            }
        })
    }

}
