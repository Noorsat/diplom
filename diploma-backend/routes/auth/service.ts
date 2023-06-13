import {AuthLogin} from "../../types/auth.types";
import UserModel from "../../db/models/user.model";

export default class AuthService {
    static async logIn (data: AuthLogin) {
        try {
            return await UserModel.findOne(data);
        } catch (e) { return false }
    }
}
