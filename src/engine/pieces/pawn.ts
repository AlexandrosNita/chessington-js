import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board): Square[] {
        const currentPosition = board.findPiece(this);
        return this.getAvailableMovesPerPlayer(currentPosition, board);
    }

    private getAvailableMovesPerPlayer(currentPosition: Square, board: Board): Square[] {
        let result: Square[];
        const startRow = (this.player === Player.WHITE ? 1 : 6);
        const offset = (this.player === Player.WHITE ? 1 : -1);

        if (currentPosition.row == startRow) {
            result = [
                new Square(currentPosition.row + offset, currentPosition.col),
                new Square(currentPosition.row + (Math.abs(offset) + 1) * Math.sign(offset), currentPosition.col)
            ];
        } else {
            result = [new Square(currentPosition.row + offset, currentPosition.col)];
        }

        result = this.deleteOccupiedSquares(result, board);

        if (result.length == 1 && Math.abs(result[0].row - currentPosition.row) == 2) {
            result = [];
        }

        return result;
    }
}
