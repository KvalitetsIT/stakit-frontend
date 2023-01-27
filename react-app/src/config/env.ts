interface env {
    REACT_APP_API_BASEURL : string
    REACT_APP_API_MOCKBASEURL : string
    REACT_APP_NODE_ENV : string

    //Keycloak
    REACT_APP_KEYCLOAK_URL : string
    REACT_APP_KEYCLOAK_REALM : string
    REACT_APP_KEYCLOAK_CLIENTID : string
    REACT_APP_INACTIVITY_MAX_MINUTES: string
}

export default function getEnvironment(): env {
    const env = (window as any)._jsenv || process.env;
    return env;
}
