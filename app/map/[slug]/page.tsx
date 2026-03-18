'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { use, useEffect, useRef, useState } from 'react';
import { generateMap, generatePorts } from '@/lib/catan';
import type { GenerateOptions } from '@/lib/catan';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { rebuildFrom, shareCode, flatToRows } from '@/lib/share';
import { useRouter } from 'next/navigation';
import CatanMap from '@/components/ui/maps/catan';
import CatanExpMap from '@/components/ui/maps/catanexp';
import { calculateFairness } from '@/lib/scoring';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

interface TileType {
    type: string;
    num: number;
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const router = useRouter()

  let initialData: TileType[] = []
  let initialPorts: {type: string}[] = []
  let parseError = false

  try {
    const parsed = rebuildFrom(slug)
    initialData = parsed.rows.flat()
    initialPorts = parsed.ports
  } catch {
    parseError = true
  }

  const [data, setData] = useState(initialData)
  const [ports] = useState(initialPorts)
  const [copied, setCopied] = useState(false)
  const [selectedTile, setSelectedTile] = useState<number | null>(null)

  // Generation settings (persisted in localStorage)
  const [noAdjacentResources, setNoAdjacentResources] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('catanator-noAdjacentResources') === 'true'
  })
  const [desertCenter, setDesertCenter] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('catanator-desertCenter') === 'true'
  })
  const [balancedPips, setBalancedPips] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('catanator-balancedPips') === 'true'
  })

  // Board history
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  function toggleNoAdjacentResources() {
    const next = !noAdjacentResources
    setNoAdjacentResources(next)
    localStorage.setItem('catanator-noAdjacentResources', String(next))
  }
  function toggleDesertCenter() {
    const next = !desertCenter
    setDesertCenter(next)
    localStorage.setItem('catanator-desertCenter', String(next))
  }
  function toggleBalancedPips() {
    const next = !balancedPips
    setBalancedPips(next)
    localStorage.setItem('catanator-balancedPips', String(next))
  }

  const mapRef = useRef<HTMLDivElement>(null)

  function getMode() {
    if (data.length === 19) return 'catan'
    if (data.length === 30) return 'expansion-catan'
    return 'catan'
  }

  const mode = getMode()
  const fairness = calculateFairness(data)

  // Load/save history
  useEffect(() => {
    const stored = localStorage.getItem('catanator-history')
    let hist: string[] = stored ? JSON.parse(stored) : []
    if (!hist.includes(slug)) {
      hist.push(slug)
    }
    if (hist.length > 50) hist = hist.slice(-50)
    localStorage.setItem('catanator-history', JSON.stringify(hist))
    setHistory(hist)
    setHistoryIndex(hist.indexOf(slug))
  }, [slug])

  // Keyboard shortcuts
  const handleGenerateRef = useRef<() => void>(() => {})
  handleGenerateRef.current = handleGenerate

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement
      if (target.closest('input, select, textarea, [role="listbox"], [role="option"]')) return
      if (e.code === 'Space') {
        e.preventDefault()
        handleGenerateRef.current()
      }
      if (e.code === 'Escape') {
        setSelectedTile(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  function getOptions(): GenerateOptions {
    return {
      noAdjacentSameResource: noAdjacentResources,
      balancedPips,
      desertCenter,
    }
  }

  function handleGenerate() {
    const options = getOptions()
    const mapData = generateMap(mode, options)
    const newPorts = generatePorts(mode)
    const code = shareCode(mapData, newPorts)
    router.push('/map/' + code)
  }

  function switched(newMode: string) {
    const options = getOptions()
    const mapData = generateMap(newMode, options)
    const newPorts = generatePorts(newMode)
    const code = shareCode(mapData, newPorts)
    router.push('/map/' + code)
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleDownload() {
    if (!mapRef.current) return
    // Disable animations so html2canvas captures the final state
    const tiles = mapRef.current.querySelectorAll('.tile-enter')
    tiles.forEach(el => {
      const htmlEl = el as HTMLElement
      htmlEl.style.animation = 'none'
      htmlEl.style.opacity = '1'
      htmlEl.style.transform = 'scale(1)'
    })
    const html2canvas = (await import('html2canvas')).default
    const canvas = await html2canvas(mapRef.current, {
      backgroundColor: '#171717',
      scale: 2,
      useCORS: true,
    })
    // Restore animations
    tiles.forEach(el => {
      const htmlEl = el as HTMLElement
      htmlEl.style.animation = ''
      htmlEl.style.opacity = ''
      htmlEl.style.transform = ''
    })
    const link = document.createElement('a')
    link.download = 'catan-board.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  function handleTileClick(index: number) {
    if (selectedTile === null) {
      setSelectedTile(index)
    } else if (selectedTile === index) {
      setSelectedTile(null)
    } else {
      const newData = [...data]
      const temp = { ...newData[selectedTile] }
      newData[selectedTile] = { ...newData[index] }
      newData[index] = temp
      setData(newData)
      setSelectedTile(null)
      const rows = flatToRows(newData, mode)
      const code = shareCode(rows, ports)
      window.history.replaceState(null, '', '/map/' + code)
    }
  }

  function goBack() {
    if (historyIndex > 0) {
      router.push('/map/' + history[historyIndex - 1])
    }
  }

  function goForward() {
    if (historyIndex < history.length - 1) {
      router.push('/map/' + history[historyIndex + 1])
    }
  }

  if (parseError) {
    return (
      <main className="flex min-h-screen w-full flex-col items-center justify-center bg-neutral-900">
        <p className="text-neutral-400 text-sm">Invalid board code.</p>
        <Button className="mt-4 text-neutral-200" variant="link" onClick={() => router.push('/')}>
          Generate a new board
        </Button>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen w-fit lg:w-full flex-col items-center justify-between p-12 bg-neutral-900">
      <div className="w-fit lg:w-[600px]">
        {/* Controls */}
        <div className='flex items-center justify-between w-full md:px-0 px-4'>
          <Select onValueChange={switched} defaultValue={mode}>
            <SelectTrigger className="w-[180px] text-white">
              <SelectValue placeholder="Select a game" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Game</SelectLabel>
                <SelectItem value="catan">Catan</SelectItem>
                <SelectItem value="expansion-catan">Catan Expansion</SelectItem>
                <SelectItem value="seafarers" disabled>Seafarers</SelectItem>
                <SelectItem value="expansion-seafarers" disabled>Seafarers Expansion</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-3 text-sm text-neutral-400">
            <button className="hover:text-neutral-200 transition-colors" onClick={handleGenerate}>generate</button>
            <span className="text-neutral-700">·</span>
            <button className="hover:text-neutral-200 transition-colors" onClick={handleCopy}>{copied ? 'copied!' : 'copy link'}</button>
            <span className="text-neutral-700">·</span>
            <button className="hover:text-neutral-200 transition-colors" onClick={handleDownload}>download</button>
          </div>
        </div>

        {/* Settings + History + Fairness — single row */}
        <div className="flex items-center justify-between mt-3 md:px-0 px-4">
          <div className="flex items-center gap-1.5">
            <button
              className={`text-xs px-2 py-0.5 rounded-full transition-colors ${noAdjacentResources ? 'bg-neutral-700 text-neutral-200' : 'text-neutral-600 hover:text-neutral-400'}`}
              onClick={toggleNoAdjacentResources}
            >no same neighbors</button>
            <button
              className={`text-xs px-2 py-0.5 rounded-full transition-colors ${balancedPips ? 'bg-neutral-700 text-neutral-200' : 'text-neutral-600 hover:text-neutral-400'}`}
              onClick={toggleBalancedPips}
            >balanced</button>
            <button
              className={`text-xs px-2 py-0.5 rounded-full transition-colors ${desertCenter ? 'bg-neutral-700 text-neutral-200' : 'text-neutral-600 hover:text-neutral-400'}`}
              onClick={toggleDesertCenter}
            >desert center</button>
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <button
              className={`p-0.5 rounded transition-colors ${historyIndex > 0 ? 'text-neutral-400 hover:text-neutral-200' : 'text-neutral-700 cursor-default'}`}
              onClick={goBack}
              disabled={historyIndex <= 0}
            ><ChevronLeftIcon className="w-3.5 h-3.5" /></button>
            <button
              className={`p-0.5 rounded transition-colors ${historyIndex < history.length - 1 ? 'text-neutral-400 hover:text-neutral-200' : 'text-neutral-700 cursor-default'}`}
              onClick={goForward}
              disabled={historyIndex >= history.length - 1}
            ><ChevronRightIcon className="w-3.5 h-3.5" /></button>
            <span className="text-neutral-700 mx-0.5">|</span>
            <span>fairness <span className="text-neutral-300 font-medium">{fairness}</span></span>
          </div>
        </div>

        {/* Map */}
        <div ref={mapRef}>
          {mode === 'catan' && (
            <CatanMap
              mode='catan'
              data={data}
              ports={ports}
              onTileClick={handleTileClick}
              selectedTile={selectedTile}
            />
          )}
          {mode === 'expansion-catan' && (
            <CatanExpMap
              mode='expansion-catan'
              data={data}
              ports={ports}
              onTileClick={handleTileClick}
              selectedTile={selectedTile}
            />
          )}
        </div>

        {/* Hints */}
        <div className="text-center text-neutral-700 text-xs mt-1">
          space to generate · click tiles to swap · esc to deselect
        </div>
      </div>
      <div className='footer text-xs bottom-20 text-neutral-600'>Built with 🤍 by <Link className='text-neutral-200 underline' href={'https://aritro.xyz'}>aritro</Link></div>
    </main>
  )
}
