import React from "react";
import Board from '~/components/MainBoard/Board';
import './index.css';
import { calculateWinner } from '~/utils'
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        coord: {
          X: null,
          Y: null
        },
        isXTurn: true
      }],
      stepNumber: 0,
      isXNext: true,
      reverseMode: false, // false : normal, true: reverse
    }
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    const winInfo = calculateWinner(squares);
    if (winInfo.winner || squares[i] || winInfo.isDraw) {
      return;
    }
    squares[i] = this.state.isXNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        coord: {
          X: i%3 +1,
          Y: parseInt(i/3 +1),
        },
        isXTurn: this.state.isXNext
      }]),
      stepNumber: history.length,
      isXNext: !this.state.isXNext,
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
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winInfo = calculateWinner(current.squares);
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
      <div className="game">
        <div className="game-board">
          <Board line={winInfo.line} squares={current.squares} onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div><span className="m-r-5">{status}</span><button onClick={() => this.reverseOrder()}>Reverse move</button></div>
          <ol reversed={reversed}>{movesShow}</ol>
        </div>
      </div>
    );
  }
}
export default Game;