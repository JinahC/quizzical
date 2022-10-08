import React from "react"

export default function Question(props) {
    const [answerChoices, setAnswerChoices] = React.useState([])
    
    function addAnswer(answerChoice) {
        setAnswerChoices(oldChoices => [...oldChoices, decodeHTMLEntities(answerChoice)])       
    }
    
    function decodeHTMLEntities(text) {
        var textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
    }
    
    React.useEffect(() => {       
        // console.log("in the effect")
        if (answerChoices.length == 4)
            setAnswerChoices([])
            
        let randomIndex = Math.floor(Math.random() * (props.incorrect_answers.length + 1))
        // console.log(`the rando is ${randomIndex} for question #${props.question_number}`)
        
        // splicing the correct answer into the incorrect_array renders
        // the correct answer twice in the answer choice list
        // so this method was used
        for (let i = 0; i < props.incorrect_answers.length; i++) {
            if (i == randomIndex)
                addAnswer(props.correct_answer)
                
            addAnswer(props.incorrect_answers[i])  
            // console.log("set: " + answerChoices)             
        }
        if (randomIndex == 3)
            addAnswer(props.correct_answer)
    }, [])
                
    const answerChoiceElements = answerChoices.map((answerChoice, index) => {
        let spanClass = ""
        if (props.isChecking) {
            spanClass = (answerChoice === props.correct_answer) ?
                "answer-choice--right" :
                "answer-choice--wrong"
        }
        
        return (
            <label key={`${props.question_number}_${index}`} className="answer-choice">
                <input
                    name={`question${props.question_number}`}
                    type="radio" 
                    value={answerChoice}
                    checked={answerChoice == props.value}
                    onChange={props.handleChange}
                    disabled={props.isChecking}
                />
                <span className={spanClass}>{answerChoice}</span>
            </label>
        )
    })
    
    return (
        <fieldset className="question-container">
            <h3 className="question">{decodeHTMLEntities(props.question)}</h3>
            <div className="answer-choices-container">
                {answerChoiceElements}
            </div>
        </fieldset>
    )
}