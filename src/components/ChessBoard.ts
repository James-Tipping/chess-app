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

import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './ChessSquare';
import { Move, Square } from 'chess.js';
import {
  ChessPieceDragStartEvent,
  ChessSquareHoverEvent,
  RequestMoveEvent,
} from '../types';
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

  @property({ type: Object }) lastMove?: Move | null = null;

  @state() protected _validMoveSquares: Square[] = [];

  validMovesProvider: (square: Square) => Square[] = () => [];

  protected squareId(i: number): Square {
    return (String.fromCharCode(97 + (i % 8)) +
      (8 - Math.floor(i / 8))) as Square;
  }

  protected squarePiece(i: number, fen: string) {
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

  protected dragStart(e: DragEvent) {
    const sourcePiece = e.composedPath()[0] as ChessPiece | null;
    // const sourcePiece = ((e.target as HTMLElement).closest('chess-piece')) as ChessPiece | null;
    const squareId = sourcePiece?.squareId;

    if (squareId == null || sourcePiece == null) {
      e.preventDefault();
      return;
    }

    const validMoves = this.validMovesProvider(squareId);

    if (validMoves.length === 0) {
      e.preventDefault();
      return;
    }

    // Highlight valid moves when drag starts
    this._validMoveSquares = validMoves;

    if (e.dataTransfer) {
      e.dataTransfer.setData('text/plain', squareId);

      // Access the rendered content (shadow root) of the ChessPiece
      const shadow = sourcePiece.renderRoot;
      // Find the inner div that contains the SVG icon
      const innerDiv = shadow.querySelector('div');

      if (innerDiv) {
        // Clone the *inner div* for the drag image
        const clone = innerDiv.cloneNode(true) as HTMLElement;
        // Ensure clone styles don't interfere and it's positioned off-screen
        clone.style.position = 'absolute';
        clone.style.left = '-100px'; // Position off-screen
        clone.style.top = '-100px';
        clone.style.zIndex = '-1'; // Ensure it's not visible or interactive
        clone.style.pointerEvents = 'none';
        document.body.appendChild(clone);

        // Set the drag image using the cloned inner div
        // Adjust offset (22, 22) as needed for centering
        e.dataTransfer.setDragImage(clone, 22, 22);

        // Clean up the clone shortly after
        requestAnimationFrame(() => {
          if (document.body.contains(clone)) {
            document.body.removeChild(clone);
          }
        });
      } else {
        console.warn('Could not find inner div to clone for drag image.');
      }
    }
  }

  protected dragOver(e: DragEvent) {
    // Allow dropping
    e.preventDefault();
  }

  protected drop(e: DragEvent) {
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
      const validMoves = this.validMovesProvider(source);
      if (target && validMoves.includes(target)) {
        this.dispatchEvent(
          new RequestMoveEvent({
            detail: {
              from: source,
              to: target,
            },
          }),
        );
      }
    }

    // Clear highlights after drop attempt (inside or outside board)
    this._validMoveSquares = [];
  }

  protected dragEnd() {
    // Clear highlights if drag is cancelled or ends unexpectedly
    this._validMoveSquares = [];
  }

  // --- Custom Event Handlers ---

  protected onChessPieceDragStart(e: ChessPieceDragStartEvent) {
    const { preventDrag, squareId } = e.detail;
    const validMoves = this.validMovesProvider(squareId);

    if (validMoves.length === 0) {
      preventDrag();
    } else {
      // Highlight valid moves when drag starts
      this._validMoveSquares = validMoves;
    }
  }

  protected onChessSquareHover(e: ChessSquareHoverEvent) {
    const { squareId } = e.detail;
    this._validMoveSquares = this.validMovesProvider(squareId);
  }

  protected onChessSquareUnhover() {
    this._validMoveSquares = [];
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
              .isHighlighted=${this._validMoveSquares.includes(
                this.squareId(i),
              )}
              .piece=${this.squarePiece(i, this.fen)}
            ></chess-square>
          `,
        )}
      </div>
    `;
  }
}
