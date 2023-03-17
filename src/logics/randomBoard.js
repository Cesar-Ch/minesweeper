export function randomBoard(rows, cols, mines) {
    const arr = Array(rows*cols).fill(null);
    
    if(mines !== 0){
        for (let i = 0; i < mines; i++) {
            arr[i] = "💣"
        }
    }

    const sortArr = arr.sort(() => Math.random() - 0.5)

    let newArr = []

    for (let i = 0; i < rows; i++) {
        newArr.push(sortArr.slice(i * cols, (i + 1) * cols))
    }

    return newArr
}
