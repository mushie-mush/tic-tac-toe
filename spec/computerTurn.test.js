const getRandomPosition = require("../getRandomPosition");

describe('getRandomPosition', () => {
    it("should return a random position on the board", () => {
        const board = [
            ['O', 'O', 'X'],
            ['X', 'X', 'O'],
            ['O', 'X', ''],
        ];
        const player = 'X'

        expect(getRandomPosition(board, player)).toEqual([2, 2])
    })

    it("should return a random position from two possible moves", () => {
        const board = [
            ['O', 'O', 'X'],
            ['X', 'X', 'O'],
            ['O', '', ''],
        ];
        const player = 'X'

        // 1. Mocking on the global level
        // spyOn(Math, 'random').and.returnValue(0)

        // 2. Injection
        const fakeRandom = () => {
            return 0
        }

        // expect([[2, 2], [2, 1]]).toContain(getRandomPosition(board, player))
        // expect(getRandomPosition(board, player)).toEqual([2, 1])
        expect(getRandomPosition(board, player, fakeRandom)).toEqual([2, 1])
    })
})