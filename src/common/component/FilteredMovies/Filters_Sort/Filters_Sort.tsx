import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select  from '@mui/material/Select';
import {Paper, Typography, useTheme} from "@mui/material";

export const Filters_Sort=()=>{
    const [age, setAge] = React.useState('Popularity ↓');
    const theme = useTheme();

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
    </Paper>
</Box>
}