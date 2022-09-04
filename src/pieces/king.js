class King extends Piece{
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
}

customElements.define('chess-king', King);
