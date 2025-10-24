import { describe, test, expect, beforeAll } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { GameOver } from "./GameOver";
import type { Pokemon } from "@/types/pokemon";

// Mock data
const mockPikachu: Pokemon = {
  id: 25,
  name: "pikachu",
  frenchName: "Pikachu",
  sprites: {
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    back_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png",
    front_shiny:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png",
    back_shiny:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/25.png",
  },
  types: [
    {
      type: {
        name: "electric",
      },
    },
  ],
  height: 4,
  weight: 60,
  stats: [
    {
      base_stat: 35,
      stat: {
        name: "hp",
      },
    },
  ],
};

const mockCharizard: Pokemon = {
  id: 6,
  name: "charizard",
  frenchName: "Dracaufeu",
  sprites: {
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
    back_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/6.png",
    front_shiny:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/6.png",
    back_shiny:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/6.png",
  },
  types: [
    {
      type: {
        name: "fire",
      },
    },
    {
      type: {
        name: "flying",
      },
    },
  ],
  height: 17,
  weight: 905,
  stats: [
    {
      base_stat: 78,
      stat: {
        name: "hp",
      },
    },
  ],
};

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
