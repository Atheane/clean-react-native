# clean-rn monorepo

## Presentation of clean-rn monorepo

This monorepo contains one application, `bank-app` is bank mobile application with bank services, and `energy-app` is the mobile application with only energy services (hereafter `your_app` will designate the app either `bank-app` or `energy-app`, your choice). It also contains an ui library `ui-mobile` that is exposed in a web-app storybook.

You can simply import any component in your application this way (example with PrimaryButton component and Love svg asset):

```
import { PrimaryButton, Love } from '@clean-rn/ui-mobile';
```

## Prerequisites

### node v18.18.0, npm

### npx installed

```
npm install -g npx
```

> nx can be installed locally
> This repository is a monorepo, managed by nx https://nx.dev/

### Install the repository dependencies

```
npm install
```

### Install / update OS to Sequoia 15.5 and Xcode v16.4

### EAS

> These apps are built with Expo Application Services (managed workflow). See for difference between managed vs bare workflow : https://medium.com/@mehro_z/choosing-between-managed-and-bare-workflow-in-expo-a-comprehensive-difference-7086305f1480
> Just be aware that this article did not mentionned that today, managed workflow also manage native modules thanks to expo-dev-client and development build ;)

> Create an expo account (https://expo.dev/)

> Ask administrator (michael.Smith@example.com) to add your account to `your Sentry organization`.

### eas-cli

> Install eas-cli: necessary to build, or start expo server in development mode

```
npm install -g eas-cli@16.13.3
```

> Login in eas-cli

```
npx eas login
```

> Enter email and password as invited by cli.

## How to run the app locally on ios simulator

### Prerequisites:

> Xcode:
> Make sure you have Xcode installed and set up on your Mac.
> You can download it from the Mac App Store.

> iOS Simulator:
> iOS Simulator comes with Xcode. Check that it works (Xcode > Open Developer Tool > Simulator).

### Install an Expo development build on ios Simulator

> There are some native libs in this project. You won't be able to run the apps on Expo Go ("Expo development build").

> You need to build a custom Expo Go for developing locally (this done thanks to the brilliant lib expo-dev-client, already installed in the project).

> You can build and install an Expo development build on ios Simulator as follow:

```
# if necessary clean up cache at monorepo root
npm run clean
# install dependencies
npm install
# build and install expo dev client with eas
npx nx build your_app --platform=ios --profile=development-simulator
# wait for eas to build. cli will tell you when its done and offers to install it on simulator > Y
#once installed you just need to start serveur as such
npx nx start your_app --dev-client
# press i
```

> If terminal is closed in the meanwhile, or if you want to find a previous development-simulator build, you can find it with

```
cd apps/your_app
eas build:run --platform ios --profile development-simulator
```

### For Android ? Same process, except for:

> Prerequisites:

- Android Studio: install Android Studio and set up the required tools (SDK, virtual device/emulator).
- Android SDK & Emulator: make sure to create at least one Android Virtual Device via the AVD Manager in Android Studio.

> Same commands as for ios, just replace the platform ios by android when mentioned:

```
npx nx build your_app --platform=android --profile=development-simulator
# wait for eas to build. cli will tell you when its done and offers to install it on simulator > Y
# once installed you just need to start serveur as such
npx nx start your_app --dev-client
#press a for android
```

> If terminal is closed in the meanwhile, or if you want to find a previous development-simulator build, you can find it with

```
cd apps/your_app
eas build:run --platform android --profile development-simulator
```

## How to run the storybook locally on localhost

You can run the storybook as follow (yes, we need to change "ui-mobile" name !):

```
npx nx storybook ui-mobile
```

## How to run the app locally on ios device

> Build and install expo dev client with eas

```
npx nx build your_app --platform=ios --profile=development
```

> Wait for eas to build. cli will tell you when its done and show a QR code (also available on expo.dev interface) : scan it, and install development build

> Once installed you just need to start serveur as such

```
npx nx start your_app --dev-client
```

> Scan qr with your phone to launch development build

> Same process on android, just change platform ios by android when mentioned:

```
npx nx build your_app --platform=android --profile=development
```

## How to build the app with Expo Application Services

### Prerequisites :

> For ios, you need:

- an apple developer account
- be added the Team organization (ask to the maintainer to add you)
- add the provisioning profile
  cli will do the rest

> For android, cli does it all 🎉

### Build for preview :

> Preview step is designed to allow for manual tests, before any submission

> It is connected to production env back-end

#### ios

```
npx nx build your_app --profile=preview --platform=ios
```

> it will produce a qr code on expo.dev

> your phone need to be declared on Apple [COMPLETE EXPLANATION]

> scan QR code and install preview

#### android

```
npx nx build your_app --profile=preview --platform=ios
```

> it will produce a qr code on expo.dev, with a link to download an .apk

> follow expo.dev tutorial (need to authorize unknown developer applications on your android)

### Build for production :

#### ios

```
npx nx build your_app --profile=production --platform=ios
```

produce .ipa ready for submission on Apple Store Connect (see #Submission for details)

#### android

```
npx nx build your_app --profile=production --platform=android
```

> produce a .aab file ready for submission on Google Play Store (see ##Submission for details)

> It will select app.config.ts production profile and offer a build for both android and ios in cli. Just follow the instruction

> On free expo tier, you may have 1 or 2h of delay.

## Build without EAS (with your Mac)

```
cd apps/your_app
npm run clean
#it copies package-lock.json from monorepo root to your_app root
npm run eas-build-pre-install
npm i
#it creates ios and android folders and check it any expo plugins must be installed
npx expo prebuild
```

### android

```
cd android
# pour générer un .apk
./gradlew assembleRelease
# pour générer un .aab
./gradlew bundleRelease
```

### ios

```
cd ios
# ouvre Xcode avec le projet
xed .
# Sélectionnez votre cible (simulateur ou device réel), puis cliquez sur Product > Archive pour produire un .ipa
# your_app > General > sélectionner Apple Team et Profile
# se créer un signing Certificate si c'est la première fois
```

## CI/CD

We use gitlab pipeline to build and test the apps
It builds a preview of your_app for ios and android, and storybook for web thanks to chromatic.
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

## Create a new app in monorepo

```
npx nx g @nx/expo:app new_app
```

## Troubleshooting

### Fix package incompatibility

In a Expo, it is recommended to install package with `npx expo install <my_lib>`.
How do we do in a monorepo? `npm i <my_lib>` at the root repo.
It may install versions incompatibles with expo. Here is how to clean up incompatibilities.

```
cd apps/your_app
npm run eas-build-re-install
npx expo-doctor
npx expo install --fix
```

and copy back apps/your_app/package.json to package.json

### Reset nx cache

Sometimes, nx is unable to solve its graph, (can happen when command nx test is launched, or other nx commands). Please reset nx cache to solve the issue:
`npx nx reset`
