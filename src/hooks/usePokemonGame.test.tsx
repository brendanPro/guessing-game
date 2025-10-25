import { describe, test, expect, beforeEach, afterEach, mock } from "bun:test";
import { GameStatus, LetterState } from "@/types/pokemon";
import { usePokemonGame } from "./usePokemonGame";
import { renderHook, waitFor, act  } from "@testing-library/react";
import { DEFAULT_GENERATION } from "@/data/pokemonGenerations";

// Mock Pokemon data
const mockPokemonData = {
  id: 25,
  name: "pikachu",
  sprites: {
    front_default: "https://example.com/pikachu.png",
    back_default: "https://example.com/pikachu-back.png",
    front_shiny: "https://example.com/pikachu-shiny.png",
    back_shiny: "https://example.com/pikachu-shiny-back.png",
  },
  types: [{ type: { name: "electric" } }],
  height: 4,
  weight: 60,
  stats: [{ base_stat: 35, stat: { name: "hp" } }],
};

const mockSpeciesData = {
  names: [
    { language: { name: "fr" }, name: "Pikachu" },
    { language: { name: "en" }, name: "Pikachu" },
  ],
};

describe("usePokemonGame hook", () => {
  
  test("should return the inital values", () => {
    const { result } = renderHook(() => usePokemonGame());
    expect(result.current.gameState.status).toBe(GameStatus.PLAYING);
    expect(result.current.gameState.attempts).toEqual([]);
    expect(result.current.gameState.currentAttempt).toBe("");
    expect(result.current.gameState.blurLevel).toBe(0);
    expect(result.current.gameState.targetPokemon).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.selectedGeneration).toBe(DEFAULT_GENERATION);
  });

  describe("fetch pokemon data", () => {
    let originalFetch: typeof fetch;

    beforeEach(() => {
      // Save original fetch
      originalFetch = global.fetch;
    });

    afterEach(() => {
      // Restore original fetch
      global.fetch = originalFetch;
    });

    test("should fetch initial pokemon data", async () => {
      const mockFetch = mock();
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemonData,
      })
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockSpeciesData,
      });
      global.fetch = mockFetch as unknown as typeof fetch;

      const { result } = renderHook(() => usePokemonGame());
      
      await waitFor(() => {
        expect(result.current.gameState.targetPokemon).toBeDefined();
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
      });
    });

    test("should fail to fetch pokemon data", async () => {
      const mockFetch = mock();
      mockFetch.mockReturnValueOnce({
        ok: false,
      })
      global.fetch = mockFetch as unknown as typeof fetch;

      const { result } = renderHook(() => usePokemonGame());
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeDefined();
      });
    });

    test("should fail to fetch pokemon species", async () => {
      const mockFetch = mock();
      mockFetch.mockReturnValueOnce({
        ok: true,
        json: async () => mockPokemonData,
      })
      mockFetch.mockReturnValueOnce({
        ok: false,
      });
      global.fetch = mockFetch as unknown as typeof fetch;

      const { result } = renderHook(() => usePokemonGame());
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeDefined();
      });
    });

  });

  describe("check guess", () => {
    test("guess should be correct", () => {
      const { result } = renderHook(() => usePokemonGame());
      const target = "pikachu";
      const guess = "pikachu";
      const resultGuess = result.current.checkGuess(guess, target);
      expect(resultGuess).toEqual(new Array(guess.length).fill(LetterState.CORRECT));
    });

    test("guess should be present", () => {
      const { result } = renderHook(() => usePokemonGame());
      const target = "bulbizarre";
      const guess = "bulbizarre";
      const resultGuess = result.current.checkGuess(guess, target.split('').reverse().join(''));
      expect(resultGuess).toEqual(new Array(guess.length).fill(LetterState.PRESENT));
    });

    test("guess should be absent", () => {
      const { result } = renderHook(() => usePokemonGame());
      const target = "pikachu";
      const guess = "qjlbdjv";
      const resultGuess = result.current.checkGuess(guess, target);
      expect(resultGuess).toEqual(new Array(guess.length).fill(LetterState.ABSENT));
    });

    test("guess should ignore accent", ()=>{
      const { result } = renderHook(() => usePokemonGame());
      
      // Test with é -> e
      const target1 = "évoli"
      const guess1 = "evoli";
      const resultGuess1 = result.current.checkGuess(guess1, target1);
      expect(resultGuess1).toEqual(new Array(guess1.length).fill(LetterState.CORRECT));
      
      // Test with è, é, ê -> e
      const target2 = "flabébé"
      const guess2 = "flabebe";
      const resultGuess2 = result.current.checkGuess(guess2, target2);
      expect(resultGuess2).toEqual(new Array(guess2.length).fill(LetterState.CORRECT));
      
      // Test with à -> a
      const target3 = "maràcacrin"
      const guess3 = "maracacrin";
      const resultGuess3 = result.current.checkGuess(guess3, target3);
      expect(resultGuess3).toEqual(new Array(guess3.length).fill(LetterState.CORRECT));
    });
  });

  describe("update current attempt", () => {
    test("should update the current attempt", async () => {
      const { result } = renderHook(() => usePokemonGame());
      act(() => {
        result.current.updateCurrentAttempt("pikachu");
      });
      await waitFor(() => { 
        expect(result.current.gameState.currentAttempt).toBe("pikachu");
      });
    });
  });

  describe("submit guess", () => {
    let result: { current: ReturnType<typeof usePokemonGame> };
    let originalFetch: typeof fetch;

    beforeEach(async () => {
      // Save original fetch
      originalFetch = global.fetch;

      const mockFetch = mock();
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemonData,
      })
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockSpeciesData,
      });
      global.fetch = mockFetch as unknown as typeof fetch;

      result = renderHook(() => usePokemonGame()).result;
      await waitFor(() => {
        expect(result.current.gameState.targetPokemon).toBeDefined();
        expect(result.current.loading).toBe(false);
      });
    });

    afterEach(() => {
      // Restore original fetch
      global.fetch = originalFetch;
    });

    test("should submit a correct guess on first attempt", async () => {
      act(() => {
        result.current.submitGuess('pikachu');
      });
      await waitFor(() => {
        expect(result.current.gameState.status).toBe(GameStatus.WON);
        expect(result.current.gameState.attempts).toEqual(["pikachu"]);
        expect(result.current.gameState.currentAttempt).toBe("");
        expect(result.current.gameState.blurLevel).toBe(1);
      });
    });

    test("should submit an incorrect guess and continue playing", async () => {
      act(() => {
        result.current.submitGuess('bulbizarre');
      });
      await waitFor(() => {
        expect(result.current.gameState.status).toBe(GameStatus.PLAYING);
        expect(result.current.gameState.attempts).toEqual(["bulbizarre"]);
        expect(result.current.gameState.currentAttempt).toBe("");
        expect(result.current.gameState.blurLevel).toBe(1);
      });
    });

    test("should submit an incorrect guess five time and loose", async () => {
      async function* asyncGenerator(): AsyncGenerator<number, void, unknown> {
        let i = 0;
        while (i < 5) {
          yield i++;   
        }
      }
      for await (const i of asyncGenerator()) {
        act(() => {
          result.current.submitGuess('bulbizarre');
        });
        await waitFor(() => {
          expect(result.current.gameState.attempts).toEqual(new Array(i+1).fill("bulbizarre"));
        });
      }
      expect(result.current.gameState.status).toBe(GameStatus.LOST);
      expect(result.current.gameState.blurLevel).toBe(5);
    })
  });


  describe("restart game", () => {
    let result: { current: ReturnType<typeof usePokemonGame> };
    let originalFetch: typeof fetch;

    beforeEach(async () => {
      // Save original fetch
      originalFetch = global.fetch;

      const mockFetch = mock();
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemonData,
      })
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockSpeciesData,
      });
      global.fetch = mockFetch as unknown as typeof fetch;

      result = renderHook(() => usePokemonGame()).result;
      await waitFor(() => {
        expect(result.current.gameState.targetPokemon).toBeDefined();
        expect(result.current.loading).toBe(false);
      });
    });

    afterEach(() => {
      // Restore original fetch
      global.fetch = originalFetch;
    });


    test("should restart the game after winning", async () => {
      act(() => {
        result.current.submitGuess('pikachu');
      });
      await waitFor(() => {
        expect(result.current.gameState.status).toBe(GameStatus.WON);
        expect(result.current.gameState.attempts).toEqual(["pikachu"]);
        expect(result.current.gameState.currentAttempt).toBe("");
        expect(result.current.gameState.blurLevel).toBe(1);
      });
      act(() => {
        result.current.restartGame();
      });
      await waitFor(() => {
        expect(result.current.gameState.status).toBe(GameStatus.PLAYING);
        expect(result.current.gameState.attempts).toEqual([]);
        expect(result.current.gameState.currentAttempt).toBe("");
        expect(result.current.gameState.blurLevel).toBe(0);
      });
    });
  });
});