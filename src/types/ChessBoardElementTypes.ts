import { Move } from 'chess.js';

export enum SquareColour {
  LIGHT = 'l',
  DARK = 'd',
}

export enum ChessPieceColour {
  WHITE = 'w',
  BLACK = 'b',
}

export enum ChessPieceType {
  WHITE_KING = 'K',
  WHITE_QUEEN = 'Q',
  WHITE_ROOK = 'R',
  WHITE_BISHOP = 'B',
  WHITE_KNIGHT = 'N',
  WHITE_PAWN = 'P',

  BLACK_KING = 'k',
  BLACK_QUEEN = 'q',
  BLACK_ROOK = 'r',
  BLACK_BISHOP = 'b',
  BLACK_KNIGHT = 'n',
  BLACK_PAWN = 'p',
}

export enum DialogMessage {
  LOSE = 'You lose!',
  WIN = 'Well done! You win!',
  STALEMATE = "Oops, it's a stalemate!",
}

export interface WorkerMessage {
  depth: number;
  fen: string;
}

export interface WorkerResponse {
  bestMove: Move | null;
}
