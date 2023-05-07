import styled from "@emotion/styled";
import { Cell } from "core/board";
import { canFigureMoveToCell } from "core/figureMovement";
import { FigureColor } from "core/types";
import { changeFigurePositionMdw, removeFigureMdw } from "redux/middleware/figureMoveMdw";
import { getFigureByPosition } from "redux/slices/boardSlice";
import { activeateFigure } from "redux/slices/gameSlice";
import { useDispatch, useSelector } from "redux/store";

type FigureWrapperProps = {
    color: FigureColor;
    focused: boolean;
    hasfigure: boolean;
    isLastMovedFigure: boolean
};

interface FigureProps extends Partial<FigureWrapperProps> {
    cell: Cell;
}

const FigureWrapper = styled("div")<FigureWrapperProps>(
    {
        width: 80,
        height: 80,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    (props) => ({
        backgroundColor: (props.focused || props.isLastMovedFigure) ? '#ffcd00' :
            props.color === "black" ? "rgba(0,0,0,0.3)" : "rgba(200,200,200,1)" ,
        // border: props.focused ? "3px solid green" : "3px solid transparent",
        "&:hover": {
            // backgroundColor: props.hasfigure ? "red" : "",
        },
    })
);

const Image = styled("img")({
    height: 50,
    objectFit: "contain",
    cursor: "pointer",
});

const hasFigure = {
    "has-figure": true,
    empty: false,
};

const Figure = ({ color = "black", cell }: FigureProps) => {
    const dispatch = useDispatch();
    const figuresOnBoard = useSelector((state) => state.board.figuresOnBoard);
    const lastMovedFigureId = useSelector(state => state.board.lastMovedFigureId)
    const {
        game: { activeFigure, moveOrder },
    } = useSelector((state) => state);

    const figure = getFigureByPosition(figuresOnBoard, cell.coords);

    const onFocus = () => {
        if (figure) {
            if (moveOrder !== figure.player) return alert("Не твой ход");
            dispatch(activeateFigure(figure));
        }
    };

    const clikcToCell = () => {
        if (
            figure &&
            activeFigure &&
            figure.id !== activeFigure.id &&
            figure.player !== moveOrder &&
            canFigureMoveToCell({
                currentFigurePosition: activeFigure.position,
                figureName: activeFigure.name,
                movePosition: cell.coords,
                color: activeFigure.player
            })
        ) {
            dispatch(removeFigureMdw({
                movingFigure: { from: activeFigure.position, to: cell.coords, id: activeFigure.id },
                removingFigureId: figure.id
            }))
            return;
        }
        if (figure) onFocus();
        if (
            !figure &&
            activeFigure &&
            canFigureMoveToCell({
                currentFigurePosition: activeFigure.position,
                figureName: activeFigure.name,
                movePosition: cell.coords,
                color: activeFigure.player
            })
        ) {
            dispatch(
                changeFigurePositionMdw({
                    id: activeFigure.id,
                    from: activeFigure.position,
                    to: cell.coords,
                })
            );
        }
        // if(activeFigure && moveOrder === )
    };

    return (
        <FigureWrapper
            color={color}
            focused={activeFigure?.id === figure?.id && !!figure}
            hasfigure={hasFigure[cell.status]}
            onClick={clikcToCell}
            isLastMovedFigure={(lastMovedFigureId === figure?.id && lastMovedFigureId !== null)}
            // onDragEnterCapture={() => alert(figure?.id)}
        >
            {cell.coords.x}
            {cell.coords.y}
            {figure ? (
                <>
                    <Image draggable src={figure.img} alt="" />
                </>
            ) : null}
        </FigureWrapper>
    );
};

export default Figure;
