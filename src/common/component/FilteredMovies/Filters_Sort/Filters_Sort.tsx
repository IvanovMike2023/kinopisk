import * as React from 'react';
import Box from '@mui/material/Box';
import {Button, Paper, Typography, useTheme} from "@mui/material";
import {MyButton, RatingRangeSlider, SortingSelector} from "../../../MyButton_Filter/MyButton";
import {useEffect} from "react";

type Props = {
    selectFilter: (value: string) => void
    resetFilter: (value: string) => void
    selectFilterSlider: (value: string) => void
    selectButtonFilter: (value: number,isClick:boolean) => void
    isresetFilter:boolean
}
export const Filters_Sort = ({isresetFilter,resetFilter,selectButtonFilter,selectFilterSlider, selectFilter}): Props => {
    const [age, setAge] = React.useState('popularity.desc');
    const [range, setRange] = React.useState([0.0, 10.0])
    const theme = useTheme();
    const handleChangeSlider = (event, newValue) => {
        selectFilterSlider(newValue)
        console.log(newValue)
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
        if (isresetFilter) {
            setRange([0.0, 10.0]);
            setAge('popularity.desc')
        }
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
                <MyButton isresetFilter={isresetFilter } name={'Action'} id={28} handlerButtonClick={handlerButtonClick}  />
                <MyButton isresetFilter={isresetFilter } name={'Adventure'} id={12} handlerButtonClick={handlerButtonClick }/>
                <MyButton isresetFilter={isresetFilter } name={'Animation'} id={16} handlerButtonClick={handlerButtonClick }/>
                <MyButton isresetFilter={isresetFilter } name={'Comedy'} id={35} handlerButtonClick={handlerButtonClick }/>
                <MyButton isresetFilter={isresetFilter } name={'Crime'} id={80} handlerButtonClick={handlerButtonClick }/>
                <MyButton isresetFilter={isresetFilter } name={'Drama'} id={18} handlerButtonClick={handlerButtonClick }/>
                <MyButton isresetFilter={isresetFilter }  name={'Documentary'} id={99} handlerButtonClick={handlerButtonClick }/>
                <MyButton isresetFilter={isresetFilter } name={'Family'} id={10751} handlerButtonClick={handlerButtonClick }/>
                <MyButton isresetFilter={isresetFilter } name={'Fantasy'} id={14} handlerButtonClick={handlerButtonClick }/>
                <MyButton isresetFilter={isresetFilter } name={'History'} id={36} handlerButtonClick={handlerButtonClick }/>
                <MyButton isresetFilter={isresetFilter } name={'Horror'} id={27} handlerButtonClick={handlerButtonClick }/>
                <MyButton isresetFilter={isresetFilter } name={'Music'} id={10402} handlerButtonClick={handlerButtonClick }/>
                <MyButton isresetFilter={isresetFilter } name={'Mystery'} id={9648} handlerButtonClick={handlerButtonClick }/>
                <MyButton isresetFilter={isresetFilter } name={'Romance'} id={10749} handlerButtonClick={handlerButtonClick }/>
                <MyButton isresetFilter={isresetFilter } name={'Science Fiction'} id={878} handlerButtonClick={handlerButtonClick }/>
                <MyButton isresetFilter={isresetFilter } name={'TV Movie'} id={10770} handlerButtonClick={handlerButtonClick }/>
                <MyButton isresetFilter={isresetFilter } name={'Thriller'} id={53} handlerButtonClick={handlerButtonClick }/>
                <MyButton isresetFilter={isresetFilter }  name={'War'} id={10752} handlerButtonClick={handlerButtonClick }/>
                <MyButton isresetFilter={isresetFilter } name={'Western'} id={37} handlerButtonClick={handlerButtonClick }/>
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