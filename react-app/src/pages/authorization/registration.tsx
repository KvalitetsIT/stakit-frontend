import { Container, Typography } from "@mui/material";
import { wait } from "@testing-library/user-event/dist/utils";
import { t } from "i18next";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RegistrationForm } from "../../components/forms/registration";
import { CenteredContent } from "../../components/layout/CenteredContent";
import { Credentials, User } from "../../models/types";

export function RegistrationPage() {

    const [redirect, setRedirect] = useState("")

    const onRegister = ( credentials: Credentials) => {
        
        toast.promise(
            async () => {
               await wait(1000) // Do something
            },
            {
              pending: t('Registering...'),
              success: credentials.email + t(" successfully registered"),
              error: t('Registering failed')
            }
        )    
    }
    



    return (
        <Container>
            {redirect ?? <Navigate to={redirect}></Navigate>}
            <CenteredContent>

                <Typography variant="h2">Register</Typography>
                <Typography pb={2}>Fill out the following details and start using the application</Typography>
                <RegistrationForm
                    onSubmit={(user: User) => onRegister}
                    onCancel={() => window.history.go(-1)}
                ></RegistrationForm>
            </CenteredContent >
        </Container>


    )
} 