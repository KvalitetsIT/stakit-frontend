
import './App.css';
import store from './redux/store'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/home';
import Layout from './components/Layout/Layout';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { StrictMode, useMemo, useState } from 'react';
import keycloak from './feature/Keycloak/Keycloak';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';
import { GetJWTToken, LoginBasedOnToken, UserContext } from './feature/User/logic/FetchUser';
import { AbilityContext } from './feature/User/logic/Can';
import { User } from './models/User';
import Loading from './components/loading';

function App() {

    const [user, setUser] = useState<User | undefined>(undefined)
    const keycloak = useKeycloak();

    useMemo(async () => {

        if (keycloak.initialized) {
            const jwt = await GetJWTToken(keycloak.keycloak!)
            const user = await LoginBasedOnToken(jwt!);

            setUser(user)
        }
    }, [keycloak.initialized])
    if (!keycloak.initialized)
        return <>Keycloak is not initialised</>
    if (user == undefined)
        return <Loading />

    return (
        <Router>
            <UserContext.Provider value={user}>
                <AbilityContext.Provider value={user.getAbility()}>
                    <Layout>
                        <>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                            </Routes>

                            <ToastContainer closeButton={true} position="bottom-right" />
                        </>
                    </Layout>
                </AbilityContext.Provider>
            </UserContext.Provider>
        </Router >
    )
}

const AppWrapper = () => {
    return (
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
                    <App />
                </StrictMode>
            </ReactKeycloakProvider>
        </Provider >
    )
}


export default AppWrapper;
