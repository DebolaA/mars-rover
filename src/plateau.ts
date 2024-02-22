import { Cardinal, Plateau, Position, Rover } from './mars-rover.dt'

export function isPositionVacant(
    cordinates: Position,
    plateau: Plateau,
): boolean {
    if (!plateau.roverList.length) return true
    let index = plateau.roverList.findIndex((rover) =>
        compareCoordinates(cordinates, rover.position),
    )

    return !(index > -1)
}

export function isPositionValid(
    cordinates: Position,
    plateau: Plateau,
): boolean {
    return !(
        cordinates.xPos > plateau.size.xPos ||
        cordinates.xPos < 0 ||
        cordinates.yPos > plateau.size.yPos ||
        cordinates.yPos < 0
    )
}

export function updateRoverList(
    rover: Rover,
    res: string,
    plateau: Plateau,
): Plateau {
    const positionArr = res.split('')
    const index = plateau.roverList.findIndex((x) => x.name === rover.name)
    plateau.roverList[index].direction = positionArr[2] as Cardinal
    plateau.roverList[index].position.xPos = parseInt(positionArr[0])
    plateau.roverList[index].position.yPos = parseInt(positionArr[1])
    return plateau
}

export function compareCoordinates(cord1: Position, cord2: Position): boolean {
    return cord1.xPos === cord2.xPos && cord1.yPos === cord2.yPos
}
