import { LitElement, TemplateResult } from "lit";
import { property } from "lit/decorators.js";

export enum ChessPieceColour {
  WHITE = 'white',
  BLACK = 'black'
};

export enum ChessPieceType {
  PAWN = 'pawn',
  ROOK = 'rook',
  KNIGHT = 'knight',
  BISHOP = 'bishop',
  QUEEN = 'queen',
  KING = 'king'
};

export abstract class AbstractBasePiece extends LitElement {
  @property({ type: String }) colour?: ChessPieceColour;

  @property({ type: Boolean }) isSelected? = false;

  constructor(colour: ChessPieceColour) {
    super();
    this.colour = colour;
  }

  abstract render(): TemplateResult;
}