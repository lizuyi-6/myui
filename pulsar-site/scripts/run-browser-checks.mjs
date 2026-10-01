import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
const require = createRequire(import.meta.url);
const cli = path.join(path.dirname(require.resolve('@playwright/cli/package.json')), 'playwright-cli.js');
const session = 'pulsar-site-checks';
const run = args => {
  const result = spawnSync(process.execPath, [cli, `-s=${session}`, ...args], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return result.stdout;
};
fs.mkdirSync('output/playwright', { recursive: true });
run(['open', 'http://127.0.0.1:5300']);
let failed = 0;
try {
  for (const [file, name, expected] of [['verify-site.cjs','behavior',25],['verify-demos.cjs','demos',15],['check-layout.cjs','layout',42]]) {
    const raw = run(['run-code', `--filename=scripts/${file}`, '--raw']);
    const result = JSON.parse(raw);
    fs.writeFileSync(`output/playwright/${name}-pass.json`, JSON.stringify(result, null, 2));
    console.log(`${name}: total=${result.total}; passed=${result.passed}; failed=${result.failed}; skipped=${result.skipped}`);
    assert.equal(result.total, expected);
    if (result.failed !== 0 || result.skipped !== 0 || result.errors.length !== 0) { console.log(JSON.stringify({failures:(result.rows ?? result.results).filter(row=>!row.passed),errors:result.errors})); failed++; }
  }
} finally { run(['close']); }
assert.equal(failed, 0);
