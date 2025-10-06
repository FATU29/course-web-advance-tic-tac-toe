import type { Square } from "../types/game";

interface BoardProps {
  squares: Square[];
  winningSquares: number[] | null;
  onSquareClick: (index: number) => void;
}

export function Board({ squares, winningSquares, onSquareClick }: BoardProps) {
  const renderSquare = (row: number, col: number) => {
    const index = row * 3 + col;
    const isWinningSquare = winningSquares?.includes(index) || false;
    const isOccupied = !!squares[index];

    return (
      <button
        key={index}
        className={`
          w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 text-3xl sm:text-4xl md:text-5xl font-bold 
          border-2 border-gray-400 rounded-lg shadow-md
          transition-all duration-300 ease-in-out transform
          focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50
          ${
            isWinningSquare
              ? "bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg scale-105 animate-pulse"
              : isOccupied
              ? `bg-white cursor-default shadow-inner ${
                  squares[index] === "X" ? "text-red-600" : "text-blue-600"
                }`
              : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-600 hover:from-blue-50 hover:to-blue-100 hover:text-blue-600 hover:scale-105 hover:shadow-lg cursor-pointer active:scale-95"
          }
        `}
        onClick={() => onSquareClick(index)}
        disabled={isOccupied}
        aria-label={`Square ${row + 1}, ${col + 1}${
          isOccupied ? ` - ${squares[index]}` : " - Empty"
        }`}
      >
        {squares[index] && (
          <span className="drop-shadow-sm">{squares[index]}</span>
        )}
      </button>
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-2xl shadow-2xl border-4 border-gray-700">
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {Array.from({ length: 3 }, (_, row) =>
          Array.from({ length: 3 }, (_, col) => renderSquare(row, col))
        )}
      </div>
    </div>
  );
}
