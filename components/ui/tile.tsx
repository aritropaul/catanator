/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react"
import Image from 'next/image'

type TileType = {tile: String, num: Number} 

const Tile = ({tile , num}: TileType) => {
    // console.log(tile, num)
    return (
        <div className="relative">
            <img className="md:w-[112px] md:h-[99px] w-[64.6px] h-[56.8px]" src={"/" + tile + ".png"} alt="placeholder"/>
            {num != -1 && <p className="absolute md:top-[33.2px] md:left-[40px] md:w-[32px] md:h-[32px] top-[18.4px] left-[22.25px] w-[20px] h-[20px] md:leading-[32px] text-center font-medium md:text-xl text-sm bg-white rounded-full">{num.toString()}</p>}
        </div>
    )
}

export { Tile }