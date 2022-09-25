class King extends Piece {
    kingMoves = [
        {x: -1, y: 1}, {x: 0, y: 1}, {x: 1, y: 1}, {x: -1, y: 0},
        {x: 1, y: 0}, {x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1}
    ];

    constructor(white) {
        super(white);
    }

    get getPieceLetter() {
        return "k";
    }

    getMoves(_y, _x) {
        let x = parseInt(_x);
        let y = parseInt(_y);

        let possibleMoves = [];
        for (let move of this.kingMoves) {
            let moveY = y + move.y;
            let moveX = x + move.x;

            let checkedSquare = this.checkSquare(moveX, moveY);

            if (typeof checkedSquare === 'boolean') continue;

            possibleMoves.push(checkedSquare);
        }

        return possibleMoves;
    }

    isCheck(prevPos, newPos) {
        prevPos.piece = null;
        let newPosPiece = newPos.piece;
        newPos.piece = this;

        //printBoard();

        let check = this.isInCheck(newPos);

        prevPos.piece = this;
        newPos.piece = newPosPiece;

        return check;
    }

    isInCheck(kingSquare = this.parentNode) {
        let x = kingSquare.x;
        let y = kingSquare.y;

        if (this.isInCheckAdjacent(x, y, 2, -1, Knight)) return true;
        if (this.isInCheckAdjacent(x, y, 2, 1, Knight)) return true;
        if (this.isInCheckAdjacent(x, y, 1, -2, Knight)) return true;
        if (this.isInCheckAdjacent(x, y, 1, 2, Knight)) return true;
        if (this.isInCheckAdjacent(x, y, -2, -1, Knight)) return true;
        if (this.isInCheckAdjacent(x, y, -2, 1, Knight)) return true;
        if (this.isInCheckAdjacent(x, y, -1, -2, Knight)) return true;
        if (this.isInCheckAdjacent(x, y, -1, 2, Knight)) return true;

        if (this.isInCheckAdjacent(x, y, -1, 1, Pawn, King)) return true;
        if (this.isInCheckAdjacent(x, y, 0, 1, King)) return true;
        if (this.isInCheckAdjacent(x, y, 1, 1, Pawn, King)) return true;
        if (this.isInCheckAdjacent(x, y, -1, 0, King)) return true;
        if (this.isInCheckAdjacent(x, y, 1, 0, King,)) return true;
        if (this.isInCheckAdjacent(x, y, -1, -1, Pawn, King)) return true;
        if (this.isInCheckAdjacent(x, y, 0, -1, King)) return true;
        if (this.isInCheckAdjacent(x, y, 1, -1, Pawn, King)) return true;

        if (this.isInCheckLine(x, y, -1, 1, Bishop, Queen)) return true;
        if (this.isInCheckLine(x, y, 1, -1, Bishop, Queen)) return true;
        if (this.isInCheckLine(x, y, -1, -1, Bishop, Queen)) return true;
        if (this.isInCheckLine(x, y, 1, 1, Bishop, Queen)) return true;

        if (this.isInCheckLine(x, y, 0, 1, Rook, Queen)) return true;
        if (this.isInCheckLine(x, y, -1, 0, Rook, Queen)) return true;
        if (this.isInCheckLine(x, y, 1, 0, Rook, Queen)) return true;
        if (this.isInCheckLine(x, y, 0, -1, Rook, Queen)) return true;

        return false;
    }

    isInCheckAdjacent(x, y, xDelta, yDelta, ...possiblePieces) {
        let moveX = x + xDelta;
        let moveY = y + yDelta;

        let check = this.isInCheckSquare(moveX, moveY, possiblePieces);
        return !!check;
    }

    isInCheckLine(x, y, xDelta, yDelta, ...possiblePieces) {
        for (let i = 1; i < 8; i++) {
            let moveX = x + (xDelta * i);
            let moveY = y + (yDelta * i);

            let check = this.isInCheckSquare(moveX, moveY, possiblePieces);

            if (check === null) continue;

            if (!check) break;

            return true;
        }

        return false;
    }

    isInCheckSquare(moveX, moveY, possiblePieces) {
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
