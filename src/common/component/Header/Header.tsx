import logoUrl from '../../../img/logo.svg'
import {AppBar, Button, Container, Switch, Toolbar, useTheme} from "@mui/material";
import {containerSx} from "../../styles/Container_styles";
import {useNavigate} from "react-router-dom";

type Props= {
    darkMode: boolean,
    handleThemeChange: () => void
}
export const Header = ({darkMode, handleThemeChange}:Props) => {
    const navigate = useNavigate();
    const theme = useTheme();

    const handleMain = () => {
        navigate('/')
    }
    const handleSearch = () => {
        navigate('/search')
    }
    const handleCategoryMovies = () => {
        navigate('/movies/popular')
    }
    const handleTheme=()=>{
        if(handleThemeChange){
            handleThemeChange()
        }
    }
    return (
            <AppBar position="static" sx={{mb: "30px", marginBottom: 0}} style={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}>
                <Toolbar>
                    <Container maxWidth={"lg"} sx={containerSx}>
                        <img src={logoUrl} alt="Логотип" width="150"/>
                        <Button color="inherit" onClick={handleMain}>Main |</Button>
                        <Button color="inherit" onClick={handleCategoryMovies} >Category Movies |</Button>
                        <Button color="inherit">Filtered Movies |</Button>
                        <Button color="inherit" onClick={handleSearch}>Search |</Button>
                        <Button color="inherit">Favorites |</Button>
                        <Switch color={"default"} onChange={handleTheme } checked={darkMode}/>
                    </Container>
                </Toolbar>
            </AppBar>
    )
}