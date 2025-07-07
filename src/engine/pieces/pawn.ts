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
        if (this.player === Player.WHITE) {
            return this.getAvailableMovesWhite(currentPosition);
        }
        return this.getAvailableMovesBlack(currentPosition);
    }

    private getAvailableMovesWhite(currentPosition: Square): Square[] {
        if (currentPosition.row === 1) {
            return [
                new Square(currentPosition.row + 1, currentPosition.col),
                new Square(currentPosition.row + 2, currentPosition.col)
            ]
        }
        return [new Square(currentPosition.row + 1, currentPosition.col)];
    }

    private getAvailableMovesBlack(currentPosition: Square): Square[] {
        if (currentPosition.row === 6) {
            return [
                new Square(currentPosition.row - 1, currentPosition.col),
                new Square(currentPosition.row - 2, currentPosition.col)
            ]
        }
        return [new Square(currentPosition.row - 1, currentPosition.col)];
    }
}
