import './Post.css';
import PostImage from "../../shared/images/home_background.jpg";
import {FC} from "react";
import {IComment} from "../../utils/types/comment.types";
import {IUser} from "../../utils/types/user.types";
import LikedIcon from '../../shared/icons/liked_icon.png'

interface IProps {
    title: string,
    description: string,
    liked: IUser[],
    userLiked: boolean,
    viewed: number,
    comments: IComment[],
    href: () => void,
    likePost?: () => void,
    dislikeAPost?: () => void
}

const Post: FC<IProps> = ({title, description, viewed, userLiked = false, liked, likePost, dislikeAPost, comments = [], href}) => {
    return <div className="post__item">
        <div className="post__item__image__block">
            <img src={PostImage} alt="" className="post__item__image"/>
        </div>
        <div className="post__item__info">
            <h2 className="post__item__info__title">{title}</h2>
            <p className="post__item__info__content">{description}</p>
            <div className="post__item__info__footer">
                <div className="post__item__reactions">
                    <div className="post__item__reaction">
                        <img className="post__item__reaction__icon"
                             src={`${userLiked ? LikedIcon : '/shared/icons/like_icon.svg'}`}
                             onClick={userLiked ? dislikeAPost : likePost}/>
                        <p className="post__item__reaction__count">{liked.length}</p>
                    </div>
                    <div className="post__item__reaction">
                        <img className="post__item__reaction__icon" src="/shared/icons/comment_icon.svg"/>
                        <p className="post__item__reaction__count">{comments.length}</p>
                    </div>
                    <div className="post__item__reaction">
                        <img className="post__item__reaction__icon" src="/shared/icons/eye_icon.svg"/>
                        <p className="post__item__reaction__count">{viewed}</p>
                    </div>
                </div>
                <button className="post__item__read__btn" onClick={href}>Прочитать</button>
            </div>
        </div>
    </div>
}

export default Post;
