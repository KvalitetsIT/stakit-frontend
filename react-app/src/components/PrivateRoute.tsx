import { useKeycloak } from "@react-keycloak/web";

interface PrivateRouteProps {
    children: JSX.Element
}
function PrivateRoute(props: PrivateRouteProps) {

    const { keycloak } = useKeycloak()

    const isLoggedIn = keycloak.authenticated;

    return isLoggedIn ? props.children : null;
};

export default PrivateRoute;