import { IconButton, styled } from "@mui/material";
import type { PaletteMode } from "@mui/material";

interface ThemeButtonProps {
    darkMode: PaletteMode;
}

export const ThemeButton = styled(IconButton, {
    shouldForwardProp: (prop) => prop !== 'darkMode' // ⚡ предотвращаем прокидку в DOM
})<ThemeButtonProps>(({ darkMode }) => ({
    width: 40,
    height: 40,
    borderRadius: 999,
    border: darkMode === 'light' ? '1px solid #d3ddef' : '1px solid #324061',
    color: darkMode === 'light' ? '#FFD700' : '#facc15',
    backgroundColor: darkMode === 'light' ? '#fff' : '#1f2b40',
    fontSize: 25,
    '&:hover': {
        border: '1px solid #7ea8f3',
        backgroundColor: darkMode === 'light' ? '#f0f4ff' : '#25304a'
    }
}));