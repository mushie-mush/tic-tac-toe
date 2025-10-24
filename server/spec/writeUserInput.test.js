const writeUserInput = require('../lib/writeUserInput');

describe('writeUserInput', () => {
    it('should place X at the specified position', () => {
        const board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' '],
        ];

        const newBoard = writeUserInput(board, 'X', 1, 1);

        expect(newBoard[1][1]).toBe('X');
    });

    it('should place O at the specified position', () => {
        const board = [
            ['X', ' ', ' '],
            [' ', 'X', ' '],
            [' ', ' ', ' '],
        ];

        const newBoard = writeUserInput(board, 'O', 0, 2);

        expect(newBoard[0][2]).toBe('O');
    });
});
