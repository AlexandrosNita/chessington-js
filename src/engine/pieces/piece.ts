import Player from '../player';
import Board from '../board';
import Square from '../square';
import GameSettings from '../gameSettings';
import King from "./king";

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

    private getSquarePerDirection(constantDirection: number, changingDirection: number, direction: string): Square {
        return (direction === 'horizontal' ? new Square(constantDirection, changingDirection) : new Square(changingDirection, constantDirection));
    }

    protected getRookMoves(board: Board, direction: string): Square[] {
        if (direction !== 'horizontal' && direction !== 'vertical') {
            throw new Error('Unexpected direction.');
        }

        const currentPosition = board.findPiece(this);

        const constantDirection = (direction === 'horizontal') ? currentPosition.row : currentPosition.col;
        const otherCoordinate = (direction === 'horizontal') ? currentPosition.col : currentPosition.row;

        let result: Square[] = [] as Square[];

        let changingCoordinate = otherCoordinate - 1;
        while (changingCoordinate >= 0 && board.getPiece(this.getSquarePerDirection(constantDirection, changingCoordinate, direction)) === undefined) {
            result.push(this.getSquarePerDirection(constantDirection, changingCoordinate, direction));
            changingCoordinate -= 1;
        }

        if (changingCoordinate >= 0) { // There is a piece on that square
            const otherPiece: Piece | undefined = board.getPiece(this.getSquarePerDirection(constantDirection, changingCoordinate, direction));
            if (otherPiece !== undefined && otherPiece.player !== this.player && Object.getPrototypeOf(otherPiece).constructor.name !== 'King') {
                result.push(this.getSquarePerDirection(constantDirection, changingCoordinate, direction));
            }
        }

        changingCoordinate = otherCoordinate + 1;
        while (changingCoordinate < GameSettings.BOARD_SIZE && board.getPiece(this.getSquarePerDirection(constantDirection, changingCoordinate, direction)) === undefined) {
            result.push(this.getSquarePerDirection(constantDirection, changingCoordinate, direction));
            changingCoordinate += 1;
        }

        if (changingCoordinate < GameSettings.BOARD_SIZE) {
            const otherPiece : Piece | undefined = board.getPiece(this.getSquarePerDirection(constantDirection, changingCoordinate, direction));
            if (otherPiece !== undefined && otherPiece.player !== this.player && Object.getPrototypeOf(otherPiece).constructor.name !== 'King') {
                result.push(this.getSquarePerDirection(constantDirection, changingCoordinate, direction));
            }
        }

        return result;
    }

    protected getBishopMoves(board: Board, direction: string): Square[] {
        const currentPosition = board.findPiece(this);
        if (direction !== 'main' && direction !== 'secondary') {
            throw new Error('Unexpected diagonal.');
        }

        let row: number = currentPosition.row - 1;
        let col: number = currentPosition.col + (direction === 'main' ? -1 : 1);

        let result: Square[] = [] as Square[];
        while (this.inBounds(new Square(row, col)) && board.getPiece(new Square(row, col)) === undefined) {
            result.push(new Square(row, col));

            row -= 1;
            col += (direction === 'main' ? -1 : 1);
        }

        if (this.inBounds(new Square(row, col))) {
            const otherPiece: Piece | undefined = board.getPiece(new Square(row, col));
            if (otherPiece !== undefined && otherPiece.player != this.player && Object.getPrototypeOf(otherPiece).constructor.name !== 'King') {
                result.push(new Square(row, col));
            }
        }

        row = currentPosition.row + 1;
        col = currentPosition.col + (direction === 'main' ? 1 : -1);
        while (this.inBounds(new Square(row, col)) && board.getPiece(new Square(row, col)) === undefined) {
            result.push(new Square(row, col));

            row += 1;
            col += (direction === 'main' ? 1 : -1);
        }

        if (this.inBounds(new Square(row, col))) {
            const otherPiece: Piece | undefined = board.getPiece(new Square(row, col));
            if (otherPiece !== undefined && otherPiece.player !== this.player && Object.getPrototypeOf(otherPiece).constructor.name !== 'King') {
                result.push(new Square(row, col));
            }
        }

        return result;
    }

    protected deleteOccupiedSquares(possibleMoves: Square[], board: Board): Square[] {
        return possibleMoves.filter((possibleMove) => {
            return (this.inBounds(possibleMove) && !board.getPiece(possibleMove));
        });
    }
}
