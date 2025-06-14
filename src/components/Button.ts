// Copyright (C) <2025>  <James Tipping> <github.com/James-Tipping>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ButtonClickedEvent } from '../types/EventTypes';
// Import the ButtonState enum
import { ButtonState } from '../types/ChessBoardElementTypes'; // Adjust path if needed

@customElement('button-element')
export class ButtonElement extends LitElement {
  static styles = css`
    button {
      color: var(--button-primary-text, white);
      padding: 0.6em 1.2em;
      border-radius: 0.3rem;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 500;
      text-align: center;
      vertical-align: middle;
      transition:
        color 0.15s ease-in-out,
        background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out,
        box-shadow 0.15s ease-in-out;
      /* Default to primary button style variables */
      background-color: var(--button-primary-bg, #0d6efd);
      border: 1px solid var(--button-primary-border, #0d6efd);
    }

    button.primary {
      color: var(--button-primary-text, white);
      background-color: var(--button-primary-bg, #0d6efd);
      border-color: var(--button-primary-border, #0d6efd);
    }

    button.danger {
      color: var(--button-danger-text, white);
      background-color: var(--button-danger-bg, #dc3545);
      border-color: var(--button-danger-border, #dc3545);
    }

    button.secondary {
      color: var(--button-secondary-text, white);
      background-color: var(--button-secondary-bg, #6c757d);
      border-color: var(--button-secondary-border, #6c757d);
    }

    button:hover {
      opacity: 0.9;
    }

    /* Focus styles for accessibility */
    button:focus-visible {
      outline: 2px solid var(--button-primary-bg, #0d6efd);
      outline-offset: 2px;
    }
    button.danger:focus-visible {
      outline-color: var(--button-danger-bg, #dc3545);
    }
    button.secondary:focus-visible {
      outline-color: var(--button-secondary-bg, #6c757d);
    }

    button:active {
      transform: scale(0.95);
      filter: brightness(90%);
    }
  `;

  @property({ type: String })
  buttonState: ButtonState = ButtonState.PRIMARY;

  @property({ type: String, reflect: true })
  label?: string;

  protected handleButtonClicked() {
    this.dispatchEvent(new ButtonClickedEvent());
  }

  render() {
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
