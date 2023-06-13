import './Header.css'
import {useNavigate} from "react-router";
import {useAppDispatch, useAppSelector} from "../../hooks/useAppSelector";
import {useCallback, useRef, useState} from "react";
import {setUser} from "../../store/user/slice";
import {useSearch} from "../../hooks/useSearch";

const Header = () => {

    const {user} = useAppSelector(state => state.user)
    const router = useNavigate();
    const [showSidebar, setShowSidebar] = useState<boolean>(false)
    const [showCabinet, setShowCabinet] = useState<boolean>(false);
    const [searchText, setText] = useState<string>()

    const [result] = useSearch(searchText)
    const dispatch = useAppDispatch()

    const logout = useCallback(() => {
        localStorage.removeItem('user')
        localStorage.removeItem('accessToken')
        dispatch(setUser({email: '', password: '', fullName: '', role: null}))
        router('/login')
    }, [])

    return <>
        <div>
            <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
                <p className="sidebar__route" onClick={() => router('/topic/parent')}>Для Родителей</p>
                <p className="sidebar__route" onClick={() => router('/topic/young')}>Для Подростков</p>
                <p className="sidebar__route" onClick={() => router('/help')}>Помощь</p>
            </div>
            <div className={`sidebar__background ${showSidebar ? 'visible' : ''}`}
                 onClick={() => setShowSidebar(prev => !prev)}/>
        </div>
        <div className={`header ${showSidebar ? 'blur' : ''}`}>
            <div className="header__logo">
                <img src="/shared/icons/burger_icon.svg" className="header__burger__icon"
                     onClick={() => setShowSidebar(prev => !prev)}/>
                <p className="header__logo__text" onClick={() => router('/')}>SafeZone</p>
            </div>
            <div className="header__routes">
                <p className="header__route__text" onClick={() => router('/topic/parent')}>Для Родителей</p>
                <p className="header__route__text" onClick={() => router('/topic/young')}>Для Подростков</p>
                <p className="header__route__text" onClick={() => router('/help')}>Помощь</p>
                <div className='header__search__block'>
                    <input type="text" placeholder="Поиск" className="header__search"
                           onChange={e => setText(e.target.value)}/>
                    <div className='header__search__dropdown'>
                        {result.map(text => <p  onClick={() => {
                            router(`/article/${text.id}`);
                            setText("")
                        }} className='dropdown__item'>{text.text}</p>)}
                    </div>
                </div>
                <img src="/shared/icons/search_icon.svg" className="header__mobile__search"/>
                {user?.fullName
                    ? <div className="header__user__avatar" tabIndex={-1}
                           onBlur={() => setShowCabinet(false)}
                           onFocus={() => setShowCabinet(true)}>
                        <p>{user?.fullName[0]}</p>
                    </div>
                    : <button className="header__login__btn" onClick={() => router('/login')}>Войти</button>}
            </div>
        </div>
        <div className={`modal__window ${showCabinet ? 'visible' : ''}`}>
            <h4 className="modal__window__username">{user?.fullName}</h4>
            <p className="modal__window__route">{user?.email}</p>
            <p className="modal__window__route"
               onClick={() => router('/createPost')}>Добавить статью</p>
            {user?.role === 'admin' &&
                    <p className="modal__window__route"
                       onClick={() => router('/approvalStatuses')}>Посмотреть заявки на статьи</p>}
            <p className="modal__window__route" onClick={() => router('/favourite')}>Понравившиеся посты</p>
            <p className="modal__window__route" onClick={logout}>Выйти</p>
        </div>
    </>
}

export default Header;
