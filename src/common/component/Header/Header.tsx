import logoUrl from '../../../img/logo.svg'
import {AppBar, Button, Container, Switch, ThemeProvider, Toolbar} from "@mui/material";
import {getTheme} from "../../theme/theme";
import {containerSx} from "../../styles/Container_styles";
import {useNavigate} from "react-router-dom";

export const Header = () => {
const theme=getTheme()
    const navigate = useNavigate();

    const handleMain = () => {
        navigate('/')
        //console.log(inputvalue)
    }
    const handleSearch = () => {
        navigate('/search')
        //console.log(inputvalue)
    }
    return (
        <ThemeProvider theme={theme}>
        <AppBar position="static" sx={{mb: "30px",marginBottom:0}} color="primary" >
            <Toolbar>
            <Container maxWidth={"lg"} sx={containerSx}>
           <img src={logoUrl} alt="Логотип" width="150" />
                    <Button color="inherit" onClick={handleMain}>Main |</Button>
                    <Button color="inherit">Category Movies |</Button>
                    <Button color="inherit">Filtered Movies |</Button>
                    <Button color="inherit" onClick={handleSearch}>Search |</Button>
                    <Button color="inherit">Favorites |</Button>
              <Switch color={"default"} />
            </Container>
            </Toolbar>
        </AppBar>
        </ThemeProvider>
       )
}