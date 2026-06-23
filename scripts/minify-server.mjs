// Post-build pass: minify the OpenNext server + middleware bundles in place.
//
// Why: @opennextjs/cloudflare hardcodes `options.minify = false` so it can apply
// string-replacement patches. Those patches are done by the time this runs, so it
// is safe to minify here. On some build environments the produced handler is left
// largely un-minified (~20 MB), which pushes the Worker over Cloudflare's 3 MiB
// free-plan gzip limit. This normalizes the output regardless of environment.
//
// We ONLY strip whitespace (no syntax/identifier changes). OpenNext's runtime
// resolves server chunks via string-literal paths and applies build-time string
// patches, so anything beyond whitespace removal risks breaking it. Whitespace-only
// is behavior-preserving and recovers the bulk of the size (the bloat is newlines /
// indentation left in the bundle on some build environments).
import { build } from 'esbuild'
import { existsSync, statSync } from 'node:fs'

const targets = [
  '.open-next/server-functions/default/handler.mjs',
  '.open-next/middleware/handler.mjs',
]

const kib = (n) => `${Math.round(n / 1024)} KiB`

let totalSaved = 0
for (const file of targets) {
  if (!existsSync(file)) {
    console.log(`minify-server: skip (not found) ${file}`)
    continue
  }
  const before = statSync(file).size
  await build({
    entryPoints: [file],
    outfile: file,
    allowOverwrite: true,
    bundle: false,
    minifyWhitespace: true,
    minifySyntax: false,
    minifyIdentifiers: false,
    format: 'esm',
    platform: 'node',
    target: 'es2022',
    legalComments: 'none',
    logLevel: 'error',
  })
  const after = statSync(file).size
  totalSaved += before - after
  console.log(`minify-server: ${file}  ${kib(before)} -> ${kib(after)}`)
}
console.log(`minify-server: total saved ${kib(totalSaved)}`)
