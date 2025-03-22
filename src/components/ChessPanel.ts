import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export class NewGameClickedEvent extends CustomEvent<null> {
  // eslint-disable-next-line no-undef
  constructor(eventInitDict?: CustomEventInit<null>) {
    super('new-game-clicked', eventInitDict);
  }
}

export class UndoClickedEvent extends CustomEvent<null> {
  // eslint-disable-next-line no-undef
  constructor(eventInitDict?: CustomEventInit<null>) {
    super('undo-clicked', eventInitDict);
  }
}

@customElement('chess-panel')
export class ChessPanel extends LitElement {
  static styles = css`
    .info-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 0.2rem;
      border: 2px solid grey;
      gap: 1rem;
    }
    .title {
      font-size: 3rem;
    }
    .buttons-container {
      display: flex;
      justify-content: space-around;
      width: 100%;
    }
    button {
    background-color: #397fed;
    color: white;
    padding: 0.5rem;
    border: 2px solid #2361c2;
    border-radius: 0.3rem;
    cursor: pointer;
    }
    button:active {
      animation: click-animation 0.2s;
    }
    @keyframes click-animation {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(0.9);
      }
      100% {
        transform {
          scale(1)
      }
    }
  `;

  @property()
  playerAdvantage: number = 0;

  newGameClicked() {
    this.dispatchEvent(
      new NewGameClickedEvent({ bubbles: true, composed: true }),
    );
  }

  undoClicked() {
    this.dispatchEvent(new UndoClickedEvent({ bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="info-container">
        <div class="title">Minimax Chess Game</div>
        <div class="info-text">Your Advantage: ${this.playerAdvantage}</div>
        <div class="buttons-container">
          <button @click=${this.newGameClicked}>New Game</button>
          <button @click=${this.undoClicked}>Undo</button>
        </div>
      </div>
    `;
  }
}
