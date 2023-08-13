import { createStore }  from 'redux'
import { useDispatch } from "react-redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from '@/redux/reducers'

export const store = createStore(reducers, composeWithDevTools());

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()