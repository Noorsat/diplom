import Accordion from "../../components/Accordion/Accordion";
import {useNavigate, useParams} from "react-router";
import './Topics.css'
import TopicParent from '../../shared/images/topic_parent.jpeg'
import TopicYoung from '../../shared/images/topic_youngster.jpeg'
import {useEffect, useMemo, useState} from "react";
import {CategoryAudition, ICategory} from "../../utils/types/category.types";
import {getTopics} from "../../api/category/category";

const Topics = () => {
    const {role} = useParams()
    const [topics, setTopics] = useState<ICategory[]>([])
    const router = useNavigate();

    useEffect(() => {
        getTopics(role as CategoryAudition).then(res => setTopics(res.data))
    }, [role])

    const {title, description, image} = useMemo(
        () => (
            {
                title: role === 'parent' ? 'Для родителей' : 'Для подростков',
                description: role === 'parent'
                    ? 'Советы по детскому здоровью, поведению и росту – от рождения до подросткового возраста.'
                    : 'Поддержка и советы по вопросам здоровья, эмоций и жизни',
                image: role === 'parent' ? TopicParent : TopicYoung
            }
        ),
        [role])

    return <div className="topics">
        <div className="topics__board">
            <img className="topics__board__image" src={image}/>
            <div className="topics__board__info">
                <h3 className="topics__board__role">{title}</h3>
                <p className="topics__board__content">{description}</p>
            </div>
        </div>
        <div className="topics__advise">
            <h4 className="topics__advise__title">Все темы:</h4>
            <div className="topics__accordions">
                {topics.map(topic => <>
                    <Accordion title={topic.title} description={topic.description}>
                        <ul className="topics__articles">
                            {topic.posts.filter(post => post.approved === 2).map(t => <li className="topic__item" onClick={() => router(`/article/${t._id}`)}>{t.title}</li>)}
                        </ul>
                    </Accordion>
                </>)}
            </div>
        </div>
    </div>
}

export default Topics;
