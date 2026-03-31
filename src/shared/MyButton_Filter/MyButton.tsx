import {Button, Select, Slider, Typography, useTheme} from "@mui/material";
import * as React from "react";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import {useEffect, useState} from "react";

type MyButtonProps = {
    name: string
    id:string
    handlerButtonClick:(id:number,isClick:boolean)=>void
    isresetFilter:boolean
}
export const MyButton = ({isresetFilter,name,id,handlerButtonClick}: MyButtonProps )=> {
    const theme = useTheme();
    const [isClick,setisClick]=useState(true)
    const handlerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const newIsClick = !isClick;
            setisClick(newIsClick)
            handlerButtonClick(e.currentTarget.id,isClick)
    }
    useEffect(()=>{
        if(isresetFilter){
            setisClick (true)
        }
    },[isresetFilter])
    return (<Button onClick={handlerClick} id={id}
        sx={{
            border: '1px solid #ccc',
            fontSize: 12,
            color: theme.palette.text.primary,
            lineHeight: 1.2,
            borderRadius: 9999,
            transition: 'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
                borderColor: '#2563eb',
            },
            backgroundColor: !isClick  ? '#2563eb' : theme.palette.background.default,
        }}
    >{name}
    </Button>)
}
type Sort = {
    value: string,
    handleChange: (event: any) => void
}
export const SortingSelector = ({value, handleChange}: Sort) => {
    const theme = useTheme();
    return <FormControl sx={{width: 200}}>
        <Select value={value}
                onChange={handleChange}
                MenuProps={{
                    PaperProps: {
                        style: {backgroundColor: theme.palette.background.default}, // цвет фона меню
                    },
                }}
                sx={{
                    height: 35,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.secondary.main,
                     // обычный бордер
                        borderWidth: '1px',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#2563eb', // бордер при hover
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#2563eb', // бордер при фокусе (выбран элемент)
                    },
                }}
        >
            <MenuItem value={'popularity.desc'}>Popularity ↓</MenuItem>
            <MenuItem value={'popularity.asc'}>Popularity ↑</MenuItem>
            <MenuItem value={'vote_average.desc'}>Rating ↓</MenuItem>
            <MenuItem value={'vote_average.asc'}>Rating ↑</MenuItem>
            <MenuItem value={'primary_release_date.desc'}>Release Date ↓</MenuItem>
            <MenuItem value={'primary_release_date.asc'}>Release Date ↑</MenuItem>
            <MenuItem value={'original_title.asc'}>Title A-Z</MenuItem>
            <MenuItem value={'original_title.desc'}>Title Z-A</MenuItem>
        </Select>
    </FormControl>
}
type Rating = {
    range: number[],
    onChangeSlider: (event: Event, newValue: number | number[]) => void
}

export const RatingRangeSlider = ({range, onChangeSlider}: Rating) => {
    const theme = useTheme();
    return <Box sx={{width: '100%', maxWidth: 250, padding: 2, borderRadius: 2}}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="subtitle1" fontWeight="bold">
                Rating Range
            </Typography>
            <Typography variant="subtitle1" sx={{color: theme.palette.text.primary}}>
                {range[0].toFixed(1)} - {range[1].toFixed(1)}
            </Typography>
        </Box>
        <Slider
            value={range}
            onChange={onChangeSlider}
            min={0.0}
            max={10.0}
            step={0.1}
            valueLabelDisplay="off"
            disableSwap //
            sx={{
                width: '100%',
                color: '#2563eb', // цвет слайдера
                '& .MuiSlider-thumb': {
                    backgroundColor: '#2563eb',
                    border: '2px solid #1e40af',
                },
                '& .MuiSlider-track': {
                    height: 4,
                    backgroundColor: '#2563eb', // цвет полосы
                },
                '& .MuiSlider-rail': {
                    height: 4,
                    backgroundColor: '#ccc',
                },
            }}
        />
    </Box>
}


