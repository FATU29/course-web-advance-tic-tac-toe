import type { ReactNode } from "react";

export type Player = "X" | "O" | null;

export type Square = Player;

export type Board = Square[];

export type Move = {
  square: number;
  player: Player;
  location: {
    row: number;
    col: number;
  };
};

export type GameState = {
  history: Board[];
  currentMove: number;
  moves: Move[];
  isAscending: boolean;
};

export type GameStatus = {
  winner: Player;
  winningSquares: number[] | null;
  isDraw: boolean;
  isGameOver: boolean;
};

export type GameContextType = {
  gameState: GameState;
  gameStatus: GameStatus;
  handleSquareClick: (squareIndex: number) => void;
  jumpToMove: (move: number) => void;
  toggleSortOrder: () => void;
  resetGame: () => void;
};

export type { ReactNode };
