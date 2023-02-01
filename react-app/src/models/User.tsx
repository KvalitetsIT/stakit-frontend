import { AnyAbility } from "@casl/ability"
import defineAbility from "../feature/authentication/config/ability"
import { JWTToken } from "../feature/authentication/logic/FetchUser"
import { Resource } from "./types"

export enum Role {
    UNKNOWN = 1,
    READ_ONLY = 2,
    ORG_READ_ONLY = 3,
    ORG_ADMIN = 4,
    ORG_SUPER = 5,
    ADMIN = 6,
}

export class User extends Resource {

    roles: Role[] = []
    username!: string
    name!: string
    phone?: string
    latest_login?: Date
    email?: string 
    firstName?: string
    lastName?: string
    keycloak_uuid?: string
    // organisation?: OrganisationResponse
    permissions?: string[]
    token?: JWTToken
    // roleToString(): string {
    //     switch (this.role) {
    //         case Role.ADMIN:
    //             return "Administrator"
    //         case Role.ORG_SUPER:
    //             return "(Org) Superadministrator "
    //         case Role.ORG_ADMIN:
    //             return "(Org) Administrator"
    //         case Role.ORG_READ_ONLY:
    //             return "(Org) Read Only"
    //         case Role.READ_ONLY:
    //             return "Read Only"
    //         default:
    //             return "Unknown"
    //     }
    // }

    getAbility(): AnyAbility {
        return defineAbility(this);
    }
}

export class UserResponse extends Resource {
    email?: string
    first_name?: string
    last_name?: string
    keycloak_uuid?: string
    organisation_uuid?: string
    roles?: Role[]
}

