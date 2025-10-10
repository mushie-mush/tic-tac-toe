const express = require("express");
const getRandomPosition = require("./lib/getRandomPosition");
const app = express();

app.get("/", (req, res) => {
    res.send("hello world");
});

// request: play?board=[["O"," "," "],[" "," "," "],[" "," "," "]]&player=X
// response: [0,1]
app.get("/play", (req, res) => {
    const board = JSON.parse(req.query.board);
    const player = req.query.player;

    const [row, col] = getRandomPosition(board);
    res.send([row, col]);
});

app.listen(3000, () => {
    console.log("server running");
});
