export { calculateWinner }

function calculateWinner(squares, size) {
  let squares2d = chunkArray(squares, size);
  let i,j;
  for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
      if (squares2d[i][j] && squares2d[i][j] === squares2d[i+1][j] && squares2d[i][j] === squares2d[i+2][j] && 
        squares2d[i][j] === squares2d[i+3][j] &&squares2d[i][j] === squares2d[i+4][j]) {
          return {
            winner: squares2d[i][j],
            line: getCol(i, j, size),
            isDraw: false
          }
      }
      if (squares2d[i][j] && squares2d[i][j] === squares2d[i+1][j+1] && squares2d[i][j] === squares2d[i+2][j+2] && 
        squares2d[i][j] === squares2d[i+3][j+3] &&squares2d[i][j] === squares2d[i+4][j+4]) {
          return {
            winner: squares2d[i][j],
            line: getDiag(i, j, size),
            isDraw: false
          }
      }
      if (squares2d[i][j] && squares2d[i][j] === squares2d[i-1][j+1] && squares2d[i][j] === squares2d[i-2][j+2] && 
        squares2d[i][j] === squares2d[i-3][j+3] &&squares2d[i][j] === squares2d[i-4][j+4]) {
          return {
            winner: squares2d[i][j],
            line: getAntiDiag(i, j, size),
            isDraw: false
          }
      }
      if (squares2d[i][j] && squares2d[i][j] === squares2d[i][j+1] && squares2d[i][j] === squares2d[i][j+2] && 
        squares2d[i][j] === squares2d[i][j+3] &&squares2d[i][j] === squares2d[i][j+4]) {
          return {
            winner: squares2d[i][j],
            line: getRow(i, j, size),
            isDraw: false
          }
      }
    }
  }

  if (squares.filter(square => square).length === squares.length) {
      return {
          winner: null,
          line: null,
          isDraw: true,
      }
  }
  return {
      winner: null,
      line: null,
      isDraw: false,
  }
}

function getRow(x, y, size) {
  let line = [];
  for ( let i = y; i < y + 5; i++) {
    line.push(x*size + i);
  }
  return line;
}

function getDiag(x, y, size) {
  let line = [];
  let accum = x * size + y;
  line.push(accum);
  for ( let i = 1; i < 5; i++) {
    accum = accum + size + 1;
    line.push(accum);
  }
  return line;
}

function getAntiDiag(x, y, size) {
  let line = [];
  let accum = x * size + y;
  line.push(accum);
  for ( let i = 1; i < 5; i++) {
    accum = accum - (size -1);
    line.push(accum);
  }
  return line;
}

function getCol(x, y, size) {
  let line = [];
  let accum = x * size + y;
  line.push(accum);
  for ( let i = 1; i < 5; i++) {
    accum = accum + size;
    line.push(accum);
  }
  return line;
}

function chunkArray(myArray, chunk_size){
  var index = 0;
  var arrayLength = myArray.length;
  var tempArray = [];
  
  for (index = 0; index < arrayLength; index += chunk_size) {
      let myChunk = myArray.slice(index, index+chunk_size);
      tempArray.push(myChunk);
  }

  return tempArray;
}
