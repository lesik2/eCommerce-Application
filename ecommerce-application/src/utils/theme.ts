import { createTheme } from '@mui/material';

const theme = createTheme({
    components: {
        // Name of the component
        MuiFormHelperText: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    fontSize: 10,
                    marginTop: 0,
                    width: '100%',
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    color: '#000000',
                    fontSize: 16,
                    margin: 0,
                },
                asterisk: {
                    color: '#ff0000',
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    color: '#000000',
                    fontSize: 16,
                    marginTop: 0,
                    width: 300,
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    width: 20,
                    height: 20,
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    fontSize: 15,
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    height: 40,
                    width: 355,
                },
            },
        },
    },
});
export default theme;
