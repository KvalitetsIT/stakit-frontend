
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { DashboardPage } from '../pages/dashboard/dashboard';
import { LoginPage } from '../pages/authorization/login';
import { SubscribePage } from '../pages/SubscribePage';
import Layout from '../components/layout/Layout';
import { ServiceDetails } from '../pages/services/details';
import { ThemeProvider } from '@mui/material/styles';
import { PageNotFound } from '../pages/404';
import { GroupDetails } from '../pages/groups/details';
import { RegistrationPage } from '../pages/authorization/registration';
import { EditService } from '../pages/services/edit';
import { EditGroup } from '../pages/groups/edit';
import { ProfilePage } from '../pages/profile';
import { ServicesPage } from '../pages/services/ServicesPage';
import { theme } from '../config/theme';
import store from '../redux/store';
import { AllGoupsPage } from '../pages/groups/all';
import { StrictMode, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { User, UserResponse } from '../models/User';
import { GetJWTToken, JWTToken, UserContext } from '../feature/authentication/logic/FetchUser';
import { AbilityContext } from '../feature/authentication/logic/Can';
import { Loading } from '../components/feedback/loading';
import { Typography } from '@mui/material';
import getEnvironment from '../config/env';
import keycloak from '../feature/authentication/Keycloak';
import UserFactory from '../feature/authentication/logic/UserFactory';

export default function App() {

    //const loggedInAs = useContext(UserContext)

    const [user, setUser] = useState<User | undefined>(undefined)
    const keycloak = useKeycloak();

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [jwtToken, setJwtToken] = useState<JWTToken | undefined>(undefined);
    const { t, i18n } = useTranslation()


    useMemo(async () => {
        if (keycloak.initialized) {
            const jwt = await GetJWTToken(keycloak.keycloak!)
            setJwtToken(jwt)

            const userFactory = new UserFactory()
            setUser(userFactory.createUserFromJWT(jwt!))
            // getUserRolesLazyTrigger();
        }
    }, [keycloak.initialized])


    let timeInterval = setInterval(() => {
        let lastAcivity = localStorage.getItem('lastActvity')
        const maxInactivity = parseInt(getEnvironment().REACT_APP_INACTIVITY_MAX_MINUTES ?? 1)
        var diffMs = Math.abs(new Date(parseInt(lastAcivity!)).getTime() - new Date().getTime()); // milliseconds between now & last activity
        var seconds = Math.floor((diffMs / 1000));
        var minute = Math.floor((seconds / 60));
        if (minute >= maxInactivity) {
            console.log(`No activity in last ${maxInactivity} minutes... Logging Out`)
            clearInterval(timeInterval)
            //code for logout or anything...
            keycloak.keycloak.logout()
        }

    }, 5000)


    if (!keycloak.keycloak.authenticated) return <Typography>Permission denied</Typography>

    if (user == undefined) return <Typography>User is undefined</Typography>
    return (
        <Router>

            <UserContext.Provider value={user}>
                <AbilityContext.Provider value={user.getAbility()}>
                    <Layout>
                        <>
                        <Routes>
                            <Route path="/">
                                <Route index element={<DashboardPage />} />
                                <Route path='profile' element={<ProfilePage />} />
                                <Route path="login" element={<LoginPage />} />
                                <Route path="register" element={<RegistrationPage />} />
                                <Route path="subscribe" element={<SubscribePage />} />
                            </Route>

                            <Route path="/services">
                                <Route index element={<ServicesPage />} />
                                <Route path=":id">
                                    <Route index element={<ServiceDetails />} />
                                    <Route path="edit" element={<EditService />} />
                                </Route>
                            </Route>

                            <Route path='/groups'>
                                <Route index element={<AllGoupsPage />} />
                                <Route path=':id' >
                                    <Route index element={<GroupDetails />} />
                                    <Route path="edit" element={<EditGroup />} />
                                </Route>
                            </Route>

                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                        <ToastContainer closeButton={true} position="bottom-right" />                        
                        </>
                        
                    </Layout>
                </AbilityContext.Provider>
            </UserContext.Provider>
        </Router >
    )
}


