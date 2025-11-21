export const loadGame = async (gameId) => {
    const response = await fetch(`http://127.0.0.1:5000/games/load/${gameId}`)
    const data = await response.json()
    return data;
}