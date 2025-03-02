import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ChessPieceType, SquareColour } from '../types/ChessBoardElementTypes';
import '../pieces/ChessPiece';

export class ChessPieceDroppedEvent extends CustomEvent<{
  source: string;
  target: string;
}> {
  constructor(
    // eslint-disable-next-line no-undef
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
      position: relative;
      box-sizing: border-box;
    }
    .light {
      background-color: #f0d9b5;
    }
    .dark {
      background-color: #b58863;
    }
    .square-id {
      position: absolute;
      bottom: 5px;
      left: 5px;
    }
    .from {
      border: 10px solid #c4bf5c;
    }
    .to {
      border: 10px solid #e8dd10;
    }
  `;

  @property({ type: String }) colour?: SquareColour;

  @property({ type: String }) piece?: ChessPieceType;

  @property({ type: Boolean }) from: boolean = false;

  @property({ type: Boolean }) to: boolean = false;

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
    if (data) {
      this.dispatchEvent(
        new ChessPieceDroppedEvent({
          detail: { source: data, target: this.id },
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  render() {
    const colourClasses = {
      light: this._isLightSquare(this.id),
      dark: !this._isLightSquare(this.id),
      from: this.from,
      to: this.to,
    };

    return html`
      <div
        @drop=${this.drop}
        @dragover=${this.dragOver}
        class="square ${classMap(colourClasses)}"
      >
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
