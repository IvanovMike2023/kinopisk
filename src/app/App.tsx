import {Header} from '../common/component/Header/Header'
import s from './App.module.css'
import {Route, Routes} from "react-router-dom";
import {ThemeProvider} from "@mui/material/styles";
import {Footer} from "../common/component/Footer/Footer";
import {getTheme} from "../common/utils/theme/theme";
import {useThemeMode} from "../common/helper/useThemeMode";
import {GlobalSnackbar} from "../common/component/GlobalSnackbar/GlobalSnackbar";
import {Skeleton} from "@mui/material";
import { Suspense, lazy } from "react";
const MainPage = lazy(() => import("../common/component/MainPage/MainPage"));
const CategoryMovies = lazy(() => import("../common/component/CategoryMoviesPage/CategoryMovies"));
const FilteredMovies = lazy(() => import("../common/component/FilteredMovies/FilteredMovies"));
const SearchPages = lazy(() => import("../common/component/SearchPage/SearchPages"));
const FavoritesPage = lazy(() => import("../common/component/FavoritesPage/FavoritesPage"));
const MoviePage = lazy(() => import("../common/component/MoviePage/MoviePage"));
function App() {
    const [darkMode,toggleTheme]=useThemeMode()
    const theme=getTheme(darkMode)

    return (
        <ThemeProvider theme={theme}>
            <div className={s.app}
                 style={{backgroundColor: theme.palette.background.default, color: theme.palette.text.primary}}>
                <Header darkMode={darkMode} handleThemeChange={toggleTheme}/>
                <GlobalSnackbar />
                <Suspense fallback={<Skeleton variant="rectangular" height={300}/>}>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/movies/:category" element={< CategoryMovies/>}/>
                    <Route path="/movies/filtered-movies" element={< FilteredMovies/>}/>
                    <Route path="/search" element={< SearchPages/>}/>
                    <Route path="/favorites" element={< FavoritesPage/>}/>
                    <Route path="/movie/:id" element={<MoviePage />} />
                </Routes>
                </Suspense>
                <Footer/>
            </div>
        </ThemeProvider>
    )
}

export default App
