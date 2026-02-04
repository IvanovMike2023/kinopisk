import {Header} from '../common/component/Header/Header'
import s from './App.module.css'
import {MainPage} from "../common/component/MainPage/MainPage";
function App() {
  return (
        <div className={s.app}>
            <Header />
            <MainPage/>
        </div>
  )
}

export default App
