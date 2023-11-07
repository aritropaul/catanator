
type PortProps = {
    isShown: boolean;
    position: 'top' | 'topRight' | 'bottomRight' | 'bottom' | 'bottomLeft' | 'topLeft';
}


export default function Port({ isShown, position }: PortProps) {
    const baseStyle = "w-20 h-20 bg-black"; // Tailwind class for size and color
    const rotationStyles = {
      top: "rotate-0",
      topRight: "rotate-60",
      bottomRight: "rotate-120",
      bottom: "rotate-180",
      bottomLeft: "-rotate-120",
      topLeft: "-rotate-60",
    };
  
    return (
      <div
        className={`${baseStyle} ${isShown ? 'visible' : 'invisible'} 
          transform ${rotationStyles[position]}`}
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
      />
    );
  }