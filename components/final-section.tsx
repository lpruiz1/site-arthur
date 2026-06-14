"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import confetti from "canvas-confetti"
import { useAudio } from "@/lib/audio-context"

const CELEBS = [
  "/celebs/Celeb1.png",
  "/celebs/Celeb2.png",
  "/celebs/Celeb3.png",
  "/celebs/Celeb4.png",
  "/celebs/Celeb5.png",
  "/celebs/Celeb6.png",
  "/celebs/Celeb7.png",
  "/celebs/Celeb8.png",
  "/celebs/Celeb9.png",
  "/celebs/Celeb10.png",
]

// Ângulos de explosão para cada personagem (em graus, 0 = direita)
const ANGLES = [0, 36, 72, 108, 144, 180, 216, 252, 288, 324]

export function FinalSection() {
  const [visible, setVisible] = useState(false)
  // burst guarda o ponto (x,y) na TELA de onde a explosão sai + um id pra forçar remount a cada toque
  const [burst, setBurst] = useState<{ x: number; y: number; id: number } | null>(null)
  const { changeSong } = useAudio()
  const ref = useRef<HTMLElement>(null)
  const cakeRef = useRef<HTMLButtonElement>(null)
  const musicPlayedRef = useRef(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true)
        if (!musicPlayedRef.current) {
          musicPlayedRef.current = true
          changeSong("/music/tudo-pra-amar-vc.m4a")
        }
      }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [changeSong])

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const launchCelebration = () => {
    const colors = ["#d4af7a", "#ff6b9d", "#9b59b6", "#fff", "#ff8c42"]
    const end = Date.now() + 3000
    const fire = () => {
      confetti({ particleCount: 12, angle: 60,  spread: 90, origin: { x: 0 },   colors })
      confetti({ particleCount: 12, angle: 120, spread: 90, origin: { x: 1 },   colors })
      confetti({ particleCount: 10, spread: 140, origin: { x: 0.5, y: 0.4 },    colors })
      if (Date.now() < end) requestAnimationFrame(fire)
    }
    fire()

    // ponto central do bolo na tela -> a explosão sai exatamente daqui
    const r = cakeRef.current?.getBoundingClientRect()
    const x = r ? r.left + r.width / 2 : window.innerWidth / 2
    const y = r ? r.top + r.height / 2 : window.innerHeight / 2

    setBurst({ x, y, id: Date.now() }) // id novo => remonta => animação reinicia em todo toque
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setBurst(null), 1900)
  }

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center py-20 px-6 relative"
      style={{ background: "radial-gradient(ellipse at bottom, #1a0010 0%, #000 70%)" }}
    >
      <style>{`
        @keyframes celeb-explode {
          0%   { transform: translate(-50%, -50%) translate(0, 0) scale(0.2) rotate(0deg); opacity: 0; }
          15%  { opacity: 1; }
          70%  { opacity: 1; }
          100% { transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) scale(1) rotate(var(--rot)); opacity: 0; }
        }
      `}</style>

      <div className={`w-full max-w-sm mx-auto flex flex-col items-center gap-10 text-center transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
        <div className="space-y-3 w-full">
          <span className="font-elegant italic text-sm tracking-widest uppercase" style={{ color: "#d4af7a77" }}>seção final</span>
          <h2 className="font-display font-black leading-none" style={{ fontSize: "clamp(2.4rem,11vw,3.6rem)", background: "linear-gradient(135deg, #d4af7a, #fff9e6, #d4af7a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", paddingBottom: "0.05em" }}>
            Feliz Aniversário!
          </h2>
          <p className="font-elegant italic text-xl" style={{ color: "#ff6b9d" }}>🎂 Ketellen 🎂</p>
        </div>

        {/* Container do bolo */}
        <div className="relative flex items-center justify-center" style={{ width: 200, height: 200 }}>
          {/* Bolo */}
          <button
            ref={cakeRef}
            onClick={launchCelebration}
            className="relative z-20 transition-all active:scale-90 hover:scale-105 select-none"
            style={{
              fontSize: "clamp(6rem,26vw,9rem)",
              lineHeight: 1,
              filter: "drop-shadow(0 10px 40px #ff6b9d55)",
              WebkitTapHighlightColor: "transparent",
              animation: "float-gentle 3s ease-in-out infinite",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            aria-label="Explodir personagens">
            🎂
          </button>
        </div>

        <p className="font-elegant italic text-base" style={{ color: "#f5e6d355" }}>
          toque no bolo para celebrar 🎉
        </p>

        <div className="w-full rounded-3xl p-6 space-y-4 text-center" style={{ background: "linear-gradient(135deg, #1a0010, #0d0005)", border: "1px solid #d4af7a33", boxShadow: "0 0 40px #d4af7a11" }}>
          <p className="font-display text-xl font-bold" style={{ color: "#d4af7a" }}>Que esse ano seja incrível</p>
          <p className="font-elegant italic text-base leading-relaxed" style={{ color: "#f5e6d3aa" }}>
            Cheio de momentos inesquecíveis, e de toda a felicidade que você merece. 💛
          </p>
          <p className="font-elegant italic text-sm" style={{ color: "#ff6b9d88" }}>Com muito amor, de quem fez esse site pra você ✨</p>
        </div>

        <div className="gold-line w-32 mx-auto" />
      </div>

      {/* Explosão em overlay fixo (portal) — não pode ser cortada nem coberta por nada */}
      {burst && typeof document !== "undefined" &&
        createPortal(
          <div
            key={burst.id}
            style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, overflow: "visible" }}
          >
            {CELEBS.map((src, i) => {
              const angleRad = (ANGLES[i] * Math.PI) / 180
              // distância adaptada à tela: garante que os personagens das laterais não saiam do viewport no mobile
              const half = Math.min(window.innerWidth, window.innerHeight) / 2
              const dist = Math.max(90, Math.min(180, half - 70))
              const tx = Math.cos(angleRad) * dist
              const ty = Math.sin(angleRad) * dist
              const rot = (Math.random() - 0.5) * 60

              return (
                <img
                  key={i}
                  src={src}
                  alt=""
                  aria-hidden
                  style={{
                    position: "fixed",
                    left: burst.x,
                    top: burst.y,
                    width: 72,
                    height: 72,
                    objectFit: "contain",
                    pointerEvents: "none",
                    ["--tx" as string]: `${tx}px`,
                    ["--ty" as string]: `${ty}px`,
                    ["--rot" as string]: `${rot}deg`,
                    animation: `celeb-explode 1.4s ease-out ${i * 35}ms both`,
                  }}
                />
              )
            })}
          </div>,
          document.body
        )}
    </section>
  )
}
