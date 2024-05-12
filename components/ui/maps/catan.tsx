"use client";

import { useEffect, useState } from "react"
import { Tile } from "../tile"
import Port from "../port";
import { generatePorts } from "@/lib/catan";

interface TileType {
    type: string;
    num: number;
}

interface PortType {
  type: string;
}

type MapProps = {mode: string, data: TileType[], ports: PortType[]}

export default function Map(props: MapProps) {

    let mapData = props.data
    let portData = props.ports
    console.log(portData)
    
    const [row1, setRow1] = useState(mapData.slice(0,3))
    const [row2, setRow2] = useState(mapData.slice(3,7))
    const [row3, setRow3] = useState(mapData.slice(7,12))
    const [row4, setRow4] = useState(mapData.slice(12,16))
    const [row5, setRow5] = useState(mapData.slice(16,19))

    useEffect(() => {
        // The code here will run when the component mounts
      setRow1(mapData.slice(0,3))
      setRow2(mapData.slice(3,7))
      setRow3(mapData.slice(7,12))
      setRow4(mapData.slice(12,16))
      setRow5(mapData.slice(16,19))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // The empty array causes this effect to only run on mount
    


    return(
    <div className="w-full pt-20 pb-12 justify-center items-center inline-flex">
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 md:space-x-[-20px] space-x-[-12px]">
            <div className="flex-col justify-start items-start gap-1.5 inline-flex">
              <Port type={portData[0].type} position={"2"}></Port>
              <Tile tile={'Placeholder'} num={"-1"}></Tile>
              <Port type={portData[1].type} position={"1"}></Port>
              <Tile tile={'Placeholder'} num={"-1"}></Tile>
            </div>
            <div className="flex-col justify-start items-start gap-1.5 inline-flex">
            <Tile  tile={'Placeholder'} num={"-1"}></Tile>
              {
                row1.map((item, index) => {
                  return (<Tile key={index} tile={item.type} num={item.num.toString()}></Tile>)
                })
              }
            <Port type={portData[2].type} position={"1"}></Port>
            </div>
            <div className="flex-col justify-start items-start gap-1.5 inline-flex">
            <Port type={portData[3].type} position={"3"}></Port>
              {
                row2.map((item, index) => {
                  return (<Tile key={index} tile={item.type} num={item.num.toString()}></Tile>)
                })
              }
            <Tile  tile={'Placeholder'} num={"-1"}></Tile>
            </div>
            <div className="flex-col justify-start items-start gap-1.5 inline-flex">
            <Tile  tile={'Placeholder'} num={"-1"}></Tile>
              {
                row3.map((item, index) => {
                  return (<Tile key={index} tile={item.type} num={item.num.toString()}></Tile>)
                })
              }
            <Port type={portData[4].type} position={"6"}></Port>
            </div>
            <div className="flex-col justify-start items-start gap-1.5 inline-flex">
              <Port type={portData[5].type} position={"3"}></Port>
              {
                row4.map((item, index) => {
                  return (<Tile key={index} tile={item.type} num={item.num.toString()}></Tile>)
                })
              }
              <Tile  tile={'Placeholder'} num={"-1"}></Tile>
            </div>
            <div className="flex-col justify-start items-start gap-1.5 inline-flex">
              <Tile  tile={'Placeholder'} num={"-1"}></Tile>
              {
                row5.map((item, index) => {
                  return (<Tile key={index} tile={item.type} num={item.num.toString()}></Tile>)
                })
              }
              <Port type={portData[6].type} position={"5"}></Port>
            </div>
            <div className="flex-col justify-start items-start gap-1.5 inline-flex">
              <Port type={portData[7].type} position={"4"}></Port>
              <Tile  tile={'Placeholder'} num={"-1"}></Tile>
              <Port type={portData[8].type} position={"4"}></Port>
              <Tile  tile={'Placeholder'} num={"-1"}></Tile>
            </div>
          </div>
        </div>
    )
}