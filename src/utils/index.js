export { calculateWinner }

function calculateWinner(squares, x, y, size) {
  if (x< 0|| y< 0 || squares.length === 0) {
    return {
      winner: null,
      line: null,
      isDraw: false,
    }
  }
  let squares2d = chunkArray(squares, size);
  let surround = checkSurround(squares2d, x, y, size);
  if (surround && surround.winner) {
    return surround;
  }
  let beneath = checkBeneath(squares2d, x, y, size);
  if (beneath && beneath.winner) {
    return beneath;
  }
  let upon = checkUpon(squares2d, x, y, size);
  if (upon && upon.winner) {
    return upon;
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

function checkSurround(squares2d, x, y, size) {
  if (x-1>=0 && x+1<size && squares2d[x][y] && squares2d[x-1][y] === squares2d[x][y] && squares2d[x+1][y] === squares2d[x][y]) {
    return {
      winner: squares2d[x][y],
      line: [(x-1)*size+y,x*size+y,(x+1)*size+y],
      isDraw: false
    }
  } else if (y-1>=0 && y+1<size && squares2d[x][y] && squares2d[x][y-1] === squares2d[x][y] && squares2d[x][y+1] === squares2d[x][y]) {
    return {
      winner: squares2d[x][y],
      line: [x*size+y-1,x*size+y,x*size+y+1],
      isDraw: false
    }
  } else if (x-1>=0 && x+1<size && y-1>=0 && y+1<size && squares2d[x][y] && squares2d[x-1][y-1] === squares2d[x][y] && squares2d[x+1][y+1] === squares2d[x][y]) {
    return {
      winner: squares2d[x][y],
      line: [(x-1)*size+(y-1),x*size+y,(x+1)*size+y+1],
      isDraw: false
    }
  } else if (x-1>=0 && x+1<size && y-1>=0 && y+1<size && squares2d[x][y] && squares2d[x+1][y-1] === squares2d[x][y] && squares2d[x-1][y+1] === squares2d[x][y]) {
    return {
      winner: squares2d[x][y],
      line: [(x-1)*size+y+1,x*size+y,(x+1)*size+(y-1)],
      isDraw: false
    }
  }
  return null;
}

function checkBeneath(squares2d, x, y, size) {
  if (x+2 < size && squares2d[x][y] && squares2d[x+1][y] === squares2d[x][y] && squares2d[x+2][y] === squares2d[x][y]) {
    return {
      winner: squares2d[x][y],
      // line: [x*size+y+1,x*size+y,x*size+y+2],
      line: [(x+1)*size+y,x*size+y,(x+2)*size+y],
      isDraw: false
    }
  } else if (x+2<size && y+2<size && squares2d[x][y] && squares2d[x+1][y+1] === squares2d[x][y] && squares2d[x+2][y+2] === squares2d[x][y]) {
    return {
      winner: squares2d[x][y],
      line: [(x+1)*size+y+1,x*size+y,(x+2)*size+y+2],
      isDraw: false
    }
  } else if (y+2<size && squares2d[x][y] && squares2d[x][y+1] === squares2d[x][y] && squares2d[x][y+2] === squares2d[x][y]) {
    return {
      winner: squares2d[x][y],
      line: [x*size+y+1,x*size+y,x*size+y+2],
      // line: [(x+1)*size+y,x*size+y,(x+2)*size+y],
      isDraw: false
    }
  } else if (x-2>=0 && y+2<size && squares2d[x][y] && squares2d[x-1][y+1] === squares2d[x][y] && squares2d[x-2][y+2] === squares2d[x][y]) {
    return {
      winner: squares2d[x][y],
      line: [(x-1)*size+(y+1),x*size+y,(x-2)*size+(y+2)],
      isDraw: false
    }
  }
  return null;
}

function checkUpon(squares2d, x, y, size) {
  if (x-2>=0 && squares2d[x][y] && squares2d[x-1][y] === squares2d[x][y] && squares2d[x-2][y] === squares2d[x][y]) {
    return {
      winner: squares2d[x][y],
      line: [(x-1)*size+y,x*size+y,(x-2)*size+y],
      isDraw: false
    }
  } else if (x-2>=0 && y-2>=0 && squares2d[x][y] && squares2d[x-1][y-1] === squares2d[x][y] && squares2d[x-2][y-2] === squares2d[x][y]) {
    return {
      winner: squares2d[x][y],
      line: [(x-1)*size+y-1,x*size+y,(x-2)*size+y-2],
      isDraw: false
    }
  } else if (y-2>=0 && squares2d[x][y] && squares2d[x][y-1] === squares2d[x][y] && squares2d[x][y-2] === squares2d[x][y]) {
    return {
      winner: squares2d[x][y],
      // line: [(x-1)*size+y,x*size+y,(x-2)*size+y],
      line: [x*size+(y-1),x*size+y,x*size+(y-2)],
      isDraw: false
    }
  } else if (x+2<size && y-2>=0 && squares2d[x][y] && squares2d[x+1][y-1] === squares2d[x][y] && squares2d[x+2][y-2] === squares2d[x][y]) {
    return {
      winner: squares2d[x][y],
      line: [(x+1)*size+(y-1),x*size+y,(x+2)*size+(y-2)],
      isDraw: false
    }
  }
  return null;
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
