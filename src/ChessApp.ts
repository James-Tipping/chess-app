/* eslint-disable wc/guard-super-call */
// Copyright (C) <2025>  <James Tipping> <github.com/James-Tipping>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { LitElement, PropertyValues, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ButtonState, ChessPieceColour } from './types/ChessBoardElementTypes';
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
      <button-element
        .buttonState=${ButtonState.SECONDARY}
        class="theme-toggle"
        label="Toggle Theme"
        @button-clicked=${this.toggleDarkMode}
      >
      </button-element>
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
      }
    `,
    cssVars,
  ];
}
