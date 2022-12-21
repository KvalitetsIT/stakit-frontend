import { AnyAbility } from "@casl/ability"
import defineAbility from "../feature/User/config/ability"

export enum Role {
    UNKNOWN = 1,
    READ_ONLY = 2,
    ORG_READ_ONLY = 3,
    ORG_ADMIN = 4,
    ORG_SUPER = 5,
    ADMIN = 6,
}

export class User {

    roles: Role[] = []
    username!: string
    name!: string
    phone?: string
    latest_login?: Date

    roleToString(): string {
        return this.roles.map(role => {
            switch (role) {
                case Role.ADMIN:
                    return "Administrator"
                case Role.ORG_SUPER:
                    return "(Org) Superadministrator "
                case Role.ORG_ADMIN:
                    return "(Org) Administrator"
                case Role.ORG_READ_ONLY:
                    return "(Org) Read Only"
                case Role.READ_ONLY:
                    return "Read Only"
            }
        }).join(", ")
    }

    getAbility(): AnyAbility {
        return defineAbility(this);
    }
}

