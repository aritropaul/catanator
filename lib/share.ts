interface Tile {
    type: string;
    num: number;
}

interface Tile {
  type: string;
  num: number;
}

interface Port {
  type: string;
}

export function shareCode(array: Tile[][], ports: Port[]): string {
  const typeMap: { [key: string]: string } = {
    'Forests': 'F',
    'Desert': 'D',
    'Fields': 'E',
    'Mountains': 'M',
    'Hills': 'H',
    'Pasture': 'P',
    'Gold': 'G'
  };

  let fen = ``; // Start with map type

  // Process tiles and build FEN
  for (const row of array) {
    for (const tile of row) {
      const tileChar = typeMap[tile.type] || '?';
      const tileNum = tile.num === -1 ? 'X' : tile.num.toString();
      fen += `${tileChar}${tileNum}`;
    }
    fen += ':'; // Delimiter for rows
  }

  // Add ports at the end
  fen += ':';
  fen += ports.map((port) => {return port.type}).join(',');
  console.log(fen)
  return fen;
}

export function rebuildFrom(code: String) {
    const charToType: { [key: string]: string } = {
        'F': 'Forests',
        'D': 'Desert',
        'E': 'Fields',
        'M': 'Mountains',
        'P': 'Pasture',
        'H': 'Hills',
        'G': 'Gold'
      };
    
      // Split the FEN string into rows
    let codeClean = code.replaceAll("%3A", ':').replaceAll("%2C", ',')
    const ports = codeClean.split('::')[1].split(',').map((port) => {return {type:port}})
    console.log(ports)
    const rows = codeClean.split('::')[0].split(':').map(row => {
        const tiles: Tile[] = [];
        let currentChar = '';
        for (let char of row) {
            if (isNaN(parseInt(char))) {
            // When a non-numeric character is encountered, process the previous numeric characters
            if (currentChar.length > 0) {
                tiles[tiles.length - 1].num = parseInt(currentChar);
                currentChar = '';
            }
            // Start a new tile with the type from the character
            tiles.push({ type: charToType[char] || 'Unknown', num: -1 });
            } else {
            // Accumulate numeric characters into a string
            currentChar += char;
            }
        }
        // Process the last number in the row
        if (currentChar.length > 0) {
            tiles[tiles.length - 1].num = parseInt(currentChar);
        }
        return tiles.filter((tile) => {return (tile.type != 'Unknown')})
    });

    return {rows, ports}
}