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
  isDarkMode?: () => boolean;
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
      const isDarkMode =
        typeof this._dialogProperties.isDarkMode === 'function'
          ? this._dialogProperties.isDarkMode()
          : false;
      this._dialogElement.darkMode = isDarkMode;
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
