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
import { shareCode } from '@/lib/share';
import { useRouter } from 'next/navigation';

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

  const [row1, setRow1] = useState(mapData.slice(0,3))
  const [row2, setRow2] = useState(mapData.slice(3,7))
  const [row3, setRow3] = useState(mapData.slice(7,12))
  const [row4, setRow4] = useState(mapData.slice(12,18))
  const [row5, setRow5] = useState(mapData.slice(18,23))
  const [row6, setRow6] = useState(mapData.slice(23,27))
  const [row7, setRow7] = useState(mapData.slice(27,30))

  function switched(mode: string) {
      setMode(mode)
      setRow1(mapData.slice(0,3))
      setRow2(mapData.slice(3,7))
      setRow3(mapData.slice(7,12))
      setRow4(mapData.slice(12,18))
      setRow5(mapData.slice(18,23))
      setRow6(mapData.slice(23,27))
      setRow7(mapData.slice(27,30))
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    let code = shareCode(generateMap(mode))
    router.push('/'+code)
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 p-12 bg-neutral-900">
      <div className="lg:w-[600px] w-[390px] md:w-[480px]">
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
        <div className="w-full pt-20 pb-12 justify-center items-center inline-flex">
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 md:space-x-[-20px] space-x-[-12px]">
            <div className="flex-col justify-start items-start gap-1.5 inline-flex">
              {
                row1.map((item, index) => {
                  return (<Tile key={index} tile={item.type} num={item.num}></Tile>)
                })
              }
            </div>
            <div className="flex-col justify-start items-start gap-1.5 inline-flex">
              {
                row2.map((item, index) => {
                  return (<Tile key={index} tile={item.type} num={item.num}></Tile>)
                })
              }
            </div>
            <div className="flex-col justify-start items-start gap-1.5 inline-flex">
              {
                row3.map((item, index) => {
                  return (<Tile key={index} tile={item.type} num={item.num}></Tile>)
                })
              }
            </div>
            {
              mode == 'expansion-catan' && 
              <div className="flex-col justify-start items-start gap-1.5 inline-flex">
                {
                  row4.map((item, index) => {
                    return (<Tile key={index} tile={item.type} num={item.num}></Tile>)
                  })
                }
              </div>
            }
            {
              mode == 'expansion-catan' && 
              <div className="flex-col justify-start items-start gap-1.5 inline-flex">
                {
                  row5.map((item, index) => {
                    return (<Tile key={index} tile={item.type} num={item.num}></Tile>)
                  })
                }
              </div>
            }
            {
              <div className="flex-col justify-start items-start gap-1.5 inline-flex">
                {
                  row6.map((item, index) => {
                    return (<Tile key={index} tile={item.type} num={item.num}></Tile>)
                  })
                }
                </div>
            }
            {
              <div className="flex-col justify-start items-start gap-1.5 inline-flex">
                {
                  row7.map((item, index) => {
                    return (<Tile key={index} tile={item.type} num={item.num}></Tile>)
                  })
                }
                </div>
            }
          </div>
        </div>
      </div>
      <div className='footer text-xs bottom-20 text-neutral-600'>Built with 🤍 by <Link className='text-neutral-200 underline' href={'https://aritro.xyz'}>aritro</Link></div>
    </main>
  )
}
