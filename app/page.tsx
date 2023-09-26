'use client';

import Image from 'next/image'

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tile } from '@/components/ui/tile'
import { useEffect, useState } from 'react';
import { generateMap } from '@/lib/catan';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface TileType {
  type: String
  num: Number
}

export default function Home() {

  const [mode, setMode] = useState(true)
  const mapData = [
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -1},
    {type: "Placeholder", num: -1}]

  const [row1, setRow1] = useState(mapData.slice(0,3))
  const [row2, setRow2] = useState(mapData.slice(3,7))
  const [row3, setRow3] = useState(mapData.slice(7,12))
  const [row4, setRow4] = useState(mapData.slice(12,18))
  const [row5, setRow5] = useState(mapData.slice(18,23))
  const [row6, setRow6] = useState(mapData.slice(23,27))
  const [row7, setRow7] = useState(mapData.slice(27,30))

  function switched(mode: Boolean) {
    if (mode == false) { setMode(true) }
    if (mode == true) { setMode(false) }
      setRow1(mapData.slice(0,3))
      setRow2(mapData.slice(3,7))
      setRow3(mapData.slice(7,12))
      setRow4(mapData.slice(12,18))
      setRow5(mapData.slice(18,23))
      setRow6(mapData.slice(23,27))
      setRow7(mapData.slice(27,30))
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newData = generateMap(mode)
    if (mode == true) {
      setRow1(newData[0])
      setRow2(newData[1])
      setRow3(newData[2])
      setRow6(newData[3])
      setRow7(newData[4])
    }
    if (mode == false) {
      setRow1(newData[0])
      setRow2(newData[1])
      setRow3(newData[2])
      setRow4(newData[3])
      setRow5(newData[4])
      setRow6(newData[5])
      setRow7(newData[6])
    }
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-neutral-900">
      <div className="lg:w-[600px] w-[390px] md:w-[480px]">
        <div className='md:inline-flex items-center justify-between w-full text-white font-normal md:px-0 px-4'>
          <div className="flex items-center space-x-2 text">
            {mode==true && <Label className='font-normal text-neutral-50' htmlFor="normal">normal game</Label>}
            {mode==false && <Label className='font-normal text-neutral-700' htmlFor="normal">normal game</Label>}
            <Switch className='dark' id="mode" onCheckedChange={switched} />
            {mode==true && <Label className='font-normal text-neutral-700' htmlFor="expansion">expansion mode</Label>}
            {mode==false && <Label className='font-normal text-neutral-50' htmlFor="expansion">expansion mode</Label>}
          </div>
          <Button className='dark bg-neutral-900 text-neutral-200 hover:bg-neutral-900 border-none px-0 font-normal' variant="link" onClick={handleClick}>generate catan board</Button>
        </div> 
        <div className="w-full pt-20 pb-12 justify-center items-center inline-flex">
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 md:space-x-[-20px] space-x-[-12px]">
            <div className="flex-col justify-start items-start gap-1.5 inline-flex">
              {
                row1.map((item) => {
                  return (<Tile key={mapData.indexOf(item)} tile={item.type} num={item.num}></Tile>)
                })
              }
            </div>
            <div className="flex-col justify-start items-start gap-1.5 inline-flex">
              {
                row2.map((item) => {
                  return (<Tile key={mapData.indexOf(item)} tile={item.type} num={item.num}></Tile>)
                })
              }
            </div>
            <div className="flex-col justify-start items-start gap-1.5 inline-flex">
              {
                row3.map((item) => {
                  return (<Tile key={mapData.indexOf(item)} tile={item.type} num={item.num}></Tile>)
                })
              }
            </div>
            {
              mode == false && 
              <div className="flex-col justify-start items-start gap-1.5 inline-flex">
                {
                  row4.map((item) => {
                    return (<Tile key={mapData.indexOf(item)} tile={item.type} num={item.num}></Tile>)
                  })
                }
              </div>
            }
            {
              mode == false && 
              <div className="flex-col justify-start items-start gap-1.5 inline-flex">
                {
                  row5.map((item) => {
                    return (<Tile key={mapData.indexOf(item)} tile={item.type} num={item.num}></Tile>)
                  })
                }
              </div>
            }
            {
              <div className="flex-col justify-start items-start gap-1.5 inline-flex">
                {
                  row6.map((item) => {
                    return (<Tile key={mapData.indexOf(item)} tile={item.type} num={item.num}></Tile>)
                  })
                }
                </div>
            }
            {
              <div className="flex-col justify-start items-start gap-1.5 inline-flex">
                {
                  row7.map((item) => {
                    return (<Tile key={mapData.indexOf(item)} tile={item.type} num={item.num}></Tile>)
                  })
                }
                </div>
            }
          </div>
        </div>
      </div>
      <div className='footer text-xs text-neutral-600'>Built with 🤍 by <Link className='text-neutral-200 underline' href={'https://aritro.xyz'}>aritro</Link></div>
    </main>
  )
}