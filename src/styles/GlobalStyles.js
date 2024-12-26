import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
/* Reset & Normalize */
*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px; /* Base font size for rem scaling */
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-family-primary);
    line-height: 1.6;
    background-color: var(--color-bg);
    color: var(--color-text);
    overflow-x: hidden; /* Prevent horizontal scrolling */
    -webkit-tap-highlight-color: transparent; /* Remove blue highlight on mobile */
  }

  /* Design System Variables */
  :root {

    /* Color Palette */
    --color-primary: #4caf50; /* Primary */
    --color-primary-light: #81c784; /* Light Variant */
    --color-primary-dark: #388e3c; /* Dark Variant */

    --color-secondary: #ff5722; /* Secondary */
    --color-secondary-light: #ff8a50; /* Light Variant */
    --color-secondary-dark: #e64a19; /* Dark Variant */

    --color-accent: #ffc107; /* Accent */
    --color-error: #f44336; /* Error */
    --color-success: #4caf50; /* Success */
    --color-warning: #ff9800; /* Warning */

    --color-bg: #f5f5f5; /* Background */
    --color-surface: #ffffff; /* Surface */
    --color-border: #e0e0e0; /* Border */
    --color-text: #212121; /* Default Text */
    --color-muted: #757575; /* Muted Text */

    /* --color-primary: #333333; 
    --color-primary-light: #555555; 
    --color-primary-dark: #111111; 

    --color-secondary: #FFFFFF;
    --color-secondary-light: #F5F5F5; 
    --color-secondary-dark: #E0E0E0; 

    --color-accent: #FF5722; 
    --color-error: #F44336; 
    --color-success: #4CAF50;
    --color-warning: #FF9800; 

    --color-bg: #F5F5F5; 
    --color-surface: #FFFFFF; 
    --color-border: #E0E0E0; 
    --color-text: #333333;
    --color-muted: #757575; */

    /* Typography */
    --font-family-primary: 'Roboto', sans-serif;
    --font-family-secondary: 'Inter', sans-serif;

    /* Spacing */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;

    /* Shadows */
    --shadow-light: 0px 1px 3px rgba(0, 0, 0, 0.1);
    --shadow-medium: 0px 3px 6px rgba(0, 0, 0, 0.15);
    --shadow-heavy: 0px 10px 20px rgba(0, 0, 0, 0.2);

    /* Border Radius */
    --border-radius-sm: 4px;
    --border-radius-md: 8px;
    --border-radius-lg: 16px;

    /* Transitions */
    --transition-fast: 0.2s ease-in-out;
    --transition-medium: 0.3s ease-in-out;
    --transition-slow: 0.5s ease-in-out;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-family-primary);
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: var(--spacing-md);
  }

  p {
    font-family: var(--font-family-primary);
    font-size: 1rem;
    margin-bottom: var(--spacing-md);
    color: var(--color-muted);
  }

  a {
    color: var(--color-primary);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  a:hover {
    color: var(--color-primary-dark);
  }

  button {
    font-family: var(--font-family-primary);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--border-radius-sm);
    border: none;
    cursor: pointer;
    transition: background-color var(--transition-medium);
  }

  button:hover {
    background-color: var(--color-primary-light);
  }

  /* Utility Classes */
  .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .grid {
    display: grid;
    gap: var(--spacing-md);
  }

  .hidden {
    display: none !important;
  }

  .visible {
    display: block !important;
  }

  /* Forms */
  input, textarea, select {
    width: 100%;
    padding: var(--spacing-sm);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-sm);
    font-family: var(--font-family-primary);
  }

  input:focus, textarea:focus, select:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 4px var(--color-primary);
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-bg);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-muted);
    border-radius: var(--border-radius-sm);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-primary);
  }

  /* Responsive Typography */
  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.75rem;
    }
  }
`;

export default GlobalStyles;
