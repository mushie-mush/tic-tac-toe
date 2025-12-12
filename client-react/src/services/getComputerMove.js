export const getComputerMove = async (board, player, playerMove) => {
    try {
        const response = await fetch(`http://localhost:3000/play?board=${JSON.stringify(board)}&player=${player}&move=${encodeURIComponent(JSON.stringify(playerMove))}`);
        return await response.json();
    } catch (error) {
        return {
            computerMove: null,
            isEnd: false,
            message: error.message,
            error: error,
        }
    }
}