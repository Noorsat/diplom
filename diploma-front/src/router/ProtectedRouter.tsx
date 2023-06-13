import {FC, ReactNode} from "react";
import {Navigate} from "react-router-dom";

interface IProps {
    role: string | null,
    permittedRoles: string[]
    children: ReactNode
}

// @ts-ignore
const ProtectedRouter: FC<IProps> = ({role, children, permittedRoles}) => {
    if (role && !permittedRoles.includes(role)) {
        return <Navigate to="/" />
    }
    return children;
}

export default ProtectedRouter;
