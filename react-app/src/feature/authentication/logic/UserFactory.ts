
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
        user.keycloak_uuid = token.sub;
        user.token = token
        return user
    }

    createGuestUser(): User {
        const user = new User();
        user.name = "Guest";
        user.roles.push(Role.UNKNOWN)
        return user;
    }
}