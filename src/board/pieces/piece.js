class Piece extends HTMLElement {
    constructor(white) {
        super();
        this.white = white;
        this.hasMoved = false;
    }

    connectedCallback() {
        this.classList.add("piece");
        this.classList.add(this.white ? "white" : "black");
    }

    get isWhiteDirection() {
        return this.white ? 1 : -1;
    }

    get isWhiteLetter() {
        return this.white ? "w" : "b";
    }

    get getPieceLetter() {
        return "";
    }

    getMoves(y, x) {
        return [];
    }

    checkOutOfBounds(x, y) {
        return x < 0 || y < 0 || x > 7 || y > 7;
    }

    checkLine(x, y, xDelta, yDelta) {
        let possibleMoves = [];

        for (let i = 1; i < 8; i++) {
            let moveX = x + (xDelta * i);
            let moveY = y + (yDelta * i);

            let checkedSquare = this.checkSquare(moveX, moveY);

            if (!checkedSquare) break;
            else if (checkedSquare === true) continue;

            possibleMoves.push(checkedSquare)

            if (checkedSquare.capture) break;
        }

        return possibleMoves;
    }

    checkSquare(moveX, moveY) {
        if (this.checkOutOfBounds(moveX, moveY)) return false;

        let newPos = board[moveY][moveX];

        if (!(newPos.piece instanceof Piece)) {
            if (!this.isCheck(this.parentNode, newPos))
                return {square: newPos, type: type.default};
            else
                return true;
        }

        if (newPos.piece.white !== this.white) {
            if (!this.isCheck(this.parentNode, newPos))
                return {square: newPos, type: type.capture};
            else
                return true;
        }

        return false;
    }

    isCheck(prevPos, newPos) {
        prevPos.piece = null;
        let newPosPiece = newPos.piece;
        newPos.piece = this;

        //printBoard();

        let check = king.isInCheck();

        prevPos.piece = this;
        newPos.piece = newPosPiece;

        return check;
    }
}
