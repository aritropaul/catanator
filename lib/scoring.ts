interface Tile {
  type: string;
  num: number;
}

const pipCounts: Record<number, number> = {
  2: 1, 3: 2, 4: 3, 5: 4, 6: 5,
  8: 5, 9: 4, 10: 3, 11: 2, 12: 1
};

export function calculateFairness(tiles: Tile[]): number {
  const resourcePips: Record<string, number> = {};
  const resourceCounts: Record<string, number> = {};

  for (const tile of tiles) {
    if (tile.type === 'Desert' || tile.num === -1) continue;
    if (!resourcePips[tile.type]) {
      resourcePips[tile.type] = 0;
      resourceCounts[tile.type] = 0;
    }
    resourcePips[tile.type] += pipCounts[tile.num] || 0;
    resourceCounts[tile.type]++;
  }

  const normalized = Object.keys(resourcePips).map(r => resourcePips[r] / resourceCounts[r]);
  if (normalized.length === 0) return 10;

  const mean = normalized.reduce((a, b) => a + b, 0) / normalized.length;
  const variance = normalized.reduce((sum, p) => sum + (p - mean) ** 2, 0) / normalized.length;
  const stdDev = Math.sqrt(variance);

  const score = Math.max(0, Math.min(10, 10 - stdDev * 2.5));
  return Math.round(score * 10) / 10;
}
