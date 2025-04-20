import { LitElement, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { ChessPieceColour } from '../types/ChessBoardElementTypes';

export abstract class AbstractBasePieceIcon extends LitElement {
  @property({ type: String }) colour?: ChessPieceColour;
  @property({ type: Number }) size: number = 45; // Default size

  constructor(colour: ChessPieceColour, size?: number) {
    super();
    this.colour = colour;
    if (size !== undefined) {
      this.size = size;
    }
  }

  abstract render(): TemplateResult;
}
