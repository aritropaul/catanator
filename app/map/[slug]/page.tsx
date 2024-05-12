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
import { useEffect, useState } from 'react';
import { generateMap, generatePorts } from '@/lib/catan';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Map from '@/components/ui/maps/catan';
import { rebuildFrom, shareCode } from '@/lib/share';
import { useRouter } from 'next/navigation';
import CatanMap from '@/components/ui/maps/catan';
import CatanExpMap from '@/components/ui/maps/catanexp';
import { basePorts } from '@/components/ui/port';

interface TileType {
    type: string;
    num: number;
}

export default function Page({ params }: { params: { slug: string } }){

  const [mode, setMode] = useState('')
  const [data, setData] = useState(rebuildFrom(params.slug).rows.flat())
  const [ports, setPorts] = useState(rebuildFrom(params.slug).ports)
  const router = useRouter()
  
  function switched(mode: string) {
    setMode(mode)
    let data = generateMap(mode)
    let code = shareCode(data, generatePorts(mode))
    router.push('/map/'+code)
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    let code = shareCode(generateMap(getMode()), generatePorts(getMode()))
    router.push('/map/'+code)
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
    <main className="flex min-h-screen w-fit lg:w-full flex-col items-center justify-between p-12 bg-neutral-900">
      <div className="w-fit lg:w-[600px]x">
        <div className='md:inline-block items-center justify-between w-full text-white font-normal md:px-0 px-4'>
          <div className="sticky left-2 top-2 flex items-center space-x-2 text">
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
        {
          getMode() == 'catan' &&
          <CatanMap mode={'catan'} data={data} ports={ports}></CatanMap>
        }
        {
          getMode() == 'expansion-catan' &&
          <CatanExpMap mode={'expansion-catan'} data={data} ports={ports}></CatanExpMap>
        }
      </div>
      <div className='footer text-xs bottom-20 text-neutral-600'>Built with 🤍 by <Link className='text-neutral-200 underline' href={'https://aritro.xyz'}>aritro</Link></div>
    </main>
  )
}