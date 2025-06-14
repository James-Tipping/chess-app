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

import { Square } from 'chess.js';

/*
 * Chess Piece Events
 */

export interface ChessPieceDroppedEventDetail {
  source: Square;
  target: Square;
}

export class ChessPieceDroppedEvent extends CustomEvent<ChessPieceDroppedEventDetail> {
  constructor(customEventInit?: CustomEventInit<ChessPieceDroppedEventDetail>) {
    super('chess-piece-dropped', {
      ...customEventInit,
      bubbles: true,
      composed: true,
    });
  }
}

export interface ChessPieceDragStartEventDetail {
  squareId: Square;
  preventDrag: () => void;
}

export class ChessPieceDragStartEvent extends CustomEvent<ChessPieceDragStartEventDetail> {
  constructor(
    customEventInit?: CustomEventInit<ChessPieceDragStartEventDetail>,
  ) {
    super('chess-piece-drag-start', {
      ...customEventInit,
      bubbles: true,
      composed: true,
    });
  }
}

export interface ChessPieceHoverEventDetail {
  squareId: Square;
}

export class ChessPieceHoverEvent extends CustomEvent<ChessPieceHoverEventDetail> {
  constructor(customEventInit?: CustomEventInit<ChessPieceHoverEventDetail>) {
    super('chess-piece-hover', {
      ...customEventInit,
      bubbles: true,
      composed: true,
    });
  }
}

/*
 * Chess Square Events
 */

export interface ChessSquareHoverEventDetail {
  squareId: Square;
}

export class ChessSquareHoverEvent extends CustomEvent<ChessSquareHoverEventDetail> {
  constructor(customEventInit?: CustomEventInit<ChessSquareHoverEventDetail>) {
    super('chess-square-hover', {
      ...customEventInit,
      bubbles: true,
      composed: true,
    });
  }
}

export class ChessSquareUnhoverEvent extends CustomEvent<ChessSquareHoverEventDetail> {
  constructor(customEventInit?: CustomEventInit<ChessSquareHoverEventDetail>) {
    super('chess-square-unhover', {
      ...customEventInit,
      bubbles: true,
      composed: true,
    });
  }
}

/*
 * Chess Board Events
 */

export interface RequestMoveEventDetail {
  from: Square;
  to: Square;
}

export class RequestMoveEvent extends CustomEvent<RequestMoveEventDetail> {
  constructor(customEventInit?: CustomEventInit<RequestMoveEventDetail>) {
    super('request-move', {
      ...customEventInit,
      bubbles: true,
      composed: true,
    });
  }
}

export class ButtonClickedEvent extends CustomEvent<void> {
  constructor() {
    super('button-clicked', {
      bubbles: true,
      composed: true,
    });
  }
}

export class CloseDialogEvent extends CustomEvent<void> {
  constructor() {
    super('close-dialog', {
      bubbles: true,
      composed: true,
    });
  }
}

export class CloseDialogClickedEvent extends CustomEvent<void> {
  constructor() {
    super('close-dialog-clicked', {
      bubbles: true,
      composed: true,
    });
  }
}

/*
 * Chess Panel Events
 */

export class NewGameClickedEvent extends CustomEvent<void> {
  constructor() {
    super('new-game-clicked', {
      bubbles: true,
      composed: true,
    });
  }
}

export class UndoClickedEvent extends CustomEvent<void> {
  constructor() {
    super('undo-clicked', {
      bubbles: true,
      composed: true,
    });
  }
}

export interface DepthChangedEventDetail {
  depth: number;
}

export class DepthChangedEvent extends CustomEvent<DepthChangedEventDetail> {
  constructor(depth: number) {
    super('depth-changed', {
      detail: { depth },
      bubbles: true,
      composed: true,
    });
  }
}

export class AIvsAIStartEvent extends CustomEvent<void> {
  constructor() {
    super('ai-vs-ai-start', {
      bubbles: true,
      composed: true,
    });
  }
}

export class AIvsAIStopEvent extends CustomEvent<void> {
  constructor() {
    super('ai-vs-ai-stop', {
      bubbles: true,
      composed: true,
    });
  }
}
