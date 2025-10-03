const validateBoard = require('../validateBoard')

describe('validateBoard', () => {
    it('returns false for an empty board', () => {
        const testboard = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ]

        expect(validateBoard(testboard, 'O')).toBe(false)
    })

    it('returns true for top row win', () => {
        const testboard = [
            ['X', 'X', 'X'],
            ['', 'O', 'O'],
            ['', '', ''],
        ]

        expect(validateBoard(testboard, 'X')).toBe('win')
    })
})
