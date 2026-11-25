// Node module hooks for scripts/check-post.mjs: lets plain Node import the figures (TypeScript + JSX,
// `@/` paths, CSS imports) so they can be test-rendered without starting Next.js.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import ts from 'typescript'

const src = path.resolve(fileURLToPath(import.meta.url), '../../src')
const exts = ['.tsx', '.ts', '/index.tsx', '/index.ts']

function find(base) {
  if (/\.(tsx?|css)$/.test(base) && fs.existsSync(base)) return base
  for (const e of exts) if (fs.existsSync(base + e)) return base + e
  return null
}

export async function resolve(specifier, context, next) {
  if (specifier.startsWith('@/')) {
    const file = find(path.join(src, specifier.slice(2)))
    if (file) return { url: pathToFileURL(file).href, shortCircuit: true }
  }
  if ((specifier.startsWith('./') || specifier.startsWith('../')) && context.parentURL?.startsWith('file:')) {
    const file = find(path.resolve(path.dirname(fileURLToPath(context.parentURL)), specifier))
    if (file) return { url: pathToFileURL(file).href, shortCircuit: true }
  }
  return next(specifier, context)
}

export async function load(url, context, next) {
  if (url.endsWith('.css')) {
    // CSS modules: every class name maps to itself.
    return { format: 'module', shortCircuit: true, source: 'export default new Proxy({}, { get: (_, k) => String(k) })' }
  }
  if (/\.tsx?$/.test(url) && url.startsWith('file:')) {
    const file = fileURLToPath(url)
    const out = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
      fileName: file,
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
        verbatimModuleSyntax: false,
      },
    })
    return { format: 'module', shortCircuit: true, source: out.outputText }
  }
  return next(url, context)
}
