import { Button, CircularProgress, FormControl, MenuItem, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { t } from "i18next";
import { useState } from "react";
import * as yup from 'yup';
import { Gender, User } from "../../models/types";
import { ValidatedSelect } from "../input/validatedSelect";

import { ValidatedTextField } from "../input/validatedTextField";

export function RegistrationForm(props: {
    user?: User
    onSubmit: (user: User) => void,
    onCancel: () => void,
}) {
    const [loading, setLoading] = useState<boolean>(false)

    const validationSchema = yup.object().shape({
        user: yup.object().shape({
            firstName: yup.string().min(2).required(),
            lastName: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required(),
            gender: yup.string().required(),
        }),
        confirmedPassword: yup.string().required().equals([yup.ref("user.password")], t("must match password "))
    })

    const initialValues = {
        user: props.user ?? { // Setting the properties to an empty string is apperently needed as formik wont "touch" nested properties 
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            gender: undefined,
        },
        confirmedPassword: undefined
    }

    return (
        <FormControl>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, formik) => {props.onSubmit(values.user!); formik.resetForm()}}
                validationSchema={validationSchema}
            >
                {({ errors, touched, values, submitForm, handleChange }) => (

                    <Form>
                        <Stack spacing={2}>
                            <Stack spacing={2} direction={"row"}>

                                <ValidatedTextField
                                    label="First Name"
                                    type="text"
                                    name="user.firstName"
                                    onChange={handleChange}
                                    value={values.user?.firstName}
                                    error={errors.user?.firstName && touched.user?.firstName ? errors.user.firstName : undefined}
                                ></ValidatedTextField>


                                <ValidatedTextField
                                    label="Last Name"
                                    type="text"
                                    name="user.lastName"
                                    onChange={handleChange}
                                    value={values.user?.lastName}
                                    error={errors.user?.lastName && touched.user?.lastName ? errors.user.lastName : undefined}
                                ></ValidatedTextField>
                            </Stack>

                            <ValidatedTextField
                                label="Email"
                                type="email"
                                name="user.email"
                                onChange={handleChange}
                                value={values.user?.email}
                                error={errors.user?.email && touched.user?.email ? errors.user.email : undefined}
                            //error={errors.email && touched.email}
                            //helperText={(errors.email && touched.email) ? errors.email : ""}
                            ></ValidatedTextField>

                            <ValidatedSelect
                                label="Gender"
                                name={"user.gender"}
                                onChange={handleChange}
                                error={errors.user?.gender && touched.user?.gender ? errors.user?.gender : undefined}
                                value={values.user?.gender!}
                            >
                                <MenuItem value={Gender.male}>Male</MenuItem>
                                <MenuItem value={Gender.female}>Female</MenuItem>
                                <MenuItem value={Gender.other}>Other</MenuItem>
                            </ValidatedSelect>

                            <Stack spacing={2} direction={"row"}>

                                <ValidatedTextField
                                    label="Password"
                                    type="password"
                                    name="user.password"
                                    onChange={handleChange}
                                    value={values.user?.password}
                                    error={errors.user?.password && touched.user?.password ? errors.user?.password : undefined}
                                ></ValidatedTextField>
                                <ValidatedTextField
                                    label="Confirm Password"
                                    type="password"
                                    name="confirmedPassword"
                                    value={values.confirmedPassword!}
                                    error={errors.confirmedPassword && touched.confirmedPassword ? errors.confirmedPassword : undefined}
                                //helperText={errors.confirmedPassword && touched.confirmedPassword ? errors.confirmedPassword : ""}
                                ></ValidatedTextField>
                            </Stack>
                            <Stack spacing={2} direction={"row"}>
                                <Button
                                    onSubmit={submitForm}
                                    type={"submit"}
                                    variant="contained"
                                    fullWidth={true}
                                >
                                    {loading ? <CircularProgress color={"inherit"} size={"1.5em"}></CircularProgress> : "Register"}
                                </Button>

                                <Button
                                    fullWidth={true}
                                    onClick={() => props.onCancel()}
                                    variant="outlined"
                                >Cancel</Button>

                            </Stack>
                        </Stack>
                    </Form>
                )}

            </Formik>
        </FormControl>

    )
}

