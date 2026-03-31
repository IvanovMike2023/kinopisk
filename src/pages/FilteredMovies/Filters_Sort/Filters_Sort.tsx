import * as React from 'react';
import {useEffect} from 'react';
import Box from '@mui/material/Box';
import {Button, Paper, Typography, useTheme} from "@mui/material";
import type { SelectChangeEvent } from '@mui/material/Select'
import {MyButton, RatingRangeSlider, SortingSelector} from "../../../shared/MyButton_Filter/MyButton";
import {useGetMovieListQuery} from "../../../app/api/mainPageApi";

type Props = {
    selectFilter: (value: string) => void
    resetFilter: (value: string) => void
    selectFilterSlider: (value: string) => void
    selectButtonFilter: (value: number,isClick:boolean) => void
    isresetFilter:boolean
}
export const Filters_Sort = ({isresetFilter,resetFilter,selectButtonFilter,selectFilterSlider, selectFilter}: Props) => {
    const {data}=useGetMovieListQuery()
        const MovieList=data?.genres || []

    const [age, setAge] = React.useState('popularity.desc');
    const [range, setRange] = React.useState<number[]>([0.0, 10.0])
    const theme = useTheme();
    const handleChangeSlider = (_event: Event, newValue: number | number[]) => {
        const rangeArray = newValue as number[];

        selectFilterSlider(rangeArray.join(','))
        setRange(rangeArray);
    };
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
        selectFilter(event.target.value)
    };

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
        <Paper sx={{ bgcolor: 'background.default', pt: 2 }} variant="elevation">
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
                {  MovieList.map((el)=>(
                   <MyButton key={el.id} isresetFilter={isresetFilter } name={el.name} id={el.id ?? 0} handlerButtonClick={selectButtonFilter}/>
                ))
                }
            </Box>
            <Box display={'flex'} justifyContent={'center'} paddingTop={3}>
                <Button sx={{
                    fontSize: 12,
                    bgcolor: theme.palette.secondary.main,
                    border: '1px solid #fff',
                    transition: 'background-color 0.2s ease',
                    '&:hover': {
                        backgroundColor: '#1e40af'
                    },
                }} onClick={() => resetFilter('')}>Reset filters</Button>
            </Box>
        </Paper>
    </Box>
}
