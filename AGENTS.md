# AGENTS.md - Best Practices for React, Shadcn, and Tailwind CSS

This document outlines the best practices and guidelines for developing with React, Shadcn/ui, and Tailwind CSS in this project.

## 🚀 React Best Practices

### Component Architecture
- **Functional Components**: Use functional components with hooks instead of class components
- **Component Composition**: Prefer composition over inheritance
- **Single Responsibility**: Each component should have one clear purpose
- **Props Interface**: Define clear TypeScript interfaces for component props

```tsx
// ✅ Good: Clear interface and single responsibility
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant, size, children, onClick }: ButtonProps) {
  return (
    <button 
      className={cn(buttonVariants({ variant, size }))}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### State Management
- **useState**: For local component state
- **useReducer**: For complex state logic
- **Custom Hooks**: Extract reusable stateful logic
- **Context API**: For global state that doesn't need external libraries

```tsx
// ✅ Good: Custom hook for reusable logic
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
```

### Performance Optimization
- **React.memo**: For preventing unnecessary re-renders
- **useMemo**: For expensive calculations
- **useCallback**: For stable function references
- **Code Splitting**: Use dynamic imports for route-based splitting

```tsx
// ✅ Good: Memoized component with stable callbacks
const ExpensiveComponent = React.memo(({ data, onUpdate }: Props) => {
  const processedData = useMemo(() => {
    return data.map(item => expensiveCalculation(item));
  }, [data]);

  const handleUpdate = useCallback((id: string) => {
    onUpdate(id);
  }, [onUpdate]);

  return <div>{/* render processedData */}</div>;
});
```

### Error Handling
- **Error Boundaries**: Catch JavaScript errors anywhere in the component tree
- **Try-Catch**: For async operations
- **Fallback UI**: Provide meaningful error states

```tsx
// ✅ Good: Error boundary with fallback
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

## 🎨 Shadcn/ui Best Practices

### Component Structure
- **Consistent API**: Follow Shadcn's component patterns
- **Variant Props**: Use class-variance-authority for component variants
- **Composition**: Leverage Radix UI primitives for accessibility
- **Forwarding Refs**: Use React.forwardRef for proper ref handling

```tsx
// ✅ Good: Shadcn-style component with variants
const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "border-border",
        elevated: "shadow-md",
        outlined: "border-2",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined";
  padding?: "none" | "sm" | "md" | "lg";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding }), className)}
      {...props}
    />
  )
);
```

### Accessibility
- **ARIA Attributes**: Include proper ARIA labels and roles
- **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
- **Focus Management**: Handle focus states appropriately
- **Screen Reader Support**: Test with screen readers

```tsx
// ✅ Good: Accessible button with proper ARIA
const AccessibleButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { 'aria-label'?: string }
>(({ children, 'aria-label': ariaLabel, ...props }, ref) => (
  <button
    ref={ref}
    aria-label={ariaLabel}
    role="button"
    tabIndex={0}
    {...props}
  >
    {children}
  </button>
));
```

### Theming
- **CSS Variables**: Use CSS custom properties for theming
- **Dark Mode**: Implement proper dark mode support
- **Color Tokens**: Use semantic color tokens consistently

```tsx
// ✅ Good: Theme-aware component
const ThemedComponent = ({ className, ...props }) => (
  <div
    className={cn(
      "bg-background text-foreground",
      "border-border",
      "hover:bg-accent hover:text-accent-foreground",
      className
    )}
    {...props}
  />
);
```

## 🎯 Tailwind CSS Best Practices

### Class Organization
- **Logical Grouping**: Group related classes together
- **Responsive Design**: Mobile-first approach with responsive prefixes
- **State Variants**: Use hover, focus, active states appropriately
- **Utility Classes**: Prefer utility classes over custom CSS

```tsx
// ✅ Good: Well-organized Tailwind classes
<div className="
  flex flex-col items-center justify-center
  w-full max-w-md mx-auto
  p-6 space-y-4
  bg-card border border-border rounded-lg shadow-sm
  hover:shadow-md transition-shadow duration-200
  focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2
  dark:bg-card dark:border-border
">
```

### Responsive Design
- **Mobile First**: Start with mobile styles, then add larger breakpoints
- **Breakpoint Strategy**: Use consistent breakpoint patterns
- **Container Queries**: Use container queries when appropriate

```tsx
// ✅ Good: Mobile-first responsive design
<div className="
  grid grid-cols-1 gap-4
  sm:grid-cols-2 sm:gap-6
  md:grid-cols-3 md:gap-8
  lg:grid-cols-4
  xl:grid-cols-5
">
```

### Performance
- **Purge CSS**: Ensure unused styles are removed in production
- **Critical CSS**: Inline critical styles for above-the-fold content
- **Class Optimization**: Use Tailwind's JIT mode for optimal bundle size

### Custom Utilities
- **Extend Safely**: Add custom utilities in the Tailwind config
- **Component Classes**: Use @apply for complex component styles
- **CSS Variables**: Leverage CSS custom properties for dynamic values

```css
/* ✅ Good: Custom utility with CSS variables */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  
  .bg-gradient-brand {
    background: linear-gradient(
      135deg,
      var(--primary) 0%,
      var(--primary-foreground) 100%
    );
  }
}
```

## 🔧 Development Workflow

### File Organization
```
src/
├── components/
│   ├── ui/           # Shadcn/ui components
│   ├── forms/        # Form components
│   └── layout/       # Layout components
├── hooks/            # Custom hooks
├── lib/              # Utility functions
├── types/            # TypeScript type definitions
└── styles/           # Global styles
```

### Naming Conventions
- **Components**: PascalCase (e.g., `UserProfile`)
- **Files**: kebab-case for components (e.g., `user-profile.tsx`)
- **Hooks**: camelCase starting with 'use' (e.g., `useLocalStorage`)
- **Types**: PascalCase (e.g., `UserProfileProps`)

### Code Quality
- **ESLint**: Use React-specific ESLint rules
- **Prettier**: Consistent code formatting
- **TypeScript**: Strict type checking
- **Testing**: Unit tests for components and hooks

### Build Optimization
- **Tree Shaking**: Ensure unused code is eliminated
- **Code Splitting**: Split code at route boundaries
- **Bundle Analysis**: Regular bundle size monitoring
- **Image Optimization**: Use next-gen formats and proper sizing

## 🚨 Common Pitfalls to Avoid

### React Anti-patterns
- ❌ Don't mutate state directly
- ❌ Don't use array indices as keys
- ❌ Don't forget to clean up effects
- ❌ Don't overuse useEffect

### Shadcn/ui Mistakes
- ❌ Don't modify Shadcn components directly
- ❌ Don't ignore accessibility requirements
- ❌ Don't skip proper TypeScript typing
- ❌ Don't forget to handle loading and error states

### Tailwind CSS Issues
- ❌ Don't use arbitrary values excessively
- ❌ Don't ignore responsive design
- ❌ Don't create overly specific selectors
- ❌ Don't forget to purge unused styles

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Class Variance Authority](https://cva.style/)

## 🔄 Regular Updates

This document should be updated regularly to reflect:
- New React features and patterns
- Shadcn/ui component updates
- Tailwind CSS new utilities
- Project-specific conventions
- Performance optimizations
- Accessibility improvements

---

*Last updated: $(date)*
*Maintained by: Development Team*
