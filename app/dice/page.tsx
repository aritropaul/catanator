'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { diceRoll, generatePool } from './dice';
import { BarChart } from '@tremor/react';

export default function Page(){

  const [roll, setRoll] = useState(7);
  const [history, setHistory] = useState<number[]>(Array(11).fill(0))
  const [pools, setPools] = useState(generatePool())
  const [way, setWay] = useState('3,4')
  const [totalRolls, setTotalRolls] = useState(0)

  function handleRoll() {
      let result = diceRoll(pools)
      setRoll(result.randomRoll)
      setPools(result.pool)
      setWay(result.randomWay)
      setTotalRolls(t => t + 1)
      setHistory(prev => {
        const next = [...prev]
        next[result.randomRoll - 2]++
        return next
      })
      if (pools.length < 10) {
        setPools(generatePool())
      }
  }

  const chartData = history.map((count, i) => ({
    name: String(i + 2),
    Rolls: count,
  }))

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-12 bg-neutral-900">
      <div className="w-full max-w-lg mt-[10%] items-center">
        <div className='items-center w-full text-neutral-200 font-normal'>
          <div className='w-full text-sm font-normal text-neutral-200 text-center'>You rolled</div>
          <div className='text-[72px] w-full text-neutral-200 text-center font-normal'>
            {roll}
          </div>
          <div className='text-lg text-neutral-500 text-center'>
            <span className='text-red-500'>{way.split(',')[0]}</span> , {way.split(',')[1]}
          </div>
          <Button className='dark w-full bg-neutral-900 text-neutral-200 hover:bg-neutral-900 border-none px-0 font-normal' onClick={handleRoll} variant="link">
            next roll
          </Button>
        </div>
        {totalRolls > 0 && (
          <div className="mt-8 fade-in">
            <p className="text-neutral-500 text-xs text-center mb-2">{totalRolls} roll{totalRolls !== 1 ? 's' : ''}</p>
            <BarChart
              data={chartData}
              index="name"
              categories={['Rolls']}
              colors={['neutral']}
              showLegend={false}
              showGridLines={false}
              className="h-40"
            />
          </div>
        )}
      </div>
      <div className='footer text-xs bottom-20 text-neutral-600'>Built with 🤍 by <Link className='text-neutral-200 underline' href={'https://aritro.xyz'}>aritro</Link></div>
    </main>
  )
}
