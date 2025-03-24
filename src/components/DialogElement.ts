import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import './Button';

export class CloseDialogClickedEvent extends CustomEvent<void> {
  constructor() {
    super('close-dialog-clicked', { bubbles: true, composed: true });
  }
}

@customElement('dialog-element')
export class DialogElement extends LitElement {
  static styles = css`
    :host {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 400px;
      width: 400px;
    }
    .dialog-container {
      border: none;
      border-radius: 16px;
      padding: 2rem;
      margin: 1rem;
      height: 100%;
      width: 100%;
      background-color: #f5f5f7;
      backdrop-filter: blur(8px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .button-container {
      display: flex;
      justify-content: flex-end;
      margin-top: 1rem;
    }
  `;

  protected onClickClose() {
    this.dispatchEvent(new CloseDialogClickedEvent());
  }

  render() {
    return html`
      <div class="dialog-container">
        <slot></slot>
        <div class="button-container">
          <button-element
            @button-clicked=${this.onClickClose}
            label="Close"
          ></button-element>
        </div>
      </div>
    `;
  }
}
