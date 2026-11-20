const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const path = require('node:path');
function load(file) {
  const module = { exports: {} };
  const source = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, { exports: module.exports, module });
  return module.exports;
}
const { countryPartnerEmptyState: message } = load('src/data/countryPartnerEmptyState.ts');
const { countriesData } = load('src/data/countriesData.ts');
const ca = countriesData.find(country => country.id === 'CA');
assert.equal(ca.offerAvailable, false);
assert.equal(ca.partners.length, 0);
assert.match(message(ca, false), /does not currently offer formation in Canada/);
assert.match(message({ ...ca, name: 'كندا' }, true), /خدمة تأسيس في كندا/);
for (const country of countriesData.filter(country => country.id !== 'EG')) {
  for (const ar of [false, true]) assert.doesNotMatch(message(country, ar), /Egypt|مصر/);
}
assert.equal(message({ id: 'EG', name: 'Egypt' }, false), 'Egypt formation is handled by FoundStart.');
assert.equal(message({ id: 'EG', name: 'مصر' }, true), 'التأسيس في مصر عن طريق FoundStart.');
assert.equal(message({ id: 'ZZ', name: 'Example' }, false), 'No confirmed formation partner is currently listed for Example.');
const component = fs.readFileSync(path.join(__dirname, '../src/components/home/HomeTwoOptions.tsx'), 'utf8');
assert.match(component, /countryPartnerEmptyState\(r, ar\)/);
assert.doesNotMatch(component, /Egypt formation is handled/);
assert.match(component, /to=\{`\/country\/\$\{r.id\}`\}/);
console.log('Country partner empty states: Canada EN/AR, Egypt EN/AR, every non-Egypt country, unknown country and component binding passed.');

const index = fs.readFileSync(path.join(__dirname, '../src/pages/Index.tsx'), 'utf8');
assert.ok(index.indexOf('<Hero />') < index.indexOf('<HomeTwoOptions'));
assert.ok(index.indexOf('<HomeTwoOptions') < index.indexOf('<HomeDashboardPreview'));
assert.match(component, /useState<'fs' \| 'partners'>\('partners'\)/);
assert.match(component, /auth\?mode=signup/);
const publicData = load('src/data/foundstartArticles.ts');
for (const slug of ['virtual-cards-egypt-egp-guide-founders', 'virtual-cards-egypt-egp-guide-founders-ar']) {
  assert.equal(publicData.foundstartArticles[slug], undefined);
  assert.ok(!publicData.foundstartArticleOrder.includes(slug));
}
console.log('Homepage hero/options/preview order, partner default, own signup and withheld article source isolation passed.');
