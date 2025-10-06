import type { Board, Player, GameStatus, Move } from "../types/game";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
export function calculateWinner(board: Board): {
  winner: Player;
  winningSquares: number[] | null;
} {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a],
        winningSquares: combination,
      };
    }
  }
  return {
    winner: null,
    winningSquares: null,
  };
}

export function isBoardFull(board: Board): boolean {
  return board.every((square) => square !== null);
}

export function calculateGameStatus(board: Board): GameStatus {
  const { winner, winningSquares } = calculateWinner(board);
  const isDraw = !winner && isBoardFull(board);

  return {
    winner,
    winningSquares,
    isDraw,
    isGameOver: !!winner || isDraw,
  };
}

export function getSquareLocation(squareIndex: number): {
  row: number;
  col: number;
} {
  return {
    row: Math.floor(squareIndex / 3),
    col: squareIndex % 3,
  };
}

export function createMove(squareIndex: number, player: Player): Move {
  return {
    square: squareIndex,
    player,
    location: getSquareLocation(squareIndex),
  };
}

export function getCurrentPlayer(currentMove: number): Player {
  return currentMove % 2 === 0 ? "X" : "O";
}

export function createEmptyBoard(): Board {
  return Array(9).fill(null);
}

export function makeMove(
  board: Board,
  squareIndex: number,
  player: Player
): Board {
  if (board[squareIndex] !== null) {
    return board;
  }

  const newBoard = [...board];
  newBoard[squareIndex] = player;
  return newBoard;
}
