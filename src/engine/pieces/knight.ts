import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Knight extends Piece {
    static rowChanges: number[] = [1, 2, 1, 2, -1, -2, -1, -2];
    static colChanges: number[] = [-2, -1, 2, 1, -2, -1, 2, 1];

    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentPosition: Square = board.findPiece(this);
        let result: Square[] = [] as Square[];
        for (let i: number = 0; i < Knight.rowChanges.length; i += 1) {
            const newSquare: Square = new Square(currentPosition.row + Knight.rowChanges[i], currentPosition.col + Knight.colChanges[i]);

            if (!this.inBounds(newSquare)) {
                continue;
            }

            if (board.getPiece(newSquare) !== undefined) {
                const otherPiece: Piece | undefined = board.getPiece(newSquare);
                if (otherPiece !== undefined && otherPiece.player !== this.player && Object.getPrototypeOf(otherPiece).constructor.name !== 'King') {
                    result.push(newSquare);
                }
            } else {
                result.push(newSquare);
            }
        }
        return result;
    }
}
