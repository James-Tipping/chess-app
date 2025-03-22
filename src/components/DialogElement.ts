import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export class CloseDialogEvent extends CustomEvent<void> {
  constructor() {
    super('close-dialog', { bubbles: true, composed: true });
  }
}

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
    ::slotted {
      display: flex;
      justify-content: space-between;
    }
  `;

  @property()
  dialogTitle?: string;

  @property()
  dialogMessage?: string;

  @property()
  dialogOpen?: boolean = false;

  onClickClose() {
    this.dispatchEvent(new CloseDialogEvent());
  }

  render() {
    return html`
      ${this.dialogOpen
        ? html`
            <div class="dialog-container">
              <h2 class="title">${this.dialogTitle}</h2>
              <p class="message">${this.dialogMessage}</p>
              <button @click=${this.onClickClose}>Close</button>
            </div>
          `
        : nothing}
    `;
  }
}
