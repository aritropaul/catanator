import { useEffect, useState } from "react"
import { Tile } from "./tile"

interface TileType {
    type: string;
    num: number;
}


type MapProps = {mode: string, data: TileType[]}

export default function Map(props: MapProps) {
    
    const [row1, setRow1] = useState(props.data.slice(0,3))
    const [row2, setRow2] = useState(props.data.slice(3,7))
    const [row3, setRow3] = useState(props.data.slice(7,12))
    const [row4, setRow4] = useState(props.data.slice(12,18))
    const [row5, setRow5] = useState(props.data.slice(18,23))
    const [row6, setRow6] = useState(props.data.slice(23,27))
    const [row7, setRow7] = useState(props.data.slice(27,30))

    useEffect(() => {
        // The code here will run when the component mounts
        if (props.mode == 'catan') {
            setRow1(props.data.slice(0,3))
            setRow2(props.data.slice(3,7))
            setRow3(props.data.slice(7,12))
            setRow6(props.data.slice(12,16))
            setRow7(props.data.slice(16,19))
          }
          if (props.mode == 'expansion-catan') {
            setRow1(props.data.slice(0,3))
            setRow2(props.data.slice(3,7))
            setRow3(props.data.slice(7,12))
            setRow4(props.data.slice(12,18))
            setRow5(props.data.slice(18,23))
            setRow6(props.data.slice(23,27))
            setRow7(props.data.slice(27,30))
          }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // The empty array causes this effect to only run on mount
    


    return(
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
              props.mode == 'expansion-catan' && 
              <div className="flex-col justify-start items-start gap-1.5 inline-flex">
                {
                  row4.map((item, index) => {
                    return (<Tile key={index} tile={item.type} num={item.num}></Tile>)
                  })
                }
              </div>
            }
            {
              props.mode == 'expansion-catan' && 
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
    )
}