import {
    ChangeFigureActionType,
    changeFigurePosition,
    removeFigure,
} from "redux/slices/boardSlice";
import { reverseBoard } from "redux/slices/cellsSlice";
import { activeateFigure, changeMoveOrder } from "redux/slices/gameSlice";
import { AppThunkDispatch } from "redux/store";

export const changeFigurePositionMdw =
    ({ from, id, to }: ChangeFigureActionType) =>
    (dispatch: AppThunkDispatch) => {
        dispatch(changeFigurePosition({ from, id, to }));
        dispatch(activeateFigure(null));
        dispatch(changeMoveOrder());
        setTimeout(() => {
            dispatch(reverseBoard());
        }, 700)
    };

export const removeFigureMdw =
    ({
        movingFigure,
        removingFigureId,
    }: {
        movingFigure: ChangeFigureActionType;
        removingFigureId: string;
    }) =>
    (dispatch: AppThunkDispatch) => {
        dispatch(removeFigure(removingFigureId));
        dispatch(changeFigurePosition({ ...movingFigure }));
        dispatch(activeateFigure(null));
        dispatch(changeMoveOrder());
        setTimeout(() => {
            dispatch(reverseBoard());
        }, 700)
    };
