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

  test("contains label", () => {
    const html = renderToStaticMarkup(
      <GenerationSelector 
        selectedGeneration={POKEMON_GENERATIONS[0]} 
        onGenerationChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("Génération Pokémon");
  });

  test("has select element", () => {
    const html = renderToStaticMarkup(
      <GenerationSelector 
        selectedGeneration={POKEMON_GENERATIONS[0]} 
        onGenerationChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("generation-select");
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

  test("has description box", () => {
    const html = renderToStaticMarkup(
      <GenerationSelector 
        selectedGeneration={POKEMON_GENERATIONS[0]} 
        onGenerationChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("bg-muted");
  });

  test("has space-y layout", () => {
    const html = renderToStaticMarkup(
      <GenerationSelector 
        selectedGeneration={POKEMON_GENERATIONS[0]} 
        onGenerationChange={mockOnChange}
        disabled={false}
      />
    );
    expect(html).toContain("space-y-3");
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

});


