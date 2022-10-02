class Player extends HTMLElement {
    constructor(imgSrc, username, color) {
        super();

        this.imgSrc = imgSrc;
        this.username = username;
        this.pieces = {p: 0, n: 0, b: 0, r: 0, q: 0};
        this.color = color;
        this.value = 0;

        let img = document.createElement('img');
        img.src = this.imgSrc;
        this.appendChild(img);

        let div = document.createElement('div');

        let userName = document.createElement('h1');
        userName.innerText = this.username;
        div.appendChild(userName);

        this.valueDiv = document.createElement('p');
        div.appendChild(this.valueDiv);

        this.appendChild(div);
    }

    addPiece(piece, opponent) {
        if (piece === null) return;
        this.value = this.value + piece.value;

        if (opponent.value < this.value) {
            this.setValue = this.value - opponent.value;
            opponent.setValue = 0;
        } else if (opponent.value > this.value) {
            opponent.setValue = opponent.value - this.value;
            this.setValue = 0;
        } else {
            this.setValue = 0;
            opponent.setValue = 0;
        }

        this.pieces[piece.getPieceLetter]++;
        this.getPieceImages();
    }

    getPieceImages() {
        let pawns = this.pieces['p'];
        let bishop = this.pieces['b'];
        let knight = this.pieces['n'];
        let rook = this.pieces['r'];
        let queen = this.pieces['q'];
    }

    set setValue(value) {
        this.value = value
        if (value === 0)
            this.valueDiv.innerText = '';
        else
            this.valueDiv.innerText = '+' + value;
    }
}

customElements.define('chess-player', Player);
