import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import assert from 'node:assert/strict';
import { localCollection } from '../src/constants/LocalCollection.js';
import { componentMetadata } from '../src/constants/Information.js';
import { componentMap } from '../src/constants/Components.js';
import { getComponentCatalog } from '../src/utils/catalog.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalog = getComponentCatalog();
const typed = [];
const rows = [];
for (const item of localCollection) {
  assert.equal(Boolean(componentMap[item.slug]), true, `${item.name} missing route`);
  assert.equal(catalog.filter(entry => entry.meta.name === item.name).length, 1, `${item.name} must appear exactly once in the catalog`);
  assert.equal(componentMetadata[`${item.category}/${item.name}`].meta.origin, 'local');
  let css;
  const behavior = [];
  for (const variant of ['content', 'tailwind', 'ts-default', 'ts-tailwind']) {
    const extension = variant.startsWith('ts-') ? 'tsx' : 'jsx';
    const file = `src/${variant}/${item.category}/${item.name}/${item.name}.${extension}`;
    const source = fs.readFileSync(path.join(root, file), 'utf8');
    assert.equal(source.startsWith("'use client';"), true, `${file}: client directive`);
    assert.equal(source.includes("../../hooks"), false, `${file}: copied component cannot depend on a host hook`);
    assert.equal(source.includes('var(--accent)'), false, `${file}: no PULSAR theme dependency`);
    assert.equal(source.includes(`./${item.name}.css`), !variant.endsWith('tailwind'), `${file}: styling variant contract`);
    const compiled = ts.transpileModule(source, { fileName: file, compilerOptions: { jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext }, reportDiagnostics: true });
    assert.equal(compiled.diagnostics?.length ?? 0, 0, `${file}: parse diagnostics`);
    // Ignore only generated styling representations, then compare the executed
    // component and hook logic after TypeScript is erased.
    const ast = ts.createSourceFile(file + '.js', compiled.outputText, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
    const statements = ast.statements.filter(statement => !(ts.isImportDeclaration(statement) && statement.moduleSpecifier.text.endsWith('.css'))).map(statement => {
      if (!ts.isVariableStatement(statement) || statement.declarationList.declarations[0]?.name.getText(ast) !== 'c') return statement;
      return ts.factory.createVariableStatement(undefined, ts.factory.createVariableDeclarationList([ts.factory.createVariableDeclaration('c', undefined, undefined, ts.factory.createObjectLiteralExpression())], ts.NodeFlags.Const));
    });
    const normalized = ts.createPrinter().printFile(ts.factory.updateSourceFile(ast, statements));
    const scanner = ts.createScanner(ts.ScriptTarget.Latest, true, ts.LanguageVariant.Standard, normalized);
    const tokens = [];
    for (let token = scanner.scan(); token !== ts.SyntaxKind.EndOfFileToken; token = scanner.scan()) tokens.push([token, scanner.getTokenText()]);
    behavior.push(JSON.stringify(tokens));
    if (variant.startsWith('ts-')) typed.push(file);
    if (!variant.endsWith('tailwind')) {
      const stylesheet = fs.readFileSync(path.join(root, `src/${variant}/${item.category}/${item.name}/${item.name}.css`), 'utf8');
      if (css === undefined) css = stylesheet;
      else assert.equal(stylesheet, css, `${item.name}: CSS variants differ`);
    }
    rows.push({ file, component: item.name, checks: ['standalone imports', 'client directive', 'JSX parse', 'variant styling contract'], passed: true });
  }
  if (new Set(behavior).size !== 1) {
    const reference = JSON.parse(behavior[0]);
    for (let index = 1; index < behavior.length; index++) {
      const actual = JSON.parse(behavior[index]);
      const offset = reference.findIndex((token, position) => JSON.stringify(token) !== JSON.stringify(actual[position]));
      if (offset !== -1) console.error(item.name, index, 'token mismatch at', offset, reference.slice(offset - 3, offset + 5), actual.slice(offset - 3, offset + 5));
    }
  }
  assert.equal(new Set(behavior).size, 1, `${item.name}: variant behavior differs`);
  const codeFile = `src/constants/code/${item.category}/${item.name[0].toLowerCase() + item.name.slice(1)}Code.js`;
  const codeSource = fs.readFileSync(path.join(root, codeFile), 'utf8');
  assert.equal((codeSource.match(/\?raw/g) ?? []).length, 5, `${codeFile}: all five source payloads`);
  assert.equal(codeSource.includes("dependencies: 'motion'"), true);
}
const settings = JSON.parse(fs.readFileSync(path.join(root, 'tsconfig.local-collection.json'), 'utf8'));
settings.files = typed;
fs.writeFileSync(path.join(root, 'tsconfig.local-collection.json'), JSON.stringify(settings, null, 2) + '\n');
fs.mkdirSync(path.join(root, 'output/local-collection'), { recursive: true });
fs.writeFileSync(path.join(root, 'output/local-collection/structure.json'), JSON.stringify({ components: localCollection.length, implementations: rows.length, passed: rows.length, failed: 0, skipped: 0, rows }, null, 2));
console.log(`components=${localCollection.length}; implementations=${rows.length}; registry_routes=${localCollection.length}; behavior_parity=${rows.length}/${rows.length}; CSS_pairs=${localCollection.length}/${localCollection.length}; source_parse=${rows.length}/${rows.length}`);
