import { useState, useEffect } from 'react'
import { randomBoard } from '../logics/randomBoard'
import { CheckNumber } from '../logics/checkNumber'
import { DiscoverCells } from '../logics/discoverCells'
import { level, numbers } from '../logics/constants'
import { WinnerModal } from './WinnerModal'
import { LoserModal } from './LoserModal'
import Selection from './Selection'
import { checkWin, initializeBoard } from '../logics/board'
import { saveGameToStorage } from '../logics/storage'
import { BombIcon } from './icons/BombIcon'
import { FlagIcon } from './icons/FlagIcon'

export function Board({ selectedValue, setMarkedFlags, markedFlags, user, time }) {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return []
  })
  const [isDiscovered, setIsDiscovered] = useState(() => {
    const isDiscoveredFromStorage = window.localStorage.getItem('isDiscovered')
    if (isDiscoveredFromStorage) return JSON.parse(isDiscoveredFromStorage)
    return []
  })
  const [winner, setWinner] = useState(false)
  const [loser, setLoser] = useState(false)
  const [isFirstSelectionZero, setIsFirstSelectionZero] = useState(() => {
    const isFirstSelectionZeroFromStorage = window.localStorage.getItem('isFirstSelectionZero')
    if (isFirstSelectionZeroFromStorage === 'true') return true
    return false
  })
  const [clientX, setClientX] = useState(0)
  const [clientY, setClientY] = useState(0)
  const [selectedItem, setSelectedItem] = useState(false)
  const [viewItem, setViewItem] = useState(false)
  const [markMine, setMarkMine] = useState(false)
  const [rowIndex, setRowIndex] = useState(0)
  const [columnIndex, setColumnIndex] = useState(0)
  const [newSelectedValue, setNewSelectedValue] = useState(() => {
    const selectedValueFromStorage = window.localStorage.getItem('selectedValue')
    if (selectedValueFromStorage) return selectedValueFromStorage
    return 'NotLevel'
  }
  )

  // Seleccionar el nivel
  useEffect(() => {

    if (newSelectedValue === 'NotLevel') {
      if (selectedValue === 'Easy') {
        const easy = initializeBoard(12, 6, 10)
        setBoard(easy[0])
        setIsDiscovered(easy[1])
        setMarkedFlags(0)
        setNewSelectedValue('Easy')
        setIsFirstSelectionZero(false)
      }
    }

    if (newSelectedValue !== selectedValue) {
      if (selectedValue === 'Easy') {
        const easy = initializeBoard(12, 6, 10)
        setBoard(easy[0])
        setIsDiscovered(easy[1])
        setMarkedFlags(0)
        setNewSelectedValue('Easy')
      }
      if (selectedValue === 'Medium') {
        const medium = initializeBoard(19, 10, 35)
        setBoard(medium[0])
        setIsDiscovered(medium[1])
        setMarkedFlags(0)
        setNewSelectedValue('Medium')
      }
      if (selectedValue === 'Hard') {
        const hard = initializeBoard(26, 14, 75)
        setBoard(hard[0])
        setIsDiscovered(hard[1])
        setMarkedFlags(0)
        setNewSelectedValue('Hard')
      }

      setIsFirstSelectionZero(false)
    }

  }, [selectedValue])

  // Funcion que verfica si la primera seleccion es cero
  function firstSelectionZero(rows, cols, mines, index, i) {
    let newBoard = CheckNumber(randomBoard(rows, cols, mines))
    while (newBoard[index][i] !== 0) {
      newBoard = CheckNumber(randomBoard(rows, cols, mines))
    }
    setBoard(newBoard)
    const newIsSelected = [...isDiscovered]
    if (newBoard[index][i] === 0) {
      DiscoverCells([index, i], newBoard, newIsSelected)
    } else {
      newIsSelected[index][i] = newBoard[index][i]
    }
    setIsDiscovered(newIsSelected)
  }

  const STYLES = {
    evenShow: ' font-extrabold  flex justify-center items-center ',
    evenHidden: `flex justify-center font-extrabold items-center  cursor-pointer w-[calc(100%/${level[selectedValue].col})] h-[calc(100%/${level[selectedValue].row})] `
  }

  function updateBoard(index, i, clX, clY) {
    if (!isFirstSelectionZero) {
      if (board[index][i] !== 0) {
        if (selectedValue === 'Easy') {
          firstSelectionZero(12, 6, 10, index, i)
        }
        if (selectedValue === 'Medium') {
          firstSelectionZero(19, 10, 35, index, i)
        }
        if (selectedValue === 'Hard') {
          firstSelectionZero(26, 14, 75, index, i)
        }
        setIsFirstSelectionZero(true)
        return
      } else {
        DiscoverCells([index, i], board, isDiscovered)
        setIsFirstSelectionZero(true)
      }
    }

    setRowIndex(index)
    setColumnIndex(i)
    if (isFirstSelectionZero) {
      setSelectedItem(true)
      setClientY(clY - 65)
      setClientX(clX - 80)
    }
  }

  useEffect(() => {
    saveGameToStorage(board, isDiscovered, isFirstSelectionZero, markedFlags, selectedValue)
  }, [board, isDiscovered, isFirstSelectionZero, markedFlags, selectedValue])


  useEffect(() => {
    const newIsSelected = [...isDiscovered]
    if (viewItem === true) {
      if (board[rowIndex][columnIndex] === 0) {
        DiscoverCells([rowIndex, columnIndex], board, isDiscovered)
      } else {
        isDiscovered[rowIndex][columnIndex] = board[rowIndex][columnIndex]
      }
      setViewItem(false)
      setIsDiscovered(newIsSelected)
    }

    if (markMine === true) {
      if (isDiscovered[rowIndex][columnIndex] === '🚩') {
        const newIsSelectedMine = [...isDiscovered]
        newIsSelectedMine[rowIndex][columnIndex] = null
        setMarkedFlags(markedFlags - 1)
        setIsDiscovered(newIsSelectedMine)
      } else {
        const newIsSelectedMine = [...isDiscovered]
        newIsSelectedMine[rowIndex][columnIndex] = '🚩'
        setMarkedFlags(markedFlags + 1)
        setIsDiscovered(newIsSelectedMine)
      }
      setMarkMine(false)
    }
    const [newWin, newLose] = checkWin(newIsSelected, selectedValue)
    setWinner(newWin)
    setLoser(newLose)
    setSelectedItem(false)
  }, [viewItem, markMine])

  return (
    <div className='flex flex-wrap justify-center items-center  border-gray-600 border-4 rounded-md w-[90%] h-[90%] sm:w-[70%] md:w-[55%]  lg:w-[35%] text-cente' >
      {
        selectedItem && (
          <div className="absolute flex items-center p-[10px]" style={{ top: clientY + 'px', left: clientX + 'px' }}>
            <Selection setViewItem={setViewItem} setMarkMine={setMarkMine} setSelectedItem={setSelectedItem} />
          </div>

        )
      }

      {
        isDiscovered.map((elem, index) => (

          elem.map((j, i) => {
            return (j >= 0 || j === 'bomb') && j !== null
              ? (

                <div key={i} className={(i + index) % 2 === 0 ? `bg-black/10 ${STYLES.evenShow} pointer-events-none` : `bg-black/20 ${STYLES.evenShow} pointer-events-none`}
                  onClick={() => updateBoard(index, i)} style={{ width: `calc(100%/${level[selectedValue].col})`, height: `calc(100%/${level[selectedValue].row})` }}>

                  <p className={numbers[j] ? numbers[j] : 'text-white'}>{
                    j === "bomb" ? (<BombIcon />) : (j)
                  }</p>
                </div>
              )

              : (
                <div key={i} className={(i + index) % 2 === 0 ? `bg-emerald-400  ${STYLES.evenHidden}` : `bg-emerald-500   ${STYLES.evenHidden}`}
                  onClick={(e) => updateBoard(index, i, e.clientX, e.clientY)} style={{ width: `calc(100%/${level[selectedValue].col})`, height: `calc(100%/${level[selectedValue].row})` }}>

                  {
                    j === '🚩' ? <p className=' bg-black/60 rounded-lg h-[90%] w-[90%] flex justify-center items-center' ><FlagIcon style={`text-slate-100 fill-slate-100`} /></p> : <p></p>
                  }

                </div>
              )
          }

          )
        ))
      }
      <div>
        {
          winner
            ? (<div>
              <WinnerModal user={user} time={time} selectedValue={selectedValue} />
            </div>)
            : ''
        }
        {
          loser ? <LoserModal /> : ''
        }
      </div>
    </div >
  )
}
