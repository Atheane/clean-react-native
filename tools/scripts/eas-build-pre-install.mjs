import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const [workspaceRoot, projectRoot] = process.argv.slice(2);

if (!workspaceRoot) {
  throw new Error('Missing workspace root path argument');
}
if (!projectRoot) {
  throw new Error('Missing project root path argument');
}

function extractProjectName(projectRoot, workspaceRoot) {
  const relativePath = projectRoot.replace(workspaceRoot, '').replace(/^\//, '');
  const projectName = relativePath.split('/').pop();
  return projectName;
}

function getDependenciesFromProjectGraph(projectName) {
  try {
    console.log('Getting dependencies for project:', projectName);
    const result = execSync(`npx nx graph --file=project-graph.json --focus=${projectName}`, {
      encoding: 'utf8',
      cwd: workspaceRoot,
    });

    const graphPath = join(workspaceRoot, 'project-graph.json');
    if (!existsSync(graphPath)) {
      console.error('Project graph file not found at:', graphPath);
      return [];
    }

    const graphData = JSON.parse(readFileSync(graphPath, 'utf8'));
    const dependencies = new Set();

    if (graphData.graph && graphData.graph.dependencies) {
      const projectDeps = graphData.graph.dependencies[projectName] || [];
      projectDeps.forEach((dep) => {
        dependencies.add(dep.target);
      });
    }

    // Nettoyage
    try {
      execSync(`rm ${graphPath}`, { cwd: workspaceRoot });
    } catch (e) {
      console.warn('Failed to clean up project-graph.json:', e);
    }

    return Array.from(dependencies);
  } catch (error) {
    console.error('Error getting dependencies:', error);
    return [];
  }
}

async function main() {
  try {
    console.log('Workspace root:', workspaceRoot);
    console.log('Project root:', projectRoot);

    // Extraire le nom du projet
    const projectName = extractProjectName(projectRoot, workspaceRoot);
    console.log('Project name:', projectName);

    const projectPackagePath = join(projectRoot, 'package.json');
    const workspacePackagePath = join(workspaceRoot, 'package.json');

    if (!existsSync(workspacePackagePath)) {
      throw new Error(`Workspace package.json not found at: ${workspacePackagePath}`);
    }

    const workspacePackage = JSON.parse(readFileSync(workspacePackagePath, 'utf8'));

    let existingProjectPackage = {};
    if (existsSync(projectPackagePath)) {
      existingProjectPackage = JSON.parse(readFileSync(projectPackagePath, 'utf8'));
      console.log('Existing package.json found. Updating dependencies...');
    } else {
      console.log('Creating new package.json with resolved dependencies...');
    }

    const projectDeps = getDependenciesFromProjectGraph(projectName);
    console.log('Resolved dependencies:', projectDeps);

    const filteredDependencies = {};
    projectDeps.forEach((dep) => {
      if (workspacePackage.dependencies[dep]) {
        filteredDependencies[dep] = workspacePackage.dependencies[dep];
      }
    });

    // Fusionner avec les dépendances existantes
    const mergedDependencies = {
      ...existingProjectPackage.dependencies,
      ...filteredDependencies,
    };

    const updatedProjectPackage = {
      ...existingProjectPackage,
      name: existingProjectPackage.name || projectName,
      version: existingProjectPackage.version || workspacePackage.version,
      dependencies: mergedDependencies,
    };

    writeFileSync(projectPackagePath, JSON.stringify(updatedProjectPackage, null, 2) + '\n');
    console.log('package.json updated successfully at:', projectPackagePath);
  } catch (e) {
    console.error('Error in main process:', e);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
