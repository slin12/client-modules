# CLIENT MODULES

_Shared node modules for codecademy.com & co_

---

[![CircleCI](https://circleci.com/gh/Codecademy/client-modules.svg?style=svg&circle-token=3d9adfca5a8b44e7297ceb18e032e89a11d223a2)](https://circleci.com/gh/RyzacInc/client-modules)
[![codecov](https://codecov.io/gh/Codecademy/client-modules/branch/master/graph/badge.svg)](https://codecov.io/gh/Codecademy/client-modules)

This repository is a monorepo that we manage using [Lerna](https://lernajs.io/). That means that we publish several packages to npm from the same codebase, including:

[`gamut`: Our React UI component library](/packages/gamut/README.md)

[`gamut-styles`: Utility styles for gamut components and codecademy apps](/packages/gamut-styles/README.md)

[`gamut-icons`: SVG Icons for gamut components and codecademy apps](/packages/gamut-icons/README.md)

[`styleguide`: Styleguide Documentation & storybook development sandbox](/packages/styleguide/README.md)

## Local development

1.  Run `yarn` in the root directory
1.  Run `yarn lerna bootstrap` to prep each package in the `packages` directory for development
1.  Run `yarn build-all`

### Running the storybook styleguide

1.  Run `yarn start` to start the storybook server
1.  Add new stories to `packages/styleguide/stories`
1.  Stories are written using storybook's [Component Story Format](https://storybook.js.org/docs/formats/component-story-format/)

### Publishing Modules

1.  Make your changes in a feature branch, and get another engineer to review your code
1.  After you've reviewed and tested your code, you can merge your branch into master.
1.  To merge your changes, use the "squash and merge" button in github. Make sure you update the title/description of the merge to match the [commit message guide](#commit-message-guide), otherwise it will not generate a detailed changelog entry.
1.  Once your branch is merged into master, it will be published automatically by CircleCI.
1.  You can check the master branch or CircleCI for the new version number

### Publishing an alpha version of a module

Every PR that changes files in a package publishes alpha releases that you can use to test your changes across applications

1.  Create a PR
1.  In the github "checks" UI, find the "Publish Alpha" task
1.  Once this check has passed, click on it, and look through the output for the alpha version number
1.  Use this version in the other application you want to test your changes on

### Commit Message Guide

Commits follow the [Angular format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit)

### Commit Format

The squash and merge commit should follow a convention:

```
type(scope): message
```

Examples:

```
fix: fixes some component
```

```
test: adds test to component
```

```
feat(component): :sparkles: An awesome new component
```

This message should go inside the title field of the message:

![screen shot 2019-03-04 at 10 41 07 am](https://user-images.githubusercontent.com/6455018/53745157-79101d00-3e6c-11e9-9b5f-e35582106b31.png)

**Type**

The `type` determines what kind of version bump is needed. A `fix` will create a `patch` release, while a `feat` will create a `minor` release. Major releases are only created when the text `BREAKING CHANGE:` is included in the `Body` or `Footer` of the commit message.

`type` must be one of the following:

- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **test**: Adding missing tests or correcting existing tests
- **ci**: Changes to our CI configuration files and scripts
- **build**: Changes that affect the build system or external dependencies

**Scope**

Optional scope for your changes

**Body**

Optional extra description for your changes

This is where you should describe any version breaking changes by including the text `BREAKING CHANGE:` with your description.

### Publishing the storybook

1.  Storybook is built and published automatically when there are merges into the master branch