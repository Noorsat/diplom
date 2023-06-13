import instance from "../../axios/axios.instance";
import {CategoryAudition, ICategory} from "../../utils/types/category.types";
import {IRes} from "../../utils/types/api.types";

export const getTopics = async (topic?: CategoryAudition): Promise<IRes<ICategory[]>> => {
    return (await instance.get(`/categories/${topic ?? ''}`)).data
}
