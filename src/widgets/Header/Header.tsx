import logoUrl from '../../img/logo.svg'
import {AppBar, Container, LinearProgress, Toolbar, useTheme} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import s from './Header.module.css'
import {useSelector} from "react-redux";
import {selectIsFetching} from "../../app/selectIsFetching";
import {containerSx} from "../../shared/styles";

type Props = {
    darkMode: string,
    handleThemeChange: () => void
}
export const Header = ({darkMode, handleThemeChange}: Props) => {
    const status = useSelector(selectIsFetching )
    const navigate = useNavigate();
    const theme = useTheme();
    const navItems = [
        {label: 'Main', path: '/'},
        {label: 'Category Movies', path: '/movies/popular'},
        {label: 'Filtered Movies', path: '/movies/filtered-movies'},
        {label: 'Search', path: '/search'},
        {label: 'Favorites', path: '/favorites'},
    ];
    return (
        <AppBar elevation={4} position="static" sx={{mb: "3px"}}
                style={{backgroundColor: theme.palette.background.default, color: theme.palette.text.primary}}>
            <Toolbar>
                <Container maxWidth={"lg"} sx={containerSx}>
                    <img className={s.logo} id='1' onClick={() => navigate(navItems[0].path)} src={logoUrl}
                         alt="Логотип" width="150"/>
                    {navItems.map((item) =>     <NavLink className={s.navMenu}
                            key={item.path}
                            to={item.path}
                            style={({ isActive }) => ({
                                textDecoration: 'none',
                                marginRight: '8px',
                                color: theme.palette.text.primary,
                                backgroundColor: isActive ? theme.palette.action.selected : 'transparent',
                                padding: '6px 12px 2px',
                                borderRadius: '50px'
                            })}
                        ><span>{item.label} |</span>

                        </NavLink>
                    )}

                    {darkMode==='light' ? <button className={s.buttonTheme} aria-label="Переключить на светлую тему"
                                        title="Переключить на светлую тему" onClick={handleThemeChange}
                                        color="inherit">☀</button>
                        :
                        <button className={s.buttonThemeDark} aria-label="Переключить на светлую тему"
                                title="Переключить на светлую тему" onClick={handleThemeChange}
                                color="inherit">🌙</button>

                    }
                </Container>
            </Toolbar>
            {status  && <LinearProgress  />}
        </AppBar>
    )
}