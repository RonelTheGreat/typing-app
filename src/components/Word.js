import React from 'react'

const Word = props => {
    let { word, isCorrect, isDoneTyping, isCurrent } = props.item

    return (
        <span
            className="word"
            style={{
                display: 'inline',
                color:
                    isDoneTyping && isCorrect
                        ? '#1dd1a1'
                        : isDoneTyping && !isCorrect && '#ff6b6b',
                backgroundColor: isCurrent && 'rgba(200, 214, 229, 0.5)',
                borderRadius: '1.5rem'
            }}
        >
            {word}
        </span>
    )
}

export default Word
