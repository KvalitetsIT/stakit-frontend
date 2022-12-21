import { Button, Checkbox, CircularProgress, FormControl, FormControlLabel, Stack, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as yup from 'yup';
import { Credentials } from "../../models/types";
import { Link } from "react-router-dom"
import { t } from "i18next";
import { ValidatedTextField } from "../input/validatedTextField";

interface LoginFormProps { onSubmit: (credentials: Credentials) => void, onCancel: () => void }

export function LoginForm(props: LoginFormProps) {

    const [loading, setLoading] = useState(false)

    const validationSchema = yup.object().shape({
        credentials: yup.object().shape({
            email: yup.string().required(t("email is required")).email(t("email is not valid")),
            password: yup.string().required("password is required"),
        })
    })

    return (
        <FormControl fullWidth>
            <Formik
                initialValues={{ credentials: {email: "", password: ""} }}
                validationSchema={validationSchema}
                onSubmit={({ credentials }) => props.onSubmit(credentials)}
            >
                {({ values, errors, touched, handleChange }) => (
                    <Form>
                        <Stack spacing={4} textAlign={"center"}>
                            <ValidatedTextField
                                type={"email"}
                                error={errors.credentials?.email && touched.credentials?.email ? errors.credentials?.email : undefined}
                                label="Email"
                                name="credentials.email"
                                value={values.credentials?.email}
                                onChange={handleChange}
                            />
                            <ValidatedTextField
                                type={"password"}
                                error={errors.credentials?.password && touched.credentials?.password ? errors.credentials?.password : undefined}
                                label="Password"
                                name="credentials.password"
                                value={values.credentials?.password}
                                onChange={handleChange}
                            />

                            <Stack spacing={2}>
                                <FormControlLabel control={<Checkbox />} label="Remember me" />
                                <Typography align="right">Missing an account? <Link to={"/register"}>Sign up!</Link></Typography>
                            </Stack>

                            <Stack spacing={2} direction={"row"}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    type="submit"
                                >{loading ? <CircularProgress color="info"></CircularProgress> : "Login"}</Button>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={props.onCancel}
                                >Cancel</Button>
                            </Stack>
                        </Stack>
                    </Form>
                )}
            </Formik>

        </FormControl>
    )
}


