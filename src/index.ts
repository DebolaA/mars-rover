import { Plateau, Position } from './mars-rover.dt'
import { updateRoverList } from './plateau'
import { addRover, executeInstruction } from './rover'

console.log('Welcome to Mars Rover Planet')

let plateauSize: Position = { xPos: 5, yPos: 5 }

let plateau: Plateau = { size: plateauSize, roverList: [] }

const rover1 = addRover('Rover1', plateau, '1 2 N')
plateau.roverList.push(rover1)
const rover1result = executeInstruction('LMLMLMLMM', rover1)
plateau = updateRoverList(rover1, rover1result, plateau)

console.log(
    `Final position is for starting point 12N and instruction LMLMLMLMM is ${executeInstruction(
        'LMLMLMLMM',
        rover1,
    )}`,
)

const rover2 = addRover('Rover2', plateau, '3 3 E')
plateau.roverList.push(rover2)
const rover2result = executeInstruction('MMRMMRMRRM', rover2)
plateau = updateRoverList(rover2, rover2result, plateau)

console.log(
    `Final position is for starting point 33E and instruction MMRMMRMRRM is ${rover2result}`,
)

const rover3 = addRover('Rover3', plateau, '2 2 E')
plateau.roverList.push(rover3)
const rover3result = executeInstruction('MMRMMRMRRM', rover3)
plateau = updateRoverList(rover3, rover3result, plateau)

console.log(
    `Final position is for starting point 22E and instruction MMRMMRMRRM is ${rover3result}`,
)
