

import getEnvironment from "../../../env";
import { Role, User } from "../../../models/User";


export default class UserFactory {

    createUser(name: string, role: Role): User {
        const user = new User();
        user.name = name;
        user.roles.push(role)
        return user;
    }

    createGuestUser(): User {
        const user = new User();

        if (getEnvironment().REACT_APP_NODE_ENV === "dev") {
            user.name = "Jens Jensen";
            user.roles.push(Role.ADMIN)
            return user;
        }

        user.name = "";
        user.roles.push(Role.UNKNOWN)
        return user;
    }
}