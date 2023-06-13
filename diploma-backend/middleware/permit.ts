import {IUserRole} from "../types/auth.types";
import {responseWrapper} from "../utils/utils";

export const permission = (permittedRoles: IUserRole[]) => {
    return (req: any, res: any, next: () => any) => {
        const {role} = res.locals.user;
        if (role && permittedRoles.includes(role)) {
            next();
        } else {
            res.status(403).json(responseWrapper(null, 'Access denied', false));
        }
    };
}
