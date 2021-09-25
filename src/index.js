import React from "react";
import reactDom from "react-dom";
import './index.css';
import Game from '~/screens/MainBoard';
reactDom.render(
    <Game></Game>,
    document.getElementById('root')
);