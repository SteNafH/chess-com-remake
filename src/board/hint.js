class Hint extends HTMLElement {

    constructor() {
        super();

        this.capture = false;
        this.move = null;
    }

    connectedCallback() {
        if (this.capture) this.className = 'capture';
        else this.classList.remove('capture')
    }

    set setCapture(capture) {
        this.capture = capture;
    }
}

customElements.define('chess-hint', Hint);
