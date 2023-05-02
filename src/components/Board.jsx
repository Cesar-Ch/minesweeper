import { useState, useEffect } from "react";
import { randomBoard } from "../logics/randomBoard";
import { CheckNumber } from '../logics/checkNumber';
import { DiscoverCells } from "../logics/discoverCells"
import { level, numbers } from "../logics/constants";
import { WinnerModal } from "./WinnerModal";
import { LoserModal } from "./LoserModal";
import Selection from "./Selection";

export function Board({ selectedValue }) {

    const [board, setBoard] = useState([])
    const [isSelected, setIsSelected] = useState([])
    const [winner, setWinner] = useState(false)
    const [loser, setLoser] = useState(false)
    const [isFirstSelectionZero, setIsFirstSelectionZero] = useState(false)
    const [clientX, setClientX] = useState(0)
    const [clientY, setClientY] = useState(0)
    const [selectedItem, setSelectedItem] = useState(false)
    const [viewItem, setViewItem] = useState(false)
    const [markMine, setMarkMine] = useState(false)
    const [indice, setIndice] = useState(0)
    const [indiceFila, setIndiceFila] = useState(0)
    console.log(board)
    console.log(isSelected)
    console.log(markMine)
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
        evenShow: ' font-extrabold  flex justify-center items-center ',
        evenHidden: `flex justify-center font-extrabold items-center  cursor-pointer w-[calc(100%/${level[selectedValue].col})] h-[calc(100%/${level[selectedValue].row})] `
    }

    function checkWin(isSelected) {
        let i = 0
        let win = false
        let lose = false
        isSelected.map((row) =>
            row.map((cell) => {
                if (cell !== '💣' && cell !== null&& cell !== '🚩') {
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

    function updateBoard(index, i, clX, clY) {

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
                DiscoverCells([index, i], board, isSelected)
                setIsFirstSelectionZero(true)
            }
        }

        setIndice(index)
        setIndiceFila(i)

        if (isFirstSelectionZero) {
            setSelectedItem(true)
            setClientY(clY - 65)
            setClientX(clX - 80)
        }


    }

    useEffect(() => {
        const newIsSelected = [...isSelected]
        if (viewItem === true) {
            if (board[indice][indiceFila] === 0) {
                DiscoverCells([indice, indiceFila], board, isSelected)

            } else {
                isSelected[indice][indiceFila] = board[indice][indiceFila]
            }
            setViewItem(false)
            setIsSelected(newIsSelected)
        }

        if (markMine === true) {
            if(isSelected[indice][indiceFila] === '🚩'){
                console.log('here')
                const newIsSelectedMine = [...isSelected]
                newIsSelectedMine[indice][indiceFila] = null
                setIsSelected(newIsSelectedMine)
            }else{
                const newIsSelectedMine = [...isSelected]
                newIsSelectedMine[indice][indiceFila] = '🚩'
                setIsSelected(newIsSelectedMine)
            }

            setMarkMine(false)
        }
        const [newWin, newLose] = checkWin(newIsSelected)
        setWinner(newWin)
        setLoser(newLose)
        setSelectedItem(false)
    }, [viewItem, markMine])


    return (
        <div className='flex flex-wrap justify-center items-center  border-green-500 border-4 rounded-md w-[90%] h-[90%] sm:w-[70%] md:w-[55%]  lg:w-[35%] text-center ' >
            {
                selectedItem && (
                    <div className="absolute flex items-center p-[10px]" style={{ top: clientY + 'px', left: clientX + 'px' }}>
                        <Selection setViewItem={setViewItem} setMarkMine={setMarkMine} setSelectedItem={setSelectedItem} />
                    </div>

                )
            }

            {
                isSelected.map((elem, index) => (

                    elem.map((j, i) => {
                        return (j >= 0 || j === '💣') && j !== null
                            ? (

                                <div key={i} className={(i + index) % 2 === 0 ? `bg-[#E5C29F] ${styles.evenShow}` : `bg-[#D7B899] ${styles.evenShow}`}
                                    onClick={() => updateBoard(index, i)} style={{ width: `calc(100%/${level[selectedValue].col})`, height: `calc(100%/${level[selectedValue].row})` }}>

                                    <p className={numbers[j] ? numbers[j] : 'text-black'}>{j}</p>
                                </div>
                            )

                            :
                            (
                                <div key={i} className={(i + index) % 2 === 0 ? `bg-green-400  ${styles.evenHidden}` : `bg-green-500   ${styles.evenHidden}`}
                                    onClick={(e) => updateBoard(index, i, e.clientX, e.clientY)} style={{ width: `calc(100%/${level[selectedValue].col})`, height: `calc(100%/${level[selectedValue].row})` }}>

                                    {
                                        j === '🚩' ? <p>🚩</p> : <p></p>
                                    }

                                </div>
                            )
                    }

                    )
                ))
            }
            <div>
                {
                    winner ? (<div>
                        <WinnerModal />
                    </div>) : ''
                }
                {
                    loser ? <LoserModal /> : ''
                }
            </div>
        </div >
    )
}