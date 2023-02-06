import { Typography } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import { ReactNode, useContext, useMemo } from "react";
import getEnvironment from "../config/env";
import { GetJWTToken, UserContext } from "../feature/authentication/logic/FetchUser";
import UserFactory from "../feature/authentication/logic/UserFactory";
import { User } from "../models/types";

interface PrivateRouteProps {
    children: JSX.Element
}
function PrivateRoute(props: PrivateRouteProps) {

    const keycloak = useKeycloak()

    if( ! keycloak.initialized  ) return<></>
    
    const isLoggedIn = keycloak.initialized && keycloak.keycloak.authenticated ;

    console.log("isLoggedIn", isLoggedIn)

    if(!isLoggedIn  ) keycloak.keycloak?.login({})

    return isLoggedIn ? props.children : null;
};

export default PrivateRoute;