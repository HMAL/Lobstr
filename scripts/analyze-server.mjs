// Build-time diagnostic: print what dominates the OpenNext server bundle so the
// remote (Cloudflare) build log reveals why handler.mjs is larger there than locally.
// Wired into cf:build temporarily. Safe/read-only.
import { readFileSync, statSync, existsSync } from 'node:fs'

const file = '.open-next/server-functions/default/handler.mjs'
if (!existsSync(file)) {
  console.log(`analyze-server: ${file} not found`)
  process.exit(0)
}

const src = readFileSync(file, 'latin1') // byte-accurate
const total = statSync(file).size
const mb = (n) => `${(n / 1024 / 1024).toFixed(2)} MB`

console.log(`\n=== analyze-server: handler.mjs = ${mb(total)} (${total} bytes) ===`)

// 1) Inlined binary/base64 blobs (wasm, fonts, images) — biggest gzip-resistant offenders.
const base64Runs = src.match(/[A-Za-z0-9+/]{2000,}/g) || []
const base64Total = base64Runs.reduce((a, s) => a + s.length, 0)
const top = base64Runs.map((s) => s.length).sort((a, b) => b - a).slice(0, 5)
console.log(`inlined base64/binary blobs: count=${base64Runs.length}, total=${mb(base64Total)}, largest=${top.map(mb).join(', ') || 'none'}`)
const dataUrls = (src.match(/data:[a-z/+.-]+;base64,/g) || []).length
console.log(`data: URLs (wasm/img inlined): ${dataUrls}`)

// 2) Presence + occurrence counts of suspected heavy dependencies.
const markers = [
  'resvg', 'yoga.wasm', '@vercel/og', 'satori', 'ImageResponse',
  'sharp', '@img/', 'onnxruntime', 'caniuse', 'core-js',
  'THREE', 'three/', 'framer-motion', 'lucide',
  'jsonwebtoken', 'compiled/edge-runtime', 'app-page-turbo', 'app-page.runtime',
]
console.log('marker occurrence counts:')
for (const m of markers) {
  const c = src.split(m).length - 1
  if (c > 0) console.log(`  ${m.padEnd(24)} ${c}`)
}
console.log('=== end analyze-server ===\n')
