const getRandomPosition = require("../lib/getRandomPosition");

describe('getRandomPosition', () => {
    it("should return a random position on the board", () => {
        const board = [
            ['O', 'O', 'X'],
            ['X', 'X', 'O'],
            ['O', 'X', ' '],
        ];
        const player = 'X'

        expect(getRandomPosition(board, player)).toEqual([2, 2])
    })

    it("should return a random position from two possible moves", () => {
        const board = [
            ['O', 'O', 'X'],
            ['X', 'X', 'O'],
            ['O', ' ', ' '],
        ];
        const player = 'X'

        expect([[2, 2], [2, 1]]).toContain(getRandomPosition(board, player))

        // 1. Mocking on the global level
        // spyOn(Math, 'random').and.returnValue(0)
        // expect(getRandomPosition(board, player)).toEqual([2, 1])

        // 2. Injection
        // const fakeRandom = () => {
        //     return 0
        // }
        // expect(getRandomPosition(board, player, fakeRandom)).toEqual([2, 1])

    })

    it("should return undefined when no moves available", () => {
        const board = [
            ['O', 'X', 'X'],
            ['X', 'X', 'O'],
            ['O', 'X', 'O'],
        ];
        const player = 'X'

        expect(getRandomPosition(board, player)).toBeUndefined()
    })

    it("should handle single empty space correctly", () => {
        const board = [
            ['O', 'X', 'X'],
            ['X', 'O', 'O'],
            ['O', 'X', ' '],
        ];
        const player = 'X'

        expect(getRandomPosition(board, player)).toEqual([2, 2])
    })

    it("should work on completely empty board", () => {
        const board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' '],
        ];
        const player = 'X'

        const result = getRandomPosition(board, player)
        expect(result).toBeDefined()
        expect(result.length).toBe(2)
        expect(result[0]).toBeGreaterThanOrEqual(0)
        expect(result[0]).toBeLessThanOrEqual(2)
        expect(result[1]).toBeGreaterThanOrEqual(0)
        expect(result[1]).toBeLessThanOrEqual(2)
    })

    it("should return random positions over multiple calls", () => {
        const board = [
            [' ', ' ', ' '],
            [' ', 'X', ' '],
            [' ', ' ', ' '],
        ];
        const player = 'O'

        const results = new Set()

        for (let i = 0; i < 9; i++) {
            const result = getRandomPosition(board, player)
            results.add(JSON.stringify(result))
        }

        expect(results.size).toBeGreaterThan(1)
    })
})