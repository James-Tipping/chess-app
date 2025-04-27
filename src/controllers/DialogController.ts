import {
  adoptStyles,
  CSSResult,
  ReactiveController,
  ReactiveControllerHost,
  render,
  TemplateResult,
} from 'lit';
import { DialogElement } from '../components/DialogElement';
import { CloseDialogEvent } from '../types/EventTypes';

export interface DialogProperties {
  contentRenderer: () => TemplateResult;
  styles?: () => CSSResult;
}

export class DialogController implements ReactiveController {
  private _host: ReactiveControllerHost;

  private _dialogElement: HTMLElement | null = null;

  private _dialogProperties: DialogProperties;

  constructor(
    host: ReactiveControllerHost,
    dialogProperties: DialogProperties,
  ) {
    (this._host = host).addController(this);
    this._dialogProperties = dialogProperties;
  }

  protected dispatchCloseEvent() {
    if (this._host instanceof HTMLElement)
      this._host.dispatchEvent(new CloseDialogEvent());
  }

  protected boundDispatchCloseEvent = this.dispatchCloseEvent.bind(this);

  public show() {
    if (this._dialogElement == null) {
      this._dialogElement = document.createElement('dialog-element');
      document.body.appendChild(this._dialogElement);
      this._dialogElement.addEventListener(
        'close-dialog-clicked',
        this.boundDispatchCloseEvent,
      );
    }
    if (
      this._dialogElement.shadowRoot != null &&
      this._dialogProperties.styles
    ) {
      adoptStyles(this._dialogElement.shadowRoot, [
        DialogElement.styles,
        this._dialogProperties.styles(),
      ]);
    }
    render(this._dialogProperties.contentRenderer(), this._dialogElement);
  }

  public hide() {
    if (this._dialogElement != null) {
      this._dialogElement.removeEventListener(
        'close-dialog-clicked',
        this.boundDispatchCloseEvent,
      );
      this._dialogElement.remove();
      this._dialogElement = null;
    }
  }

  hostConnected(): void { }
}
