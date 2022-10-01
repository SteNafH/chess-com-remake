class Queen extends Piece{
    constructor(white) {
        super(white);
    }

    get getPieceLetter() {
        return "q";
    }

    getMoves(_y, _x) {
        let x = parseInt(_x);
        let y = parseInt(_y);

        return [].concat(
            //top right
            this.checkLine(x, y, 1, 1),
            //bottom right
            this.checkLine(x, y, 1, -1),
            //bottom left
            this.checkLine(x, y, -1, -1),
            //top left
            this.checkLine(x, y, -1, 1),
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

customElements.define('chess-queen', Queen);
