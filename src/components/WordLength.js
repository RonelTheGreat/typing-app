import React from 'react'

const WordLength = props => {
    const { wordLength, handleChange } = props

    return (
        <div className="wordlength-cont">
            <h4>choose a word length</h4>
            <div className="wordlength-option">
                <div
                    className="short"
                    style={{
                        background: wordLength === 'short' && '#1dd1a1'
                    }}
                >
                    <input
                        type="radio"
                        name="wordlength"
                        value="short"
                        checked={wordLength === 'short'}
                        onChange={e => handleChange(e)}
                    />
                    <span>short</span>
                </div>
                <div
                    className="medium"
                    style={{
                        background: wordLength === 'medium' && '#feca57'
                    }}
                >
                    <input
                        type="radio"
                        name="wordlength"
                        value="medium"
                        checked={wordLength === 'medium'}
                        onChange={e => handleChange(e)}
                    />
                    <span>medium</span>
                </div>
                <div
                    className="long"
                    style={{
                        background: props.wordLength === 'long' && '#ff6b6b'
                    }}
                >
                    <input
                        type="radio"
                        name="wordlength"
                        value="long"
                        checked={wordLength === 'long'}
                        onChange={e => handleChange(e)}
                    />
                    <span>long</span>
                </div>
            </div>
        </div>
    )
}

export default WordLength
