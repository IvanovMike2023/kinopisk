import {Header} from './Component/Header/Header'
import s from '../src/App.module.css'
import {MainPage} from "./Component/Main page/MainPage";
function App() {
  return (
        <div className={s.app}>
            <Header />
            <MainPage/>
        </div>
  )
}

export default App
