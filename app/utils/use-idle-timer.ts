"use client"

import { useEffect, useRef, useState } from "react"

const ACTIVITY_EVENTS = [
  "mousemove",
  "mousedown",
  "keydown",
  "touchstart",
  "wheel",
] as const

export function useIdleTimer(timeoutMs: number) {
  const [isIdle, setIsIdle] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const resetTimer = () => {
      setIsIdle(false)

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        setIsIdle(true)
      }, timeoutMs)
    }

    resetTimer()

    ACTIVITY_EVENTS.forEach((event) => {
      window.addEventListener(event, resetTimer, { passive: true })
    })

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      ACTIVITY_EVENTS.forEach((event) => {
        window.removeEventListener(event, resetTimer)
      })
    }
  }, [timeoutMs])

  return isIdle
}