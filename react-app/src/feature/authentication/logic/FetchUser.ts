import Keycloak  from "keycloak-js";
import { createContext } from "react";
import { Role, User } from "../../../models/User";
import UserFactory from "./UserFactory";


export async function GetJWTToken(keycloak: Keycloak): Promise<JWTToken | undefined> {
    console.log("authenticated", keycloak.tokenParsed)
    return keycloak.tokenParsed as JWTToken;
}


const createUserContext = () => {
    const userFactory = new UserFactory()
    return createContext<User | undefined>(userFactory.createGuestUser());
}

export const UserContext = createUserContext()

export function LoginBasedOnToken(token: JWTToken): User {
    let userFactory = new UserFactory();
    let user = userFactory.createGuestUser();

    try {
        const name = token.name;
        const roles: Role[] = token.roles as unknown as Role[];

        user = userFactory.createUser(name!, roles)
    } catch (error) {
        console.log("Error getting user info from auth token", error)
    }
    return user;
}

export function getRoleFromStringArray(roles: string[] | undefined): Role[] {
    let result: Role[] = []
    if (roles?.findIndex(x => x === "admin") !== -1)
        result?.push(Role.ADMIN)
    if (roles?.findIndex(x => x === "org-admin") !== -1)
        result?.push(Role.ORG_ADMIN)
    if (roles?.findIndex(x => x === "org-super") !== -1)
        result?.push(Role.ORG_SUPER)
    if (roles?.findIndex(x => x === "org-read-only") !== -1)
        result?.push(Role.ORG_READ_ONLY)
    if (roles?.findIndex(x => x === "read-only") !== -1)
        result?.push(Role.READ_ONLY)
        
    return result
}

export class JWTToken {
    exp?: string
    iat?: string
    auth_time?: number
    jti?: string
    iss?: string
    aud?: string
    sub?: string
    typ?: string
    azp?: string
    nonce?: string
    session_state?: string
    at_hash?: string
    acr?: string
    sid?: string
    email_verified?: string
    name?: string
    preferred_username?: string
    given_name?: string
    family_name?: string
    email?: string
    roles?: string[]
}