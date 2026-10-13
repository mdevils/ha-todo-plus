"""The Todo Plus integration.

Replaces the built-in local to-do system with one that understands start dates
and two flavours of recurrence (see :mod:`.recurrence`). Each config entry is
one list, exposed as a ``todo`` entity so it works with the normal Home
Assistant to-do UI, cards, and ``todo.*`` services. Extra capabilities are
driven through the ``todo_plus.*`` services registered by the todo platform.

The companion Lovelace card is bundled inside this component (``www/``); the
integration serves it and registers it as a frontend module so it is available
automatically (no manual dashboard-resource step), including for HACS installs.
"""

from __future__ import annotations

import logging
import os

from homeassistant.components.frontend import add_extra_js_url
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.typing import ConfigType

from .const import DOMAIN, PLATFORMS
from .store import TodoPlusData

_LOGGER = logging.getLogger(__name__)

CARD_URL = f"/{DOMAIN}/todo-plus-card.js"
CARD_PATH = os.path.join(os.path.dirname(__file__), "www", "todo-plus-card.js")

# Registering a static path / extra JS URL must happen once per HA process.
_FRONTEND_REGISTERED = False


async def _async_register_frontend(hass: HomeAssistant) -> None:
    """Serve the bundled card and load it as a frontend module (once)."""
    global _FRONTEND_REGISTERED
    if _FRONTEND_REGISTERED:
        return
    # Set the guard *before* the first await: entries set up concurrently would
    # otherwise all pass the check above and race to register the same route.
    _FRONTEND_REGISTERED = True
    if not os.path.isfile(CARD_PATH):
        _FRONTEND_REGISTERED = False
        _LOGGER.warning("Todo Plus card bundle not found at %s", CARD_PATH)
        return

    # Static path API changed in 2024.7; support both.
    try:
        from homeassistant.components.http import StaticPathConfig

        await hass.http.async_register_static_paths(
            [StaticPathConfig(CARD_URL, CARD_PATH, False)]
        )
    except ImportError:
        hass.http.register_static_path(CARD_URL, CARD_PATH, False)

    add_extra_js_url(hass, CARD_URL)
    _FRONTEND_REGISTERED = True
    _LOGGER.debug("Registered Todo Plus card at %s", CARD_URL)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Register the bundled card once, before any config entries are set up."""
    await _async_register_frontend(hass)
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up a to-do list from a config entry."""
    # Registration also happens in async_setup; this is a race-safe fallback for
    # anything that reaches an entry without the component setup having run.
    await _async_register_frontend(hass)

    data = TodoPlusData(hass, entry.entry_id)
    await data.async_load()

    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = data

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a to-do list."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unload_ok:
        hass.data[DOMAIN].pop(entry.entry_id, None)
    return unload_ok
