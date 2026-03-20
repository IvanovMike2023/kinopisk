import {useEffect, useState} from "react";

export const useThemeMode=()=>{
    const [darkMode, setDarkMode] = useState(()=>{
        const isdarkMode= localStorage.getItem('theme')
        //console.log(JSON.stringify(isdarkMode))
        console.log(isdarkMode)
        return isdarkMode ? isdarkMode:true
    });
    const toggleTheme = () => {
        setDarkMode((prev)=>!prev);
    };
    useEffect(()=>{
        //localStorage.getItem('theme')
        localStorage.setItem('theme',darkMode)
    },[darkMode])
return [darkMode,toggleTheme]
}