import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './Button';
import { CloseDialogClickedEvent } from '../types/EventTypes';
// Import ButtonState if needed to set the default state for the close button
import { ButtonState } from '../types/ChessBoardElementTypes';

@customElement('dialog-element')
export class DialogElement extends LitElement {
  static styles = css`
    :host {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: clamp(300px, 80vw, 500px);
      max-height: 80vh;
      display: block;
    }
    .dialog-container {
      background-color: var(--panel-background, #f5f5f7);
      color: var(--panel-text-color, #212529);
      border: 1px solid var(--panel-border-color, rgba(0, 0, 0, 0.2));
      box-shadow: var(--panel-box-shadow, 0 8px 32px rgba(0, 0, 0, 0.1));

      border-radius: 0.5rem;
      padding: 1.5rem;
      height: auto;
      overflow-y: auto;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1rem;
    }
    .content-slot {
      flex-grow: 1;
    }
    .button-container {
      display: flex;
      justify-content: flex-end;
    }
  `;

  @property({ type: Boolean, reflect: true, attribute: 'dark-mode' })
  darkMode = false;

  protected onClickClose() {
    this.dispatchEvent(new CloseDialogClickedEvent());
  }

  render() {
    return html`
      <div class="dialog-container">
        <div class="content-slot">
          <slot></slot>
        </div>
        <div class="button-container">
          <button-element
            @button-clicked=${this.onClickClose}
            label="Close"
            .buttonState=${ButtonState.SECONDARY}
          ></button-element>
        </div>
      </div>
    `;
  }
}
