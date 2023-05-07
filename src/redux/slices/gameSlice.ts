import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FigureType } from "core/types";

type InitialType = {
    underCheck: boolean
    moveOrder: 'white' | 'black'
    duration: number
    activeFigure: null | FigureType
}
const initialState: InitialType = {
    underCheck: false,
    moveOrder: 'white',
    duration: 0,
    activeFigure: null,
}
export const gameSlice = createSlice({
    name: 'game',
    initialState: initialState,
    reducers: {
        activeateFigure(state: InitialType, action: PayloadAction<FigureType | null>) {
            state.activeFigure = action.payload
        },
        changeMoveOrder(state: InitialType) {
            state.moveOrder = state.moveOrder === 'white' ? 'black' : 'white'
        }
    }
})

export const { activeateFigure, changeMoveOrder } = gameSlice.actions

