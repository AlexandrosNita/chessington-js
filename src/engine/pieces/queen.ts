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
        let rookMoves: Square[] = this.getRookMoves(currentPosition, 'horizontal').concat(this.getRookMoves(currentPosition, 'vertical'));
        let bishopMoves: Square[] = this.getBishopMoves(currentPosition, 'main').concat(this.getBishopMoves(currentPosition, 'secondary'));
        return rookMoves.concat(bishopMoves);
    }
}
