const numbers = [2,3,4,5,6,7,8,9,10,11,12]
const probs = [1/36, 1/18, 1/12, 1/9, 5/36, 1/6, 5/36, 1/9, 1/12, 1/18, 1/36]
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
    pool.splice(randomIndex, 1);
    return {randomRoll , pool}
}

function dieRolls(times: number) {
    generatePool()
    // console.log()
}

export  { generatePool, diceRoll, dieRolls }