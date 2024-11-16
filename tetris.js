const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');

// Set the grid size and block size
const ROWS = 20;
const COLUMNS = 10;
const BLOCK_SIZE = 30;

// Initialize the game variables
let board = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(0));
let currentPiece;
let gameInterval;
let score = 0;

// Tetrimino shapes
const TETROMINOS = [
  [[1, 1, 1], [0, 1, 0]], // T
  [[1, 1, 1, 1]], // I
  [[1, 1], [1, 1]], // O
  [[0, 1, 1], [1, 1, 0]], // S
  [[1, 1, 0], [0, 1, 1]], // Z
  [[1, 0, 0], [1, 1, 1]], // L
  [[0, 0, 1], [1, 1, 1]]  // J
];

// Current piece position and rotation
let pieceX = 3;
let pieceY = 0;
let pieceRotation = 0;

// Start the game
function startGame() {
  board = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(0));
  currentPiece = generateRandomPiece();
  pieceX = 3;
  pieceY = 0;
  score = 0;
  document.getElementById('score').textContent = 'Score: ${score}';
  
  if (gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, 500);
}

// Game loop
function gameLoop() {
  if (isCollision(pieceX, pieceY + 1, currentPiece)) {
    placePiece();
    clearLines();
    currentPiece = generateRandomPiece();
    pieceX = 3;
    pieceY = 0;
    if (isCollision(pieceX, pieceY, currentPiece)) {
      clearInterval(gameInterval);
      alert('Game Over!');
      return;
    }
  } else {
    pieceY++;
  }
  
  draw();
}

// Generate a random piece
function generateRandomPiece() {
  const randomIndex = Math.floor(Math.random() * TETROMINOS.length);
  return TETROMINOS[randomIndex];
}

// Check for collision
function isCollision(x, y, piece) {
  for (let row = 0; row < piece.length; row++) {
    for (let col = 0; col < piece[row].length; col++) {
      if (piece[row][col] === 1) {
        if (y + row >= ROWS || x + col < 0 || x + col >= COLUMNS || board[y + row][x + col] !== 0) {
          return true;
        }
      }
    }
  }
  return false;
}

// Place the piece on the board
function placePiece() {
  for (let row = 0; row < currentPiece.length; row++) {
    for (let col = 0; col < currentPiece[row].length; col++) {
      if (currentPiece[row][col] === 1) {
        board[pieceY + row][pieceX + col] = 1;
      }
    }
  }
  score += 10;
  document.getElementById('score').textContent = 'Score: ${score}';
}

// Clear full lines
function clearLines() {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row].every(cell => cell !== 0)) {
      board.splice(row, 1);
      board.unshift(Array(COLUMNS).fill(0));
    }
  }
}

// Draw the board and current piece
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the board
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS; col++) {
      if (board[row][col] === 1) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
    }
  }

  // Draw the current piece
  for (let row = 0; row < currentPiece.length; row++) {
    for (let col = 0; col < currentPiece[row].length; col++) {
      if (currentPiece[row][col] === 1) {
        ctx.fillStyle = 'red';
        ctx.fillRect((pieceX + col) * BLOCK_SIZE, (pieceY + row) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        ctx.strokeStyle = 'white';
        ctx.strokeRect((pieceX + col) * BLOCK_SIZE, (pieceY + row) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
    }
  }
}

// Key event handlers
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    if (!isCollision(pieceX - 1, pieceY, currentPiece)) pieceX--;
  } else if (e.key === 'ArrowRight') {
    if (!isCollision(pieceX + 1, pieceY, currentPiece)) pieceX++;
  } else if (e.key === 'ArrowDown') {
    if (!isCollision(pieceX, pieceY + 1, currentPiece)) pieceY++;
  } else if (e.key === 'ArrowUp') {
    const rotatedPiece = rotatePiece(currentPiece);
    if (!isCollision(pieceX, pieceY, rotatedPiece)) {
      currentPiece = rotatedPiece;
    }
  }
});

// Rotate the current piece
function rotatePiece(piece) {
  const newPiece = piece[0].map((_, index) => piece.map(row => row[index]));
  return newPiece.reverse();
}