"use client"

import { useState, useEffect, useRef } from "react"
import { useGame } from "@/lib/game-context"
import confetti from "canvas-confetti"

const PONY_QUESTIONS = [
  {
    question: "Qual Elemento da Harmonia a Rarity representa?",
    hint: "💎 A unicórnio mais fabulosa de Equestria",
    options: ["Honestidade", "Generosidade", "Lealdade", "Bondade"],
    answer: "Generosidade",
  },
  {
    question: "Qual das Mane 6 foi responsável por todas receberem suas Cutie Marks no mesmo dia?",
    hint: "🌈 Ela adora competição e velocidade",
    options: ["Twilight Sparkle", "Rainbow Dash", "Pinkie Pie", "Applejack"],
    answer: "Rainbow Dash",
  },
  {
    question: "Qual é o nome da irmã mais nova da Rarity?",
    hint: "🎀 Ela é um dos Cutie Mark Crusaders",
    options: ["Apple Bloom", "Diamond Tiara", "Sweetie Belle", "Scootaloo"],
    answer: "Sweetie Belle",
  },
  {
    question: "Em qual temporada uma única dubladora brasileira cantava praticamente todas as músicas das personagens femininas?",
    hint: "🎵 Foi no começo de tudo",
    options: ["1ª temporada", "2ª temporada", "3ª temporada", "5ª temporada"],
    answer: "1ª temporada",
  },
  {
    question: "Qual personagem é considerada a principal ponte entre Equestria e o mundo de Equestria Girls?",
    hint: "🌅 Ela começou como vilã e se redimiu",
    options: ["Twilight Sparkle", "Sunset Shimmer", "Princesa Celestia", "Starlight Glimmer"],
    answer: "Sunset Shimmer",
  },
]

function PonyQuizFullscreen({ onWin, onClose }: { onWin: () => void; onClose: () => void }) {
  const [qIdx, setQIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [finalScore, setFinalScore] = useState(0)
  const q = PONY_QUESTIONS[qIdx]

  const answer = (opt: string) => {
    if (answered) return
    setAnswered(opt)
    const correct = opt === q.answer
    const newScore = score + (correct ? 1 : 0)
    if (correct) confetti({ particleCount: 30, spread: 70, origin: { y: 0.5 }, colors: ["#a855f7", "#f472b6", "#fff", "#d4af7a"] })
    setTimeout(() => {
      if (qIdx < PONY_QUESTIONS.length - 1) {
        if (correct) setScore(s => s + 1)
        setQIdx(p => p + 1); setAnswered(null)
      } else {
        setFinalScore(newScore); setDone(true)
        if (newScore >= 4) setTimeout(onWin, 900)
      }
    }, 1100)
  }

  const reset = () => { setQIdx(0); setScore(0); setAnswered(null); setDone(false); setFinalScore(0) }

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "linear-gradient(180deg, #0a0015 0%, #150025 100%)" }}>
      <div className="flex items-center justify-between px-6 pt-6 pb-4 flex-shrink-0">
        <div className="space-y-2 min-w-0 flex-1 pr-4">
          <p className="font-display font-bold text-lg leading-none" style={{ color: "#c084fc" }}>🦄 Quiz My Little Pony</p>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#ffffff15" }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${(qIdx / PONY_QUESTIONS.length) * 100}%`, background: "linear-gradient(90deg, #a855f7, #f472b6)" }} />
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {!done && <span className="font-bold tabular-nums" style={{ color: "#c084fc" }}>{qIdx + 1}/{PONY_QUESTIONS.length}</span>}
          <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#ffffff15", color: "#f5e6d3aa", fontSize: 14 }}>✕</button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-5 px-6">
        {!done ? (
          <>
            <div className="rounded-3xl p-6 text-center" style={{ background: "#a855f70a", border: "1px solid #a855f71a" }}>
              <p className="text-xs mb-3 tracking-wider uppercase" style={{ color: "#a855f755" }}>{q.hint}</p>
              <p className="font-display font-bold text-xl leading-snug" style={{ color: "#f5e6d3" }}>{q.question}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {q.options.map(opt => {
                const correct = opt === q.answer
                const selected = opt === answered
                let bg = "#1a1a1a", border = "#ffffff15", textColor = "#f5e6d3"
                if (selected && correct) { bg = "#166534"; border = "#4ade80"; textColor = "#fff" }
                else if (selected) { bg = "#7f1d1d"; border = "#f87171"; textColor = "#fff" }
                else if (answered && correct) { bg = "#166534"; border = "#4ade80"; textColor = "#fff" }
                return (
                  <button key={opt} onClick={() => answer(opt)} className="rounded-2xl font-bold text-sm leading-snug active:scale-95 transition-transform" style={{ padding: "16px 12px", background: bg, border: `2px solid ${border}`, color: textColor, minHeight: 60, WebkitTapHighlightColor: "transparent" }}>
                    {opt}
                  </button>
                )
              })}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-6 text-center px-4">
            <span style={{ fontSize: 56, lineHeight: 1 }}>{finalScore >= 4 ? "🏆" : finalScore >= 3 ? "🌟" : "💪"}</span>
            <p className="font-display text-3xl font-black leading-tight" style={{ color: "#c084fc" }}>{finalScore}/{PONY_QUESTIONS.length} acertos!</p>
            <p className="font-elegant italic text-lg leading-relaxed" style={{ color: "#f5e6d3aa" }}>
              {finalScore >= 4 ? "Carta da Jhon desbloqueada! 🎉" : "Precisa de 4 acertos para desbloquear."}
            </p>
            <div className="flex gap-3">
              <button onClick={reset} className="px-6 py-4 rounded-2xl font-bold active:scale-95 transition-transform text-sm" style={{ background: "#1a1a1a", border: "1px solid #a855f733", color: "#c084fc", padding: "16px 41px" }}>
                Tentar de novo
              </button>
              <button onClick={onClose} className="px-6 py-4 rounded-2xl font-bold active:scale-95 transition-transform text-sm" style={{ background: "linear-gradient(135deg, #a855f7, #7c3aed)", color: "#fff", padding: "16px 41px" }}>
                Voltar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function PonySection() {
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
      {gameOpen && <PonyQuizFullscreen onWin={() => { setGameWon(true); unlockLetter("pony-game") }} onClose={() => setGameOpen(false)} />}

      <section ref={ref} className="min-h-screen flex flex-col items-center justify-center py-20 px-6 relative" style={{ background: "linear-gradient(180deg, #000 0%, #0a0015 50%, #000 100%)" }}>
        <div className="gold-line w-full absolute top-0" />

        <div className={`w-full max-w-sm mx-auto flex flex-col items-center gap-8 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
          {/* Header */}
          <div className="text-center space-y-2 w-full">
            <span className="font-elegant italic text-sm tracking-widest uppercase" style={{ color: "#c084fc66" }}>seção 6</span>
            <h2 className="font-display font-black leading-none" style={{ fontSize: "clamp(2.4rem,11vw,3.5rem)", background: "linear-gradient(135deg, #c084fc, #f472b6, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", paddingBottom: "0.05em" }}>
              My Little Pony
            </h2>
            <p className="font-elegant italic text-base" style={{ color: "#c084fc77" }}>🦄 você realmente é fã?</p>
          </div>

          {/* GIF da Rarity — mesmo padrão da seção do Jimin */}
          <div className="w-full rounded-3xl overflow-hidden relative" style={{ border: "1px solid #a855f744", background: "#0a0015" }}>
            <img
              src="/rarity.gif"
              alt="Rarity"
              className="w-full object-contain"
              style={{ maxHeight: 260, display: "block", margin: "0 auto" }}
            />
          </div>

          {/* Botão quiz */}
          <button
            onClick={() => setGameOpen(true)}
            className="w-full rounded-3xl flex flex-col items-center gap-3 transition-all active:scale-95"
            style={{
              padding: "28px 24px",
              background: gameWon ? "linear-gradient(135deg, #a855f71a, #7c3aed0d)" : "linear-gradient(135deg, #a855f7, #7c3aed)",
              boxShadow: gameWon ? "none" : "0 0 36px #a855f733",
              border: gameWon ? "1px solid #a855f733" : "none",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {gameWon ? (
              <>
                <span style={{ fontSize: 30, lineHeight: 1 }}>✅</span>
                <p className="font-display text-lg font-black leading-none" style={{ color: "#c084fc" }}>Carta desbloqueada!</p>
                <p className="text-sm" style={{ color: "#a855f755" }}>Jogar de novo</p>
              </>
            ) : (
              <>
                <span style={{ fontSize: 36, lineHeight: 1 }}>🦄</span>
                <p className="font-display text-xl font-black leading-none text-white">Começar Quiz</p>
                <p className="text-sm" style={{ color: "#ffffff55" }}>4/5 acertos para desbloquear uma carta 💌</p>
              </>
            )}
          </button>
        </div>

        <div className="gold-line w-full absolute bottom-0" />
      </section>
    </>
  )
}
