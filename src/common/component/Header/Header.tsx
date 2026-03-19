import logoUrl from '../../../img/logo.svg'
import {AppBar, Button, Container, Switch, Toolbar, useTheme} from "@mui/material";
import {containerSx} from "../../styles/Container_styles";
import {useNavigate} from "react-router-dom";
import s from './Header.module.css'
import {useState} from "react";
type Props= {
    darkMode: boolean,
    handleThemeChange: () => void
}
export const Header = ({darkMode, handleThemeChange}:Props) => {
    const navigate = useNavigate();
    const theme = useTheme();
const [isActive,setIsActive]=useState(false)
    const handleMain = () => {
        navigate('/')
        setIsActive(true)
    }
    const handleSearch = () => {
        navigate('/search')
        setIsActive(true)
    }
    const handleCategoryMovies = () => {
        navigate('/movies/popular')
        setIsActive(true)
    }
    const handleFilteredMovies = () => {
        navigate('/movies/filtered-movies')
        setIsActive(true)
    }
    const handleFavoritesdMovies = () => {
        navigate('/favorites')
        setIsActive(true)
    }

    return (
            <AppBar elevation={4} position="static" sx={{mb: "3px"}} style={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}>
                <Toolbar>
                    <Container maxWidth={"lg"} sx={containerSx}>
                        <img className={s.logo} onClick={handleMain} src={logoUrl} alt="Логотип" width="150"/>
                        <Button sx={{backgroundColor:isActive ? '#5d6167' : 'none' }} color="inherit" onClick={handleMain}>Main |</Button>
                        <Button sx={{backgroundColor:isActive ? '#5d6167' : 'none' }} color="inherit" onClick={handleCategoryMovies} >Category Movies |</Button>
                        <Button sx={{backgroundColor:isActive ? '#5d6167' : 'none' }} color="inherit" onClick={handleFilteredMovies}>Filtered Movies |</Button>
                        <Button sx={{backgroundColor:isActive ? '#5d6167' : 'none' }} color="inherit" onClick={handleSearch}>Search |</Button>
                        <Button sx={{backgroundColor:isActive ? '#5d6167' : 'none' }} color="inherit" onClick={handleFavoritesdMovies} >Favorites |</Button>
                        {darkMode?                         <button className={s.buttonTheme} aria-label="Переключить на светлую тему" title="Переключить на светлую тему" onClick={handleThemeChange} color="inherit">☀</button>
                      :
                            <button className={s.buttonTheme} aria-label="Переключить на светлую тему" title="Переключить на светлую тему" onClick={handleThemeChange} color="inherit">🌙</button>

                        }
                    </Container>
                </Toolbar>
            </AppBar>
    )
}