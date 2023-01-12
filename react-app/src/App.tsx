
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { DashboardPage } from './pages/dashboard/dashboard';
import { LoginPage } from './pages/authorization/login';
import { SubscribePage } from './pages/SubscribePage';
import Layout from './components/layout/Layout';
import { ServiceDetails } from './pages/services/details';
import { ThemeProvider } from '@mui/material/styles';
import { PageNotFound } from './pages/404';
import { GroupDetails } from './pages/groups/details';
import { RegistrationPage } from './pages/authorization/registration';
import { EditService } from './pages/services/edit';
import { EditGroup } from './pages/groups/edit';
import { ProfilePage } from './pages/profile';
import { ServicesPage } from './pages/services/ServicesPage';
import { theme } from './theme';
import { TestPage } from './pages/test';
import store from './redux/store';
import { AllGoupsPage } from './pages/groups/all';


export default function App() {

    return (
        <Router>
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

                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                    <ToastContainer closeButton={true} position="bottom-right" />
                </>
            </Layout>
        </Router >
    )
}

export const AppWrapper = () => {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                {/* <StrictMode> */}
                <App />
                {/* </StrictMode> */}
            </Provider>

        </ThemeProvider>

    )
}


