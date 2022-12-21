import Keycloak from "keycloak-js";
import getEnvironment from "../../env";
const keycloak = new Keycloak({
    url: getEnvironment().REACT_APP_KEYCLOAK_URL,
    realm: getEnvironment().REACT_APP_KEYCLOAK_REALM,
    clientId: getEnvironment().REACT_APP_KEYCLOAK_CLIENTID
});

export default keycloak;