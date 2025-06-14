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

import { css } from 'lit';

export const cssVars = css`
  :host {
    /* Default (Light Mode) Theme Variables */
    --app-background: #ffffff;
    --app-text-color: #212529;
    --app-border-color: #dee2e6;
    --panel-background: #f8f9fa;
    --panel-border-color: var(--app-border-color);
    --panel-text-color: var(--app-text-color);
    --button-primary-bg: #0d6efd;
    --button-primary-text: #ffffff;
    --button-primary-border: var(--button-primary-bg);
    --button-secondary-bg: #6c757d;
    --button-secondary-text: #ffffff;
    --button-secondary-border: var(--button-secondary-bg);
    --button-danger-bg: #dc3545;
    --button-danger-text: #ffffff;
    --button-danger-border: var(--button-danger-bg);
    --link-color: #0d6efd;
    --highlight-bg: #e9ecef;
    --dialog-background: #ffffff;
    --dialog-text-color: var(--app-text-color);
    --dialog-border-color: rgba(0, 0, 0, 0.2);
    --dialog-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  }
  :host([dark-mode]) {
    /* Dark Mode Theme Variable Overrides */
    --app-background: #212529;
    --app-text-color: #dee2e6;
    --app-border-color: #495057;
    --panel-background: #343a40;
    --panel-border-color: var(--app-border-color);
    --panel-text-color: var(--app-text-color);
    --button-primary-bg: #0d6efd; /* Blue often works in dark mode */
    --button-primary-text: #ffffff;
    --button-primary-border: var(--button-primary-bg);
    --button-secondary-bg: #6c757d;
    --button-secondary-text: #ffffff;
    --button-secondary-border: var(--button-secondary-bg);
    --button-danger-bg: #dc3545; /* Red often works */
    --button-danger-text: #ffffff;
    --button-danger-border: var(--button-danger-bg);
    --link-color: #6ea8fe; /* Lighter blue for links */
    --highlight-bg: #495057;
    --dialog-background: #343a40;
    --dialog-text-color: var(--app-text-color);
    --dialog-border-color: rgba(255, 255, 255, 0.2);
    --dialog-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
  }
`;
