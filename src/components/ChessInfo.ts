import { html, LitElement } from 'lit';
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

@customElement('chess-info')
export class ChessInfo extends LitElement {
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
        <button @click=${this.newGameClicked}>New Game</button>
        <button @click=${this.undoClicked}>Undo</button>
      </div>
    `;
  }
}
