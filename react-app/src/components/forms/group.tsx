import { FormControl, Stack, InputLabel, Select, MenuItem, Button, CircularProgress, OutlinedInput } from "@mui/material"
import { Formik, Form } from "formik"
import { Group, Service } from "../../models/types"
import * as yup from 'yup';
import { ValidatedTextField } from "../input/validatedTextField";
import { useState } from "react";
import { mock } from "../../MockedData";



export function EditGroupForm(props: { group: Group, onSubmit: (group: Group) => void, onCancel: () => void }) {


    const validationSchema = yup.object().shape({
        group: yup.object().shape({
            name: yup.string().required(),
            description: yup.string().required(),
        })
    })


    const [loading, setLoading] = useState<boolean>(false)
    const [group, setGroup] = useState<Group>(props.group)

    const unassignedServices: Service[] = mock.services

    return (
        <FormControl fullWidth>
            <Formik
                initialValues={{ group: group, confirmedPassword: "" }}
                onSubmit={(values) => props.onSubmit(values.group)}
                validationSchema={validationSchema}
            >
                {({ errors, touched, values, setFieldValue }) => (
                    <Form>
                        <Stack spacing={2}>
                            <ValidatedTextField
                                name="group.name"
                                label={"Name"}
                                value={values.group.name}
                                error={touched.group?.name && errors.group?.name ? errors.group?.name : undefined}
                            />
                            <ValidatedTextField
                                name="group.description"
                                label={"Description"}
                                value={values.group.description}
                                error={touched.group?.description && errors.group?.description ? errors.group?.description : undefined}
                            />

                            <FormControl fullWidth>

                                <InputLabel id="select-service-label">Services</InputLabel>
                                <Select
                                    labelId="select-service-label"
                                    id="select-service"
                                    multiple
                                    value={values.group.services}
                                    onChange={(event) => { console.log(event.target.value); setFieldValue("services", event.target.value as Service[]) }}
                                    input={<OutlinedInput label="Name" />}

                                >
                                    {unassignedServices.map((service) => (
                                        <MenuItem
                                            key={service.name}
                                            value={service.name}

                                        >
                                            {service.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Stack spacing={2} direction={"row"}>
                                <Button
                                    onClick={(event) => {
                                        event.preventDefault()
                                        props.onSubmit(group)
                                    }}
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