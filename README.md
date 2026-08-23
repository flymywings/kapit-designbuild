# Mobility UI source baseline

React gallery built from exact PNG exports embedded in the supplied Uber community `.fig` file. Source artwork is imported directly rather than redrawn. This baseline intentionally excludes Kapit branding, content, roles, and workflows.

## Scope

- 10 mobile screens
- One landing screen
- Two onboarding screens
- One authentication screen
- One homepage
- Three core workflow screens
- Two AI concept screens using the same visual system
- Nine full mobile exports and one partial contextual asset
- Responsive grid and focused inspector views

No backend, authentication service, maps, payments, or live AI integration.

The imported PNG artwork is pixel-faithful but not editable as individual Figma layers. React and CSS control the gallery, responsive presentation, navigation, labels, and inspector around those source exports.

## Run

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3010`.
