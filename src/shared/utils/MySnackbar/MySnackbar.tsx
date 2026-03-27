import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import {useState} from "react";
type MySnackbarProps = {
    open: boolean
    message: string
    onClose?: () => void   // <-- добавляем
}
export const MySnackbar = ({message,open,onClose}:MySnackbarProps) => {
    const [openSnackbars, setOpenSnackbars] = useState(
       true
    );
    const handleClose = () => {
        setOpenSnackbars(false)
        if (onClose) onClose()
    };
    if (!open) return null;
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