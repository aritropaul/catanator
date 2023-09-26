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
  

export function generateMap(type: Boolean) {
    console.log(type)
    var mapDictionary = []
    var res:string[] = []
    var nums:number[] = []
    if (type == true) {
        res = normalMap.resources
        nums = normalMap.numbers
    }
    else {
        res = expandedMap.resources
        nums = expandedMap.numbers
    }
    shuffleArray(res)
    shuffleArray(nums)
    const mergedObjectArray = mergeShuffledArraysIntoObjectArray(res, nums);
    if (type == true) {
        mergedObjectArray.push({type: normalMap.desert, num: -1})
    }
    else {
        mergedObjectArray.push({type: expandedMap.desert, num: -1})
        mergedObjectArray.push({type: expandedMap.desert, num: -1})
    }
    shuffleArray(mergedObjectArray)
    console.log(mergedObjectArray);
    if (type == true) {
        mapDictionary = [mergedObjectArray.slice(0,3),mergedObjectArray.slice(3,7),mergedObjectArray.slice(7,12), mergedObjectArray.slice(12,16),mergedObjectArray.slice(16,19)]
    }
    else {
        mapDictionary = [mergedObjectArray.slice(0,3),mergedObjectArray.slice(3,7),mergedObjectArray.slice(7,12),mergedObjectArray.slice(12,18),mergedObjectArray.slice(18,23), mergedObjectArray.slice(23,27), mergedObjectArray.slice(27,30)]
    }
    console.log(mapDictionary)
    return mapDictionary
}