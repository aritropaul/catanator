const numbers = [2,3,4,5,6,7,8,9,10,11,12]
const probs = [1/36, 1/18, 1/12, 1/9, 5/36, 1/6, 5/36, 1/9, 1/12, 1/18, 1/36]
const ways = [
    ['1,1'],
    ['1,2', '2,1'],
    ['1,3', '3,1', '2,2'],
    ['1,4', '2,3', '3,2', '4,1'],
    ['1,5', '2,4', '3,3', '4,2', '5,1'],
    ['1,6', '2,5', '3,4', '4,3', '5,2', '6,1'],
    ['2,6', '3,5', '4,4', '5,3', '6,2'],
    ['3,6', '4,5', '5,4', '6,3'],
    ['4,6', '5,5', '6,4'],
    ['5,6', '6,5'],
    ['6,6'],
]
const totalItems = 150

function generatePool() {
    let pool: number[] = []
    for (let i=0;i<11;i++) {
        let numberOfItems = Math.ceil(totalItems*probs[i])
        for (let j=0;j<numberOfItems;j++) {
            pool.push(numbers[i])
        }
    }
    return pool
}

function diceRoll(pool: number[]) {
    let randomIndex = Math.floor(Math.random() * pool.length)
    let randomRoll = pool[randomIndex];
    let way = ways[randomRoll-2]
    let randomWay = way[Math.floor(Math.random() * way.length)]
    pool.splice(randomIndex, 1);
    return {randomRoll , pool, randomWay}
}

function dieRolls(times: number) {
    generatePool()
    // console.log()
}

export  { generatePool, diceRoll, dieRolls }