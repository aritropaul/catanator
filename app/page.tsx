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
import { generateMap, generatePorts } from '@/lib/catan';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { shareCode } from '@/lib/share';
import { useRouter } from 'next/navigation';
import Map from '@/components/ui/maps/catan';
import CatanMap from '@/components/ui/maps/catan';
import CatanExpMap from '@/components/ui/maps/catanexp';
import { basePorts } from '@/components/ui/port';

interface TileType {
  type: String
  num: Number
}


export default function Home() {

  const [mode, setMode] = useState('catan')
  const router = useRouter()
  
  const mapData = [
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -2},
    {type: "Placeholder", num: -3},
    {type: "Placeholder", num: -4},
    {type: "Placeholder", num: -5},
    {type: "Placeholder", num: -6},
    {type: "Placeholder", num: -7},
    {type: "Placeholder", num: -8},
    {type: "Placeholder", num: -9},
    {type: "Placeholder", num: -10},
    {type: "Placeholder", num: -11},
    {type: "Placeholder", num: -12},
    {type: "Placeholder", num: -13},
    {type: "Placeholder", num: -14},
    {type: "Placeholder", num: -15},
    {type: "Placeholder", num: -16},
    {type: "Placeholder", num: -17},
    {type: "Placeholder", num: -18},
    {type: "Placeholder", num: -19},
    {type: "Placeholder", num: -20},
    {type: "Placeholder", num: -21},
    {type: "Placeholder", num: -22},
    {type: "Placeholder", num: -23},
    {type: "Placeholder", num: -24},
    {type: "Placeholder", num: -25},
    {type: "Placeholder", num: -26},
    {type: "Placeholder", num: -27},
    {type: "Placeholder", num: -28},
    {type: "Placeholder", num: -29},
    {type: "Placeholder", num: -30}]

    useEffect(() => {
      let code = shareCode(generateMap(mode), generatePorts(mode))
      router.push('/map/'+code)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  function switched(mode: string) {
      setMode(mode)
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    let code = shareCode(generateMap(mode), generatePorts(mode))
    router.push('/map/'+code)
  }
  
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between md:p-24 p-12 bg-neutral-900">
      <div className="lg:w-[800px] w-[480px] md:w-[600px]">
        <div className='md:inline-flex items-center justify-between w-full text-white font-normal md:px-0 px-4'>
          <div className="flex items-center space-x-2 text">
          <Select onValueChange={switched} defaultValue='catan'>
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
        {
          mode == 'catan' &&
          <CatanMap mode={'catan'} data={generateMap(mode).flat()} ports={generatePorts(mode)}></CatanMap>
        }
        {
          mode == 'expansion-catan' &&
          <CatanExpMap mode={'expansion-catan'} data={generateMap(mode).flat()} ports={generatePorts(mode)}></CatanExpMap>
        }
      </div>
      <div className='footer text-xs bottom-20 text-neutral-600'>Built with 🤍 by <Link className='text-neutral-200 underline' href={'https://aritro.xyz'}>aritro</Link></div>
    </main>
  )
}
