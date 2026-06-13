"use client"

import { useState } from "react"
import { useAudio } from "@/lib/audio-context"

export function MusicPlayer() {
  const { isPlaying, volume, setVolume, toggle } = useAudio()
  const [showVolume, setShowVolume] = useState(false)

  return (
    <div className="fixed bottom-16 right-4 z-50 flex items-center gap-2">
      <div className="overflow-hidden transition-all" style={{ width: showVolume ? 88 : 0, opacity: showVolume ? 1 : 0 }}>
        <input type="range" min="0" max="1" step="0.05" value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full accent-yellow-400"
        />
      </div>
      <button onClick={() => setShowVolume(!showVolume)} className="w-9 h-9 rounded-full flex items-center justify-center text-base transition-all hover:scale-110" style={{ background: "#1a1a1a", border: "1px solid #ffffff22" }}>
        {volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}
      </button>
      <button onClick={toggle} className="w-11 h-11 rounded-full flex items-center justify-center text-xl transition-all hover:scale-110" style={{ background: "linear-gradient(135deg, #d4af7a, #c9a96e)", boxShadow: `0 0 ${isPlaying ? 20 : 8}px #d4af7a44` }}>
        {isPlaying ? "⏸" : "▶"}
      </button>
    </div>
  )
}
