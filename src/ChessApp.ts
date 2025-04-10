/* eslint-disable wc/guard-super-call */
import { LitElement, PropertyValues, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ChessPieceColour } from './types/ChessBoardElementTypes';
import { DialogMessage } from './types/DialogTypes';
import { ChessGameController } from './ChessGameController';
import './components/ChessBoard';
import './components/ChessPanel';
import './components/Button';
import {
  ChessPieceDroppedEvent,
  ChessPieceDragStartEvent,
} from './types/EventTypes';
import { getChessPieceColour } from './utils/Utils';
import DialogController from './DialogController';

@customElement('chess-app')
export class ChessApp extends LitElement {
  static styles = css`
    .container {
      display: flex;
      align-items: center;
      gap: 2rem;
      justify-content: center;
      padding: 2rem;
    }
  `;

  private _gameController: ChessGameController = new ChessGameController(this);

  @state()
  private _dialogMessage?: string;

  dialogContent = () => html`
    <div class="title">Game Over!</div>
    <div class="message">${this._dialogMessage}</div>
  `;

  dialogStyles = css`
    ::slotted(.title) {
      font-size: 3rem;
      text-align: center;
    }
    ::slotted(.message) {
      font-size: 2rem;
      text-align: center;
    }
  `;

  private _dialogController: DialogController = new DialogController(this, {
    contentRenderer: this.dialogContent,
    styles: this.dialogStyles,
  });

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

  connectedCallback() {
    /* eslint-disable-next-line wc/guard-super-call */
    super.connectedCallback();
    this.addEventListener('close-dialog', this.closeDialog);
  }

  disconnectedCallback() {
    /* eslint-disable-next-line wc/guard-super-call */
    super.disconnectedCallback();
    this.removeEventListener('close-dialog', this.closeDialog);
  }

  closeDialog = () => this._dialogController.hide();

  protected async updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    await this.updateComplete;
    if (
      !this._gameController.isGameOver &&
      !this._gameController.isAIvsAIMode &&
      this._gameController.turn === ChessPieceColour.BLACK
    ) {
      this._gameController.makeAiMove();
    }
  }

  willUpdate() {
    if (this._gameController.isGameOver) {
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
      } else if (this._gameController.isDraw) {
        if (this._gameController.isThreefoldRepetition) {
          this._dialogMessage = DialogMessage.THREEFOLD_REPETITION;
        } else if (this._gameController.isInsufficientMaterial) {
          this._dialogMessage = DialogMessage.INSUFFICIENT_MATERIAL;
        } else {
          this._dialogMessage = DialogMessage.DRAW;
        }
      }
      this._dialogController.show();
    }
  }

  newGameClicked() {
    this._gameController.newGame();
  }

  undoClicked() {
    this._gameController.undoMove();
  }

  show() {
    this._dialogController.show();
  }

  hide() {
    this._dialogController.hide();
  }

  protected onDepthChanged(e: Event) {
    const customEvent = e as CustomEvent<number>;
    this._gameController.searchDepth = customEvent.detail;
  }

  protected onAIvsAIStart() {
    this._gameController.startAIvsAIMode();
  }

  protected onAIvsAIStop() {
    this._gameController.stopAIvsAIMode();
  }

  render() {
    return html`
      <div
        class="container"
        @undo-clicked=${this.undoClicked}
        @new-game-clicked=${this.newGameClicked}
        @ai-vs-ai-start=${this.onAIvsAIStart}
        @ai-vs-ai-stop=${this.onAIvsAIStop}
        @depth-changed=${this.onDepthChanged}
      >
        <chess-panel
          .playerAdvantage=${this._gameController.whiteAdvantage}
          .positionsEvaluated=${this._gameController.positionsEvaluated}
          .searchDepth=${this._gameController.searchDepth}
          .isAIvsAIMode=${this._gameController.isAIvsAIMode}
        >
        </chess-panel>
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
