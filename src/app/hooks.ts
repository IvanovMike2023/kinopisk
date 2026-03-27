// src/app/hooks.ts
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// типизированный useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

// типизированный useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector