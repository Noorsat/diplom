import PostService from "./service";
import {responseWrapper} from "../../utils/utils";

export const create = async (req: any, res: any) => {
    const created = await PostService.create(req.body);
    if (!created) return res.status(400).json(responseWrapper(null, 'Error while creating post.', false))
    res.status(201).json(responseWrapper(created, 'Post successfully created!', true))
}

export const get = async (req: any, res: any) => {
    const posts = await PostService.getPosts(req.query);
    res.status(200).json(responseWrapper(posts, 'Successfully got all posts.', true))
}

export const getByIdAndView = async (req: any, res: any) => {
    const post = await PostService.getPostById(req.params.postId);
    await PostService.userViewed(req.params.postId, req.params.userId)
    if (!post) return res.status(400).json(responseWrapper(null, 'No post by such ID.', false))
    res.status(200).json(responseWrapper(post, `Successfully get the post.`, true))
}

export const relikeAPost = async (req: any, res: any) => {
    const likedPost = await PostService.relikeAPost(req.body);
    if (!likedPost) return res.status(400).json(responseWrapper(null, 'Error while liking post.', false))
    res.status(200).json(responseWrapper(likedPost, `Post ${req.body.isLike ? 'liked!' : 'disliked!'}`, true))
}

export const getLikedPostsByUser = async (req: any, res: any) => {
    const likedPostsByUser = await PostService.getLikedPostsByUser(req.params.userId);
    res.status(200).json(responseWrapper(likedPostsByUser, 'Successfully get all favourite posts', true))
}

export const approval = async (req: any, res: any) => {
    const approveStatus = await PostService.setApproveStatus(req.body)
    res.status(200).json(responseWrapper(approveStatus, 'Approval status updated.', true))
}


