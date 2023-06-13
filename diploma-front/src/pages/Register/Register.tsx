import './Register.css'
import {BaseSyntheticEvent, useCallback, useState} from "react";
import {IRegister} from "../../utils/types/auth.types";
import {register} from "../../api/auth/auth";
import {useNavigate} from "react-router";
import {useAppDispatch} from "../../hooks/useAppSelector";
import {setUser} from "../../store/user/slice";

const Register = () => {
    const [data, setData] = useState<IRegister>({fullName: '', email: '', password: ''})
    const router = useNavigate()
    const dispatch = useAppDispatch()

    const setInputData = useCallback((name: keyof IRegister) => {
        return (event: BaseSyntheticEvent) => {
            setData(prev => ({...prev, [name]: event.target.value}))
        }
    }, [])

    const registerHandler = useCallback(async () => {
        try {
            const res = await register(data)
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

    return <div className="register">
        <div className="register__area">
            <h2 className="register__label">Регистрация</h2>
            <div className="register__field">
                <p className="register__input__label">Имя и Фамилия</p>
                <input className="register__input" onChange={setInputData('fullName')}
                       placeholder="Введите имя и фамилию"/>
            </div>
            <div className="register__field">
                <p className="register__input__label">Электронная почта</p>
                <input className="register__input" onChange={setInputData('email')} placeholder="Введите почту"/>
            </div>
            <div className="register__field">
                <p className="register__input__label">Пароль</p>
                <input className="register__input" type="password" onChange={setInputData('password')}
                       placeholder="Введите пароль"/>
            </div>
        </div>
        <button className="register__submit__btn" onClick={registerHandler}>Создать аккаунт</button>
    </div>
}

export default Register;
