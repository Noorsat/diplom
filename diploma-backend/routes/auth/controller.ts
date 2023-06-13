import AuthService from "./service";
import {responseWrapper} from "../../utils/utils";
import * as jwt from 'jsonwebtoken'
import UserService from "../user/service";

export const login = async (req: any, res: any) => {
    const user = await AuthService.logIn(req.body);
    if (!user) return res.status(400).json(responseWrapper(null, 'Incorrect login or password!', false));
    const accessToken = jwt.sign({user}, 'secret_login', {expiresIn: '1h'})
    res.status(200).json(responseWrapper({user, accessToken}, 'Successfully logged in!', true))
}

export const register = async (req: any, res: any) => {
    const user = await UserService.createUser(req.body);
    if (!user) return res.status(400).json(responseWrapper(null, 'User exist in platform.', false));
    const accessToken = jwt.sign({user}, 'secret_register', {expiresIn: '1h'})
    res.status(201).json(responseWrapper({user, accessToken}, 'User successfully created.', true))
}
