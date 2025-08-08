
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { DashboardPage } from '../pages/dashboard/dashboard';
import Layout from '../components/layout/Layout';
import { ServiceDetails } from '../pages/services/details';
import { PageNotFound } from '../pages/404';
import { GroupDetails } from '../pages/groups/details';
import { EditService } from '../pages/services/edit';
import { EditGroup } from '../pages/groups/edit';
import { ServicesPage } from '../pages/services/ServicesPage';
import { AllGoupsPage } from '../pages/groups/all';
import { useMemo, useState } from 'react';
import { User } from '../models/User';
import { GetJWTToken, UserContext } from '../feature/authentication/logic/FetchUser';
import UserFactory from '../feature/authentication/logic/UserFactory';
import { AnnouncementsPage, DetailedAnnouncementPage } from '../pages/announcements/announcements';
import { useKeycloak } from '@react-keycloak/web';
import { AbilityContext } from '../feature/authentication/logic/Can';
import PrivateRoute from '../components/PrivateRoute';
import { ConfirmSubscriptionPage } from '../pages/subscription/ConfirmationPage';
import { SubscribePage } from '../pages/subscription/SubscribePage';
import { SubscriptionsPage } from '../pages/subscription/SubscriptionsPage';
import { SubscriptionPage } from '../pages/subscription/subscriptionPage';
import { UnsubscribePage } from '../pages/subscription/UnsubscribePage';



export default function App() {

    //const loggedInAs = useContext(UserContext)
    const userFactory = new UserFactory()


    const [user, setUser] = useState<User>(userFactory.createGuestUser())

       const keycloak = useKeycloak();
       useMemo(async () => {
           if (keycloak.initialized) {
               const jwt = await GetJWTToken(keycloak.keycloak!)
               const userFactory = new UserFactory()
               if(jwt) {
                    setUser(userFactory.createUserFromJWT(jwt))
               }
               // getUserRolesLazyTrigger();
           }
       }, [keycloak.initialized, keycloak.keycloak])

    return (
        <Router>
            <UserContext.Provider value={user}>
                <AbilityContext.Provider value={user.getAbility()}>
                    <Layout>
                        <>
                            <Routes>
                                <Route path="/">
                                    <Route index element={<DashboardPage />} />
                                    {/* <Route path='profile' element={<ProfilePage />} /> */}
                                    {/* <Route path="login" element={<LoginPage />} /> */}
                                    {/* <Route path="register" element={<RegistrationPage />} /> */}
                                </Route>
                                <Route path="/subscribe">
                                    <Route index element={<SubscribePage />} />
                                    <Route path=":id" element={<ConfirmSubscriptionPage />} />
                                </Route>

                                <Route path="/subscriptions">
                                    <Route index element={<PrivateRoute><SubscriptionsPage /></PrivateRoute>} />
                                    <Route path=":id" element={<PrivateRoute><SubscriptionPage /></PrivateRoute>} />
                                </Route>

                                <Route path="/unsubscribe">
                                    <Route path=":id" element={<UnsubscribePage />} />
                                </Route>

                                <Route path="/services">
                                    <Route index element={<PrivateRoute><ServicesPage /></PrivateRoute>} />
                                    <Route path=":id">
                                        <Route index element={<PrivateRoute><ServiceDetails/></PrivateRoute> } />
                                        <Route path="edit" element={<PrivateRoute><EditService/></PrivateRoute>} />
                                    </Route>
                                </Route>
                                <Route path='/groups'>
                                    <Route index element={<PrivateRoute><AllGoupsPage /></PrivateRoute>} />
                                    <Route path=':id' >
                                        <Route index element={<PrivateRoute><GroupDetails/></PrivateRoute>} />
                                        <Route path="edit" element={<PrivateRoute><EditGroup/></PrivateRoute>} />
                                    </Route>
                                </Route>
                                <Route path='/announcements'>
                                    <Route index element={<PrivateRoute><AnnouncementsPage/></PrivateRoute>} />
                                    <Route path=':id' >
                                        <Route index element={<PrivateRoute><DetailedAnnouncementPage /></PrivateRoute>} />
                                        <Route path="edit" element={<PrivateRoute><EditGroup /></PrivateRoute>} />
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


