import mongoose from "mongoose";
import CategorySchema from "../schemas/category.schema";

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
