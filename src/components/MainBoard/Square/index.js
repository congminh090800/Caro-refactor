import React from "react";
import './index.css';
function Square(props) {
    return (
        <button className={`square ${props.isWinCell && 'highlighted-cell'}`} onClick={props.onClick}>
            {props.value}
        </button>
    )
}
export default Square;
