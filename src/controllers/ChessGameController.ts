/* eslint-disable no-dupe-class-members */
import { ReactiveController, ReactiveControllerHost } from 'lit';
import { Chess, Move, Square } from 'chess.js';
import { WorkerResponse } from '../types/WorkerTypes';
import { evaluateBoard } from '../utils/Utils';

export class ChessGameController implements ReactiveController {
  private _host: ReactiveControllerHost;

  private _game: Chess | null = null;

  private _lastMove?: Move | null = null;

  private _worker!: Worker;

  private _positionsEvaluated: number = 0;

  private _searchDepth: number = 3;

  private _isAIvsAIMode: boolean = false;

  private _isThinking: boolean = false;

  constructor(host: ReactiveControllerHost) {
    this._host = host;
    host.addController(this);
    // Worker initialization moved to hostConnected
  }

  private initialiseWorker() {
    // Ensure this only runs client-side
    if (typeof window === 'undefined') return;

    this._worker = new Worker(
      new URL('../utils/MinimaxWorker.js', import.meta.url),
      { type: 'module' },
    );
    this._worker.onmessage = (e: MessageEvent<WorkerResponse>) => {
      const { bestMove, positionsEvaluated } = e.data;
      this._positionsEvaluated = positionsEvaluated;
      this._isThinking = false;

      if (bestMove && !this.isGameOver) {
        this.movePiece(bestMove);
        if (this._isAIvsAIMode && !this.isGameOver) {
          this.makeAiMove();
        }
      } else if (this._isAIvsAIMode && this.isGameOver) {
        this._host.requestUpdate();
      }
    };
  }

  hostConnected() {
    this._game = new Chess();
    // Initialize worker only in the browser
    if (typeof window !== 'undefined') {
      this.initialiseWorker();
    }
  }

  hostDisconnected() {
    this._game = null;
    // Terminate worker if it exists
    this._worker?.terminate();
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

  get isThreefoldRepetition() {
    return this._game?.isThreefoldRepetition();
  }

  get isInsufficientMaterial() {
    return this._game?.isInsufficientMaterial();
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

  get lastMove(): Move | undefined | null {
    return this._lastMove;
  }

  get positionsEvaluated(): number {
    return this._positionsEvaluated;
  }

  get searchDepth(): number {
    return this._searchDepth;
  }

  set searchDepth(depth: number) {
    this._searchDepth = depth;
  }

  get isAIvsAIMode(): boolean {
    return this._isAIvsAIMode;
  }

  getValidMoves = (squareId: Square) => {
    const moves = this._game?.moves({ square: squareId, verbose: true }) || [];
    const squaresToMoveTo = moves.map(move => move.to);
    return squaresToMoveTo;
  };

  startAIvsAIMode() {
    this._isAIvsAIMode = true;
    this._game?.reset();
    this._lastMove = null;
    this._isThinking = false;
    this._host.requestUpdate();

    if (!this.isGameOver) {
      this.makeAiMove();
    }
  }

  stopAIvsAIMode() {
    this._isAIvsAIMode = false;
    this._isThinking = false;

    // Terminate existing worker if it exists
    this._worker?.terminate();
    // Re-initialize worker only in the browser
    if (typeof window !== 'undefined') {
      this.initialiseWorker();
    }

    this._game?.reset();
    this._lastMove = null;
    this._host.requestUpdate();
  }

  makeAiMove() {
    // Ensure worker exists and we are in a browser context before posting message
    if (
      this._worker &&
      typeof window !== 'undefined' &&
      !this._isThinking &&
      !this.isGameOver
    ) {
      this._isThinking = true;
      this._worker.postMessage({
        pgn: this._game?.pgn(),
        depth: this._searchDepth,
      });
    } else {
      console.warn('cant make move');
    }
  }

  newGame() {
    if (this._isAIvsAIMode) {
      this.stopAIvsAIMode();
    } else {
      this._game?.reset();
      this._lastMove = null;
      this._host.requestUpdate();
    }
  }

  undoMove() {
    this._game?.undo();
    this._game?.undo();
    this._lastMove = null;
    this._host.requestUpdate();
  }
}
