"use client"

import { useState, useEffect, useRef } from "react"
import { useGame } from "@/lib/game-context"
import confetti from "canvas-confetti"

function PetGameFullscreen({ onWin, onClose }: { onWin: () => void; onClose: () => void }) {
  const [pets, setPets] = useState(0)
  const [goal] = useState(30)
  const [happy, setHappy] = useState(false)
  const [won, setWon] = useState(false)
  const [popping, setPopping] = useState(false)
  const timerRef = useRef<NodeJS.Timeout>()
  const wonRef = useRef(false)

  const pet = () => {
    if (wonRef.current) return
    setPopping(true); setHappy(true)
    setTimeout(() => setPopping(false), 180)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setHappy(false), 700)
    setPets(p => {
      const next = p + 1
      if (next >= goal && !wonRef.current) {
        wonRef.current = true; setWon(true)
        confetti({ particleCount: 100, spread: 120, origin: { y: 0.4 }, colors: ["#ff6b9d", "#d4af7a", "#fff", "#ffb3d1"] })
        setTimeout(onWin, 1200)
      }
      return next
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "linear-gradient(180deg, #0d0005 0%, #1a000f 100%)" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4 flex-shrink-0">
        <div className="space-y-2 min-w-0 flex-1 pr-4">
          <p className="font-display font-bold text-lg leading-none" style={{ color: "#ff6b9d" }}>🐱 Carinhos na Agatha Christie!!</p>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#ffffff15" }}>
            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${(pets / goal) * 100}%`, background: "linear-gradient(90deg, #ff6b9d, #ffb3d1)" }} />
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="font-bold text-lg tabular-nums" style={{ color: "#ff6b9d" }}>{pets}/{goal}</span>
          <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center text-sm" style={{ background: "#ffffff15", color: "#f5e6d3aa" }}>✕</button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
        {!won ? (
          <>
            <p className="font-elegant italic text-base text-center leading-relaxed" style={{ color: "#f5e6d399" }}>
              {pets === 0 ? "Toque nela para fazer carinho! 🐱" : pets < 10 ? "Ela está gostando... continua!" : pets < 20 ? "Ronron... 😸" : "Quase lá! Ela tá amando!"}
            </p>
            <button
              onPointerDown={pet}
              className="relative select-none outline-none"
              style={{ transform: popping ? "scale(1.09)" : "scale(1)", transition: "transform 0.12s ease", cursor: "pointer", WebkitTapHighlightColor: "transparent" }}
            >
              <img src={happy ? "/cat-happy.png" : "/cat-pet.png"} alt="Gatinha" style={{ width: 210, height: 210, objectFit: "contain", borderRadius: 24, filter: "drop-shadow(0 0 24px #ff6b9d33)", imageRendering: "auto" }} />
              {popping && <div className="absolute -top-5 -right-5 text-3xl pointer-events-none leading-none" style={{ animation: "entrance-burst 0.3s ease forwards" }}>✨</div>}
              {popping && <div className="absolute -top-4 -left-5 text-2xl pointer-events-none leading-none" style={{ animation: "entrance-burst 0.3s ease forwards", animationDelay: "0.05s" }}>💕</div>}
            </button>
            <p className="text-sm" style={{ color: "#ff6b9d22" }}>toque repetidamente!</p>
          </>
        ) : (
          <div className="text-center space-y-5 px-4">
            <img src="/cat-happy.png" alt="Gatinha feliz" className="animate-float mx-auto" style={{ width: 170, height: 170, objectFit: "contain", filter: "drop-shadow(0 0 30px #ff6b9d88)" }} />
            <p className="font-display text-3xl font-black leading-tight" style={{ color: "#ff6b9d" }}>Ela adorou! 🐱💕</p>
            <p className="font-elegant italic text-lg leading-relaxed" style={{ color: "#f5e6d3aa" }}>Carta desbloqueada! Vai em 💌 Cartas para ler!</p>
            <button onClick={onClose} className="px-10 py-4 rounded-2xl font-bold text-lg active:scale-95 transition-transform" style={{ background: "#ff6b9d", color: "#000" }}>
              Voltar ✨
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export function CatSection() {
  const [visible, setVisible] = useState(false)
  const [gameOpen, setGameOpen] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const { unlockLetter } = useGame()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {gameOpen && <PetGameFullscreen onWin={() => { setGameWon(true); unlockLetter("pet-game") }} onClose={() => setGameOpen(false)} />}

      <section ref={ref} className="min-h-screen flex flex-col items-center justify-center py-20 px-6 relative" style={{ background: "linear-gradient(180deg, #000 0%, #1a0010 50%, #000 100%)" }}>
        <div className="gold-line w-full absolute top-0" />

        <div className={`w-full max-w-sm mx-auto flex flex-col items-center gap-8 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
          <div className="text-center space-y-2 w-full">
            <span className="font-elegant italic text-sm tracking-widest uppercase" style={{ color: "#ff6b9d66" }}>seção 2</span>
            <h2 className="font-display font-black leading-none" style={{ fontSize: "clamp(2.8rem,13vw,4rem)", background: "linear-gradient(135deg, #ff6b9d, #ffb3d1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", paddingBottom: "0.05em" }}>
              Agatha Christie
            </h2>
            <p className="font-elegant italic text-base" style={{ color: "#ff6b9d77" }}>🐱 a bichinha mais fofa do mundo</p>
          </div>

          <div className="w-full rounded-3xl flex items-center justify-center py-8" style={{ background: "linear-gradient(135deg, #1a000f, #0d0008)", border: "1px solid #ff6b9d22" }}>
            <img src="/cat-pet.png" alt="Gatinha" className="animate-float" style={{ width: 170, height: 170, objectFit: "contain", filter: "drop-shadow(0 0 24px #ff6b9d33)" }} />
          </div>

          <button
            onClick={() => setGameOpen(true)}
            className="w-full rounded-3xl flex flex-col items-center gap-3 transition-all active:scale-95"
            style={{
              padding: "28px 24px",
              background: gameWon ? "linear-gradient(135deg, #ff6b9d1a, #ffb3d10d)" : "linear-gradient(135deg, #ff6b9d, #ec4899)",
              boxShadow: gameWon ? "none" : "0 0 40px #ff6b9d33",
              border: gameWon ? "1px solid #ff6b9d33" : "none",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {gameWon ? (
              <>
                <span className="text-3xl leading-none">✅</span>
                <p className="font-display text-lg font-black leading-none" style={{ color: "#ff6b9d" }}>Carta desbloqueada!</p>
                <p className="text-sm" style={{ color: "#ff6b9d55" }}>Fazer carinho de novo 🐾</p>
              </>
            ) : (
              <>
                <span className="text-4xl leading-none">🐾</span>
                <p className="font-display text-xl font-black leading-none" style={{ color: "#000" }}>Fazer carinho</p>
                <p className="text-sm" style={{ color: "#00000055" }}>30 carinhos para desbloquear uma carta 💌</p>
              </>
            )}
          </button>
        </div>

        <div className="gold-line w-full absolute bottom-0" />
      </section>
    </>
  )
}
