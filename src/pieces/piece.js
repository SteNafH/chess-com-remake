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
        let currentPiece = board[y][x].piece;

        for (let i = 1; i < 8; i++) {
            let moveX = x + (xDelta * i);
            let moveY = y + (yDelta * i);

            if (this.checkOutOfBounds(moveX, moveY)) break;

            let newPosition = board[moveY][moveX];

            if (newPosition.piece === null) {
                possibleMoves.push({square: newPosition, capture: false});
                continue;
            }

            if (newPosition.piece.white !== currentPiece.white) {
                possibleMoves.push({square: newPosition, capture: true});
            }
            break;
        }

        return possibleMoves;
    }
}
