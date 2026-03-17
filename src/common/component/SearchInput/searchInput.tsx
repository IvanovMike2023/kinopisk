import s from "../MainPage/MainPage.module.css";
import {Button, IconButton, InputAdornment, TextField, useTheme} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

type Props = {
    query?: string
    handleSearch?: (value: string) => void
    handleInput?: (value: string) => void
}
export const SearchInput = ({query, handleInput, handleSearch}: Props) => {
    const [inputValue, setinputValue] = useState(query ?? '');
    const theme = useTheme();
    const navigate = useNavigate();
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const value=inputValue.trim()
        if(!value) return
        handleSearch?.(value)
        navigate(`/search?query=${encodeURIComponent(inputValue)}`);
    }
    const handleChange = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setinputValue(value)
        handleInput?.(value)
    },[handleInput]
    )
    const clearInput=()=>{
        setinputValue('')
        handleInput?.('')
    }
    useEffect(() => {
        if(query!==undefined){
            setinputValue(query)
        }
    }, [query])
    return (
        <form className={s.form} onSubmit={handleSubmit} >
            <TextField
                placeholder= "Search for a movie"
                variant="outlined"
                fullWidth
                value={inputValue}
                onChange={handleChange}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 20,
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.text.primary,
                    },
                }}
                style={{mb: 10}}
                InputProps={{
                    endAdornment: inputValue && (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="clear"
                                onClick={clearInput} // очищает поле
                                edge="end"
                            >
                                <CloseIcon style={{color: '#fff', fontSize: 16}}/> {/* иконка крестика */}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Button
                sx={{
                    '&:hover': {
                        cursor: inputValue === '' ? 'not-allowed' : 'pointer'
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
                type="submit"
                disabled={!inputValue.trim()}
                style={{marginBottom: 20, borderRadius: 40}}
            >
                Search
            </Button>
        </form>
    )
}