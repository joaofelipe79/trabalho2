const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.getElementById('current-player');
const gameStatusDisplay = document.getElementById('game-status');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;


function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            return gameBoard[a];
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        return 'Empate';
    }

    return null;
}


function handleCellClick(index) {
    if (!gameActive || gameBoard[index] !== '') return;

    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    const winner = checkWinner();

    if (winner) {
        if (winner === 'Empate') {
            gameStatusDisplay.textContent = 'Empate!';
        } else {
            gameStatusDisplay.textContent = `Jogador ${winner} venceu!`;
        }
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentPlayerDisplay.textContent = `Jogador ${currentPlayer}`;
    }
}

function restartGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    cells.forEach(cell => {
        cell.textContent = '';
    });

    gameStatusDisplay.textContent = '';
    currentPlayerDisplay.textContent = `Jogador ${currentPlayer}`;
}
const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', restartGame);

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});
