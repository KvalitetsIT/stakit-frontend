import { Button, CircularProgress, FormControl, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { t } from "i18next";
import * as yup from 'yup';
import { Subscription } from "../../models/types";
import { ValidatedAutoComplete } from "../input/validatedAutocomplete";
import { ValidatedTextField } from "../input/validatedTextField";
import { Group } from "../../models/group";
import { ValidatedCheck } from "../input/validatedCheck";


export interface FormProps<T> {
    onSubmit: (submission: T) => Promise<void>
    onCancel: () => void,
    isLoading?: boolean

}

interface SubscriptionFormProps extends FormProps<Subscription> {
    optionalGroups?: Group[],
    subscription?: Subscription
}

export function SubscriptionForm(props: SubscriptionFormProps) {

    const validationSchema = yup.object().shape({
        subscription: yup.object().shape({
            email: yup.string().required(t("Email") +" "+t("is required")).email(t("Email") +" "+ t("is not valid")),
            groups: yup.array().required(t("Groups") +" "+ t("is required")),
            announcements: yup.bool().required(t("Announcemets")+" "+ t("is required")),
        }),

    })

    const defaultValues: Subscription = {
        email: "",
        groups: [],
        announcements: false
    }


    const initialValues = {
        subscription: props.subscription ?? defaultValues,
    }

    return (
        <FormControl fullWidth>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, formik) => {
                    const groups = values.subscription.groups as unknown as Group[]
                    const subscription = {
                        email: values.subscription.email!,
                        groups: groups?.map(group => group.uuid!),
                        announcements: values.subscription.announcements
                    }
                    props.onSubmit(subscription).then(() => formik.resetForm())
                }}
                validationSchema={validationSchema}
                enableReinitialize
            >
                {({ errors, touched, values, handleChange, setFieldValue }) => (
                    <Form>
                        <Stack spacing={2}>
                            <ValidatedTextField
                                type={"email"}
                                error={errors.subscription?.email && touched.subscription?.email ? errors.subscription.email : undefined}
                                label={t("Email")}
                                name="subscription.email"
                                value={values.subscription?.email}
                                onChange={handleChange}
                            >
                            </ValidatedTextField>
                            <ValidatedAutoComplete
                                multiple
                                options={props.optionalGroups ?? []}
                                value={values.subscription.groups}
                                name={"subscription.groups"}
                                label={t("Groups")}
                                error={errors.subscription?.groups && touched.subscription?.groups ? errors.subscription?.groups : undefined}
                                getOptionLabel={(option: Group) => option.name}
                                noOptionsText={"Non available groups"}
                                onChange={(e, selected) => {
                                    const groups = selected as Group[]
                                    setFieldValue("subscription.groups", groups)
                                }}

                            />
                            
                            <ValidatedCheck
                                label={t("Announcements")}
                                name={"subscription.announcements"}
                                error={errors.subscription?.announcements && touched.subscription?.announcements ? errors.subscription.announcements : undefined}
                            />
                            <Stack spacing={2} direction={"row"}>
                                <Button
                                    type={"submit"}
                                    variant="contained"
                                    fullWidth={true}
                                >
                                    {props.isLoading ? <CircularProgress color={"inherit"} size={"1.5em"}></CircularProgress> : <>{t("Subscribe")}</>}
                                </Button>
                                <Button fullWidth={true} onClick={props.onCancel} variant="outlined">{t("Cancel")+""}</Button>
                            </Stack>
                        </Stack>
                    </Form>
                )}

            </Formik>
        </FormControl>

    )
}


