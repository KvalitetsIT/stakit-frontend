import { createTheme } from "@mui/material";
import shadows from "@mui/material/styles/shadows";

export const theme = createTheme({
    palette: {
        background: {
            default: '#ffffff' 
        },
        secondary: {
            light: '#68fffb',
            main: "#00e6c8",
            dark: '#00b397',
            contrastText: '#000000',
        },
        primary: {
            light: '#405278',
            main: '#122A4C',
            dark: '#000024',
            contrastText: '#ffffff',
        },
        success: {
            light: '#68fffb',
            main: "green",
            dark: '#00b397',
            contrastText: '#000000',
        },
        warning: {
            light: '#68fffb',
            main: "yellow",
            dark: '#00b397',
            contrastText: '#000000',
        },
        error: {
            light: '#68fffb',
            main: "red",
            dark: '#00b397',
            contrastText: '#000000',
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: shadows[5]
                }
            }
        }
    }

});
