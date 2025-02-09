import { LitElement, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { ChessPieceColour } from '../types/ChessBoardElementTypes';

export abstract class AbstractBasePieceIcon extends LitElement {
  @property({ type: String }) colour?: ChessPieceColour;

  constructor(colour: ChessPieceColour) {
    super();
    this.colour = colour;
  }

  abstract render(): TemplateResult;
}
