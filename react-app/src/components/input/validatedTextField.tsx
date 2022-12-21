import { OutlinedTextFieldProps, TextField } from "@mui/material"
import { Field } from "formik"

export interface ValidatedTextFieldProps extends Omit<OutlinedTextFieldProps, "error"> {
    name: string,
    label: string,
    error?: string
}

export function ValidatedTextField(props: ValidatedTextFieldProps) {

    return (
        <Field
            id={props.name}
            error={props.error}
            helperText={props.error}
            as={TextField}
            fullWidth
            {...props}
        />

    )
}

ValidatedTextField.defaultProps = {
    variant: "outlined",
    type: "text",

}





