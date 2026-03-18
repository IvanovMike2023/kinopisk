import * as React from 'react';
import Box from '@mui/material/Box';
import {Button, dividerClasses, Paper, Typography, useTheme} from "@mui/material";
import {MyButton, RatingRangeSlider, SortingSelector} from "../../../MyButton_Filter/MyButton";
import {useEffect} from "react";
import {useGetMovieListQuery} from "../../MainPage/api/mainPageApi";

type Props = {
    selectFilter: (value: string) => void
    resetFilter: (value: string) => void
    selectFilterSlider: (value: string) => void
    selectButtonFilter: (value: number,isClick:boolean) => void
    isresetFilter:boolean
}
export const Filters_Sort = ({isresetFilter,resetFilter,selectButtonFilter,selectFilterSlider, selectFilter}): Props => {
    const {data}=useGetMovieListQuery()
    let MovieList
    if(data?.genres){
        MovieList=data.genres
    }

    const [age, setAge] = React.useState('popularity.desc');
    const [range, setRange] = React.useState([0.0, 10.0])
    const theme = useTheme();
    const handleChangeSlider = (event, newValue) => {
        selectFilterSlider(newValue)
        setRange(newValue);
    };
    const handleChange = (event: string) => {
        setAge(event.target.value as string);
        selectFilter(event.target.value)
    };
    const handlerButtonClick = (id,isClick) => {
        selectButtonFilter(id,isClick)
    }
    useEffect(() => {
            setRange([0.0, 10.0]);
            console.log('++++')
            setAge('popularity.desc')

    }, [isresetFilter]);

    return <Box sx={{
        display: 'flex',
        gap: '36px',
        padding: '20px',
        '& > :not(style)': {
            m: 1,
            width: 290,
            height: 608,
        },
    }}>
        <Paper sx={{backgroundColor: theme.palette.background.default, paddingTop: '20px'}} variant="elevation">
            <Typography align="center" variant="h5" component="h2">
                Filters / Sort
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="space-between" px={2} paddingTop={5}>
                <Typography variant="subtitle2" component="h2">
                    Filters / Sort
                </Typography>
                <SortingSelector value={age} handleChange={handleChange}/>
            </Box>
            <RatingRangeSlider range={range} onChangeSlider={handleChangeSlider}/>

            <Box display={'flex'} flexWrap="wrap" gap={1} padding={2}>
                { MovieList ? MovieList.map((el)=>{
                    return <MyButton key={el.id} isresetFilter={isresetFilter } name={el.name} id={el.id} handlerButtonClick={handlerButtonClick}   / >
                }) : <></>
                }
            </Box>
            <Box display={'flex'} justifyContent={'center'} paddingTop={3}>
                <Button sx={{
                    fontSize: 12,
                    backgroundColor: '#2563eb',
                    transition: 'background-color 0.2s ease',
                    '&:hover': {
                        backgroundColor: '#1e40af'
                    },
                }} onClick={resetFilter}>Reset filters</Button>
            </Box>
        </Paper>
    </Box>
}