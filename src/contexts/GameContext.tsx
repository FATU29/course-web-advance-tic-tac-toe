import { useReducer } from "react";
import type { GameContextType, ReactNode } from "../types/game";
import { calculateGameStatus } from "../utils/gameLogic";
import { gameReducer, initialGameState } from "../utils/gameReducer";
import { GameContext } from "./GameContextValue";

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);
  const currentBoard = gameState.history[gameState.currentMove];
  const gameStatus = calculateGameStatus(currentBoard);

  const contextValue: GameContextType = {
    gameState,
    gameStatus,
    handleSquareClick: (squareIndex: number) => {
      if (gameStatus.isGameOver) return;
      dispatch({ type: "MAKE_MOVE", squareIndex });
    },
    jumpToMove: (move: number) => {
      dispatch({ type: "JUMP_TO_MOVE", move });
    },
    toggleSortOrder: () => {
      dispatch({ type: "TOGGLE_SORT_ORDER" });
    },
    resetGame: () => {
      dispatch({ type: "RESET_GAME" });
    },
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
}
