import Player from '../player';
import Board from '../board';
import Square from '../square';
import GameSettings from '../gameSettings';

export default class Piece {
    public player: Player;

    public constructor(player: Player = Player.WHITE) {
        this.player = player;
    }

    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    protected inBounds(position: Square) {
        return (position.row >= 0 && position.row < GameSettings.BOARD_SIZE &&
                position.col >= 0 && position.col < GameSettings.BOARD_SIZE);
    }

    protected getRookMoves(currentPosition: Square, direction: string): Square[] {
        if (direction !== 'horizontal' && direction !== 'vertical') {
            throw new Error('Unexpected direction.');
        }

        const constantDirection = (direction === 'horizontal') ? currentPosition.row : currentPosition.col;
        const otherCoordinate = (direction === 'horizontal') ? currentPosition.col : currentPosition.row;

        let result: Square[] = [] as Square[];
        for (let i: number = 0; i < GameSettings.BOARD_SIZE; i += 1) {
            if (i === otherCoordinate) {
                continue;
            }

            const newSquare: Square = (direction === 'horizontal') ? new Square(constantDirection, i) : new Square(i, constantDirection);
            result.push(newSquare);
        }

        return result;
    }

    protected cleanUpRookMoves(board: Board) {
        const currentPosition: Square = board.findPiece(this);
        let horizontalPositions: Square[] = this.getRookMoves(currentPosition, 'horizontal');
        let verticalPositions: Square[] = this.getRookMoves(currentPosition, 'vertical');

        let firstLeftOccupiedPosition: number = currentPosition.col - 1;
        while (firstLeftOccupiedPosition >= 0 && board.getPiece(new Square(currentPosition.row, firstLeftOccupiedPosition)) === undefined) {
            firstLeftOccupiedPosition -= 1;
        }
        let firstRightOccupiedPosition: number = currentPosition.col + 1;
        while (firstRightOccupiedPosition < GameSettings.BOARD_SIZE && board.getPiece(new Square(currentPosition.row, firstRightOccupiedPosition)) === undefined) {
            firstRightOccupiedPosition += 1;
        }

        horizontalPositions = horizontalPositions.slice(firstLeftOccupiedPosition + 1, firstRightOccupiedPosition);

        let firstUpOccupiedPosition: number = currentPosition.row + 1;
        while (firstUpOccupiedPosition < GameSettings.BOARD_SIZE && board.getPiece(new Square(firstUpOccupiedPosition, currentPosition.col)) === undefined) {
            firstUpOccupiedPosition += 1;
        }
        let firstDownOccupiedPosition: number = currentPosition.row - 1;
        while (firstDownOccupiedPosition >= 0 && board.getPiece(new Square(firstDownOccupiedPosition, currentPosition.col)) === undefined) {
            firstDownOccupiedPosition -= 1;
        }

        verticalPositions = verticalPositions.slice(firstDownOccupiedPosition + 1, firstUpOccupiedPosition);

        return horizontalPositions.concat(verticalPositions);
    }

    protected getBishopMoves(currentPosition: Square, direction: string): Square[] {
        if (direction !== 'main' && direction !== 'secondary') {
            throw new Error('Unexpected diagonal.');
        }

        let row: number = currentPosition.row - 1;
        let col: number = currentPosition.col + (direction === 'main' ? -1 : 1);

        let result: Square[] = [] as Square[];
        while (this.inBounds(new Square(row, col))) {
            result.push(new Square(row, col));

            row -= 1;
            col += (direction === 'main' ? -1 : 1);
        }

        row = currentPosition.row + 1;
        col = currentPosition.col + (direction === 'main' ? 1 : -1);
        while (this.inBounds(new Square(row, col))) {
            result.push(new Square(row, col));

            row += 1;
            col += (direction === 'main' ? 1 : -1);
        }

        return result;
    }

    protected deleteOccupiedSquares(possibleMoves: Square[], board: Board): Square[] {
        return possibleMoves.filter((possibleMove) => {
            return !board.getPiece(possibleMove);
        });
    }
}
