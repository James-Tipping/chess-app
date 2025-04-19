// eslint disable max-classes-per-file
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PieceIconFactory } from './PieceIconFactory';
import { ChessPieceType } from '../types/ChessBoardElementTypes';
import { ChessPieceDragStartEvent } from '../types/EventTypes';
import { Square } from 'chess.js';

@customElement('chess-piece')
export class ChessPiece extends LitElement {
  @property({ type: String }) piece: ChessPieceType | undefined;

  @property({ type: String }) squareId: Square | undefined;

  dragStart(e: DragEvent) {
    const preventDrag = () => e.preventDefault();
    if (this.squareId == null) {
      console.error('squareId must be defined in ChessPiece');
      preventDrag();
      return;
    }
    this.dispatchEvent(
      new ChessPieceDragStartEvent({
        detail: {
          preventDrag,
          squareId: this.squareId,
        },
        bubbles: true,
        composed: true,
      }),
    );

    if (e.dataTransfer) {
      console.log('dragStart data:', this.squareId);
      e.dataTransfer.setData('text/plain', this.squareId);

      // Create a clone of the piece element for the drag image
      const pieceElement = e.target as HTMLElement;
      const clone = pieceElement.cloneNode(true) as HTMLElement;
      clone.style.position = 'absolute';
      clone.style.top = '-1000px';
      document.body.appendChild(clone);

      // Set the drag image and clean up the clone
      e.dataTransfer.setDragImage(clone, 22, 22);
      requestAnimationFrame(() => {
        document.body.removeChild(clone);
      });
    }
  }

  render() {
    return html`
      <div @dragstart=${this.dragStart} draggable="true">
        ${PieceIconFactory.createPiece(this.piece)}
      </div>
    `;
  }
}
