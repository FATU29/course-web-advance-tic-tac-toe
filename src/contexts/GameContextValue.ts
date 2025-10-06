import { createContext } from "react";
import type { GameContextType } from "../types/game";

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);
