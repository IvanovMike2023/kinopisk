import {createTheme} from "@mui/material/styles";

export const getTheme =(darkMode)=> {
     return   createTheme({
            palette: {
                mode: darkMode ? 'dark' : 'light', // автоматическое переключение
                primary: {
                    main: '#ffffff',  // основной цвет
                },
                secondary: {
                    main: '#141c2c',  // дополнительный цвет
                },
                background: {
                    default: darkMode ? '#0b1120' : '#ffffff', // фон
                },
                text: {
                    primary: darkMode ? '#ffffff' : '#000000', // текст
                },
            },
            typography: {
                fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
                fontSize: 14,
            },
            shape: {
                borderRadius: 8,
            },
            components: {
                MuiButton: {
                    styleOverrides: {
                        root: {
                            borderRadius: 20,
                        },
                    },
                },
            },
        })
    }
