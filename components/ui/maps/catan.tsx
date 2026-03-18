"use client";

import { Tile } from "../tile"
import Port from "../port";

interface TileType {
    type: string;
    num: number;
}

interface PortType {
  type: string;
}

type MapProps = {
  mode: string,
  data: TileType[],
  ports: PortType[],
  onTileClick?: (index: number) => void,
  selectedTile?: number | null
}

export default function Map(props: MapProps) {
    const mapData = props.data
    const portData = props.ports

    const row1 = mapData.slice(0,3)
    const row2 = mapData.slice(3,7)
    const row3 = mapData.slice(7,12)
    const row4 = mapData.slice(12,16)
    const row5 = mapData.slice(16,19)

    function tileClick(index: number) {
        if (props.onTileClick) props.onTileClick(index)
    }

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
                  return (<Tile key={index} tile={item.type} num={item.num.toString()} index={index} onClick={() => tileClick(index)} selected={props.selectedTile === index}></Tile>)
                })
              }
            <Port type={portData[2].type} position={"1"}></Port>
            </div>
            <div className="flex-col justify-start items-start gap-1.5 inline-flex">
            <Port type={portData[3].type} position={"3"}></Port>
              {
                row2.map((item, index) => {
                  return (<Tile key={index} tile={item.type} num={item.num.toString()} index={3 + index} onClick={() => tileClick(3 + index)} selected={props.selectedTile === 3 + index}></Tile>)
                })
              }
            <Tile  tile={'Placeholder'} num={"-1"}></Tile>
            </div>
            <div className="flex-col justify-start items-start gap-1.5 inline-flex">
            <Tile  tile={'Placeholder'} num={"-1"}></Tile>
              {
                row3.map((item, index) => {
                  return (<Tile key={index} tile={item.type} num={item.num.toString()} index={7 + index} onClick={() => tileClick(7 + index)} selected={props.selectedTile === 7 + index}></Tile>)
                })
              }
            <Port type={portData[4].type} position={"6"}></Port>
            </div>
            <div className="flex-col justify-start items-start gap-1.5 inline-flex">
              <Port type={portData[5].type} position={"3"}></Port>
              {
                row4.map((item, index) => {
                  return (<Tile key={index} tile={item.type} num={item.num.toString()} index={12 + index} onClick={() => tileClick(12 + index)} selected={props.selectedTile === 12 + index}></Tile>)
                })
              }
              <Tile  tile={'Placeholder'} num={"-1"}></Tile>
            </div>
            <div className="flex-col justify-start items-start gap-1.5 inline-flex">
              <Tile  tile={'Placeholder'} num={"-1"}></Tile>
              {
                row5.map((item, index) => {
                  return (<Tile key={index} tile={item.type} num={item.num.toString()} index={16 + index} onClick={() => tileClick(16 + index)} selected={props.selectedTile === 16 + index}></Tile>)
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
