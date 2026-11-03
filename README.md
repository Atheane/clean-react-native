# clean-rn monorepo

## Presentation of clean-rn monorepo

This monorepo already contains two application, `bank-app` is bank mobile application, and `storybook` is the application showing bank mobile application components in a isolated application. It also contains an ui library `ui-mobile`.

You can simply import any component in your application this way (example with PrimaryButton component and Love svg asset):
```
import { PrimaryButton, Love } from '@clean-rn/ui-mobile';
```

## Prerequisites

node v18.17.0, npm

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

4. Then create an expo account (https://expo.dev/), and ask administrator (dev1@example.com) tobe added to your Sentry organization

5. Install eas-cli: necessary to build, or start expo server in developement mode

```
npm install -g eas-cli@7.2.0
```

6. Login in eas-cli

```
npx eas login
```

Enter email and password as invited by cli.


## How to run the app locally

1. Install an Expo development build on ios Simulator
   There are some native libs in this project. You won't be able to run the apps on Expo Go ("Expo development build"). You need to build a customer Expo Go for developing locally (this done thanks to the brilliant lib expo-dev-client, already installed in the project).
   
2. You can build and install an Expo development build on ios Simulator as follow:

```
# if necessary clean up cache at monorepo root
npm run clean
# install dependencies
npm install
# build and install expo dev client
cd apps/bank-app
# if necessary clean up cache at bank-app app level
npm run clean
# synchronize dependencies from monorepo root to bank-app app
# this is necessary because we build and deploy with EAS (Expo Ammplicaiton Services) with expo managed workflow
# and this workflow is not able to resolve dependencies from monorepo root
npm run eas-build-pre-install 
# generate ios and android files
npx expo prebuild
# run ios simulator
npx expo run:ios
# or run android simulator
npx expo run:android
# wait for build to be installed in simulator
# it may take at least 5 minutes, the project has a lot of dependencies
# once it is done, you can launch the app from monorepo root
# the whole process is only necessary if you have installed a new lib in the project 
# if not, you just need to run the app from monorepo root as follow
npx nx start bank-app --dev-client
```

## How to run the storybook locally

There are two storybook applications, one for web, and one for mobile.

For mobile, you can run the storybook as follow:
```
npx nx start storybook --dev-client
```
If you need to install build on ios or android simulator, you can do it as follow:
# if necessary clean up cache at monorepo root
npm run clean
# install dependencies
npm install
# build and install expo dev client
cd apps/storybook
# if necessary clean up cache at bank-app app level
npm run clean
# synchronize dependencies from monorepo root to storybook app
npm run eas-build-pre-install 
# generate ios and android files
npx expo prebuild
# run ios simulator
npx expo run:ios
# or run android simulator
npx expo run:android
# wait for build to be installed in simulator
# once it is done, you have to launch the app from monorepo root
# for some reason, we cannot launch the app from app/storybook (only install it)
# this will be investigate later
npx nx start storybook --dev-client
```

For web, you can run the storybook as follow (yes, we need to change "ui-mobile" name !):
```
npx nx storybook ui-mobile
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

## CI/CD

We use gitlab pipeleine to build and test the apps
It builds a preview of bank-app for ios and android, and storybook for web thanks to chromatic.
CI/CD is lanuch in each MR, and on each push on main branch.
Do not forget to validate ui components chages on chromatic before merging your MR. Pipeleine is waiting for your review.

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

### Fix package incompatibility

In a Expo, it is recommended to install package with `npx expo install <my_lib>`.
How we do in a monorepo? `npm i <my_lib>` at the root repo.
It may install versions incompatibles with expo. So clean up the incompatibilities as follow for instance for BankApp:

```
cd apps/bank-app
npm run eas-build-re-install
npx expo-doctor
npx expo install --fix
```

and copy back apps/bank-app/package.json to package.json

Yes I know, monorepo and expo are not entirely mature yet. But this is the way to maintain healthy and compatible versions that won't explode once you launch a build on eas (eas often change version or their cloud tools so, freeze you version and maintain compatible version this way).

By the way, you can check eas build on your own infra this way (this is faster and cheaper):

```
cd apps/bank-app
eas build --platform=android --local
```
