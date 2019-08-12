import React from 'react'

const Timer = props => {
    let { min, sec } = props.time
    return (
        <div
            className="timer"
            style={{
                animation: sec <= 10 && 'vibrate .5s linear',
                backgroundColor: sec <= 10 && '#ff6b6b'
            }}
        >
            <i className="fas fa-stopwatch" />
            <span className="min"> {min < 10 ? `0${min}` : min}</span>
            <span className="colon"> : </span>
            <span className="sec">{sec < 10 ? `0${sec}` : sec}</span>
        </div>
    )
}

export default Timer
