import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repositoryRoot = new URL('..', import.meta.url)
const packageDirectories = await readdir(new URL('packages/', repositoryRoot), {
  withFileTypes: true,
})

// These rules encode the dependency graph in executable form so a package
// cannot acquire a convenient but architecturally invalid dependency unnoticed.
const allowedWorkspaceDependencies = new Map([
  ['@slop-ui/shared', new Set()],
  ['@slop-ui/core', new Set(['@slop-ui/shared'])],
  ['@slop-ui/themes', new Set()],
  ['@slop-ui/vue', new Set(['@slop-ui/core', '@slop-ui/shared'])],
])

const violations = []

for (const directory of packageDirectories) {
  if (!directory.isDirectory()) continue

  const packageJsonPath = join(
    fileURLToPath(new URL('packages/', repositoryRoot)),
    directory.name,
    'package.json',
  )
  const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'))
  const allowedDependencies = allowedWorkspaceDependencies.get(packageJson.name)

  if (!allowedDependencies) {
    violations.push(`Unregistered package boundary: ${packageJson.name}`)
    continue
  }

  const dependencyGroups = [
    packageJson.dependencies ?? {},
    packageJson.peerDependencies ?? {},
    packageJson.optionalDependencies ?? {},
  ]

  for (const dependencyName of dependencyGroups.flatMap(Object.keys)) {
    if (
      dependencyName.startsWith('@slop-ui/') &&
      !allowedDependencies.has(dependencyName)
    ) {
      violations.push(`${packageJson.name} may not depend on ${dependencyName}`)
    }
  }
}

if (violations.length > 0) {
  console.error(violations.join('\n'))
  process.exitCode = 1
} else {
  console.log('Package dependency boundaries are valid.')
}
