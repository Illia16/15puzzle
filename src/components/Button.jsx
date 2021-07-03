import React from "react";
import { useEffect, useState } from "react";
import "../styles/index.scss";

const Button = ({cell, functionHandler, value, cellClass}) => {

    return(
        <button onClick={functionHandler} value={value} className={`cell ${cell !== 0 ? 'singleCell' : 'hole'}`}>{cell}</button>
    )
}

export default Button;