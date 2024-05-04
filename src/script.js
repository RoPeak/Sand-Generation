window.onload = function() {
    // Setup grid
    const grid = document.getElementById('grid')
    const squareSize = 30;
    const numSquaresX = Math.ceil(window.innerWidth / squareSize);
    const numSquaresY = Math.ceil(window.innerHeight / squareSize);
    const totalSquares = numSquaresX + numSquaresY;

    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.className = 'square';
        grid.appendChild(square);
    }
}