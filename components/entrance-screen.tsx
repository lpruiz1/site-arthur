"use client"

import { useState, useEffect, useRef } from "react"

interface Props { onEnter: () => void }

export function EntranceScreen({ onEnter }: Props) {
  const [stars, setStars] = useState<{ x: number; y: number; size: number; delay: number }[]>([])
  const [clicked, setClicked] = useState(false)
  const calledRef = useRef(false)

  useEffect(() => {
    setStars(Array.from({ length: 120 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 4,
    })))
  }, [])

  const handleClick = () => {
    if (clicked || calledRef.current) return
    calledRef.current = true
    setClicked(true)

    // Try confetti but don't block on failure
    try {
      import("canvas-confetti").then(({ default: confetti }) => {
        const colors = ["#d4af7a", "#ff6b9d", "#9b59b6", "#ffffff", "#ff8c42"]
        const end = Date.now() + 2000
        const burst = () => {
          confetti({ particleCount: 8, angle: 60, spread: 80, origin: { x: 0 }, colors })
          confetti({ particleCount: 8, angle: 120, spread: 80, origin: { x: 1 }, colors })
          confetti({ particleCount: 6, angle: 90, spread: 120, origin: { x: 0.5, y: 0.6 }, colors })
          if (Date.now() < end) requestAnimationFrame(burst)
        }
        burst()
      }).catch(() => {})
    } catch {}

    // Always navigate after delay, regardless of confetti
    setTimeout(() => {
      onEnter()
    }, 1600)
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 select-none"
      style={{
        background: "radial-gradient(ellipse at center, #0d0005 0%, #000 70%)",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      {/* Stars */}
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animation: `twinkle ${2 + s.delay}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
            opacity: 0.4,
          }}
        />
      ))}

      {/* Glow rings */}
      <div
        className="absolute rounded-full"
        style={{
          width: 400, height: 400,
          border: "1px solid rgba(212,175,122,0.2)",
          animation: "pulse-gold 3s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 600, height: 600,
          border: "1px solid rgba(255,107,157,0.1)",
          animation: "pulse-gold 3s ease-in-out infinite",
          animationDelay: "1s",
        }}
      />

      {/* Button */}
      <div
        className="transition-all duration-700"
        style={{
          opacity: clicked ? 0 : 1,
          transform: clicked ? "scale(1.1)" : "scale(1)",
          pointerEvents: clicked ? "none" : "auto",
        }}
      >
        <button
          className="font-display font-bold rounded-full border"
          style={{
            fontSize: "clamp(1.2rem, 5vw, 1.6rem)",
            padding: "20px 48px",
            borderColor: "#d4af7a",
            color: "#d4af7a",
            background: "transparent",
            animation: "pulse-gold 2s ease-in-out infinite",
            letterSpacing: "0.05em",
            cursor: "pointer",
            WebkitTapHighlightColor: "transparent",
          }}
          onClick={handleClick}
        >
          ✦ clique em mim ✦
        </button>
      </div>
    </div>
  )
}
