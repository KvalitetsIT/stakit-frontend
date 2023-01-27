import { Card, CardContent, CardHeader, Container, Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../feature/authentication/logic/FetchUser";
import { User } from "../models/User";

export function ProfilePage(props: { user?: User }) {

    const user = useContext(UserContext)

    return (
        <Container>
            <Card sx={{mt: 4}}>
                <CardHeader
                    title={user?.firstName +" " + user?.lastName  ?? "Unknown"}
                >
                </CardHeader>
                <CardContent>
                    <Typography>Roles: {user?.roles?.map(role => role.toString()).join(", ")}</Typography>
                </CardContent>
            </Card>
        </Container>

    )
}