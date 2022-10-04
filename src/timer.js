class Timer {
    remaining = new Date(600000);
    paused = true;
    timerId = null;
    _div;
    _delay;

    constructor(div, delay) {
        this._div = div;
        this._div.innerText = this.formatTime();
        this._delay = delay;
    }

    pause() {
        if (!this.paused) {
            this.clear();
            this.paused = true;
            this._div.classList.remove('active')
        }
    }

    resume() {
        if (this.paused) {
            this.paused = false;
            this.start();
            this._div.classList.add('active')
        }
    }

    clear() {
        clearInterval(this.timerId);
    }

    start() {
        this.clear();
        this.timerId = setInterval(() => {
            this.run();

            if (this.remaining.getMinutes() === 0 && this.remaining.getSeconds() === 0) this.clear();

        }, this._delay);
    }

    formatTime() {
        let minutes = this.remaining.getMinutes() < 10 ? '0' + this.remaining.getMinutes() : this.remaining.getMinutes();
        let seconds = this.remaining.getSeconds() < 10 ? '0' + this.remaining.getSeconds() : this.remaining.getSeconds();

        return minutes + ':' + seconds;
    }

    run() {
        this.remaining = new Date(this.remaining - 1000);
        this._div.innerText = this.formatTime();
    }
}
