'use client';

import Image from 'next/image'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tile } from '@/components/ui/tile'
import { useEffect, useState } from 'react';
import { generateMap } from '@/lib/catan';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Map from '@/components/ui/map';
import { rebuildFrom, shareCode } from '@/lib/share';
import { useRouter } from 'next/navigation';

interface TileType {
    type: string;
    num: number;
}

export default function Page({ params }: { params: { slug: string } }){

  const [mode, setMode] = useState('')
  const [data, setData] = useState(rebuildFrom(params.slug).flat())
  const router = useRouter()
  
  function switched(mode: string) {
    setMode(mode)
    let data = generateMap(mode)
    let code = shareCode(data)
    router.push('/'+code)
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    let code = shareCode(generateMap(getMode()))
    router.push('/'+code)
  }

  function getMode() {
    if (data.length == 19) {
        return('catan')
    }
    else if (data.length == 30) {
        return('expansion-catan')
    }
    else {
        return mode
    }
  }

  useEffect(() => {
    console.log(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 p-12 bg-neutral-900">
      <div className="lg:w-[600px] w-[390px] md:w-[480px]">
        <div className='md:inline-flex items-center justify-between w-full text-white font-normal md:px-0 px-4'>
          <div className="flex items-center space-x-2 text">
          <Select onValueChange={switched} defaultValue={getMode()}>
            <SelectTrigger className="w-[250px]">
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
          </div>
          <Button className='dark bg-neutral-900 text-neutral-200 hover:bg-neutral-900 border-none px-0 font-normal' variant="link" onClick={handleClick}>generate catan board</Button>
        </div> 
        <Map mode={getMode()} data={data}></Map>
      </div>
      <div className='footer text-xs bottom-20 text-neutral-600'>Built with 🤍 by <Link className='text-neutral-200 underline' href={'https://aritro.xyz'}>aritro</Link></div>
    </main>
  )
}