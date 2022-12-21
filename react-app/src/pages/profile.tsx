import { Card, CardContent, CardHeader, Container, Typography } from "@mui/material";
import { User } from "../models/User";

export function ProfilePage(props: { user?: User }) {
    return (
        <Container>


            <Card sx={{mt: 4}}>

                <CardHeader
                    title={props.user?.username ?? "Unknown"}

                >

                </CardHeader>
                <CardContent>
                    <Typography>Roles: {props.user?.roles}</Typography>

                </CardContent>

            </Card>

        </Container>

    )
}