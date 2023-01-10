import { FormControl, Stack, Button, CircularProgress } from "@mui/material"

import { Formik, Form } from "formik"
import { Group, Service } from "../../models/types"
import * as yup from 'yup';
import { ValidatedTextField } from "../input/validatedTextField";
import { useState } from "react";
import { FormProps } from "./subscribe";
import { toast } from "react-toastify";
import { t } from "i18next";

interface ServiceFormProps extends FormProps<Service> {
    service?: Service,
    optionalGroups: Group[],

}

export function ServiceForm(props: ServiceFormProps) {


    const validationSchema = yup.object().shape({
        service: yup.object().shape({
            name: yup.string().required(),
            description: yup.string().required(),
            group: yup.array().min(1)
        })
    })

    const [loading, setLoading] = useState<boolean>(false)

    const initialValues = {
        service: props.service ?? {
            service_identifier: "",
            name: "",
            description: "",
            group: undefined,
            ignore_service_name: false
        }
    }

    return (
        <FormControl fullWidth>

            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {

                    toast.promise(
                        async () => {
                            await props.onSubmit(values.service)
                        },
                        {
                            pending: t('processing subscription'),
                            success: t(" successfully subscribed"),
                            error: t('subscription rejected')
                        }
                    )
                }}
                validationSchema={validationSchema}
            >
                {({ errors, touched, values, setFieldValue }) => (
                    <Form>
                        <Stack spacing={2}>
                            
                        <ValidatedTextField
                                name="service.service_identifier"
                                label={"Identifier"}
                                value={values.service.service_identifier}
                                error={touched.service?.service_identifier && errors.service?.service_identifier ? errors.service?.service_identifier : undefined}
                            />
                            <ValidatedTextField
                                name="service.name"
                                label={"Name"}
                                value={values.service.name}
                                error={touched.service?.name && errors.service?.name ? errors.service?.name : undefined}
                            />

                            {/* <ValidatedSelect
                                name="service.groups"
                                label="Groups"
                                multiple
                                error={errors.service?.group && touched.service?.group ? errors.service?.group : undefined}
                            >
                                {props.optionalGroups.map(group => (
                                    <MenuItem value={group.id}>{group.name}</MenuItem>
                                ))}
                            </ValidatedSelect> */}

                            <ValidatedTextField
                                name="service.description"
                                label={"Description"}
                                multiline
                                rows={3}
                                value={values.service.description}
                                error={touched.service?.description && errors.service?.description ? errors.service?.description : undefined}
                            />

                            <Stack spacing={2} direction={"row"}>
                                <Button
                                    type={"submit"}
                                    variant="contained"
                                    fullWidth={true}
                                >
                                    {loading ? <CircularProgress color={"inherit"} size={"1.5em"}></CircularProgress> : "Gem"}
                                </Button>

                                <Button fullWidth={true} onClick={props.onCancel} variant="outlined">Cancel</Button>

                            </Stack>
                        </Stack>
                    </Form>
                )}

            </Formik>
        </FormControl >
    )
}

ServiceForm.defaultProps = {
    group: {}
}