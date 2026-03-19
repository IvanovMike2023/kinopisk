import {useEffect, useState} from "react";
import {getTheme} from "../utils/theme/theme";

export const useThemeMode=()=>{
    const [darkMode, setDarkMode] = useState(()=>{
        const isdarkMode= localStorage.getItem('theme')
        return isdarkMode ? JSON.stringify(isdarkMode):true
    });
    localStorage.setItem('theme', JSON.stringify(darkMode))
    const toggleTheme = () => {
        setDarkMode((prev)=>!prev);
    };
    useEffect(()=>{
        localStorage.getItem('theme')
    },[darkMode])
return [darkMode,toggleTheme]
}