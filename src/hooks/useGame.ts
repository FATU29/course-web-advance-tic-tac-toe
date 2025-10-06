import { useContext } from "react";
import type { GameContextType } from "../types/game";
import { GameContext } from "../contexts/GameContextValue";

export function useGame(): GameContextType {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
