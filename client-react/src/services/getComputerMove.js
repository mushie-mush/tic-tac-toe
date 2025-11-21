export const getComputerMove = async (board, player, playerMove) => {
    const response = await fetch(`http://localhost:3000/play?board=${JSON.stringify(board)}&player=${player}&move=${encodeURIComponent(JSON.stringify(playerMove))}`);
    return await response.json();
}