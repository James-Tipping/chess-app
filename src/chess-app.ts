import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import './pieces/BishopPiece';
import './pieces/KnightPiece';
import './pieces/PawnPiece';
import './pieces/QueenPiece';
import './pieces/KingPiece';
import './pieces/RookPiece';
import { ChessPieceColour } from './pieces/AbstractBasePiece';
import { ChessPieceFactory } from './pieces/ChessPieceFactory';

@customElement('chess-app')
export class ChessApp extends LitElement {

  render() {
    const knightPiece = ChessPieceFactory.createPiece('knight', ChessPieceColour.WHITE);

    return html`
      <div>Chess Game</div>
      <pawn-piece .colour=${ChessPieceColour.WHITE}></pawn-piece>
      <pawn-piece .colour=${ChessPieceColour.BLACK}></pawn-piece>
      <queen-piece .colour=${ChessPieceColour.WHITE}></queen-piece>
      <queen-piece .colour=${ChessPieceColour.BLACK}></queen-piece>
      <knight-piece .colour=${ChessPieceColour.WHITE}></knight-piece>
      <knight-piece .colour=${ChessPieceColour.BLACK}></knight-piece>
      <bishop-piece .colour=${ChessPieceColour.WHITE}></bishop-piece>
      <bishop-piece .colour=${ChessPieceColour.BLACK}></bishop-piece>
      <king-piece .colour=${ChessPieceColour.WHITE}></king-piece>
      <king-piece .colour=${ChessPieceColour.BLACK}></king-piece>
      <rook-piece .colour=${ChessPieceColour.WHITE}></rook-piece>
      <rook-piece .colour=${ChessPieceColour.BLACK}></rook-piece>
      ${knightPiece}
    `;
  }
}
