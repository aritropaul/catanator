'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { diceRoll, dieRolls, generatePool } from './dice';
import { BarChart } from '@tremor/react';

export default function Page(){

  const [rolls, setRolls] = useState(7);
  const [data, setData] = useState([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ])
  const [pools, setPools] = useState(generatePool())

  function handleRoll() {
      let roll = diceRoll(pools)
      console.log(roll)
      setRolls(roll.randomRoll)
      setPools(roll.pool)
      if (pools.length < 10) {
        setPools(generatePool())
      }
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-12 bg-neutral-900">
      <div className="w-fit lg:w-[600px] mt-[20%] items-center justify-between">
        <div className='md:inline-block items-center justify-between w-full text-neutral-200 font-normal md:px-0 px-4'>
          <div className='w-full text-sm font-normal text-neutral-200 items-center justify-between text-center'>You rolled</div>
          <div className='text-[72px] items-center justify-between w-full text-neutral-200 text-center font-normal md:px-0 px-4'>
            {/* { rolls[0] } , { rolls[1] } */ rolls}
          </div>
          <Button className='dark w-full bg-neutral-900 text-neutral-200 hover:bg-neutral-900 border-none px-0 font-normal' onClick={handleRoll} variant="link">
            next roll
          </Button>
        </div> 
      </div>
      <div className='footer text-xs bottom-20 text-neutral-600'>Built with 🤍 by <Link className='text-neutral-200 underline' href={'https://aritro.xyz'}>aritro</Link></div>
    </main>
  )
}