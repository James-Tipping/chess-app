// eslint disable max-classes-per-file
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PieceIconFactory } from './PieceIconFactory';
import { ChessPieceType } from '../types/ChessBoardElementTypes';
import { Square } from 'chess.js';

@customElement('chess-piece')
export class ChessPiece extends LitElement {
  @property({ type: String }) piece: ChessPieceType | undefined;

  @property({ type: String }) squareId: Square | undefined;

  @property({ type: Number }) size: number = 70; // Default size, matches icon default

  connectedCallback() {
    /* eslint-disable-next-line wc/guard-super-call */
    super.connectedCallback();
    this.setAttribute("draggable", "true");
  }

  diconnectedCallback() {
    /* eslint-disable-next-line wc/guard-super-call */
    super.disconnectedCallback();
    this.removeAttribute("draggable");
  }

  render() {
    return html`
      <div>
        ${PieceIconFactory.createPiece(this.piece, this.size)}
      </div>
    `;
  }
}
