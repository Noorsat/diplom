import {IUser} from "../../types/auth.types";
import UserModel from "../../db/models/user.model";
import mongoose from "mongoose";
import {IPost} from "../../types/post.types";

export default class UserService {

    static async getUsers() {
        return UserModel.find()
    }

    static async createUser(data: IUser) {
        try {
            if (!data.email || !data.password) return false
            const exists = await UserModel.exists(data)
            if (exists) return false
            const newUser = await new UserModel(data);
            await newUser.save();
            return newUser;
        } catch (e) {
            return false
        }
    }

    static async getUserById(id: string) {
        return UserModel.findOne({_id: id as unknown as mongoose.Types.ObjectId})
    }

    static async reHandleLikePost(user: IUser, post: IPost, isLike: boolean) {
        await UserModel.findOneAndUpdate(
            {_id: user._id},
            {
                [isLike ? '$push' : '$pull']: {likedPosts: post._id}
            }
        )
    }
}
