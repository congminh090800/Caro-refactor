import React from "react";
import './index.css';
class Square extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <button className={`square ${this.props.isWinCell && 'highlighted-cell'}`} onClick={this.props.onClick}>
                {this.props.value}
            </button>
        )
    }
}
export default Square;
