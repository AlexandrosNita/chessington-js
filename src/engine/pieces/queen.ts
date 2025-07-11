import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentPosition: Square = board.findPiece(this);
        let rookMoves: Square[] = this.getRookMoves(board, 'horizontal').concat(this.getRookMoves(board, 'vertical'));
        let bishopMoves: Square[] = this.getBishopMoves(board, 'main').concat(this.getBishopMoves(board, 'secondary'));
        return rookMoves.concat(bishopMoves);
    }
}
