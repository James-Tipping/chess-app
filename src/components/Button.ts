import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ButtonClickedEvent } from '../types/EventTypes';
// Import the ButtonState enum
import { ButtonState } from '../types/ChessBoardElementTypes'; // Adjust path if needed

@customElement('button-element')
export class ButtonElement extends LitElement {
  static styles = css`
    /* Base button styles using CSS variables */
    button {
      /* Use variables for text color and provide fallback */
      color: var(--button-primary-text, white);
      padding: 0.6em 1.2em; /* Slightly adjusted padding */
      border-radius: 0.3rem;
      cursor: pointer;
      font-size: 0.9rem; /* Slightly smaller font */
      font-weight: 500;
      text-align: center;
      vertical-align: middle;
      user-select: none; /* Prevent text selection */
      transition:
        color 0.15s ease-in-out,
        background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out,
        box-shadow 0.15s ease-in-out;
      /* Default to primary button style variables */
      background-color: var(--button-primary-bg, #0d6efd);
      border: 1px solid var(--button-primary-border, #0d6efd);
    }

    /* Primary state styles (mostly covered by default, but explicit for clarity) */
    button.primary {
      color: var(--button-primary-text, white);
      background-color: var(--button-primary-bg, #0d6efd);
      border-color: var(--button-primary-border, #0d6efd);
    }

    /* Danger state styles */
    button.danger {
      color: var(--button-danger-text, white);
      background-color: var(--button-danger-bg, #dc3545);
      border-color: var(--button-danger-border, #dc3545);
    }

    /* Secondary state styles (Add this if you use ButtonState.SECONDARY) */
    button.secondary {
      color: var(--button-secondary-text, white);
      background-color: var(--button-secondary-bg, #6c757d);
      border-color: var(--button-secondary-border, #6c757d);
    }

    /* Hover/Focus styles - adjust brightness/darkness based on theme potentially */
    /* Simple opacity example for hover */
    button:hover {
      opacity: 0.9;
      /* Or adjust colors slightly, e.g., using filter or specific hover vars */
      /* filter: brightness(95%); */
    }

    /* Focus styles for accessibility */
    button:focus-visible {
      outline: 2px solid var(--button-primary-bg, #0d6efd); /* Use primary color for focus outline */
      outline-offset: 2px;
      /* Or use box-shadow for focus ring */
      /* box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25); */
    }
    /* Adjust focus for danger/secondary if needed */
    button.danger:focus-visible {
      outline-color: var(--button-danger-bg, #dc3545);
    }
    button.secondary:focus-visible {
      outline-color: var(--button-secondary-bg, #6c757d);
    }

    /* Active state animation */
    button:active {
      /* Keep existing animation or refine */
      transform: scale(0.95); /* Slightly less drastic scale */
      filter: brightness(90%); /* Darken slightly when pressed */
    }
  `;

  @property({ type: String })
  buttonState: ButtonState = ButtonState.PRIMARY;

  @property({ type: String })
  label?: string;

  protected handleButtonClicked() {
    this.dispatchEvent(new ButtonClickedEvent());
  }

  render() {
    // classMap applies the correct class based on the buttonState property
    const buttonClasses = classMap({
      primary: this.buttonState === ButtonState.PRIMARY,
      danger: this.buttonState === ButtonState.DANGER,
      secondary: this.buttonState === ButtonState.SECONDARY,
    });

    return html`
      <button class=${buttonClasses} @click=${this.handleButtonClicked}>
        ${this.label}
      </button>
    `;
  }
}
