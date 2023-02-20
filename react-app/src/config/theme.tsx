import { createTheme } from "@mui/material";
import shadows from "@mui/material/styles/shadows";


const kit = {
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
    }
}


export const theme = createTheme({
    palette: {
        background: {
            default: '#ffffff'
        },
        secondary: kit.secondary,
        primary: kit.primary,
        success: {
            light: '#4caf50',
            main: "#2e7d32",
            dark: '#1b5e20',
            contrastText: '#000000',
        },
        warning: {
            light: '#ff9800',
            main: "#ed6c02",
            dark: '#e65100',
            contrastText: '#000000',
        },
        error: {
            light: '#ef5350',
            main: "#d32f2f",
            dark: '#c62828',
            contrastText: '#000000',
        },
   
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: shadows[5],
                    //borderRadius: 0
                }
            }
        }
    }

});
