import {IStateUser} from "../../utils/types/user.types";

export const initialState: IStateUser = {
    user: {
        _id: '',
        password: '',
        fullName: '',
        email: '',
        role: null
    }
}
