import { useDispatch, useSelector } from 'react-redux';
import {MySnackbar} from "../MySnackbar/MySnackbar";
import {hideError} from "../../../app/snackSlice";


export const GlobalSnackbar = () => {
    const dispatch = useDispatch();
    const { open, message } = useSelector(state => state.snackSlice);

    return (
        <MySnackbar
            open={open}
            message={message}
            onClose={() => dispatch(hideError())}
        />
    );
};