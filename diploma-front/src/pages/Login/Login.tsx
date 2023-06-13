import './Login.css'
import {BaseSyntheticEvent, useCallback, useState} from "react";
import {ILogin} from "../../utils/types/auth.types";
import {login} from "../../api/auth/auth";
import {useNavigate} from "react-router";
import {useAppDispatch} from "../../hooks/useAppSelector";
import {setUser} from "../../store/user/slice";

const Login = () => {
    const [data, setData] = useState<ILogin>({email: '', password: ''})
    const router = useNavigate();
    const dispatch = useAppDispatch();

    const changeData = useCallback((name: keyof ILogin) => {
        return (ev: BaseSyntheticEvent) => {
            setData(prev => ({...prev, [name]: ev.target.value}))
        }
    }, [])

    const loginHandler = useCallback(async () => {
        try {
            const res = await login(data)
            if (res.status) {
                localStorage.setItem('accessToken', res.data.accessToken)
                localStorage.setItem('user', JSON.stringify(res.data.user))
                dispatch(setUser(res.data.user))
                router('/')
            }
        } catch (e) {
            console.log(e)
        }
    }, [data])

    return <div className="login">
        <div className="login__area">
            <h2 className="login__label">Войти</h2>
            <div className="login__field">
                <p className="login__input__label">Электронная почта</p>
                <input className="login__input" onChange={changeData('email')} placeholder="Введите почту"/>
            </div>
            <div className="login__field">
                <p className="login__input__label">Пароль</p>
                <input className="login__input" type="password" onChange={changeData('password')}
                       placeholder="Введите пароль"/>
            </div>
            <button className="login__submit__btn" onClick={loginHandler}>Войти</button>
            <p className="login__no__account">У вас нет аккаунта? <span className="login__create__account"
                                                                        onClick={() => router('/register')}>Создать аккаунт</span>
            </p>
        </div>
    </div>
}

export default Login;
