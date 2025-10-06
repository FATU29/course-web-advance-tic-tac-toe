import type { GameState } from "../types/game";
import {
  createEmptyBoard,
  makeMove,
  getCurrentPlayer,
  createMove,
} from "./gameLogic";

export const initialGameState: GameState = {
  history: [createEmptyBoard()],
  currentMove: 0,
  moves: [],
  isAscending: true,
};

export type GameAction =
  | { type: "MAKE_MOVE"; squareIndex: number }
  | { type: "JUMP_TO_MOVE"; move: number }
  | { type: "TOGGLE_SORT_ORDER" }
  | { type: "RESET_GAME" };
export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "MAKE_MOVE": {
      const { squareIndex } = action;
      const currentBoard = state.history[state.currentMove];
      const currentPlayer = getCurrentPlayer(state.currentMove);

      if (currentBoard[squareIndex] !== null) {
        return state;
      }

      const newBoard = makeMove(currentBoard, squareIndex, currentPlayer);
      const newMove = createMove(squareIndex, currentPlayer);
      const newHistory = state.history.slice(0, state.currentMove + 1);
      newHistory.push(newBoard);

      return {
        ...state,
        history: newHistory,
        currentMove: state.currentMove + 1,
        moves: [...state.moves.slice(0, state.currentMove), newMove],
      };
    }

    case "JUMP_TO_MOVE": {
      const { move } = action;
      return {
        ...state,
        currentMove: move,
      };
    }

    case "TOGGLE_SORT_ORDER": {
      return {
        ...state,
        isAscending: !state.isAscending,
      };
    }

    case "RESET_GAME": {
      return initialGameState;
    }

    default:
      return state;
  }
}
