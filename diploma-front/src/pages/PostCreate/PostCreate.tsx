import './PostCreate.css'
import {BaseSyntheticEvent, useCallback, useEffect, useState} from "react";
import {EApprove, IPostCreation} from "../../utils/types/post.types";
import {createPost} from "../../api/post/post";
import {ICategory} from "../../utils/types/category.types";
import {getTopics} from "../../api/category/category";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useNavigate} from "react-router";

const PostCreate = () => {

    const {_id, role} = useAppSelector(state => state.user.user)
    const router = useNavigate()
    const [newPost, setNewPost] = useState<IPostCreation>({
        title: '',
        description: '',
        photo: '',
        video: '',
        category: 'Тело',
        createdBy: '',
    })
    const [categories, setCategories] = useState<ICategory[]>([])

    const addData = (name: keyof IPostCreation) => (event: BaseSyntheticEvent) => {
        setNewPost(prev => ({...prev, [name]: event.target.value}))
    }

    useEffect(() => {
        getTopics().then(res => setCategories(res.data))
    }, [])

    const submitData = useCallback(async () => {
        try {
            if (_id) await createPost({...newPost, createdBy: _id, approved: role === 'admin' ? EApprove.APPROVED : EApprove.PENDING})
            router('/')
        } catch (err) {
            console.log(err)
        }
    }, [newPost, _id])

    return <div className="creation">
        <h4 className="creation__title">Добавить статью</h4>
        <div className="creation__list">
            <div className="creation__item">
                <label htmlFor="title" className="creation__label">Введите название статьи: <span>*</span></label>
                <textarea id="title" className="creation__input first__input"
                          placeholder="Название статьи"
                          onChange={addData('title')}/>
            </div>
            <div className="creation__item">
                <label htmlFor="description" className="creation__label">Введите описание статьи: <span>*</span></label>
                <textarea id="description" className="creation__input second__input"
                          placeholder="Описание статьи"
                          onChange={addData('description')}/>
            </div>
            <div className="creation__item">
                <label htmlFor="city" className="creation__label creation__select__label">Выберите категорию:</label>
                <select name="city" id="city" className="creation__input creation__select"
                        onChange={addData('category')}>
                    {categories.map(el => <option value={el.title}>{el.title}</option>)}
                </select>
            </div>
            <div className="creation__item">
                <label htmlFor="photo" className="creation__label">Добавьте фото:</label>
                <textarea id="photo" className="creation__input last__input" onChange={addData('photo')}/>
            </div>
            <div className="creation__item">
                <label htmlFor="video" className="creation__label">Добавьте видео: </label>
                <textarea id="video" className="creation__input last__input" onChange={addData('video')}/>
            </div>
        </div>
        <button className="creation__submit__btn" onClick={submitData}>Загрузить статью</button>
    </div>
}

export default PostCreate;
