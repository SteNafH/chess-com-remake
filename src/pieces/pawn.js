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
            let newPosition = board[y + yDelta][x];
            if (!this.isCheck(this.parentNode, newPosition))
                possibleMoves.push({square: board[y + yDelta][x], capture: false, sound: currentPlayer === this.white ? moveType.moveSelf : moveType.moveOpponent});

            if (!this.hasMoved && board[y + yDelta + yDelta][x].piece === null) {
                let newPosition = board[y + yDelta + yDelta][x];
                if (!this.isCheck(this.parentNode, newPosition))
                    possibleMoves.push({square: newPosition, capture: false, sound: currentPlayer === this.white ? moveType.moveSelf : moveType.moveOpponent});
            }
        }

        if (!this.checkOutOfBounds(x + 1, y + yDelta)) {
            let newPosition = board[y + yDelta][x + 1];
            if (newPosition.piece !== null && newPosition.piece.white !== this.white) {
                if (!this.isCheck(this.parentNode, newPosition))
                    possibleMoves.push({square: newPosition, capture: newPosition.piece instanceof Piece, sound: moveType.capture});
            }
        }

        if (!this.checkOutOfBounds(x - 1, y + yDelta)) {
            let newPosition = board[y + yDelta][x - 1];

            if (newPosition.piece !== null && newPosition.piece.white !== this.white) {
                if (!this.isCheck(this.parentNode, newPosition))
                    possibleMoves.push({square: newPosition, capture: newPosition.piece instanceof Piece, sound: moveType.capture});
            }
        }

        return possibleMoves;
    }
}

customElements.define('chess-pawn', Pawn);
