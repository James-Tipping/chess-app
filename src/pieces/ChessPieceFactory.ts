import { ChessPieceColour } from "./AbstractBasePiece.js";
import { html, nothing, TemplateResult } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

export class ChessPieceFactory {
  static createPiece(type: string, colour: ChessPieceColour, id?: string): TemplateResult | typeof nothing {
    switch (type.toLowerCase()) {
      case 'knight':
        return html`<knight-piece .colour=${colour} id=${ifDefined(id)}></knight-piece>`;
      case 'pawn':
        return html`<pawn-piece .colour=${colour} id=${ifDefined(id)}></pawn-piece>`;
      case 'rook':
        return html`<rook-piece .colour=${colour} id=${ifDefined(id)}></rook-piece>`;
      case 'bishop':
        return html`<bishop-piece .colour=${colour} id=${ifDefined(id)}></bishop-piece>`;
      case 'queen':
        return html`<queen-piece .colour=${colour} id=${ifDefined(id)}></queen-piece>`;
      case 'king':
        return html`<king-piece .colour=${colour} id=${ifDefined(id)}></king-piece>`;
      default:
        console.warn(`Unknown piece type: ${type}`);
        return nothing;
    }
  }
}