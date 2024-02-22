import { rightDirection, leftDirection } from './mars-rover.dt'
import { Plateau, Cardinal, Position } from './mars-rover.dt'
import { Rover } from './mars-rover.dt'
import { isPositionVacant, isPositionValid } from './plateau'

export function addRover(
    roverName: string,
    surface: Plateau,
    position: string,
): Rover {
    const regex = /^[0123456789NSWE ]+$/
    if (!position || !regex.test(position))
        throw new Error('Please provide valid position argument')

    const positionArr = position.split(' ')
    const cords = {
        xPos: parseInt(positionArr[0]),
        yPos: parseInt(positionArr[1]),
    }

    let rover: Rover

    const isVacant = isPositionVacant(cords, surface)
    if (!isVacant)
        throw new Error('Unable to create Rover - Rover coordinates not vacant')

    const cordValid = isPositionValid(cords, surface)
    if (!cordValid)
        throw new Error('Unable to create Rover - Invalid coordinates')

    if (isVacant && cordValid) {
        rover = {
            name: roverName,
            plateau: surface,
            position: cords,
            direction: positionArr[2] as Cardinal,
        }
    } else {
        throw new Error('Cannot create Rover')
    }
    return rover
}

export function executeInstruction(instruction: string, rover: Rover): string {
    let direction: Cardinal = rover.direction
    let pos: Position = rover.position
    let plateau: Plateau = Object.assign(rover.plateau)

    //check string is not empty
    if (!instruction || !instruction.length)
        throw new Error('Rover Instruction cannot be am empty string')

    //check insturction has valid characters
    const regex = /^[LRM]+$/
    if (!regex.test(instruction))
        throw new Error('Instruction has invalid character')

    //execute instruction
    const roverInstruction = instruction.split('')
    for (let char of roverInstruction) {
        switch (char) {
            case 'L':
                direction = turnLeft(direction)
                break
            case 'R':
                direction = turnRight(direction)
                break
            case 'M':
                const index = plateau.roverList.findIndex(
                    (x) => x.name === rover.name,
                )
                if (index > -1) plateau.roverList[index].position = pos
                pos = moveRover(direction, pos)
                if (!isPositionVacant(pos, plateau))
                    throw new Error(
                        'Collision Alert!, rover cannot move to new position',
                    )
                if (!isPositionValid(pos, plateau))
                    throw new Error(
                        `Invalid position coordinates - ${pos.xPos}, ${pos.yPos}`,
                    )
                break
            default:
                throw new Error('Instruction not valid')
        }
    }

    return `${pos.xPos} ${pos.yPos} ${direction}`
}

function turnRight(direction: Cardinal): Cardinal {
    return rightDirection[direction] as Cardinal
}

function turnLeft(direction: Cardinal): Cardinal {
    return leftDirection[direction] as Cardinal
}

function moveRover(direction: Cardinal, position: Position): Position {
    let newPos: Position
    if (direction === 'N') {
        newPos = { xPos: position.xPos, yPos: position.yPos + 1 }
    } else if (direction === 'S')
        newPos = { xPos: position.xPos, yPos: position.yPos - 1 }
    else if (direction === 'W')
        newPos = { xPos: position.xPos - 1, yPos: position.yPos }
    else if (direction === 'E')
        newPos = { xPos: position.xPos + 1, yPos: position.yPos }
    else newPos = position
    return newPos
}
