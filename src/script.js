// Main variables
const squareSize = 30;
const marginSize = 50;
const grid = document.getElementById('grid');
let gridArr;

window.onload = mainLogic;
window.onresize = mainLogic;

function mainLogic() {
    // Calculate how many squares are needed
    const numSquares = Math.min(
        Math.floor((window.innerWidth - 2 * marginSize) / squareSize),
        Math.floor((window.innerHeight - 2 * marginSize) / squareSize)
    );

    // Adjust the grid to fit the exact number of squares
    grid.style.gridTemplateColumns = `repeat(${numSquares}, ${squareSize}px)`;
    grid.style.gridTemplateRows = `repeat(${numSquares}, ${squareSize}px)`;

    // Create and draw the grid
    gridArr = createGrid(numSquares, numSquares);
    drawGrid(gridArr);
}

function createGrid(numSquaresX, numSquaresY) {
    var gridArr = new Array(numSquaresX);
    for (let i = 0; i < gridArr.length; i++) {
        gridArr[i] = new Array(numSquaresY);
        for (let j = 0; j < gridArr[i].length; j++) {
            gridArr[i][j] = 0;
        }
    }
    return gridArr
}

function drawGrid(gridArr) {
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