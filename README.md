# clean-rn monorepo

## Presentation of clean-rn monorepo

This monorepo contains one application, `bank-app` is bank mobile application with bank services, and `energy-app` is the mobile application with only energy services. It also contains an ui library `ui-mobile` that is exposed in a web-app storybook.

You can simply import any component in your application this way (example with PrimaryButton component and Love svg asset):

```
import { PrimaryButton, Love } from '@clean-rn/ui-mobile';
```

## Prerequisites

node v18.18.0, npm

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

3. Install / update OS to Sequoia 15.5 and Xcode v16.4

4. Then create an expo account (https://expo.dev/), and ask administrator (michael.Smith@example.com) tobe added to your Sentry organization

5. Install eas-cli: necessary to build, or start expo server in developement mode

```
npm install -g eas-cli@16.13.3
```

6. Login in eas-cli

```
npx eas login
```

Enter email and password as invited by cli.

## How to run the app locally

1. Install an Expo development build on ios Simulator
   There are some native libs in this project. You won't be able to run the apps on Expo Go ("Expo development build"). You need to build a custome Expo Go for developing locally (this done thanks to the brilliant lib expo-dev-client, already installed in the project).
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
# synchronize dependencies from monorepo root to bank-app app (this will copy package-lock.json from the root to the app)
# this is necessary because we build and deploy with EAS (Expo Application Services) with expo managed workflow
# and this workflow is not able to resolve dependencies from monorepo root
npm run eas-build-pre-install
# install dependencies at app level
npm i
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

You can run the storybook as follow (yes, we need to change "ui-mobile" name !):

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

On free expo tier, you may have 1 or 2h of delay.

## CI/CD

We use gitlab pipeline to build and test the apps
It builds a preview of bank-app for ios and android, and storybook for web thanks to chromatic.
CI/CD is launched in each MR, and on each push on main branch.
Do not forget to validate ui components changes on chromatic before merging your MR. Pipeline is waiting for your review.

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

New ui components should be added in ui-mobile lib, in components folder.
You can check whether coverage is 100% met with libs > ui-mobile > coverage > lcov-report > index.html file opened in your OS file manager (coverage folder is not committed, and can be launched byt running once `npm run test``)

Each new ui component should be showed in storybook app. Simply add a file in storybook > src > app > stories, with the following pattern : ComponentName.stories.tsx

## Create a new lib

For instance, beneficiary/infrastructure

```bash
npx nx g @nx/expo:lib beneficiary/infrastructure
```

## Troubleshooting

### Fix package incompatibility

In a Expo, it is recommended to install package with `npx expo install <my_lib>`.
How do we do in a monorepo? `npm i <my_lib>` at the root repo.
It may install versions incompatibles with expo. So clean up the incompatibilities as follow for instance for BankApp:

```
cd apps/bank-app
npm run eas-build-re-install
npx expo-doctor
npx expo install --fix
```

and copy back apps/bank-app/package.json to package.json

By the way, you can check eas build on your own infra this way (this is faster and free):

```
cd apps/bank-app
eas build --platform=android --local
```

### Reset nx cache

Sometimes, nx is unable to solve its graph, (can happen when command nx test is launched, or other nx commands). Please reset nx cache to solve the issue:
`npx nx reset`
