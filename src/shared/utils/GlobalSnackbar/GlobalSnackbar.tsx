import {MySnackbar} from "../MySnackbar/MySnackbar";
import {hideError} from "../../../app/snackSlice";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";


export const GlobalSnackbar = () => {
    const dispatch = useAppDispatch();
    const { open, message } = useAppSelector(state => state.snackSlice);

    return (
        <MySnackbar
            open={open}
            message={message}
            onClose={() => dispatch(hideError())}
        />
    );
};