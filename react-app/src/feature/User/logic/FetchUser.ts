import { KeycloakInstance } from "keycloak-js";
import { createContext } from "react";
import { useDispatch } from "react-redux";
import { Role, User } from "../../../models/User";


import UserFactory from "./UserFactory";

export async function GetJWTToken(keycloak: KeycloakInstance): Promise<JWTToken | undefined> {
    console.log("authenticated", keycloak.tokenParsed)
    return keycloak.tokenParsed as JWTToken;
}

export function LoginBasedOnToken(token: JWTToken): User {
    let userFactory = new UserFactory();
    let user = userFactory.createGuestUser();

    try {
        console.log(token)
        const name = token.name;
        const role = getRoleFromStringArray(token.roles!);

        user = userFactory.createUser(name!, role)

    } catch (error) {
        console.log("Error getting user info from auth token", error)
    }
    return user;
}

export const UserContext = createContext<User | undefined>(undefined);

function getRoleFromStringArray(roles: string[] | undefined): Role {

    if (roles?.findIndex(x => x === "admin") !== -1)
        return Role.ADMIN
    if (roles?.findIndex(x => x === "org-admin") !== -1)
        return Role.ORG_ADMIN
    if (roles?.findIndex(x => x === "org-super") !== -1)
        return Role.ORG_SUPER
    if (roles?.findIndex(x => x === "org-read-only") !== -1)
        return Role.ORG_READ_ONLY
    if (roles?.findIndex(x => x === "read-only") !== -1)
        return Role.READ_ONLY

    return Role.UNKNOWN
}

class JWTToken {
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