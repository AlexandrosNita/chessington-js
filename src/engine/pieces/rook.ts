import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import GameSettings from '../gameSettings';

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentPosition: Square = board.findPiece(this);
        return this.getMovesPerDirection(currentPosition, 'horizontal').concat(this.getMovesPerDirection(currentPosition, 'vertical'));
    }

    private getMovesPerDirection(currentPosition: Square, direction: string): Square[] {
        if (direction !== 'horizontal' && direction !== 'vertical') {
            throw new Error('Unexpected direction.');
        }

        const constantDirection = (direction === 'horizontal') ? currentPosition.row : currentPosition.col;
        const otherCoordinate = (direction === 'horizontal') ? currentPosition.col : currentPosition.row;

        let result: Square[] = [] as Square[];
        for (let i: number = 0; i < GameSettings.BOARD_SIZE; i += 1) {
            if (i === otherCoordinate) {
                continue;
            }

            const newSquare: Square = (direction === 'horizontal') ? new Square(constantDirection, i) : new Square(i, constantDirection);
            result.push(newSquare);
        }

        return result;
    }
}
