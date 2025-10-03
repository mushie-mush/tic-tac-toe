const validateUserInput = require('../lib/validateUserInput');

describe('validateUserInput', () => {
    it('should return true for valid empty position', () => {
        const board = [
            ['X', 'O', ' '],
            [' ', 'X', 'O'],
            ['O', ' ', 'X'],
        ];

        expect(validateUserInput(board, 0, 2)).toBe(true);
    });

    it('should return false for position outside board bounds', () => {
        const board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' '],
        ];

        expect(validateUserInput(board, 3, 1)).toBe(false);
        expect(validateUserInput(board, 1, -1)).toBe(false);
    });

    it('should return false for already occupied position', () => {
        const board = [
            ['X', 'O', ' '],
            [' ', 'X', 'O'],
            ['O', ' ', 'X'],
        ];

        expect(validateUserInput(board, 0, 0)).toBe(false);
        expect(validateUserInput(board, 1, 1)).toBe(false);
    });
});
