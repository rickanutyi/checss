import { AnyAction, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector as ReduxSelector, useDispatch as ReduxDispatch } from "react-redux";
import { boardSlice } from "./slices/boardSlice";
import { cellsSlice } from "./slices/cellsSlice";
import { gameSlice } from "./slices/gameSlice";

export const store = configureStore({
    reducer: {
        cells: cellsSlice.reducer,
        game: gameSlice.reducer,
        board: boardSlice.reducer
    }
});

type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const useSelector: TypedUseSelectorHook<RootState> = ReduxSelector
export const useDispatch = () => ReduxDispatch<AppThunkDispatch>();