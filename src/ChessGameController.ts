/* eslint-disable no-dupe-class-members */
import { ReactiveController, ReactiveControllerHost } from 'lit';
import { Chess } from 'chess.js';
import { ChessPieceColour } from './types/ChessBoardElementTypes';

export class ChessGameController implements ReactiveController {
  private _host: ReactiveControllerHost;

  private _game: Chess | null = null;

  constructor(host: ReactiveControllerHost) {
    this._host = host;
    host.addController(this);
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

  movePiece(
    moveParams:
      | {
          from: string;
          to: string;
          promotion: string;
        }
      | string,
  ): void {
    try {
      this._game?.move(moveParams);
    } catch (e) {
      console.warn(e);
    }
    this._host.requestUpdate();
    // if (this._game?.turn() === 'b' && !this._game.isGameOver()) {
    //   this.makeAIMove();
    // }
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

  get isGameOver() {
    return this._game?.isGameOver();
  }

  get turn() {
    return this._game?.turn();
  }

  makeAiMove() {
    const bestMove = this.getBestMove(5);
    if (bestMove) {
      this.movePiece(bestMove);
    }
  }

  getBestMove(depth: number = 3): string | null {
    if (!this._game) return null;

    const alpha = -Infinity;
    const beta = Infinity;
    let bestScore = -Infinity;
    let bestMove: string | null = null;

    const moves = this._game.moves();

    for (const move of moves) {
      this._game.move(move);
      const score = this.minimax(this._game, depth - 1, true, alpha, beta);
      this._game.undo();
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    return bestMove;
  }

  private evaluateBoard(game: Chess): number {
    const board = game.board();
    let total = 0;
    const pieceValues: { [key: string]: number } = {
      p: 10,
      n: 30,
      b: 30,
      r: 50,
      q: 90,
      k: 900,
    };

    board.forEach(row => {
      row.forEach(piece => {
        if (piece) {
          const value = pieceValues[piece.type] || 0;
          total += piece.color === ChessPieceColour.WHITE ? value : -value;
        }
      });
    });
    return total;
  }

  minimax(
    game: Chess,
    depth: number,
    isMaximizingPlayer: boolean,
    alpha: number,
    beta: number,
  ): number {
    if (depth === 0 || game.isGameOver()) {
      return this.evaluateBoard(game);
    }

    if (isMaximizingPlayer) {
      let maxEval = -Infinity;
      const moves = game.moves();
      for (const move of moves) {
        game.move(move);
        const score = this.minimax(game, depth - 1, false, alpha, beta);
        game.undo();
        maxEval = Math.max(maxEval, score);
        // eslint-disable-next-line no-param-reassign
        alpha = Math.max(alpha, score);
        if (beta <= alpha) {
          break;
        }
      }
      return maxEval;
    }
    let minEval = Infinity;
    const moves = game.moves();
    for (const move of moves) {
      game.move(move);
      const score = this.minimax(game, depth - 1, true, alpha, beta);
      game.undo();
      minEval = Math.min(minEval, score);
      // eslint-disable-next-line no-param-reassign
      beta = Math.min(beta, score);
      if (beta <= alpha) {
        break;
      }
    }
    return minEval;
  }
}
