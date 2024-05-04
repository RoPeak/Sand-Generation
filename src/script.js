// Main variables
const squareSize = 30;
const marginSize = 50;
const grid = document.getElementById('grid');
let gridArr;
let intervalID;

window.onload = mainLogic;
window.onresize = function() {
    resizeGrid(gridArr);
    drawGrid();
};

function mainLogic() {
    // Create and draw the grid
    gridArr = createGrid();
    drawGrid();

    // Apply gravity and redraw the grid every 100 ms
    intervalID = setInterval(function() {
        applyGravity();
        drawGrid();
    }, 10);

    // Stop the interval when the mouse button is pressed
    window.onmousedown = function() {
        clearInterval(intervalID);
    }

    window.onmouseup = function() {
        intervalID = setInterval(function() {
            applyGravity();
            drawGrid();
        }, 200)
    }
}

function calcNumSquares() {
    // Calculate how many squares are needed
    const numSquares = Math.min(
        Math.floor((window.innerWidth - 2 * marginSize) / squareSize),
        Math.floor((window.innerHeight - 2 * marginSize) / squareSize)
    );
    return numSquares;
}

function createGrid() {
    // Calculate number of squares needed
    const numSquares = calcNumSquares();

    // Adjust the grid to fit the exact number of squares
    grid.style.gridTemplateColumns = `repeat(${numSquares}, ${squareSize}px)`;
    grid.style.gridTemplateRows = `repeat(${numSquares}, ${squareSize}px)`;

    let gridArr = new Array(numSquares);
    for (let i = 0; i < gridArr.length; i++) {
        gridArr[i] = new Array(numSquares);
        for (let j = 0; j < gridArr[i].length; j++) {
            gridArr[i][j] = 0;
        }
    }
    return gridArr
}

function drawGrid() {
    // Clear the grid
    grid.innerHTML = '';

    // Create the squares
    for (let i = 0; i < gridArr.length; i++) {
        for (let j = 0; j < gridArr[i].length; j++) {
            const square = document.createElement('div');
            square.className = 'square';
            if (gridArr[i][j] === 1) {
                square.classList.add('sand');
            }

            // Add event listener for user click
            square.addEventListener('click', function() {
                gridArr[i][j] = 1;
                drawGrid(gridArr);
            })
            
            grid.appendChild(square);
        }
    }
}

function resizeGrid(oldGrid) {
    let newGrid = createGrid()
    for (let i = 0; i < Math.min(oldGrid.length, newGrid.length); i++) {
        for (let j = 0; j < Math.min(oldGrid[i].length, newGrid.length); j++) {
            newGrid[i][j] = oldGrid[i][j];
        }
    }
    gridArr = newGrid;
}

function applyGravity() {
    for (let i = gridArr.length - 2; i >= 0; i--) {
        for (let j = 0; j < gridArr[i].length; j++) {
            if (gridArr[i][j] === 1 && gridArr[i+1][j] === 0) {
                gridArr[i][j] = 0;
                gridArr[i+1][j] = 1;
            }
        }
    }
}