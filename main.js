const board = document.querySelector('.game__container')
const keyboard = document.querySelector('.game__keyboard')

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
let firstTile = boardRow.firstChild
firstTile.style.border = "3px solid #538D4E"

document.addEventListener('keydown', (e) => {
  let letter = e.key.toLowerCase()
  if (letter === 'enter') {
    checkWinner()
  }

  if (letter === 'backspace') {
    removeLastLetter()
  }

  if (/^[a-z]$/.test(letter)) {
    currentWord += letter
    updateBoard(letter)
  }
  console.log(currentWord)
}) // todo refactor to remove multple if's

function updateBoard(letter) {
  let tile = boardRow.firstChild

  for (let i = 0; i < currentWord.length; i++) {
    tile.textContent = currentWord[i]
    updateBackground(tile, i, letter)
    tile = tile.nextSibling
    tile.style.border = "2px solid #538D4E"
  }
}

function removeLastLetter() {
  let len = currentWord.length
  currentWord = currentWord.substring(0, len - 1)
}

function updateKeyboard(letter, status) {
  console.log(letter, status)

  keys.forEach(key => {
    if (key.classList.contains(letter)) {
      key.classList.add(status)
      key.style.border = 'none'
    }
  })
}

function updateBackground(tile, i, letter) {
  let status = ''

  if(secretWord[i] === currentWord[i]) {
    status = 'correct'
    tile.classList.add(status)
  } else if (secretWord.includes(currentWord[i])){
    status = 'misplaced'
    tile.classList.add(status)
  } else {
    status = 'wrong'
    tile.classList.add(status)
  }
  updateKeyboard(letter, status)
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
  boardRow.firstChild.style.border = "2px solid #538D4E"
}

buildKeyboard('qwertyuiop')
buildKeyboard('asdfghjkl')
buildKeyboard('zxcvbnm')

function buildKeyboard(keyboardRow) {

  let row = document.createElement('div')
  row.className = 'keyboard__row'

  for (let j = 0; j < keyboardRow.length; j++) {
    let key = document.createElement('div')
    // also add the class of the lowercase char to make comparison easier
    key.className = `key ${keyboardRow[j]}`
    key.textContent = keyboardRow[j]
    row.appendChild(key)
  }
  keyboard.appendChild(row)
}

const keys = Array.from(document.querySelectorAll('.key'))