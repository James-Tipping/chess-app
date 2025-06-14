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

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { AbstractBasePieceIcon } from './AbstractBasePieceIcon';
import { ChessPieceColour } from '../types/ChessBoardElementTypes';

@customElement('pawn-piece-icon')
export class PawnPieceIcon extends AbstractBasePieceIcon {
  render() {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="${this.size}"
        height="${this.size}"
        viewBox="0 0 45 45"
      >
        <path
          d="m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 H 34 C 34,31.58 29.59,27.09 26.59,26.03 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z"
          style="opacity:1; fill:${this.colour === ChessPieceColour.WHITE
            ? '#ffffff'
            : '#000000'}; fill-opacity:1; fill-rule:nonzero; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:miter; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;"
        />
      </svg>
    `;
  }
}
