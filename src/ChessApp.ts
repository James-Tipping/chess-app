import { LitElement, PropertyValues, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ChessPieceColour } from './types/ChessBoardElementTypes';
import { ChessGameController } from './ChessGameController';
import './components/ChessBoard';
import { ChessPieceDroppedEvent } from './components/ChessSquare';
import { ChessPieceDragStartEvent } from './pieces/ChessPiece';
import { getChessPieceColour } from './utils/Utils';

@customElement('chess-app')
export class ChessApp extends LitElement {
  private _gameController: ChessGameController = new ChessGameController(this);

  onDragStart(e: ChessPieceDragStartEvent) {
    const { piece, preventDrag } = e.detail;
    if (this._gameController?.isGameOver) {
      preventDrag();
      return;
    }

    const pieceColour = getChessPieceColour(piece);

    if (
      (this._gameController?.turn === ChessPieceColour.WHITE &&
        pieceColour === ChessPieceColour.BLACK) ||
      (this._gameController?.turn === ChessPieceColour.BLACK &&
        pieceColour === ChessPieceColour.WHITE) ||
      !pieceColour
    ) {
      preventDrag();
    }
  }

  onDrop(e: ChessPieceDroppedEvent) {
    const { source, target } = e.detail;
    this._gameController?.movePiece({
      from: source,
      to: target,
      promotion: 'q',
    });
  }

  protected async updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    await this.updateComplete;
    if (
      !this._gameController.isGameOver &&
      this._gameController.turn === ChessPieceColour.BLACK
    ) {
      // alert('Game Over');
      this._gameController.makeAiMove();
    }
  }

  render() {
    return html`
      <div>
        Black Advantage: ${this._gameController.getAdvantage()}
        <chess-board
          .lastMove=${this._gameController.lastMove}
          .fen=${this._gameController.position}
          @chess-piece-dropped=${this.onDrop}
          @chess-piece-drag-start=${this.onDragStart}
        ></chess-board>
      </div>
    `;
  }
}
