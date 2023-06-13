import mongoose from "mongoose";
import PostSchema from "../schemas/post.schema";

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
