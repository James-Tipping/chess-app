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
// Import ButtonState from the correct location
import { ButtonState } from '../types/ChessBoardElementTypes';

@customElement('chess-panel')
export class ChessPanel extends LitElement {
  static styles = css`
    /* Use CSS variables defined by the host (ChessApp) */
    .info-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 0.2rem;
      /* Use panel variables */
      background-color: var(--panel-background, #f8f9fa); /* Fallback */
      border: 1px solid var(--panel-border-color, #dee2e6); /* Fallback */
      color: var(--panel-text-color, #212529); /* Fallback */
      gap: 1rem;
      padding: 1.5rem; /* Adjusted padding */
      box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075); /* Optional subtle shadow */
      width: 300px; /* Give it a defined width */
      box-sizing: border-box;
    }
    .title {
      font-size: 2rem; /* Slightly smaller title */
      font-weight: 500;
      margin-bottom: 0.5rem;
      color: inherit; /* Inherit color from container */
      text-align: center; /* Center title */
    }
    .info-text {
      font-size: 1.1rem; /* Slightly adjusted size */
      text-align: center;
      color: inherit; /* Inherit color from container */
      line-height: 1.5;
    }
    .buttons-container {
      display: flex;
      justify-content: space-around;
      width: 100%;
      gap: 1rem; /* Add gap between buttons */
    }
    .depth-selector {
      display: flex;
      align-items: center;
      gap: 0.8rem; /* Adjusted gap */
      width: 100%;
      justify-content: center; /* Center the selector items */
    }
    .depth-selector label {
       font-size: 1rem;
       color: inherit; /* Inherit color */
    }
    .depth-selector select {
      padding: 0.5rem;
      font-size: 1rem;
      border-radius: 0.3rem;
      /* Use app variables for form elements */
      background-color: var(--app-background, #ffffff);
      color: var(--app-text-color, #212529);
      border: 1px solid var(--app-border-color, #ced4da);
    }
    /* Style focus state for accessibility */
    .depth-selector select:focus {
       border-color: var(--button-primary-bg, #0d6efd); /* Use primary color for focus */
       outline: 0;
       box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25); /* Match Bootstrap focus */
    }
    .section-divider {
      width: 100%;
      height: 1px;
      /* Use border color for the divider */
      background-color: var(--app-border-color, #dee2e6);
      margin: 1rem 0; /* Adjusted margin */
    }

    /* Ensure button-element itself uses the CSS vars internally */
    /* No specific styles needed here if button-element handles its own theming */
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
    // Remove state update, handled by ChessApp/Controller
    this.dispatchEvent(new AIvsAIStartEvent());
  }

  protected stopAIvsAI() {
    // Remove state update, handled by ChessApp/Controller
    this.dispatchEvent(new AIvsAIStopEvent());
  }

  render() {
    // Format advantage to one decimal place
    const advantageDisplay = this.playerAdvantage.toFixed(1);

    return html`
      <div class="info-container">
        <div class="title">Minimax Chess</div>
        <div class="info-text">Player Advantage: ${advantageDisplay}</div>
        <div class="info-text">
          Positions Evaluated: ${this.positionsEvaluated.toLocaleString()}
        </div>

        <div class="depth-selector">
          <label for="depth">AI Depth:</label>
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
            .buttonState=${ButtonState.PRIMARY}
          ></button-element>
          <button-element
            @button-clicked=${this.undoClicked}
            label="Undo"
            .buttonState=${ButtonState.SECONDARY} /* Use secondary state */
          ></button-element>
        </div>

        <div class="section-divider"></div>

        <div class="buttons-container">
          ${this.isAIvsAIMode
            ? html`<button-element
                @button-clicked=${this.stopAIvsAI}
                label="Stop AI vs AI"
                .buttonState=${ButtonState.DANGER}
              ></button-element>`
            : html`<button-element
                @button-clicked=${this.startAIvsAI}
                label="Start AI vs AI"
                .buttonState=${ButtonState.PRIMARY}
              ></button-element>`}
        </div>
      </div>
    `;
  }
}
