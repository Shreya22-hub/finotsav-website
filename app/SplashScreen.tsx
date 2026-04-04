'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function SplashScreen() {
  const [show, setShow] = useState(true)
  const [animateOut, setAnimateOut] = useState(false)
  const [scaleIn, setScaleIn] = useState(false)

  useEffect(() => {
    // Trigger scale-in almost immediately to initiate cinematic zoom
    const scaleTimer = setTimeout(() => setScaleIn(true), 50)
    // Start fading out after 1.8 seconds
    const timer = setTimeout(() => setAnimateOut(true), 1800)
    // Remove from DOM safely after completion
    const unmountTimer = setTimeout(() => setShow(false), 2600)
    return () => {
      clearTimeout(scaleTimer)
      clearTimeout(timer)
      clearTimeout(unmountTimer)
    }
  }, [])

  if (!show) return null

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-all duration-700 ease-in-out ${
        animateOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div 
        className={`flex flex-col items-center gap-6 transition-all duration-1000 ease-out ${
          scaleIn ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        } ${animateOut ? 'scale-110 blur-md' : 'blur-0'}`}
      >
        <div className="relative w-32 h-32 md:w-40 md:h-40 bg-white rounded-full flex items-center justify-center border-4 border-yellow-500/50 shadow-[0_0_80px_rgba(234,179,8,0.5)]">
            <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
               <Image src="/logo.png" alt="Utsavya Logo" fill className="object-contain mix-blend-multiply" priority />
            </div>
        </div>
        <span className="text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-[0_0_30px_rgba(234,179,8,0.3)]">
          Utsav<span className="text-yellow-500">ya</span>
        </span>
      </div>
    </div>
  )
}
