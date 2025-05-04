document.addEventListener('DOMContentLoaded', init);

let initialPuzzleState = [null, 1, 2, 3, 4, 5, 6, 7, 8]; // null represents the empty cell
let puzzleState = [...initialPuzzleState];

function init() {
    createPuzzle();
}

function createPuzzle() {
    const puzzleElement = document.getElementById('puzzle');

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = initialPuzzleState[i] !== null ? initialPuzzleState[i] : '';
        cell.addEventListener('click', () => handleCellClick(i));
        puzzleElement.appendChild(cell);

        if (initialPuzzleState[i] === null) {
            cell.classList.add('empty');
        }
    }
  
let puzzleState = [...initialPuzzleState];
}


function handleCellClick(index) {
    const emptyIndex = puzzleState.indexOf(null);

    if (isAdjacent(index, emptyIndex)) {
        // Swap the clicked cell with the empty cell
        [puzzleState[index], puzzleState[emptyIndex]] = [puzzleState[emptyIndex], puzzleState[index]];
        updatePuzzle();
    }

    if (checkWin()) {
        showPopup();
    }
}


function isAdjacent(index1, index2) {
    const adjacentIndices = [
        [1, 3], [0, 2, 4], [1, 5],
        [0, 4, 6], [1, 3, 5, 7], [2, 4, 8],
        [3, 7], [4, 6, 8], [5, 7]
    ];

    return adjacentIndices[index1].includes(index2);
}

function updatePuzzle() {
    const puzzleElement = document.getElementById('puzzle');
    const cells = puzzleElement.getElementsByClassName('cell');

    for (let i = 0; i < 9; i++) {
        cells[i].textContent = puzzleState[i] !== null ? puzzleState[i] : '';
        cells[i].classList.toggle('empty', puzzleState[i] === null);
    }
}

function checkWin() {
    for (let i = 0; i < puzzleState.length; i++) {
        if (puzzleState[i] !== initialPuzzleState[i]) {
            return false;
        }
    }
    return true;
}

function startPuzzle() {
    // Shuffle a copy of the initial puzzle pieces
    puzzleState = [...initialPuzzleState].sort(() => Math.random() - 0.5);
    updatePuzzle();
}

function resetPuzzle() {
    puzzleState = [...initialPuzzleState];
    updatePuzzle();
}

function showPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'flex';
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
    resetPuzzle();
}
