"use client"

import { useState, useEffect } from "react"

export function HeroSection() {
  const [visible, setVisible] = useState(false)
  const [petals, setPetals] = useState<{ x: number; delay: number; size: number; duration: number }[]>([])

  useEffect(() => {
    setVisible(true)
    setPetals(Array.from({ length: 18 }, () => ({
      x: Math.random() * 100,
      delay: Math.random() * 8,
      size: Math.random() * 12 + 8,
      duration: Math.random() * 6 + 7,
    })))
  }, [])

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse at top, #1a0010 0%, #000 60%)" }}
    >
      {petals.map((p, i) => (
        <div key={i} className="fixed pointer-events-none z-0 select-none" style={{ left: `${p.x}%`, top: -20, fontSize: p.size, animation: `sakura-fall ${p.duration}s linear infinite`, animationDelay: `${p.delay}s`, willChange: "transform" }}>
          🌸
        </div>
      ))}

      <div className={`relative z-10 w-full max-w-sm mx-auto flex flex-col items-center gap-9 px-7 py-20 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="space-y-3 w-full">
          <p className="font-elegant italic text-lg tracking-widest" style={{ color: "#ff6b9daa" }}>
            ✦ hoje é o dia dela ✦
          </p>
          <h1
            className="font-display font-black leading-none"
            style={{
              fontSize: "clamp(3.5rem, 18vw, 6rem)",
              background: "linear-gradient(135deg, #d4af7a 0%, #fff9e6 50%, #d4af7a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              paddingBottom: "0.05em", // prevents descender clipping
            }}
          >
            Ket
          </h1>
          <p className="font-elegant text-2xl italic" style={{ color: "#ff6b9d" }}>🎂 14 de Junho 🎂</p>
        </div>

        <div className="gold-line w-40" />

        <div
          className="w-full rounded-3xl p-6 space-y-4 text-left"
          style={{ background: "linear-gradient(135deg, #1a0a0a, #0d000d)", border: "1px solid #d4af7a33", boxShadow: "0 0 40px #d4af7a0d" }}
        >
          <div className="text-4xl animate-float">💌</div>
          <p className="font-display text-xl font-bold leading-snug" style={{ color: "#d4af7a" }}>
            Álbum de Cartas
          </p>
          <p className="font-elegant italic text-base leading-relaxed" style={{ color: "#f5e6d3aa" }}>
            As pessoas que gostam de você deixaram cartas especiais aqui. Estão todas trancadas, jogue os minijogos para desbloqueá-las! 🔓
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {["🐱 Carinhos", "🎵 Quiz", "🎶 Notas", "🧠 Sequência"].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "#d4af7a15", border: "1px solid #d4af7a33", color: "#d4af7a99" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="gold-line w-40" />
      </div>
    </section>
  )
}
