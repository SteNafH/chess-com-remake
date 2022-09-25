class Square extends HTMLElement {
    hint = document.createElement("div");

    constructor(y, x, piece) {
        super();

        this.y = y;
        this.x = x;
        this.piece = piece;
    }

    connectedCallback() {
        if (this.piece === null) return;
        this.appendChild(this.piece);
    }

    addPiece(piece) {
        this.appendChild(piece);
        this.piece = piece;
    }

    addEnPassant(color) {
        this.piece = {
            getPieceLetter: "e",
            isWhiteLetter: color ? "w" : "b",
            white: color,
            remove: () => {
                if (this.piece.white) {
                    board[this.y + 1][this.x].removePiece();
                } else {
                    board[this.y - 1][this.x].removePiece();
                }
            }
        }
    }

    removePiece() {
        if (this.piece !== null) this.piece.remove();
        this.piece = null;
    }

    addPromotionMenu(white) {
        const promotionOrder = [new Queen(white), new Knight(white), new Rook(white), new Bishop(white)];

        const promotionDiv = document.createElement("div");
        promotionDiv.classList.add("promotion-menu");
        promotionDiv.classList.add(white ? "white" : "black");

        for (let i = 0; i < 4; i++) {
            let div = promotionOrder[i];
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
                if (e.target.classList.contains("hint") || e.target.classList.contains("capture-hint")) return;

                if (!e.target.classList.contains("promotion-option")) {
                    resolve();
                } else {
                    resolve(e.target);
                }
                promotionDiv.remove();
                $('body').unbind("click");
            });
        })
    }

    addHint(white) {
        if (this.piece !== null) {
            this.hint.className = this.piece.white === white ? "hint" : "capture-hint";
        } else {
            this.hint.className = "hint";
        }

        this.appendChild(this.hint);
    }

    removeHint() {
        this.hint.remove();
    }
}

customElements.define('chess-square', Square);
