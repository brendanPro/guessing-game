import { describe, test, expect } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { PokemonImage } from "./PokemonImage";
import { GameMode } from "@/types/pokemon";
import { mockCharizard, mockPikachu, mockMewtwo, mockGyarados } from './mock-data';


describe("PokemonImage Component", () => {
  test("snapshot with Pikachu maximum effect", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockPikachu} effectLevel={0} gameOver={false} />
    );
    expect(html).toMatchSnapshot();
  });

  test("snapshot with Pikachu half effect", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockPikachu} effectLevel={2} gameOver={false} />
    );
    expect(html).toMatchSnapshot();
  });

  test("snapshot with Pikachu no effect", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockPikachu} effectLevel={5} gameOver={false} />
    );
    expect(html).toMatchSnapshot();
  });

  test("snapshot with Pikachu game over", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockPikachu} effectLevel={0} gameOver={true} />
    );
    expect(html).toMatchSnapshot();
  });

  test("snapshot with Charizard", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockCharizard} effectLevel={2} gameOver={false} />
    );
    expect(html).toMatchSnapshot();
  });

  test("snapshot with null pokemon (loading state)", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={null} effectLevel={0} gameOver={false} />
    );
    expect(html).toMatchSnapshot();
  });

  test("displays loading state when pokemon is null", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={null} effectLevel={0} gameOver={false} />
    );
    expect(html).toContain("Loading Pokemon...");
  });

  test("displays pokemon image when pokemon is provided", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockPikachu} effectLevel={0} gameOver={false} />
    );
    expect(html).toContain(mockPikachu.sprites.front_default);
  });

  test("has correct alt text", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockPikachu} effectLevel={0} gameOver={false} />
    );
    expect(html).toContain('alt="Pokemon to guess"');
  });

  test("applies blur filter when effectLevel is 0", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockPikachu} effectLevel={0} gameOver={false} />
    );
    expect(html).toContain("blur(20px)");
  });

  test("applies less blur when effectLevel is 2", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockPikachu} effectLevel={2} gameOver={false} />
    );
    expect(html).toContain("blur(12px)");
  });

  test("applies minimal blur when effectLevel is 4", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockPikachu} effectLevel={4} gameOver={false} />
    );
    expect(html).toContain("blur(4px)");
  });

  test("applies no blur when effectLevel is 5", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockPikachu} effectLevel={5} gameOver={false} />
    );
    expect(html).toContain("blur(0px)");
  });

  test("removes all blur when gameOver is true", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockPikachu} effectLevel={0} gameOver={true} />
    );
    expect(html).toContain("blur(0px)");
  });

  test("displays Charizard sprite correctly", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockCharizard} effectLevel={2} gameOver={false} />
    );
    expect(html).toContain(mockCharizard.sprites.front_default);
  });

  test("displays Mewtwo sprite correctly", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockMewtwo} effectLevel={3} gameOver={false} />
    );
    expect(html).toContain(mockMewtwo.sprites.front_default);
  });

  test("displays Gyarados sprite correctly", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockGyarados} effectLevel={1} gameOver={false} />
    );
    expect(html).toContain(mockGyarados.sprites.front_default);
  });

  test("has transition classes for smooth blur animation", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockPikachu} effectLevel={2} gameOver={false} />
    );
    expect(html).toContain("transition-all");
    expect(html).toContain("duration-500");
  });

  // Zoom mode tests
  test("snapshot with Pikachu in zoom mode fully zoomed", () => {
    const html = renderToStaticMarkup(
      <PokemonImage 
        pokemon={mockPikachu} 
        effectLevel={0}
        gameMode={GameMode.ZOOM}
        gameOver={false} 
      />
    );
    expect(html).toMatchSnapshot();
  });

  test("snapshot with Pikachu in zoom mode half zoomed", () => {
    const html = renderToStaticMarkup(
      <PokemonImage 
        pokemon={mockPikachu} 
        effectLevel={2}
        gameMode={GameMode.ZOOM}
        gameOver={false} 
      />
    );
    expect(html).toMatchSnapshot();
  });

  test("snapshot with Pikachu in zoom mode normal size", () => {
    const html = renderToStaticMarkup(
      <PokemonImage 
        pokemon={mockPikachu} 
        effectLevel={5}
        gameMode={GameMode.ZOOM}
        gameOver={false} 
      />
    );
    expect(html).toMatchSnapshot();
  });

  test("applies zoom transform when in zoom mode at level 0", () => {
    const html = renderToStaticMarkup(
      <PokemonImage 
        pokemon={mockPikachu} 
        effectLevel={0}
        gameMode={GameMode.ZOOM}
        gameOver={false} 
      />
    );
    expect(html).toContain("transform:scale(25)");
  });

  test("applies zoom transform when in zoom mode at level 2", () => {
    const html = renderToStaticMarkup(
      <PokemonImage 
        pokemon={mockPikachu} 
        effectLevel={2}
        gameMode={GameMode.ZOOM}
        gameOver={false} 
      />
    );
    expect(html).toContain("transform:scale(15)");
  });

  test("applies zoom transform when in zoom mode at level 5", () => {
    const html = renderToStaticMarkup(
      <PokemonImage 
        pokemon={mockPikachu} 
        effectLevel={5}
        gameMode={GameMode.ZOOM}
        gameOver={false} 
      />
    );
    expect(html).toContain("transform:scale(0)");
  });

  test("removes zoom when game is over in zoom mode", () => {
    const html = renderToStaticMarkup(
      <PokemonImage 
        pokemon={mockPikachu} 
        effectLevel={0}
        gameMode={GameMode.ZOOM}
        gameOver={true} 
      />
    );
    expect(html).toContain("transform:scale(1)");
  });

  test("applies blur in blur mode", () => {
    const html = renderToStaticMarkup(
      <PokemonImage 
        pokemon={mockPikachu} 
        effectLevel={0}
        gameMode={GameMode.BLUR}
        gameOver={false} 
      />
    );
    expect(html).toContain("blur(20px)");
  });

  test("applies zoom in zoom mode", () => {
    const html = renderToStaticMarkup(
      <PokemonImage 
        pokemon={mockPikachu}   
        gameMode={GameMode.ZOOM}
        effectLevel={0}
        gameOver={false} 
      />
    );
    expect(html).toContain("transform:scale(25)");
    expect(html).not.toContain("blur");
  });

  test("has transform-origin center in zoom mode", () => {
    const html = renderToStaticMarkup(
      <PokemonImage 
        pokemon={mockPikachu} 
        effectLevel={0}
        gameMode={GameMode.ZOOM}
        gameOver={false} 
      />
    );
    expect(html).toContain("transform-origin:center");
  });
});

