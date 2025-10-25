import { describe, test, expect, mock } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { GuessInput } from "./GuessInput";


describe("GuessInput Component", () => {
  const mockOnSubmit = mock(() => {});

  test("snapshot with default props", () => {
    const html = renderToStaticMarkup(
      <GuessInput onSubmit={mockOnSubmit} maxLength={7} disabled={false} />
    );
    expect(html).toMatchSnapshot();
  });

  test("snapshot with short maxLength", () => {
    const html = renderToStaticMarkup(
      <GuessInput onSubmit={mockOnSubmit} maxLength={3} disabled={false} />
    );
    expect(html).toMatchSnapshot();
  });

  test("snapshot with long maxLength", () => {
    const html = renderToStaticMarkup(
      <GuessInput onSubmit={mockOnSubmit} maxLength={12} disabled={false} />
    );
    expect(html).toMatchSnapshot();
  });

  test("snapshot when disabled", () => {
    const html = renderToStaticMarkup(
      <GuessInput onSubmit={mockOnSubmit} maxLength={7} disabled={true} />
    );
    expect(html).toMatchSnapshot();
  });

  test("snapshot without maxLength", () => {
    const html = renderToStaticMarkup(
      <GuessInput onSubmit={mockOnSubmit} disabled={false} />
    );
    expect(html).toMatchSnapshot();
  });

  test("contains input field", () => {
    const html = renderToStaticMarkup(
      <GuessInput onSubmit={mockOnSubmit} maxLength={7} disabled={false} />
    );
    expect(html).toContain('<input');
  });

  test("contains submit button", () => {
    const html = renderToStaticMarkup(
      <GuessInput onSubmit={mockOnSubmit} maxLength={7} disabled={false} />
    );
    expect(html).toContain('Deviner');
  });

  test("has correct placeholder text", () => {
    const html = renderToStaticMarkup(
      <GuessInput onSubmit={mockOnSubmit} maxLength={7} disabled={false} />
    );
    expect(html).toContain('Entrez le nom du Pokemon...');
  });

  test("input has type text", () => {
    const html = renderToStaticMarkup(
      <GuessInput onSubmit={mockOnSubmit} maxLength={7} disabled={false} />
    );
    expect(html).toContain('type="text"');
  });

  test("input has autocomplete off", () => {
    const html = renderToStaticMarkup(
      <GuessInput onSubmit={mockOnSubmit} maxLength={7} disabled={false} />
    );
    expect(html).toContain('autoComplete="off"');
  });

  test("input has maxLength attribute when provided", () => {
    const html = renderToStaticMarkup(
      <GuessInput onSubmit={mockOnSubmit} maxLength={7} disabled={false} />
    );
    expect(html).toContain('maxLength="7"');
  });

  test("button is disabled by default (empty input)", () => {
    const html = renderToStaticMarkup(
      <GuessInput onSubmit={mockOnSubmit} maxLength={7} disabled={false} />
    );
    expect(html).toContain('disabled=""');
  });

  test("input is disabled when disabled prop is true", () => {
    const html = renderToStaticMarkup(
      <GuessInput onSubmit={mockOnSubmit} maxLength={7} disabled={true} />
    );
    expect(html).toContain('disabled=""');
  });

  test("form has correct structure", () => {
    const html = renderToStaticMarkup(
      <GuessInput onSubmit={mockOnSubmit} maxLength={7} disabled={false} />
    );
    expect(html).toContain('<form');
    expect(html).toContain('</form>');
  });

  test("has flex gap layout", () => {
    const html = renderToStaticMarkup(
      <GuessInput onSubmit={mockOnSubmit} maxLength={7} disabled={false} />
    );
    expect(html).toContain('gap-2');
  });

  test("input has flex-1 class", () => {
    const html = renderToStaticMarkup(
      <GuessInput onSubmit={mockOnSubmit} maxLength={7} disabled={false} />
    );
    expect(html).toContain('flex-1');
  });

  test("button has type submit", () => {
    const html = renderToStaticMarkup(
      <GuessInput onSubmit={mockOnSubmit} maxLength={7} disabled={false} />
    );
    expect(html).toContain('type="submit"');
  });

  test("applies custom className when provided", () => {
    const html = renderToStaticMarkup(
      <GuessInput 
        onSubmit={mockOnSubmit} 
        maxLength={7} 
        disabled={false}
        className="custom-class"
      />
    );
    expect(html).toContain('custom-class');
  });

  test("has responsive padding classes", () => {
    const html = renderToStaticMarkup(
      <GuessInput onSubmit={mockOnSubmit} maxLength={7} disabled={false} />
    );
    expect(html).toContain('p-3');
    expect(html).toContain('sm:p-4');
  });

  test("maxLength of 3 sets correct attribute", () => {
    const html = renderToStaticMarkup(
      <GuessInput onSubmit={mockOnSubmit} maxLength={3} disabled={false} />
    );
    expect(html).toContain('maxLength="3"');
  });

  test("maxLength of 12 sets correct attribute", () => {
    const html = renderToStaticMarkup(
      <GuessInput onSubmit={mockOnSubmit} maxLength={12} disabled={false} />
    );
    expect(html).toContain('maxLength="12"');
  });
});

