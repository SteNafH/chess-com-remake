class Knight extends Piece {
    knightMoves = [
        {x: 2, y: -1}, {x: 2, y: 1}, {x: 1, y: -2}, {x: 1, y: 2},
        {x: -2, y: -1}, {x: -2, y: 1}, {x: -1, y: -2}, {x: -1, y: 2}
    ];

    constructor(white) {
        super(white, 3);
        this.pieceLetter = 'n';
    }

    getMoves(_y, _x) {
        let x = parseInt(_x);
        let y = parseInt(_y);

        let possibleMoves = [];
        for (let move of this.knightMoves) {
            let moveY = y + move.y;
            let moveX = x + move.x;

            let checkedSquare = this.checkSquare(moveX, moveY);

            if (typeof checkedSquare === 'boolean') continue;

            possibleMoves.push(checkedSquare);
        }

        return possibleMoves;
    }
}

customElements.define('chess-knight', Knight);
