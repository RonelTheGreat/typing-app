const express = require('express'),
    path = require('path'),
    PORT = process.env.PORT || 5000,
    app = express(),
    fs = require('fs')

app.use(express.static(path.join(__dirname, 'build')))
app.use(express.static(path.join(__dirname, 'text files')))

app.get('/api/:length/words', (req, res) => {
    const length = req.params.length
    // grab the current directory of words.txt file
    const wordsDir = path.join(__dirname, `/text files/${length} words.txt`)

    // read the txt file
    fs.readFile(wordsDir, (err, data) => {
        if (err) return console.log(`ERROR READING FILE: ${err}`)

        let wordList = []
        let itemList = []
        let setOfWords = []

        // split data into individual single word
        const words = data.toString().split('\n')

        // filter according to specified length
        if (length === 'short') {
            setOfWords = words.filter(
                word => word.length > 3 && word.length <= 5
            )
        } else {
            setOfWords = words
        }

        // generate random number list
        const randNumList = generateRandNumList(220, setOfWords.length - 1)

        // loop through each random number
        // and select random words from the set of words
        randNumList.forEach(num => {
            // grab selected random word from the list
            const selectedWord = setOfWords[num]

            // push every word item to its own list
            itemList.push({
                word: selectedWord,
                isCorrect: false,
                isDoneTyping: false,
                isCurrent: false
            })

            // if item list reaches a certain length
            // insert the new item list to word list
            // empty the itemList array and add new set of words
            if (itemList.length >= 20) {
                wordList.push(itemList)
                itemList = []
            }
        })

        res.json({ words: wordList })
    })
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// random number generator
// returns an ARRAY of random numbers
// @params { no. of iterations (i.e. how many times to generate a random number) }
//         { limit (i.e. from ZERO to the given limit) }
const generateRandNumList = (iterations, limit) => {
    let randNumList = []

    for (let i = 0; i < iterations; i++) {
        const randNum = Math.floor(Math.random() * limit)
        // if no duplicate is found
        // push new random number to array
        !randNumList.find(num => num === randNum) && randNumList.push(randNum)
    }

    return randNumList
}

// SERVER listener
app.listen(PORT, () => console.log(`LISTENING TO PORT: ${PORT}`))
