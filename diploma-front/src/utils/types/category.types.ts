import {IPost} from "./post.types";

export interface ICategory {
    title: string,
    description: string,
    auditory: CategoryAudition,
    posts: IPost[]
}

export type CategoryAudition = 'parent' | 'younh'
