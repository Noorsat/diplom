import CategoryService from "../routes/category/service";
import UserService from "../routes/user/service";
import {initCategories, user} from "./mock";

export const setup = async () => {
    const categories = await CategoryService.getAll();
    const users = await UserService.getUsers();

    if (!categories.length) {
        initCategories.forEach(async (el) => {
            await CategoryService.add(el)
        })
    }

    if (!users.length) {
        await UserService.createUser(user);
    }
}
