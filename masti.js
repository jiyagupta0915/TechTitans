const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = '👻';
let boardState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', cellClick);
});

restartBtn.addEventListener('click', restartGame);

function cellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (boardState[index] !== '' || !isGameActive) {
        return;
    }

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkResult();
}

function checkResult() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            message.textContent = `${currentPlayer} wins!`;
            isGameActive = false;
            return;
        }
    }

    if (!boardState.includes('')) {
        message.textContent = 'It\'s a draw!';
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === '👻' ? '🪸' : '👻';
}

function restartGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = '👻';
    message.textContent = '';-
    cells.forEach(cell => {
        cell.textContent = '';
    });
}