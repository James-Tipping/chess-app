import {
  adoptStyles,
  CSSResultOrNative,
  ReactiveController,
  ReactiveControllerHost,
  render,
  TemplateResult,
} from 'lit';
import { CloseDialogEvent } from '../types/EventTypes';
import { DialogElement } from '../components';
import '../components/DialogElement';

export interface DialogProperties {
  contentRenderer: () => TemplateResult;
  styles?: Array<CSSResultOrNative>;
}

export class DialogController implements ReactiveController {
  private _host: ReactiveControllerHost;

  private _dialogElement: DialogElement | null = null;

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

  public async show() {
    if (this._dialogElement == null) {
      this._dialogElement = document.createElement(
        'dialog-element',
      ) as DialogElement;
      document.body.appendChild(this._dialogElement);
      this._dialogElement.addEventListener(
        'close-dialog-clicked',
        this.boundDispatchCloseEvent,
      );
    }
    if (
      this._dialogElement != null &&
      this._dialogElement?.shadowRoot != null &&
      this._dialogProperties.styles
    ) {
      adoptStyles(
        this._dialogElement.shadowRoot,
        this._dialogProperties.styles,
      );
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

  hostConnected(): void {}
}
