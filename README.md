# Docs for Health WordPress Plugin

[![Build Status](https://app.travis-ci.com/docsforhealth/dfh-wordpress-plugin.svg?branch=master)](https://app.travis-ci.com/docsforhealth/dfh-wordpress-plugin)

## Commands

- Initial installation
    + [Set up the base styles submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules) mounted at `src/scss/base` with `git submodule update --init --recursive` 
    + Install `package.json` dependencies with `yarn install`
- During development: `yarn start`
    + Will also run accompanying tests with name `*.test.js` as needed on file changes
    + See [Jest docs](https://jestjs.io/docs/expect) for testing documentation  

## Key files

| File | Description |
| ---- | ----------- |
| `dfh-wordpress-plugin.php` | Contains plugin header, defines project-wide constants, and calls `src/php/class/Setup.php` |
| `src/editor.js` | Definitions for editor components and other aspects of editor functionality, imported by the `src/php/setup/setup_plugin_deps.php` setup class after being built by Webpack to the `build` directory |
| `src/editor.scss` | Styling that is applied to the editor environment, imports frontend styles to apply to the editor via `src/scss/_common.scss` |
| `src/frontend.js` | JS functionality that should be available in the public-facing website |
| `src/frontend.scss` | Styling that is applied to the public-facing website |

### Tips

- `prettier-plugin-organize-imports` enforces consistent imports within JS files and requires the `typescript` dependency
- `prop-types` checking only works for native React components, not WP blocks defined via `registerBlockType`
    + Note that [`SCRIPT_DEBUG` in `wp-config.php`](https://wordpress.org/support/article/debugging-in-wordpress/#script_debug) needs to be set to `true` in order for non-production script assets to be loaded. 
    + PropType checks only happen in React development builds, not in production builds 
- Use `git pull && git submodule foreach git pull origin master` to [pull remote changes for the current repo and all submodules](https://stackoverflow.com/a/65130154)
    + `yarn git:pull` available for convenience

## Deploying

1. Update the `Version` field in the masthead of `dfh-wordpress-plugin.php` to your desired release version
2. For completeness, also update the `version` field in `package.json` to the same version you entered in the prior step
3. Commit changes with `git commit -am <message here>`
4. Create [an annotated tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging) to mark the release with `git tag -a <tag version> -m <release message>`. By convention, the tag version is the same as the release version specified earlier. Note that we use [annotated tags instead of lightweight tags](https://stackoverflow.com/a/25996877) as these are intended for release. 
5. Push new commit to remote origin with `git push`
6. Push new tag to remote origin with `git push --tags`. Travis CI will detect the new tag and launch into the build and release process as specified in `.travis.yml`

### Tips

- Changes to deployment configuration in `.travis.yml` can be [validated using online checker](https://config.travis-ci.com/explore)
- If deployment fails because authorization fails, may [need to regenerate personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) and update the Travis CI environment variables with this new value. Note that deployments are authenticated using the dedicated deployment account `@ericbaibot` 
