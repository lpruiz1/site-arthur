"use client"

import { useState, useEffect, useRef } from "react"
import { useGame } from "@/lib/game-context"
import { useAudio } from "@/lib/audio-context"
import confetti from "canvas-confetti"

const RARITY_EGGS = [
  { id: 0, found: false, hint: "💎", msg: "Darling! Rarity aprova seu estilo! ✨" },
  { id: 1, found: false, hint: "👑", msg: "Oh my stars! A unicórnio mais fabulosa te saúda! 💜" },
  { id: 2, found: false, hint: "🌟", msg: "Generosidade — o elemento da Rarity e também o seu 💎" },
]

// ─── Jogo de notas genérico — recebe goal e velocidade ────────────────────
function NoteGame({
  onWin, onClose, goal, spawnMs, fallSpeed, title, color, gameSong
}: {
  onWin: () => void
  onClose: () => void
  goal: number
  spawnMs: number
  fallSpeed: number
  title: string
  color: string
  gameSong?: string
}) {
  const [notes, setNotes] = useState<{ id: number; x: number; y: number; caught: boolean }[]>([])
  const [score, setScore] = useState(0)
  const [won, setWon] = useState(false)
  const idRef = useRef(0)
  const spawnRef = useRef<ReturnType<typeof setInterval>>()
  const fallRef = useRef<ReturnType<typeof setInterval>>()
  const wonRef = useRef(false)
  const { currentSrc, isPlaying, changeSong, pause } = useAudio()
  const prevSrcRef = useRef<string | null>(null)
  const wasPlayingRef = useRef(false)

  useEffect(() => {
    if (gameSong) {
      prevSrcRef.current = currentSrc
      wasPlayingRef.current = isPlaying
      changeSong(gameSong)
    }
    return () => {
      if (gameSong) {
        if (prevSrcRef.current) {
          changeSong(prevSrcRef.current)
        } else {
          pause()
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    spawnRef.current = setInterval(() => {
      if (wonRef.current) return
      const id = idRef.current++
      setNotes(p => [...p, { id, x: 8 + Math.random() * 84, y: -8, caught: false }])
      setTimeout(() => setNotes(p => p.filter(n => n.id !== id || n.caught)), 3200)
    }, spawnMs)
    fallRef.current = setInterval(() => {
      if (wonRef.current) return
      setNotes(p => p.map(n => n.caught ? n : { ...n, y: n.y + fallSpeed }).filter(n => n.y < 108))
    }, 40)
    return () => { clearInterval(spawnRef.current); clearInterval(fallRef.current) }
  }, [spawnMs, fallSpeed])

  const catchNote = (id: number) => {
    if (wonRef.current) return
    setNotes(p => p.map(n => n.id === id ? { ...n, caught: true } : n))
    confetti({ particleCount: 12, spread: 40, origin: { y: 0.5 }, colors: [color, "#fff", "#d4af7a"] })
    setScore(s => {
      const next = s + 1
      if (next >= goal && !wonRef.current) {
        wonRef.current = true
        setWon(true)
        clearInterval(spawnRef.current)
        clearInterval(fallRef.current)
        confetti({ particleCount: 100, spread: 120, origin: { y: 0.4 }, colors: [color, "#d4af7a", "#fff"] })
        setTimeout(onWin, 1200)
      }
      return next
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "linear-gradient(180deg, #0d0020 0%, #1a0030 100%)" }}>
      <div className="flex items-center justify-between px-5 pt-5 pb-3 flex-shrink-0">
        <div className="space-y-1 flex-1 min-w-0 pr-4">
          <p className="font-display font-bold text-lg" style={{ color }}>{title}</p>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#ffffff15" }}>
            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${(score / goal) * 100}%`, background: `linear-gradient(90deg, ${color}, #ec4899)` }} />
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="font-bold text-xl" style={{ color }}>{score}/{goal}</span>
          <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center text-sm" style={{ background: "#ffffff15", color: "#f5e6d3aa" }}>✕</button>
        </div>
      </div>
      <div className="relative flex-1 overflow-hidden" style={{ touchAction: "none" }}>
        {!won && notes.filter(n => !n.caught).map(n => (
          <button key={n.id} onPointerDown={() => catchNote(n.id)}
            className="absolute flex items-center justify-center rounded-full select-none"
            style={{ left: `${n.x}%`, top: `${n.y}%`, width: 52, height: 52, transform: "translate(-50%, -50%)", background: `linear-gradient(135deg, ${color}44, #ec489944)`, border: `2px solid ${color}88`, boxShadow: `0 0 16px ${color}44`, fontSize: 24, cursor: "pointer" }}>
            🎵
          </button>
        ))}
        {won && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-center px-8">
            <div className="text-6xl animate-float">🎶</div>
            <p className="font-display text-3xl font-black" style={{ color }}>Perfeita!</p>
            <p className="font-elegant italic text-lg" style={{ color: "#f5e6d3aa" }}>Carta desbloqueada! Vai em 💌 Cartas para ler!</p>
            <button onClick={onClose} className="px-8 py-4 rounded-full font-bold text-lg active:scale-95" style={{ background: color, color: "#000" }}>Voltar ✨</button>
          </div>
        )}
        {!won && <p className="absolute bottom-4 left-0 right-0 text-center text-sm" style={{ color: `${color}44` }}>toque nas notas antes que caiam!</p>}
      </div>
    </div>
  )
}

export function PinkPantheressSection() {
  const [visible, setVisible] = useState(false)
  const [eggs, setEggs] = useState(RARITY_EGGS)
  const [activeEgg, setActiveEgg] = useState<typeof RARITY_EGGS[0] | null>(null)
  // fase 1: 12 notas fáceis → pink-game / fase 2: 20 notas difíceis → pink-game-2
  const [phase1Open, setPhase1Open] = useState(false)
  const [phase2Open, setPhase2Open] = useState(false)
  const [phase1Won, setPhase1Won] = useState(false)
  const [phase2Won, setPhase2Won] = useState(false)
  const { unlockLetter } = useGame()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const findEgg = (id: number) => {
    const egg = eggs.find(e => e.id === id)
    if (!egg || egg.found) return
    setEggs(prev => prev.map(e => e.id === id ? { ...e, found: true } : e))
    setActiveEgg(egg)
    setTimeout(() => setActiveEgg(null), 3000)
  }

  return (
    <>
      {phase1Open && (
        <NoteGame
          goal={12} spawnMs={600} fallSpeed={2}
          title="🎵 Captura as Notas — Fase 1" color="#f472b6"
          gameSong="/music/pain.m4a"
          onWin={() => { setPhase1Won(true); unlockLetter("pink-game"); setPhase1Open(false) }}
          onClose={() => setPhase1Open(false)}
        />
      )}
      {phase2Open && (
        <NoteGame
          goal={20} spawnMs={380} fallSpeed={3.2}
          title="🎶 Captura as Notas — Fase 2" color="#c084fc"
          gameSong="/music/illegal.m4a"
          onWin={() => { setPhase2Won(true); unlockLetter("pink-game-2"); setPhase2Open(false) }}
          onClose={() => setPhase2Open(false)}
        />
      )}

      <section ref={ref} className="min-h-screen flex flex-col items-center justify-center py-20 px-5 relative" style={{ background: "linear-gradient(180deg, #000 0%, #1a0010 40%, #0d0020 70%, #000 100%)" }}>
        <div className="gold-line w-full absolute top-0" />

        {activeEgg && (
          <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 px-5 py-4 rounded-2xl text-center w-11/12 max-w-xs animate-entrance" style={{ background: "linear-gradient(135deg, #4a0e6e, #2d0050)", border: "2px solid #d4af7a", boxShadow: "0 0 40px #d4af7a44" }}>
            <p className="font-bold mb-1" style={{ color: "#d4af7a" }}>💎 Easter Egg Rarity!</p>
            <p className="font-elegant italic text-sm" style={{ color: "#f5e6d3cc" }}>{activeEgg.msg}</p>
          </div>
        )}

        <div className={`w-full max-w-sm mx-auto flex flex-col items-center gap-7 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
          {/* Header */}
          <div className="text-center space-y-2 w-full">
            <span className="font-elegant italic text-sm tracking-widest uppercase" style={{ color: "#f472b688" }}>seção 4</span>
            <h2 className="font-display text-5xl font-black" style={{ background: "linear-gradient(135deg, #f472b6, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", paddingBottom: "0.05em" }}>
              PinkPantheress
            </h2>
          </div>

          {/* Foto — object-contain para não cortar */}
          <div className="w-full rounded-3xl overflow-hidden relative flex items-center justify-center"
            style={{ border: "1px solid #f472b644", background: "#0d0010", boxShadow: "0 0 40px #f472b622", minHeight: 200 }}>
            <img
              src="/pink_pantheress.jpg"
              alt="PinkPantheress"
              style={{ width: "100%", height: "auto", maxHeight: 360, objectFit: "contain", display: "block" }}
            />
            {/* Easter egg */}
            <button onClick={() => findEgg(0)} className="absolute top-3 right-3 text-lg transition-all" style={{ opacity: eggs[0].found ? 1 : 0.08 }}>
              {eggs[0].found ? "💎" : "✦"}
            </button>
            {/* Overlay nome */}
            <div className="absolute bottom-0 left-0 right-0 px-5 py-4" style={{ background: "linear-gradient(to top, #0d0010 70%, transparent)" }}>
              <p className="font-display text-xl font-bold leading-tight" style={{ color: "#f472b6" }}>PinkPantheress</p>
              <p className="font-elegant italic text-sm mt-0.5" style={{ color: "#f5e6d399" }}>artista britânica · drum & bass · UK garage</p>
            </div>
          </div>

          {/* Easter eggs visíveis */}
          <div className="flex justify-center gap-4 w-full">
            {eggs.map(egg => (
              <div key={egg.id} className="text-xl transition-all" style={{ opacity: egg.found ? 1 : 0.15, filter: egg.found ? "none" : "grayscale(1)" }}>
                {egg.found ? egg.hint : "❓"}
              </div>
            ))}
          </div>

          {/* Fase 1 */}
          <div className="w-full rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0d0d0d, #1a1a1a)", border: "1px solid #f472b61a" }}>
            <div className="px-5 py-4 flex items-center justify-between border-b" style={{ borderColor: "#ffffff08" }}>
              <div className="flex items-center gap-3">
                <span className="text-xl leading-none">🎵</span>
                <div>
                  <p className="font-bold text-sm" style={{ color: "#f5e6d3" }}>Fase 1 — Iniciante</p>
                  <p className="text-xs" style={{ color: "#f5e6d355" }}>12 notas · velocidade normal</p>
                </div>
              </div>
              {phase1Won && <span className="text-lg">✅</span>}
            </div>
            <div className="px-5 py-4">
              <button onClick={() => setPhase1Open(true)}
                className="w-full py-3 rounded-2xl font-bold text-sm active:scale-95 transition-all"
                style={{ background: phase1Won ? "#f472b611" : "linear-gradient(135deg, #f472b6, #ec4899)", color: phase1Won ? "#f472b6" : "#000", border: phase1Won ? "1px solid #f472b633" : "none" }}>
                {phase1Won ? "Jogar de novo" : "▶ Jogar — desbloqueia carta do Dhionatan 💌"}
              </button>
            </div>
          </div>

          {/* Fase 2 — disponível sempre, mais difícil */}
          <div className="w-full rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0d0d0d, #1a1a1a)", border: "1px solid #c084fc1a" }}>
            <div className="px-5 py-4 flex items-center justify-between border-b" style={{ borderColor: "#ffffff08" }}>
              <div className="flex items-center gap-3">
                <span className="text-xl leading-none">🎶</span>
                <div>
                  <p className="font-bold text-sm" style={{ color: "#f5e6d3" }}>Fase 2 — Difícil</p>
                  <p className="text-xs" style={{ color: "#f5e6d355" }}>20 notas · velocidade alta</p>
                </div>
              </div>
              {phase2Won && <span className="text-lg">✅</span>}
            </div>
            <div className="px-5 py-4">
              <button onClick={() => setPhase2Open(true)}
                className="w-full py-3 rounded-2xl font-bold text-sm active:scale-95 transition-all"
                style={{ background: phase2Won ? "#c084fc11" : "linear-gradient(135deg, #c084fc, #9b59b6)", color: phase2Won ? "#c084fc" : "#000", border: phase2Won ? "1px solid #c084fc33" : "none" }}>
                {phase2Won ? "Jogar de novo" : "▶ Jogar — desbloqueia carta da Ana Lívia 💌"}
              </button>
            </div>
          </div>

          {/* Easter eggs ocultos */}
          <button onClick={() => findEgg(1)} className="opacity-0 h-1 w-full" aria-hidden />
          <p className="text-xs select-none" style={{ color: "#ffffff04" }} onClick={() => findEgg(2)}>20% cooler</p>
        </div>

        <div className="gold-line w-full absolute bottom-0" />
      </section>
    </>
  )
}
