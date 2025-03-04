import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('dialog-element')
export class DialogElement extends LitElement {
  static styles = css`
    .dialog-container {
      border: 1px solid black;
      padding: 1rem;
      margin: 1rem;
    }
    .title {
      font-size: 1.5rem;
    }
    .message {
      font-size: 1rem;
    }
    .slotted {
    }
  `;

  @property()
  dialogTitle?: string;

  @property()
  dialogMessage?: string;

  render() {
    return html`
      <div class="dialog-container">
        <h2 class="title">${this.dialogTitle}</h2>
        <p class="message">${this.dialogMessage}</p>

        <slot></slot>
      </div>
    `;
  }
}
