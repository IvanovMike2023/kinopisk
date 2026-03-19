import logoUrl from '../../../img/logo.svg'
import {AppBar, Button, Container, Switch, Toolbar, useTheme} from "@mui/material";
import {containerSx} from "../../styles/Container_styles";
import {useLocation, useNavigate} from "react-router-dom";
import s from './Header.module.css'
import {useState} from "react";
type Props= {
    darkMode: boolean,
    handleThemeChange: () => void
}
export const Header = ({darkMode, handleThemeChange}:Props) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const location = useLocation();

    const navItems = [
        { label: 'Main', path: '/' },
        { label: 'Category Movies', path: '/movies/popular' },
        { label: 'Filtered Movies', path: '/movies/filtered-movies' },
        { label: 'Search', path: '/search' },
        { label: 'Favorites', path: '/favorites' },
    ];

const [isActive,setIsActive]=useState(1)
    const handleMain = (e) => {
        navigate('/')
        setIsActive(e.currentTarget.id)
    }
    const handleSearch = (e) => {
        navigate('/search')
        setIsActive(e.currentTarget.id)
    }
    const handleCategoryMovies = (e) => {
        navigate('/movies/popular')
        setIsActive(e.currentTarget.id)
    }
    const handleFilteredMovies = (e) => {
        navigate('/movies/filtered-movies')
        setIsActive(e.currentTarget.id)
    }
    const handleFavoritesdMovies = (e) => {
        navigate('/favorites')
        setIsActive(e.currentTarget.id)
    }
    return (
            <AppBar elevation={4} position="static" sx={{mb: "3px"}} style={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}>
                <Toolbar>
                    <Container maxWidth={"lg"} sx={containerSx}>
                        <img className={s.logo} id='1' onClick={handleMain} src={logoUrl} alt="Логотип" width="150"/>
                        <Button id='1' sx={{backgroundColor:isActive==1 ? '#5d6167' : 'none' }} color="inherit" onClick={handleMain}>Main |</Button>
                        <Button id='2' sx={{backgroundColor:isActive==2 ? '#5d6167' : 'none' }} color="inherit" onClick={handleCategoryMovies} >Category Movies |</Button>
                        <Button id='3' sx={{backgroundColor:isActive==3 ? '#5d6167' : 'none' }} color="inherit" onClick={handleFilteredMovies}>Filtered Movies |</Button>
                        <Button id='4' sx={{backgroundColor:isActive==4 ? '#5d6167' : 'none' }} color="inherit" onClick={handleSearch}>Search |</Button>
                        <Button id='5' sx={{backgroundColor:isActive==5 ? '#5d6167' : 'none' }} color="inherit" onClick={handleFavoritesdMovies} >Favorites |</Button>
                        {darkMode?                         <button className={s.buttonTheme} aria-label="Переключить на светлую тему" title="Переключить на светлую тему" onClick={handleThemeChange} color="inherit">☀</button>
                      :
                            <button className={s.buttonTheme} aria-label="Переключить на светлую тему" title="Переключить на светлую тему" onClick={handleThemeChange} color="inherit">🌙</button>

                        }
                    </Container>
                </Toolbar>
            </AppBar>
    )
}