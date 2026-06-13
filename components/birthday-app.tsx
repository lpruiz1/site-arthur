"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { EntranceScreen } from "./entrance-screen"
import { HeroSection } from "./hero-section"
import { LetterAlbum } from "./letter-album"
import { CatSection } from "./cat-section"
import { QuizSection } from "./quiz-section"
import { PinkPantheressSection } from "./pinkpantheress-section"
import { JiminSection } from "./jimin-section"
import { PonySection } from "./pony-section"
import { PlaylistSection } from "./playlist-section"
import { FinalSection } from "./final-section"
import { MusicPlayer } from "./music-player"

const SECTIONS = [
  { id: "hero",     label: "🎂 Início",          emoji: "🎂" },
  { id: "cartas",   label: "💌 Cartas",           emoji: "💌" },
  { id: "gata",     label: "🐱 Agatha Christie",  emoji: "🐱" },
  { id: "quiz",     label: "🎵 Quiz",             emoji: "🎵" },
  { id: "pink",     label: "🎀 Pink",             emoji: "🎀" },
  { id: "jimin",    label: "💜 Jimin",            emoji: "💜" },
  { id: "pony",     label: "🦄 Pony",             emoji: "🦄" },
  { id: "playlist", label: "🎵 Playlist",         emoji: "🎵" },
  { id: "final",    label: "✨ Final",            emoji: "✨" },
]

const SECTION_COMPONENTS = [
  HeroSection, LetterAlbum, CatSection, QuizSection,
  PinkPantheressSection, JiminSection, PonySection,
  PlaylistSection, FinalSection,
]

export function BirthdayApp() {
  const [entered, setEntered] = useState(false)
  const [current, setCurrent] = useState(0)
  const [showMenu, setShowMenu] = useState(false)
  const [direction, setDirection] = useState<"left" | "right">("right")
  const [animating, setAnimating] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const check = () => setIsTouch(window.matchMedia("(pointer: coarse)").matches)
    check()
    window.matchMedia("(pointer: coarse)").addEventListener("change", check)
    return () => window.matchMedia("(pointer: coarse)").removeEventListener("change", check)
  }, [])

  const goTo = useCallback((idx: number) => {
    if (idx === current || animating) return
    setDirection(idx > current ? "right" : "left")
    setAnimating(true)
    setTimeout(() => { setCurrent(idx); setAnimating(false); window.scrollTo(0, 0) }, 280)
    setShowMenu(false)
  }, [current, animating])

  const prev = useCallback(() => { if (current > 0) goTo(current - 1) }, [current, goTo])
  const next = useCallback(() => { if (current < SECTIONS.length - 1) goTo(current + 1) }, [current, goTo])

  useEffect(() => {
    if (!entered) return
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next()
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev()
    }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [entered, next, prev])

  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) next()
      else prev()
    }
    touchStartX.current = null
    touchStartY.current = null
  }, [next, prev])

  if (!entered) return <EntranceScreen onEnter={() => setEntered(true)} />

  const CurrentSection = SECTION_COMPONENTS[current]

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "#000" }}
      onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="min-h-screen" style={{
        paddingBottom: 96,
        opacity: animating ? 0 : 1,
        transform: animating ? `translateX(${direction === "right" ? "-24px" : "24px"})` : "translateX(0)",
        transition: "opacity 0.28s ease, transform 0.28s ease",
      }}>
        <CurrentSection />
      </div>

      {!isTouch && current > 0 && (
        <button onClick={prev} className="fixed left-3 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center rounded-full transition-all hover:scale-110 active:scale-90"
          style={{ width: 44, height: 44, background: "#111c", border: "1px solid #d4af7a44", backdropFilter: "blur(4px)" }} aria-label="Anterior">
          <span className="text-2xl leading-none" style={{ color: "#d4af7a" }}>‹</span>
        </button>
      )}
      {!isTouch && current < SECTIONS.length - 1 && (
        <button onClick={next} className="fixed right-3 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center rounded-full transition-all hover:scale-110 active:scale-90"
          style={{ width: 44, height: 44, background: "#111c", border: "1px solid #d4af7a44", backdropFilter: "blur(4px)" }} aria-label="Próximo">
          <span className="text-2xl leading-none" style={{ color: "#d4af7a" }}>›</span>
        </button>
      )}

      <div className="fixed bottom-0 left-0 right-0 z-40 flex flex-col items-center" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 8px)" }}>
        {showMenu && (
          <div className="mb-2 rounded-2xl p-3 w-full" style={{ maxWidth: 380, marginLeft: 12, marginRight: 12, background: "#0f0f0fee", border: "1px solid #d4af7a33", backdropFilter: "blur(16px)" }}>
            <div className="grid grid-cols-3 gap-2">
              {SECTIONS.map((s, i) => (
                <button key={s.id} onClick={() => goTo(i)}
                  className="px-2 rounded-xl text-xs font-bold transition-all active:scale-95"
                  style={{ paddingTop: 10, paddingBottom: 10, background: current === i ? "#d4af7a" : "#1f1f1f", color: current === i ? "#000" : "#f5e6d3bb", border: `1px solid ${current === i ? "#d4af7a" : "#ffffff15"}`, minHeight: 44 }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center gap-2 rounded-full mb-2" style={{ paddingLeft: 12, paddingRight: 12, paddingTop: 10, paddingBottom: 10, background: "#0f0f0fee", border: "1px solid #d4af7a22", backdropFilter: "blur(16px)", minHeight: 52 }}>
          <div className="flex gap-1.5 items-center">
            {SECTIONS.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} className="rounded-full transition-all active:scale-90"
                style={{ width: current === i ? 18 : 6, height: 6, minWidth: 6, background: current === i ? "#d4af7a" : "#ffffff33" }} />
            ))}
          </div>
          <button onClick={() => setShowMenu(v => !v)} className="rounded-full text-sm font-bold transition-all active:scale-95"
            style={{ marginLeft: 4, paddingLeft: 12, paddingRight: 12, paddingTop: 6, paddingBottom: 6, background: showMenu ? "#d4af7a" : "#1f1f1f", color: showMenu ? "#000" : "#d4af7a", border: "1px solid #d4af7a44", minHeight: 34 }}>
            {showMenu ? "✕" : SECTIONS[current].emoji}
          </button>
        </div>
      </div>

      <MusicPlayer />
    </div>
  )
}
