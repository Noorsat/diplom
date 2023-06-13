import './Article.css'
import BackIcon from '../../shared/icons/left_icon.svg'
import ArticleImg from '../../shared/images/topic_youngster.jpeg'
import Comment from "../../components/Comment/Comment";
// import {useAppSelector} from "../../hooks/useAppSelector";
import SuggestPost from "../../components/SuggestPost/SuggestPost";
import {useNavigate, useParams} from "react-router";
import {useCallback, useEffect, useState} from "react";
import {getPostById, getPosts} from "../../api/post/post";
import {EApprove, IPost} from "../../utils/types/post.types";
import {comment, deleteComment, upvoteForComment} from "../../api/comment/comment";
import {useAppSelector} from "../../hooks/useAppSelector";
import parse from 'html-react-parser';

const Article = () => {

    const {id} = useParams()
    const [post, setPost] = useState<IPost>()
    const [suggestedPosts, setSuggestedPosts] = useState<IPost[]>([])
    const [commentText, setCommentText] = useState<string>('')
    const user = useAppSelector(state => state.user.user)
    const router = useNavigate();

    useEffect(() => {
        if (id && user) {
            fetchData()
        }
    }, [id, user])

    useEffect(() => {
        if (post) {
            getAllPosts()
        }
    }, [post])

    const fetchData = useCallback(() => {
        if (id && user._id) getPostById(id, user._id).then(res => setPost(res.data))
    }, [id, user])

    const getAllPosts = useCallback(() => {
        if (post) {
            getPosts(EApprove.APPROVED).then(posts => {
                const filteredPosts = posts.data.filter(item => post.category === item.category && post._id !== item._id)
                setSuggestedPosts([filteredPosts[0], filteredPosts[1], filteredPosts[2]])
            })
        }
    }, [post])

    const createComment = useCallback(async () => {
        if (user._id && post?._id) await comment({userId: user._id, postId: post?._id, commentText}).then(r => {
            fetchData()
        })
    }, [user, post, commentText])

    const upvoteTheComment = useCallback(async (commentId: string, isUpvote: boolean) => {
        if (user._id) await upvoteForComment({commentId, userId: user._id, isUpvote}).then(r => {
            fetchData()
        })
    }, [user])

    const deleteTheComment = useCallback(async (commentId: string) => {
        if (post) await deleteComment({postId: post._id, commentId}).then(r => {
            fetchData()
        })
    }, [post])

    console.log(suggestedPosts)

    return post ? <div className="article">
        <div className="article__title__block">
            <img src={BackIcon} alt="" className="article__back__icon" onClick={() => router(-1)}/>
            <h4 className="article__title__text">{post.title}</h4>
        </div>
        <div className="article__body">
            <div className="article__main">
                <div className="article__label">
                    <div className="article__statistics">
                        <div className="article__stat__item">
                            <img src="/shared/icons/like_icon.svg" alt="" className="article__stat__like"/>
                            <p className="article__stat__text">{post.liked.length}</p>
                        </div>
                        <div className="article__stat__item">
                            <img src="/shared/icons/comment_icon.svg" alt="" className="article__stat__comment"/>
                            <p className="article__stat__text">{post.comments.length}</p>
                        </div>
                        <div className="article__stat__item">
                            <img src="/shared/icons/eye_icon.svg" alt="" className="article__stat__visited"/>
                            <p className="article__stat__text">{post.viewed.length}</p>
                        </div>
                    </div>
                    <img src={post?.photo || ArticleImg} alt="" className="article__label__image"/>
                </div>
                <div className="article__information">
                    {/*<h4 className="article__information__title">Что такое иммунная система?</h4>*/}
                    {/*<br/>*/}
                    <p className="article__information__content">{parse(post?.description.replace(/\n/g, "<br></br>"))}</p>
                    {/*<br/>*/}
                    {/*<h4 className="article__information__title">Каковы части иммунной системы?</h4>*/}
                    {/*<br/>*/}
                    {/*<p className="article__information__content">*/}
                    {/*    Многие клетки и органы работают вместе, чтобы защитить тело. Лейкоциты, также называемые*/}
                    {/*    лейкоцитами*/}
                    {/*    (LOO-kuh-sytes), играют важную роль в иммунной системе.<br/><br/>*/}
                    {/*    Некоторые типы лейкоцитов, называемые фагоцитами (FAH-guh-sytes), пережевывают вторгшиеся*/}
                    {/*    организмы.*/}
                    {/*    Другие, называемые лимфоцитами (LIM-fuh-sytes), помогают организму запоминать захватчиков и*/}
                    {/*    уничтожать их.<br/><br/>*/}
                    {/*    Одним из видов фагоцитов являются нейтрофилы (NOO-truh-fil), которые борются с бактериями. Когда*/}
                    {/*    у*/}
                    {/*    кого-то может быть бактериальная инфекция, врачи могут назначить анализ крови, чтобы увидеть, не*/}
                    {/*    вызвала ли она в организме большое количество нейтрофилов. Другие типы фагоцитов выполняют свою*/}
                    {/*    работу, чтобы убедиться, что организм реагирует на захватчиков.*/}
                    {/*</p>*/}
                </div>
            </div>
            {
                post.video && 
                <div className="article__video">
                    <iframe width="70%" height="100%"
                            src={`https://www.youtube.com/embed/${post.video.split("=")[1]}`}>
                    </iframe>
                </div>   
            }
            {suggestedPosts.length ?
                <div className="article__suggested__posts">
                    <h4 className="article__suggested__title">Возможно, вам будет интересно:</h4>
                    <div className="article__suggested__list">
                        {
                            suggestedPosts.map(post => <SuggestPost navigate={() => router(`/article/${post._id}`)}
                                                                    image={ArticleImg} title={post.title}
                                                                    content={post.description}/>)
                        }
                    </div>
                </div>
            : null}
        </div>
        <div className="article__comments">
            <h4 className="article__comment__title">Комментарии</h4>
            <div className="article__comment__list">
                {
                    post.comments.map(({upvote, author, text, updatedAt, _id}) => <Comment _id={_id}
                                                                                           vote={upvoteTheComment}
                                                                                           isUser={author._id === user._id}
                                                                                           isUserUpvoted={!!upvote.find(upvote => upvote._id === user._id)}
                                                                                           text={text}
                                                                                           deleteComment={() => deleteTheComment(_id)}
                                                                                           upvotes={upvote.length}
                                                                                           author={author.fullName}
                                                                                           time={new Date(updatedAt).toLocaleString('en', {
                                                                                               weekday: 'long',
                                                                                               year: 'numeric',
                                                                                               month: '2-digit',
                                                                                               day: 'numeric'
                                                                                           })}/>)
                }
            </div>
            <div className="article__comment__field">
                <img src={ArticleImg} alt="" className="article__comment__avatar"/>
                <input type="text" placeholder="Написать комментарий" value={commentText}
                       onChange={(e) => setCommentText(e.target.value)} className="article__comment__input"/>
                <button className="article__comment__submit" onClick={createComment}>Отправить</button>
            </div>
        </div>
    </div> : <></>
}

export default Article;
