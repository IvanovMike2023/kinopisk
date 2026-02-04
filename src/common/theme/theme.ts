import { createTheme } from "@mui/material/styles"

export const getTheme = () => {
    return createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: "#7b7a7a",
            },
        },
    })
}
