import {Header} from '../widgets/Header/Header'
import s from './App.module.css'
import {MainPage} from "../pages/MainPage/MainPage";
import {Route, Routes} from "react-router-dom";
import {SearchPages} from "../pages/SearchPage/SearchPages";
import {ThemeProvider} from "@mui/material/styles";
import {CategoryMovies} from "../pages/CategoryMoviesPage/CategoryMovies";
import {Footer} from "../widgets/Footer/Footer";
import {FilteredMovies} from "../pages/FilteredMovies/FilteredMovies";
import {FavoritesPage} from "../pages/FavoritesPage/FavoritesPage";
import {MoviePage} from "../pages/MoviePage/MoviePage";
import {getTheme} from "../shared/utils/theme/theme";
import {useThemeMode} from "../shared/helper/useThemeMode";
import {GlobalSnackbar} from "../shared/utils/GlobalSnackbar/GlobalSnackbar";
import {NotFoundPage} from "../shared/404Page/404Page";

function App() {
    const [darkMode,toggleTheme]=useThemeMode()
    const theme=getTheme(darkMode)
    return (
        <ThemeProvider theme={theme}>
            <div className={s.app}
                 style={{backgroundColor: theme.palette.background.default, color: theme.palette.text.primary}}>
                <Header darkMode={darkMode} handleThemeChange={toggleTheme}/>
                <GlobalSnackbar />
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/movies/:category" element={< CategoryMovies/>}/>
                    <Route path="/movies/filtered-movies" element={< FilteredMovies/>}/>
                    <Route path="/search" element={< SearchPages/>}/>
                    <Route path="/favorites" element={< FavoritesPage/>}/>
                    <Route path="/movie/:id" element={<MoviePage />} />
                    <Route path="/*" element={<NotFoundPage/>} />
                </Routes>
                <Footer/>
            </div>
        </ThemeProvider>
    )
}

export default App
