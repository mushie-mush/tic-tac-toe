const validateBoard = require('../lib/validateBoard')

describe('validateBoard', () => {
    describe('when game continues', () => {
        it('returns false for an empty board', () => {
            const testboard = [
                [' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' '],
            ]

            expect(validateBoard(testboard, 'O')).toBe(false)
        })

        it('returns false for a partially filled board with no winner', () => {
            const testboard = [
                ['X', 'O', ' '],
                [' ', 'X', 'O'],
                [' ', ' ', ' '],
            ]

            expect(validateBoard(testboard, 'X')).toBe(false)
            expect(validateBoard(testboard, 'O')).toBe(false)
        })
    })

    describe('horizontal wins', () => {
        it('returns win for top row', () => {
            const testboard = [
                ['X', 'X', 'X'],
                [' ', 'O', 'O'],
                [' ', ' ', ' '],
            ]

            expect(validateBoard(testboard, 'X')).toBe('win')
        })

        it('returns win for middle row', () => {
            const testboard = [
                ['X', 'O', ' '],
                ['O', 'O', 'O'],
                ['X', 'X', ' '],
            ]

            expect(validateBoard(testboard, 'O')).toBe('win')
        })

        it('returns win for bottom row', () => {
            const testboard = [
                ['O', 'O', 'X'],
                ['X', 'O', ' '],
                ['X', 'X', 'X'],
            ]

            expect(validateBoard(testboard, 'X')).toBe('win')
        })
    })

    describe('vertical wins', () => {
        it('returns win for left column', () => {
            const testboard = [
                ['O', 'X', 'X'],
                ['O', 'X', ' '],
                ['O', ' ', ' '],
            ]

            expect(validateBoard(testboard, 'O')).toBe('win')
        })

        it('returns win for middle column', () => {
            const testboard = [
                ['X', 'O', 'X'],
                [' ', 'O', ' '],
                ['X', 'O', ' '],
            ]

            expect(validateBoard(testboard, 'O')).toBe('win')
        })

        it('returns win for right column', () => {
            const testboard = [
                ['O', 'O', 'X'],
                [' ', ' ', 'X'],
                [' ', 'O', 'X'],
            ]

            expect(validateBoard(testboard, 'X')).toBe('win')
        })
    })

    describe('diagonal wins', () => {
        it('returns win for top-left to bottom-right diagonal', () => {
            const testboard = [
                ['X', 'O', 'O'],
                ['O', 'X', ' '],
                [' ', ' ', 'X'],
            ]

            expect(validateBoard(testboard, 'X')).toBe('win')
        })

        it('returns win for top-right to bottom-left diagonal', () => {
            const testboard = [
                ['X', 'O', 'O'],
                ['X', 'O', ' '],
                ['O', ' ', 'X'],
            ]

            expect(validateBoard(testboard, 'O')).toBe('win')
        })
    })

    describe('tie games', () => {
        it('returns tie when board is full with no winner', () => {
            const testboard = [
                ['X', 'O', 'X'],
                ['O', 'O', 'X'],
                ['O', 'X', 'O'],
            ]

            expect(validateBoard(testboard, 'X')).toBe('tie')
            expect(validateBoard(testboard, 'O')).toBe('tie')
        })

        it('returns tie for another full board scenario', () => {
            const testboard = [
                ['O', 'X', 'O'],
                ['X', 'X', 'O'],
                ['X', 'O', 'X'],
            ]

            expect(validateBoard(testboard, 'X')).toBe('tie')
            expect(validateBoard(testboard, 'O')).toBe('tie')
        })
    })

    describe('edge cases', () => {
        it('returns false when checking wrong player for a win', () => {
            const testboard = [
                ['X', 'X', 'X'],
                [' ', 'O', 'O'],
                [' ', ' ', ' '],
            ]

            expect(validateBoard(testboard, 'O')).toBe(false)
        })

        it('prioritizes win over tie when player has winning condition on full board', () => {
            const testboard = [
                ['X', 'X', 'X'],
                ['O', 'O', 'X'],
                ['O', 'X', 'O'],
            ]

            expect(validateBoard(testboard, 'X')).toBe('win')
            expect(validateBoard(testboard, 'O')).toBe('tie') // O doesn't have a win
        })

        it('handles mixed case scenarios correctly', () => {
            const testboard = [
                ['X', 'O', 'X'],
                ['O', 'X', 'O'],
                ['X', ' ', ' '],
            ]

            expect(validateBoard(testboard, 'X')).toBe('win')
            expect(validateBoard(testboard, 'O')).toBe(false)
        })
    })
})
