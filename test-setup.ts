import { Window as HappyDomWindow } from "happy-dom";

// Set up DOM environment for React testing
const window = new HappyDomWindow();
global.document = window.document as unknown as Document;
global.window = window as unknown as (Window & typeof globalThis);
global.navigator = window.navigator as unknown as Navigator;
global.HTMLElement = window.HTMLElement as unknown as typeof HTMLElement;
global.Element = window.Element as unknown as typeof Element;

