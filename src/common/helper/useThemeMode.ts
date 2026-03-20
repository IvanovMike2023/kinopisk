import {useEffect, useState} from "react";

export const useThemeMode=()=>{
    const [darkMode, setDarkMode] = useState(()=>{
        const isdarkMode= localStorage.getItem('theme')
        return isdarkMode ? isdarkMode:true
    });
    const toggleTheme = () => {
        setDarkMode((prev)=>!prev);
    };
    useEffect(()=>{
        localStorage.setItem('theme',darkMode)
    },[darkMode])
return [darkMode,toggleTheme]
}