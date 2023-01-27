import { FormControl, Stack, Button, CircularProgress, Autocomplete, AutocompleteRenderInputParams } from "@mui/material"
import { Formik, Form } from "formik"
import { Service } from "../../models/types"
import * as yup from 'yup';
import { ValidatedTextField } from "../input/validatedTextField";
import { ReactNode, useState } from "react";
import { ValidatedAutoComplete } from "../input/validatedAutocomplete";
import { FormProps } from "./subscribe";
import { Group } from "../../models/group";
import { t } from "i18next";
import { useGetAllServiceQuery } from "../../feature/api/serviceSlice";
import { group } from "console";


interface GroupFormProps extends FormProps<Group> {
    group?: Group
}

export function GroupForm(props: GroupFormProps) {

    //const services = useGetAllServicesCascaded()
    const {isLoading, data: services} = useGetAllServiceQuery(undefined) // data?.filter(service => service.group == undefined) ?? []
    
    const validationSchema = yup.object().shape({
        group: yup.object().shape({
            name: yup.string().required(t("Name is required")),
            display_order: yup.string().required(t("Display-order is required")),
            description: yup.string().required(t("Description is required"))
        })
    })

    console.log("group", props.group)

    const initialValues = {
        group: props.group ?? {
            name: "",
            display_order: 1,
            services: [],
            description: "",
        }
    }



    const [loading, setLoading] = useState<boolean>(false)

    return (
        <FormControl fullWidth>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => { console.log("values: ", values); props.onSubmit(values.group) }}
                validationSchema={validationSchema}
            >
                {({ errors, touched, values, submitForm, handleChange, setFieldValue}) => (
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
                                label="Services"
                                name="group.services"
                                options={services??[]}
                                onChange={(e, selected) => {console.log("selected", selected); setFieldValue("group.services", selected) }}
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


                            <Stack spacing={2} direction={"row"}>
                                <Button
                                    type={"submit"}
                                    variant="contained"
                                    fullWidth={true}
                                >
                                    {loading ? <CircularProgress color={"inherit"} size={"1.5em"}></CircularProgress> : "" + t("Save")}
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
