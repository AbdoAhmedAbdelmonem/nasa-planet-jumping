import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const html = readFileSync(join(process.cwd(), 'index.html'), 'utf8');

test('index.html has one inline <style> and balanced CSS braces/parens', () => {
  const styleMatches = html.match(/<style[\s>]/gi) || [];
  assert.equal(styleMatches.length, 1, 'Expected exactly one <style> tag');
  const styleContent = html.split('<style>')[1].split('</style>')[0];
  let braces = 0;
  let parens = 0;
  for (const ch of styleContent) {
    if (ch === '{') braces++;
    if (ch === '}') braces--;
    if (ch === '(') parens++;
    if (ch === ')') parens--;
    assert.ok(braces >= 0, 'Unmatched closing brace in CSS');
    assert.ok(parens >= 0, 'Unmatched closing parenthesis in CSS');
  }
  assert.equal(braces, 0, 'Unbalanced braces in CSS');
  assert.equal(parens, 0, 'Unbalanced parentheses in CSS');
});

test('Original pre-orange color palette is restored with Deimos branding', () => {
  assert.ok(html.includes('Deimos'), 'Expected Deimos branding');
  assert.ok(
    html.includes('Finding Earth’s closest environmental matches to selected locations on the Moon and Mars.'),
    'Expected exact Deimos mission statement'
  );
  assert.ok(html.includes('#9b8cff'), 'Expected original purple focus color #9b8cff');
  assert.ok(!html.includes('id="martian-grade"'), 'Expected orange SVG filter to be removed');
  assert.ok(!html.includes('#ff6224'), 'Expected Martian orange hex to be removed');
});

test('Planetary Twin Observatory and Custom Parameter Solver remain removed while remaining sections exist', () => {
  assert.ok(!html.includes('Planetary Twin Observatory'), 'Expected Planetary Twin Observatory to be removed');
  assert.ok(!html.includes('Custom Parameter Solver'), 'Expected Custom Parameter Solver to be removed');
  assert.ok(html.includes('id="telemetry"'), 'Expected #telemetry 5-vector section');
  assert.ok(html.includes('id="missions"'), 'Expected #missions validation campaigns section');
});
