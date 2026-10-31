// Parity check: the edge function's mirrored QUESTION_WEIGHTS must match src/pages/Quiz.tsx.
// Run: node compare-quiz-weights.mjs  (from the repo root)
import { readFileSync } from 'node:fs';

const fn = readFileSync('supabase/functions/submit-public-lead/index.ts', 'utf8');
const quiz = readFileSync('src/pages/Quiz.tsx', 'utf8');

const fnBlock = fn.match(/const QUESTION_WEIGHTS[^=]*= (\[[\s\S]*?\]);/)[1];
const fnWeights = Function(`return ${fnBlock.replace(/(\w+):/g, '"$1":')}`)();

// Extract option weights from Quiz.tsx in question order
const qBlocks = [...quiz.matchAll(/weights: \{([^}]*)\}/g)].map((m) => {
  const o = {};
  for (const [, k, v] of m[1].matchAll(/(\w+): (\d+)/g)) o[k] = Number(v);
  return o;
});
// Regroup per question using option counts 4,3,3,4,3
const counts = [4, 3, 3, 4, 3];
const quizWeights = [];
let i = 0;
for (const c of counts) { quizWeights.push(qBlocks.slice(i, i + c)); i += c; }

const norm = (w) => JSON.stringify(w.map((opts) => Object.fromEntries(Object.entries(opts).sort())));
const a = norm(fnWeights), b = norm(quizWeights);
if (a === b) { console.log('PASS: QUESTION_WEIGHTS parity (5 questions, 17 options)'); process.exit(0); }
console.error('FAIL: weight tables differ'); console.error('fn:', a); console.error('quiz:', b);
process.exit(1);
