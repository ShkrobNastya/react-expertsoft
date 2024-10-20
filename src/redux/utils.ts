import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState } from './Store';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<ThunkAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;