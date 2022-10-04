class Player extends HTMLElement {
    p = document.createElement('p');

    constructor(imgSrc, username, color) {
        super();

        this.imgSrc = imgSrc;
        this.username = username;
        this.pieces = {p: 0, n: 0, b: 0, r: 0, q: 0};
        this.color = color;
        this.colorLetter = this.color ? 'b' : 'w';
        this.value = 0;

        let img = document.createElement('img');
        img.src = this.imgSrc;
        img.className = 'profile-picture';
        this.appendChild(img);

        let div = document.createElement('div');

        let userName = document.createElement('h1');
        userName.innerText = this.username;
        div.appendChild(userName);

        this.valueDiv = document.createElement('div');

        div.appendChild(this.valueDiv);

        this.appendChild(div);

        let time = document.createElement('div');
        time.classList.add('time');

        this.appendChild(time);

        this.timer = new Timer(time, 1000);

        if (this.color) this.timer.resume();
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

        this.getPieceImage(pawns, 'p');
        this.getPieceImage(bishop, 'b');
        this.getPieceImage(knight, 'n');
        this.getPieceImage(rook, 'r');
        this.getPieceImage(queen, 'q');
    }

    getPieceImage(amount, type) {
        if (amount === 0) return;

        let field = document.getElementById(this.colorLetter + type);
        if (field !== null && field.children.length === amount) return;

        let img = document.createElement('img');
        img.src = '../assets/images/pieces/' + this.colorLetter + type + '.png';

        let li = document.createElement('li');
        li.appendChild(img);

        if (field === null) {
            let ul = document.createElement('ul');
            ul.id = this.colorLetter + type;

            ul.appendChild(li);

            if (this.p.isConnected)
                $(ul).insertBefore(this.p);
            else
                this.valueDiv.appendChild(ul);
        } else {
            field.appendChild(li);
        }
    }

    set setValue(value) {
        this.value = value

        if (value === 0)
            this.p.remove();
        else {
            this.p.innerText = '+' + value;
            this.valueDiv.appendChild(this.p);
        }
    }
}

customElements.define('chess-player', Player);
