import { TextField, TextFieldProps } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Field } from "formik";

import 'dayjs/locale/fr';
import 'dayjs/locale/ru';
import 'dayjs/locale/de';
import 'dayjs/locale/da';
import 'dayjs/locale/en';


export interface ValidatedDateTimePickerProps {
    name: string,
    label: string,
    error?: string
    onChange: (value: any, keyboardInputValue?: string | undefined) => void
    value: any
}



export function ValidatedDateTimePicker(props: ValidatedDateTimePickerProps) {

    const availableLanguages = ["fr", "ru", "de", "en", "da"] as const
    const defaultLanguage = "da"
    const lang = availableLanguages.find((x) => x === navigator.language) ?? defaultLanguage

    const {error} = props
    
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={lang} sx={{ width: "100%" }}>
            <Field
                as={DateTimePicker}
                renderInput={(props: JSX.IntrinsicAttributes & TextFieldProps) => <TextField
                    {...props}
                    error={error != undefined}
                    helperText={error}
                    fullWidth
                />}
                fullWidth
                sx={{ TextField: { error: true }, width: "100%" }}
                {...props}
            >
            </Field>
        </LocalizationProvider>
    )
}

