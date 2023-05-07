export function saveGameToStorage(board, isDiscovered, isFirstSelectionZero, markedFlags, selectedValue) {
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('isDiscovered', JSON.stringify(isDiscovered))
    window.localStorage.setItem('isFirstSelectionZero', isFirstSelectionZero)
    window.localStorage.setItem('markedFlags', markedFlags)
    window.localStorage.setItem('selectedValue', selectedValue)
}


export const resetGameStorage = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('isDiscovered')
    window.localStorage.removeItem('isFirstSelectionZero')
    window.localStorage.removeItem('markedFlags')
    window.localStorage.removeItem('selectedValue')
    location.reload()
}