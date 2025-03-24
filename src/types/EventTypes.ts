import { ChessPieceType } from './ChessBoardElementTypes';

export interface ChessPieceDroppedEventDetail {
  source: string;
  target: string;
}

export interface ChessPieceDragStartEventDetail {
  piece: ChessPieceType;
  preventDrag: () => void;
}

export class ChessPieceDroppedEvent extends CustomEvent<ChessPieceDroppedEventDetail> {
  constructor(detail: ChessPieceDroppedEventDetail) {
    super('chess-piece-dropped', { detail, bubbles: true, composed: true });
  }
}

export class ChessPieceDragStartEvent extends CustomEvent<ChessPieceDragStartEventDetail> {
  constructor(detail: ChessPieceDragStartEventDetail) {
    super('chess-piece-drag-start', { detail, bubbles: true, composed: true });
  }
}

export class NewGameClickedEvent extends CustomEvent<void> {
  // eslint-disable-next-line no-undef
  constructor(options?: CustomEventInit) {
    super('new-game-clicked', options);
  }
}

export class DepthChangedEvent extends CustomEvent<number> {
  constructor(depth: number) {
    super('depth-changed', {
      detail: depth,
      bubbles: true,
      composed: true,
    });
  }
}
