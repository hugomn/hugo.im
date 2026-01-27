# Hugo.im - Personal Portfolio

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Astro](https://img.shields.io/badge/Astro-BC52EE?style=flat&logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org)

A modern personal portfolio built with Astro, TypeScript, and Tailwind CSS. Features bilingual content, perfect Lighthouse scores, and a comprehensive design system.

**Live Site:** [https://hugo.im](https://hugo.im)

## 🌟 Why Share This Codebase

This portfolio is shared as a **reference implementation** for developers who want to build sophisticated personal sites. The codebase demonstrates modern web development practices, comprehensive internationalization, and performance optimization.

Feel free to fork and adapt for your own projects. No contributions expected, but the technical architecture and implementation patterns might be useful for similar projects.

## 🎯 Technical Features

**Modern Stack:**

- Astro 5.x for optimal performance and developer experience
- TypeScript throughout for type safety and maintainability
- Tailwind CSS with custom design system implementation
- React components for interactive elements

**Content Management:**

- Markdown-based blog with comprehensive frontmatter
- Full bilingual support (English/Portuguese)
- Dynamic OG image generation
- RSS feeds and sitemap generation

**Performance & UX:**

- Perfect Lighthouse scores (100/100/100/100)
- Responsive design with mobile-first approach
- Search functionality with fuzzy matching
- Dark/light mode with system preference detection

## 🚀 Key Technical Features

### 📝 Content Architecture

```typescript
// Example: Multilingual blog structure
src/content/blog/
├── post-title.md          // English
└── pt/post-title.pt.md    // Portuguese
```

### 🎨 Design System Implementation

- Typography scale optimized for readability
- Consistent spacing and visual hierarchy
- Accessible color palette with proper contrast ratios
- Comprehensive ARIA support and semantic markup

### 📊 Data Integration Examples

The codebase includes patterns for:

- GitHub API integration for dynamic content
- Custom visualization generation with Python/matplotlib
- Interactive component development with React

### 🌐 Production-Ready Architecture

- Scalable component structure with TypeScript interfaces
- Comprehensive error boundaries and fallback states
- Performance optimization with lazy loading and prefetching
- SEO optimization with structured data and meta tags

## 🏁 Quick Start

### 1. Clone & Setup

```bash
git clone https://github.com/hugomn/hugo.im.git your-project
cd your-project
npm install
```

### 2. Configuration

```typescript
// src/config.ts
export const SITE: Site = {
  website: "https://your-domain.com/",
  author: "Your Name",
  title: "Your Site Title",
  desc: "Your site description",
};
```

### 3. Content Structure

- Replace `src/pages/about.md` with your content
- Update blog posts in `src/content/blog/`
- Add images to `public/assets/`
- Customize favicon and branding assets

### 4. Styling & Branding

```bash
# Generate favicon set
python3 scripts/generate_favicon.py your-image.jpg

# Update styling
# Edit src/styles/ for custom CSS
# Modify Tailwind config for design tokens
```

## 📱 Development & Deployment

| Command           | Action                                       |
| ----------------- | -------------------------------------------- |
| `npm install`     | Install all dependencies                     |
| `npm run dev`     | Start development server at `localhost:4321` |
| `npm run build`   | Build optimized production site              |
| `npm run preview` | Preview production build locally             |
| `npm run lint`    | Run ESLint with TypeScript support           |
| `npm run format`  | Format codebase with Prettier                |

## 🎨 Architecture Patterns

### Component Structure

```
src/
├── components/     # Reusable UI components
├── layouts/        # Page layout templates
├── pages/          # Route definitions
├── content/        # Markdown content
├── styles/         # Global CSS and design tokens
└── utils/          # Utility functions and helpers
```

### Internationalization Implementation

- Translation system with TypeScript support
- Content collection patterns for multilingual posts
- Locale-aware routing and URL generation
- SEO optimization for multiple languages

### Performance Optimizations

- Static site generation with Astro's island architecture
- Image optimization with responsive loading
- CSS optimization with Tailwind purging
- Bundle splitting and lazy loading strategies

## 🌐 Production Considerations

This codebase includes:

- **Comprehensive TypeScript** configuration with strict mode
- **Testing setup** with component and integration test examples
- **CI/CD pipeline** configuration for automated deployment
- **Performance monitoring** with Lighthouse CI integration
- **Security headers** and content security policy implementation

Suitable for personal portfolios, technical blogs, and documentation sites that require professional polish and performance.

## 📄 License

MIT License - Use as inspiration or starting point for your own professional portfolio.

## 🙏 Acknowledgments

Built on the excellent [AstroPaper](https://github.com/satnaing/astro-paper) template by [Sat Naing](https://satnaing.dev).

Enhanced with additional features including comprehensive internationalization, performance optimizations, and modern development practices.
