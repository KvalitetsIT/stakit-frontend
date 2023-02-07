import { Checkbox, CheckboxProps, FormControlLabel, FormGroup } from "@mui/material"
import { Field } from "formik"

interface ValidatedCheckProps extends CheckboxProps {
    label: string
    name: string
    checked?: boolean
    error?: string
}

export function ValidatedCheck(props: ValidatedCheckProps) {
    return (
        <FormGroup>
            <FormControlLabel
                label={props.label}
                control={
                    <Field
                        //type={"checkbox"}
                        as={Checkbox}
                        variant="outlined"
                        {...props}
                        error={props.error}
                        helperText={props.error}
                    >
                    </Field>
                }
            />
        </FormGroup>

    )
}