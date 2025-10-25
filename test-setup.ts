import { Window as HappyDomWindow } from "happy-dom";

// Set up DOM environment for React testing
const window = new HappyDomWindow();
global.document = window.document as unknown as Document;
global.window = window as unknown as (Window & typeof globalThis);
global.navigator = window.navigator as unknown as Navigator;
global.HTMLElement = window.HTMLElement as unknown as typeof HTMLElement;
global.Element = window.Element as unknown as typeof Element;

// Mock localStorage for tests
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

