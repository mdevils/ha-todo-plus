"""Config flow for the Todo Plus integration.

Mirrors the built-in local to-do flow: a single step that asks for the list
name and creates one config entry (one list) per submission.
"""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.config_entries import ConfigFlow, ConfigFlowResult

from .const import CONF_LIST_NAME, DOMAIN

DATA_SCHEMA = vol.Schema({vol.Required(CONF_LIST_NAME): str})


class TodoPlusConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle a config flow for a Todo Plus list."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Create a new to-do list."""
        if user_input is not None:
            return self.async_create_entry(
                title=user_input[CONF_LIST_NAME], data=user_input
            )

        return self.async_show_form(step_id="user", data_schema=DATA_SCHEMA)
