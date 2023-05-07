import { store } from "redux/store";
import { Cell, figureDefaultPosition, x, X, y, Y } from "./board";
import { FigurePositionType } from "./figures";
import { FigureColor, FigureNamesType } from "./types";
import { getFigureByPosition } from "redux/slices/boardSlice";
type MoveProps = {
    figure: FigureNamesType;
    intitialPosition: number;
    movePosition: number;
};

// export const check

type CheckCanMoveProps = {
    currentFigurePosition: FigurePositionType;
    movePosition: FigurePositionType;
    figureName: FigureNamesType;
    color: FigureColor;
};

const positions = {};

const isFirstPawnMove = (color: FigureColor, currX: X, currY: Y) => {
    return figureDefaultPosition[color].find(
        (pos) => pos.includes(currX) && pos.includes(currY)
    );
};

const getCellsBetween = ({
    currX,
    moveX,
    currY,
    moveY,
} : {
    currX: X;
    moveX: X;
    currY: Y;
    moveY: Y;
}) => {
    const cells = store.getState().cells.cells;
    let cellsBetween: Cell[];
    if(moveY > currY) {
        cellsBetween = cells.filter(cellArray => {
            return cellArray.find(cell => cell.coords.y < moveY)
        }).map((cellArray) => cellArray[0])
    }
}

const checkIfPawnCanMove = ({
    currX,
    moveX,
    currY,
    moveY,
    color,
}: {
    currX: X;
    moveX: X;
    currY: Y;
    moveY: Y;
    color: FigureColor;
}) => {
    const hasFigureOnMovePosisition = getFigureByPosition(
        store.getState().board.figuresOnBoard,
        { x: moveX, y: moveY }
    );
    if (isFirstPawnMove(color, currX, currY)) {
        if (currX === moveX) {
            if (color === "white") {
                return (
                    Boolean(moveY - currY >= 1 && moveY - currY <= 2) &&
                    !hasFigureOnMovePosisition
                );
            } else {
                return (
                    Boolean(currY - moveY >= 1 && currY - moveY <= 2) &&
                    !hasFigureOnMovePosisition
                );
            }
        } else {
            if (currX === moveX) return false;
            return !!hasFigureOnMovePosisition;
        }
    } else {
        if (currX === moveX) {
            if (color === "white") {
                return (
                    Boolean(moveY - currY === 1) && !hasFigureOnMovePosisition
                );
            } else {
                return (
                    Boolean(currY - moveY === 1) && !hasFigureOnMovePosisition
                );
            }
        } else {
            if (currX === moveX) return false;
            return !!hasFigureOnMovePosisition;
        }
    }
};

const checkIfKnightCanMoove = ({
    currX,
    moveX,
    currY,
    moveY,
    color,
}: {
    currX: X;
    moveX: X;
    currY: Y;
    moveY: Y;
    color: FigureColor;
}) => {
    const xIndex = x.indexOf(currX);

    if (moveX === x[xIndex - 1] || moveX === x[xIndex + 1]) {
        if (moveY === currY + 2 || moveY === currY - 2) {
            return true;
        } else return false;
    } else if (moveX === x[xIndex - 2] || moveX === x[xIndex + 2]) {
        if (moveY === currY + 1 || moveY === currY - 1) {
            return true;
        } else return false;
    }
};

export const canFigureMoveToCell = ({
    currentFigurePosition,
    figureName,
    movePosition,
    color,
}: CheckCanMoveProps) => {
    console.log(store.getState().cells)
    switch (figureName) {
        case "pawn":
            return checkIfPawnCanMove({
                color,
                currX: currentFigurePosition.x,
                currY: currentFigurePosition.y,
                moveX: movePosition.x,
                moveY: movePosition.y,
            });
        case "knight":
            return checkIfKnightCanMoove({
                color,
                currX: currentFigurePosition.x,
                currY: currentFigurePosition.y,
                moveX: movePosition.x,
                moveY: movePosition.y,
            });
    }
    return false;
};

export function move({ figure, intitialPosition, movePosition }: MoveProps) {}
