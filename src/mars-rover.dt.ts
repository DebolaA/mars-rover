export type RoverInstruction = 'L' | 'R' | 'M'

export type Cardinal = 'N' | 'S' | 'W' | 'E'

export type Position = { xPos: number; yPos: number }

export type Plateau = { size: Position; roverList: Array<Rover> }

export type Rover = {
    position: Position
    direction: Cardinal
    plateau: Plateau
    name: string
}

export const rightDirection = {
    N: 'E',
    S: 'W',
    W: 'N',
    E: 'S',
}

export const leftDirection = {
    N: 'W',
    S: 'E',
    W: 'S',
    E: 'N',
}
