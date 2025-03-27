import { ChessPieceType } from './ChessBoardElementTypes';

export interface ChessPieceDroppedEventDetail {
  source: string;
  target: string;
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
  piece: ChessPieceType | null;
  preventDrag: () => void;
}

export class ChessPieceDragStartEvent extends CustomEvent<ChessPieceDragStartEventDetail> {
  constructor(customEventInit?: CustomEventInit<ChessPieceDragStartEventDetail>) {
    super('chess-piece-drag-start', {
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


