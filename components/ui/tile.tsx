/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react"

type TileType = {tile: string, num: string, index?: number, onClick?: () => void, selected?: boolean}

const Tile = ({tile, num, index = 0, onClick, selected}: TileType) => {
    const isVisible = tile !== 'Placeholder'
    return (
        <div
            className={`relative ${isVisible ? 'tile-enter' : ''} ${selected ? 'brightness-125 scale-110 z-10' : ''} ${onClick ? 'cursor-pointer hover:brightness-110' : ''} transition-all duration-150`}
            style={isVisible ? { animationDelay: `${index * 40}ms` } : undefined}
            onClick={onClick}
        >
            <img className="md:w-[112px] md:h-[99px] w-[64.6px] h-[56.8px]" src={"/" + tile + ".png"} alt="placeholder"/>
            {(Number(+num) > 0 && Number(num) != 6 && Number(num) != 8) && <p className=" absolute md:top-[33.2px] md:left-[40px] md:w-[32px] md:h-[32px] top-[18.4px] left-[22.25px] w-[20px] h-[20px] md:leading-[32px] text-center font-medium md:text-xl text-sm bg-white rounded-full">{num}</p>}
            {(Number(num) == 6 || Number(num) == 8) && <p className=" absolute md:top-[33.2px] md:left-[40px] md:w-[32px] md:h-[32px] top-[18.4px] left-[22.25px] w-[20px] h-[20px] md:leading-[32px] text-center text-red-500 placeholder:odd:font-medium md:text-xl text-sm bg-white rounded-full">{num}</p>}
            {(tile == 'Port' && Number(num) != -1) &&<p className=" absolute md:top-[33.2px] md:left-[40px] md:w-[32px] md:h-[32px] top-[18.4px] left-[22.25px] w-[20px] h-[20px] md:leading-[32px] text-center font-medium md:text-lg text-xs bg-white rounded-full">{num}</p>}
            {selected && <div className="absolute inset-0 border-2 border-yellow-400 rounded-lg pointer-events-none" />}
        </div>
    )
}

export { Tile }
