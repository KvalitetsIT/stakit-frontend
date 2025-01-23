interface env {
  REACT_APP_API_BASEURL: string
  REACT_APP_API_MOCKBASEURL: string
  REACT_APP_NODE_ENV: string

  //Keycloak
  REACT_APP_KEYCLOAK_URL: string
  REACT_APP_KEYCLOAK_REALM: string
  REACT_APP_KEYCLOAK_CLIENTID: string
  REACT_APP_INACTIVITY_MAX_MINUTES: string

  // Feature toggles
  REACT_APP_FEATURE_SUBSCRIBE: string
  REACT_APP_FEATURE_MESSAGES: string

  REACT_APP_LINKS_TITLES: string[]
  REACT_APP_LINKS: string[]
}

export default function getEnvironment(): env {
  const env = (window as any)._jsenv || process.env;

  return {
    ...env,
    REACT_APP_LINKS: asArray(env.REACT_APP_LINKS),
    REACT_APP_LINKS_TITLES: asArray(env.REACT_APP_LINKS_TITLES),
  }
}


const asArray = (env?: string) => {
  return env ? env.includes(',') ? env.split(',').map(x => x.trim()) : [env] : []
}
