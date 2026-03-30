import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'  // <-- только тип

// Тип состояния
interface SnackState {
    open: boolean
    message: string
}
// Начальное значение
const initialState: SnackState = {
    open: false,
    message: ''
}


const snackSlice = createSlice({
    name: 'snackSlice',
    initialState,
    reducers: {
        showError: (state, action: PayloadAction<string>) => {
            state.open = true
            state.message = action.payload
        },
        hideError: (state) => {
            state.open = false
            state.message = ''
        },
    },
})

export const { showError, hideError } = snackSlice.actions
export const SnackReducer = snackSlice.reducer

const snackSlice = createSlice({
    name: 'snackSlice',
    initialState,
 ad
        },
        hideError: (state) => {
            state.open = false

        },
    },
})