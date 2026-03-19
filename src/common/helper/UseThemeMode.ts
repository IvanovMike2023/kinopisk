import {useEffect, useState} from "react";

export const useThemeMode=()=>{
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? JSON.parse(savedTheme) : true;
    });
    const toggleTheme = () => {
        setDarkMode(prev => !prev);
    };

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(darkMode));
    }, [darkMode]);
return [darkMode,toggleTheme]
}