# Docs for Health WordPress Plugin

## Commands

- Initial installation: `yarn install`
- During development: `yarn start`
- When deploying, see `.travis.yml` config

## Key files

| File | Description |
| ---- | ----------- |
| `docsforhealth.php` | Contains plugin header, defines project-wide constants, and calls `inc/php/class/Setup.php` |
| `src/index.js` | Definitions for editor components and other aspects of editor functionality, imported by the `inc/php/setup/setup_blocks.php` setup class after being built by Webpack to the `build` directory |
| `src/frontend.js` | JS functionality that should be available in the public-facing website |
| `src/style.scss` | Styling that is applied to both the editor and the public-facing  website |
| `src/editor.scss` | Additional styling that is applied to the editor environment, `src/style.scss` styles are still applied |
