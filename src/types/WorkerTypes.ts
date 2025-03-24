import { Move } from 'chess.js';

export interface WorkerMessage {
  depth: number;
  fen: string;
}

export interface WorkerResponse {
  bestMove: Move | null;
  positionsEvaluated: number;
}
