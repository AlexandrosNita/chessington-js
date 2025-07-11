import Piece from './piece';
import Player from '../player';
import Board from '../board';

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        return this.getRookMoves(board, 'horizontal').concat(this.getRookMoves(board, 'vertical'));
    }
}
