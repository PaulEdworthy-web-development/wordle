const board = document.querySelector('.game__container')

const secretWord = 'guess'
const wordLength = 5;
const rows = 6
const columns = 5
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

function updateBoard() {

  let tile = boardRow.firstChild
  
  for (let i = 0; i < currentWord.length; i++) {
    tile.textContent = currentWord[i]
    updateBackground(tile, i)
    tile = tile.nextSibling
  }
}

function updateBackground(tile, i) {

  if(secretWord[i] === currentWord[i]) {
    tile.classList.add('correct')
  } else if (secretWord.includes(currentWord[i])){
    tile.classList.add('misplaced')
  } else {
    tile.classList.add('wrong')
  }
  tile.style.border = 'none'
}
