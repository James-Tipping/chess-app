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

import { LitElement, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { ChessPieceColour } from '../types/ChessBoardElementTypes';

export abstract class AbstractBasePieceIcon extends LitElement {
  @property({ type: String }) colour?: ChessPieceColour;

  @property({ type: Number }) size: number = 70; // Default size

  constructor(colour: ChessPieceColour, size?: number) {
    super();
    this.colour = colour;
    if (size !== undefined) {
      this.size = size;
    }
  }

  abstract render(): TemplateResult;
}
