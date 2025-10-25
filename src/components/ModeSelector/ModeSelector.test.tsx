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

  test("contains label", () => {
    const html = renderToStaticMarkup(
      <ModeSelector 
        currentMode={GameMode.BLUR} 
        onModeChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("Mode de Jeu");
  });

  test("has select element", () => {
    const html = renderToStaticMarkup(
      <ModeSelector 
        currentMode={GameMode.BLUR} 
        onModeChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("mode-select");
  });

  test("has description box", () => {
    const html = renderToStaticMarkup(
      <ModeSelector 
        currentMode={GameMode.BLUR} 
        onModeChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("bg-muted");
  });

  test("has space-y layout", () => {
    const html = renderToStaticMarkup(
      <ModeSelector 
        currentMode={GameMode.BLUR} 
        onModeChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("space-y-3");
  });

  test("select is disabled when disabled prop is true", () => {
    const html = renderToStaticMarkup(
      <ModeSelector 
        currentMode={GameMode.BLUR} 
        onModeChange={mockOnChange}
        disabled={true}
      />
    );
    expect(html).toContain('disabled=""');
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

  test("displays mode descriptions", () => {
    const html = renderToStaticMarkup(
      <ModeSelector 
        currentMode={GameMode.BLUR} 
        onModeChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("L&#x27;image devient plus claire à chaque tentative");
  });

  test("displays zoom mode description", () => {
    const html = renderToStaticMarkup(
      <ModeSelector 
        currentMode={GameMode.ZOOM} 
        onModeChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("L&#x27;image se dézoome à chaque tentative");
  });
});

