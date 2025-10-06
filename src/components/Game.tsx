import { useGame } from "../hooks/useGame";
import { Board } from "./Board";

export function Game() {
  const {
    gameState,
    gameStatus,
    handleSquareClick,
    jumpToMove,
    toggleSortOrder,
    resetGame,
  } = useGame();

  const currentBoard = gameState.history[gameState.currentMove];
  const currentPlayer = gameState.currentMove % 2 === 0 ? "X" : "O";

  const moveHistory = gameState.history.map((board, move) => {
    const moveData = gameState.moves[move - 1];
    return {
      move,
      board,
      moveData,
    };
  });

  const sortedMoves = gameState.isAscending
    ? moveHistory
    : [...moveHistory].reverse();

  const getStatusMessageWithColor = () => {
    if (gameStatus.winner) {
      return (
        <span>
          Winner:{" "}
          <span
            className={
              gameStatus.winner === "X" ? "text-red-200" : "text-blue-200"
            }
          >
            {gameStatus.winner}
          </span>
        </span>
      );
    }
    if (gameStatus.isDraw) {
      return "It's a draw!";
    }
    return (
      <span>
        Next player:{" "}
        <span
          className={currentPlayer === "X" ? "text-red-200" : "text-blue-200"}
        >
          {currentPlayer}
        </span>
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 drop-shadow-sm">
            Tic Tac Toe
          </h1>

          <div className="mb-4">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20">
              <span className="text-lg font-semibold text-gray-700">
                You are at move #{gameState.currentMove}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <div
              className={`inline-flex items-center px-6 py-3 rounded-full shadow-lg font-bold text-xl ${
                gameStatus.winner
                  ? "bg-gradient-to-r from-green-400 to-green-600 text-white animate-bounce"
                  : gameStatus.isDraw
                  ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white animate-pulse"
                  : "bg-gradient-to-r from-blue-400 to-blue-600 text-white"
              }`}
            >
              {getStatusMessageWithColor()}
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 items-start justify-center">
          <div className="flex flex-col items-center w-full xl:w-auto xl:flex-shrink-0">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/20">
              <Board
                squares={currentBoard}
                winningSquares={gameStatus.winningSquares}
                onSquareClick={handleSquareClick}
              />
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                🔄 Reset Game
              </button>
              <button
                onClick={toggleSortOrder}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                📊 {gameState.isAscending ? "↑ Ascending" : "↓ Descending"}
              </button>
            </div>
          </div>

          <div className="w-full xl:w-96 xl:flex-shrink-0">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center">
                  📋 Move History
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {sortedMoves.map(({ move, moveData }) => (
                    <div
                      key={move}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        move === gameState.currentMove
                          ? "border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg scale-105"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md hover:scale-102"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-800 flex items-center">
                          {move === 0 ? <>🎮 Game Start</> : <>Move {move}</>}
                        </span>
                        {move > 0 && (
                          <button
                            onClick={() => jumpToMove(move)}
                            className="px-3 py-1.5 bg-gradient-to-r from-gray-500 to-gray-600 text-white text-sm rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                          >
                            Go to
                          </button>
                        )}
                      </div>
                      {moveData && (
                        <div className="mt-3 text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
                          <p className="font-semibold">
                            Player:{" "}
                            <span
                              className={`font-bold ${
                                moveData.player === "X"
                                  ? "text-red-600"
                                  : "text-blue-600"
                              }`}
                            >
                              {moveData.player}
                            </span>
                          </p>
                          <p className="font-semibold">
                            Location:{" "}
                            <span className="text-green-600">
                              ({moveData.location.row}, {moveData.location.col})
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
