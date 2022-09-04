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
        let capture = this.piece !== null;

        if (capture) this.piece.remove();
        this.piece = null;

        return capture;
    }

    addPromotionMenu(color) {
        const promotionOrder = [new Queen(color), new Knight(color), new Rook(color), new Bishop(color)];

        const promotionDiv = document.createElement("div");
        promotionDiv.classList.add("promotion-menu")

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

    //TODO either create a custom hint element, or check here whether square should have a capture hint, by checking current piece status.
    addCaptureHint() {
        this.hint.className = "capture-hint";
        this.appendChild(this.hint);
    }

    addHint() {
        this.hint.className = "hint";
        this.appendChild(this.hint);
    }

    removeHint() {
        this.hint.remove();
    }
}

customElements.define('chess-square', Square);
