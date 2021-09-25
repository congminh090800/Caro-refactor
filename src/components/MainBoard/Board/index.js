import React from "react";
import './index.css';
import Square from '../Square';
class Board extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  renderSquare(i) {
    return <Square key={i} isWinCell={this.isWinCell(i)} value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
  }
  isWinCell(i){
    return this.props.line && this.props.line.indexOf(i) >= 0;
  }
  render() {
    const boardRow = 3;
    const boardCol = 3;
    let squares = [];
    for (let i = 0; i < boardRow; i++) {
      let row = [];
      for (let j = 0; j < boardCol; j++) {
        row.push(this.renderSquare(i * boardRow + j));
      }
      squares.push(<div key={i} className="board-row">{row}</div>);
    }
    return (
      <div>{squares}</div>
    );
  }
}
export default Board;
