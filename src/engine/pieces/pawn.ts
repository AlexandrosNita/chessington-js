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

        for (let i: number = 0; i < result.length; i += 1) {
            if (!this.inBounds(result[i])) {
                result = result.slice(0, i).concat(result.slice(i + 1));
                i -= 1;
            }
        }

        let diagonalLeft: Square;
        let diagonalRight: Square;

        if (this.player === Player.WHITE) {
            diagonalLeft = new Square(currentPosition.row + 1, currentPosition.col - 1);
            diagonalRight = new Square(currentPosition.row + 1, currentPosition.col + 1);
        } else {
            diagonalLeft = new Square(currentPosition.row - 1, currentPosition.col - 1);
            diagonalRight = new Square(currentPosition.row - 1, currentPosition.col + 1);
        }

        if (this.inBounds(diagonalLeft)) {
            const otherPiece = board.getPiece(diagonalLeft);
            if (otherPiece !== undefined && otherPiece.player !== this.player && Object.getPrototypeOf(otherPiece).constructor.name !== 'King') {
                result.push(diagonalLeft);
            }
        }
        if (this.inBounds(diagonalRight)) {
            const otherPiece = board.getPiece(diagonalRight);
            if (otherPiece !== undefined && otherPiece.player !== this.player && Object.getPrototypeOf(otherPiece).constructor.name !== 'King') {
                result.push(diagonalRight);
            }
        }

        return result;
    }
}
