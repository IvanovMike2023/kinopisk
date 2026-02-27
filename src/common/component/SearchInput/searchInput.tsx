import s from "../MainPage/MainPage.module.css";
import {Button, TextField} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSearchMonieQuery} from "../SearchPage/api/searchPageApi";

type Props = {
    handleSearch?: (value: string) => void
}
export const SearchInput = (props): Props => {
    const [inputvalue, setinputvalue] = useState('');
    const navigate = useNavigate();
    const handleSearchForInput = () => {
        navigate('/search')
        props?.handleSearch(inputvalue)
    }

    return (
        <form className={s.form}>
            <TextField
                label={inputvalue ? "" : "Search for a movie"}
                variant="outlined"
                fullWidth
                value={inputvalue}
                onChange={(e) => setinputvalue(e.target.value)}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 20,
                        backgroundColor: '#1f2b40',
                        color: '#fff'
                    },
                }}
                style={{marginBottom: 10}}
            />
            <Button
                sx={{
                    '&:hover': {
                        cursor: inputvalue === '' ? 'pointer' : 'pointer'
                    }
                }}
                variant="contained"
                color="primary"
                onClick={handleSearchForInput}
                type="button"
                style={{marginBottom: 20, borderRadius: 40}}
            >
                Search
            </Button>
        </form>
    )
}