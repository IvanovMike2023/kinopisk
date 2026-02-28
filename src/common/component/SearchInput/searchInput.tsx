import s from "../MainPage/MainPage.module.css";
import {Button, IconButton, InputAdornment, TextField} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

type Props = {
    query?: string
    handleInput?: (value: string) => void
}
export const SearchInput = ({query, handleInput}: Props) => {
    const [inputvalue, setinputvalue] = useState(query || '');
    const navigate = useNavigate();
    const handleSearchForInput = () => {
        navigate(`/search?query=${encodeURIComponent(inputvalue)}`);
    }
    const handleonChangeInput = (e) => {
        setinputvalue(e)
        if (handleInput)
            handleInput(e)

    }
    return (
        <form className={s.form}>
            <TextField
                placeholder={inputvalue ? "" : "Search for a movie"}
                variant="outlined"
                fullWidth
                value={inputvalue}
                onChange={(e) => handleonChangeInput(e.target.value)}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 20,
                        backgroundColor: '#1f2b40',
                        color: '#fff',
                    },
                }}
                style={{ marginBottom: 10 }}
                // Добавляем InputAdornment через свойство InputProps
                InputProps={{
                    endAdornment: inputvalue && (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="clear"
                                onClick={() => handleonChangeInput('')} // очищает поле
                                edge="end"
                            >
                                <CloseIcon style={{ color: '#fff' ,fontSize: 16 }} /> {/* иконка крестика */}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Button
                sx={{
                    '&:hover': {
                        cursor: inputvalue === '' ? 'not-allowed' : 'pointer'
                    },
                    '&.Mui-disabled': {
                        backgroundColor: '#2563eb',
                        color: '#f8fafc',
                        cursor: 'not-allowed !important', // добавляем !important
                        opacity: 0.6,
                        pointerEvents: 'auto'
                    }
                }}
                variant="contained"
                color="primary"
                onClick={handleSearchForInput}
                type="button"
                disabled={inputvalue === ''}
                style={{ marginBottom: 20, borderRadius: 40 }}
            >
                Search
            </Button>
        </form>
    )
}