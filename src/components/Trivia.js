import React from "react"
import Question from "./Question"
import questionData from "../data.js"

export default function Trivia(props) {
    const [formData, setFormData] = React.useState(emptyForm())
    
    const userAnswers = Object.values(formData) 
    // console.log("current answers: " + userAnswers)   
    const [questions, setQuestions] = React.useState([])
    const [quizSubmitted, setquizSubmitted] = React.useState(false)
    // const [isResetting, setIsResetting] = React.useState(false)
    const [isChecking, setIsChecking] = React.useState(false)
    // const [changeQuestionsActivator, setChangeQuestionsActivator] = React.useState(false)
    const [results, setResults] = React.useState("")
    
    
    let apiURL = `https://opentdb.com/api.php?amount=10&category=${props.apiFormData.category}&difficulty=${props.apiFormData.difficulty}&type=multiple`
    // console.log(apiURL)
    React.useEffect(() => {
        fetch(apiURL)
            .then(res => res.json())
            .then(data => setQuestions(data.results))
    }, [])
    
    function emptyForm() {
        return {
            question1: "",
            question2: "",
            question3: "",
            question4: "",
            question5: "",
            question6: "",
            question7: "",
            question8: "",
            question9: "",
            question10: ""
        }
    }
    
    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevForm => ({
            ...formData,
            [name]: value
        }))
        console.log(name + " has this value: " + value)
    }
    
    function checkAnswers(event) {
        event.preventDefault()
        setIsChecking(true)
        
        let numberCorrect = 0
        for (let i = 0; i < correctAnswers.length; i++) {
            if (userAnswers[i] == correctAnswers[i])
                numberCorrect++
        }
        
        setquizSubmitted(true)
        setResults(`You scored ${numberCorrect}/${correctAnswers.length} correct answers`)
    }
    
    function resetQuiz(event) {
        event.preventDefault()
        // setIsResetting(true)
        setIsChecking(false)
        setquizSubmitted(false)
        setFormData(emptyForm())
        // setChangeQuestionsActivator(prevActivator => !prevActivator)
    }
    
    const correctAnswers = questions.map(question => question.correct_answer)
    const questionElements = questions.map((question, index) => {
        return (
            <Question
                key={index}
                question_number={index + 1}
                question={question.question}
                correct_answer={question.correct_answer}
                incorrect_answers={question.incorrect_answers}
                isChecking={isChecking}
                // activator={changeQuestionsActivator}
                value={userAnswers[index]}
                handleChange={handleChange}
            />
        )
    })
    // console.log(questionElements)
    
    const footer = quizSubmitted ? 
        <div className="form--footer">
            <p className="form--footer-results">{results}</p>
            <div className="form--footer-buttons">
                <button className="form--btn" onClick={resetQuiz}>Play Again</button>
                <button className="form--btn" onClick={props.selectingCategory}>New Category</button>
            </div>
        </div> :
        <div className="form--footer-buttons">
            <button className="form--btn" onClick={checkAnswers}>Check Answers</button>
        </div>
        
    
    return (
        <form 
            className={props.quizStarted ? "" : "hidden"} 
        >
            {questionElements}
            {footer}          
        </form>
    )
}