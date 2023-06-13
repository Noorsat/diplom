import './FavouritePosts.css'
import {useAppSelector} from "../../hooks/useAppSelector";
import {useEffect, useState} from "react";
import {getLikedPost} from "../../api/post/post";
import {IPost} from "../../utils/types/post.types";
import Post from "../../components/Post/Post";
import {useNavigate} from "react-router";

const FavouritePosts = () => {
    const user = useAppSelector(state => state.user.user)
    const [posts, setPosts] = useState<IPost[]>([])
    const router = useNavigate()

    useEffect(() => {
        if (user._id) getLikedPost(user._id).then(res => setPosts(res.data))
    }, [user])

    return <>
        <div className="favourite__posts">
            <h5 className="favourite__posts__title">Понравившиеся посты:</h5>
            <div className="favourite__posts__list">
                {posts.map(post => <Post {...post} viewed={post.viewed.length} userLiked={true}
                                         href={() => router(`/article/${post._id}`)}/>)}
            </div>
        </div>
    </>
}

export default FavouritePosts;
