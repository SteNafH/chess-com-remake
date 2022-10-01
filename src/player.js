class Player extends HTMLElement {
    constructor(imgSrc, username, pieces, color) {
        super();

        this.imgSrc = imgSrc;
        this.username = username;
        this.pieces = pieces;
        this.color = color;

        let img = document.createElement('img');
        img.src = this.imgSrc;
        this.appendChild(img)
    }
}

customElements.define('chess-player', Player);
