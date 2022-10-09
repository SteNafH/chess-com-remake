class Timer {
    remaining = new Date(600000);
    paused = true;
    timerId = null;
    div;
    delay;

    constructor(div, delay) {
        this.div = div;
        this.div.innerText = this.formatTime();
        this.delay = delay;
    }

    pause() {
        if (!this.paused) {
            this.clear();
            this.paused = true;
            this.div.classList.remove('active')
        }
    }

    resume() {
        if (this.paused) {
            this.paused = false;
            this.start();
            this.div.classList.add('active')
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

        }, this.delay);
    }

    formatTime() {
        let minutes = this.remaining.getMinutes() < 10 ? '0' + this.remaining.getMinutes() : this.remaining.getMinutes();
        let seconds = this.remaining.getSeconds() < 10 ? '0' + this.remaining.getSeconds() : this.remaining.getSeconds();

        return minutes + ':' + seconds;
    }

    run() {
        this.remaining = new Date(this.remaining - 1000);
        this.div.innerText = this.formatTime();
    }
}
