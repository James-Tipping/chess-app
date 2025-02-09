import { ReactiveController, ReactiveControllerHost } from 'lit';
import { Chess } from 'chess.js';

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

  movePiece(from: string, to: string, promotion: string = 'q') {
    try {
      this._game?.move({ from, to, promotion });
    } catch (e) {
      console.warn(e);
    }
    this._host.requestUpdate();
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
}
