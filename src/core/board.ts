import { createFigure, FigurePositionType } from "./figures";
import { Expand, FigureColor, FigureNamesType, FigureType } from "./types";

export type X = "a"| "b"| "c"| "d"| "e"| "f"| "g"| "h"
export type Y = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export interface Cell {
    status: CellStatuses;
    figureId: string | null;
    id: string;
    focused: boolean;
    coords: FigurePositionType
}

export interface Board {
    cells: Cell[];
}
type CellStatuses = "has-figure" | "empty";


export const x: X[] = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const y: Y[] = [1, 2, 3, 4, 5, 6, 7, 8];

const isYdefaultPosition = (y: Y) => y === 1 || y === 2 || y === 7 || y === 8
const isXdefaultPosition = (x: X) => x === 'a' || x === 'b' || x === 'g' || x === 'h'

const canHaveDefaultFigure = (x: X, y: Y) => {
    return isYdefaultPosition(y)
};

const getFiguresColor = (y: Y): FigureColor => y < 3 ? 'white' : 'black'

const getDefaultFigurePosition = (color: FigureColor, name: FigureNamesType) => {

}

const whiteFigureDefaultPosition: Array<[X, Y]> = [
    ['a', 1], ['b', 1], ['c', 1], ['d', 1], ['e', 1], ['f', 1], ['g', 1], ['h', 1],
    ['a', 2], ['b', 2], ['c', 2], ['d', 2], ['e', 2], ['f', 2], ['g', 2], ['h', 2],
]

const blackFigureDefaultPosition: Array<[X, Y]> = [
    ['a', 7], ['b', 7], ['c', 7], ['d', 7], ['e', 7], ['f', 7], ['g', 7], ['h', 7],
    ['a', 8], ['b', 8], ['c', 8], ['d', 8], ['e', 8], ['f', 8], ['g', 8], ['h', 8],
]

export const figureDefaultPosition = {
    black: blackFigureDefaultPosition,
    white: whiteFigureDefaultPosition
}

const getDefaultFigureName = (x: X, y: Y): FigureNamesType => {
    if(y === 2 || y === 7) return 'pawn'
    if(y === 1 || y === 8) {
        if(y === 1 && x === 'd') return 'queen';
        if(y === 1 && x === 'e') return 'king'
        if(y === 8 && x === 'd') return 'king';
        if(y === 8 && x === 'e') return 'queen'
        switch(x) {
            case 'a':
                return 'rook';
            case 'b':
                return 'knight';
            case 'c':
                return 'bishop';
            case 'f':
                return 'bishop';
            case 'g':
                return 'knight';
            case 'h':
                return 'rook'
        }
    }
    return 'pawn'
}

export const defaultBoard = (): Cell[][] => y
    .map((k) => {
        return x
            .map((c) => {
                
                const cell: Cell = {
                    id: `${c}${k}`,
                    status: canHaveDefaultFigure(c, k)
                        ? "has-figure"
                        : "empty",
                    figureId: null,
                    focused: false,
                    coords: {
                        x: c,
                        y: k
                    }
                };
                return cell;
            });
});

export const defaultFigures = (color: FigureColor): FigureType[] => {

    return figureDefaultPosition[color].map((coord) => {
        return createFigure({
            color: color,
            id: `${coord[0]}${coord[1]}`,
            name: getDefaultFigureName(coord[0], coord[1]),
            position: { x: coord[0], y: coord[1] }
        })
    })
}