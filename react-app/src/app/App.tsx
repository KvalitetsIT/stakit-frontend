
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { DashboardPage } from '../pages/dashboard/dashboard';
import { LoginPage } from '../pages/authorization/login';
import { SubscribePage } from '../pages/SubscribePage';
import Layout from '../components/layout/Layout';
import { ServiceDetails } from '../pages/services/details';
import { PageNotFound } from '../pages/404';
import { GroupDetails } from '../pages/groups/details';
import { RegistrationPage } from '../pages/authorization/registration';
import { EditService } from '../pages/services/edit';
import { EditGroup } from '../pages/groups/edit';
import { ProfilePage } from '../pages/profile';
import { ServicesPage } from '../pages/services/ServicesPage';
import { AllGoupsPage } from '../pages/groups/all';
import { useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useKeycloak } from '@react-keycloak/web';
import { User } from '../models/User';
import { GetJWTToken, JWTToken, UserContext } from '../feature/authentication/logic/FetchUser';
import { AbilityContext } from '../feature/authentication/logic/Can';
import { Typography } from '@mui/material';
import getEnvironment from '../config/env';
import UserFactory from '../feature/authentication/logic/UserFactory';
import PrivateRoute from '../components/PrivateRoute';
import keycloak from 'keycloak-js';
import { AnnouncementsPage, DetailedAnnouncementPage } from '../pages/announcements/announcements';
import { TestPage } from '../pages/test';


export default function App() {

    //const loggedInAs = useContext(UserContext)
    const userFactory = new UserFactory()


    const [user, setUser] = useState<User | undefined>(undefined)
    
    const keycloak = useKeycloak();

    useMemo(async () => {
        
        if (keycloak.initialized) {
            const jwt = await GetJWTToken(keycloak.keycloak!)

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
                {/* <AbilityContext.Provider value={user.getAbility()}> */}
                    <Layout>
                        <>
                            <Routes>
                                <Route path="/">
                                    <Route index element={<DashboardPage />} />
                                    <Route path='profile' element={<ProfilePage />} />
                                    <Route path="login" element={<LoginPage />} />
                                    <Route path="register" element={<RegistrationPage />} />
                                    <Route path="subscribe" element={<SubscribePage />} />
                                    <Route path="test" element={<TestPage />} />

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

                                <Route path='/announcements'>
                                    <Route index element={<AnnouncementsPage />} />
                                    <Route path=':id' >
                                        <Route index element={<DetailedAnnouncementPage/>} />
                                        <Route path="edit" element={<EditGroup />} />
                                    </Route>
                                </Route>





                                <Route path="*" element={<PageNotFound />} />
                            </Routes>
                            <ToastContainer closeButton={true} position="bottom-right" />
                        </>
                    </Layout>
                {/* </AbilityContext.Provider> */}
            </UserContext.Provider>
        </Router >
    )
}


