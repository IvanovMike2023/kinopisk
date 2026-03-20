import { createSlice } from '@reduxjs/toolkit'

// Начальное значение
const initialState = {
    open: false,
    message:''
}

const snackSlice = createSlice({
    name: 'snackSlice',
    initialState,
    reducers: {
        showError: (state,action) => {
            state.open=true,
                state.message=action.payload
        },
        hideError: (state,action) => {
            state.open=false,
                state.message=''
        },
    },
})
export const {showError,hideError}=snackSlice.actions
export const SnackReducer= snackSlice.reducer