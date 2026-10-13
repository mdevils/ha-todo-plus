import { h, render } from 'preact';

import { DEFAULT_LAYOUT } from '../constants';
import type { TodoService } from '../providers/todo-service';
import type { CardConfig, Hass, Person } from '../types';
import { registerCustomElement } from '../utils/register';
import { CardRoot } from './card-root';

const PERSON_PREFIX = 'person.';

/** Map the `person.*` entities to assignable people. */
function readPersons(hass: Hass): Person[] {
  return Object.keys(hass.states)
    .filter((entityId) => entityId.startsWith(PERSON_PREFIX))
    .map((entityId) => ({
      id: entityId,
      name: hass.states[entityId].attributes.friendly_name ?? entityId.slice(PERSON_PREFIX.length),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export class App extends HTMLElement {
  protected _hass?: Hass;
  protected _root?: ShadowRoot;
  protected _config?: CardConfig;

  // Stable identity across renders (so it never busts the memo), reads the
  // latest hass/config at call time, and is pre-bound to the entity.
  private readonly callService: TodoService = (service, data = {}) => {
    if (!this._hass || !this._config) return Promise.resolve();
    return this._hass
      .callService('todo_plus', service, { entity_id: this._config.entity, ...data })
      .then(() => undefined);
  };

  set hass(hass: Hass) {
    this._hass = hass;
    this.render();
  }
  setConfig(config: CardConfig): void {
    this._config = config;
    this.render();
  }
  connectedCallback() {
    this.render();
  }
  protected render() {
    if (!this._config || !this._hass) {
      return;
    }
    if (!this._root) {
      if (this.shadowRoot) {
        this._root = this.shadowRoot;
      } else {
        this._root = this.attachShadow({ mode: 'open' });
      }
    }
    const { entity, layout, title } = this._config;
    render(
      <CardRoot
        title={title ?? this._hass.states[entity].attributes.friendly_name ?? 'TODO'}
        layout={layout ?? DEFAULT_LAYOUT}
        tasks={this._hass.states[entity].attributes.tasks ?? []}
        persons={readPersons(this._hass)}
        locale={this._hass.locale ?? { language: 'en' }}
        callService={this.callService}
      />,
      this._root,
    );
  }
  disconnectedCallback() {
    if (this._root) {
      render(null, this._root);
      this._root = undefined;
    }
  }
}

registerCustomElement('todo-plus-card', App);
