import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector, useStore } from "react-redux";
import { store } from '../store'
type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
type AppStore = typeof store.getState
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const sessionUser = useAppSelector((state) => state.session.user)
