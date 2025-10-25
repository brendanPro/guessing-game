import { describe, test, expect } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { PokemonImage } from "./PokemonImage";
import { mockCharizard, mockPikachu, mockMewtwo, mockGyarados } from './mock-data';


describe("PokemonImage Component", () => {
  test("snapshot with Pikachu fully blurred", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockPikachu} blurLevel={0} gameOver={false} />
    );
    expect(html).toMatchSnapshot();
  });

  test("snapshot with Pikachu half blurred", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockPikachu} blurLevel={2} gameOver={false} />
    );
    expect(html).toMatchSnapshot();
  });

  test("snapshot with Pikachu fully visible", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockPikachu} blurLevel={5} gameOver={false} />
    );
    expect(html).toMatchSnapshot();
  });

  test("snapshot with Pikachu game over", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockPikachu} blurLevel={0} gameOver={true} />
    );
    expect(html).toMatchSnapshot();
  });

  test("snapshot with Charizard", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockCharizard} blurLevel={2} gameOver={false} />
    );
    expect(html).toMatchSnapshot();
  });

  test("snapshot with null pokemon (loading state)", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={null} blurLevel={0} gameOver={false} />
    );
    expect(html).toMatchSnapshot();
  });

  test("displays loading state when pokemon is null", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={null} blurLevel={0} gameOver={false} />
    );
    expect(html).toContain("Loading Pokemon...");
  });

  test("displays pokemon image when pokemon is provided", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockPikachu} blurLevel={0} gameOver={false} />
    );
    expect(html).toContain(mockPikachu.sprites.front_default);
  });

  test("has correct alt text", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockPikachu} blurLevel={0} gameOver={false} />
    );
    expect(html).toContain('alt="Pokemon to guess"');
  });

  test("applies blur filter when blurLevel is 0", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockPikachu} blurLevel={0} gameOver={false} />
    );
    expect(html).toContain("blur(20px)");
  });

  test("applies less blur when blurLevel is 2", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockPikachu} blurLevel={2} gameOver={false} />
    );
    expect(html).toContain("blur(12px)");
  });

  test("applies minimal blur when blurLevel is 4", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockPikachu} blurLevel={4} gameOver={false} />
    );
    expect(html).toContain("blur(4px)");
  });

  test("applies no blur when blurLevel is 5", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockPikachu} blurLevel={5} gameOver={false} />
    );
    expect(html).toContain("blur(0px)");
  });

  test("removes all blur when gameOver is true", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockPikachu} blurLevel={0} gameOver={true} />
    );
    expect(html).toContain("blur(0px)");
  });

  test("displays Charizard sprite correctly", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockCharizard} blurLevel={2} gameOver={false} />
    );
    expect(html).toContain(mockCharizard.sprites.front_default);
  });

  test("displays Mewtwo sprite correctly", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockMewtwo} blurLevel={3} gameOver={false} />
    );
    expect(html).toContain(mockMewtwo.sprites.front_default);
  });

  test("displays Gyarados sprite correctly", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockGyarados} blurLevel={1} gameOver={false} />
    );
    expect(html).toContain(mockGyarados.sprites.front_default);
  });

  test("has transition classes for smooth blur animation", () => {
    const html = renderToStaticMarkup(
      <PokemonImage pokemon={mockPikachu} blurLevel={2} gameOver={false} />
    );
    expect(html).toContain("transition-all");
    expect(html).toContain("duration-500");
  });
});

