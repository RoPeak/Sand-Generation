// Main variables
const squareSize = 20;
const marginSize = 80;
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

    let isMouseDown = false;

    // The gravity effect only begins once the user has placed some sand
    window.onmouseup = function() {
        intervalID = setInterval(function() {
            applyGravity();
            drawGrid();
        }, 50);
        isMouseDown = false;
    }

    // Handle mouse move event
    window.onmousemove = function(event) {
        if (isMouseDown) {
            // Get grid offset
            const rect = grid.getBoundingClientRect();

            // Calculate the grid coordinates based on the mouse position
            const y = Math.floor((event.clientX - rect.left) / squareSize);
            const x = Math.floor((event.clientY - rect.top) / squareSize);

            // Check that coords are within the grid
            if (x >= 0 && x < gridArr.length && y >= 0 && y < gridArr[0].length) {
                // Add sand where the mouse is
                gridArr[x][y] = 1;
            }
            drawGrid();
        }
    }

    // Stop the interval when the mouse button is pressed
    window.onmousedown = function() {
        clearInterval(intervalID);
        isMouseDown = true;
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

function resetGrid() {
    for (let i = 0; i < gridArr.length; i++) {
        for (let j = 0; j < gridArr[i].length; j++) {
            gridArr[i][j] = 0;
        }
    }
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