window.onload = createGrid;
window.onresize = createGrid;

function createGrid() {
    // Clear existing squares
    const grid = document.getElementById('grid')
    while (grid.firstChild) {
        grid.firstChild.remove();
    }

    // Setup grid
    const squareSize = 30;
    const marginSize = 200;
    const numSquaresX = Math.ceil((window.innerWidth - marginSize) / squareSize);
    const numSquaresY = Math.ceil((window.innerHeight -  marginSize) / squareSize);
    const totalSquares = numSquaresX * numSquaresY;

    // Adjust the grid to fit the exact number of squares
    grid.style.gridTemplateColumns = `repeat(${numSquaresX}, ${squareSize}px)`;
    grid.style.gridTemplateRows = `repeat(${numSquaresY}, ${squareSize}px)`;

    console.log(numSquaresX);
    console.log(numSquaresY);

    var gridArr = new Array(numSquaresX);
    for (let i = 0; i < gridArr.length; i++) {
        gridArr[i] = new Array(numSquaresY);
        for (let j = 0; j < gridArr[i].length; j++) {
            gridArr[i][j] = 0;
        }
    }

    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.className = 'square';
        grid.appendChild(square);
    }
}