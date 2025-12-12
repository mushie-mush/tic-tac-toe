export const saveGame = async (board, player) => {
    
    try {
        const response = await fetch(`http://127.0.0.1:5000/games/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ board: board, currentPlayer: player })
        })
        const data = await response.json()

        const loadedGameSessions = JSON.parse(localStorage.getItem('savedGames') || '[]');
        loadedGameSessions.push(data.game_id)
        localStorage.setItem('savedGames', JSON.stringify(loadedGameSessions))

        return data;
    } catch (error) {
        console.error('Error saving game:', error);
    }
}