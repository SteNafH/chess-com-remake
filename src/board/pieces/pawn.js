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
        let yDelta = this.isWhiteDirection;

        let possibleMoves = [];
        if (!this.checkOutOfBounds(x, y + yDelta) && board[y + yDelta][x].piece === null) {
            let newPosition = board[y + yDelta][x];
            if (!this.isCheck(this.parentNode, newPosition)) {
                possibleMoves.push({square: board[y + yDelta][x], type: type.default});

                if (!this.hasMoved && board[y + yDelta + yDelta][x].piece === null) {
                    let newPosition = board[y + yDelta + yDelta][x];
                    if (!this.isCheck(this.parentNode, newPosition))
                        possibleMoves.push({square: newPosition, type: type.default});
                }
            }
        }

        if (!this.checkOutOfBounds(x + 1, y + yDelta)) {
            let newPosition = board[y + yDelta][x + 1];
            if (newPosition.piece !== null && newPosition.piece.white !== this.white) {
                if (!this.isCheck(this.parentNode, newPosition))
                    possibleMoves.push({square: newPosition, type: newPosition.piece instanceof Piece ? type.capture : type.enpassant});
            }
        }

        if (!this.checkOutOfBounds(x - 1, y + yDelta)) {
            let newPosition = board[y + yDelta][x - 1];

            if (newPosition.piece !== null && newPosition.piece.white !== this.white) {
                if (!this.isCheck(this.parentNode, newPosition))
                    possibleMoves.push({square: newPosition, type: newPosition.piece instanceof Piece ? type.capture : type.enpassant});
            }
        }

        return possibleMoves;
    }
}

customElements.define('chess-pawn', Pawn);
