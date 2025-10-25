import { describe, test, expect, mock } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { ModeSelector } from "./ModeSelector";
import { GameMode } from '@/types/pokemon';


describe("ModeSelector Component", () => {
  const mockOnChange = mock(() => {});

  test("snapshot with blur mode selected", () => {
    const html = renderToStaticMarkup(
      <ModeSelector 
        currentMode={GameMode.BLUR} 
        onModeChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toMatchSnapshot();
  });

  test("snapshot with zoom mode selected", () => {
    const html = renderToStaticMarkup(
      <ModeSelector 
        currentMode={GameMode.ZOOM} 
        onModeChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toMatchSnapshot();
  });

  test("snapshot when disabled", () => {
    const html = renderToStaticMarkup(
      <ModeSelector 
        currentMode={GameMode.BLUR} 
        onModeChange={mockOnChange}
        disabled={true}
      />
    );
    expect(html).toMatchSnapshot();
  });

  test("displays blur mode name", () => {
    const html = renderToStaticMarkup(
      <ModeSelector 
        currentMode={GameMode.BLUR} 
        onModeChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("Mode Flou");
  });

  test("displays zoom mode name", () => {
    const html = renderToStaticMarkup(
      <ModeSelector 
        currentMode={GameMode.ZOOM} 
        onModeChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("Mode Zoom");
  });

  test("contains left arrow button", () => {
    const html = renderToStaticMarkup(
      <ModeSelector 
        currentMode={GameMode.BLUR} 
        onModeChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain('aria-label="Mode précédent"');
  });

  test("contains right arrow button", () => {
    const html = renderToStaticMarkup(
      <ModeSelector 
        currentMode={GameMode.BLUR} 
        onModeChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain('aria-label="Mode suivant"');
  });

  test("has correct layout structure", () => {
    const html = renderToStaticMarkup(
      <ModeSelector 
        currentMode={GameMode.BLUR} 
        onModeChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("flex");
    expect(html).toContain("items-center");
    expect(html).toContain("justify-between");
  });

  test("buttons are disabled when disabled prop is true", () => {
    const html = renderToStaticMarkup(
      <ModeSelector 
        currentMode={GameMode.BLUR} 
        onModeChange={mockOnChange}
        disabled={true}
      />
    );
    expect(html).toContain('disabled=""');
  });

  test("has responsive padding", () => {
    const html = renderToStaticMarkup(
      <ModeSelector 
        currentMode={GameMode.BLUR} 
        onModeChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("p-3");
    expect(html).toContain("sm:p-4");
  });

  test("has centered text", () => {
    const html = renderToStaticMarkup(
      <ModeSelector 
        currentMode={GameMode.BLUR} 
        onModeChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("text-center");
  });

  test("buttons have icon size", () => {
    const html = renderToStaticMarkup(
      <ModeSelector 
        currentMode={GameMode.BLUR} 
        onModeChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("size-9");
  });

  test("applies custom className when provided", () => {
    const html = renderToStaticMarkup(
      <ModeSelector 
        currentMode={GameMode.BLUR} 
        onModeChange={mockOnChange}
        disabled={false}
        className="custom-class"
      />
    );
    expect(html).toContain("custom-class");
  });

  test("has responsive text size", () => {
    const html = renderToStaticMarkup(
      <ModeSelector 
        currentMode={GameMode.BLUR} 
        onModeChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("text-sm");
    expect(html).toContain("sm:text-base");
  });

  test("buttons have outline styling", () => {
    const html = renderToStaticMarkup(
      <ModeSelector 
        currentMode={GameMode.BLUR} 
        onModeChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("border-input");
    expect(html).toContain("bg-background");
  });
});

