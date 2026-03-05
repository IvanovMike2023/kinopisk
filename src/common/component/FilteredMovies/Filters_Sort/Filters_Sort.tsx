import * as React from 'react';
import Box from '@mui/material/Box';
import {Button, Paper, Typography, useTheme} from "@mui/material";
import {UI, RatingRangeSlider, SortingSelector} from "../../../UI_Filter/UI";
type Props={
    selectFilter:(value:string)=>void
}
export const Filters_Sort=({selectFilter}):Props=>{
    const [age, setAge] = React.useState('Popularity ↓');
    const [range, setRange] = React.useState([2.0, 8.0])
    const theme = useTheme();
    const handleChangeSlider = (event, newValue) => {
        setRange(newValue);
    };
    const handleChange = (event: string) => {
        setAge(event.target.value as string);
        selectFilter(event.target.value)
    };

    return  <Box    sx={{
        display: 'flex',
        gap: '36px',
        padding: '20px',
        '& > :not(style)': {
            m: 1,
            width: 290,
            height: 608,
        },
    }}>
    <Paper sx={{backgroundColor: theme.palette.background.default,paddingTop:'20px'}} variant="elevation">
        <Typography align="center" variant="h5" component="h2">
            Filters / Sort
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between" px={2} paddingTop={5}>
            <Typography  variant="subtitle2" component="h2">
                Filters / Sort
            </Typography>
 <SortingSelector value={age} handleChange={handleChange} />
        </Box>
            <RatingRangeSlider range={range} onChangeSlider={handleChangeSlider} />

        <Box display={'flex'} flexWrap="wrap" gap={1} padding={2} >
            <UI name={'Action'} />
            <UI name={'Adventure'} />
            <UI name={'Animation'}/>
            <UI name={'Comedy'}/>
            <UI name={'Crime'}/>
            <UI name={'Drama'}/>
            <UI name={'Documentary'}/>
            <UI name={'Family'} />
            <UI name={'Fantasy'}/>
            <UI name={'History'}/>
            <UI name={'Horror'}/>
            <UI name={'Music'}/>
            <UI name={'Mystery'}/>
            <UI name={'Romance'}/>
            <UI name={'Science Fiction'}/>
            <UI name={'TV Movie'}/>
            <UI name={'Thriller'}/>
            <UI name={'War'}/>
            <UI name={'Western'}/>
        </Box>
        <Box display={'flex'} justifyContent={'center'} paddingTop={3}>
        <Button     sx={{
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