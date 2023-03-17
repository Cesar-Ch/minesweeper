import { useState, useEffect } from "react";
import { randomBoard } from "../logics/randomBoard";
import { CheckNumber } from '../logics/checkNumber';
import { DiscoverCells } from "../logics/discoverCells"
import { level, numbers } from "../logics/constants";
import { WinnerModal } from "./WinnerModal";
import { LoserModal } from "./LoserModal";

export function Board({ selectedValue }) {

    const [board, setBoard] = useState([])
    const [isSelected, setIsSelected] = useState([])
    const [winner, setWinner] = useState(false)
    const [loser, setLoser] = useState(false)
    const [isFirstSelectionZero, setIsFirstSelectionZero] = useState(false)
    useEffect(() => {
        if (selectedValue === 'Easy') {
            initializeBoard(12, 6, 10);
        }
        if (selectedValue === 'Medium') {
            initializeBoard(19, 10, 35);
        }
        if (selectedValue === 'Hard') {
            initializeBoard(26, 14, 75);
        }
        setIsFirstSelectionZero(false)
    }, [selectedValue]);

    function initializeBoard(rows, cols, mines) {
        const newBoard = CheckNumber(randomBoard(rows, cols, mines))
        const newIsSelected = randomBoard(rows, cols, 0)
        setBoard(newBoard)
        setIsSelected(newIsSelected)
    }

    function firstSelectionZero(rows, cols, mines, index, i) {
        let newBoard = CheckNumber(randomBoard(rows, cols, mines))
        while (newBoard[index][i] !== 0) {
            newBoard = CheckNumber(randomBoard(rows, cols, mines))
        }
        setBoard(newBoard)

        const newIsSelected = [...isSelected]
        if (newBoard[index][i] === 0) {
            DiscoverCells([index, i], newBoard, newIsSelected)

        } else {
            newIsSelected[index][i] = newBoard[index][i]
        }
        setIsSelected(newIsSelected)

    }

    const styles = {
        evenShow: ' font-extrabold cursor-pointer flex justify-center items-center ',
        evenHidden: `flex justify-center font-extrabold cursor-pointer w-[calc(100%/${level[selectedValue].col})] h-[calc(100%/${level[selectedValue].row})] `
    }

    function checkWin(isSelected) {
        let i = 0
        let win = false
        let lose = false
        isSelected.map((row) =>
            row.map((cell) => {
                if (cell !== '💣' && cell !== null) {
                    i++
                }
                if (cell === "💣") {
                    lose = true
                }

            }))

        if (i === level[selectedValue].row * level[selectedValue].col - level[selectedValue].mines) {
            win = true
        }
        return [win, lose]
    }

    function updateBoard(index, i) {

        if (!isFirstSelectionZero) {
            if (board[index][i] !== 0) {
                if (selectedValue === 'Easy') {
                    firstSelectionZero(12, 6, 10, index, i);
                }
                if (selectedValue === 'Medium') {
                    firstSelectionZero(19, 10, 35, index, i);
                }
                if (selectedValue === 'Hard') {
                    firstSelectionZero(26, 14, 75, index, i);
                }
                setIsFirstSelectionZero(true)
                return
            } else {
                setIsFirstSelectionZero(true)
            }
        }

        const newIsSelected = [...isSelected]
        if (board[index][i] === 0) {
            DiscoverCells([index, i], board, newIsSelected)

        } else {
            newIsSelected[index][i] = board[index][i]
        }
        setIsSelected(newIsSelected)
        const [newWin, newLose] = checkWin(newIsSelected)
        setWinner(newWin)
        setLoser(newLose)
    }
    console.log(board)
    return (
        <div className='flex flex-wrap justify-center items-center  border-green-500 border-4 rounded-md w-[90%] h-[90%] sm:w-[70%] md:w-[55%]  lg:w-[35%] text-center ' >
            {
                isSelected.map((elem, index) => (
                    elem.map((e, i) => {
                        return (e >= 0 || e === '💣') && e !== null
                            ? (
                                <div key={i} className={(i + index) % 2 === 0 ? `bg-[#E5C29F] ${styles.evenShow}` : `bg-[#D7B899] ${styles.evenShow}`}
                                    onClick={() => updateBoard(index, i)} style={{ width: `calc(100%/${level[selectedValue].col})`, height: `calc(100%/${level[selectedValue].row})` }}>
                                    <p className={numbers[e] ? numbers[e] : 'text-black'}>{e}</p>
                                </div>
                            )
                            :
                            (
                                <div key={i} className={(i + index) % 2 === 0 ? `bg-green-400  ${styles.evenHidden}` : `bg-green-500   ${styles.evenHidden}`}
                                    onClick={() => updateBoard(index, i)} style={{ width: `calc(100%/${level[selectedValue].col})`, height: `calc(100%/${level[selectedValue].row})` }}>

                                </div>
                            )
                    }

                    )
                ))
            }
            <div>
                {
                    winner ? ( <div>
                        <WinnerModal />
                    </div> ) : ''
                }
                {
                    loser ? <LoserModal /> : ''
                }
            </div>
        </div >
    )
}