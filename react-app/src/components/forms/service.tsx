import { FormControl, Stack, Button } from "@mui/material";
import { Formik, Form } from "formik";
import { Service } from "../../models/types";
import * as yup from 'yup';
import { ValidatedTextField } from "../input/validatedTextField";
import { FormProps } from "./subscribe";
import { ValidatedAutoComplete } from "../input/validatedAutocomplete";
import { Group } from "../../models/group";
import { useGetAllGroupsQuery } from "../../feature/stakit/groupsSlice";
import { t } from "i18next";

interface ServiceFormProps extends FormProps<Service> {
    service?: Service
}


export function ServiceForm(props: ServiceFormProps) {

    const { isLoading, data } = useGetAllGroupsQuery(undefined) ?? []

    const groups = data ?? []

    let service: Service | undefined = structuredClone(props.service)

    if (service) service.group = groups.find(group => group.uuid === props.service?.group as string)

    const validationSchema = yup.object().shape({
        service: yup.object().shape({
            service_identifier: yup.string().required(t("Identifier")+" "+t("is required")),
            name: yup.string().required(t("Name")+" "+t("is required")),
            description: yup.string().required(t("Description")+" "+t("is required")),

        })
    })

    const defaultGroup = groups && groups.find(group => group.name === "Default")


    const defaultValues: Service = {
        service_identifier: "",
        name: "",
        description: "",
        group: defaultGroup,
        ignore_service_name: false
    }

    if (props.isLoading || isLoading) return (<></>)
    
    const initialValues = {
        service: service ?? defaultValues
    }

    return (

        <FormControl fullWidth>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, formik) => { props.onSubmit(values.service).then(() => formik.resetForm()) }}
                validationSchema={validationSchema}
                enableReinitialize
            >
                {({ errors, touched, values, setFieldValue }) => {
                    return (
                        <Form>
                            <Stack spacing={2}>
                                <Stack direction={"row"} spacing={2}>
                                    <ValidatedTextField
                                        name="service.service_identifier"
                                        label={t("Identifier")}
                                        value={values.service.service_identifier}
                                        error={touched.service?.service_identifier && errors.service?.service_identifier ? errors.service?.service_identifier : undefined}
                                    />
                                    <ValidatedTextField
                                        name="service.name"
                                        label={t("Name")}
                                        value={values.service.name}
                                        error={touched.service?.name && errors.service?.name ? errors.service?.name : undefined}
                                    />
                                </Stack>

                                <ValidatedAutoComplete
                                    loading={isLoading}
                                    options={groups}
                                    name={"service.group"}
                                    label={t("Group")}
                                    getOptionLabel={(option: Group) => option.name ?? ""}
                                    value={values.service.group}
                                    onChange={(e, selected) => {
                                        setFieldValue("service.group", selected)
                                    }}
                                    defaultValue={initialValues.service.group}
                                    noOptionsText={"" + t("Non available groups")}
                                    error={touched.service?.group && errors.service?.group ? errors.service?.group : undefined}
                                //isOptionEqualToValue={(option, value) => option.uuid == value.uuid}
                                />

                                <ValidatedTextField
                                    name="service.description"
                                    label={t("Description")}
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
                                    >{t("Save")+""}</Button>
                                    <Button fullWidth={true} onClick={props.onCancel} variant="outlined">{t("Cancel")+""}</Button>
                                </Stack>
                            </Stack>
                        </Form>
                    )
                }}

            </Formik>
        </FormControl >

    )
}
