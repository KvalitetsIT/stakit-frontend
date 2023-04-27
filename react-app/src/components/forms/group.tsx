import { FormControl, Stack, Button, Select, Checkbox } from "@mui/material";
import { Formik, Form } from "formik";
import { Service } from "../../models/types";
import * as yup from 'yup';
import { ValidatedTextField } from "../input/validatedTextField";
import { ValidatedAutoComplete } from "../input/validatedAutocomplete";
import { FormProps } from "./subscribe";
import { Group } from "../../models/group";
import { t } from "i18next";
import { useGetAllServicesQuery } from "../../feature/stakit/serviceSlice";

import FormControlLabel from '@mui/material/FormControlLabel';
import { ValidatedCheck } from "../input/validatedCheck";

interface GroupFormProps extends FormProps<Group> {
    group?: Group
}

export function GroupForm(props: GroupFormProps) {

    //const services = useGetAllServicesCascaded()
    const { isLoading, data: services } = useGetAllServicesQuery(undefined) // data?.filter(service => service.group == undefined) ?? []

    const validationSchema = yup.object().shape({
        group: yup.object().shape({
            name: yup.string().required(t("Name") + " " + t("is required")),
            display_order: yup.string().required(t("Display-order") + " " + t("is required")),
            description: yup.string().required(t("Description") + " " + t("is required"))
        })
    })

    let group: Group | undefined = structuredClone(props.group)

    if (!isLoading && services && group) group.services = services.filter(service => (props.group?.services as string[]).includes(service.uuid!))


    const defaultValues = {
        name: "",
        display_order: 1,
        services: [],
        description: "",
        display: false,
        expanded: false,
    }

    const initialValues = {
        group: group ?? defaultValues
    }

    console.log("initialValues", initialValues)
    
    return (
        <FormControl fullWidth>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => props.onSubmit(values.group)}
                validationSchema={validationSchema}
                enableReinitialize
            >
                {({ errors, touched, values, submitForm, handleChange, setFieldValue }) => (
                    <Form>
                        <Stack spacing={2}>
                            <Stack spacing={2} direction={"row"}>
                                <ValidatedTextField
                                    name="group.name"
                                    label={t("Name")}
                                    value={values.group.name}
                                    error={touched.group?.name && errors.group?.name ? errors.group?.name : undefined}
                                />
                                <ValidatedTextField
                                    name="group.display_order"
                                    label={t("Display-order")}
                                    type="number"
                                    value={values.group.display_order}
                                    error={touched.group?.display_order && errors.group?.display_order ? errors.group?.display_order : undefined}
                                />
                            </Stack>

                            <ValidatedAutoComplete
                                multiple
                                id="tags-standard"
                                label={t("Services")}
                                name="group.services"
                                options={services ?? []}
                                onChange={(e, selected) => { setFieldValue("group.services", selected) }}
                                getOptionLabel={(option: Service) => option.name}
                                defaultValue={initialValues.group.services}
                                noOptionsText={"Non available services"}
                                error={touched.group?.services && errors.group?.services ? errors.group?.services : undefined}
                                loading={isLoading}
                            />

                            <ValidatedTextField
                                name="group.description"
                                label={t("Description")}
                                rows={3}
                                multiline
                                value={values.group.description}
                                error={touched.group?.description && errors.group?.description ? errors.group?.description : undefined}
                            />
                            <ValidatedCheck
                                name="group.display"
                                label={t("Show on dashboard")}
                                value={values.group.display}
                                error={touched.group?.display && errors.group?.display ? errors.group?.display : undefined}
                            />
                            <ValidatedCheck
                                name="group.expanded"
                                label={t("Expanded")}
                                value={values.group.expanded}
                                error={touched.group?.expanded && errors.group?.expanded ? errors.group?.expanded : undefined}
                            />


                            <Stack spacing={2} direction={"row"}>
                                <Button
                                    type={"submit"}
                                    variant="contained"
                                    fullWidth={true}
                                >
                                    {t("Save") + ""}
                                </Button>
                                <Button fullWidth={true} onClick={props.onCancel} variant="outlined">{"" + t("Cancel")}</Button>
                            </Stack>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </FormControl >
    )
}
