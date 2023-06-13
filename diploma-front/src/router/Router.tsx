import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import FavouritePosts from "../pages/FavouritePosts/FavouritePosts";
import Header from "../components/Header/Header";
import Topics from "../pages/Topics/Topics";
import Article from "../pages/Article/Article";
import Help from "../pages/Help/Help";
import PostCreate from "../pages/PostCreate/PostCreate";
import {useAppDispatch, useAppSelector} from "../hooks/useAppSelector";
import {useEffect} from "react";
import {setUser} from "../store/user/slice";
import {IUser} from "../utils/types/user.types";
import Statuses from "../pages/Statuses/Statuses";
import ProtectedRouter from "./ProtectedRouter";

const Router = () => {
    const {user} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (localStorage.getItem('user')) {
            dispatch(setUser(JSON.parse(localStorage.getItem('user')!) as IUser))
        }
    }, [])

    return <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/topic/:role" element={<Topics/>}/>
            <Route path="/help" element={<Help/>}/>
            <Route path="/article/:id" element={<Article/>}/>
            <Route path="/favourite"
                   element={<ProtectedRouter role={user.role} permittedRoles={['member', 'admin']}>
                       <FavouritePosts/>
                   </ProtectedRouter>}/>
            <Route path="/createPost" element={<PostCreate/>}/>
            <Route path="/approvalStatuses" element={<ProtectedRouter permittedRoles={['admin']} role={user.role}>
                <Statuses/>
            </ProtectedRouter>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    </BrowserRouter>
}

export default Router;
