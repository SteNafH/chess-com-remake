class Bishop extends Piece{
    constructor(white) {
        super(white, 3);
    }

    get getPieceLetter() {
        return "b";
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
            this.checkLine(x, y, -1, 1));
    }
}

customElements.define('chess-bishop', Bishop);
