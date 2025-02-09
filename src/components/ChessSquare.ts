import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ChessPieceType, SquareColour } from '../types/ChessBoardElementTypes';
import '../pieces/ChessPiece';

export class ChessPieceDroppedEvent extends CustomEvent<{
  source: string;
  target: string;
}> {
  // eslint-disable-next-line no-undef
  constructor(
    eventInitDict?: CustomEventInit<{ source: string; target: string }>,
  ) {
    super('chess-piece-dropped', eventInitDict);
  }
}

@customElement('chess-square')
export class ChessSquare extends LitElement {
  static styles = css`
    .square {
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .light {
      background-color: #f0d9b5;
    }
    .dark {
      background-color: #b58863;
    }
  `;

  @property({ type: String }) colour?: SquareColour;

  @property({ type: String }) piece?: ChessPieceType;

  @property({ type: Boolean }) isHighlighted = false;

  private _isLightSquare(id: string): boolean {
    const file = id.charCodeAt(0) - 'a'.charCodeAt(0);
    const rank = parseInt(id[1], 10) - 1;
    return (file + rank) % 2 === 1;
  }

  dragOver(e: DragEvent) {
    e.preventDefault();
  }

  drop(e: DragEvent) {
    e.preventDefault();
    const data = e.dataTransfer?.getData('text/plain');
    console.log(`data: ${data}`);
    if (data) {
      this.dispatchEvent(
        new ChessPieceDroppedEvent({
          detail: { source: data, target: this.id },
          bubbles: true,
          composed: true,
        }),
      );
      console.log('custom drop event dispatched');
    }
  }

  render() {
    const colourClasses = {
      light: this._isLightSquare(this.id),
      dark: !this._isLightSquare(this.id),
      highlighted: this.isHighlighted,
    };

    return html`
      <div
        @drop=${this.drop}
        @dragover=${this.dragOver}
        class="square ${classMap(colourClasses)}"
      >
        ${this.id}
        ${this.piece
          ? html`<chess-piece
              .squareId=${this.id}
              .piece=${this.piece}
            ></chess-piece>`
          : nothing}
      </div>
    `;
  }
}
