const writeUserInput = require('../lib/writeUserInput');

describe('writeUserInput', () => {
    it('should place X at the specified position', () => {
        const board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' '],
        ];

        writeUserInput(board, 'X', 1, 1);

        expect(board[1][1]).toBe('X');
    });

    it('should place O at the specified position', () => {
        const board = [
            ['X', ' ', ' '],
            [' ', 'X', ' '],
            [' ', ' ', ' '],
        ];

        writeUserInput(board, 'O', 0, 2);

        expect(board[0][2]).toBe('O');
    });
});
