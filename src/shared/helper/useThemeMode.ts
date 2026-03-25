import {useEffect, useState} from "react";

export const useThemeMode=()=>{
    const [darkMode, setDarkMode] = useState(()=>{
        const isdarkMode= localStorage.getItem('theme')
        return isdarkMode ? isdarkMode : 'light'
    });
    const toggleTheme = () => {
        setDarkMode((prev)=>prev==='dark'? 'light' : 'dark');
    };
    useEffect(()=>{
        localStorage.setItem('theme',darkMode)
    },[darkMode])
return [darkMode,toggleTheme]
}