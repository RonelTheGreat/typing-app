import React from 'react'

const RetryButton = props => {
    return (
        <button className="btn-retry" onClick={e => props.handleClick(e)}>
            <i className="fas fa-redo" />
        </button>
    )
}

export default RetryButton
