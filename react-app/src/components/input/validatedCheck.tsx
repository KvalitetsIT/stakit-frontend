import { CheckboxProps, FormControlLabel } from "@mui/material"
import { Field } from "formik"

interface ValidatedCheckProps extends CheckboxProps {
    label: string
    name: string
    checked: boolean

}

export function ValidatedCheck(props: ValidatedCheckProps) {
    return (
        <Field
            as={FormControlLabel}
            error={true}
            variant="outlined"
            {...props}
        >
        </Field>
    )
}