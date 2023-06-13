import mongoose from "mongoose";
import CommentSchema from "../schemas/comment.schema";

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
