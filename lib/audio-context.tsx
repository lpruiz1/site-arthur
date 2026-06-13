"use client"

import { createContext, useContext, useState, useRef, useEffect, useCallback, type ReactNode } from "react"

const BACKGROUND_MUSIC = "/music/background.m4a"

interface AudioContextType {
  isPlaying: boolean
  volume: number
  currentSrc: string
  setVolume: (v: number) => void
  play: () => Promise<void>
  pause: () => void
  toggle: () => Promise<void>
  changeSong: (url: string, onEnded?: () => void) => void
}

const AudioCtx = createContext<AudioContextType | null>(null)

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.35)
  const [currentSrc, setCurrentSrc] = useState(BACKGROUND_MUSIC)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const interacted = useRef(false)
  const onEndedRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const audio = new Audio(BACKGROUND_MUSIC)
    audio.loop = true
    audio.volume = 0.35
    audio.addEventListener("ended", () => {
      if (onEndedRef.current) {
        onEndedRef.current()
        onEndedRef.current = null
      }
    })
    audioRef.current = audio
    return () => { audio.pause(); audioRef.current = null }
  }, [])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  // Auto-play on first interaction (required by browser policy)
  useEffect(() => {
    const handle = async () => {
      if (!interacted.current && audioRef.current) {
        interacted.current = true
        try { await audioRef.current.play(); setIsPlaying(true) } catch {}
      }
    }
    document.addEventListener("click", handle, { once: true })
    document.addEventListener("touchstart", handle, { once: true })
    return () => {
      document.removeEventListener("click", handle)
      document.removeEventListener("touchstart", handle)
    }
  }, [])

  const play = useCallback(async () => {
    try { await audioRef.current?.play(); setIsPlaying(true) } catch {}
  }, [])

  const pause = useCallback(() => {
    audioRef.current?.pause(); setIsPlaying(false)
  }, [])

  const toggle = useCallback(async () => {
    isPlaying ? pause() : await play()
  }, [isPlaying, play, pause])

  const setVolume = useCallback((v: number) => setVolumeState(v), [])

  const changeSong = useCallback(async (url: string, onEnded?: () => void) => {
    if (!audioRef.current) return
    audioRef.current.pause()
    audioRef.current.src = url
    audioRef.current.loop = false
    audioRef.current.load()
    onEndedRef.current = onEnded ?? null
    setCurrentSrc(url)
    try { await audioRef.current.play(); setIsPlaying(true) } catch {}
  }, [])

  return (
    <AudioCtx.Provider value={{ isPlaying, volume, currentSrc, setVolume, play, pause, toggle, changeSong }}>
      {children}
    </AudioCtx.Provider>
  )
}

export function useAudio() {
  const ctx = useContext(AudioCtx)
  if (!ctx) throw new Error("useAudio must be used within AudioProvider")
  return ctx
}
