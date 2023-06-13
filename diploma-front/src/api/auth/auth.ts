import {ILogin, IRegister} from "../../utils/types/auth.types";
import {IRes} from "../../utils/types/api.types";
import instance from "../../axios/axios.instance";
import {IUserRes} from "../../utils/types/user.types";

export const register = async (data: IRegister): Promise<IRes<IUserRes>> => {
    return (await instance.post('/auth/register', data)).data
}

export const login = async (data: ILogin): Promise<IRes<IUserRes>> => {
    return (await instance.post('/auth/login', data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })).data
}
