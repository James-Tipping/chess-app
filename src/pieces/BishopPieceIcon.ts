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

import { customElement } from 'lit/decorators.js';
import { html } from 'lit';
import { AbstractBasePieceIcon } from './AbstractBasePieceIcon';
import { ChessPieceColour } from '../types/ChessBoardElementTypes';

@customElement('bishop-piece-icon')
export class BishopPieceIcon extends AbstractBasePieceIcon {
  render() {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="${this.size}"
        height="${this.size}"
        viewBox="0 0 45 45"
      >
        <g
          style="opacity:1; fill:none; fill-rule:evenodd; fill-opacity:1; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;"
          transform="translate(0,0.6)"
        >
          <g
            style="fill:${this.colour === ChessPieceColour.WHITE
              ? '#ffffff'
              : '#000000'}; stroke:#000000; stroke-linecap:butt;"
          >
            <path
              d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.65,38.99 6.68,38.97 6,38 C 7.35,36.54 9,36 9,36 z"
            />
            <path
              d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"
            />
            <path d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z" />
          </g>
          <path
            d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18"
            style="fill:none; stroke:#000000; stroke-linejoin:miter;"
          />
        </g>
      </svg>
    `;
  }
}
