import React from "react";
import './index.css';
import Square from '../Square';


function Board(props) {
  const renderSquare = (i) => {
    return <Square key={i} isWinCell={isWinCell(i)} value={props.squares[i]} onClick={() => props.onClick(i)}/>;
  }
  const isWinCell = (i) => {
    return props.line && props.line.indexOf(i) >= 0;
  }

  const boardSize = props.size || 3;
  let squares = [];
  for (let i = 0; i < boardSize; i++) {
    let row = [];
    for (let j = 0; j < boardSize; j++) {
      row.push(renderSquare(i * boardSize + j));
    }
    squares.push(<div key={i} className="board-row">{row}</div>);
  }
  return (
    <div>{squares}</div>
  );
}
export default Board;
