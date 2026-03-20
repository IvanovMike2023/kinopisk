import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Snackbar} from "@mui/material";


export const MySnackbar = ({message}) => {
    const [state, setState] = React.useState({
        open: true,
        vertical: 'top',
        horizontal: 'right',
    });
    console.log(message)
    const {vertical, horizontal, open} = state;

    const handleClick = (newState) => () => {
        setState({...newState, open: true});
    };

    const handleClose = () => {
        setState({...state, open: false});
    };

    return (
        <Box sx={{width: 500}}>xxxxxxxxxxxxxxxxxxxxxxx
            <Snackbar
                anchorOrigin={{vertical, horizontal}}
                open={open}
                onClose={handleClose}
                message={message}
                key={vertical + horizontal}
            />
        </Box>
    );
}
