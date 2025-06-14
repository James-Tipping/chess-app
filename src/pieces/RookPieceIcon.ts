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

@customElement('rook-piece-icon')
export class RookPieceIcon extends AbstractBasePieceIcon {
  render() {
    if (this.colour === ChessPieceColour.WHITE) {
      return html`
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="${this.size}"
          height="${this.size}"
          viewBox="0 0 45 45"
        >
          <g
            style="opacity:1; fill:#ffffff; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;"
            transform="translate(0,0.3)"
          >
            <path
              d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "
              style="stroke-linecap:butt;"
            />
            <path
              d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "
              style="stroke-linecap:butt;"
            />
            <path
              d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14"
              style="stroke-linecap:butt;"
            />
            <path d="M 34,14 L 31,17 L 14,17 L 11,14" />
            <path
              d="M 31,17 L 31,29.5 L 14,29.5 L 14,17"
              style="stroke-linecap:butt; stroke-linejoin:miter;"
            />
            <path d="M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5" />
            <path
              d="M 11,14 L 34,14"
              style="fill:none; stroke:#000000; stroke-linejoin:miter;"
            />
          </g>
        </svg>
      `;
    }
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="${this.size}"
        height="${this.size}"
        viewBox="0 0 45 45"
      >
        <g
          style="opacity:1; fill:#000000; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;"
          transform="translate(0,0.3)"
        >
          <path
            d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "
            style="stroke-linecap:butt;"
          />
          <path
            d="M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z "
            style="stroke-linecap:butt;"
          />
          <path
            d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "
            style="stroke-linecap:butt;"
          />
          <path
            d="M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z "
            style="stroke-linecap:butt;stroke-linejoin:miter;"
          />
          <path
            d="M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z "
            style="stroke-linecap:butt;"
          />
          <path
            d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z "
            style="stroke-linecap:butt;"
          />
          <path
            d="M 12,35.5 L 33,35.5 L 33,35.5"
            style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;"
          />
          <path
            d="M 13,31.5 L 32,31.5"
            style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;"
          />
          <path
            d="M 14,29.5 L 31,29.5"
            style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;"
          />
          <path
            d="M 14,16.5 L 31,16.5"
            style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;"
          />
          <path
            d="M 11,14 L 34,14"
            style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;"
          />
        </g>
      </svg>
    `;
  }
}
