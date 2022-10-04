class Rook extends Piece{
    constructor(white) {
        super(white, 5);
        this.pieceLetter = 'r';
    }

    getMoves(_y, _x) {
        let x = parseInt(_x);
        let y = parseInt(_y);

        return [].concat(
            //top
            this.checkLine(x, y, 0, 1),
            //right
            this.checkLine(x, y, 1, 0),
            //bottom
            this.checkLine(x, y, 0, -1),
            //left
            this.checkLine(x, y, -1, 0));
    }
}

customElements.define('chess-rook', Rook);
