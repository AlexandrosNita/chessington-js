import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentPosition: Square = board.findPiece(this);
        return this.getDiagonalMoves(currentPosition, 'main').concat(this.getDiagonalMoves(currentPosition, 'secondary'));
    }

    private getDiagonalMoves(currentPosition: Square, direction: string): Square[] {
        if (direction !== 'main' && direction !== 'secondary') {
            throw new Error('Unexpected diagonal.');
        }

        let row: number = currentPosition.row - 1;
        let col: number = currentPosition.col + (direction === 'main' ? -1 : 1);

        let result: Square[] = [] as Square[];
        while (this.inBounds(new Square(row, col))) {
            result.push(new Square(row, col));

            row -= 1;
            col += (direction === 'main' ? -1 : 1);
        }

        row = currentPosition.row + 1;
        col = currentPosition.col + (direction === 'main' ? 1 : -1);
        while (this.inBounds(new Square(row, col))) {
            result.push(new Square(row, col));

            row += 1;
            col += (direction === 'main' ? 1 : -1);
        }

        return result;
    }
}
