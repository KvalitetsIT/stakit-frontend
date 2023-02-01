import { Container, Typography } from "@mui/material";
import { wait } from "@testing-library/user-event/dist/utils";
import { Ability, AbilityBuilder } from "casl";
import { t } from "i18next";
import { toast } from "react-toastify";
import { LoginForm } from "../../components/forms/login";
import { CenteredContent } from "../../components/layout/CenteredContent";
import { Credentials } from "../../models/types";
import { Role, User } from "../../models/User";

export function LoginPage() {

    const onLogin = (credentials: Credentials) => {

        toast.promise(
            async () => {
                await wait(1000) // Do something
                await login(credentials)
            },
            {
                pending: t('Authorizing...'),
                success: credentials.email + t(" successfully logged in"),
                error: t('Unauthorized')
            }
        )
    }

    const LOGIN_PATH = "http://path/to/api/login"

    const login = async (credentials: Credentials) => {
        const params = {
            method: 'POST',
            body: JSON.stringify(credentials)
        };
        const response = await fetch(LOGIN_PATH, params);
        const user = await response.json();
        return updateAbility(user.getAbility(), user);
    };



    return (
        <>
            <Container>

                <CenteredContent>

                    <Typography variant="h3">Login</Typography>
                    <Typography pb={2}>Fill in you email and password in order to access additional goodies</Typography>
                    <LoginForm
                        onSubmit={onLogin}
                        onCancel={() => window.history.go(-1)}
                    ></LoginForm>
                </CenteredContent>

            </Container>


        </>
    )
}

function updateAbility(ability: Ability, user: User) {
    const { can, rules } = new AbilityBuilder();

    if (user.roles?.includes(Role.ADMIN)) {
        can('manage', 'all');
    } else {
        can('read', 'all');
    }

    ability.update(rules);
}
