import {FC, ReactChildren, ReactNode, useState} from "react";
import './Accordion.css';

interface IProps {
    title: string,
    description: string,
    children: ReactNode
}

const Accordion: FC<IProps> = ({title, description, children}) => {
    const [expand, setExpand] = useState<boolean>(false)

    return <div className="accordion__item">
        <div className="accordion__title__block">
            <h5 className="accordion__title__text">{title}</h5>
            <img src={`/shared/icons/${!expand ? 'expand' : 'unexpand'}_icon.svg`}
                 className="accordion__expand__icon"
                 onClick={() => setExpand(prev => !prev)}/>
        </div>
        <div className={`accordion__expand__block ${expand ? 'expand' : ''}`}>
            <p className="accordion__expand__text">{description}</p>
            {children}
        </div>
    </div>
}
export default Accordion;
