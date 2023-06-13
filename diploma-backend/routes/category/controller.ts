import CategoryService from "./service";
import {responseWrapper} from "../../utils/utils";

export const create = async (req: any, res: any) => {
    const category = await CategoryService.add(req.body);
    if (!category) return res.status(400).json(responseWrapper(null, 'Some field are required.', false));
    res.status(201).json(responseWrapper(category, 'Category successfully created,', true))
}

export const get = async (req: any, res: any) => {
    const categories = await CategoryService.getAll();
    res.status(200).json(responseWrapper(categories, 'All categories fetched successfully.', true))
}

export const getByCategory = async (req: any, res: any) => {
    const categories = await CategoryService.getByCategory(req.params.category);
    res.status(200).json(responseWrapper(categories, `Categories by ${req.params.category} fetched successfully.`, true))
}
