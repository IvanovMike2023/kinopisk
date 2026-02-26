import s from "../MainPage/MainPage.module.css";
import {Button, TextField} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSearchMonieQuery} from "../Search/api/searchPageApi";

export const SearchInput = () => {
    const [inputvalue, setinputvalue] = useState('');
    const {data}=useSearchMonieQuery({page:3,include_adult:false,include_video:false,language:'en-US',sort_by:'original_title.desc'})
    const navigate = useNavigate();
    const svgIcon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="20px" height="20px" fill-rule="nonzero"><g fill="#ff0e0e" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M25,2c-12.683,0 -23,10.318 -23,23c0,12.682 10.317,23 23,23c12.683,0 23,-10.318 23,-23c0,-12.682 -10.317,-23 -23,-23zM7,25c0,-4.062 1.371,-7.8 3.65,-10.815l25.165,25.165c-3.015,2.279 -6.753,3.65 -10.815,3.65c-9.925,0 -18,-8.075 -18,-18zM39.35,35.815l-25.165,-25.165c3.015,-2.279 6.753,-3.65 10.815,-3.65c9.925,0 18,8.075 18,18c0,4.062 -1.371,7.8 -3.65,10.815z"></path></g></g></svg>'
    const encodedSvg = encodeURIComponent(svgIcon);
    const cursorUrl = `url("data:image/svg+xml;utf8,${encodedSvg}") , auto`;
    const handleSearch = () => {
        navigate('/search')
        console.log(inputvalue)
        console.log(data)
        console.log(data.results.find((f)=>f.title==='The SanMei-sama'))
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
                        cursor: inputvalue === '' ? cursorUrl : 'pointer'
                    }
                }}
                variant="contained"
                color="primary"
                onClick={handleSearch}
                style={{marginBottom: 20, borderRadius: 40}}
            >
                Search
            </Button>
        </form>
    )
}