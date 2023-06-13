import {ICategory} from "../../types/category.types";
import CategoryModel from "../../db/models/category.model";
import {IPost} from "../../types/post.types";
import mongoose from "mongoose";

export default class CategoryService {
    static async add(data: ICategory) {
        if (!data.title || !data.description || !data.auditory) return false;
        const newCategory = await new CategoryModel(data);
        await newCategory.save()
        return newCategory;
    }

    static async getAll() {
        return CategoryModel.find();
    }

    static async getByCategory(category: string) {
        return CategoryModel.find({auditory: category}).populate('posts')
    }

    static async addPostToCategory(post: IPost) {
        await CategoryModel.findOneAndUpdate({title: post.category}, {
            $push: {
                posts: post
            }
        })
    }
}
