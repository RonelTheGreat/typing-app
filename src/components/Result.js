import React from 'react'

const Result = props => {
    const {
        accuracy,
        numOfCorrectWords,
        numOfMistakes,
        keyStrokes
    } = props.result

    return (
        <div className="result">
            <h3>
                <i className="fas fa-clipboard-check" /> results
            </h3>
            <p>
                <span className="lbl">accuracy: </span>
                <span className="value">{accuracy.toFixed(2)}%</span>
            </p>

            <p>
                <span className="lbl">correct words: </span>
                <span className="value">{numOfCorrectWords}</span>
            </p>

            <p>
                <span className="lbl">mistakes: </span>
                <span className="value">{numOfMistakes}</span>
            </p>

            <p>
                <span className="lbl">keystrokes: </span>
                <span className="value">{keyStrokes}</span>
            </p>
        </div>
    )
}

export default Result
