import { X, Y } from "./board"

export type Expand<T, K> = T | K
export type RemoveUnion<T, K> = T extends K ? never : T

//!'

export type FigureNamesType = 'pawn' | 'king' | 'queen' | 'rook' | 'knight' | 'bishop'
export type FigureColor = 'white' | 'black'
type FigureStatus = 'active' | 'inactive'
export interface FigureType {
    name: FigureNamesType
    position: { x: X, y: Y }
    id: string
    focused: boolean
    can_moove: boolean
    under_check: boolean 
    img: any
    status: FigureStatus
    player: 'white' | 'black'
}

export type DefaultFigureType = {
    name: FigureNamesType
    position: null
    id: null
    focused: boolean
    can_moove: boolean
    under_check: boolean 
    img: null
    status: null
    player: 'white' | 'black'
}
