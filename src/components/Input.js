import React from 'react'

const Input = props => {
    return (
        <div className="input-container">
            <input
                type="text"
                placeholder="type here"
                style={{ animation: props.animate && 'push 0.1s' }}
                value={props.typedWord.trim()}
                onChange={e => props.handleChange(e)}
                onKeyDown={e => props.handleKeyPress(e)}
                disabled={props.isDone || props.isFetching}
            />
        </div>
    )
}

export default Input
