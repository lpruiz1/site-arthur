"use client"

import { useState, useEffect, useRef } from "react"
import { useGame } from "@/lib/game-context"
import confetti from "canvas-confetti"

const COLORS = [
  { id: 0, color: "#9b59b6", label: "💜" },
  { id: 1, color: "#c084fc", label: "🌸" },
  { id: 2, color: "#7c3aed", label: "✨" },
  { id: 3, color: "#a855f7", label: "💫" },
]

function SequenceGameFullscreen({ onWin, onClose }: { onWin: () => void; onClose: () => void }) {
  const [seq, setSeq] = useState<number[]>([])
  const [playerSeq, setPlayerSeq] = useState<number[]>([])
  const [showing, setShowing] = useState(false)
  const [activeBtn, setActiveBtn] = useState<number | null>(null)
  const [started, setStarted] = useState(false)
  const [won, setWon] = useState(false)
  const [failed, setFailed] = useState(false)
  const [round, setRound] = useState(0)
  const GOAL = 4

  const showSequence = (s: number[]) => {
    setShowing(true); setPlayerSeq([])
    let i = 0
    const next = () => {
      if (i >= s.length) { setShowing(false); setActiveBtn(null); return }
      setActiveBtn(s[i])
      setTimeout(() => { setActiveBtn(null); i++; setTimeout(next, 300) }, 600)
    }
    setTimeout(next, 600)
  }

  const start = () => {
    const first = Math.floor(Math.random() * 4)
    setSeq([first]); setPlayerSeq([]); setRound(1); setWon(false); setFailed(false); setStarted(true)
    showSequence([first])
  }

  const press = (id: number) => {
    if (showing || won || failed) return
    const next = [...playerSeq, id]
    setPlayerSeq(next)
    if (next[next.length - 1] !== seq[next.length - 1]) { setFailed(true); return }
    if (next.length === seq.length) {
      if (round >= GOAL) {
        setWon(true)
        confetti({ particleCount: 100, spread: 120, origin: { y: 0.4 }, colors: ["#9b59b6", "#c084fc", "#d4af7a"] })
        setTimeout(onWin, 1000)
      } else {
        const newSeq = [...seq, Math.floor(Math.random() * 4)]
        setSeq(newSeq); setRound(r => r + 1)
        setTimeout(() => showSequence(newSeq), 600)
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "linear-gradient(180deg, #0d0014 0%, #1a0028 100%)" }}>
      <div className="flex items-center justify-between px-5 pt-5 pb-3 flex-shrink-0">
        <div className="space-y-1">
          <p className="font-display font-bold text-lg" style={{ color: "#c084fc" }}>🧠 Sequência BTS</p>
          <div className="w-40 h-2 rounded-full overflow-hidden" style={{ background: "#ffffff15" }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${(round / GOAL) * 100}%`, background: "linear-gradient(90deg, #7c3aed, #c084fc)" }} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-bold" style={{ color: "#c084fc" }}>{round}/{GOAL}</span>
          <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center text-sm" style={{ background: "#ffffff15", color: "#f5e6d3aa" }}>✕</button>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-8 px-5">
        {!started && !won && (
          <div className="text-center space-y-5">
            <p className="text-5xl">🧠</p>
            <p className="font-display text-2xl font-black" style={{ color: "#c084fc" }}>Simon Says</p>
            <p className="font-elegant italic text-base" style={{ color: "#f5e6d3aa" }}>Observe a sequência e repita!</p>
            <button onClick={start} className="px-10 py-5 rounded-full font-bold text-lg transition-all active:scale-95" style={{ background: "#9b59b6", color: "#fff", boxShadow: "0 0 30px #9b59b644" }}>Começar!</button>
          </div>
        )}
        {failed && (
          <div className="text-center space-y-5">
            <p className="text-5xl">😅</p>
            <p className="font-display text-2xl font-black" style={{ color: "#c084fc" }}>Quase!</p>
            <p className="font-elegant italic" style={{ color: "#f5e6d3aa" }}>Errou a sequência. Tenta de novo!</p>
            <button onClick={start} className="px-10 py-5 rounded-full font-bold text-lg active:scale-95" style={{ background: "#9b59b6", color: "#fff" }}>Tentar de novo</button>
          </div>
        )}
        {won && (
          <div className="text-center space-y-5">
            <p className="text-6xl animate-float">💜</p>
            <p className="font-display text-3xl font-black" style={{ color: "#c084fc" }}>Incrível!</p>
            <p className="font-elegant italic text-lg" style={{ color: "#f5e6d3aa" }}>Carta desbloqueada! Vai em 💌 Cartas!</p>
            <button onClick={onClose} className="px-10 py-5 rounded-full font-bold text-lg active:scale-95" style={{ background: "#9b59b6", color: "#fff" }}>Voltar ✨</button>
          </div>
        )}
        {started && !failed && !won && (
          <>
            <p className="font-elegant italic text-base" style={{ color: "#9b59b688" }}>
              {showing ? "Observe a sequência..." : "Agora repita!"}
            </p>
            <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
              {COLORS.map(c => (
                <button key={c.id} onPointerDown={() => press(c.id)} disabled={showing}
                  className="rounded-3xl text-5xl font-bold transition-all active:scale-95 select-none"
                  style={{ height: 110, background: activeBtn === c.id ? c.color : `${c.color}33`, border: `3px solid ${c.color}66`, boxShadow: activeBtn === c.id ? `0 0 30px ${c.color}` : "none", transform: activeBtn === c.id ? "scale(1.06)" : "scale(1)", opacity: showing && activeBtn !== c.id ? 0.5 : 1, transition: "all 0.12s" }}>
                  {c.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const JIMIN_MEDIA = [
  { src: "/jimin3.gif" },
  { src: "/jimin1.jpg" },
  { src: "/jimin2.webp" },
  { src: "/jimin4.webp" },
  { src: "/jimin5.webp" },
]

export function JiminSection() {
  const [visible, setVisible] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const [gameOpen, setGameOpen] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [sakura, setSakura] = useState<{ x: number; delay: number; size: number }[]>([])
  const { unlockLetter } = useGame()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    setSakura(Array.from({ length: 12 }, () => ({ x: Math.random() * 100, delay: Math.random() * 6, size: Math.random() * 10 + 8 })))
  }, [])

  return (
    <>
      {gameOpen && <SequenceGameFullscreen onWin={() => { setGameWon(true); unlockLetter("jimin-game") }} onClose={() => setGameOpen(false)} />}

      <section ref={ref} className="min-h-screen flex flex-col items-center justify-center py-20 px-5 relative" style={{ background: "linear-gradient(180deg, #000 0%, #0d0014 30%, #1a0028 60%, #000 100%)" }}>
        {sakura.map((s, i) => (
          <div key={i} className="absolute pointer-events-none" style={{ left: `${s.x}%`, top: -20, fontSize: s.size, animation: `sakura-fall ${8 + s.delay}s linear infinite`, animationDelay: `${s.delay}s` }}>🌸</div>
        ))}

        <div className={`w-full max-w-md mx-auto flex flex-col items-center gap-7 relative z-10 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
          <div className="text-center space-y-2">
            <span className="font-elegant italic text-sm tracking-widest uppercase" style={{ color: "#9b59b688" }}>seção 5</span>
            <h2 className="font-display text-5xl font-black" style={{ background: "linear-gradient(135deg, #c084fc, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Jimin Universe
            </h2>
          </div>

          <div className="w-full">
            {/* Imagem principal — sem corte, acomoda a imagem inteira */}
            <div className="rounded-3xl overflow-hidden mb-3 relative flex items-center justify-center"
              style={{ border: "1px solid #9b59b644", background: "#0d0014", minHeight: 220 }}>
              <img
                src={JIMIN_MEDIA[activeIdx].src}
                alt="Jimin"
                style={{ width: "100%", height: "auto", maxHeight: 340, objectFit: "contain", display: "block" }}
              />
              <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none" style={{ background: "linear-gradient(to top, #0d0014, transparent)" }} />
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2 justify-center">
              {JIMIN_MEDIA.map((m, i) => (
                <button key={i} onClick={() => setActiveIdx(i)}
                  className="rounded-xl overflow-hidden flex-shrink-0 transition-all"
                  style={{ width: 52, height: 40, border: activeIdx === i ? "2px solid #c084fc" : "2px solid #ffffff11", boxShadow: activeIdx === i ? "0 0 10px #9b59b666" : "none", opacity: activeIdx === i ? 1 : 0.5 }}>
                  <img src={m.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => setGameOpen(true)}
            className="w-full rounded-3xl py-6 flex flex-col items-center gap-3 transition-all active:scale-95 hover:opacity-90"
            style={{ background: gameWon ? "linear-gradient(135deg, #9b59b622, #7c3aed11)" : "linear-gradient(135deg, #9b59b6, #7c3aed)", boxShadow: gameWon ? "none" : "0 0 40px #9b59b644" }}>
            {gameWon ? (
              <><span className="text-3xl">✅</span><p className="font-display text-lg font-black" style={{ color: "#c084fc" }}>Carta desbloqueada!</p><p className="text-sm" style={{ color: "#9b59b688" }}>Jogar de novo</p></>
            ) : (
              <><span className="text-4xl">🧠</span><p className="font-display text-xl font-black text-white">Sequência BTS</p><p className="text-sm text-white/60">Jogue para desbloquear uma carta 💌</p></>
            )}
          </button>
        </div>

        <div className="gold-line w-full absolute bottom-0" />
      </section>
    </>
  )
}
