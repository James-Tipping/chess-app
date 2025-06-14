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

import { css, html, LitElement, nothing } from 'lit';
import { Square } from 'chess.js';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ChessPieceType, SquareColour } from '../types/ChessBoardElementTypes';
import {
  ChessSquareHoverEvent,
  ChessSquareUnhoverEvent,
} from '../types/EventTypes';
import '../pieces/ChessPiece';

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
    .light.highlighted {
      background-color: #7c8594;
    }
    .dark {
      background-color: #b58863;
    }
    .dark.highlighted {
      background-color: #5e6570;
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

  @property({ type: String }) squareId!: Square;

  @property() isHighlighted: boolean = false;

  private _isLightSquare(): boolean {
    const file = this.squareId.charCodeAt(0) - 'a'.charCodeAt(0);
    const rank = parseInt(this.squareId[1], 10) - 1;
    return (file + rank) % 2 === 1;
  }

  protected onMouseOver() {
    this.dispatchEvent(
      new ChessSquareHoverEvent({
        detail: { squareId: this.squareId },
      }),
    );
  }

  protected onMouseLeave() {
    this.dispatchEvent(
      new ChessSquareUnhoverEvent({
        detail: { squareId: this.squareId },
      }),
    );
  }

  render() {
    const colourClasses = {
      light: this._isLightSquare(),
      dark: !this._isLightSquare(),
      from: this.from,
      to: this.to,
      highlighted: this.isHighlighted,
    };

    return html`
      <div
        @mouseover=${this.onMouseOver}
        @focus=${this.onMouseOver}
        @mouseleave=${this.onMouseLeave}
        @blur=${this.onMouseLeave}
        class="square ${classMap(colourClasses)}"
      >
        ${this.piece
          ? html`<chess-piece
              .squareId=${this.squareId}
              .piece=${this.piece}
            ></chess-piece>`
          : nothing}
      </div>
    `;
  }
}
