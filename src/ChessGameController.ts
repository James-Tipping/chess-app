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
  }

  getAdvantage() {
    return this.evaluateBoard(this._game!);
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
    const bestMove = this.getBestMove(3);
    if (bestMove) {
      this.movePiece(bestMove);
    }
  }

  getBestMove(depth: number = 3): string | null {
    if (!this._game) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, bestMove] = this.minimax(
      this._game,
      depth,
      true,
      -Infinity,
      Infinity,
    );

    return bestMove;
  }

  private evaluateBoard(game: Chess): number {
    const board = game.board();
    let total = 0;
    const pieceValues: { [key: string]: number } = {
      p: 100,
      n: 280,
      b: 320,
      r: 479,
      q: 929,
      k: 60000,
    };

    const pieceSquareTables: { [key: string]: number[] } = {
      p: [
        100, 100, 100, 100, 105, 100, 100, 100, 78, 83, 86, 73, 102, 82, 85, 90,
        7, 29, 21, 44, 40, 31, 44, 7, -17, 16, -2, 15, 14, 0, 15, -13, -26, 3,
        10, 9, 6, 1, 0, -23, -22, 9, 5, -11, -10, -2, 3, -19, -31, 8, -7, -37,
        -36, -14, 3, -31, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      n: [
        -66, -53, -75, -75, -10, -55, -58, -70, -3, -6, 100, -36, 4, 62, -4,
        -14, 10, 67, 1, 74, 73, 27, 62, -2, 24, 24, 45, 37, 33, 41, 25, 17, -1,
        5, 31, 21, 22, 35, 2, 0, -18, 10, 13, 22, 18, 15, 11, -14, -23, -15, 2,
        0, 2, 0, -23, -20, -74, -23, -26, -24, -19, -35, -22, -69,
      ],
      b: [
        -59, -78, -82, -76, -23, -107, -37, -50, -11, 20, 35, -42, -39, 31, 2,
        -22, -9, 39, -32, 41, 52, -10, 28, -14, 25, 17, 20, 34, 26, 25, 15, 10,
        13, 10, 17, 23, 17, 16, 0, 7, 14, 25, 24, 15, 8, 25, 20, 15, 19, 20, 11,
        6, 7, 6, 20, 16, -7, 2, -15, -12, -14, -15, -10, -10,
      ],
      r: [
        35, 29, 33, 4, 37, 33, 56, 50, 55, 29, 56, 67, 55, 62, 34, 60, 19, 35,
        28, 33, 45, 27, 25, 15, 0, 5, 16, 13, 18, -4, -9, -6, -28, -35, -16,
        -21, -13, -29, -46, -30, -42, -28, -42, -25, -25, -35, -26, -46, -53,
        -38, -31, -26, -29, -43, -44, -53, -30, -24, -18, 5, -2, -18, -31, -32,
      ],
      q: [
        6, 1, -8, -104, 69, 24, 88, 26, 14, 32, 60, -10, 20, 76, 57, 24, -2, 43,
        32, 60, 72, 63, 43, 2, 1, -16, 22, 17, 25, 20, -13, -6, -14, -15, -2,
        -5, -1, -10, -20, -22, -30, -6, -13, -11, -16, -11, -16, -27, -36, -18,
        0, -19, -15, -15, -21, -38, -39, -30, -31, -13, -31, -36, -34, -42,
      ],
      k: [
        4, 54, 47, -99, -99, 60, 83, -62, -32, 10, 55, 56, 56, 55, 10, 3, -62,
        12, -57, 44, -67, 28, 37, -31, -55, 50, 11, -4, -19, 13, 0, -49, -55,
        -43, -52, -28, -51, -47, -8, -50, -47, -42, -43, -79, -64, -32, -29,
        -32, -4, 3, -14, -50, -57, -18, 13, 4, 17, 30, -3, -14, 6, -1, 40, 18,
      ],
    };

    board.forEach((row, rowIndex) => {
      row.forEach((piece, colIndex) => {
        if (piece) {
          const baseValue = pieceValues[piece.type] || 0;
          const table = pieceSquareTables[piece.type];
          let bonus = 0;
          if (table) {
            // For black pieces, flip the row index
            const index =
              piece.color === ChessPieceColour.WHITE
                ? rowIndex * 8 + colIndex
                : (7 - rowIndex) * 8 + colIndex;
            bonus = table[index] || 0;
          }
          total +=
            piece.color === ChessPieceColour.BLACK
              ? baseValue + bonus
              : -(baseValue + bonus);
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
  ): [number, string] {
    if (depth === 0 || game.isGameOver()) {
      if (game.isCheckmate()) {
        return isMaximizingPlayer ? [-Infinity, ''] : [Infinity, ''];
      }
      if (game.isDraw()) {
        return [0, ''];
      }
      return [this.evaluateBoard(game), ''];
    }

    let bestMove = '';
    if (isMaximizingPlayer) {
      let bestScore = -Infinity;
      const moves = game.moves();

      for (const move of moves) {
        game.move(move);
        const [score] = this.minimax(game, depth - 1, false, alpha, beta);
        game.undo();

        if (score > bestScore) {
          bestScore = score;
          bestMove = move;
        }
        // eslint-disable-next-line no-param-reassign
        alpha = Math.max(alpha, bestScore);
        if (beta <= alpha) {
          break;
        }
      }
      return [bestScore, bestMove];
    }
    let bestScore = Infinity;
    const moves = game.moves();

    for (const move of moves) {
      game.move(move);
      const [score] = this.minimax(game, depth - 1, true, alpha, beta);
      game.undo();

      if (score < bestScore) {
        bestScore = score;
        bestMove = move;
      }
      // eslint-disable-next-line no-param-reassign
      beta = Math.min(beta, bestScore);
      if (beta <= alpha) {
        break;
      }
    }
    return [bestScore, bestMove];
  }
}
