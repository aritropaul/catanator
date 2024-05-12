
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

const seafarersMap = {
    resources: ['Forests','Forests','Forests','Forests','Hills','Hills','Hills','Mountains','Mountains','Mountains','Fields','Fields','Fields','Fields','Pasture','Pasture','Pasture','Pasture'],
    desert: 'Desert',
    numbers: [2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12]
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
  
function hasNeighbouring6or8(arr: any[]) {
    let offsets = [[-1, -1], [-1, 0], [0, -1], [0, 1], [1, -1], [1, 0]];

    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr[i].length; j++) {
            if(arr[i][j].num === 6 || arr[i][j].num === 8) {
                for(let k = 0; k < offsets.length; k++) {
                    let ni = i + offsets[k][0];
                    let nj = j + offsets[k][1];
                    if(ni >= 0 && ni < arr.length && nj >= 0 && nj < arr[ni].length) {
                        if(arr[ni][nj].num === 6 || arr[ni][nj].num === 8) {
                            // console.log(`Element ${arr[i][j]} at (${i}, ${j}) has a neighboring 6 or 8 at (${ni}, ${nj}).`);
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
}

function genMap(mergedObjectArray:{ type: string; num: any }[],type: String) {
    shuffleArray(mergedObjectArray)
    let mapData = mergedObjectArray
    var mapDictionary: { type: string; num: any; }[][] = []
    if (type == 'catan') {
        mapDictionary = [mapData.slice(0,3),mapData.slice(3,7),mapData.slice(7,12), mapData.slice(12,16),mapData.slice(16,19)]
        
    }
    else if (type == 'expansion-catan') {
        mapDictionary = [mapData.slice(0,3),mapData.slice(3,7),mapData.slice(7,12),mapData.slice(12,18),mapData.slice(18,23), mergedObjectArray.slice(23,27), mergedObjectArray.slice(27,30)]
    }
    return mapDictionary
}
   

export function generateMap(type: String) {
    // console.log(type)
    var res:string[] = []
    var nums:number[] = []
    var mapDictionary:{ type: string; num: any }[][] = []
    if (type == 'catan') {
        res = normalMap.resources
        nums = normalMap.numbers
    }
    else if (type == 'expansion-catan') {
        res = expandedMap.resources
        nums = expandedMap.numbers
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

    console.log(mergedObjectArray);
    do {
        shuffleArray(mergedObjectArray)
        mapDictionary = genMap(mergedObjectArray, type)
    }
    while (hasNeighbouring6or8(mapDictionary) == true)
    console.log(mapDictionary)
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