import { FormControl, Stack, InputLabel, Select, MenuItem, Button, CircularProgress, OutlinedInput, Menu, Autocomplete, TextField, TextFieldProps } from "@mui/material"
import { Formik, Form, Field } from "formik"
import { Group, Service } from "../../models/types"
import * as yup from 'yup';
import { ValidatedTextField } from "../input/validatedTextField";
import { useState } from "react";
import { serviceSlice, useGetAllServiceQuery, useUpdateServiceMutation } from "../../feature/api/serviceSlice";



export function EditGroupForm(props: { group: Group, onSubmit: (group: Group) => void, onCancel: () => void }) {


    const validationSchema = yup.object().shape({
        group: yup.object().shape({
            name: yup.string().required(),
            display_order: yup.string().required(),
            description: yup.string().required(),
        })
    })


    const initialValues = {
        group: props.group ?? {
            name: "",
            display_order: 1
        }
    }

    const { data } = useGetAllServiceQuery(undefined)



    const [loading, setLoading] = useState<boolean>(false)

    let availableServices: Service[] = data?.filter(service => service.group == undefined) ?? []

    const services = availableServices.concat(props.group?.services ?? [])

    return (
        <FormControl fullWidth>
            <Formik
                initialValues={{ group: props.group ?? new Group("", 1) }}
                onSubmit={(values) => props.onSubmit(values.group)}
                validationSchema={validationSchema}
            >
                {({ errors, touched, values, setFieldValue, initialValues }) => (
                    <Form>
                        <Stack spacing={2}>
                            <Stack spacing={2} direction={"row"}>
                                <ValidatedTextField
                                    name="group.name"
                                    label={"Name"}
                                    value={values.group.name}
                                    error={touched.group?.name && errors.group?.name ? errors.group?.name : undefined}
                                />
                                <ValidatedTextField
                                    name="group.display_order"
                                    label={"Display-order"}
                                    type="number"
                                    value={values.group.display_order}
                                    error={touched.group?.display_order && errors.group?.display_order ? errors.group?.display_order : undefined}
                                />
                            </Stack>

                            <ValidatedTextField
                                name="group.description"
                                label={"Description"}
                                value={values.group.description}
                                error={touched.group?.description && errors.group?.description ? errors.group?.description : undefined}
                            />
                            <Autocomplete
                                multiple
                                id="tags-standard"
                                options={availableServices}
                                getOptionLabel={(option: Service) => option.name}
                                defaultValue={initialValues.group.services}
                                renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label={"Services"}

                                    />
                                )}
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




EditGroupForm.defaultProps = {
    group: {}
}