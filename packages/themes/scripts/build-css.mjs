import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { transform } from 'lightningcss'

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const sourcePath = resolve(packageRoot, 'src/default.css')
const outputPath = resolve(packageRoot, 'dist/default.css')
const source = await readFile(sourcePath)
const result = transform({
  code: source,
  filename: sourcePath,
  minify: false,
})

await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, result.code)
