const express = require("express");
const getRandomPosition = require("./lib/getRandomPosition");
const validateUserInput = require("./lib/validateUserInput");
const writeUserInput = require("./lib/writeUserInput");
const checkGameEnd = require("./lib/checkGameEnd");
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get("/", (req, res) => {
    res.send("hello world");
});

class WebUi {
    constructor(output = console, input = rl) {
        this.output = output;
        this.input = input;
    }

    log(message) {
        this.output.send(message);
    }

    // async ask(question) {
    //     return await this.input.question(question);
    // }
}

// request: play?board=[["O"," "," "],[" "," "," "],[" "," "," "]]&player=X&move=[0,1]
// response: [0,1]
app.get("/play", (req, res) => {
    const board = JSON.parse(req.query.board);
    const player = req.query.player;
    const [row, col] = JSON.parse(req.query.move)

    const webUi = new WebUi(req, res)
    const errorMessages = validateUserInput(board, row, col)

    if (errorMessages.length) {
        console.log(errorMessages)
        res.send({ error: errorMessages[0] });
    } else {
        // const newBoard = writeUserInput(board, player, row, col)
        // const { isEnd, message } = checkGameEnd(newBoard, "X");

        // if (isEnd) {
        //     res.send({ message, isEnd, computerMove: null });
        //     return;
        // }

        // const [computerRow, computerCol] = getRandomPosition(newBoard)
        // const { isEnd, message } = checkGameEnd(newBoard, "O");

        // if (isEnd) {
        //     res.send({ message, isEnd, computerMove: [computerRow, computerCol] });
        //     return;
        // }

        // res.send({ isEnd, computerMove: [computerRow, computerCol] });

        const newBoard = writeUserInput(board, player, row, col);
        let gameState = checkGameEnd(newBoard, "X");

        if (gameState.isEnd) {
            res.send({ ...gameState, computerMove: null });
            return;
        }

        const [computerRow, computerCol] = getRandomPosition(newBoard);
        const updatedBoard = writeUserInput(newBoard, "O", computerRow, computerCol);
        gameState = checkGameEnd(updatedBoard, "O");

        res.send({ ...gameState, computerMove: [computerRow, computerCol] });

    }
});

app.listen(3000, () => {
    console.log("server running");
});
