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

        if (!this.hasMoved) {

            let castleRight = this.canCastle(x, y, 1);
            let castleLeft = this.canCastle(x, y, -1);

            if (castleRight !== undefined)
                possibleMoves.push(castleRight);

            if (castleLeft !== undefined)
                possibleMoves.push(castleLeft);
            console.log(castleRight)
            console.log(castleLeft)

            // for (let i = 1; i < 3; i++) {
            //     let moveX = x + i;
            //
            //     let checkedSquare = this.checkSquare(moveX, y);
            //
            //     if (!checkedSquare) break;
            //     else if (checkedSquare === true) break;
            //
            //     if (checkedSquare.capture) break;
            //
            //     if (i === 2 && board[y][x + i + 1].piece instanceof Rook && !board[y][x+ i + 1].piece.hasMoved) {
            //         board[y][x + i].piece = {
            //             getPieceLetter: "c",
            //             isWhiteLetter: this.white ? "w" : "b",
            //             white: this.white,
            //             remove: () => {
            //                 if (this.white) {
            //                     board[y][x + 1].addPiece(board[y][x + i  + 1].piece)
            //                     board[y][x + i + 1].piece = null;
            //                 } else {
            //
            //                 }
            //             }
            //         }
            //
            //         possibleMoves.push({square: board[y][x + i], capture: false, sound: moveType.castle})
            //     }
            // }
        }

        return possibleMoves;
    }

    canCastle(x, y, xDelta) {
        for (let i = 1; i < 3; i++) {
            let moveX = x + (xDelta * i);

            let checkedSquare = this.checkSquare(moveX, y);

            if (!checkedSquare) break;
            else if (checkedSquare === true) break;

            if (checkedSquare.capture) break;

            if (i === 2) {
                checkedSquare.sound = moveType.castle;
                return checkedSquare;
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
