"use client"

import { useEffect } from "react"
import Link from "next/link"
import { type ThemeReference, themes } from "@/lib/themes"
import { useAudio } from "@/lib/audio-context"
import { MusicPlayer } from "@/components/music-player"

interface ThemePageClientProps {
  theme: ThemeReference
}

export function ThemePageClient({ theme }: ThemePageClientProps) {
  const { changeSong } = useAudio()

  useEffect(() => {
    changeSong(theme.musicUrl)
  }, [theme.musicUrl, changeSong])

  // Get other themes for navigation
  const otherThemes = themes.filter((t) => t.id !== theme.id)

  return (
    <div 
      className="min-h-screen p-4 pb-24"
      style={{ 
        background: `linear-gradient(135deg, ${theme.color}20 0%, ${theme.color}40 50%, ${theme.color}20 100%)` 
      }}
    >
      <div className="max-w-4xl mx-auto space-y-6 py-4 sm:py-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-lg hover:scale-105 transition-transform font-bold text-card-foreground"
        >
          ← Voltar
        </Link>

        {/* Header */}
        <div 
          className="text-center p-6 sm:p-8 rounded-3xl shadow-xl"
          style={{ backgroundColor: theme.color }}
        >
          <span className="text-5xl sm:text-6xl mb-4 block">{theme.emoji}</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
            {theme.name}
          </h1>
          <p className="text-white/90 text-base sm:text-lg md:text-xl">
            {theme.description}
          </p>
        </div>

        {/* GIFs Gallery */}
        <div className="bg-card/90 backdrop-blur rounded-2xl p-4 sm:p-6 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-bold text-card-foreground mb-4 text-center">
            {theme.emoji} Galeria {theme.emoji}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {theme.images.map((image, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden shadow-lg animate-bounce-in"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  borderColor: theme.color,
                  borderWidth: 3
                }}
              >
                <img
                  src={image}
                  alt={`${theme.name} ${index + 1}`}
                  className="w-full h-40 sm:h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Fun Facts */}
        <div className="bg-card/90 backdrop-blur rounded-2xl p-4 sm:p-6 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-bold text-card-foreground mb-4 text-center">
            Curiosidades
          </h2>
          <ul className="space-y-3">
            {theme.facts.map((fact, index) => (
              <li
                key={index}
                className="flex items-start gap-3 p-3 bg-muted rounded-xl animate-bounce-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span 
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: theme.color }}
                >
                  {index + 1}
                </span>
                <span className="text-card-foreground text-sm sm:text-base">{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Other Themes */}
        <div className="bg-card/90 backdrop-blur rounded-2xl p-4 sm:p-6 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-bold text-card-foreground mb-4 text-center">
            Outros Temas
          </h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {otherThemes.map((t) => (
              <Link
                key={t.id}
                href={`/tema/${t.id}`}
                className="px-3 sm:px-4 py-2 rounded-full text-white font-bold shadow-lg hover:scale-110 transition-transform text-sm sm:text-base"
                style={{ backgroundColor: t.color }}
              >
                {t.emoji} {t.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <MusicPlayer />
    </div>
  )
}
