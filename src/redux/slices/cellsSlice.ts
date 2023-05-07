import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cell, defaultBoard } from "core/board";
import { FigurePositionType } from "core/figures";
import { FigureNamesType, FigureType } from "core/types";

type CellsType = Cell[][]
type InitialType = {
    cells: CellsType
}
type FocusActionPayload = {
    figureId: string,
    figureName: FigureNamesType,
    figurePosition: FigurePositionType
}

const initial: InitialType = {
    cells: defaultBoard().reverse()
}


export const cellsSlice = createSlice({
    initialState: initial,
    name: 'cells',
    reducers: {
        focusFigure(state: InitialType, action: PayloadAction<FocusActionPayload>) {
            // state.cells = focusNewFigure(state.cells, action.payload.figureId)
        },

        reverseBoard(state: InitialType) {
            state.cells = state.cells.reverse()
        }
    }
})

export const { focusFigure, reverseBoard } = cellsSlice.actions