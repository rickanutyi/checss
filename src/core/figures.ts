import WhiteQueen from 'assets/figures/white/queen.png'
import WhiteKing from 'assets/figures/white/king.png'
import WhitePawn from 'assets/figures/white/pawn.png'
import WhiteRook from 'assets/figures/white/rook.png'
import WhiteKnight from 'assets/figures/white/knight.png'
import WhiteBishop from 'assets/figures/white/bishop.png'

import BlackQueen from 'assets/figures/black/queen.png'
import BlackKing from 'assets/figures/black/king.png'
import BlackPawn from 'assets/figures/black/pawn.png'
import BlackRook from 'assets/figures/black/rook.png'
import BlackKnight from 'assets/figures/black/knight.png'
import BlackBishop from 'assets/figures/black/bishop.png'

import { DefaultFigureType, Expand, FigureColor, FigureNamesType, FigureType } from './types'
import { X, Y } from './board'

export type FigurePositionType = { x: X, y: Y }
type ImagesType = {
    white: Record<FigureNamesType, any>
    black: Record<FigureNamesType, any>
}

const figureImages: ImagesType = {
    white: {
        pawn: WhitePawn,
        queen: WhiteQueen,
        king: WhiteKing,
        bishop: WhiteBishop,
        rook: WhiteRook,
        knight: WhiteKnight
    },
    black: {
        pawn: BlackPawn,
        queen: BlackQueen,
        king: BlackKing,
        bishop: BlackBishop,
        rook: BlackRook,
        knight: BlackKnight
    }
}

type CreateFigurePropsType = {
    name: FigureNamesType
    position: FigurePositionType
    color: FigureColor
    id: string
}

type CreateFigureType = (props: CreateFigurePropsType) => FigureType



export const createFigure: CreateFigureType = ({ name, position, color, id }) => {
    let image = figureImages[color][name]
    return {
        name: name,
        position: position,
        id: id,
        focused: false,
        can_moove: true,
        under_check: false,
        img: image,
        status: 'active',
        player: color
    }
}

export const baseFigures: DefaultFigureType[] = [
    {
        name: 'pawn',
        position: null,
        id: null,
        focused: false,
        can_moove: true,
        under_check: false,
        img: null,
        status: null,
        player: 'white'
    },

    {
        name: 'rook',
        position: null,
        id: null,
        focused: false,
        can_moove: true,
        under_check: false,
        img: null,
        status: null,
        player: 'white'
    },

    {
        name: 'knight',
        position: null,
        id: null,
        focused: false,
        can_moove: true,
        under_check: false,
        img: null,
        status: null,
        player: 'white'
    },

    {
        name: 'bishop',
        position: null,
        id: null,
        focused: false,
        can_moove: true,
        under_check: false,
        img: null,
        status: null,
        player: 'white'
    },

    {
        name: 'king',
        position: null,
        id: null,
        focused: false,
        can_moove: true,
        under_check: false,
        img: null,
        status: null,
        player: 'white'
    },

    {
        name: 'queen',
        position: null,
        id: null,
        focused: false,
        can_moove: true,
        under_check: false,
        img: null,
        status: null,
        player: 'white'
    }
]