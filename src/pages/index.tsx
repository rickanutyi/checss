import styled from "@emotion/styled";
import Figure from "components/Figure/Figure";
import Logo from "components/Logo/Logo";
import config from "config";
import { useSelector } from "redux/store";

const HomeT = styled("div")({
    width: "100vw",
    height: "100vh",
    backgroundColor: config.colors.dark_500,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
});

const BoardRow = styled('div')({
    display: 'flex'
})
const Board = styled("div")({
    maxWidth: 800,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    
});



const Home = () => {
    const { cells: board } = useSelector(state => state.cells)

    return (
        <HomeT>
            {/* <Logo /> */}
            <Board>
                {board.map((cells, i) => {
                    return (
                        <BoardRow
                            key={i}
                        >
                            {cells.map((cell, k) => (
                                <Figure
                                    cell={cell}
                                    color={(i + k) % 2 === 0 ? "black" : "white"}
                                    key={cell.id}
                                />
                            ))}
                        </BoardRow>
                    )
                })}
            </Board>
        </HomeT>
    );
};

export default Home;
