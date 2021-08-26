module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui'), ],
  daisyui: {
    themes: [{
      "[data-theme=wireframe]": {
        "fontFamily": "Rockwell,'Castorgate - Rough',\"sanssecondaryerif\"",
        'primary': '#b39c65',
        'primary-focus': '#4506cb',
        'primary-content': '#ffffff',
        'secondary': '#D85045',
        'secondary-focus': '#bd0091',
        'secondary-content': '#ffffff',
        'accent': '#37cdbe',
        'accent-focus': '#2aa79b',
        'accent-content': '#ffffff',
        'neutral': '#9c9c9c',
        'neutral-focus': '#2a2e37',
        'neutral-content': '#ffffff',
        'base-100': '#ffffff',
        'base-200': '#f9fafb',
        'base-300': '#d1d5db',
        'base-content': '#1f2937',
        'info': '#2094f3',
        'success': '#009485',
        'warning': '#ff9900',
        'error': '#ff5724',
        "--border-color": "#000000",
        "--rounded-box": "0.2rem",
        "--rounded-btn": "0.2rem",
        "--rounded-badge": "0.2rem",
        "--tab-radius": "0.2rem",
        "*": {
          "border-color": "var(--border-color) !important",
          "--tw-border-opacity": "1 !important",
          "--tw-text-opacity": "1 !important",
          "--tw-shadow": "0 0 0 1px var(--border-color) !important",
        },
        ".bg-base-100": {
          "--tw-bg-opacity": "0.3"
        },
        ".bg-base-200": {
          "--tw-bg-opacity": "0.5"
        },
        ".bg-base-400": {
          "--tw-bg-opacity": "0.7",
          "background-color": "hsla(var(--b2) / var(--tw-bg-opacity))"

        }
      },
    }]
  }
}