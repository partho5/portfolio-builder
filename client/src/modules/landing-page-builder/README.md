# Composable Landing Page Builder

A powerful, TypeScript-driven landing page component builder for Next.js with Tailwind CSS.

## 🚀 Features

- **TypeScript Support**: Full type safety with comprehensive interfaces
- **JSON-driven Configuration**: Build layouts from JSON configs
- **5 Shape Components**: Circle, Rectangle, Square, Triangle, DownArrow
- **Flexible Styling**: 7+ built-in style presets with Tailwind CSS
- **Responsive Design**: Mobile-first responsive components
- **Animation Support**: Built-in animations with stagger support
- **Validation System**: Comprehensive config validation
- **Debug Mode**: Development debugging tools
- **Extensible**: Easy to add new shapes and styles

## 📦 Installation

```bash
npm install composable-landing-page-builder
# or
yarn add composable-landing-page-builder
```

## 🎯 Quick Start

```tsx
import { LandingPageBuilder } from 'composable-landing-page-builder';
import type { LandingPageConfig } from 'composable-landing-page-builder';

const config: LandingPageConfig = [
  {
    componentType: 'rectangle',
    content: '<h1>Welcome to My Site</h1>',
    styleName: 'purple',
    size: 100,
    positioning: 'center'
  }
];

export default function MyLandingPage() {
  return (
    <LandingPageBuilder 
      config={config}
      enableAnimations={true}
      debug={false}
    />
  );
}
```

## 📚 API Reference

### ComponentConfig Interface

```typescript
interface ComponentConfig {
  componentType: ComponentType;    // Shape type
  content?: string;               // HTML content
  styleName: StyleName;          // Style preset
  size: Size;                    // Size percentage
  positioning: Positioning;      // Layout position
  id?: string;                   // Unique identifier
  className?: string;            // Additional CSS classes
  onClick?: () => void;          // Click handler
  animation?: AnimationType;     // Animation type
  delay?: number;               // Animation delay
}
```

### Available Types

- **ComponentType**: `'circle' | 'rectangle' | 'square' | 'triangle' | 'downArrow'`
- **StyleName**: `'glowRed' | 'glowWhite' | 'purple' | 'gradientBlue' | 'gradientPurple' | 'glass' | 'neon'`
- **Size**: `25 | 33 | 50 | 100` (percentage)
- **Positioning**: `'left' | 'right' | 'center'`

## 🎨 Style Presets

- **glowRed**: Red background with glow effect
- **glowWhite**: White background with glow effect
- **purple**: Purple background with glow effect
- **gradientBlue**: Blue gradient background
- **gradientPurple**: Purple gradient background
- **glass**: Glassmorphism effect
- **neon**: Neon cyberpunk style

## 🔧 Advanced Usage

### Custom Click Handlers

```tsx
const handleComponentClick = (config: ComponentConfig, index: number) => {
  console.log('Clicked component:', config.componentType);
};

<LandingPageBuilder 
  config={config}
  onComponentClick={handleComponentClick}
/>
```

### Debug Mode

```tsx
<LandingPageBuilder 
  config={config}
  debug={true} // Shows component info overlay
/>
```

### Custom Styling

```tsx
<LandingPageBuilder 
  config={config}
  className="custom-landing-page"
  containerStyle={{ minHeight: '100vh' }}
/>
```

## 🛠️ Development

### Building from Source

```bash
git clone <repository>
cd composable-landing-page-builder
npm install
npm run build
```

### Running Tests

```bash
npm test
npm run test:watch
```

### Type Checking

```bash
npm run type-check
```

## 📄 License

MIT License - see LICENSE file for details.
*/

// =====================================
// 12. IMPLEMENTATION NOTES
// =====================================

/*
TYPESCRIPT IMPLEMENTATION PRIORITIES:

1. **Core Type Definitions** ✅
    - ComponentConfig interface
    - All enum types (ComponentType, StyleName, etc.)
    - ValidationResult and error interfaces
    - Props interfaces for all components

2. **Core Components** (Next Priority)
    - LandingPageBuilder.tsx with proper typing
    - ComponentRenderer.tsx with type safety
    - ShapeWrapper.tsx with typed props

3. **Shape Components** (Next Priority)
    - All shape components with typed props
    - Proper CSS module integration
    - Content rendering with type safety

4. **Utility Functions** (Next Priority)
    - Typed validation functions
    - Style mapping with proper return types
    - Constants with proper typing

5. **Custom Hooks** (Next Priority)
    - useComponentRenderer with typed returns
    - useResponsive with proper breakpoint types
    - All hook return types properly defined

6. **Advanced Features** (Final Priority)
    - Animation system with types
    - Debug mode with typed overlays
    - Performance optimizations

KEY TYPESCRIPT FEATURES IMPLEMENTED:

✅ Strict typing for all component props
✅ Union types for component options
✅ Interface inheritance and composition
✅ Generic types where appropriate
✅ Proper React.FC typing
✅ Event handler typing
✅ CSS module typing support
✅ Hook return type definitions
✅ Validation with typed errors
✅ Configuration file setup

DEVELOPMENT WORKFLOW:

1. Set up TypeScript configuration
2. Implement core types and interfaces
3. Build core components with strict typing
4. Add shape components with proper props
5. Implement utilities with type safety
6. Add custom hooks with typed returns
7. Create comprehensive test suite
8. Build documentation and examples
9. Package for distribution

ERROR HANDLING STRATEGY:

- Use discriminated unions for component types
- Comprehensive validation with typed errors
- Graceful fallbacks for invalid configs
- Debug mode for development
- Type guards for runtime safety

PERFORMANCE CONSIDERATIONS:

- Memoization with React.memo and proper deps
- Lazy loading with React.lazy
- Efficient re-renders with useCallback
- Optimized style calculations
- Minimal DOM manipulation

The structure is now fully TypeScript-ready with comprehensive type safety,
proper interfaces, and development tooling configured.

Example config:
```
[
    {
        componentType: "rectangle",
        content: "<div class='text-white text-3xl font-extrabold text-center'>Introducing X AutoPosting Bot</div><div class='text-white text-md text-center mt-2'>Automate your X (Twitter) posts with precision & speed using browser automation</div>",
        styleName: "purple",
        size: 100,
        positioning: "center"
    },
    {
        componentType: "square",
        content: "<div class='text-black text-base font-semibold'>Solves these problems:<ul class='list-disc pl-4'><li>Manual posting delays</li><li>Inconsistent engagement</li><li>No scheduling control</li></ul></div>",
        styleName: "glowWhite",
        size: 33,
        positioning: "left"
    },
    {
        componentType: "rectangle",
        content: "<div class='text-white text-base'>How it works:<ol class='list-decimal pl-4'><li>Connect your X account securely</li><li>Feed content or connect AI generator</li><li>Set timing rules, sit back and relax</li></ol></div>",
        styleName: "purple",
        size: 100,
        positioning: "center"
    }
]
```