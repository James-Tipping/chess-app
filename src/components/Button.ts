import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ButtonClickedEvent } from '../types/EventTypes';

@customElement('button-element')
export class ButtonElement extends LitElement {
  static styles = css`
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
  label?: string;

  protected handleButtonClicked() {
    this.dispatchEvent(new ButtonClickedEvent());
  }

  render() {
    return html`
      <div class="button-container">
        <button @click=${this.handleButtonClicked}>${this.label}</button>
      </div>
    `;
  }
}
