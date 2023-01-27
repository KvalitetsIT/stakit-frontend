import { ThemeProvider } from "@emotion/react"
import { ReactKeycloakProvider } from "@react-keycloak/web"
import keycloak from '../feature/authentication/Keycloak';
import { StrictMode } from "react"
import { Provider } from "react-redux"
import { theme } from "../config/theme"
import { AbilityContext } from "../feature/authentication/logic/Can"
import { UserContext } from "../feature/authentication/logic/FetchUser"
import store from "../redux/store"
import App from "./App"

export const AppWrapper = () => {

    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <ReactKeycloakProvider
                    initOptions={{
                        onLoad: 'login-required',
                        checkLoginIframe: false
                    }}
                    authClient={keycloak}
                    autoRefreshToken={true}
                >
                    <StrictMode>
                        

                                {/* <StrictMode> */}
                                <App />
                                {/* </StrictMode> */}
                           
                    </StrictMode>
                </ReactKeycloakProvider>
            </Provider>

        </ThemeProvider>

    )
}


