import React from "react"
import StartScreen from "./components/StartScreen"
import Categories from "./components/Categories"
import Trivia from "./components/Trivia"

export default function App() {
    const [showStart, setShowStart] = React.useState(true)
    const [categorySelected, setCategorySelected] = React.useState(false)
    const [quizStarted, setQuizStarted] = React.useState(false)
    const [apiFormData, setAPIFormData] = React.useState({
        difficulty: "medium",
        category: "9"
    })
    
    function handleChange(event) {
        const {name, value} = event.target
        setAPIFormData(prevForm => ({
            ...apiFormData,
            [name]: value.toLowerCase()
        }))
        console.log(apiFormData)
    }
    
    function startQuiz() {
        setQuizStarted(true)
        setCategorySelected(false)
    }
    
    function selectingCategory() {
        setShowStart(false)
        setCategorySelected(true)
        setQuizStarted(false)
    }
    
    return (
        <main>
            
            {showStart && 
                <StartScreen 
                    key="start" 
                    selectingCategory={selectingCategory} 
                />}
            {categorySelected && 
                <Categories 
                    key="choose-category"
                    apiFormData={apiFormData} 
                    handleChange={handleChange}
                    startQuiz={startQuiz}
                />}
            {quizStarted && 
                <Trivia 
                    key="quiz" 
                    apiFormData={apiFormData}
                    quizStarted={quizStarted}
                    selectingCategory={selectingCategory}
                />}
            <div className="circle-container">
                <div className="circle circle-yellow"></div>
                <div className="circle circle-blue"></div>
            </div>
        </main>
    )
}