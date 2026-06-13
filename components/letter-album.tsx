"use client"

import { useState, useEffect, useRef } from "react"
import { useGame } from "@/lib/game-context"
import confetti from "canvas-confetti"

export const LETTERS = [
  {
    id: "pet-game",
    from: "Vetória",
    photo: "/vetoria.jpg",
    emoji: "🐱",
    color: "#ff6b9d",
    unlockedBy: "Jogue com a Agatha Christie",
    text: "Maria Croket, ainda não existe nenhuma palavra que consiga significar tudo que você é então resumo esse tudo apenas lhe chamando Croket, te amo super muito, você é única!!!!",
  },
  {
    id: "quiz-game",
    from: "Caio",
    photo: "/caio.png",
    emoji: "🎵",
    color: "#9b59b6",
    unlockedBy: "Adivinhe as músicas",
    text: "Oii ketxuzaaa\n\nNesse dia tão especial, quero te dar os parabéns, mas também agradecer por todos esses anos de amizade. Sou muito grata por ter você na minha vida, por todos os momentos que compartilhamos, pelos perrengues que passamos juntos (e pelas fofocas que vieram depois deles kkk)\n\nVocê é uma pessoa incrível, e eu te adoro de um tantão assim! Saiba que sempre vou estar aqui por você, assim como você sempre esteve por mim\n\nFeliz aniversário para a maior geógrafa, fã de My Little Pony e sósia oficial da PinkPantheress do mundo todinho!\n\nQue seu novo ciclo seja cheio de amor, felicidade, conquistas e toda a energia positiva que estou te enviando hoje. Você merece tudo de mais lindo!",
  },
  {
    id: "pink-game",
    from: "Dhionatan",
    photo: "/dhionatan.png",
    emoji: "🎀",
    color: "#f472b6",
    unlockedBy: "Captura as Notas (fase 1)",
    text: "Feliz aniversário Ket!!!\n\nNão tenho muito que dizer para além de muita saudades!!\n\nLogo mais estarei em Manaus pra gente se ver!\n\nTe amo sempre :)",
  },
  {
    id: "jimin-game",
    from: "Henrique",
    photo: "/henrique-padrao.jpg",
    emoji: "💜",
    color: "#a855f7",
    unlockedBy: "Seção Jimin",
    text: "Feliz aniversário ket! Queria te desejar uma vida incrível, cheia de alegria e sucesso! Tu és uma pessoa muito incrível e eu sou grato demais por ter alguém como você na minha vida! Te amo e mais uma vez feliz aniversárioooo 😁💕",
  },
  {
    id: "pony-game",
    from: "Jhon",
    photo: "/jhon.jpg",
    emoji: "🌟",
    color: "#ff8c42",
    unlockedBy: "Quiz My Little Pony",
    text: "Tu sabe que eu não sou muito bom com textos e prefiro dar feliz aniversário de outras formas, mas feliz aniversário pra você, te desejo muitos anos de felicidade e que você nunca deixe de ser a pessoa mais autêntica do mundo.\n\nEspero que a gente se encontre em breve, tenho notícias pra contar.",
  },
  {
    id: "pink-game-2",
    from: "Ana Lívia",
    photo: "/ana-livia.jpg",
    emoji: "🩷",
    color: "#ec4899",
    unlockedBy: "Captura as Notas (fase 2)",
    text: "Feliz vida, ket. Sou muito grata pela sua vida, pois além de amiga você sabe ser irmã e mãe pra todos nós kkkk. Obrigada por ter me acolhido nos momentos que mais precisei e em que eu achei que não tinha amigos pra contar. Sinto falta dos nossos momentos juntas, dos nossos sorvetes e das dormidas nas tardes de sexta. Obrigada por tudo, tenho certeza que sua vida é uma dádiva na minha vida, na vida da sua família e na da Agatha Christie kkkk. Te amo vey 🩷🩷🩷🩷",
  },
]

function LetterCard({ letter, unlocked, onOpen }: { letter: typeof LETTERS[0]; unlocked: boolean; onOpen: () => void }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden transition-all duration-300 select-none"
      style={{
        border: unlocked ? `2px solid ${letter.color}66` : "2px solid #2a2a2a",
        background: unlocked ? `linear-gradient(135deg, ${letter.color}18, #111)` : "#111",
        minHeight: 148,
        cursor: unlocked ? "pointer" : "default",
        WebkitTapHighlightColor: "transparent",
      }}
      onClick={unlocked ? onOpen : undefined}
    >
      {unlocked ? (
        <div className="flex flex-col h-full">
          {/* Full photo */}
          <div className="w-full overflow-hidden" style={{ height: 130, borderBottom: `1px solid ${letter.color}33` }}>
            <img src={letter.photo} alt={letter.from} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
          </div>
          {/* Info */}
          <div className="px-3 py-3 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="font-bold text-sm leading-tight truncate" style={{ color: letter.color }}>De: {letter.from}</p>
              <p className="text-xs mt-0.5" style={{ color: "#f5e6d355" }}>toque para ler 💌</p>
            </div>
            <span className="text-2xl leading-none flex-shrink-0 animate-float">💌</span>
          </div>
        </div>
      ) : (
        <div className="p-4 flex flex-col items-center justify-center gap-2 h-full">
          <span className="text-3xl leading-none opacity-30">🔒</span>
          <div className="text-center space-y-1">
            <p className="text-xs font-bold" style={{ color: "#ffffff44" }}>Bloqueada</p>
            <p className="text-xs leading-snug px-1 text-center" style={{ color: "#ffffff2a" }}>{letter.unlockedBy}</p>
          </div>
        </div>
      )}
    </div>
  )
}

function LetterModal({ letter, onClose }: { letter: typeof LETTERS[0]; onClose: () => void }) {
  useEffect(() => {
    confetti({ particleCount: 60, spread: 80, origin: { y: 0.4 }, colors: [letter.color, "#d4af7a", "#fff"] })
  }, [])

  const paragraphs = letter.text.split("\n\n").filter(Boolean)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "#000000cc", backdropFilter: "blur(10px)" }}>
      <div className="w-full max-w-sm rounded-3xl overflow-hidden animate-entrance" style={{ background: "linear-gradient(135deg, #0d0005, #1a0a1e)", border: `2px solid ${letter.color}55`, boxShadow: `0 0 60px ${letter.color}22`, maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
        <div className="flex items-center justify-between px-6 pt-6 pb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0" style={{ border: `2px solid ${letter.color}66` }}>
              <img src={letter.photo} alt={letter.from} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div>
              <p className="font-display font-bold text-xs" style={{ color: letter.color }}>Carta de</p>
              <p className="font-display text-lg font-black leading-tight" style={{ color: "#f5e6d3" }}>{letter.from}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#ffffff11", color: "#f5e6d3aa", fontSize: 14 }}>✕</button>
        </div>
        <div className="h-px mx-6" style={{ background: `linear-gradient(90deg, transparent, ${letter.color}44, transparent)` }} />
        <div className="overflow-y-auto flex-1 px-6 py-5">
          <div className="rounded-2xl p-5 space-y-3" style={{ background: "#ffffff07" }}>
            <p className="font-elegant italic text-lg leading-relaxed" style={{ color: "#f5e6d3cc" }}></p>
            {paragraphs.map((p, i) => (
              <p key={i} className="font-elegant italic text-base leading-relaxed" style={{ color: "#f5e6d3aa" }}>{p}</p>
            ))}
            <p className="font-elegant italic text-base leading-relaxed text-right mt-2" style={{ color: letter.color }}>— {letter.from}</p>
          </div>
        </div>
        <div className="px-6 pb-6 pt-3 flex-shrink-0">
          <button onClick={onClose} className="w-full py-4 rounded-2xl font-bold text-sm active:scale-95 transition-transform" style={{ background: letter.color, color: "#000" }}>
            Fechar carta 💌
          </button>
        </div>
      </div>
    </div>
  )
}

export function LetterAlbum() {
  const { unlockedLetters } = useGame()
  const [openLetter, setOpenLetter] = useState<typeof LETTERS[0] | null>(null)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const unlockedCount = LETTERS.filter(l => unlockedLetters.has(l.id)).length

  return (
    <section ref={ref} className="min-h-screen flex flex-col items-center justify-center py-20 px-6 relative" style={{ background: "linear-gradient(180deg, #000 0%, #0a0800 50%, #000 100%)" }}>
      <div className="gold-line w-full absolute top-0" />
      <div className={`w-full max-w-sm mx-auto flex flex-col items-center gap-8 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
        <div className="text-center space-y-2 w-full">
          <span className="font-elegant italic text-sm tracking-widest uppercase" style={{ color: "#d4af7a77" }}>seção 1</span>
          <h2 className="font-display font-black" style={{ fontSize: "clamp(2.4rem,11vw,3.5rem)", background: "linear-gradient(135deg, #d4af7a, #fff9e6, #d4af7a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", paddingBottom: "0.05em" }}>
            Álbum de Cartas
          </h2>
          <p className="font-elegant italic text-base" style={{ color: "#d4af7a77" }}>💌 {unlockedCount}/{LETTERS.length} cartas desbloqueadas</p>
        </div>
        <div className="w-full space-y-2">
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#1f1f1f" }}>
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(unlockedCount / LETTERS.length) * 100}%`, background: "linear-gradient(90deg, #d4af7a, #ff6b9d)" }} />
          </div>
          <p className="text-xs text-center" style={{ color: "#ffffff2a" }}>
            {unlockedCount === 0 ? "Jogue os minijogos para desbloquear!" : unlockedCount === LETTERS.length ? "Você desbloqueou todas! 🎉" : "Continue jogando para desbloquear mais!"}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full">
          {LETTERS.map(letter => (
            <LetterCard key={letter.id} letter={letter} unlocked={unlockedLetters.has(letter.id)} onOpen={() => setOpenLetter(letter)} />
          ))}
        </div>
      </div>
      {openLetter && <LetterModal letter={openLetter} onClose={() => setOpenLetter(null)} />}
      <div className="gold-line w-full absolute bottom-0" />
    </section>
  )
}
