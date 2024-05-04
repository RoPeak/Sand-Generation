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
    const marginSize = 100;
    const numSquaresX = Math.ceil((window.innerWidth - 2 * marginSize) / squareSize);
    const numSquaresY = Math.ceil((window.innerHeight - 2 * marginSize) / squareSize);
    const totalSquares = numSquaresX * numSquaresY;

    // Adjust the grid to fit the exact number of squares
    grid.style.gridTemplateColumns = `repeat(${numSquaresX}, ${squareSize}px)`;
    grid.style.gridTemplateRows = `repeat(${numSquaresY}, ${squareSize}px)`;

    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.className = 'square';
        grid.appendChild(square);
    }
}