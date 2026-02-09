import {Header} from '../common/component/Header/Header'
import s from './App.module.css'
import {MainPage} from "../common/component/MainPage/MainPage";
import {Route, Router, Routes} from "react-router-dom";
import {SearchResult} from "../common/component/SearchResults/SearchResult";

function App() {
    return (
        <div className={s.app}>
            <Header/>`
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/search" element={< SearchResult/>}/>
            </Routes>

        </div>
    )
}

export default App
