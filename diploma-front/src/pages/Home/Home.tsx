import './Home.css'
import Post from "../../components/Post/Post";
import SloganBack from '../../shared/images/home_background.jpg'
import {useCallback, useEffect, useState} from "react";
import {EApprove, IPost} from "../../utils/types/post.types";
import {getPosts, likeAPost} from "../../api/post/post";
import {useNavigate} from "react-router";
import {useAppSelector} from "../../hooks/useAppSelector";

const Home = () => {
    const [posts, setPosts] = useState<IPost[]>([])
    const user = useAppSelector(state => state.user.user)

    const router = useNavigate()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = useCallback(() => {
        getPosts(EApprove.APPROVED).then(res => setPosts(res.data))
    }, [])

    const like = useCallback(async (postId: string, like: boolean) => {
        if (user._id) await likeAPost({userId: user._id, postId, isLike: like}).then(r => fetchData())
    }, [user])

    return <>
        <div className="home">
            <div className="home__slogan">
                <img src={SloganBack} className="home__slogan__image"/>
                <div className="home__slogan__block">
                    <h3 className="home__slogan__title">SafeZone</h3>
                    <h4 className="home__slogan__subtitle">Будь готов</h4>
                </div>
            </div>
            <div className="home__marketing">
                <h2 className="home__marketing__question">Чем вам поможет SafeZone?</h2>
                <p className="home__marketing__answer">
                    SafeZone - это проект, который посвящен образованию людей о половой жизни. Наша цель - помочь
                    родителям и детям общаться на эти темы без страха и смущения. Мы предлагаем уникальные инструменты,
                    курсы и материалы, которые помогут подросткам и их родителям получить знания, которые они нуждаются,
                    чтобы стать здоровыми, самоуверенными и ответственными взрослыми. <br/><br/>
                    SafeZone уверен, что сексуальное образование не должно быть табу и что каждый должен иметь право на
                    знания и информацию. Мы верим, что наша работа поможет улучшить качество жизни многих людей,
                    создавая безопасную и открытую среду для всех.<br/><br/>
                    Присоединитесь к нам в SafeZone и начните свой путь к лучшему пониманию своего тела и сексуальности.
                </p>
            </div>
            <div className="home__popular__posts">
                <h5 className="home__popular__posts__title">Популярные посты</h5>
                <div className="home__posts">
                    {posts.length ? posts.map(el => <Post key={el._id} {...el} viewed={el.viewed.length}
                                           userLiked={!!el.liked.find(likedUser => likedUser._id === user._id)}
                                           likePost={() => like(el._id, true)}
                                           dislikeAPost={() => like(el._id, false)}
                                           href={() => router(`/article/${el._id}`)}/>)
                    : <p className="home__not__found">Пока нет новых постов</p>}
                </div>
            </div>
        </div>
    </>
}
export default Home;
