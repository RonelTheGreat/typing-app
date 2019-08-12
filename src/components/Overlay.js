import React from 'react'
import loading from '../loading.svg'

const Overlay = props => {
    let { wpm, state } = props
    let tagLine = ''

    const makeTagline = wpm => {
        if (wpm === 0) return 'did you even touch the keyboard?'
        if (wpm <= 20) return 'too bad !'
        if (wpm >= 20 && wpm <= 30) return 'too slow !'
        if (wpm >= 30 && wpm <= 40) return 'keep it up !'
        if (wpm >= 40 && wpm <= 50) return 'pretty good !'
        if (wpm >= 50 && wpm <= 60) return 'fast enough !'
        if (wpm >= 60 && wpm <= 70) return 'you rock !'
        if (wpm >= 70 && wpm <= 80) return 'fascinating !'
        if (wpm > 120) return 'a keyboard ninja !'
    }

    state === 'fetching'
        ? (tagLine = 'fetching random words')
        : (tagLine = makeTagline(wpm))

    return (
        <div className="overlay">
            <h1 style={{ animation: 'vibrate 0.5s' }}>{tagLine}</h1>
            <h2>
                {state === 'fetching'
                    ? `please wait`
                    : wpm <= 1
                    ? `${wpm} word per minute`
                    : `${wpm} words per minute`}

                {state === 'fetching' && (
                    <div className="loading-cont">
                        <img
                            className="first"
                            src={loading}
                            alt="loading animation"
                        />
                        <img
                            className="second"
                            src={loading}
                            alt="loading animation"
                        />
                        <img
                            className="third"
                            src={loading}
                            alt="loading animation"
                        />
                    </div>
                )}
            </h2>
        </div>
    )
}

export default Overlay
