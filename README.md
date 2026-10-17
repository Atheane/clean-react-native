# bank monorepo

## Prerequisites
node v18.14.2, npm

npx installed
```
npm install -g npx
```
nx can be installed locally

## Getting started

This repository is a monorepo, managed by nx https://nx.dev/

```
npm install
```

Create an expo application

```
npx nx g @nx/expo:app <your-app-name>
```

Start the app
```
npx nx start <your-app-name>
```

Install Expo Go on your iPhone or Android
Flash the QR code

This monorepo already contains two application, `bank-app` is bank mobile application, and `storybook` is the application showing bank mobile application components in a isolated application. It also contains an ui library `ui-mobile`. You can simply import any component in your application this way (example with PrimaryButto component and Love svg asset):

```
import { PrimaryButton, Love } from '@bank/ui-mobile';
```

To start storybook:
```
npx nx start storybook
```

## Tests

To run tests for the whole monnorepo
```
npm run test
```
It will run tests on all affected app and lib in monorepo.

To run tests just for your lib or app (example with ui-mobile lib)
```
npx nx test ui-mobile
```

## Commits, commitzen and pre-commit hook, linter and formatter

```
git commit
```

It will launch commitzen cli to help you shape clean commits.

There is a pre-commit hook that will check if code is correctly linted.

If you are on vscode IDE, you can simply install vscode extensions:
dbaeumer.vscode-eslint
esbenp.prettier-vscode

and define the following settings in .vscode > settings.json

```
{
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": false,
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true
    },
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
}
```

It will save prettier formatting on saving and show eslint rules warn and errors in editor.

## Push

```
git push origin your_branch
```

This will launch pre-push husk hook and block push if tests fails or if test coverage requirements are not met.

## Add a component

New ui compoennts should be added in ui-mobile lib, in components folder.
Please also make sure to add a snapshot test in __tests__ folder. You can check whether coverage is 100% met with libs > ui-mobile > coverage > lcov-report > index.html file opened in your OS file manager (coverage folder is not committed, and can be launched byt running once `npm run test``)

Each new ui component should be showed cased in storybook app. Simply add a file in storybook > src > app > stories, with the following pattern : ComponentName.stories.tsx

In story file, import component from “@bank/ui-mobile” to display it in storybook app

For now, you have to add manually this line of code in Storybook > app > .storybook > storybook.requires.ts

```jsx
const getStories = () => {
  return {
...
    './stories/ComponentName.stories.tsx': require('../stories/ComponentName.stories'),
...
  };
};
```

I will add a script to do it with a nx command

Now simply start storybook app to display new component in storybook

```bash
npx nx start storybook
```

## Deployment with expo

1. Install eas-cli

```
npm install -g eas-cli
```

2. Then create a expo account (https://expo.dev/) and login in eas-cli

```
npx eas login
```

3. Enter email and password as invited by cli.

4. Register env variables as secrets on https://expo.dev/accounts/CleanRN/projects/<your-app-name>/secrets

5. Build

```
nx build <your-app-name>
```

cli will guide you on Android and ios

On free expo tier, you may have 1 or 2h of delay. You will find .aab on expo platform (url will be display by eas-cli).