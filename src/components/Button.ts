import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ButtonClickedEvent } from '../types/EventTypes';
import { ButtonState } from '../types';

@customElement('button-element')
export class ButtonElement extends LitElement {
  static styles = css`
    .buttons-container {
      display: flex;
      justify-content: space-around;
      width: 100%;
    }
    button.primary {
      background-color: #397fed;
      border: 2px solid #2361c2;
    }
    button.danger {
      background-color: #d9534f;
      border: 2px solid #c9302c;
    }
    button {
    color: white;
    padding: 0.5rem;
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

  @property()
  buttonState: ButtonState = ButtonState.PRIMARY;

  protected handleButtonClicked() {
    this.dispatchEvent(new ButtonClickedEvent());
  }

  render() {
    const buttonStateClasses = classMap({
      primary: this.buttonState === ButtonState.PRIMARY,
      danger: this.buttonState === ButtonState.DANGER,
    });

    return html`
      <div class="button-container ">
        <button class=${buttonStateClasses} @click=${this.handleButtonClicked}>
          ${this.label}
        </button>
      </div>
    `;
  }
}
