import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cell, defaultBoard, defaultFigures } from "core/board";
import { FigurePositionType } from "core/figures";
import { FigureType } from "core/types";

type InitialType = {
    figuresOnBoard: FigureType[];
    inactiveFigures: FigureType[];
    cells: Cell[][];
    lastMovedFigureId: string | null
};

export type ChangeFigureActionType = {
    from: FigurePositionType,
    to: FigurePositionType,
    id: string
}

const initialState: InitialType = {
    figuresOnBoard: defaultFigures('white').concat(defaultFigures('black')),
    inactiveFigures: [],
    cells: defaultBoard(),
    lastMovedFigureId: null
};

export const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        changeFigurePosition(state: InitialType, { payload: { id, from, to } }: PayloadAction<ChangeFigureActionType>) {
            state.figuresOnBoard = state.figuresOnBoard.map(figure => {
                if(figure.id === id) {
                    return {...figure, position: to}
                }else return figure
            });
            state.lastMovedFigureId = id
        },

        removeFigure(state: InitialType, action: PayloadAction<string>) {
            const figureToRemove = state.figuresOnBoard.find(f => f.id === action.payload)
            state.figuresOnBoard = state.figuresOnBoard.filter(figure => figure.id !== action.payload)
            state.inactiveFigures = figureToRemove ? [...state.inactiveFigures, figureToRemove] : state.inactiveFigures
        },
    },
});

export const { changeFigurePosition, removeFigure } = boardSlice.actions;

export const getFigureByPosition = (
    state: FigureType[],
    position: FigurePositionType
) =>
    state.find(
        (figure) =>
            figure.position.x === position.x && figure.position.y === position.y
    );
