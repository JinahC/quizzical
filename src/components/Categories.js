import React from "react"

export default function Categories(props) {
    const difficulties = ["Easy", "Medium", "Hard"]
    const difficultyElements = difficulties.map((difficulty, index) => {
        return (
            <label key={index} className="selection">
                <input
                    name="difficulty"
                    type="radio" 
                    value={difficulty}
                    checked={difficulty.toLowerCase() == props.apiFormData.difficulty}
                    onChange={props.handleChange}
                />
                <span className="selection--text">{difficulty}</span>
            </label>
        )
    })
    
    const categories = ["General Knowledge", "Animals", "Celebrities", "Film", "Geography", "History", "Mathematics", "Music", "Science & Nature", "Sports", "Television"]
    const categoryValues = [9, 27, 26, 11, 22, 23, 19, 12, 17, 21, 14]
    
    const categoryElements = categories.map((category, index) => {
        return (
            <label key={index} className="selection">
                <input
                    name="category"
                    type="radio" 
                    value={categoryValues[index]}
                    checked={categoryValues[index] == props.apiFormData.category}
                    onChange={props.handleChange}
                />
                <span className="selection--text">{category}</span>
            </label>
        )
    })
    
    return (
        <form>
            <fieldset>
                <h2>Select Difficulty</h2>
                <div className="flex-items">
                    {difficultyElements}
                </div>
            </fieldset>
            <fieldset>
                <h2>Select Category</h2>
                {categoryElements}
            </fieldset>
            <div className="form--footer-buttons">
                <button className="form--btn" onClick={props.startQuiz}>Start Quiz</button>
            </div>
        </form>
    )
}

// general knowledge = 9
// animals = 27
// celebrities = 26
// film = 11
// geography = 22
// history = 23
// mathematics = 19
// music = 12
// science & nature = 17
// sports = 21
// television = 14