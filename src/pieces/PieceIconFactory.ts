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

import { html, nothing, TemplateResult } from 'lit';
import {
  ChessPieceType,
  ChessPieceColour,
} from '../types/ChessBoardElementTypes.js';
import './BishopPieceIcon.js';
import './KingPieceIcon.js';
import './KnightPieceIcon.js';
import './PawnPieceIcon.js';
import './QueenPiece.js';
import './RookPieceIcon.js';

export class PieceIconFactory {
  static createPiece(
    type?: ChessPieceType,
    size?: number,
  ): TemplateResult | typeof nothing {
    const colour = this.getColour(type);
    if (!colour) return nothing; // Handle case where type is undefined

    switch (type) {
      case ChessPieceType.WHITE_KNIGHT:
      case ChessPieceType.BLACK_KNIGHT:
        return html`<knight-piece-icon
          .colour=${colour}
          .size=${size}
        ></knight-piece-icon>`;
      case ChessPieceType.WHITE_PAWN:
      case ChessPieceType.BLACK_PAWN:
        return html`<pawn-piece-icon
          .colour=${colour}
          .size=${size}
        ></pawn-piece-icon>`;
      case ChessPieceType.WHITE_ROOK:
      case ChessPieceType.BLACK_ROOK:
        return html`<rook-piece-icon
          .colour=${colour}
          .size=${size}
        ></rook-piece-icon>`;
      case ChessPieceType.WHITE_BISHOP:
      case ChessPieceType.BLACK_BISHOP:
        return html`<bishop-piece-icon
          .colour=${colour}
          .size=${size}
        ></bishop-piece-icon>`;
      case ChessPieceType.WHITE_QUEEN:
      case ChessPieceType.BLACK_QUEEN:
        return html`<queen-piece-icon
          .colour=${colour}
          .size=${size}
        ></queen-piece-icon>`;
      case ChessPieceType.WHITE_KING:
      case ChessPieceType.BLACK_KING:
        return html`<king-piece-icon
          .colour=${colour}
          .size=${size}
        ></king-piece-icon>`;
      default:
        console.warn(`Unknown piece type: ${type}`);
        return nothing;
    }
  }

  private static getColour(
    type?: ChessPieceType,
  ): ChessPieceColour | undefined {
    if (!type) return undefined;
    return type === type.toUpperCase()
      ? ChessPieceColour.WHITE
      : ChessPieceColour.BLACK;
  }
}
