const player1 = new Player('../assets/images/players/white.webp', 'Wit', true);
const player2 = new Player('../assets/images/players/black.webp', 'Zwart', false);

let playerTurn = true;
let startingPlayer = true;
let boardRotation = startingPlayer;

const board = new Board(player1, player2);
document.getElementById('content').append(board);
board.show(boardRotation);

const squares = $('chess-square');

const sound = {
    capture: new Audio('../assets/sound/capture.webm'),
    castle: new Audio('../assets/sound/castle.webm'),
    gameEnd: new Audio('../assets/sound/game-end.webm'),
    gameStart: new Audio('../assets/sound/game-start.webm'),
    illegal: new Audio('../assets/sound/illegal.webm'),
    moveCheck: new Audio('../assets/sound/move-check.webm'),
    moveOpponent: new Audio('../assets/sound/move-opponent.webm'),
    moveSelf: new Audio('../assets/sound/move-self.webm'),
    promote: new Audio('../assets/sound/promote.webm')
}
const type = {
    default: 0,
    capture: 1,
    promote: 2,
    enpassant: 3,
    castle: 4,
    check: 5,
}

let enemyKing;
let king;

let currentHints = [];
let currentActive;
let previousMove;

squares.sortable({
    connectWith: squares,
    containment: $('chess-board'),
    cursor: "grabbing",
    tolerance: "pointer",
    start: function (e) {
        getMoves(e.target);
    },
    over: function (e) {
        e.target.classList.add("hover");
    },
    out: function (e) {
        e.target.classList.remove("hover");
    },
    receive: function (e, ui) {
        const newPos = e.target;
        const prevPos = ui.sender[0];
        const piece = ui.item[0];
        const hint = e.target.querySelector('chess-hint');

        if (hint === null) {
            ui.sender.sortable("cancel");
            return;
        }

        if (piece instanceof Pawn && (newPos.y === 7 || newPos.y === 0)) {
            clearCurrentHints();
            newPos.addPromotionMenu(piece.white).then(function (piece) {
                if (piece === undefined) {
                    ui.sender.sortable("cancel");
                } else {
                    piece.classList.remove("promotion-option");
                    hint.move.type = type.promote;
                    makeMove(prevPos, newPos, piece, hint.move);
                }
                resetOnClick();
            });

        } else {
            makeMove(prevPos, newPos, piece, hint.move);
        }
    }
});

function resetOnClick() {
    let pieces = $('.piece');

    pieces.on("click", function (e) {
        if (e.target.parentNode.querySelectorAll('chess-hint').length > 0) return;

        getMoves(e.target.parentNode);
    });

    squares.sortable("option", "items", pieces);

    $('body').on("click", function (e) {
        if (e.target instanceof Piece) return;

        if (!(e.target.classList.contains('hint') || e.target.classList.contains('capture-hint'))) {
            clearCurrentHints();
            clearCurrentActive();
        }
    });
}

resetOnClick();

function getMoves(square) {
    if (square === currentActive) {
        if (arguments.callee.caller.name === 'start') return;

        clearCurrentHints();
        clearCurrentActive();
        return;
    }

    clearCurrentHints();
    clearCurrentActive();

    square.classList.add("currentMove");
    currentActive = square;

    let piece = square.piece;

    if (piece.white !== playerTurn) return;

    enemyKing = getKing(!piece.white);
    king = getKing(piece.white);

    let moves = piece.getMoves(square.y, square.x);
    let rect = piece.getBoundingClientRect();

    for (let move of moves) {
        move.square.addHint(move);

        $(move.square).on("click", function () {
            const newPos = this;
            const prevPos = square;

            if (piece instanceof Pawn && (newPos.y === 7 || newPos.y === 0)) {
                clearCurrentHints();
                piece.remove();

                this.addPromotionMenu(piece.white).then(function (value) {
                    if (value === undefined) {
                        prevPos.appendChild(piece);
                    } else {
                        value.classList.remove("promotion-option");
                        move.type = type.promote;
                        makeMove(prevPos, newPos, value, move);
                    }
                    resetOnClick();
                });
            } else {
                makeMove(prevPos, newPos, piece, move);
                animateMove(rect, piece)
            }
        });
    }

    currentHints = moves;
}

function animateMove(rect, piece) {
    TweenMax.set(piece, {x: 0, y: 0});

    let newRect = piece.getBoundingClientRect();

    TweenMax.from(piece, 0.2, {
        x: rect.left - newRect.left,
        y: rect.top - newRect.top,
        ease: Power3.linear,
        onComplete: () => piece.style.zIndex = "1"
    });
}

function makeMove(prevPos, newPos, piece, move) {
    prevPos.removePiece();
    let capturedPiece = newPos.removePiece();
    newPos.addPiece(piece);

    if (enemyKing.isInCheck()) move.type = type.check;
    let moveSound;
    switch (move.type) {
        case type.default:
            moveSound = move.square.piece.white === startingPlayer ? sound.moveSelf : sound.moveOpponent;
            break;
        case type.capture:
            moveSound = sound.capture;
            break;
        case type.check:
            moveSound = sound.moveCheck;
            break;
        case type.promote:
            moveSound = sound.promote;
            break;
        case type.castle:
            let rookSquare;
            let x;
            if (move.square.x === 6) {
                rookSquare = board[move.square.y][7];
                x = 5;
            } else {
                rookSquare = board[move.square.y][0];
                x = 3;
            }
            let rect = rookSquare.piece.getBoundingClientRect();

            board[move.square.y][x].addPiece(rookSquare.piece);
            animateMove(rect, rookSquare.piece);

            rookSquare.piece = null;

            moveSound = sound.castle;
            break;
        case type.enpassant:
            capturedPiece = board[move.square.y - move.square.piece.isWhiteDirection][move.square.x].removePiece();
            moveSound = sound.capture;
            break;
        default:
            moveSound = sound.moveSelf;
    }

    moveSound.play().then(null);

    removeEnPassant();
    checkEnPassant(prevPos, newPos, piece);

    swapPreviousMove(prevPos, newPos);

    clearCurrentHints();
    clearCurrentActive();

    if (playerTurn) {
        player1.timer.pause();
        player2.timer.resume();
        player1.addPiece(capturedPiece, player2);
    } else {
        player2.timer.pause();
        player1.timer.resume();
        player2.addPiece(capturedPiece, player1);
    }

    playerTurn = !playerTurn;

    board.print();
}

function clearCurrentHints() {
    for (let hint of currentHints) {
        hint.square.removeHint();
        $(hint.square).unbind("click");
    }

    currentHints = [];
}

function clearCurrentActive() {
    if (currentActive !== undefined) {
        currentActive.classList.remove("currentMove");
        currentActive = undefined;
    }
}

let currentEnPassant;

function checkEnPassant(prevPos, newPos, piece) {
    if (!(piece instanceof Pawn)) return;
    if (Math.abs(prevPos.y - newPos.y) !== 2) return;

    if (prevPos.y === 1) {
        currentEnPassant = board[prevPos.y + 1][prevPos.x]
    } else {
        currentEnPassant = board[prevPos.y - 1][prevPos.x]
    }

    currentEnPassant.addEnPassant(piece.white);
}

function removeEnPassant() {
    if (!(currentEnPassant instanceof Square)) return;

    if (currentEnPassant.piece === null) return;

    if (!(currentEnPassant.piece instanceof Piece)) currentEnPassant.removePiece();
}

function swapPreviousMove(prevPos, newPos) {
    if (previousMove !== undefined) {
        previousMove.prevPos.classList.remove("previousMove");
        previousMove.newPos.classList.remove("previousMove");
    }

    prevPos.classList.add("previousMove");
    newPos.classList.add("previousMove");
    previousMove = {
        prevPos: prevPos,
        newPos: newPos,
    }
}

function getKing(white) {
    return $('chess-king.' + (white ? 'white' : 'black'))[0];
}

function rotateBoard() {
    boardRotation = !boardRotation;

    board.show(boardRotation);
}

board.print();
