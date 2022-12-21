import { FormControl, Stack, Button, CircularProgress } from "@mui/material"
import { Formik, Form } from "formik"
import { t } from "i18next"
import { ValidatedTextField } from "../input/validatedTextField"
import * as yup from 'yup';
import { Announcement } from "../../models/types"
import { FormProps } from "./subscribe"

interface AnnouncementFormProps extends FormProps<Announcement> {
    announcement?: Announcement
    loading?: boolean
}

export function AnnouncementForm(props: AnnouncementFormProps) {

    const validationSchema = yup.object().shape({
        announcement: yup.object().shape({
            content: yup.string().required(t("content is required")),
            from: yup.date().required(t("from is required")),
            to: yup.date().required(t("from is required")),
        }),
    })

    const initialValues = {
        announcement: props.announcement ?? {
            content: "",
            from: new Date(),
            to: new Date(),
        },
        checked: false
    }

    return (
        <FormControl fullWidth>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => props.onSubmit(values.announcement)}
                validationSchema={validationSchema}
            >
                {({ errors, touched, values, handleChange }) => (
                    <Form>
                        <Stack spacing={2}>
                            <ValidatedTextField
                                type={"email"}
                                error={errors.announcement?.content && touched.announcement?.content ? errors.announcement.content : undefined}
                                label="Email"
                                name="subscription.email"
                                value={values.announcement?.content}
                                onChange={handleChange}
                            >
                            </ValidatedTextField>



                            <Stack spacing={2} direction={"row"}>
                                <Button
                                    type={"submit"}
                                    variant="contained"
                                    disabled={props.loading}
                                    fullWidth={true}
                                >
                                    {props.loading ? <CircularProgress color={"inherit"} size={"1.5em"}></CircularProgress> : <>{t("subscribe")}</>}
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