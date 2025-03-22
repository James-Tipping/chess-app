/* eslint-disable no-dupe-class-members */
import { ReactiveController, ReactiveControllerHost } from 'lit';
import { Chess, Move } from 'chess.js';
import { WorkerResponse } from './types/ChessBoardElementTypes';
import { evaluateBoard } from './utils/Utils';

export class ChessGameController implements ReactiveController {
  private _host: ReactiveControllerHost;

  private _game: Chess | null = null;

  private _lastMove?: Move;

  private _worker: Worker;

  constructor(host: ReactiveControllerHost) {
    this._host = host;
    host.addController(this);
    this._worker = new Worker(
      new URL('./utils/MinimaxWorker.js', import.meta.url),
      { type: 'module' },
    );
    this._worker.onmessage = (e: MessageEvent<WorkerResponse>) => {
      const { bestMove } = e.data;
      if (bestMove) {
        this.movePiece(bestMove);
      }
    };
  }

  hostConnected() {
    this._game = new Chess();
  }

  hostDisconnected() {
    this._game = null;
  }

  resetGame() {
    this._game?.reset();
    this._host.requestUpdate();
  }

  movePiece(moveParams: string): void;

  movePiece(moveParams: { from: string; to: string; promotion: string }): void;

  movePiece(moveParams: Move): void;

  movePiece(
    moveParams:
      | {
          from: string;
          to: string;
          promotion: string;
        }
      | string
      | Move,
  ): void {
    try {
      this._lastMove = this._game?.move(moveParams);
    } catch (e) {
      console.warn(e);
    }
    this._host.requestUpdate();
  }

  get blackAdvantage() {
    return evaluateBoard(this._game!);
  }

  get whiteAdvantage() {
    return -evaluateBoard(this._game!);
  }

  get inCheck() {
    return this._game?.inCheck();
  }

  get isDraw() {
    return this._game?.isDraw();
  }

  get isCheckmate() {
    return this._game?.isCheckmate();
  }

  get position() {
    return this._game?.fen();
  }

  get isStalemate() {
    return this._game?.isStalemate();
  }

  get isGameOver() {
    return this._game?.isGameOver();
  }

  get turn() {
    return this._game?.turn();
  }

  get lastMove(): Move | undefined {
    return this._lastMove;
  }

  makeAiMove() {
    this._worker.postMessage({ fen: this._game?.fen(), depth: 3 });
  }

  newGame() {
    this._game?.reset();
    this._host.requestUpdate();
  }

  undoMove() {
    this._game?.undo();
    this._game?.undo();
    this._host.requestUpdate();
  }
}
