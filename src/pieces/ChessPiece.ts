// eslint disable max-classes-per-file
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PieceIconFactory } from './PieceIconFactory';
import { ChessPieceType } from '../types/ChessBoardElementTypes';

interface ChessPieceDragStartEventDetail {
  piece: ChessPieceType | null;
  preventDrag: () => void;
}

export class ChessPieceDragStartEvent extends CustomEvent<ChessPieceDragStartEventDetail> {
  // eslint-disable-next-line no-undef
  constructor(eventInitDict?: CustomEventInit<ChessPieceDragStartEventDetail>) {
    super('chess-piece-drag-start', eventInitDict);
  }
}

@customElement('chess-piece')
export class ChessPiece extends LitElement {
  @property({ type: String }) piece: ChessPieceType | undefined;

  @property({ type: String }) squareId: string | undefined;

  dragStart(e: DragEvent) {
    const preventDrag = () => e.preventDefault();
    this.dispatchEvent(
      new ChessPieceDragStartEvent({
        detail: {
          piece: this.piece || null,
          preventDrag,
        },
        bubbles: true,
        composed: true,
      }),
    );

    e.dataTransfer?.setData('text/plain', this.squareId || '');
    console.log(
      `e.dataTransfer?.getData('text/plain'): ${e.dataTransfer?.getData('text/plain')}`,
    );
  }

  render() {
    return html`
      <div @dragstart=${this.dragStart} draggable="true">
        ${PieceIconFactory.createPiece(this.piece)}
      </div>
    `;
  }
}
