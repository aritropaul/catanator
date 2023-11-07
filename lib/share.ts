interface Tile {
    type: string;
    num: number;
  }

export function shareCode(mapDictionary: Tile[][]) {
    const typeToChar: { [key: string]: string } = {
        Forests: 'f',
        Desert: 'd',
        Fields: 'e', // 'f' is already used by Forests
        Mountains: 'm',
        Pasture: 'p',
        Hills: 'h'
      };
    
      return mapDictionary.map(row =>
        row.map(tile =>
          `${typeToChar[tile.type] || '?'}${tile.num >= 0 ? tile.num : 'x'}`
        ).join('')
      ).join(':');
}

export function rebuildFrom(code: String) {
    const charToType: { [key: string]: string } = {
        'f': 'Forests',
        'd': 'Desert',
        'e': 'Fields',
        'm': 'Mountains',
        'p': 'Pasture',
        'h': 'Hills'
      };
    
      // Split the FEN string into rows
    const rows = code.split(':');
      
    return rows.map(row => {
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
}