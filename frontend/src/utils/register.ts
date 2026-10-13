export function registerCustomElement(name: string, ElementClass: CustomElementConstructor): void {
  if (!customElements.get(name)) {
    customElements.define(name, ElementClass);
  }
}

declare global {
  interface Window {
    customCards?: { type: string; name: string; description: string; preview?: boolean }[];
  }
}

export function registerCustomCard({
  type,
  name,
  description,
}: {
  type: string;
  name: string;
  description: string;
}) {
  window.customCards = window.customCards || [];
  if (!window.customCards.some((c) => c.type === type)) {
    window.customCards.push({
      type,
      name,
      description,
      preview: false,
    });
  }
}
