const printBoard = require('../lib/printBoard');

describe('printBoard', () => {
    it('should not throw an error when printing an empty board', () => {
        const board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' '],
        ];

        expect(() => printBoard(board)).not.toThrow();
    });

    it('should not throw an error when printing a board with X and O', () => {
        const board = [
            ['X', 'O', 'X'],
            ['O', 'X', 'O'],
            ['X', 'O', ' '],
        ];

        expect(() => printBoard(board)).not.toThrow();
    });
});
