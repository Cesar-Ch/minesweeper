export function DiscoverCells(position, originalArray, newArray) {
    const visibleBlocks = [...newArray];
    const visited = new Set();

    function discover(position) {

        const row = position[0];
        const column = position[1];

        if (visited.has(`${row},${column}`)) {
            return;
        }

        visited.add(`${row},${column}`);

        for (let i = Math.max(0, row - 1); i <= Math.min(row + 1, originalArray.length - 1); i++) {
            for (let j = Math.max(0, column - 1); j <= Math.min(column + 1, originalArray[i].length - 1); j++) {
                visibleBlocks[i][j] = originalArray[i][j]
                if (originalArray[i][j] === 0) {
                    discover([i, j])
                }
            }
        }
    }

    discover(position);
    return visibleBlocks;
}