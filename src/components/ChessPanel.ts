import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './Button';
import {
  NewGameClickedEvent,
  UndoClickedEvent,
  DepthChangedEvent,
  AIvsAIStartEvent,
  AIvsAIStopEvent,
} from '../types/EventTypes';

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
      padding: 1rem;
    }
    .title {
      font-size: 3rem;
    }
    .info-text {
      font-size: 1.2rem;
      text-align: center;
    }
    .buttons-container {
      display: flex;
      justify-content: space-around;
      width: 100%;
    }
    .depth-selector {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .depth-selector select {
      padding: 0.5rem;
      font-size: 1rem;
      border-radius: 0.3rem;
    }
    .section-divider {
      width: 100%;
      height: 1px;
      background-color: grey;
      margin: 0.5rem 0;
    }
  `;

  @property({ type: Number })
  playerAdvantage: number = 0;

  @property({ type: Number })
  positionsEvaluated: number = 0;

  @property({ type: Number })
  searchDepth: number = 3;

  @property({ type: Boolean })
  isAIvsAIMode: boolean = false;

  protected newGameClicked() {
    this.dispatchEvent(new NewGameClickedEvent());
  }

  protected undoClicked() {
    this.dispatchEvent(new UndoClickedEvent());
  }

  protected depthChanged(e: Event) {
    const select = e.target as HTMLSelectElement;
    const depth = parseInt(select.value, 10);
    this.dispatchEvent(new DepthChangedEvent(depth));
  }

  protected startAIvsAI() {
    this.isAIvsAIMode = true;
    this.dispatchEvent(new AIvsAIStartEvent());
  }

  protected stopAIvsAI() {
    this.isAIvsAIMode = false;
    this.dispatchEvent(new AIvsAIStopEvent());
  }

  render() {
    return html`
      <div class="info-container">
        <div class="title">Minimax Chess Game</div>
        <div class="info-text">Your Advantage: ${this.playerAdvantage}</div>
        <div class="info-text">
          Positions evaluated: ${this.positionsEvaluated.toLocaleString()}
        </div>

        <div class="depth-selector">
          <label for="depth">Search Depth:</label>
          <select
            id="depth"
            .value=${this.searchDepth.toString()}
            @change=${this.depthChanged}
          >
            <option value="2">2 (Fast)</option>
            <option value="3">3 (Normal)</option>
            <option value="4">4 (Strong)</option>
            <option value="5">5 (Expert)</option>
          </select>
        </div>

        <div class="buttons-container">
          <button-element
            @button-clicked=${this.newGameClicked}
            label="New Game"
          ></button-element>
          <button-element
            @button-clicked=${this.undoClicked}
            label="Undo"
          ></button-element>
        </div>

        <div class="section-divider"></div>

        <div class="buttons-container">
          ${this.isAIvsAIMode
            ? html`<button-element
                @button-clicked=${this.stopAIvsAI}
                label="Stop AI vs AI"
              ></button-element>`
            : html`<button-element
                @button-clicked=${this.startAIvsAI}
                label="Start AI vs AI"
              ></button-element>`}
        </div>
      </div>
    `;
  }
}
