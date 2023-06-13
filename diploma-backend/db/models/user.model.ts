import mongoose from "mongoose";
import UserSchema from "../schemas/user.schema";

export default mongoose.models.User || mongoose.model('User', UserSchema);
