import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './src/index.css'
import App from './src/app/App.tsx'
import {store} from "./src/app/store";
import {Provider} from "react-redux";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
    <App />
    </Provider>
)
