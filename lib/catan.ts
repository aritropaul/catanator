
export interface GenerateOptions {
    noAdjacentSameResource?: boolean;
    balancedPips?: boolean;
    desertCenter?: boolean;
}

export const pipCounts: Record<number, number> = {
    2: 1, 3: 2, 4: 3, 5: 4, 6: 5,
    8: 5, 9: 4, 10: 3, 11: 2, 12: 1
};

const normalMap = {
    resources: ['Forests','Forests','Forests','Forests','Hills','Hills','Hills','Mountains','Mountains','Mountains','Fields','Fields','Fields','Fields','Pasture','Pasture','Pasture','Pasture'],
    desert: 'Desert',
    numbers: [2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12]
}

const expandedMap = {
    resources: ['Forests','Forests','Forests','Forests', 'Forests', 'Forests','Hills','Hills','Hills', 'Hills','Hills', 'Mountains','Mountains','Mountains', 'Mountains', 'Mountains', 'Fields','Fields','Fields','Fields','Fields','Fields', 'Pasture','Pasture','Pasture','Pasture', 'Pasture','Pasture'],
    desert: 'Desert',
    numbers: [2,2,3,3,3,4,4,4,5,5,5,6,6,6,8,8,8,9,9,9,10,10,10,11,11,11,12,12]
}

function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

function mergeShuffledArraysIntoObjectArray(keys: string[], values: any[]): { type: string; num: any }[] {
    if (keys.length !== values.length) {
      throw new Error("Arrays must have the same length.");
    }

    return keys.reduce<{ type: string; num: any }[]>((mergedArray, key, index) => {
      mergedArray.push({ type: key, num: values[index] });
      return mergedArray;
    }, []);
}

function getNeighbors(arr: any[][], i: number, j: number): [number, number][] {
    // Hex adjacency: same column (above/below) + adjacent columns (offset depends on row sizes)
    const neighbors: [number, number][] = [
        [i, j - 1],
        [i, j + 1],
    ];

    if (i > 0) {
        if (arr[i - 1].length < arr[i].length) {
            neighbors.push([i - 1, j - 1], [i - 1, j]);
        } else {
            neighbors.push([i - 1, j], [i - 1, j + 1]);
        }
    }

    if (i < arr.length - 1) {
        if (arr[i + 1].length > arr[i].length) {
            neighbors.push([i + 1, j], [i + 1, j + 1]);
        } else {
            neighbors.push([i + 1, j - 1], [i + 1, j]);
        }
    }

    return neighbors.filter(([ni, nj]) =>
        ni >= 0 && ni < arr.length && nj >= 0 && nj < arr[ni].length
    ) as [number, number][];
}

function hasNeighbouring6or8(arr: any[][]) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j].num === 6 || arr[i][j].num === 8) {
                for (const [ni, nj] of getNeighbors(arr, i, j)) {
                    if (arr[ni][nj].num === 6 || arr[ni][nj].num === 8) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function hasNeighbouringSameNumber(arr: { type: string; num: any }[][]) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j].num === -1) continue;
            for (const [ni, nj] of getNeighbors(arr, i, j)) {
                if (arr[ni][nj].num === arr[i][j].num) {
                    return true;
                }
            }
        }
    }
    return false;
}

function hasNeighbouringSameResource(arr: { type: string; num: any }[][]) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j].type === 'Desert') continue;
            for (const [ni, nj] of getNeighbors(arr, i, j)) {
                if (arr[ni][nj].type === arr[i][j].type) {
                    return true;
                }
            }
        }
    }
    return false;
}

function countSameNeighborViolations(arr: { type: string; num: any }[][]): number {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j].type === 'Desert') continue;
            for (const [ni, nj] of getNeighbors(arr, i, j)) {
                if (arr[ni][nj].type === arr[i][j].type && arr[ni][nj].type !== 'Desert') {
                    count++;
                }
            }
        }
    }
    return count / 2;
}

function assignResourceTypes(arr: { type: string; num: any }[][]): boolean {
    // Backtracking graph coloring: assigns resource types to positions
    // such that no two adjacent tiles share a type, preserving numbers in place.
    const positions: [number, number][] = [];
    const originalTypes: string[] = [];

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j].type !== 'Desert') {
                positions.push([i, j]);
                originalTypes.push(arr[i][j].type);
            }
        }
    }

    const remaining: Record<string, number> = {};
    for (const type of originalTypes) {
        remaining[type] = (remaining[type] || 0) + 1;
    }
    const types = Object.keys(remaining);

    // Clear all non-desert types for assignment
    for (const [i, j] of positions) {
        arr[i][j].type = '';
    }

    let calls = 0;
    const maxCalls = 500000;

    function backtrack(idx: number): boolean {
        if (++calls > maxCalls) return false;
        if (idx >= positions.length) return true;

        const [pi, pj] = positions[idx];
        const neighborTypes = new Set(
            getNeighbors(arr, pi, pj)
                .map(([ni, nj]) => arr[ni][nj].type)
                .filter(t => t !== '')
        );

        // Sort by most remaining first (avoids running out), with random tiebreak
        const sorted = [...types].sort((a, b) => {
            const diff = remaining[b] - remaining[a];
            return diff !== 0 ? diff : Math.random() - 0.5;
        });

        for (const type of sorted) {
            if (remaining[type] <= 0) continue;
            if (neighborTypes.has(type)) continue;

            arr[pi][pj].type = type;
            remaining[type]--;

            if (backtrack(idx + 1)) return true;

            arr[pi][pj].type = '';
            remaining[type]++;
        }

        return false;
    }

    // Try multiple attempts with different random orderings
    for (let attempt = 0; attempt < 10; attempt++) {
        calls = 0;
        // Reset remaining counts
        for (const type of types) remaining[type] = 0;
        for (const type of originalTypes) remaining[type]++;
        // Clear types
        for (const [i, j] of positions) arr[i][j].type = '';

        if (backtrack(0)) return true;
    }

    // Restore originals if all attempts failed
    for (let k = 0; k < positions.length; k++) {
        arr[positions[k][0]][positions[k][1]].type = originalTypes[k];
    }
    return false;
}

function isPipDistributionUnbalanced(arr: { type: string; num: any }[][]) {
    const resourcePips: Record<string, number[]> = {};
    for (const row of arr) {
        for (const tile of row) {
            if (tile.type === 'Desert' || tile.num === -1) continue;
            if (!resourcePips[tile.type]) resourcePips[tile.type] = [];
            resourcePips[tile.type].push(pipCounts[tile.num] || 0);
        }
    }
    const totals = Object.values(resourcePips).map(pips =>
        pips.reduce((a, b) => a + b, 0) / pips.length
    );
    if (totals.length === 0) return false;
    const mean = totals.reduce((a, b) => a + b, 0) / totals.length;
    const variance = totals.reduce((sum, p) => sum + (p - mean) ** 2, 0) / totals.length;
    return Math.sqrt(variance) > 0.8;
}

function genMap(mergedObjectArray:{ type: string; num: any }[], type: string) {
    var mapDictionary: { type: string; num: any; }[][] = []
    if (type == 'catan') {
        mapDictionary = [
            mergedObjectArray.slice(0,3),
            mergedObjectArray.slice(3,7),
            mergedObjectArray.slice(7,12),
            mergedObjectArray.slice(12,16),
            mergedObjectArray.slice(16,19)
        ]
    }
    else if (type == 'expansion-catan') {
        mapDictionary = [
            mergedObjectArray.slice(0,3),
            mergedObjectArray.slice(3,7),
            mergedObjectArray.slice(7,12),
            mergedObjectArray.slice(12,18),
            mergedObjectArray.slice(18,23),
            mergedObjectArray.slice(23,27),
            mergedObjectArray.slice(27,30)
        ]
    }
    return mapDictionary
}


export function generateMap(type: string, options: GenerateOptions = {}) {
    var res:string[] = []
    var nums:number[] = []
    var mapDictionary:{ type: string; num: any }[][] = []
    if (type == 'catan') {
        res = [...normalMap.resources]
        nums = [...normalMap.numbers]
    }
    else if (type == 'expansion-catan') {
        res = [...expandedMap.resources]
        nums = [...expandedMap.numbers]
    }
    shuffleArray(res)
    shuffleArray(nums)
    const mergedObjectArray = mergeShuffledArraysIntoObjectArray(res, nums);
    if (type == 'catan') {
        mergedObjectArray.push({type: normalMap.desert, num: -1})
    }
    else if (type == 'expansion-catan') {
        mergedObjectArray.push({type: expandedMap.desert, num: -1})
        mergedObjectArray.push({type: expandedMap.desert, num: -1})
    }

    let iterations = 0
    const maxIterations = 5000

    do {
        if (options.desertCenter) {
            const desertTiles = mergedObjectArray.filter(t => t.type === 'Desert')
            const otherTiles = mergedObjectArray.filter(t => t.type !== 'Desert')
            shuffleArray(otherTiles)

            const centerPositions = type === 'catan' ? [9] : [14, 15]
            let otherIdx = 0
            let desertIdx = 0
            for (let i = 0; i < mergedObjectArray.length; i++) {
                if (centerPositions.includes(i) && desertIdx < desertTiles.length) {
                    mergedObjectArray[i] = desertTiles[desertIdx++]
                } else {
                    mergedObjectArray[i] = otherTiles[otherIdx++]
                }
            }
        } else {
            shuffleArray(mergedObjectArray)
        }

        mapDictionary = genMap(mergedObjectArray, type)
        iterations++
        if (iterations >= maxIterations) break
    }
    while (
        (options.noAdjacentSameResource ? hasNeighbouringSameNumber(mapDictionary) : hasNeighbouring6or8(mapDictionary)) ||
        (options.balancedPips && isPipDistributionUnbalanced(mapDictionary))
    )

    // Assign resource types via backtracking graph coloring (preserves numbers in place)
    if (options.noAdjacentSameResource) {
        assignResourceTypes(mapDictionary)
    }

    return mapDictionary
}

export function generatePorts(type: string): {type: string}[] {
    if (type == 'catan') {
        let ports = [{type: '3'}, {type: '3'}, {type: '3'}, {type: '3'}, {type: 'H'}, {type: 'W'}, {type: 'B'}, {type: 'S'}, {type: 'O'}]
        shuffleArray(ports)
        return ports
    }
    else if (type == 'expansion-catan') {
        let ports = ([{type: '3'}, {type: '3'}, {type: '3'}, {type: '3'}, {type: '3'}, {type: '3'}, {type: 'H'}, {type: 'W'}, {type: 'B'}, {type: 'S'}, {type: 'O'}])
        shuffleArray(ports)
        return ports
    }
    return [{type: '3'}, {type: '3'}, {type: '3'}, {type: '3'}, {type: 'H'}, {type: 'W'}, {type: 'B'}, {type: 'S'}, {type: 'O'}]
}
