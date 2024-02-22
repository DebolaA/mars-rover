import { Plateau, Position, Rover } from './mars-rover.dt'
import { addRover, executeInstruction } from './rover'

describe('addRover', () => {
    it('should throw an error because position arg are not valid', () => {
        const roverName = 'Rover1'
        const position = '12Y'
        const plateauSize: Position = { xPos: 5, yPos: 5 }
        const plateau: Plateau = { size: plateauSize, roverList: [] }
        const result = 'Please provide valid position argument'

        expect(() => addRover(roverName, plateau, position)).toThrow(result)
    })

    it('should throw an error because coordinates are not valid', () => {
        const roverName = 'Rover1'
        const position = '65N'
        const plateauSize: Position = { xPos: 5, yPos: 5 }
        const plateau: Plateau = { size: plateauSize, roverList: [] }
        const result = 'Unable to create Rover - Invalid coordinates'

        expect(() => addRover(roverName, plateau, position)).toThrow(result)
    })

    it('should throw an error because coordinates are not vacant', () => {
        const roverName = 'Rover1'
        const position = '12N'
        const plateauSize: Position = { xPos: 5, yPos: 5 }
        let plateau: Plateau = { size: plateauSize, roverList: [] }
        const rover1: Rover = {
            name: roverName,
            plateau: plateau,
            position: {
                xPos: 1,
                yPos: 2,
            },
            direction: 'N',
        }
        plateau = { size: plateauSize, roverList: [...[], rover1] }

        const result = 'Unable to create Rover - Rover coordinates not vacant'

        expect(() => addRover(roverName, plateau, position)).toThrow(result)
    })

    it('returns a rover object', () => {
        const roverName = 'Rover1'
        const position = '12N'
        const plateauSize: Position = { xPos: 5, yPos: 5 }
        const plateau: Plateau = { size: plateauSize, roverList: [] }
        const result = {
            name: roverName,
            plateau: plateau,
            position: {
                xPos: 1,
                yPos: 2,
            },
            direction: 'N',
        }
        expect(addRover(roverName, plateau, position)).toStrictEqual(result)
    })
})

describe('executeInstruction', () => {
    it('should throw an error because position arg are not valid', () => {
        const instruction = ''
        const position = '12N'
        const plateauSize: Position = { xPos: 5, yPos: 5 }
        const plateau: Plateau = { size: plateauSize, roverList: [] }
        const rover = addRover('rover1', plateau, position)
        const result = 'Rover Instruction cannot be am empty string'

        expect(() => executeInstruction(instruction, rover)).toThrow(result)
    })

    it('should throw error Rover Instruction cannot be an empty string', () => {
        const instruction = 'LMLMLMLMMYH'
        const position = '12N'
        const plateauSize: Position = { xPos: 5, yPos: 5 }
        const plateau: Plateau = { size: plateauSize, roverList: [] }
        const rover = addRover('rover1', plateau, position)
        const result = 'Instruction has invalid character'

        expect(() => executeInstruction(instruction, rover)).toThrow(result)
    })

    it('should throw error Instruction has invalid character', () => {
        const instruction = 'LMLMLMLMM'
        const position = '12N'
        const plateauSize: Position = { xPos: 5, yPos: 5 }
        const plateau: Plateau = { size: plateauSize, roverList: [] }
        const rover = addRover('rover1', plateau, position)
        const result = '13N'

        expect(executeInstruction(instruction, rover)).toBe(result)
    })

    it('returns a string which is the position of the rover', () => {
        const instruction = 'MMRMMRMRRM'
        const position = '33E'
        const plateauSize: Position = { xPos: 5, yPos: 5 }
        const plateau: Plateau = { size: plateauSize, roverList: [] }
        const rover = addRover('rover1', plateau, position)
        const result = '51E'
        expect(executeInstruction(instruction, rover)).toBe(result)
    })

    it('returns a string which is the position of the rover', () => {
        const instruction = 'MMRMMRMRRM'
        const position = '22E'
        const plateauSize: Position = { xPos: 5, yPos: 5 }
        const plateau: Plateau = { size: plateauSize, roverList: [] }
        const rover = addRover('rover1', plateau, position)
        const result = '40E'
        expect(executeInstruction(instruction, rover)).toBe(result)
    })
})
