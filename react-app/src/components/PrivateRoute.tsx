import { useKeycloak } from "@react-keycloak/web";

interface PrivateRouteProps {
    children: JSX.Element
}
function PrivateRoute(props: PrivateRouteProps) {

    const keycloak = useKeycloak()

    if( ! keycloak.initialized  ) return<></>
    
    const isLoggedIn = keycloak.initialized && keycloak.keycloak.authenticated ;

    if(!isLoggedIn  ) keycloak.keycloak?.login({})

    return isLoggedIn ? props.children : null;
};

export default PrivateRoute;