import { describe, test, expect, beforeAll } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { GameOver } from "./GameOver";
import { mockCharizard, mockPikachu} from './mock-data'


describe("GameOver Component", () => {
  test("snapshot with Pikachu", () => {
    const html = renderToStaticMarkup(<GameOver pokemon={mockPikachu} />);
    expect(html).toMatchSnapshot();
  });

  test("snapshot with Charizard (French name)", () => {
    const html = renderToStaticMarkup(<GameOver pokemon={mockCharizard} />);
    expect(html).toMatchSnapshot();
  });

  test("snapshot with null pokemon", () => {
    const html = renderToStaticMarkup(<GameOver pokemon={null} />);
    expect(html).toMatchSnapshot();
  });

  test("contains game over emoji and text", () => {
    const html = renderToStaticMarkup(<GameOver pokemon={mockPikachu} />);
    expect(html).toContain("😞 Game Over");
  });

  test("displays pokemon french name", () => {
    const html = renderToStaticMarkup(<GameOver pokemon={mockPikachu} />);
    expect(html).toContain("Pikachu");
  });

  test("displays correct french name for Charizard", () => {
    const html = renderToStaticMarkup(<GameOver pokemon={mockCharizard} />);
    expect(html).toContain("Dracaufeu");
  });

  test("has correct CSS classes", () => {
    const html = renderToStaticMarkup(<GameOver pokemon={mockPikachu} />);
    expect(html).toContain("border-red-500");
    expect(html).toContain("bg-red-50");
  });

  test("contains strong tag for pokemon name", () => {
    const html = renderToStaticMarkup(<GameOver pokemon={mockPikachu} />);
    expect(html).toContain("<strong>");
    expect(html).toContain("</strong>");
  });
});
