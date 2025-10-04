const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('hello world')
})

// request: play?board=[['O','',''],['','',''],['','','']]&player=X
// response: [0,1]

app.listen(3000, () => {
    console.log('server running')
})