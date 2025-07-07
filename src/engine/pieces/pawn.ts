import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Pawn extends Piece {
    public hasFirstMove: boolean = true;

    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board): Square[] {
        const currentPosition = board.findPiece(this);
        const availableOffsets = this.choosePossibleOffsets();
        const result: Square[] = [];
        for (let num of availableOffsets) {
            result.push(new Square(currentPosition.row + num, currentPosition.col));
        }
        return result;
    }

    private choosePossibleOffsets(): number[] {
        if (this.hasFirstMove) {
            return (this.player === Player.WHITE ? [1, 2] : [-1, -2]);
        }
        return (this.player === Player.WHITE ? [1] : [-1]);
    }
}
