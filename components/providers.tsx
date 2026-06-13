"use client"

import { AudioProvider } from "@/lib/audio-context"
import { GameProvider } from "@/lib/game-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AudioProvider>
      <GameProvider>{children}</GameProvider>
    </AudioProvider>
  )
}
