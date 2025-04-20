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
  static createPiece(type?: ChessPieceType, size?: number): TemplateResult | typeof nothing {
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

  private static getColour(type?: ChessPieceType): ChessPieceColour | undefined {
    if (!type) return undefined;
    return type === type.toUpperCase()
      ? ChessPieceColour.WHITE
      : ChessPieceColour.BLACK;
  }
}
