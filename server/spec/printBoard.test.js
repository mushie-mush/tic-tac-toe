const printBoard = require("../lib/printBoard")

class Ui {
    constructor() {
        this.messages = []
    }

    log(message) {
        this.messages.push(message)
    }

    get() {
        return this.messages
    }
}

describe('printBoard', () => {
    it('should print out the correct position based on the argument', () => {
        const testboard = [
            ['O', 'X', 'X'],
            ['O', 'X', ' '],
            ['O', ' ', ' '],
        ]

        const ui = new Ui()

        printBoard(testboard, ui)

        expect(ui.get()).toEqual([` ${testboard[0][0]} | ${testboard[0][1]} | ${testboard[0][2]} \n---+---+---\n ${testboard[1][0]} | ${testboard[1][1]} | ${testboard[1][2]} \n---+---+---\n ${testboard[2][0]} | ${testboard[2][1]} | ${testboard[2][2]} \n`])
    })
})
