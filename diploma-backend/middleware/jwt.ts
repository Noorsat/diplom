import * as jwt from 'jsonwebtoken'
import UserService from "../routes/user/service";
import {responseWrapper} from "../utils/utils";

export const auth = async (req: any, res: any, next: () => any) => {
    try {
        if (!req.headers.authorization) return res.status(403).send(responseWrapper(null, 'Access denied', false))

        const authToken = req.headers.authorization.split(' ')[1]
        const tokenDecoded = jwt.verify(authToken, 'secret_login') as any
        const user = await UserService.getUserById(tokenDecoded.user._id)

        if (user) {
            res.locals.user = user;
            next();
        } else {
            res.status(403).send(responseWrapper(null, 'No user exist.', false))
        }
    } catch (err) {
        res.status(403).send(responseWrapper(null, 'JWT Expired, please relogin', false))
    }
}
