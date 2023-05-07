import { level } from './constants'
import { CheckNumber } from './checkNumber'
import { randomBoard } from './randomBoard'

export function checkWin (isDiscovered, selectedValue) {
  let i = 0
  let win = false
  let lose = false
  isDiscovered.map((row) =>
    row.map((cell) => {
      if (cell !== '💣' && cell !== null && cell !== '🚩') {
        i++
      }
      if (cell === '💣') {
        lose = true
      }
    }))

  if (i === level[selectedValue].row * level[selectedValue].col - level[selectedValue].mines) {
    win = true
  }
  return [win, lose]
}

export function initializeBoard (rows, cols, mines) {
  const newBoard = CheckNumber(randomBoard(rows, cols, mines))
  const newIsSelected = randomBoard(rows, cols, 0)

  return [newBoard, newIsSelected]
}
