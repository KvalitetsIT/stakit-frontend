import { Ability, AbilityBuilder } from "@casl/ability";
import { Announcement } from "../../../models/types";
import { Role, User } from "../../../models/User";

export enum Operation {
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
            case Role.UNKNOWN:
                can(Operation.READ, "public")
                break;
            case Role.ADMIN:
                can([Operation.READ, Operation.DELETE, Operation.MANAGE, Operation.UPDATE, Operation.DETAILS], Announcement)
                break;
            case Role.ORG_SUPER:
                can(Operation.MANAGE, User)
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