import {createTheme} from "@mui/material/styles";
import type {PaletteMode} from "@mui/material";

export const getTheme =(darkMode: PaletteMode)=> {
     return   createTheme({
            palette: {
                mode: darkMode==='dark' ? 'dark' : 'light', // автоматическое переключение
                primary: {
                    main: '#ffffff',  // основной цвет
                },
                secondary: {
                    main: darkMode==='dark'   ? '#141c2c': '#c4bdbd',  // дополнительный цвет
                },
                divider:darkMode==='dark'   ? '#ffffff': '#c4bdbd' // дополнительный цвет
                ,
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
