import {createTheme} from "@mui/material/styles";
type ThemeType='dark' | 'light'
export const getTheme =(darkMode:ThemeType)=> {
     return   createTheme({
            palette: {
                mode: darkMode==='dark' ? 'dark' : 'light', // автоматическое переключение
                primary: {
                    main: '#ffffff',  // основной цвет
                },
                secondary: {
                    main: darkMode==='dark'   ? '#141c2c': '#c4bdbd',  // дополнительный цвет
                },
                background: {
                    default: darkMode==='dark'   ? '#0b1120' : '#ffffff', // фон
                },
                text: {
                    primary: darkMode==='dark'  ? '#ffffff' : '#000000', // текст
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
