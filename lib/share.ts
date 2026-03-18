interface Tile {
    type: string;
    num: number;
}

interface Port {
  type: string;
}

// --- Compact encoding (v2) ---

const TILE_TYPES = ['Forests', 'Hills', 'Mountains', 'Fields', 'Pasture', 'Gold'];
const TILE_NUMBERS = [2, 3, 4, 5, 6, 8, 9, 10, 11, 12];
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
// Indices 0-59: resource tiles (typeIndex * 10 + numIndex)
// Index 60: desert

const PORT_TYPES_LIST = ['3', 'H', 'W', 'B', 'S', 'O'];

const MODE_CONFIG: Record<string, { mode: string, tiles: number, ports: number }> = {
  'c': { mode: 'catan', tiles: 19, ports: 9 },
  'x': { mode: 'expansion-catan', tiles: 30, ports: 11 },
};

function encodeTile(tile: Tile): string {
  if (tile.type === 'Desert' || tile.num === -1) return CHARS[60];
  const typeIdx = TILE_TYPES.indexOf(tile.type);
  const numIdx = TILE_NUMBERS.indexOf(tile.num);
  if (typeIdx === -1 || numIdx === -1) return CHARS[60];
  return CHARS[typeIdx * 10 + numIdx];
}

function decodeTile(char: string): Tile {
  const idx = CHARS.indexOf(char);
  if (idx === -1 || idx >= 60) return { type: 'Desert', num: -1 };
  const typeIdx = Math.floor(idx / 10);
  const numIdx = idx % 10;
  return { type: TILE_TYPES[typeIdx], num: TILE_NUMBERS[numIdx] };
}

// --- Public API ---

export function shareCode(array: Tile[][], ports: Port[]): string {
  const flat = array.flat();
  const modeChar = flat.length <= 19 ? 'c' : 'x';
  let code = modeChar;
  for (const tile of flat) code += encodeTile(tile);
  for (const port of ports) code += String(PORT_TYPES_LIST.indexOf(port.type));
  return code;
}

export function rebuildFrom(code: string) {
  const cleaned = code.replaceAll('%3A', ':').replaceAll('%2C', ',');

  // Legacy format detection
  if (cleaned.includes(':')) {
    return rebuildFromLegacy(cleaned);
  }

  // Compact format: <mode char><tile chars><port chars>
  const config = MODE_CONFIG[code[0]];
  if (!config) throw new Error('Invalid board code');

  const tileChars = code.slice(1, 1 + config.tiles);
  const portChars = code.slice(1 + config.tiles, 1 + config.tiles + config.ports);

  const tiles = tileChars.split('').map(decodeTile);
  const ports = portChars.split('').map(ch => {
    const idx = parseInt(ch);
    return { type: PORT_TYPES_LIST[isNaN(idx) ? 0 : idx] };
  });

  const rows = flatToRows(tiles, config.mode);
  return { rows, ports };
}

// --- Legacy format support ---

function rebuildFromLegacy(code: string) {
  const charToType: { [key: string]: string } = {
    'F': 'Forests', 'D': 'Desert', 'E': 'Fields',
    'M': 'Mountains', 'P': 'Pasture', 'H': 'Hills', 'G': 'Gold'
  };

  const ports = code.split('::')[1].split(',').map(port => ({ type: port }));
  const rows = code.split('::')[0].split(':').map(row => {
    const tiles: Tile[] = [];
    let currentChar = '';
    for (let char of row) {
      if (isNaN(parseInt(char))) {
        if (currentChar.length > 0) {
          tiles[tiles.length - 1].num = parseInt(currentChar);
          currentChar = '';
        }
        tiles.push({ type: charToType[char] || 'Unknown', num: -1 });
      } else {
        currentChar += char;
      }
    }
    if (currentChar.length > 0) {
      tiles[tiles.length - 1].num = parseInt(currentChar);
    }
    return tiles.filter(tile => tile.type !== 'Unknown');
  });

  return { rows, ports };
}

// --- Helpers ---

export function flatToRows(data: Tile[], mode: string): Tile[][] {
  if (mode === 'catan') {
    return [data.slice(0,3), data.slice(3,7), data.slice(7,12), data.slice(12,16), data.slice(16,19)];
  } else if (mode === 'expansion-catan') {
    return [data.slice(0,3), data.slice(3,7), data.slice(7,12), data.slice(12,18), data.slice(18,23), data.slice(23,27), data.slice(27,30)];
  }
  return [data];
}
