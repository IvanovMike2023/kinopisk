import { useEffect, useState } from "react";

export const useThemeMode = (): [string, () => void] => {
    const [darkMode, setDarkMode] = useState<string>(() => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme ? storedTheme : 'light';
    });

    const toggleTheme = () => {
        setDarkMode(prev => (prev === 'dark' ? 'light' : 'dark'));
    };

    useEffect(() => {
        localStorage.setItem('theme', darkMode);
    }, [darkMode]);

    return [darkMode, toggleTheme];
}