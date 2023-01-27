
import { useTab } from "@mui/base";
import getEnvironment from "../../../config/env";
import { Role, User } from "../../../models/User";
import { getRoleFromStringArray, JWTToken } from "./FetchUser";


export default class UserFactory {

    createUser(name: string, roles: Role[]): User {
        const user = new User();
        user.name = name;
        user.roles = roles
        return user;
    }

    createUserFromJWT(token: JWTToken): User {
        const user = new User()
        user.email = token.email
        user.firstName = token.given_name;
        user.lastName = token.family_name;
        user.roles = getRoleFromStringArray(token.roles)
        return user
    }





    createGuestUser(): User {
        const user = new User();

        if (getEnvironment().REACT_APP_NODE_ENV === "dev") {
            user.name = "Jens Jensen";
            user.roles.push(Role.ADMIN)
            return user;
        }

        user.name = "";
        user.roles.push(Role.ADMIN)
        return user;
    }
}