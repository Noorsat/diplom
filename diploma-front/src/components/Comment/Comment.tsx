import './Comment.css'
import RatePlusIcon from '../../shared/icons/comment_plus_icon.svg'
import RateMinusIcon from '../../shared/icons/comment_minus_icon.svg'
import ReplyIcon from '../../shared/icons/reply_icon.svg'
import DeleteIcon from '../../shared/icons/delete_icon.svg'
import Ava from '../../shared/images/topic_youngster.jpeg'
import {FC} from "react";

interface IProps {
    _id: string,
    text: string,
    upvotes: number,
    author: string,
    time: string,
    isUser?: boolean,
    vote: (commentId: string, isUpvote: boolean) => void,
    isUserUpvoted: boolean,
    deleteComment: () => void
}

const Comment: FC<IProps> = ({
                                 _id,
                                 text,
                                 upvotes,
                                 deleteComment,
                                 isUserUpvoted,
                                 isUser = false,
                                 author,
                                 time,
                                 vote
                             }) => {
    return <div className="comment">
        <div className="comment__rate__block">
            <img src={RatePlusIcon} alt="" className="comment__rate__minus"
                 onClick={!isUserUpvoted ? () => vote(_id, true) : undefined}/>
            <p className="comment__rating">{upvotes}</p>
            <img src={RateMinusIcon} alt="" className="comment__rate__minus"
                 onClick={isUserUpvoted ? () => vote(_id, false) : undefined}/>
        </div>
        <div className="comment__info">
            <div className="comment__item">
                <div className="comment__user__info">
                    <img src={Ava} alt="" className="comment__user__avatar"/>
                    <h4 className="comment__user__name">{author}</h4>
                    {isUser && <p className="comment__you">Вы</p>}
                    <p className="comment__timestamp">{time}</p>
                </div>
                <div className="comment__reply" onClick={!isUser ? undefined : deleteComment}>
                    <img src={!isUser ? ReplyIcon : DeleteIcon} alt="reply icon" className="comment__reply__icon"/>
                    <p className="comment__reply__text">{!isUser ? 'Ответить' : 'Удалить'}</p>
                </div>
            </div>
            <div className="comment__text__block">
                <p className="comment__text">{text}</p>
            </div>
        </div>
    </div>
}

export default Comment;
