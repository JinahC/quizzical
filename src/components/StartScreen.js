import React from "react"

export default function StartScreen(props) {
    return (
        <header> 
            <h1 className="header--title">Quizzical</h1>
            <p className="header--desc">How well do you know your general knowledge? Take this quiz to find out!</p>
            <button className="header--btn" onClick={props.selectingCategory}>START</button>
        </header>
    )
}