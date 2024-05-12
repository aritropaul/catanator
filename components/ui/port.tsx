/* eslint-disable @next/next/no-img-element */

type PortProps = {
    type: string
    position: '1' | '2' | '3' | '4' | '5' | '6';
}

export const basePorts = ['W', 'B', 'S', 'O', 'H', '3', '3', '3', '3']
export const expansionPorts = ['W', 'B', 'S', 'O', 'H', '3', '3', '3', '3', '3', '3']

export default function Port({type, position }: PortProps) {
    const rotationStyles = {
      1: "rotate-[0deg]",
      2: "rotate-[60deg]",
      3: "rotate-[120deg]",
      4: "rotate-[180deg]",
      5: "rotate-[240deg]",
      6: "rotate-[300deg]",
    };
  
    return (
      <div className={`relative `}>
        <img className={`${rotationStyles[position]} md:w-[112px] md:h-[99px] w-[64.6px] h-[56.8px]`} src={"/Port.png"} alt="placeholder"/>
        <p className={`absolute md:top-[33.2px] md:left-[40px] md:w-[32px] md:h-[32px] top-[18.4px] left-[22.25px] w-[20px] h-[20px] md:leading-[32px] text-center font-medium md:text-lg text-xs bg-white rounded-full`}>{type}</p>
      </div>
    );
  }