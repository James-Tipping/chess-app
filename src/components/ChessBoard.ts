import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './ChessSquare';

@customElement('chess-board')
export class ChessBoard extends LitElement {
  static styles = css`
    .board {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      grid-template-rows: repeat(8, 1fr);
      width: 800px;
      height: 800px;
    }
  `;

  @property({ type: String }) fen = '';

  squareId(i: number): string {
    return String.fromCharCode(97 + (i % 8)) + (8 - Math.floor(i / 8));
  }

  squarePiece(i: number, fen: string) {
    const position = fen.split(' ')[0];
    const rows = position.split('/');
    let squareIndex = 0;

    for (const row of rows) {
      for (const char of row) {
        if (char >= '1' && char <= '8') {
          squareIndex += parseInt(char, 10);
        } else {
          if (squareIndex === i) {
            return char;
          }
          squareIndex++;
        }
      }
    }

    return null;
  }

  render() {
    return html`
      <div class="board">
        ${Array.from(
          { length: 64 },
          (_, i) => html`
            <chess-square
              id=${this.squareId(i)}
              .piece=${this.squarePiece(i, this.fen)}
            ></chess-square>
          `,
        )}
      </div>
    `;
  }
}
