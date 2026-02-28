import {Header} from '../common/component/Header/Header'
import s from './App.module.css'
import {MainPage} from "../common/component/MainPage/MainPage";
import {Route, Router, Routes} from "react-router-dom";
import {Search} from "../common/component/SearchPage/Search";
import {useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {CssBaseline, Switch} from "@mui/material";

function App() {

    const [darkMode, setDarkMode] = useState(false);
    const theme = createTheme({
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
    });
    const handleThemeChange = () => {
        setDarkMode(!darkMode);
    };
    return (
        <ThemeProvider theme={theme}>
        <div className={s.app} style={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}>
            <Header  darkMode={darkMode } handleThemeChange={handleThemeChange} />`
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/search" element={< Search/>}/>
            </Routes>

        </div>
        </ThemeProvider>
    )
}

export default App
