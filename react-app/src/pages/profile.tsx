import { Card, CardContent, CardHeader, Container, IconButton, Tooltip, Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../feature/authentication/logic/FetchUser";
import { User } from "../models/User";
import LogoutIcon from '@mui/icons-material/Logout';

export function ProfilePage(props: { user?: User }) {

    const user = useContext(UserContext)

/* 
    const keycloak = useKeycloak()

     */
    const logout = () => {
    /*     keycloak.keycloak.logout() */
    console.log("logout")
    }

    const LogoutBtn = () => (<Tooltip title={"Logout"}><IconButton color="error" onClick={() => logout()}><LogoutIcon></LogoutIcon></IconButton></Tooltip>)
    
    return (
        <Container>
            <Card sx={{mt: 4}}>
                <CardHeader
                    title={user?.firstName +" " + user?.lastName  ?? "Unknown"}
                    action={<LogoutBtn/>}
                >
                </CardHeader>
                <CardContent>
                    <Typography>Roles: {user?.roles?.map(role => role).join(", ")}</Typography>
                </CardContent>
            </Card>
        </Container>

    )
}