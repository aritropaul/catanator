"use client";

import * as React from "react"
import Image from 'next/image'

type TileType = {tile: String, num: Number} 

const Tile = ({tile , num}: TileType) => {
    // console.log(tile, num)
    return (
        <div className="relative">
            <Image src={"/" + tile + ".png"} alt="placeholder" width={112} height={99} />
            {num != -1 && <p className="absolute top-[33.2px] left-[40px] w-[32px] h-[32px] text-center font-semibold text-2xl bg-white rounded-full">{num.toString()}</p>}
        </div>
    )
}

export { Tile }