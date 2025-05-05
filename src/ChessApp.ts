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

@customElement('chess-app')
export class ChessApp extends LitElement {
  @property({ type: Boolean, reflect: true, attribute: 'dark-mode' })
  darkMode = false; // Default to light mode

  private _gameController: ChessGameController = new ChessGameController(this);

  @state()
  private _dialogMessage?: string;

  protected dialogContent = () => html`
    <div class="title">Game Over!</div>
    <div class="message">${this._dialogMessage}</div>
  `;

  // Update dialog styles to use CSS variables
  protected dialogStyles = css`
    ::slotted(.title),
    .title {
      /* Target class directly too */
      font-size: 2.5rem; /* Adjusted size */
      font-weight: 500;
      margin-bottom: 1rem;
      color: inherit; /* Inherit color from wrapper */
    }
    ::slotted(.message),
    .message {
      /* Target class directly too */
      font-size: 1.5rem; /* Adjusted size */
      color: inherit; /* Inherit color from wrapper */
    }
  `;

  private _dialogController: DialogController = new DialogController(this, {
    // Pass the dynamic content renderer
    contentRenderer: () => this.dialogContent(),
    styles: [this.dialogStyles, ChessApp.cssVars, DialogElement.styles],
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

  static cssVars = css`
    :host {
      /* Default (Light Mode) Theme Variables */
      --app-background: #ffffff;
      --app-text-color: #212529;
      --app-border-color: #dee2e6;
      --panel-background: #f8f9fa;
      --panel-border-color: var(--app-border-color);
      --panel-text-color: var(--app-text-color);
      --button-primary-bg: #0d6efd;
      --button-primary-text: #ffffff;
      --button-primary-border: var(--button-primary-bg);
      --button-secondary-bg: #6c757d;
      --button-secondary-text: #ffffff;
      --button-secondary-border: var(--button-secondary-bg);
      --button-danger-bg: #dc3545;
      --button-danger-text: #ffffff;
      --button-danger-border: var(--button-danger-bg);
      --link-color: #0d6efd;
      --highlight-bg: #e9ecef;
      --dialog-background: #ffffff;
      --dialog-text-color: var(--app-text-color);
      --dialog-border-color: rgba(0, 0, 0, 0.2);
      --dialog-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    }
    :host([dark-mode]) {
      /* Dark Mode Theme Variable Overrides */
      --app-background: #212529;
      --app-text-color: #dee2e6;
      --app-border-color: #495057;
      --panel-background: #343a40;
      --panel-border-color: var(--app-border-color);
      --panel-text-color: var(--app-text-color);
      --button-primary-bg: #0d6efd; /* Blue often works in dark mode */
      --button-primary-text: #ffffff;
      --button-primary-border: var(--button-primary-bg);
      --button-secondary-bg: #6c757d;
      --button-secondary-text: #ffffff;
      --button-secondary-border: var(--button-secondary-bg);
      --button-danger-bg: #dc3545; /* Red often works */
      --button-danger-text: #ffffff;
      --button-danger-border: var(--button-danger-bg);
      --link-color: #6ea8fe; /* Lighter blue for links */
      --highlight-bg: #495057;
      --dialog-background: #343a40;
      --dialog-text-color: var(--app-text-color);
      --dialog-border-color: rgba(255, 255, 255, 0.2);
      --dialog-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
    }
  `;

  static styles = [
    css`
      :host {
        /* Apply base styles */
        display: block; /* Ensure it takes up space */
        background-color: var(--app-background);
        color: var(--app-text-color);
        box-sizing: border-box;
        position: relative; /* Needed for absolute positioning of toggle */
      }

      .container {
        display: flex;
        flex-wrap: wrap; /* Allow wrapping on smaller screens */
        align-items: flex-start; /* Align items to the top */
        gap: 2rem;
        justify-content: center;
        padding: 2rem;
        padding-top: 5rem; /* Add padding to avoid overlap with toggle */
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
    ChessApp.cssVars,
  ];
}
