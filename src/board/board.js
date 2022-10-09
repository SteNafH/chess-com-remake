class Row extends Array {
    forEach(callback) {
        for (let i = 0; i < this.length; i++)
            callback(this[i], i, this);
    }

    reverseForEach(callback) {
        for (let i = this.length - 1; i >= 0; i--)
            callback(this[i], i, this);
    }
}

class Board extends HTMLElement {
    columnP = [];
    rowP = [];

    constructor(player1, player2) {
        super();

        this.player1 = player1;
        this.player2 = player2;

        this.length = 8;
        let colLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
        for (let i = 0; i < this.length; i++) {
            this.columnP.push(this.createP('columnNumbers', i + 1));
            this.rowP.push(this.createP('rowNumbers', colLetters[i]));
            this[i] = new Row(8);
        }

        this.initBoard();
    }

    initBoard() {
        this[0][0] = new Square(0, 0, new Rook(true));
        this[0][1] = new Square(0, 1, new Knight(true));
        this[0][2] = new Square(0, 2, new Bishop(true));
        this[0][3] = new Square(0, 3, new Queen(true));
        this[0][4] = new Square(0, 4, new King(true));
        this[0][5] = new Square(0, 5, new Bishop(true));
        this[0][6] = new Square(0, 6, new Knight(true));
        this[0][7] = new Square(0, 7, new Rook(true));

        for (let i = 0; i < 8; i++) {
            this[1][i] = new Square(1, i, new Pawn(true));
            this[2][i] = new Square(2, i, null);
            this[3][i] = new Square(3, i, null);
            this[4][i] = new Square(4, i, null);
            this[5][i] = new Square(5, i, null);
            this[6][i] = new Square(6, i, new Pawn(false));
        }

        this[7][0] = new Square(7, 0, new Rook(false));
        this[7][1] = new Square(7, 1, new Knight(false));
        this[7][2] = new Square(7, 2, new Bishop(false));
        this[7][3] = new Square(7, 3, new Queen(false));
        this[7][4] = new Square(7, 4, new King(false));
        this[7][5] = new Square(7, 5, new Bishop(false));
        this[7][6] = new Square(7, 6, new Knight(false));
        this[7][7] = new Square(7, 7, new Rook(false));
    }

    show(rotation) {
        if (rotation) {
            this.reverseForEach((row, rowIndex) => row.forEach((col, colIndex) => {
                if (colIndex === 0)
                    col.appendChild(this.columnP[rowIndex]);

                if (rowIndex === 0)
                    col.appendChild(this.rowP[colIndex]);

                this.append(col);
            }));
            this.parentNode.prepend(player2);
            this.parentNode.append(player1);
        } else {
            this.forEach((row, rowIndex) => row.reverseForEach((col, colIndex) => {
                if (colIndex === 7)
                    col.appendChild(this.columnP[rowIndex]);

                if (rowIndex === 7)
                    col.appendChild(this.rowP[colIndex]);

                this.append(col);
            }));
            this.parentNode.prepend(player1);
            this.parentNode.append(player2);
        }
    }

    print() {
        let boardString = [''];

        this.reverseForEach((row) => boardString.push(row.join(' '), '\n'));

        console.log(...boardString)
    }

    forEach(callback) {
        for (let i = 0; i < this.length; i++) {
            callback(this[i], i, this);
        }
    }

    reverseForEach(callback) {
        for (let i = this.length - 1; i >= 0; i--)
            callback(this[i], i, this);
    }

    createP(className, text) {
        let p = document.createElement('p');
        p.className = className;
        p.innerText = text;

        return p;
    }
}

customElements.define('chess-board', Board);
