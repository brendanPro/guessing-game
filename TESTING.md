# Testing Guide

This project uses Bun's built-in test runner for snapshot testing and component testing.

## Running Tests

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test:watch

# Run a specific test file
bun test src/components/GameOver.test.tsx
```

## Snapshot Testing

Snapshot tests capture the rendered HTML output of components and compare them against saved snapshots. This helps detect unintended changes to component output.

### Example: GameOver Component

The `GameOver.test.tsx` file includes snapshot tests for different scenarios:

```typescript
import { test, expect } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { GameOver } from "./GameOver";

test("snapshot with Pikachu", () => {
  const html = renderToStaticMarkup(<GameOver pokemon={mockPikachu} />);
  expect(html).toMatchSnapshot();
});
```

### Snapshot Files

Snapshots are stored in `__snapshots__/` directories next to the test files:
- `src/components/GameOver/__snapshots__/GameOver.test.tsx.snap`


### Updating Snapshots

When you intentionally change component output, update snapshots:

```bash
# Update all snapshots
bun test --update-snapshots

# Or use the -u flag
bun test -u
```

## Component Organization

Components are organized in dedicated folders with all related files:

```
src/components/GameOver/
├── GameOver.tsx          # Main component
├── GameOver.test.tsx      # Test file
├── GameOver.stories.tsx   # Storybook stories
├── index.ts               # Export file
└── __snapshots__/         # Snapshot files
    └── GameOver.test.tsx.snap
```

This organization keeps all related files together and makes the codebase more maintainable.

## Test Structure

### GameOver Component Tests

The `GameOver.test.tsx` file includes:

1. **Snapshot Tests**
   - With Pikachu (English name)
   - With Charizard (French name: Dracaufeu)
   - With null pokemon (edge case)

2. **Content Tests**
   - Verifies game over emoji and text are present
   - Checks Pokemon names are displayed correctly
   - Validates CSS classes are applied
   - Ensures proper HTML structure

## Writing New Tests

### 1. Create a test file

Create a file with the `.test.tsx` extension next to your component:

```
src/components/
  ├── MyComponent/
  │   ├── MyComponent.tsx
  │   ├── MyComponent.test.tsx
  │   ├── MyComponent.stories.tsx
  │   └── index.ts
  └── OtherComponent.tsx
```

### 2. Write snapshot tests

```typescript
import { describe, test, expect } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MyComponent } from "./MyComponent";

describe("MyComponent", () => {
  test("renders correctly", () => {
    const html = renderToStaticMarkup(<MyComponent prop="value" />);
    expect(html).toMatchSnapshot();
  });

  test("contains expected text", () => {
    const html = renderToStaticMarkup(<MyComponent prop="value" />);
    expect(html).toContain("expected text");
  });
});
```

### 3. Run your tests

```bash
bun test src/components/MyComponent.test.tsx
```

## Testing Best Practices

### ✅ DO

- Write snapshot tests for components to catch unintended changes
- Test different props and states
- Test edge cases (null, undefined, empty arrays)
- Use descriptive test names
- Keep mock data consistent across tests

### ❌ DON'T

- Don't test implementation details
- Don't update snapshots without reviewing changes
- Don't skip edge cases
- Don't make tests dependent on each other

## Mock Data

Mock data is defined within test files for consistency. Example:

```typescript
const mockPokemon: Pokemon = {
  id: 25,
  name: "pikachu",
  frenchName: "Pikachu",
  sprites: {
    front_default: "https://...",
    // ... other properties
  },
  types: [{ type: { name: "electric" } }],
  height: 4,
  weight: 60,
  stats: [{ base_stat: 35, stat: { name: "hp" } }],
};
```

## Configuration

### bunfig.toml

The test setup is configured in `bunfig.toml`:

```toml
[test]
preload = ["./test-setup.ts"]
```

### test-setup.ts

Global test setup and configuration:

```typescript
import { expect } from "bun:test";

// Custom matchers and setup can be added here
```

## Continuous Integration

Tests should be run in CI/CD pipelines:

```yaml
# Example GitHub Actions
- name: Run tests
  run: bun test
```

## Coverage

To see test coverage (future improvement):

```bash
# Bun test coverage is coming soon
bun test --coverage
```

## Troubleshooting

### Tests hanging or timing out

If tests hang, check:
- CSS imports in test files (may need to be removed)
- DOM-dependent code (use `renderToStaticMarkup` instead of `render`)
- Async operations without proper cleanup

### Snapshots not updating

Use the update flag:
```bash
bun test -u
```

### Mock data issues

Ensure all required fields are present in mock objects to match TypeScript interfaces.

---

*Last updated: $(date)*
*Testing framework: Bun Test Runner*

