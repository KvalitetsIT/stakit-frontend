import { t } from 'i18next';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { UserContext } from '../../feature/User/logic/FetchUser';


import { RootState } from '../../redux/store';

type LayoutProps = {
    children: JSX.Element
}


const Layout = (props: LayoutProps) => {
    const loggedInAs = useContext(UserContext);
    return (
        <>
            <div>
                {t("Your user has name") + ""} : {loggedInAs?.name}
            </div>
            <main>{props.children}</main>
            <div>
                {t("this is the footer") + ""}
            </div>
        </>
    )
}

export default Layout;