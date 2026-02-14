import {createRoot} from 'react-dom/client'
import './src/index.css'
import App from './src/app/App.tsx'
import {store} from "./src/app/store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>


        </Provider>
    </BrowserRouter>
)
