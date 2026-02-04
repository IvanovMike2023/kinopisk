import s from './Header.module.css'
import logoUrl from '../../img/logo.svg'
import {AppBar, Button, Container, createTheme, Switch, ThemeProvider, Toolbar} from "@mui/material";
import {getTheme} from "../../Common/theme";
export const Header = () => {
const theme=getTheme()
    return (
        <ThemeProvider theme={theme}>
        <AppBar position="static" sx={{mb: "30px"}} color="primary" >
            <Toolbar>
            <Container maxWidth={"lg"} >
           <img src={logoUrl} alt="Логотип" width="150" />
                    <Button color="inherit">Main |</Button>
                    <Button color="inherit">Category Movies |</Button>
                    <Button color="inherit">Filtered Movies |</Button>
                    <Button color="inherit">Search |</Button>
                    <Button color="inherit">Favorites |</Button>
              <Switch color={"default"} />

            </Container>
            </Toolbar>
        </AppBar>
        </ThemeProvider>
       )
}