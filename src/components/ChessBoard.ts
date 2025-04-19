import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './ChessSquare';
import { Move, Square } from 'chess.js';
import { ChessPieceDragStartEvent, ChessPieceDroppedEvent, ChessSquareHoverEvent, ChessSquareUnhoverEvent, RequestMoveEvent } from '../types';

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

  @property() lastMove: Move | null = null;

  @state() validMoveSquares: Square[] = [];

  getValidMoves: (square: Square) => Square[] = () => [];

  squareId(i: number): Square {
    return String.fromCharCode(97 + (i % 8)) + (8 - Math.floor(i / 8)) as Square;
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

  onChessPieceDropped(e: ChessPieceDroppedEvent) {
    const { source, target } = e.detail;
    const validMoves = this.getValidMoves(source);
    if (validMoves.includes(target)) {
      this.dispatchEvent(new RequestMoveEvent({
        detail: {
          from: source,
          to: target
        }
      }))
    }
  }

  onChessPieceDragStart(e: ChessPieceDragStartEvent) {
    console.log('chesspiecedragstartevent');
    const { preventDrag, squareId } = e.detail;
    const validMoves = this.getValidMoves(squareId);

    if (validMoves.length === 0) {
      preventDrag();
    }
  }

  onChessSquareHover(e: ChessSquareHoverEvent) {
    const squareId = e.detail.squareId;
    this.validMoveSquares = this.getValidMoves(squareId);
  }

  onChessSquareUnhover(e: ChessSquareUnhoverEvent) {
    this.validMoveSquares = [];
  }

  render() {
    return html`
      <div
        class="board"
        @chess-piece-dropped=${this.onChessPieceDropped}
        @chess-piece-drag-start=${this.onChessPieceDragStart}
        @chess-square-hover=${this.onChessSquareHover}
        @chess-square-unhover=${this.onChessSquareUnhover}
      >
        ${Array.from(
      { length: 64 },
      (_, i) => html`
            <chess-square
              .from=${this.lastMove?.from === this.squareId(i)}
              .to=${this.lastMove?.to === this.squareId(i)}
              .squareId=${this.squareId(i)}
              .isHighlighted=${this.validMoveSquares.includes(this.squareId(i))}
              .piece=${this.squarePiece(i, this.fen)}
            ></chess-square>
          `,
    )}
      </div>
    `;
  }
}
