import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import {useState} from "react";

export const MySnackbar = ({message,open}) => {
    const [openSnackbars, setOpenSnackbars] = useState(
       true
    );
    const handleClose = () => {

        setOpenSnackbars(prev=>false)
    };
    if (!message) return null;
    return (
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={openSnackbars}
                    autoHideDuration={3000}
                    onClose={ handleClose}
                >
                    <SnackbarContent
                        style={{ backgroundColor: '#f44336' }} // красный фон
                        message={
                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                <ErrorIcon style={{ marginRight: 8 }} />
                                {message}
                            </span>
                        }
                        action={
                            <IconButton
                                size="small"
                                aria-label="close"
                                color="inherit"
                                onClick={ handleClose}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        }
                    />
                </Snackbar>

    );
};