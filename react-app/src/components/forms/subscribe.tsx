import { Button, CircularProgress, FormControl, MenuItem, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { t } from "i18next";
import { useState } from "react";
import * as yup from 'yup';
import { Group, Subscription } from "../../models/types";
import { ValidatedSelect } from "../input/validatedSelect";
import { ValidatedTextField } from "../input/validatedTextField";

export interface FormProps<T> {
    onSubmit: (submission: T) => Promise<void>
    onCancel: () => void,
}

interface SubscriptionFormProps extends FormProps<Subscription> {
    optionalGroups: Group[],
    subscription?: Subscription
}

export function SubscriptionForm(props: SubscriptionFormProps) {

    const [loading, setLoading] = useState()

    const validationSchema = yup.object().shape({
        subscription: yup.object().shape({
            email: yup.string().required(t("email is required")).email(t("email is not valid")),
            groups: yup.array().required("groups is required").min(1, t("groups is required")),
        }),
        checked: yup.bool().required(t("checkbox is required")),
    })

    const initialValues = {
        subscription: props.subscription ?? {
            email: "",
            groups: []
        },
        checked: false
    }

    return (
        <FormControl fullWidth>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => props.onSubmit(values.subscription)}
                validationSchema={validationSchema}
            >
                {({ errors, touched, values, handleChange }) => (
                    <Form>
                        <Stack spacing={2}>
                            <ValidatedTextField
                                type={"email"}
                                error={errors.subscription?.email && touched.subscription?.email ? errors.subscription.email : undefined}
                                label="Email"
                                name="subscription.email"
                                value={values.subscription?.email}
                                onChange={handleChange}
                            >
                            </ValidatedTextField>

                            <ValidatedSelect
                                name="subscription.groups"
                                label="Groups"
                                multiple
                                error={errors.subscription?.groups && touched.subscription?.groups ? errors.subscription?.groups : undefined}
                            >
                                {props.optionalGroups.map(group => (
                                    <MenuItem value={group.id}>{group.name}</MenuItem>
                                ))}
                            </ValidatedSelect>



                            <Stack spacing={2} direction={"row"}>
                                <Button
                                    type={"submit"}
                                    variant="contained"
                                    fullWidth={true}
                                >
                                    {loading ? <CircularProgress color={"inherit"} size={"1.5em"}></CircularProgress> : <>{t("subscribe")}</>}
                                </Button>

                                <Button fullWidth={true} onClick={props.onCancel} variant="outlined">Cancel</Button>
                            </Stack>
                        </Stack>
                    </Form>
                )}

            </Formik>
        </FormControl>

    )
}


