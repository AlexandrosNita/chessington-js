import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class King extends Piece {
    static rowChanges: number[] = [1, 1, 1, 0, -1, -1, -1, 0];
    static colChanges: number[] = [-1, 0, 1, 1, 1, 0, -1, -1];

    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentPosition: Square = board.findPiece(this);
        let result: Square[] = [] as Square[];
        for (let i: number = 0; i < King.rowChanges.length; i += 1) {
            const newSquare: Square = new Square(currentPosition.row + King.rowChanges[i], currentPosition.col + King.colChanges[i]);
            result.push(newSquare);
        }
        return result;
    }
}
