class King extends Piece {

    constructor(white) {
        super(white);
    }

    get getPieceLetter() {
        return "k";
    }

    getMoves(_y, _x) {
        let x = parseInt(_x);
        let y = parseInt(_y);


        return "";
    }

    isInCheck() {
        let x = this.parentNode.x;
        let y = this.parentNode.y;

        console.log(this.isInCheckAdjacent(x, y, -1, 1, Pawn, King))
        console.log(this.isInCheckAdjacent(x, y, 0, 1, King))
        console.log(this.isInCheckAdjacent(x, y, 1, 1, Pawn, King))
        console.log(this.isInCheckAdjacent(x, y, -1, 0, King))
        console.log(this.isInCheckAdjacent(x, y, 1, 0, King,))
        console.log(this.isInCheckAdjacent(x, y, -1, -1, Pawn, King))
        console.log(this.isInCheckAdjacent(x, y, 0, -1, King))
        console.log(this.isInCheckAdjacent(x, y, 1, -1, Pawn, King))

        console.log(this.isInCheckLine(x, y, -1, 1, Bishop, Queen));
        console.log(this.isInCheckLine(x, y, 1, -1, Bishop, Queen));
        console.log(this.isInCheckLine(x, y, -1, -1, Bishop, Queen));
        console.log(this.isInCheckLine(x, y, 1, 1, Bishop, Queen));

        console.log(this.isInCheckLine(x, y, 0, 1, Rook, Queen));
        console.log(this.isInCheckLine(x, y, -1, 0, Rook, Queen));
        console.log(this.isInCheckLine(x, y, 1, 0, Rook, Queen));
        console.log(this.isInCheckLine(x, y, 0, -1, Rook, Queen));
    }

    isInCheckAdjacent(x, y, xDelta, yDelta, ...possiblePieces) {
        let moveX = x + xDelta;
        let moveY = y + yDelta;

        let check = this.isCheck(moveX, moveY, possiblePieces);
        return !!check;
    }

    isInCheckLine(x, y, xDelta, yDelta, ...possiblePieces) {
        for (let i = 1; i < 8; i++) {
            let moveX = x + (xDelta * i);
            let moveY = y + (yDelta * i);

            let check = this.isCheck(moveX, moveY, possiblePieces);

            if (check === null) continue;

            if (!check) break;

            return true;
        }

        return false;
    }

    isCheck(moveX, moveY, possiblePieces) {
        if (this.checkOutOfBounds(moveX, moveY)) return false;

        let newPosition = board[moveY][moveX];

        if (newPosition.piece === null) {
            return null;
        }

        if (newPosition.piece.white === this.white) {
            return false;
        }

        for (let piece of possiblePieces) {
            if (newPosition.piece instanceof piece) return true;
        }

        return false;
    }
}

customElements.define('chess-king', King);
