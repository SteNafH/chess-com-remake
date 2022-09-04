const boardDiv = document.getElementById("board");
const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];

const board = new Array(8);

for (let i = 0; i < board.length; i++) {
    board[i] = new Array(8);
}

board[0][0] = new Square(0, 0, new Rook(true));
board[0][1] = new Square(0, 1, new Knight(true));
board[0][2] = new Square(0, 2, new Bishop(true));
board[0][3] = new Square(0, 3, new Queen(true));
board[0][4] = new Square(0, 4, new King(true));
board[0][5] = new Square(0, 5, new Bishop(true));
board[0][6] = new Square(0, 6, new Knight(true));
board[0][7] = new Square(0, 7, new Rook(true));

for (let i = 0; i < 8; i++) {
    board[1][i] = new Square(1, i, new Pawn(true));
    board[2][i] = new Square(2, i, null);
    board[3][i] = new Square(3, i, null);
    board[4][i] = new Square(4, i, null);
    board[5][i] = new Square(5, i, null);
    board[6][i] = new Square(6, i, new Pawn(false));
}

board[7][0] = new Square(7, 0, new Rook(false));
board[7][1] = new Square(7, 1, new Knight(false));
board[7][2] = new Square(7, 2, new Bishop(false));
board[7][3] = new Square(7, 3, new Queen(false));
board[7][4] = new Square(7, 4, new King(false));
board[7][5] = new Square(7, 5, new Bishop(false));
board[7][6] = new Square(7, 6, new Knight(false));
board[7][7] = new Square(7, 7, new Rook(false));


for (let y = 7; y >= 0; y--) {

    for (let x = 0; x < 8; x++) {
        const div = board[y][x];
        div.id = y + "" + x;

        if (y % 2 === 0) {
            if (x % 2 === 0) {
                div.classList.add("black");
            } else {
                div.classList.add("white");
            }
        } else {
            if (x % 2 === 0) {
                div.classList.add("white");
            } else {
                div.classList.add("black");
            }
        }

        if (x === 0) {
            let p = document.createElement("p");
            p.innerText = (y + 1).toString();
            p.classList.add("columnNumbers");
            div.appendChild(p);
        }

        if (y === 0) {
            let p = document.createElement("p");
            p.innerText = columns[x];
            p.classList.add("rowNumbers");
            div.appendChild(p);
        }

        boardDiv.appendChild(div)
    }
}

function printBoard() {
    let boardString = [""];

    for (let y = 7; y >= 0; y--) {
        for (let x = 0; x < 8; x++) {
            let piece = board[y][x].piece;

            if (piece === null) {
                boardString.push("  ")
                continue;
            }

            boardString.push(piece.isWhiteLetter + piece.getPieceLetter);
        }
        boardString.push("\n")
    }

    console.log(...boardString)
}
