class Piece extends HTMLElement {
    constructor(white) {
        super();
        this.white = white;
    }

    connectedCallback() {
        this.classList.add("piece");
        this.classList.add(this.white ? "white" : "black");
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
        }

        return possibleMoves;
    }

    checkSquare(moveX, moveY) {
        if (this.checkOutOfBounds(moveX, moveY)) return false;

        let newPos = board[moveY][moveX];

        if (newPos.piece === null || newPos.piece.getPieceLetter === "e") {
            if (!this.isCheck(this.parentNode, newPos))
                return {square: newPos, capture: false};
            else
                return true;
        }

        if (newPos.piece.white !== this.white) {
            if (!this.isCheck(this.parentNode, newPos))
                return {square: newPos, capture: true};
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
