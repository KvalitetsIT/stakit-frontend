import { ThemeProvider } from "@emotion/react"
import { ReactKeycloakProvider } from "@react-keycloak/web"
import keycloak from '../feature/authentication/Keycloak';
import { StrictMode } from "react"
import { Provider } from "react-redux"
import { theme } from "../config/theme"
import store from "../redux/store"
import App from "./App"

export const AppWrapper = () => {

    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <ReactKeycloakProvider
                    initOptions={{
                        // onLoad: 'login-required',
                        checkLoginIframe: false
                    }}
                    authClient={keycloak}
                    autoRefreshToken={true}
                >
                    <StrictMode>
                        <App />
                    </StrictMode>
                </ReactKeycloakProvider>
            </Provider>

        </ThemeProvider>

    )
}


