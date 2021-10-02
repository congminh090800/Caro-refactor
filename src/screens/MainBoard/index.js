import React, { useState } from "react";
import Board from '~/components/MainBoard/Board';
import './index.css';
import { calculateWinner } from '~/utils'

const initialHistory = (size) => (
  [{
    squares: Array(size*size).fill(null),
    coord: {
      X: null,
      Y: null
    },
    isXTurn: true
  }]
);

function Game(props) {
  const [history, setHistory] = useState(initialHistory(5));
  const [stepNumber, setStepNumber] = useState(0);
  const [isXNext, setIsXNext] = useState(true);
  const [reverseMode, setReverseMode] = useState(false);
  const [size, setSize] = useState(5);

  const handleClick = (i) => {
    const _history = history.slice(0, stepNumber + 1);
    const _current = _history[stepNumber];
    const _squares = _current.squares.slice();
    const _winInfo = calculateWinner(_squares, size);
    if (_winInfo.winner || _squares[i] || _winInfo.isDraw) {
      return;
    }
    _squares[i] = isXNext ? 'X' : 'O';
    setHistory(history.concat([{
      squares: _squares,
      coord: {
        X: i%size +1,
        Y: parseInt(i/size +1),
      },
      isXTurn: isXNext
    }]));
    setStepNumber(_history.length);
    setIsXNext(!isXNext);
  }
  const jumpTo = (step) => {
    setStepNumber(step);
    setIsXNext((step % 2) === 0);
    setHistory(history.slice(0, step + 1));
  }
  const reverseOrder = () => {
    setReverseMode(!reverseMode);
  }
  const handleChange = (event) => {
    let size = Number(event.target.value) || 5;
    if (size < 5) {
      size = 5;
    } else {
      size = Math.min(20,size);
    }
    setHistory(initialHistory(size));
    setStepNumber(0);
    setIsXNext(true);
    setReverseMode(false);
    setSize(size);
  }

  const _history = history;
  const _current = _history[stepNumber];
  const _winInfo = calculateWinner(_current.squares, size);
  const _winner = _winInfo.winner;
  let _status;
  if (!_winner && !_winInfo.isDraw) {
    _status = 'Next player: ' + (isXNext ? 'X' : 'O');
  } else if (!_winner && _winInfo.isDraw) {
    _status = 'Draw';
  } else {
    _status = 'Winner: ' + _winner;
  }
  const _reversed = reverseMode;
  const _moves = _history.map((step, move) => {
    const desc = move ?
      'Go back to this move':
      'Restart';
    const coordX = step.coord.X ? step.coord.X : null;
    const coordY = step.coord.Y ? step.coord.Y : null;
    const player = step.isXTurn ? 'X' : 'O';
    const isCurrentMove = move === stepNumber;
    return (
      <li key={move}>
        <div>
          {coordX && coordY &&
            <span className={`m-r-5 ${isCurrentMove && 'current-move'}`}>Player: {player}, Coordinate: {coordX},{coordY}</span>
          }
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </div>
      </li>
    );
  });
  const _movesShow = _reversed ? _moves.slice().reverse() : _moves;
  return (
    <div className="container">
      <div className="size-input">
        <label>
          Change the size and restart:
          <input type="number" id="size" name="size" min="5" max="20" value={size} onChange={handleChange}></input>
        </label>
      </div>
      <div className="game">
        <div className="game-board">
          <Board size={size} line={_winInfo.line} squares={_current.squares} onClick={(i) => handleClick(i)}/>
        </div>
        <div className="game-info">
          <div><span className="m-r-5">{_status}</span><button onClick={() => reverseOrder()}>Reverse move</button></div>
          <ol reversed={_reversed}>{_movesShow}</ol>
        </div>
      </div>
    </div>
  );
}
export default Game;