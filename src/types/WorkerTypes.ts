import { Move } from 'chess.js';

export interface WorkerMessage {
  depth: number;
  pgn: string;
}

export interface WorkerResponse {
  bestMove: Move | null;
  positionsEvaluated: number;
}
