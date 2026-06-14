"use client"

import { useState, useEffect, useRef } from "react"
import confetti from "canvas-confetti"
import { useAudio } from "@/lib/audio-context"

const CELEBS = [
  "/celebs/celeb1.png",
  "/celebs/celeb2.png",
  "/celebs/celeb3.png",
  "/celebs/celeb4.png",
  "/celebs/celeb5.png",
  "/celebs/celeb6.png",
  "/celebs/celeb7.png",
  "/celebs/celeb8.png",
  "/celebs/celeb9.png",
  "/celebs/celeb10.png",
]

// Ângulos de explosão para cada personagem (em graus, 0 = direita)
const ANGLES = [0, 36, 72, 108, 144, 180, 216, 252, 288, 324]

export function FinalSection() {
  const [visible, setVisible] = useState(false)
  const [exploding, setExploding] = useState(false)
  const { changeSong } = useAudio()
  const ref = useRef<HTMLElement>(null)
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

  const launchCelebration = () => {
    const colors = ["#d4af7a", "#ff6b9d", "#9b59b6", "#fff", "#ff8c42"]
    const end = Date.now() + 3000
    const burst = () => {
      confetti({ particleCount: 12, angle: 60,  spread: 90, origin: { x: 0 },   colors })
      confetti({ particleCount: 12, angle: 120, spread: 90, origin: { x: 1 },   colors })
      confetti({ particleCount: 10, spread: 140, origin: { x: 0.5, y: 0.4 },    colors })
      if (Date.now() < end) requestAnimationFrame(burst)
    }
    burst()

    setExploding(true)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setExploding(false), 1400)
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

        {/* Container do bolo + personagens */}
        <div className="relative flex items-center justify-center" style={{ width: 200, height: 200 }}>
          {/* Personagens explodem a partir do centro do bolo */}
          {CELEBS.map((src, i) => {
            const angleRad = (ANGLES[i] * Math.PI) / 180
            const dist = 160 // px de distância
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
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 72,
                  height: 72,
                  objectFit: "contain",
                  pointerEvents: "none",
                  zIndex: 10,
                  opacity: 0,
                  // CSS vars para a animação
                  ["--tx" as string]: `${tx}px`,
                  ["--ty" as string]: `${ty}px`,
                  ["--rot" as string]: `${rot}deg`,
                  // só anima quando exploding=true
                  animation: exploding
                    ? `celeb-explode 1.3s ease-out ${i * 40}ms both`
                    : "none",
                }}
              />
            )
          })}

          {/* Bolo */}
          <button
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
    </section>
  )
}
