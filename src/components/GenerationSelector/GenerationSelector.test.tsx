import { describe, test, expect, mock } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { GenerationSelector } from "./GenerationSelector";
import { POKEMON_GENERATIONS } from '@/data/pokemonGenerations';


describe("GenerationSelector Component", () => {
  const mockOnChange = mock(() => {});

  test("snapshot with Generation I selected", () => {
    const html = renderToStaticMarkup(
      <GenerationSelector 
        selectedGeneration={POKEMON_GENERATIONS[0]} 
        onGenerationChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toMatchSnapshot();
  });

  test("snapshot with Generation V selected", () => {
    const html = renderToStaticMarkup(
      <GenerationSelector 
        selectedGeneration={POKEMON_GENERATIONS[4]} 
        onGenerationChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toMatchSnapshot();
  });

  test("snapshot with Generation IX selected", () => {
    const html = renderToStaticMarkup(
      <GenerationSelector 
        selectedGeneration={POKEMON_GENERATIONS[8]} 
        onGenerationChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toMatchSnapshot();
  });

  test("snapshot when disabled", () => {
    const html = renderToStaticMarkup(
      <GenerationSelector 
        selectedGeneration={POKEMON_GENERATIONS[0]} 
        onGenerationChange={mockOnChange}
        disabled={true}
      />
    );
    expect(html).toMatchSnapshot();
  });

  test("contains title", () => {
    const html = renderToStaticMarkup(
      <GenerationSelector 
        selectedGeneration={POKEMON_GENERATIONS[0]} 
        onGenerationChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("Choisissez une Génération");
  });

  test("contains description text", () => {
    const html = renderToStaticMarkup(
      <GenerationSelector 
        selectedGeneration={POKEMON_GENERATIONS[0]} 
        onGenerationChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("Sélectionnez la génération de Pokémon pour votre partie");
  });

  test("displays all 9 generations", () => {
    const html = renderToStaticMarkup(
      <GenerationSelector 
        selectedGeneration={POKEMON_GENERATIONS[0]} 
        onGenerationChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("Génération I");
    expect(html).toContain("Génération IX");
  });

  test("displays generation names", () => {
    const html = renderToStaticMarkup(
      <GenerationSelector 
        selectedGeneration={POKEMON_GENERATIONS[0]} 
        onGenerationChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("Génération I");
    expect(html).toContain("Génération II");
    expect(html).toContain("Génération III");
  });

  test("displays generation regions", () => {
    const html = renderToStaticMarkup(
      <GenerationSelector 
        selectedGeneration={POKEMON_GENERATIONS[0]} 
        onGenerationChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("Kanto");
    expect(html).toContain("Johto");
    expect(html).toContain("Paldea");
  });

  test("displays generation ID ranges", () => {
    const html = renderToStaticMarkup(
      <GenerationSelector 
        selectedGeneration={POKEMON_GENERATIONS[0]} 
        onGenerationChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("1-151");
    expect(html).toContain("1-251");
  });

  test("displays selected generation description", () => {
    const html = renderToStaticMarkup(
      <GenerationSelector 
        selectedGeneration={POKEMON_GENERATIONS[0]} 
        onGenerationChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("Les 151 premiers Pokémon (Rouge, Bleu, Jaune)");
  });

  test("displays selected generation name in description box", () => {
    const html = renderToStaticMarkup(
      <GenerationSelector 
        selectedGeneration={POKEMON_GENERATIONS[0]} 
        onGenerationChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("Génération I - Kanto");
  });

  test("has responsive grid layout", () => {
    const html = renderToStaticMarkup(
      <GenerationSelector 
        selectedGeneration={POKEMON_GENERATIONS[0]} 
        onGenerationChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("grid-cols-2");
    expect(html).toContain("sm:grid-cols-3");
    expect(html).toContain("md:grid-cols-4");
    expect(html).toContain("lg:grid-cols-5");
    expect(html).toContain("xl:grid-cols-9");
  });

  test("has touch-manipulation class for mobile", () => {
    const html = renderToStaticMarkup(
      <GenerationSelector 
        selectedGeneration={POKEMON_GENERATIONS[0]} 
        onGenerationChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("touch-manipulation");
  });

  test("has hover scale effect", () => {
    const html = renderToStaticMarkup(
      <GenerationSelector 
        selectedGeneration={POKEMON_GENERATIONS[0]} 
        onGenerationChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("hover:scale-105");
  });

  test("has transition classes", () => {
    const html = renderToStaticMarkup(
      <GenerationSelector 
        selectedGeneration={POKEMON_GENERATIONS[0]} 
        onGenerationChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("transition-transform");
  });

  test("applies custom className when provided", () => {
    const html = renderToStaticMarkup(
      <GenerationSelector 
        selectedGeneration={POKEMON_GENERATIONS[0]} 
        onGenerationChange={mockOnChange}
        disabled={false}
        className="custom-class"
      />
    );
    expect(html).toContain("custom-class");
  });

  test("displays Generation V correctly", () => {
    const html = renderToStaticMarkup(
      <GenerationSelector 
        selectedGeneration={POKEMON_GENERATIONS[4]} 
        onGenerationChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("Génération V - Unys");
    expect(html).toContain("Les 649 premiers Pokémon");
  });

  test("displays Generation IX correctly", () => {
    const html = renderToStaticMarkup(
      <GenerationSelector 
        selectedGeneration={POKEMON_GENERATIONS[8]} 
        onGenerationChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("Génération IX - Paldea");
    expect(html).toContain("Tous les Pokémon");
  });

  test("has emoji in title", () => {
    const html = renderToStaticMarkup(
      <GenerationSelector 
        selectedGeneration={POKEMON_GENERATIONS[0]} 
        onGenerationChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("🎮");
  });
});

