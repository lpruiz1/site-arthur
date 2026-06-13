"use client"

import { useState, useEffect, useRef } from "react"
import { useGame } from "@/lib/game-context"
import confetti from "canvas-confetti"

// Embaralha array
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Cada pergunta tem resposta certa + 3 erradas; opções são embaralhadas no render
const QUESTIONS_POOL = [
  // PinkPantheress — Boy's a Liar
  {
    artist: "PinkPantheress",
    song: "Boy's a Liar Pt. 2",
    emoji: "🎀",
    hint: "Complete a letra: \"Boy's a liar, liar, liar / Boy's a liar, ___ ___\"",
    answer: "liar, liar",
    wrongs: ["baby, baby", "lover, lover", "fighter, fighter"],
  },
  {
    artist: "PinkPantheress",
    song: "Boy's a Liar Pt. 2",
    emoji: "🎀",
    hint: "Quem faz a parte de rap em Boy's a Liar Pt. 2?",
    answer: "Ice Spice",
    wrongs: ["Nicki Minaj", "Doja Cat", "Cardi B"],
  },
  // PinkPantheress — Just for Me
  {
    artist: "PinkPantheress",
    song: "Just for Me",
    emoji: "🩷",
    hint: "Complete: \"You said you'd keep it ___ for me\"",
    answer: "just",
    wrongs: ["safe", "real", "good"],
  },
  {
    artist: "PinkPantheress",
    song: "Just for Me",
    emoji: "🩷",
    hint: "\"Just for Me\" é do primeiro mixtape da PinkPantheress. Qual o nome dele?",
    answer: "To Hell with It",
    wrongs: ["Heaven Knows", "Fancy That", "Break It Off"],
  },
  // Jimin — Filter
  {
    artist: "Jimin (BTS)",
    song: "Filter",
    emoji: "💜",
    hint: "Em Filter, Jimin canta sobre adaptar sua personalidade. Qual palavra repete no refrão?",
    answer: "filter",
    wrongs: ["color", "mirror", "shimmer"],
  },
  {
    artist: "Jimin (BTS)",
    song: "Filter",
    emoji: "💜",
    hint: "Filter é do álbum Map of the Soul: 7. Em que ano foi lançado?",
    answer: "2020",
    wrongs: ["2019", "2021", "2018"],
  },
  // Jimin — Like Crazy
  {
    artist: "Jimin",
    song: "Like Crazy",
    emoji: "🌸",
    hint: "Like Crazy foi o primeiro single solo de um artista coreano a estrear em qual posição no Billboard Hot 100?",
    answer: "#1",
    wrongs: ["#3", "#5", "#10"],
  },
  {
    artist: "Jimin",
    song: "Like Crazy",
    emoji: "🌸",
    hint: "Like Crazy é do álbum solo de estreia do Jimin. Qual o nome do álbum?",
    answer: "FACE",
    wrongs: ["MUSE", "VIBE", "WHO"],
  },
  // Marina Sena — Por Supuesto
  {
    artist: "Marina Sena",
    song: "Por Supuesto",
    emoji: "🔥",
    hint: "\"Por supuesto\" é uma expressão em qual idioma?",
    answer: "Espanhol",
    wrongs: ["Português", "Italiano", "Francês"],
  },
  {
    artist: "Marina Sena",
    song: "Por Supuesto",
    emoji: "🔥",
    hint: "Por Supuesto é do álbum de estreia da Marina Sena. Qual o nome?",
    answer: "De Primeira",
    wrongs: ["Vício Inerente", "Coisas Naturais", "Maravilhosa"],
  },
  // Marina Sena — Maravilhosa
  {
    artist: "Marina Sena",
    song: "Maravilhosa",
    emoji: "💛",
    hint: "Maravilhosa é do segundo álbum da Marina Sena. Qual o nome?",
    answer: "Vício Inerente",
    wrongs: ["De Primeira", "Coisas Naturais", "MARINADA"],
  },
]

function buildRound() {
  // Pega 4 perguntas aleatórias do pool
  return shuffle(QUESTIONS_POOL).slice(0, 4).map(q => ({
    ...q,
    options: shuffle([q.answer, ...q.wrongs]),
  }))
}

function QuizGameFullscreen({ onWin, onClose }: { onWin: () => void; onClose: () => void }) {
  const [questions] = useState(() => buildRound())
  const [qIdx, setQIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [finalScore, setFinalScore] = useState(0)
  const q = questions[qIdx]

  const answer = (opt: string) => {
    if (answered) return
    setAnswered(opt)
    const correct = opt === q.answer
    const newScore = score + (correct ? 1 : 0)
    if (correct) confetti({ particleCount: 30, spread: 70, origin: { y: 0.5 }, colors: ["#d4af7a", "#ff6b9d", "#9b59b6"] })
    setTimeout(() => {
      if (qIdx < questions.length - 1) {
        if (correct) setScore(s => s + 1)
        setQIdx(p => p + 1); setAnswered(null)
      } else {
        setFinalScore(newScore); setDone(true)
        if (newScore >= 3) setTimeout(onWin, 900)
      }
    }, 1100)
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "linear-gradient(180deg, #080510 0%, #0d0a1a 100%)" }}>
      <div className="flex items-center justify-between px-6 pt-6 pb-4 flex-shrink-0">
        <div className="space-y-2 min-w-0 flex-1 pr-4">
          <p className="font-display font-bold text-lg leading-none" style={{ color: "#d4af7a" }}>🎵 Quiz Musical</p>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#ffffff15" }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${(qIdx / questions.length) * 100}%`, background: "linear-gradient(90deg, #d4af7a, #ff6b9d)" }} />
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {!done && <span className="font-bold tabular-nums" style={{ color: "#d4af7a" }}>{qIdx + 1}/{questions.length}</span>}
          <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center text-sm" style={{ background: "#ffffff15", color: "#f5e6d3aa" }}>✕</button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-5 px-6">
        {!done ? (
          <>
            <div className="rounded-3xl p-6 text-center" style={{ background: "#d4af7a0a", border: "1px solid #d4af7a1a" }}>
              <p className="text-xs mb-1 tracking-wider uppercase" style={{ color: "#d4af7a55" }}>{q.emoji} {q.artist} — {q.song}</p>
              <p className="font-elegant italic text-xl leading-relaxed mt-2" style={{ color: "#f5e6d3" }}>{q.hint}</p>
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
                  <button key={opt} onClick={() => answer(opt)}
                    className="rounded-2xl font-bold text-sm transition-all active:scale-95 leading-snug"
                    style={{ padding: "16px 14px", background: bg, border: `2px solid ${border}`, color: textColor, minHeight: 60, WebkitTapHighlightColor: "transparent" }}>
                    {opt}
                  </button>
                )
              })}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-6 text-center px-4">
            <span className="text-6xl leading-none">{finalScore >= 3 ? "🏆" : finalScore >= 2 ? "🌟" : "💪"}</span>
            <p className="font-display text-3xl font-black leading-tight" style={{ color: "#d4af7a" }}>{finalScore}/{questions.length} acertos!</p>
            <p className="font-elegant italic text-lg leading-relaxed" style={{ color: "#f5e6d3aa" }}>
              {finalScore >= 3 ? "Carta desbloqueada! Vai em 💌 Cartas!" : "Precisa de 3 acertos para desbloquear."}
            </p>
            <div className="flex gap-3">
              <button onClick={onClose} className="px-6 py-4 rounded-2xl font-bold active:scale-95 transition-transform text-sm" style={{ background: "#d4af7a", color: "#000" }}>Voltar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function QuizSection() {
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
      {gameOpen && <QuizGameFullscreen onWin={() => { setGameWon(true); unlockLetter("quiz-game") }} onClose={() => setGameOpen(false)} />}

      <section ref={ref} className="min-h-screen flex flex-col items-center justify-center py-20 px-6 relative" style={{ background: "linear-gradient(180deg, #000 0%, #080510 50%, #000 100%)" }}>
        <div className="gold-line w-full absolute top-0" />

        <div className={`w-full max-w-sm mx-auto flex flex-col items-center gap-8 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
          <div className="text-center space-y-2 w-full">
            <span className="font-elegant italic text-sm tracking-widest uppercase" style={{ color: "#d4af7a66" }}>seção 3</span>
            <h2 className="font-display font-black leading-none" style={{ fontSize: "clamp(2.8rem,13vw,4rem)", background: "linear-gradient(135deg, #d4af7a, #fff9e6, #d4af7a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", paddingBottom: "0.05em" }}>
              Quiz Musical
            </h2>
            <p className="font-elegant italic text-base" style={{ color: "#d4af7a77" }}>🎵 letra, detalhes e curiosidades</p>
          </div>

          <div className="w-full rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0d0d0d, #181818)", border: "1px solid #d4af7a1a" }}>
            <div className="px-6 py-4 border-b" style={{ borderColor: "#ffffff08" }}>
              <p className="font-bold text-sm" style={{ color: "#f5e6d399" }}>Perguntas sobre as músicas</p>
            </div>
            {[
              { emoji: "🎀", name: "PinkPantheress" },
              { emoji: "💜", name: "Jimin" },
              { emoji: "🔥", name: "Marina Sena" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4 border-b last:border-0" style={{ borderColor: "#ffffff07" }}>
                <span className="text-xl leading-none flex-shrink-0">{item.emoji}</span>
                <p className="font-bold text-sm" style={{ color: "#f5e6d3cc" }}>{item.name}</p>
              </div>
            ))}
          </div>

          <button onClick={() => setGameOpen(true)}
            className="w-full rounded-3xl flex flex-col items-center gap-3 transition-all active:scale-95"
            style={{ padding: "28px 24px", background: gameWon ? "linear-gradient(135deg, #d4af7a1a, #d4af7a0d)" : "linear-gradient(135deg, #d4af7a, #c9a96e)", boxShadow: gameWon ? "none" : "0 0 40px #d4af7a2a", border: gameWon ? "1px solid #d4af7a33" : "none", WebkitTapHighlightColor: "transparent" }}>
            {gameWon ? (
              <><span className="text-3xl leading-none">✅</span><p className="font-display text-lg font-black leading-none" style={{ color: "#d4af7a" }}>Carta desbloqueada!</p><p className="text-sm" style={{ color: "#d4af7a55" }}>Jogar de novo</p></>
            ) : (
              <><span className="text-4xl leading-none">🎵</span><p className="font-display text-xl font-black leading-none" style={{ color: "#000" }}>Começar Quiz</p><p className="text-sm" style={{ color: "#00000055" }}>3/4 acertos para desbloquear uma carta 💌</p></>
            )}
          </button>
        </div>

        <div className="gold-line w-full absolute bottom-0" />
      </section>
    </>
  )
}
