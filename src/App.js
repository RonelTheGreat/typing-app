import React, { Component, Fragment } from 'react'
import Header from './components/Header'
import Word from './components/Word'
import Input from './components/Input'
import RetryButton from './components/RetryButton'
import Timer from './components/Timer'
import Result from './components/Result'
import Overlay from './components/Overlay'
import Footer from './components/Footer'
import Links from './components/Links'
import Brand from './components/Brand'
import WordLength from './components/WordLength'

import axios from 'axios'

import './App.css'

class App extends Component {
    state = {
        words: [],
        typedWord: '',
        currentIndex: 0,
        index: 0,
        letterIndex: 0,
        time: {
            min: 0,
            sec: 60
        },
        wpm: 0,
        numOfCorrectWords: 0,
        numOfMistakes: 0,
        keyStrokes: 0,
        error: 0,
        accuracy: 0,
        numOfWordsTyped: 0,
        timesUp: false,
        isFetching: true,
        isDone: false,
        timerID: null,
        started: false,
        wordLength: 'short'
    }

    componentDidMount = () => {
        axios
            .get('https://keyboard-ninjaaa.herokuapp.com/api/short/words')
            .then(res => res.data)
            .then(data => {
                this.setState(prevState => {
                    prevState.words = data.words
                    // set the first item the current item for highlighting
                    prevState.words[this.state.index][0].isCurrent = true
                    prevState.isFetching = false
                    return prevState
                })
            })
    }

    countDown = () => {
        // if second is NOT equal to zero and there is remaining time
        // exit function returning the decremented sec
        if (!this.state.time.sec <= 0 && !this.state.timesUp) {
            return this.setState(prevState => (prevState.time.sec -= 1))
        }

        // if time is up, stop counter
        clearInterval(this.state.timerID)
        // reset seconds to 60
        // set timesUp to true
        // isDone typing to true
        this.setState(prevState => {
            prevState.timesUp = true
            prevState.time.sec = 60
            prevState.isDone = true
            prevState.typedWord = ''
            prevState.words = []
            return prevState
        })
    }

    handleClick = e => {
        // reset states
        this.setState({
            words: [],
            wpm: 0,
            typedWord: '',
            currentIndex: 0,
            index: 0,
            letterIndex: 0,
            time: {
                min: 0,
                sec: 60
            },
            numOfCorrectWords: 0,
            numOfMistakes: 0,
            keyStrokes: 0,
            error: 0,
            accuracy: 0,
            numOfWordsTyped: 0,
            timesUp: false,
            isFetching: true,
            isDone: false,
            timerID: null,
            started: false
        })

        axios
            .get(
                `https://keyboard-ninjaaa.herokuapp.com/api/${
                    this.state.wordLength
                }/words`
            )
            .then(res => res.data)
            .then(data => {
                this.setState(prevState => {
                    prevState.words = data.words
                    // set the first item the current item for highlighting
                    prevState.words[this.state.index][0].isCurrent = true
                    prevState.isFetching = false
                    return prevState
                })
            })

        clearInterval(this.state.timerID)
    }

    handleChange = e => {
        if (e.target.name === 'wordlength') {
            return this.setState({ wordLength: e.target.value })
        }

        let typed = e.target.value

        this.setState(prevState => {
            prevState.typedWord = typed
            return prevState
        })

        // if the user started typing start timer
        // decrement seconds every 1 sec
        if (!this.state.started && this.state.typedWord.length >= 0) {
            this.setState({ started: true })
            const timer1 = setInterval(this.countDown, 1000)
            !this.state.timerID && this.setState({ timerID: timer1 })
        }

        // grab the current WORD from the array
        let currentWordFromState = this.state.words[this.state.index][
            this.state.currentIndex
        ].word

        // grab the portion of the current word from the state
        let currentWord = currentWordFromState.substring(
            0,
            this.state.letterIndex
        )
        // grab the portion of the typed word from input
        let currentTyped = typed.substring(0, this.state.letterIndex)

        // if words dont match
        // change states so that the component will update
        if (currentWord !== currentTyped) {
            this.setState(prevState => {
                prevState.words[this.state.index][
                    this.state.currentIndex
                ].isCorrect = false
                prevState.words[this.state.index][
                    this.state.currentIndex
                ].isDoneTyping = true
            })

            // else everything typed is correct
        } else {
            this.setState(prevState => {
                prevState.words[this.state.index][
                    this.state.currentIndex
                ].isDoneTyping = false
            })
        }
    }

    handleKeyPress = e => {
        this.setState(prevState => (prevState.keyStrokes += 1))

        // if backspace is pressed
        // decrement letter index
        if (e.which === 8) {
            !this.state.letterIndex <= 0 &&
                this.setState(prevState => (prevState.letterIndex -= 1))
        } else {
            this.setState(prevState => (prevState.letterIndex += 1))
        }

        // if space is pressed
        if (e.which === 32) {
            this.setState(prevState => {
                prevState.letterIndex = 0
                prevState.numOfWordsTyped += 1
                prevState.error =
                    ((prevState.numOfWordsTyped - prevState.numOfCorrectWords) /
                        prevState.numOfWordsTyped) *
                    100
                prevState.accuracy = 100 - prevState.error
                prevState.typedWord = ''
                return prevState
            })

            // if the current item is the 20th item,
            // reproduce new words
            if (this.state.currentIndex >= 19) {
                if (this.state.index >= this.state.words.length - 1) {
                    console.log('done na!')
                    this.setState(prevState => {
                        prevState.isDone = true
                        prevState.typedWord = ''
                        return prevState
                    })
                    return
                }

                this.setState(prevState => {
                    prevState.index += 1
                    prevState.currentIndex = 0
                    prevState.words[this.state.index][
                        this.state.currentIndex
                    ].isCurrent = false
                    prevState.words[this.state.index + 1][0].isCurrent = true

                    return prevState
                })

                let lastWordIndex =
                    this.state.words[this.state.index].length - 1
                let lastWord = this.state.words[this.state.index][lastWordIndex]
                    .word

                if (lastWord === this.state.typedWord) {
                    this.setState(prevState => {
                        prevState.isDoneTyping = true
                        prevState.words[this.state.index][
                            lastWordIndex
                        ].isCurrent = false
                        prevState.words[this.state.index][
                            lastWordIndex
                        ].isCorrect = true
                        prevState.numOfCorrectWords += 1
                        prevState.typedWord = ''
                        return prevState
                    })
                }
                return
            }

            // increment current index
            this.setState(
                prevState =>
                    (prevState.currentIndex = prevState.currentIndex + 1)
            )

            // set the current item to true
            // id dunno why i add 1 to the current index again
            // a very small bug
            this.setState(
                prevState =>
                    (prevState.words[this.state.index][
                        this.state.currentIndex + 1
                    ].isCurrent = true)
            )

            // set typed word to empty
            this.setState(prevState => (prevState.typedWord = ''))

            //get current index
            let index = this.state.currentIndex
            // grab the current word from the array
            let currentWord = this.state.words[this.state.index][index].word

            // check if entered word is correct or not
            if (currentWord === this.state.typedWord) {
                this.setState(prevState => {
                    prevState.words[this.state.index][index].isCorrect = true
                    prevState.words[this.state.index][index].isDoneTyping = true
                    prevState.numOfCorrectWords += 1
                    return prevState
                })
            } else {
                this.setState(prevState => {
                    prevState.words[this.state.index][index].isDoneTyping = true
                    prevState.numOfMistakes += 1
                    return prevState
                })
            }

            // set the previous item as not the current item
            this.setState(prevState => {
                prevState.words[this.state.index][index].isCurrent = false
                prevState.typedWord = ''
                return prevState
            })
        }
    }

    render() {
        const {
            isFetching,
            isDone,
            time,
            words,
            index,
            accuracy,
            numOfWordsTyped,
            numOfCorrectWords,
            numOfMistakes,
            keyStrokes,
            typedWord,
            wordLength
        } = this.state

        let displayComponent =
            !isFetching &&
            !isDone &&
            words[index].map((item, index) => {
                return <Word key={index} item={item} />
            })

        return (
            <Fragment>
                <div className="top">
                    <Header />
                    <Brand />
                </div>
                <div className="parent">
                    <div
                        className="display"
                        style={{
                            height: (isFetching || isDone) && '20vh',
                            width: '100%'
                        }}
                    >
                        {displayComponent}
                        {(isDone || isFetching) && (
                            <Overlay
                                state={isDone ? 'done' : 'fetching'}
                                wpm={numOfWordsTyped}
                            />
                        )}
                    </div>

                    <div className="controls">
                        <Timer time={time} isDone={isDone} />

                        <Input
                            handleChange={this.handleChange}
                            handleKeyPress={this.handleKeyPress}
                            typedWord={typedWord}
                            isDone={isDone}
                            isFetching={isFetching}
                        />

                        <RetryButton handleClick={this.handleClick} />

                        <WordLength
                            handleChange={this.handleChange}
                            wordLength={wordLength}
                        />
                    </div>

                    <Result
                        result={{
                            accuracy: accuracy,
                            numOfCorrectWords: numOfCorrectWords,
                            numOfMistakes: numOfMistakes,
                            keyStrokes: keyStrokes
                        }}
                    />
                </div>

                <Links />
                <Footer />
            </Fragment>
        )
    }
}

export default App
