class King extends Piece {
    kingMoves = [
        {x: -1, y: 1}, {x: 0, y: 1}, {x: 1, y: 1}, {x: -1, y: 0},
        {x: 1, y: 0}, {x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1}
    ];
    knightMoves = [
        {x: 2, y: -1}, {x: 2, y: 1}, {x: 1, y: -2}, {x: 1, y: 2},
        {x: -2, y: -1}, {x: -2, y: 1}, {x: -1, y: -2}, {x: -1, y: 2}
    ];

    constructor(white) {
        super(white);
        this.pieceLetter = 'k';
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

        if (!this.hasMoved && !this.isInCheck()) {
            let castleRight = this.canCastle(x, y, 1, false);
            let castleLeft = this.canCastle(x, y, -1, true);

            if (castleRight !== undefined)
                possibleMoves.push(castleRight);

            if (castleLeft !== undefined)
                possibleMoves.push(castleLeft);

        }

        return possibleMoves;
    }

    canCastle(x, y, xDelta, castleLong) {
        for (let i = 1; i < 3; i++) {
            let moveX = x + (xDelta * i);

            let checkedSquare = this.checkSquare(moveX, y);

            if (!checkedSquare) break;
            else if (checkedSquare === true) break;

            if (checkedSquare.capture) break;

            if (i === 2) {
                if (castleLong) {
                    if (board[y][moveX + xDelta].piece instanceof Piece) return;

                    let rook = board[y][0].piece;
                    if (rook instanceof Rook && !rook.hasMoved) {
                        checkedSquare.type = type.castle;
                        return checkedSquare;
                    }
                } else {
                    let rook = board[y][7].piece;
                    if (rook instanceof Rook && !rook.hasMoved) {
                        checkedSquare.type = type.castle;
                        return checkedSquare;
                    }
                }
            }
        }
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

        for (let knightMove of this.knightMoves) {
            if (this.isInCheckAdjacent(x, y, knightMove.x, knightMove.y, Knight)) return true;
        }

        for (let kingMove of this.kingMoves) {
            if (kingMove.x !== 0 && kingMove.y !== 0) {
                if (this.isInCheckLine(x, y, kingMove.x, kingMove.y, Bishop, Queen)) return true;

                if (kingMove.y === -1) {
                    if (this.white) {
                        if (this.isInCheckAdjacent(x, y, kingMove.x, kingMove.y, King)) return true;
                    } else {
                        if (this.isInCheckAdjacent(x, y, kingMove.x, kingMove.y, Pawn, King)) return true;
                    }
                } else {
                    if (this.white) {
                        if (this.isInCheckAdjacent(x, y, kingMove.x, kingMove.y, Pawn, King)) return true;
                    } else {
                        if (this.isInCheckAdjacent(x, y, kingMove.x, kingMove.y, King)) return true;
                    }
                }
            } else {
                if (this.isInCheckLine(x, y, kingMove.x, kingMove.y, Rook, Queen)) return true;
                if (this.isInCheckAdjacent(x, y, kingMove.x, kingMove.y, King)) return true;
            }
        }

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
