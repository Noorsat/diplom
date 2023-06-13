import {FC, useCallback, useEffect, useState} from "react";
import {EApprove, IPost} from "../../utils/types/post.types";
import {getPosts, setApproval} from "../../api/post/post";
import ArticleImg from '../../shared/images/topic_youngster.jpeg'
import './Statuses.css'

const Statuses: FC = () => {

    const [statuses, setStatuses] = useState<IPost[]>([])
    const approve = useCallback(async (post: string, approve: EApprove) => {
        await setApproval(post, approve).then(res => fetchData())
    }, [])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = useCallback(() => {
        getPosts(EApprove.PENDING).then(res => setStatuses(res.data))
    }, [])

    return (
        <div className="statuses__list">
            {
                statuses.length ? statuses.map(post => <div className="statuses__item">
                        <div className="statuses__item__image__block">
                            <img src={ArticleImg} className="statuses__item__image"/>
                        </div>
                        <div className="statuses__item__label">
                            <p className="statuses__item__title">{post.title}</p>
                            <p className="statuses__item__content">{post.description}</p>
                        </div>
                        <div className="statuses__item__icons">
                            <p className="statuses__item__icon__approve"
                               onClick={() => approve(post._id, EApprove.APPROVED)}>YES</p>
                            <p className="statuses__item__icon__reject"
                               onClick={() => approve(post._id, EApprove.NOT_APPROVED)}>NO</p>
                        </div>
                    </div>)
                    : <p className="statuses__not__found">Пока нет новых заявок по статусам</p>
            }
        </div>
    )
}

export default Statuses;
