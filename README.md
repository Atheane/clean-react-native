# clean-rn monorepo

## Presentation of clean-rn monorepo

This monorepo already contains two application, `bank-app` is bank mobile application, and `storybook` is the application showing bank mobile application components in a isolated application. It also contains an ui library `ui-mobile`.

You can simply import any component in your application this way (example with PrimaryButton component and Love svg asset):

```
import { PrimaryButton, Love } from '@clean-rn/ui-mobile';
```

## Prerequisites

node v18.14.2, npm

1. npx installed

```
npm install -g npx
```

nx can be installed locally

This repository is a monorepo, managed by nx https://nx.dev/

2. Install the repository dependencies

```
npm install
```

3. Install / update Xcode (at least v14.2)

4. Then create a expo account (https://expo.dev/)

5. Create two projects expo, one for each app (bank-app and storybook). The project names must be the same as those declared in ./apps/bank-app/app.config.ts and ./apps/storybook/app.config.ts files.

6. Replace the project ids in app.config.ts files.

7. Install eas-cli: necessary to build, or start expo server in developement mode

```
npm install -g eas-cli
```

8. Login in eas-cli

```
npx eas login
```

Enter email and password as invited by cli.

9. Register env variables as secrets on https://expo.dev/accounts/<your-account>/projects/<your-app-name>/secrets

10. Install expo-dev-client: necessary to run the app locally

npx expo install expo-dev-client

## How to run the app locally

1. Install an Expo development build on ios Simulator
   There are some native libs in this project. You won't be able to run the apps on Expo Go ("Expo development build"). You need to build a customer Expo Go for developing locally.
   In order to build and install an Expo development build on ios simulator:

```
npx nx build bank-app --profile=development-simulator --platform=ios
```

It should open the simulator and install the build on it.

1. Launch an expo server for the app (bank-app | storybook)

```
npx nx start bank-app --dev-client
```

It should open the app on the simulator and let you see logs in terminal

ALTERNATIVES:

2. Install an Expo development build on ios | android

```
npx nx build bank-app --profile=development --platform=android
```

Wait for several minutes

3. Retrieve build on expo.dev
   Go to expo.dev, on the project dashboard, click on ios | android internal build {version}, then click on Install
   It will show a QR code that will install the .ipa on ios, and .apk on android, proceed to install the .apk once download (.ipa will install by itself)
   Launch the app locally as in step 11.

4. To run storybook, please build and install an Expo development build on simulator or on Andoird / Iphone (sames steps as above, just replace "bank-app" by "storybook" in cli)
   To start storybook:

```
npx nx start storybook --dev-client
```

## How to build the app for production

1. Prerequisite :

For ios, you need:

- an apple developer account
- be added the Team organization (ask to the maintainer to add you)
- add the provisioning profile
  cli will do the rest

2. Build

```
npx nx build bank-app
```

It will select app.config.ts production profile and offer a build for both android and ios in cli. Just follow the instruction

On free expo tier, you may have 1 or 2h of delay. You will find .aab on expo platform (url will be display by eas-cli).

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

There is a pre-commit hook that will check if code is correctly linted. If lint problems are identified, you can fixed them this way

```
npx nx affected:lint --fix
```

If you are on vscode IDE, you can simply install vscode extensions:
dbaeumer.vscode-eslint
esbenp.prettier-vscode

and define the following settings in .vscode > settings.json

```
{
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
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
Please also make sure to add a snapshot test in **tests** folder. You can check whether coverage is 100% met with libs > ui-mobile > coverage > lcov-report > index.html file opened in your OS file manager (coverage folder is not committed, and can be launched byt running once `npm run test``)

Each new ui component should be showed cased in storybook app. Simply add a file in storybook > src > app > stories, with the following pattern : ComponentName.stories.tsx

In story file, import component from “@clean-rn/ui-mobile” to display it in storybook app

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

## Create a new lib

For instance, beneficiary/infrastructure

```bash
npx nx g @nx/expo:lib beneficiary/infrastructure
```

## Troubleshooting

1. Error relatives to env variables
   Loaded "env" configuration for the "production" profile: no environment variables specified. Learn more: https://docs.expo.dev/build-reference/variables/
   Entity not authorized: AccountEntity[1a1b3fa8-3a19-48e9-835b-b62df6b2791f] (viewer = RegularUserViewerContext[96a77a66-f269-4893-bc25-9cc5cb663333], action = READ, ruleIndex = -1)
   Request ID: 14a87454-a421-4d6a-bafe-3376b03668b0
   Error: GraphQL request failed.

=> you need to add env variables on expo.dev > project > secrets

2. Bug in expo

✔ Xcode must be fully installed before you can continue. Continue to the App Store? … yes
Going to the App Store, re-run Expo CLI when Xcode has finished installing.
https://github.com/expo/expo/issues/21727

```
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
```
