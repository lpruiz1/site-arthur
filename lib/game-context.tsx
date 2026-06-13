"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

const ALL_LETTER_IDS = ["pet-game", "quiz-game", "pink-game", "jimin-game", "pony-game", "pink-game-2"]

interface GameContextType {
  unlockedLetters: Set<string>
  unlockLetter: (id: string) => void
}

const GameCtx = createContext<GameContextType | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [unlockedLetters, setUnlockedLetters] = useState<Set<string>>(new Set())

  const unlockLetter = useCallback((id: string) => {
    setUnlockedLetters(prev => {
      if (prev.has(id)) return prev
      return new Set([...prev, id])
    })
  }, [])

  return (
    <GameCtx.Provider value={{ unlockedLetters, unlockLetter }}>
      {children}
    </GameCtx.Provider>
  )
}

export function useGame() {
  const ctx = useContext(GameCtx)
  if (!ctx) throw new Error("useGame must be used within GameProvider")
  return ctx
}
