export function CheckNumber (matrix) {
  const arr = [[]]
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      let value = 0
      if (matrix[i][j] === 'bomb') {
        arr[i].push('bomb')
      } else {
        if (i > 0) {
          if (matrix[i - 1][j - 1]) {
            value++
          }
          if (matrix[i - 1][j]) {
            value++
          }
          if (matrix[i - 1][j + 1]) {
            value++
          }
        }
        if (matrix[i][j - 1]) {
          value++
        }
        if (matrix[i][j + 1]) {
          value++
        }
        if (i < matrix.length - 1) {
          if (matrix[i + 1][j - 1]) {
            value++
          }
          if (matrix[i + 1][j]) {
            value++
          }
          if (matrix[i + 1][j + 1]) {
            value++
          }
        }
        arr[i].push(value)
      }
    }
    if (i !== matrix.length - 1) {
      arr.push([])
    }
  }
  return arr
}
