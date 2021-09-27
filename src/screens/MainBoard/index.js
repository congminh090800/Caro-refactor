import React from "react";
import Board from '~/components/MainBoard/Board';
import './index.css';
import { calculateWinner } from '~/utils'

const initialState = (size) => ({
  history: [{
    squares: Array(size*size).fill(null),
    coord: {
      X: null,
      Y: null
    },
    isXTurn: true
  }],
  stepNumber: 0,
  isXNext: true,
  reverseMode: false, // false : normal, true: reverse
  size: size
});

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState(3);
    this.handleChange = this.handleChange.bind(this);
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    const winRecheck = calculateWinner(squares, current.coord.Y -1, current.coord.X -1, this.state.size);
    if (winRecheck.winner || winRecheck.isDraw) {
      return;
    }
    const winInfo = calculateWinner(squares, parseInt(i/this.state.size), i%this.state.size, this.state.size);
    if (winInfo.winner || squares[i] || winInfo.isDraw) {
      return;
    }
    squares[i] = this.state.isXNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        coord: {
          X: i%this.state.size +1,
          Y: parseInt(i/this.state.size +1),
        },
        isXTurn: this.state.isXNext
      }]),
      stepNumber: history.length,
      isXNext: !this.state.isXNext
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      isXNext: (step % 2) === 0,
      history: this.state.history.slice(0, step + 1)
    });
  }
  reverseOrder() {
    this.setState({
      reverseMode: !this.state.reverseMode,
    })
  }
  handleChange(event) {
    let size = Number(event.target.value) || 3;
    if (size < 3) {
      size = 3;
    } else {
      size = Math.min(10,size);
    }
    this.setState({
      ...initialState(size)
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winInfo = calculateWinner(current.squares, current.coord.Y-1, current.coord.X-1, this.state.size);
    const winner = winInfo.winner;
    let status;
    if (!winner && !winInfo.isDraw) {
      status = 'Next player: ' + (this.state.isXNext ? 'X' : 'O');
    } else if (!winner && winInfo.isDraw) {
      status = 'Draw';
    } else {
      status = 'Winner: ' + winner;
    }
    const reversed = this.state.reverseMode;
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go back to this move':
        'Restart';
      const coordX = step.coord.X ? step.coord.X : null;
      const coordY = step.coord.Y ? step.coord.Y : null;
      const player = step.isXTurn ? 'X' : 'O';
      const isCurrentMove = move === this.state.stepNumber;
      return (
        <li key={move}>
          <div>
            {coordX && coordY &&
              <span className={`m-r-5 ${isCurrentMove && 'current-move'}`}>Player: {player}, Coordinate: {coordX},{coordY}</span>
            }
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </div>
        </li>
      );
    });
    const movesShow = reversed ? moves.slice().reverse() : moves;
    return (
      <div className="container">
        <div className="size-input">
          <label>
            Change the size and restart:
            <input type="number" id="size" name="size" min="3" max="10" value={this.state.size} onChange={this.handleChange}></input>
          </label>
        </div>
        <div className="game">
          <div className="game-board">
            <Board size={this.state.size} line={winInfo.line} squares={current.squares} onClick={(i) => this.handleClick(i)}/>
          </div>
          <div className="game-info">
            <div><span className="m-r-5">{status}</span><button onClick={() => this.reverseOrder()}>Reverse move</button></div>
            <ol reversed={reversed}>{movesShow}</ol>
          </div>
        </div>
      </div>
    );
  }
}
export default Game;