import * as React from 'react';
import Box from '@mui/material/Box';
import {Button, Paper, Typography, useTheme} from "@mui/material";
import {MyButton, RatingRangeSlider, SortingSelector} from "../../../MyButton_Filter/MyButton";

type Props = {
    selectFilter: (value: string) => void
    selectFilterSlider: (value: string) => void
    selectButtonFilter: (value: number,isClick:boolean) => void
}
export const Filters_Sort = ({selectButtonFilter,selectFilterSlider, selectFilter}): Props => {
    const [age, setAge] = React.useState('popularity.desc');
    const [range, setRange] = React.useState([2.0, 8.0])
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
                <MyButton name={'Action'} id={28} handlerButtonClick={handlerButtonClick}  />
                <MyButton name={'Adventure'} id={12} handlerButtonClick={handlerButtonClick }/>
                <MyButton name={'Animation'}/>
                <MyButton name={'Comedy'}/>
                <MyButton name={'Crime'}/>
                <MyButton name={'Drama'}/>
                <MyButton name={'Documentary'}/>
                <MyButton name={'Family'}/>
                <MyButton name={'Fantasy'}/>
                <MyButton name={'History'}/>
                <MyButton name={'Horror'}/>
                <MyButton name={'Music'}/>
                <MyButton name={'Mystery'}/>
                <MyButton name={'Romance'}/>
                <MyButton name={'Science Fiction'}/>
                <MyButton name={'TV Movie'}/>
                <MyButton name={'Thriller'}/>
                <MyButton name={'War'}/>
                <MyButton name={'Western'}/>
            </Box>
            <Box display={'flex'} justifyContent={'center'} paddingTop={3}>
                <Button sx={{
                    fontSize: 12,
                    backgroundColor: '#2563eb',
                    transition: 'background-color 0.2s ease',
                    '&:hover': {
                        backgroundColor: '#1e40af'
                    },
                }}>Reset filters</Button>
            </Box>
        </Paper>
    </Box>
}