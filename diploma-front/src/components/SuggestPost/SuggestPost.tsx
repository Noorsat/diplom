import './SuggestPost.css'
import {FC} from "react";

interface IProps {
    image: string,
    title: string,
    content: string,
    navigate: () => void
}

const SuggestPost: FC<IProps> = ({image, title, content, navigate}) => {
    return <div className="article__suggested__item" onClick={navigate}>
        <img className="article__suggested__item__image" src={image}/>
        <h4 className="article__suggested__item__title">{title}</h4>
        <p className="article__suggested__item__content">{`${content.substring(0, 100)}...`}</p>
    </div>
}

export default SuggestPost;
