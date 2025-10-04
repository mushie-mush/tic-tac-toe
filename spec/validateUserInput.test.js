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

    it('should print out validation errors when the col is out of range', () => {
        const board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' '],
        ];

        // spyOn(console, 'log')
        // expect(validateUserInput(board, 3, 0)).toBe(false)
        // expect(console.log).toHaveBeenCalledWith('row should be between 0 and 2')

        // JavaScript scope
        class Ui {
            constructor() {
                this.messages = []
            }

            log(message) {
                // this.messages.push(message)
            }

            get() {
                return this.messages
            }
        }

        const ui = new Ui()

        expect(validateUserInput(board, 3, 0, ui)).toBe(false)

        expect(ui.get()).toEqual(['row should be between 0 and 2'])

        // Assert that row should be between 0 and 2 is printed out
    })
});
