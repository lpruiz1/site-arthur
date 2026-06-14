"use client"

import { useState, useEffect, useRef } from "react"
import { useAudio } from "@/lib/audio-context"
import { useGame } from "@/lib/game-context"

const PLAYLIST = [
  { title: "Boy's a Liar Pt. 2",  artist: "PinkPantheress & Ice Spice",    emoji: "🎀", color: "#ff6b9d", src: "/music/boys-a-liar-pt2.m4a" },
  { title: "Stateside",            artist: "PinkPantheress & Zara Larsson",  emoji: "✨", color: "#f472b6", src: "/music/stateside.m4a" },
  { title: "Illegal",              artist: "PinkPantheress",                 emoji: "🌙", color: "#c084fc", src: "/music/illegal.m4a" },
  { title: "I Must Apologise",     artist: "PinkPantheress",                 emoji: "🩷", color: "#ec4899", src: "/music/i-must-apologise.m4a" },
  { title: "Pain",                 artist: "PinkPantheress",                 emoji: "💫", color: "#d4af7a", src: "/music/pain.m4a" },
  { title: "Who",                  artist: "Jimin",                          emoji: "💜", color: "#9b59b6", src: "/music/who.m4a" },
  { title: "Like Crazy",           artist: "Jimin",                          emoji: "🌸", color: "#a855f7", src: "/music/like-crazy.m4a" },
  { title: "Set Me Free Pt. 2",    artist: "Jimin",                          emoji: "🔮", color: "#7c3aed", src: "/music/set-me-free-pt2.m4a" },
  { title: "Filter",               artist: "Jimin (BTS)",                    emoji: "🌟", color: "#c084fc", src: "/music/filter.m4a" },
  { title: "Por Supuesto",         artist: "Marina Sena",                    emoji: "🔥", color: "#ff8c42", src: "/music/por-supuesto.m4a" },
  { title: "Maravilhosa",          artist: "Marina Sena",                    emoji: "💛", color: "#f59e0b", src: "/music/maravilhosa.m4a" },
  { title: "Saí para ver o mar",   artist: "Marina Sena & Rachel Reis",      emoji: "🌊", color: "#06b6d4", src: "/music/sai-para-ver-o-mar.m4a" },
  { title: "Carta de Maria",       artist: "Rubel & Marina Sena",            emoji: "💌", color: "#22c55e", src: "/music/carta-de-maria.m4a" },
  { title: "Tudo pra Amar Você",  artist: "Marina Sena",                    emoji: "❤️", color: "#ef4444", src: "/music/tudo-pra-amar-voce.m4a" },
]

const SECTIONS = [
  { label: "🎀 PinkPantheress", start: 0, end: 4 },
  { label: "💜 Jimin",          start: 5, end: 8 },
  { label: "🔥 Marina Sena",    start: 9, end: 13 },
]

// Quantas cartas precisam estar desbloqueadas para revelar a playlist
const UNLOCK_THRESHOLD = 3

export function PlaylistSection() {
  const [visible, setVisible] = useState(false)
  const [reachedEnd, setReachedEnd] = useState(false)
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const { changeSong, isPlaying, currentSrc, pause } = useAudio()
  const { unlockedLetters } = useGame()
  const ref = useRef<HTMLElement>(null)
  const endRef = useRef<HTMLDivElement>(null)

  const unlockedCount = unlockedLetters.size
  const isUnlocked = reachedEnd

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setReachedEnd(true) }, { threshold: 0.8 })
    if (endRef.current) obs.observe(endRef.current)
    return () => obs.disconnect()
  }, [])

  const handlePlay = (idx: number) => {
    const track = PLAYLIST[idx]
    if (activeIdx === idx && isPlaying && currentSrc === track.src) {
      pause()
    } else {
      setActiveIdx(idx)
      changeSong(track.src, () => {
        // auto-advance to next track in loop
        const nextIdx = (idx + 1) % PLAYLIST.length
        setActiveIdx(nextIdx)
        changeSong(PLAYLIST[nextIdx].src)
      })
    }
  }

  const isTrackPlaying = (idx: number) =>
    activeIdx === idx && isPlaying && currentSrc === PLAYLIST[idx].src

  const activeTrack = activeIdx !== null ? PLAYLIST[activeIdx] : null

  return (
    <section ref={ref} className="min-h-screen flex flex-col items-center justify-center py-20 px-6 relative" style={{ background: "linear-gradient(180deg, #000 0%, #080508 50%, #000 100%)" }}>
      <div className={`w-full max-w-sm mx-auto flex flex-col items-center gap-8 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
        <div className="text-center space-y-2 w-full">
          <span className="font-elegant italic text-sm tracking-widest uppercase" style={{ color: "#d4af7a77" }}>seção 7</span>
          <h2 className="font-display font-black leading-none" style={{ fontSize: "clamp(2.4rem,11vw,3.5rem)", background: "linear-gradient(135deg, #d4af7a, #fff9e6, #d4af7a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", paddingBottom: "0.05em" }}>
            Playlist do Dia
          </h2>
        </div>

        {!isUnlocked ? (
          /* ── BLOQUEADA ── */
          <div className="w-full rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0d0d0d, #1a1a1a)", border: "1px solid #d4af7a1a" }}>
            <div className="px-6 py-10 flex flex-col items-center gap-5 text-center">
              <span className="text-5xl leading-none" style={{ filter: "grayscale(0.5)", opacity: 0.6 }}>🎧</span>
              <div className="space-y-2">
                <p className="font-display font-bold text-lg" style={{ color: "#d4af7a99" }}>Playlist bloqueada</p>
                <p className="font-elegant italic text-sm leading-relaxed" style={{ color: "#ffffff44" }}>
                  Role até o final desta seção para liberar a playlist completa 🎶
                </p>
              </div>
              {/* Scroll hint */}
              <div className="flex flex-col items-center gap-1 opacity-40">
                <span className="text-xl" style={{ animation: "float-gentle 1.5s ease-in-out infinite" }}>↓</span>
                <p className="text-xs" style={{ color: "#ffffff55" }}>continue rolando</p>
              </div>
              {/* Preview borrado */}
              <div className="w-full rounded-2xl overflow-hidden mt-2" style={{ border: "1px solid #ffffff08", filter: "blur(3px)", opacity: 0.3, pointerEvents: "none", userSelect: "none" }}>
                {PLAYLIST.slice(0, 4).map((track, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: "1px solid #ffffff07" }}>
                    <span style={{ fontSize: 14 }}>{track.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate" style={{ color: "#f5e6d3" }}>{track.title}</p>
                      <p className="text-xs truncate" style={{ color: "#f5e6d355" }}>{track.artist}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ── DESBLOQUEADA ── */
          <>
            {activeTrack && (
              <div className="w-full rounded-2xl px-5 py-4 flex items-center gap-4 animate-entrance"
                style={{ background: `linear-gradient(135deg, ${activeTrack.color}22, ${activeTrack.color}11)`, border: `1px solid ${activeTrack.color}44` }}>
                <span style={{ fontSize: 28, lineHeight: 1, flexShrink: 0, animation: isPlaying ? "float-gentle 1.5s ease-in-out infinite" : "none" }}>{activeTrack.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate" style={{ color: activeTrack.color }}>{activeTrack.title}</p>
                  <p className="text-xs" style={{ color: "#f5e6d355" }}>{activeTrack.artist}</p>
                </div>
                <div className="flex gap-1 items-end" style={{ height: 20 }}>
                  {[1, 2, 3].map(b => (
                    <div key={b} className="w-0.5 rounded-full" style={{ height: 20, background: activeTrack.color, animation: isPlaying ? `float-gentle ${0.6 + b * 0.2}s ease-in-out infinite` : "none", animationDelay: `${b * 0.1}s` }} />
                  ))}
                </div>
              </div>
            )}

            <div className="w-full rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0d0d0d, #1a1a1a)", border: "1px solid #d4af7a1a", padding: "12px 28px" }}>
              <div className="px-6 py-4 flex items-center gap-3 border-b" style={{ borderColor: "#ffffff0a" }}>
                <span style={{ fontSize: 22, lineHeight: 1, animation: "float-gentle 2s ease-in-out infinite" }}>🎧</span>
                <div>
                  <p className="font-bold text-sm" style={{ color: "#f5e6d3" }}>Playlist da Ketellen</p>
                  <p className="text-xs" style={{ color: "#f5e6d333" }}>{PLAYLIST.length} músicas · toque para tocar</p>
                </div>
              </div>
              <div>
                {SECTIONS.map(section => (
                  <div key={section.label}>
                    <div className="px-6 py-2" style={{ background: "#ffffff05", borderBottom: "1px solid #ffffff07" }}>
                      <p className="text-xs font-bold tracking-wider" style={{ color: "#ffffff44" }}>{section.label}</p>
                    </div>
                    {PLAYLIST.slice(section.start, section.end + 1).map((track, localIdx) => {
                      const i = section.start + localIdx
                      const playing = isTrackPlaying(i)
                      return (
                        <button key={i} onClick={() => handlePlay(i)}
                          className="w-full flex items-center gap-4 px-6 py-4 text-left transition-all"
                          style={{ background: playing ? `${track.color}18` : "transparent", borderBottom: i < PLAYLIST.length - 1 ? "1px solid #ffffff06" : "none", opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(-16px)", transition: `opacity 0.4s ease ${i * 0.04}s, transform 0.4s ease ${i * 0.04}s, background 0.2s`, WebkitTapHighlightColor: "transparent", padding: "4px 4px" }}>
                          <div className="w-7 flex items-center justify-center flex-shrink-0">
                            {playing ? <span style={{ fontSize: 16, lineHeight: 1, color: track.color }}>⏸</span> : <span style={{ fontSize: 12, color: "#ffffff33" }}>{localIdx + 1}</span>}
                          </div>
                          <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: `${track.color}22`, border: `1px solid ${track.color}44`, fontSize: 16, lineHeight: 1 }}>
                            {track.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm truncate" style={{ color: playing ? track.color : "#f5e6d3" }}>{track.title}</p>
                            <p className="text-xs truncate" style={{ color: "#f5e6d355" }}>{track.artist}</p>
                          </div>
                          {playing && (
                            <div className="flex gap-0.5 items-end" style={{ height: 16 }}>
                              {[1, 2, 3, 2].map((h, j) => (
                                <div key={j} className="w-0.5 rounded-full" style={{ height: h * 4, background: track.color, animation: `float-gentle ${0.5 + j * 0.15}s ease-in-out infinite`, animationDelay: `${j * 0.1}s` }} />
                              ))}
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <div ref={endRef} className="w-full h-1" aria-hidden />
      <div className="gold-line w-full absolute bottom-0" />
    </section>
  )
}
