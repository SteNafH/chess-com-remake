class Square extends HTMLElement {
    hint = document.createElement("chess-hint");

    constructor(y, x, piece) {
        super();

        this.y = y;
        this.x = x;
        this.piece = piece;

        if (this.y % 2 === 0) {
            if (this.x % 2 === 0) {
                this.classList.add("black");
            } else {
                this.classList.add("white");
            }
        } else {
            if (this.x % 2 === 0) {
                this.classList.add("white");
            } else {
                this.classList.add("black");
            }
        }
    }

    connectedCallback() {
        if (this.piece === null) return;
        this.appendChild(this.piece);
    }

    addPiece(piece) {
        this.appendChild(piece);
        this.piece = piece;
        this.piece.hasMoved = true;
    }

    addEnPassant(color) {
        this.piece = {
            getPieceLetter: "e",
            isWhiteLetter: color ? "w" : "b",
            white: color,
            remove: () => {
            }
        }
    }

    removePiece() {
        let piece = null;

        if (this.piece instanceof Piece) {
            piece = $(this.piece).clone().context;
            this.piece.remove();
        }

        this.piece = null;
        return piece;
    }

    addPromotionMenu(white) {
        const promotionOrder = [new Queen(white), new Knight(white), new Rook(white), new Bishop(white)];

        const promotionDiv = document.createElement("div");
        promotionDiv.classList.add("promotion-menu");
        promotionDiv.classList.add(white ? "white" : "black");

        for (let i = 0; i < promotionOrder.length; i++) {
            let div = promotionOrder[i];
            div.hasMoved = true;
            div.classList.add("promotion-option")
            promotionDiv.appendChild(div);
        }

        const p = document.createElement("div");
        p.innerText = "✖";
        p.classList.add("cross");

        promotionDiv.appendChild(p);

        this.appendChild(promotionDiv);

        return new Promise((resolve) => {
            $('body').on("click", function (e) {
                if (e.target instanceof Hint) return;

                if (!e.target.classList.contains("promotion-option")) {
                    resolve();
                } else {
                    e.target.pieceLetter = 'p';
                    e.target.value = 1;
                    resolve(e.target);
                }
                promotionDiv.remove();
                $('body').unbind("click");
            });
        })
    }

    addHint(move) {
        this.hint.setCapture = this.piece instanceof Piece;
        this.hint.move = move;
        this.appendChild(this.hint);
    }

    removeHint() {
        this.hint.remove();
    }

    toString() {
        if (this.piece === null) return '  ';

        return this.piece.isWhiteLetter + this.piece.getPieceLetter;
    }
}

customElements.define('chess-square', Square);
