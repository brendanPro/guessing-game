import { describe, test, expect } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { PokemonInfos } from "./PokemonInfos";
import { mockCharizard, mockPikachu, mockMewtwo, mockGyarados } from './mock-data';


describe("PokemonInfos Component", () => {
  test("snapshot with Pikachu", () => {
    const html = renderToStaticMarkup(<PokemonInfos pokemon={mockPikachu} />);
    expect(html).toMatchSnapshot();
  });

  test("snapshot with Charizard (dual type)", () => {
    const html = renderToStaticMarkup(<PokemonInfos pokemon={mockCharizard} />);
    expect(html).toMatchSnapshot();
  });

  test("snapshot with Mewtwo", () => {
    const html = renderToStaticMarkup(<PokemonInfos pokemon={mockMewtwo} />);
    expect(html).toMatchSnapshot();
  });

  test("snapshot with Gyarados (heavy pokemon)", () => {
    const html = renderToStaticMarkup(<PokemonInfos pokemon={mockGyarados} />);
    expect(html).toMatchSnapshot();
  });

  test("contains Pokemon Information title", () => {
    const html = renderToStaticMarkup(<PokemonInfos pokemon={mockPikachu} />);
    expect(html).toContain("Pokemon Information");
  });

  test("displays pokemon french name", () => {
    const html = renderToStaticMarkup(<PokemonInfos pokemon={mockPikachu} />);
    expect(html).toContain("Pikachu");
  });

  test("displays correct french name for Charizard", () => {
    const html = renderToStaticMarkup(<PokemonInfos pokemon={mockCharizard} />);
    expect(html).toContain("Dracaufeu");
  });

  test("displays height in meters", () => {
    const html = renderToStaticMarkup(<PokemonInfos pokemon={mockPikachu} />);
    expect(html).toContain("0.4m"); // height 4 / 10
  });

  test("displays weight in kilograms", () => {
    const html = renderToStaticMarkup(<PokemonInfos pokemon={mockPikachu} />);
    expect(html).toContain("6kg"); // weight 60 / 10
  });

  test("displays single type correctly", () => {
    const html = renderToStaticMarkup(<PokemonInfos pokemon={mockPikachu} />);
    expect(html).toContain("electric");
  });

  test("displays dual types correctly", () => {
    const html = renderToStaticMarkup(<PokemonInfos pokemon={mockCharizard} />);
    expect(html).toContain("fire");
    expect(html).toContain("flying");
  });

  test("has correct structure with Basic Info section", () => {
    const html = renderToStaticMarkup(<PokemonInfos pokemon={mockPikachu} />);
    expect(html).toContain("Basic Info");
  });

  test("has correct structure with Types section", () => {
    const html = renderToStaticMarkup(<PokemonInfos pokemon={mockPikachu} />);
    expect(html).toContain("Types");
  });

  test("displays large pokemon measurements correctly", () => {
    const html = renderToStaticMarkup(<PokemonInfos pokemon={mockGyarados} />);
    expect(html).toContain("6.5m"); // height 65 / 10
    expect(html).toContain("235kg"); // weight 2350 / 10
  });

  test("contains Name label", () => {
    const html = renderToStaticMarkup(<PokemonInfos pokemon={mockPikachu} />);
    expect(html).toContain("<strong>Name:</strong>");
  });

  test("contains Height label", () => {
    const html = renderToStaticMarkup(<PokemonInfos pokemon={mockPikachu} />);
    expect(html).toContain("<strong>Height:</strong>");
  });

  test("contains Weight label", () => {
    const html = renderToStaticMarkup(<PokemonInfos pokemon={mockPikachu} />);
    expect(html).toContain("<strong>Weight:</strong>");
  });
});

