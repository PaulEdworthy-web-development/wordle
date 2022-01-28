const board = document.querySelector('.game__container')
const keyboard = document.querySelector('.game__keyboard')
const keys = Array.from(document.querySelectorAll('.key'))

const secretWord = 'guess'
const wordLength = 5;
const rows = 6
const columns = wordLength
let guesses = 0
let currentWord = ''
let wordsGuessed = []

buildGameBoard()

function buildGameBoard() {
  for (let i = 0; i < rows; i++) {
    let row = document.createElement('div')
    row.className = 'game__row'

    for (let j = 0; j < columns; j++) {
      let tile = document.createElement('div')
      tile.className = 'game__tile'
      row.appendChild(tile)
    }
    board.appendChild(row)
  }
}
let boardRow = board.firstChild

document.addEventListener('keyup', (e) => {

  let letter = e.key.toLowerCase()
  if (letter === 'enter') {
    checkWinner()
  }
  if (/^[a-z]$/.test(letter)) {
    currentWord += letter
    updateBoard()
  }
})

function updateBoard() {
  let tile = boardRow.firstChild
  
  for (let i = 0; i < currentWord.length; i++) {
    tile.textContent = currentWord[i]
    updateBackground(tile, i)
    tile = tile.nextSibling
  }
}

function updateKeyboard(letter) {
  keys.forEach( key => {
  })
}
// if ((key.textContent.toLowerCase() === letter) && (currentWord.includes(letter))) {
//   key.classList.add('misplaced')
// }

function updateBackground(tile, i) {
  if(secretWord[i] === currentWord[i]) {
    tile.classList.add('correct')
  } else if (secretWord.includes(currentWord[i])){
    tile.classList.add('misplaced')
  } else {
    tile.classList.add('wrong')
  }
  // updateKeyboard()
  tile.style.border = 'none'
}

function checkWinner() {
  if (currentWord.length === secretWord.length) {
    if (currentWord === secretWord) {
      alert('WINNER!')
    }
  } 
  wordsGuessed.push(currentWord)
  currentWord = ''

  if (wordsGuessed.length === 6) {
    alert('GAME OVER')
  }

  boardRow = boardRow.nextSibling
}

// Build the keyboard
const firstRow = 'qwertyuiop'
const secondRow = 'asdfghjkl'
const thirdRow = 'zxcvbnm'
buildKeyboard(firstRow)
buildKeyboard(secondRow)
buildKeyboard(thirdRow)

function buildKeyboard(keyboardRow) {

  let row = document.createElement('div')
  row.className = 'keyboard__row'

  for (let j = 0; j < keyboardRow.length; j++) {
    let key = document.createElement('div')
    key.className = 'key'
    key.textContent = keyboardRow[j]
    row.appendChild(key)
  }
  keyboard.appendChild(row)
}