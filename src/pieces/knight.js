class Knight extends Piece {
    knightMoves = [
        {x: 2, y: -1}, {x: 2, y: 1}, {x: 1, y: -2}, {x: 1, y: 2},
        {x: -2, y: -1}, {x: -2, y: 1}, {x: -1, y: -2}, {x: -1, y: 2}
    ];

    constructor(white) {
        super(white);
    }

    get getPieceLetter() {
        return "n";
    }

    getMoves(_y, _x) {
        let x = parseInt(_x);
        let y = parseInt(_y);

        let possibleMoves = [];
        for (let move of this.knightMoves) {
            let row = y + move.y;
            let column = x + move.x;

            if (row < 0 || column < 0 || column > 7 || row > 7) continue;

            let newPosition = board[row][column];

            if (newPosition.piece !== null && newPosition.piece.white === this.white) continue;

            let capture = false;
            if (newPosition.piece !== null && newPosition.piece.white !== this.white) capture = true;

            let currentMove = {
                square: newPosition,
                capture: capture
            }

            possibleMoves.push(currentMove);
        }

        return possibleMoves;
    }
}

customElements.define('chess-knight', Knight);
