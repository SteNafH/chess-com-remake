class Pawn extends Piece {
    constructor(white) {
        super(white);
    }

    get getPieceLetter() {
        return "p";
    }

    getMoves(_y, _x) {
        let x = parseInt(_x);
        let y = parseInt(_y);
        let yDelta = this.white ? 1 : -1;

        let possibleMoves = [];
        if (!this.checkOutOfBounds(x, y + yDelta) && board[y + yDelta][x].piece === null) {
            possibleMoves.push({square: board[y + yDelta][x], capture: false});

            if ((y === 1 && this.white && board[3][x].piece === null) || (y === 6 && !this.white && board[4][x].piece === null)) {
                possibleMoves.push({square: board[y + yDelta + yDelta][x], capture: false});
            }
        }

        if (!this.checkOutOfBounds(x + 1, y + yDelta)) {
            let newPosition = board[y + yDelta][x + 1];
            if (newPosition.piece !== null && newPosition.piece.white !== this.white) {
                possibleMoves.push({square: newPosition, capture: newPosition.piece.getPieceLetter !== "e"});
            }
        }

        if (!this.checkOutOfBounds(x - 1, y + yDelta)) {
            let newPosition = board[y + yDelta][x - 1];
            if (newPosition.piece !== null && newPosition.piece.white !== this.white) {
                possibleMoves.push({square: newPosition, capture: newPosition.piece.getPieceLetter !== "e"});
            }
        }

        return possibleMoves;
    }
}

customElements.define('chess-pawn', Pawn);
