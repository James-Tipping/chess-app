/* eslint-disable wc/guard-super-call */
import { LitElement, PropertyValues, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ChessPieceColour } from './types/ChessBoardElementTypes';
import { DialogMessage } from './types/DialogTypes';
import { ChessGameController } from './controllers/ChessGameController';
import './components/ChessBoard';
import './components/ChessPanel';
import './components/Button';
import { DepthChangedEvent, RequestMoveEvent } from './types/EventTypes';
import { DialogController } from './controllers/DialogController';
import { DialogElement } from './components';
import { cssVars } from './CssVars';

@customElement('chess-app')
export class ChessApp extends LitElement {
  @property({ type: Boolean, reflect: true, attribute: 'dark-mode' })
  darkMode = false;

  private _gameController: ChessGameController = new ChessGameController(this);

  @state()
  private _dialogMessage?: string;

  protected dialogContent = () => html`
    <div class="title">Game Over!</div>
    <div class="message">${this._dialogMessage}</div>
  `;

  protected dialogStyles = css`
    ::slotted(.title),
    .title {
      font-size: 2.5rem;
      font-weight: 500;
      margin-bottom: 1rem;
      color: inherit;
    }
    ::slotted(.message),
    .message {
      font-size: 1.5rem;
      color: inherit;
    }
  `;

  private _dialogController: DialogController = new DialogController(this, {
    contentRenderer: () => this.dialogContent(),
    styles: [this.dialogStyles, cssVars, DialogElement.styles],
    isDarkMode: () => this.darkMode,
  });

  protected moveRequested(e: RequestMoveEvent) {
    const { from, to } = e.detail;
    this._gameController?.movePiece({
      from,
      to,
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

  protected closeDialog = () => this._dialogController.hide();

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

  protected newGameClicked() {
    this._gameController.newGame();
  }

  protected undoClicked() {
    this._gameController.undoMove();
  }

  protected show() {
    this._dialogController.show();
  }

  protected hide() {
    this._dialogController.hide();
  }

  protected onDepthChanged(e: DepthChangedEvent) {
    this._gameController.searchDepth = e.detail.depth;
  }

  protected onAIvsAIStart() {
    this._gameController.startAIvsAIMode();
  }

  protected onAIvsAIStop() {
    this._gameController.stopAIvsAIMode();
  }

  protected toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }

  render() {
    return html`
      <button class="theme-toggle" @click=${this.toggleDarkMode}>
        Toggle Theme
      </button>
      <div
        class="container"
        @undo-clicked=${this.undoClicked}
        @new-game-clicked=${this.newGameClicked}
        @ai-vs-ai-start=${this.onAIvsAIStart}
        @ai-vs-ai-stop=${this.onAIvsAIStop}
        @depth-changed=${this.onDepthChanged}
        @request-move=${this.moveRequested}
      >
        <chess-panel
          .playerAdvantage=${this._gameController.whiteAdvantage}
          .positionsEvaluated=${this._gameController.positionsEvaluated}
          .searchDepth=${this._gameController.searchDepth}
          .isAIvsAIMode=${this._gameController.isAIvsAIMode}
        >
        </chess-panel>
        <chess-board
          .validMovesProvider=${this._gameController.getValidMoves}
          .lastMove=${this._gameController.lastMove}
          .fen=${this._gameController.position}
        ></chess-board>
      </div>
    `;
  }

  static styles = [
    css`
      :host {
        display: block;
        background-color: var(--app-background);
        color: var(--app-text-color);
        box-sizing: border-box;
        position: relative;
        height: 100%;
      }

      .container {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 2rem;
        justify-content: center;
        padding: 2rem;
        padding-top: 5rem;
      }

      /* Style the theme toggle button */
      .theme-toggle {
        position: absolute;
        top: 1rem;
        right: 1rem;
        /* Use button variables for consistency */
        background-color: var(--button-secondary-bg);
        color: var(--button-secondary-text);
        border: 1px solid var(--button-secondary-border);
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        cursor: pointer;
        z-index: 10; /* Ensure it's above other content */
        font-size: 0.9rem;
      }
      .theme-toggle:hover {
        opacity: 0.9;
      }
    `,
    cssVars,
  ];
}
