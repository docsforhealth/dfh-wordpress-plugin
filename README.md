# Docs for Health WordPress Plugin

## Commands

- Initial installation: `yarn install`
- During development: `yarn start`
    + Will also run accompanying tests with name `*.test.js` as needed on file changes
    + See [Jest docs](https://jestjs.io/docs/expect) for testing documentation  
- When deploying, see `.travis.yml` config

## Key files

| File | Description |
| ---- | ----------- |
| `docsforhealth.php` | Contains plugin header, defines project-wide constants, and calls `inc/php/class/Setup.php` |
| `src/index.js` | Definitions for editor components and other aspects of editor functionality, imported by the `inc/php/setup/setup_blocks.php` setup class after being built by Webpack to the `build` directory |
| `src/frontend.js` | JS functionality that should be available in the public-facing website |
| `src/style.scss` | Styling that is applied to both the editor and the public-facing  website |
| `src/editor.scss` | Additional styling that is applied to the editor environment, `src/style.scss` styles are still applied |

## Notes
- `prettier-plugin-organize-imports` enforces consistent imports within JS files and requires the `typescript` dependency
- `prop-types` checking only works for native React components, not WP blocks defined via `registerBlockType`
    + Note that [`SCRIPT_DEBUG` in `wp-config.php`](https://wordpress.org/support/article/debugging-in-wordpress/#script_debug) needs to be set to `true` in order for non-production script assets to be loaded. 
    + PropType checks only happen in React development builds, not in production builds 
