import { FormControl, Stack, Button, CircularProgress, TextField, makeStyles } from "@mui/material";
import { Formik, Form, useFormik } from "formik";
import { t } from "i18next";
import { ValidatedTextField } from "../input/validatedTextField";
import * as yup from 'yup';
import { Announcement } from "../../models/types";
import { FormProps } from "./subscribe";
import { ValidatedDateTimePicker } from "../input/validatedDateTimePicker";
import 'dayjs/locale/fr';
import 'dayjs/locale/ru';
import 'dayjs/locale/de';
import 'dayjs/locale/ar-sa';
import 'dayjs/locale/da';

import TextareaAutosize from '@mui/base/TextareaAutosize';
import { ClassNames } from "@emotion/react";
interface AnnouncementFormProps extends FormProps<Announcement> {
    announcement?: Announcement
    loading?: boolean
}

export function AnnouncementForm(props: AnnouncementFormProps) {

    const validationSchema = yup.object().shape({
        announcement: yup.object().shape({
            subject: yup.string().required(t("Subject") + " " + t("is required")),
            message: yup.string().required(t("Message") + " " + t("is required")),
            from_datetime: yup.date().required(t("From") + " " + t("is required")),
            to_datetime: yup.date().required(t("To") + " " + t("is required")),
        }),
    })

    const defaultValues: Announcement = {
        message: "",
        subject: "",
        from_datetime: new Date(),
        to_datetime: new Date(),
    }

    defaultValues.to_datetime?.setDate(defaultValues.to_datetime.getDate()+1);

    if (props.isLoading) return (<></>)
    return (
        <FormControl fullWidth>
            <Formik
                initialValues={{
                    announcement: props.announcement ?? defaultValues,
                }}
                onSubmit={(values, formik) => {
                    //values.announcement.from_datetime = new Date(values.announcement.from_datetime!); values.announcement.to_datetime = new Date(values.announcement.to_datetime!);
                    props.onSubmit(values.announcement).then(() => formik.resetForm())
                }}
                validationSchema={validationSchema}
                enableReinitialize
                
            >
                {({ errors, touched, values, handleChange, setFieldValue}) => {
                    return (
                        <Form>
                            <Stack spacing={2}>
                                <ValidatedTextField
                                    type={"text"}
                                    error={errors.announcement?.subject && touched.announcement?.subject ? errors.announcement.subject : undefined}
                                    label={t("Subject")}
                                    name="announcement.subject"
                                    value={values.announcement?.subject}
                                    onChange={handleChange}
                                />

                                <ValidatedTextField
                                    type={"text"}
                                    multiline
                                    rows={3}
                                    error={errors.announcement?.message && touched.announcement?.message ? errors.announcement.message : undefined}
                                    label={t("Message")}
                                    name="announcement.message"
                                    value={values.announcement?.message}
                                    onChange={handleChange}
                                    
                                    resize="vertical"
                                      
                                    
                                />


                                <Stack spacing={2} direction={"row"}>
                                    <ValidatedDateTimePicker
                                        error={errors.announcement?.from_datetime && touched.announcement?.from_datetime ? errors.announcement.from_datetime : undefined}
                                        label={t("From")}
                                        name="announcement.from_datetime"
                                        onChange={(newValue) => {
                                            setFieldValue("announcement.from_datetime", newValue);
                                        }}
                                        value={values.announcement?.from_datetime}
                                    />
                                    <ValidatedDateTimePicker
                                        error={errors.announcement?.to_datetime && touched.announcement?.to_datetime ? errors.announcement.to_datetime : undefined}
                                        label={t("To")}
                                        name="announcement.to_datetime"
                                        onChange={(newValue) => {
                                            setFieldValue("announcement.to_datetime", newValue);
                                        }}
                                        value={values.announcement?.to_datetime}
                                    />

                                </Stack>

                                <Stack spacing={2} direction={"row"}>
                                    <Button
                                        type={"submit"}
                                        variant="contained"
                                        disabled={props.loading}
                                        fullWidth={true}
                                    >
                                        {props.loading ? <CircularProgress color={"inherit"} size={"1.5em"}></CircularProgress> : <>{t("Submit")}</>}
                                    </Button>

                                    <Button fullWidth={true} onClick={props.onCancel} variant="outlined">{t("Cancel") + ""}</Button>
                                </Stack>
                            </Stack>
                        </Form>
                    )
                }
                }

            </Formik>
        </FormControl >
    )
}