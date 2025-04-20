import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './ChessSquare';
import { Move, Square } from 'chess.js';
import { ChessPieceDragStartEvent, ChessSquareHoverEvent, ChessSquareUnhoverEvent, RequestMoveEvent } from '../types';
import { ChessPiece } from '../pieces';

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

  // --- Drag and Drop Handlers ---

  dragStart(e: DragEvent) {
    const sourcePiece = e.composedPath()[0] as ChessPiece | null;
    // const sourcePiece = ((e.target as HTMLElement).closest('chess-piece')) as ChessPiece | null;
    const squareId = sourcePiece?.squareId;

    if (squareId == null || sourcePiece == null) {
      e.preventDefault();
      return;
    }

    const validMoves = this.getValidMoves(squareId);

    if (validMoves.length === 0) {
      e.preventDefault();
      return;
    } else {
      // Highlight valid moves when drag starts
      this.validMoveSquares = validMoves;
    }

    if (e.dataTransfer) {
      console.log('dragStart data:', squareId);
      e.dataTransfer.setData('text/plain', squareId);

      // Create a clone of the piece element for the drag image
      const pieceElement = e.target as HTMLElement;
      const clone = sourcePiece.cloneNode(true) as HTMLElement;
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

  dragOver(e: DragEvent) {
    // Allow dropping
    e.preventDefault();
  }

  drop(e: DragEvent) {
    e.preventDefault();
    const source = e.dataTransfer?.getData('text/plain') as Square | undefined;
    if (!source) return;

    const boardRect = this.getBoundingClientRect();
    // Assumes the board is square and squares are equal size
    const squareSize = boardRect.width / 8;

    // Calculate drop position relative to the board's top-left corner
    const x = e.clientX - boardRect.left;
    const y = e.clientY - boardRect.top;

    // Calculate column and row index (0-7)
    const col = Math.floor(x / squareSize);
    const row = Math.floor(y / squareSize);

    let target: Square | null = null;
    // Check if the drop is within the board bounds
    if (col >= 0 && col < 8 && row >= 0 && row < 8) {
      // Convert row/col to square ID (e.g., 'a1', 'h8')
      target = (String.fromCharCode(97 + col) + (8 - row)) as Square;

      // Use the valid moves determined at the start of the drag
      const validMoves = this.getValidMoves(source);
      if (target && validMoves.includes(target)) {
        this.dispatchEvent(new RequestMoveEvent({
          detail: {
            from: source,
            to: target
          }
        }));
      }
    }

    // Clear highlights after drop attempt (inside or outside board)
    this.validMoveSquares = [];
  }

  dragEnd() {
    // Clear highlights if drag is cancelled or ends unexpectedly
    this.validMoveSquares = [];
  }

  // --- Custom Event Handlers ---

  onChessPieceDragStart(e: ChessPieceDragStartEvent) {
    const { preventDrag, squareId } = e.detail;
    const validMoves = this.getValidMoves(squareId);

    if (validMoves.length === 0) {
      preventDrag();
    } else {
      // Highlight valid moves when drag starts
      this.validMoveSquares = validMoves;
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
        @dragover=${this.dragOver}
        @drop=${this.drop}
        @dragend=${this.dragEnd}
        @dragstart=${this.dragStart}
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
