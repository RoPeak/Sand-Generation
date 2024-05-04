// Main variables
const squareSize = 30;
const marginSize = 200;
const grid = document.getElementById('grid');
let gridArr;

window.onload = mainLogic;
window.onresize = mainLogic;

function mainLogic() {
    // Calculate how many squares are needed
    const numSquaresX = Math.ceil((window.innerWidth - marginSize) / squareSize);
    const numSquaresY = Math.ceil((window.innerHeight -  marginSize) / squareSize);    

    // Adjust the grid to fit the exact number of squares
    grid.style.gridTemplateColumns = `repeat(${numSquaresX}, ${squareSize}px)`;
    grid.style.gridTemplateRows = `repeat(${numSquaresY}, ${squareSize}px)`;
    
    // Create and draw the grid
    gridArr = createGrid(numSquaresX, numSquaresY);
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
    while (grid.firstChild) {
        grid.firstChild.remove();
    }

    // Create the squares
    for (let i = 0; i < gridArr.length; i++) {
        for (let j = 0; j < gridArr[i].length; j++) {
            const square = document.createElement('div');
            square.className = 'square';
            if (gridArr[i][j] === 1) {
                square.classList.add('sand');
            }
            grid.appendChild(square);
        }
    }
}