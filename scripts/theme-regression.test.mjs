import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const cssPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/index.css')
const css = readFileSync(cssPath, 'utf8')

const forbiddenPatterns = [
  /\[class\*=\s*'text-slate-'\]/i,
  /\[class\*=\s*'bg-white'\]/i,
  /\[class\*=\s*'bg-slate-'\]/i,
  /body\[data-theme='dark'\]\s+div\s*,/i,
  /body\[data-theme='dark'\]\s+section\s*,/i,
  /body\[data-theme='dark'\]\s+main\s*,/i,
]

const issues = forbiddenPatterns
  .map((pattern, index) => ({ pattern, index }))
  .filter(({ pattern }) => pattern.test(css))
  .map(({ index }) => `forbidden pattern #${index + 1}`)

if (issues.length > 0) {
  console.error('Tema oscuro: patrones agresivos detectados en CSS:', issues.join(', '))
  process.exit(1)
}

const requiredThemeTokens = [
  "body[data-theme='light']",
  "body[data-theme='dark']",
  '--texto-principal',
  '--fondo',
  '--superficie',
]

const missing = requiredThemeTokens.filter((token) => !css.includes(token))
if (missing.length > 0) {
  console.error('Tema: faltan tokens de tema', missing.join(', '))
  process.exit(1)
}

const securityChecks = [
  ['PasswordField component exists', /PasswordField/gi.test(readFileSync(new URL('../src/components/PasswordField.tsx', import.meta.url), 'utf8'))],
  ['Password toggle CSS exists', /\.password-toggle|\.password-field/gi.test(css)],
  ['Landing anchor scroll offset exists', /section\[id\]\s*\{\s*scroll-margin-top\s*:\s*6rem\s*;?/i.test(css)],
  ['Landing section keeps compact typography', /\.ragikon-word\s*\{[^}]*font-size\s*:\s*clamp\(1\.25rem,\s*2\.3vw,\s*2\.1rem\)/i.test(css)],
]

for (const [label, ok] of securityChecks) {
  if (!ok) {
    console.error(`UI regression: ${label}`)
    process.exit(1)
  }
}

const authFiles = [
  '../src/pages/Ingresar.tsx',
  '../src/pages/Registro.tsx',
  '../src/pages/Perfil.tsx',
]

for (const file of authFiles) {
  const source = readFileSync(new URL(file, import.meta.url), 'utf8')
  if (!source.includes('PasswordField')) {
    console.error(`Auth regression: ${file} does not use PasswordField`)
    process.exit(1)
  }
}

console.log('Theme regression test: OK')
