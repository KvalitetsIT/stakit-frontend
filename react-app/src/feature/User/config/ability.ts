import { Ability, AbilityBuilder } from "@casl/ability";
import Todo from "../../../models/todo";
import { Role, User } from "../../../models/User";

export enum Operations {
    CREATE = "create",
    READ = "read",
    UPDATE = "update",
    DELETE = "delete",
    DETAILS = "details",
    MANAGE = "manage"
}

const defineAbility = (user: User) => {
    const { can, cannot, build } = new AbilityBuilder(Ability);

    user.roles.forEach(role => {
        switch (role) {
            case Role.ADMIN:
                can(Operations.READ, Todo, { id: 5 })
                break;
            case Role.ORG_SUPER:
                can(Operations.MANAGE, User)
                break;
        }
    })

    return build({
        detectSubjectType: obj => {
            const type = Object.getPrototypeOf(obj).constructor
            return type;
        }
    })
}

export default defineAbility;