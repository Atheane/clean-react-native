/**
 * This script is used to patch the '@nx/expo' package to work with EAS Build.
 * It is run as a eas-build-post-install script in the 'package.json' of expo app.
 * It is executed as 'node tools/scripts/eas-build-post-install.mjs <workspace root> <project root>'
 * It will create a symlink from the project's node_modules to the workspace's node_modules.
 */

import { symlink, existsSync } from 'fs';
import { join } from 'path';
import { readFileSync } from 'fs';


const [workspaceRoot, projectRoot] = process.argv.slice(2);

if (existsSync(join(workspaceRoot, 'node_modules'))) {
  console.log('Symlink already exists');
  process.exit(0);
}

symlink(
  join(projectRoot, 'node_modules'),
  join(workspaceRoot, 'node_modules'),
  'dir',
  (err) => {
    if (err) console.log(err);
    else {
      console.log('Symlink created');
    }
  }
);

const packages = ["metro-config", "@rneui/base", "dayjs", "i18next", "expo-font"];

try {
  console.log("Installed package versions:");
  packages.forEach(packageName => {
    try {
      // Construit le chemin vers le fichier package.json du module
      const packagePath = join('node_modules', packageName, 'package.json');
      // Lit le contenu du fichier package.json
      const packageJson = readFileSync(packagePath, 'utf8');
      // Parse le contenu JSON pour obtenir l'objet
      const packageObj = JSON.parse(packageJson);
      // Imprime la version du package
      console.log(`${packageName}@${packageObj.version}`);
    } catch (e) {
      console.error(`Error retrieving version for package ${packageName}:`, e.message);
    }
  });
} catch (e) {
  console.error('Error executing version retrieval script:', e.message);
}
