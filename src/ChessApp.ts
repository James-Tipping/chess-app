import { LitElement, PropertyValues, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import {
  ChessPieceColour,
  DialogMessage,
} from './types/ChessBoardElementTypes';
import { ChessGameController } from './ChessGameController';
import './components/ChessBoard';
import './components/ChessPanel';
import { ChessPieceDroppedEvent } from './components/ChessSquare';
import { ChessPieceDragStartEvent } from './pieces/ChessPiece';
import { getChessPieceColour } from './utils/Utils';

@customElement('chess-app')
export class ChessApp extends LitElement {
  static styles = css`
    .container {
      display: flex;
      align-items: center;
      gap: 2rem;
      justify-content: center;
    }
  `;

  private _gameController: ChessGameController = new ChessGameController(this);

  @state()
  private _dialogOpen?: boolean = false;

  @state()
  private _dialogMessage?: string;

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
      this._gameController.makeAiMove();
    }
  }

  willUpdate() {
    if (this._gameController.isGameOver) {
      this._dialogOpen = true;
      if (
        this._gameController.isCheckmate &&
        this._gameController.whiteAdvantage > 0
      ) {
        this._dialogMessage = DialogMessage.WIN;
      } else if (
        this._gameController.isCheckmate &&
        this._gameController.blackAdvantage > 0
      ) {
        this._dialogMessage = DialogMessage.LOSE;
      } else if (this._gameController.isStalemate) {
        this._dialogMessage = DialogMessage.STALEMATE;
      }
    }
  }

  newGameClicked() {
    this._gameController.newGame();
  }

  undoClicked() {
    this._gameController.undoMove();
  }

  render() {
    return html`
      <div
        class="container"
        @undo-clicked=${this.undoClicked}
        @new-game-clicked=${this.newGameClicked}
      >
        <chess-panel .playerAdvantage=${this._gameController.whiteAdvantage}>
        </chess-panel>
        <chess-board
          .lastMove=${this._gameController.lastMove}
          .fen=${this._gameController.position}
          @chess-piece-dropped=${this.onDrop}
          @chess-piece-drag-start=${this.onDragStart}
        ></chess-board>
        <dialog-element
          .dialogOpen=${this._dialogOpen}
          .dialogMessage=${this._dialogMessage}
        ></dialog-element>
      </div>
    `;
  }
}
