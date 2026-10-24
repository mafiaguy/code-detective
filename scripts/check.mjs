import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
process.chdir(fileURLToPath(new URL('../', import.meta.url)));
import vm from 'node:vm';
import assert from 'node:assert/strict';
const course=JSON.parse(fs.readFileSync('curriculum.json'));
assert.equal(course.stages.length,8);assert.equal(course.lessons.length,40);
assert.equal(new Set(course.lessons.map(x=>x.id)).size,40);
for(let i=0;i<8;i++){const ls=course.lessons.filter(x=>x.stage===i);assert.equal(ls.length,5);assert.equal(ls.filter(x=>x.kind==='field').length,1)}
for(const l of course.lessons){assert.ok(l.title&&l.brief&&l.evidence&&l.prompt);if(l.kind==='field'){assert.equal(l.tasks.length,3);continue}if(l.kind==='query')continue;const ids=Array.isArray(l.answer)?l.answer:[l.answer];for(const n of ids)assert.ok(n>=0&&n<l.choices.length);if(l.kind==='order')assert.equal(new Set(ids).size,l.choices.length)}
const source=fs.readFileSync('detective.js','utf8');const sandbox={};vm.createContext(sandbox);vm.runInContext(source.slice(source.indexOf('function runToy('),source.indexOf('function videoCards(')),sandbox);
const run=s=>JSON.parse(JSON.stringify(sandbox.runToy(s)));
assert.deepEqual(run('from int x\nwhere x = 7\nselect x'),[7]);
assert.deepEqual(run('from int x where x >= 2 and x <= 4 select x'),[2,3,4]);
assert.deepEqual(run('from int x where x = 7 select x * 2'),[14]);
assert.deepEqual(run('from int x where x > 2 and x < 4 select x - 5'),[-2]);
assert.deepEqual(run('from int x where x > 7 and x < 3 select x'),[]);
assert.throws(()=>run('from int x where x = 101 select x'));
assert.throws(()=>run('from int x where x = 7 select alert(1)'));
assert.throws(()=>run('from int x where x = 7 select x; process.exit()'));
console.log('PASS: 40 curriculum entries, eight practicals, query evaluation and invalid-input checks.');
