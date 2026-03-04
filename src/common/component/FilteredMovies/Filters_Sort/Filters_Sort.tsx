import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select  from '@mui/material/Select';
import {Paper, Slider, Typography, useTheme} from "@mui/material";

export const Filters_Sort=()=>{
    const [age, setAge] = React.useState('Popularity ↓');
    const [range, setRange] = React.useState([2.0, 8.0])
    const theme = useTheme();
    const handleChangeSlider = (event, newValue) => {
        setRange(newValue);
    };
    const handleChange = (event: string) => {
        console.log(event.target.value)
        setAge(event.target.value as string);
    };

    return  <Box    sx={{
        display: 'flex',
        gap: '36px',
        padding: '20px',
        '& > :not(style)': {
            m: 1,
            width: 290,
            height: 628,
        },
    }}>
    <Paper sx={{backgroundColor: theme.palette.background.default,paddingTop:'20px'}} variant="elevation">
        <Typography align="center" variant="h5" component="h2">
            Filters / Sort
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between" px={2}>
            <Typography  variant="subtitle2" component="h2">
                Filters / Sort
            </Typography>
        <FormControl sx={{ width: 200}} >
            <Select sx={{height:35,}}
                value={age}
                    defaultValue="someValue"
                onChange={handleChange}
                    MenuProps={{
                        PaperProps: {
                            style: { backgroundColor: theme.palette.background.default }, // цвет фона меню
                        },
                    }}
            >
                <MenuItem  value={'Popularity ↓'}>Popularity ↓</MenuItem>
                <MenuItem value={'Popularity ↑'}>Popularity ↑</MenuItem>
                <MenuItem value={'Rating ↓'}>Rating ↓</MenuItem>
                <MenuItem value={'Rating ↑'}>Rating ↑</MenuItem>
                <MenuItem value={'Release Date ↓'}>Release Date ↓</MenuItem>
                <MenuItem value={'Release Date ↑'}>Release Date ↑</MenuItem>
                <MenuItem value={'Title A-Z'}>Title A-Z</MenuItem>
                <MenuItem value={'Thirty'}>Thirty</MenuItem>
                <MenuItem value={'Title Z-A'}>Title Z-A</MenuItem>
            </Select>
        </FormControl>
        </Box>
        <Box sx={{ width: '100%', maxWidth: 250, padding: 2, borderRadius: 2 }}>
            {/* Заголовок и диапазон */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                    Rating Range
                </Typography>
                <Typography variant="subtitle1" sx={{ color: theme.palette.text.primary }}>
                    {range[0].toFixed(1)} - {range[1].toFixed(1)}
                </Typography>
            </Box>
            {/* Двойной слайдер */}
            <Slider
                value={range}
                onChange={handleChangeSlider}
                min={0.0}
                max={10.0}
                step={0.1}
                valueLabelDisplay="off"
                disableSwap // чтобы избежать пересечения ползунков (можно убрать, если хотите)
                sx={{
                    width: '100%',
                    color: 'blue', // цвет слайдера
                    '& .MuiSlider-thumb': {
                        backgroundColor: 'blue',
                        border: '2px solid blue',
                    },
                    '& .MuiSlider-track': {
                        height: 4,
                        backgroundColor: 'blue', // цвет полосы
                    },
                    '& .MuiSlider-rail': {
                        height: 4,
                        backgroundColor: '#ccc',
                    },
                }}
            />
        </Box>
    </Paper>
</Box>
}