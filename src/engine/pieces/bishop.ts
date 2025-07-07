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
        return this.getBishopMoves(currentPosition, 'main').concat(this.getBishopMoves(currentPosition, 'secondary'));
    }
}
