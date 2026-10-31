/*
 * Ce script vérifie s'il existe un package.json local dans l'application.
 * S'il existe, il le conserve. Sinon, il copie celui de la racine du monorepo.
 * Il est exécuté comme script eas-build-pre-install dans le 'package.json' de l'app Expo.
 * Commande : 'node tools/scripts/eas-build-pre-install.mjs <workspace root> <project root>'
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const [workspaceRoot, projectRoot] = process.argv.slice(2);

if (!workspaceRoot) {
  throw new Error('Missing workspace root');
}
if (!projectRoot) {
  throw new Error('Missing project root');
}

try {
  const projectPackagePath = join(projectRoot, 'package.json');

  // Vérifier si un package.json local existe dans l'application
  if (existsSync(projectPackagePath)) {
    console.log('Local package.json found in the app. Keeping it as is.');
  } else {
    console.log('No local package.json found. Copying from workspace root.');

    // Lire le package.json du workspace
    const workspacePackage = JSON.parse(readFileSync(join(workspaceRoot, 'package.json')).toString());

    // Créer un nouveau package.json pour le projet
    const projectPackage = {
      name: workspacePackage.name,
      version: workspacePackage.version,
      dependencies: workspacePackage.dependencies,
      devDependencies: workspacePackage.devDependencies,
    };

    // Écrire le nouveau package.json dans le dossier du projet
    writeFileSync(projectPackagePath, JSON.stringify(projectPackage, null, 2));

    console.log('package.json copied from workspace root to project directory.');
  }
} catch (e) {
  console.error('Error processing package.json:', e);
}
