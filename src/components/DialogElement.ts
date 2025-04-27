import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import './Button';
import { CloseDialogClickedEvent } from '../types/EventTypes';
// Import ButtonState if needed to set the default state for the close button
import { ButtonState } from '../types/ChessBoardElementTypes';

@customElement('dialog-element')
export class DialogElement extends LitElement {
  static styles = css`
    :host {
      /* Use CSS variables for positioning/sizing if needed, but these seem okay */
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      /* Define default size, can be overridden by specific dialog needs if necessary */
      width: clamp(300px, 80vw, 500px); /* Responsive width */
      max-height: 80vh; /* Prevent excessive height */
      z-index: 1000; /* Ensure dialog is on top */
      display: block; /* Ensure host takes space */
    }
    .dialog-container {
      /* Use CSS variables passed from ChessApp via DialogController */
      background-color: var(--dialog-background, #f5f5f7); /* Fallback */
      color: var(--dialog-text-color, #212529); /* Fallback */
      border: 1px solid var(--dialog-border-color, rgba(0, 0, 0, 0.2)); /* Fallback */
      box-shadow: var(--dialog-box-shadow, 0 8px 32px rgba(0, 0, 0, 0.1)); /* Fallback */

      /* Keep other structural styles */
      border-radius: 0.5rem; /* Adjusted radius */
      padding: 1.5rem; /* Adjusted padding */
      margin: 0; /* Remove margin, host handles positioning */
      height: auto; /* Allow height to adjust to content */
      max-height: inherit; /* Respect host max-height */
      overflow-y: auto; /* Allow scrolling if content overflows */
      width: 100%; /* Fill host width */
      box-sizing: border-box; /* Include padding/border in width/height */
      display: flex;
      flex-direction: column;
      justify-content: space-between; /* Pushes button to bottom if content is short */
      gap: 1rem; /* Add gap between slot and button container */
    }
    .content-slot {
       flex-grow: 1; /* Allow slot content to take available space */
    }
    .button-container {
      display: flex;
      justify-content: flex-end;
      /* No margin-top needed if using gap in flex container */
    }

    /* Ensure the button-element uses the button variables passed down */
    /* button-element styles are handled internally by ButtonElement itself */
  `;

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
            .buttonState=${ButtonState.SECONDARY} /* Example: Use secondary style for close */
          ></button-element>
        </div>
      </div>
    `;
  }
}
