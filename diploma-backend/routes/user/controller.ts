import UserService from "./service";
import {responseWrapper} from "../../utils/utils";

export const get = async (req: any, res: any) => {
    const user = await UserService.getUserById(req.params.userId)
    if (!user) res.status(400).json(responseWrapper(null, 'Error while fetching user.', false))
    res.status(200).json(responseWrapper(user, 'User fetched successfully.', true))
}

