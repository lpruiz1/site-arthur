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

interface Celebrant {
  id: number
  src: string
  x: number
  delay: number
  size: number
}

let celebId = 0

export function FinalSection() {
  const [visible, setVisible] = useState(false)
  const [celebrants, setCelebrants] = useState<Celebrant[]>([])
  const { changeSong } = useAudio()
  const ref = useRef<HTMLElement>(null)
  const musicPlayedRef = useRef(false)

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
      confetti({ particleCount: 10, angle: 60, spread: 90, origin: { x: 0 }, colors })
      confetti({ particleCount: 10, angle: 120, spread: 90, origin: { x: 1 }, colors })
      confetti({ particleCount: 8, spread: 140, origin: { x: 0.5, y: 0.5 }, colors })
      if (Date.now() < end) requestAnimationFrame(burst)
    }
    burst()

    const newCelebs: Celebrant[] = CELEBS.map((src, i) => ({
      id: celebId++,
      src,
      x: 3 + i * 10,   // distribui de 3% a 93%
      delay: i * 130,
      size: 80 + Math.floor(Math.random() * 55),
    }))

    setCelebrants(prev => [...prev, ...newCelebs])

    setTimeout(() => {
      const ids = new Set(newCelebs.map(c => c.id))
      setCelebrants(prev => prev.filter(c => !ids.has(c.id)))
    }, 3500)
  }

  return (
    <>
      {/* Personagens — fora da section, sem nenhum overflow no caminho */}
      <style>{`
        @keyframes celebrant-rise {
          0%   { transform: translateY(0) scale(0.5); opacity: 0; }
          12%  { opacity: 1; }
          60%  { transform: translateY(-60vh) scale(1.05); opacity: 1; }
          100% { transform: translateY(-88vh) scale(0.8); opacity: 0; }
        }
      `}</style>

      {celebrants.map(c => (
        <img
          key={c.id}
          src={c.src}
          alt=""
          aria-hidden
          style={{
            position: "fixed",
            bottom: 0,
            left: `${c.x}%`,
            width: c.size,
            height: "auto",
            objectFit: "contain",
            pointerEvents: "none",
            zIndex: 9999,
            animationName: "celebrant-rise",
            animationDuration: "2.6s",
            animationDelay: `${c.delay}ms`,
            animationTimingFunction: "ease-out",
            animationFillMode: "both",
          }}
        />
      ))}

      <section
        ref={ref}
        className="min-h-screen flex flex-col items-center justify-center py-20 px-6 relative"
        style={{ background: "radial-gradient(ellipse at bottom, #1a0010 0%, #000 70%)" }}
      >
        <div className={`w-full max-w-sm mx-auto flex flex-col items-center gap-10 text-center transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
          <div className="space-y-3 w-full">
            <span className="font-elegant italic text-sm tracking-widest uppercase" style={{ color: "#d4af7a77" }}>seção final</span>
            <h2 className="font-display font-black leading-none" style={{ fontSize: "clamp(2.4rem,11vw,3.6rem)", background: "linear-gradient(135deg, #d4af7a, #fff9e6, #d4af7a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", paddingBottom: "0.05em" }}>
              Feliz Aniversário!
            </h2>
            <p className="font-elegant italic text-xl" style={{ color: "#ff6b9d" }}>🎂 Ketellen 🎂</p>
          </div>

          <button
            onClick={launchCelebration}
            className="transition-all active:scale-90 hover:scale-105 select-none"
            style={{ fontSize: "clamp(6rem,26vw,9rem)", lineHeight: 1, filter: "drop-shadow(0 10px 40px #ff6b9d55)", WebkitTapHighlightColor: "transparent", animation: "float-gentle 3s ease-in-out infinite" }}
            aria-label="Lançar confete">
            🎂
          </button>

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
    </>
  )
}
