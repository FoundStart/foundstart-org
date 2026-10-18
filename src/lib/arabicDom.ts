// Runtime Arabic translation layer for static UI strings that are not wired to the t() dictionary.
// Exact-match on trimmed text. Toasts/notifications are skipped so they stay English.
const originals = new WeakMap<Node, string>();
const attrOriginals = new WeakMap<Element, Record<string, string>>();
let dict: Record<string, string> | null = null;
let observer: MutationObserver | null = null;
const ATTRS = ['placeholder', 'title', 'aria-label', 'alt'];
const SKIP = 'script,style,textarea,code,pre,[data-no-translate],[data-sonner-toaster],[data-radix-toast-viewport],[class*="toast"],[role="status"][data-state]';

const norm = (s: string) => s.replace(/\s+/g, ' ').trim();

function translateText(node: Text) {
  const parent = node.parentElement;
  if (!parent || parent.closest(SKIP)) return;
  const raw = node.nodeValue || '';
  const key = norm(raw);
  if (!key || !dict) return;
  const ar = dict[key];
  if (ar && ar !== key) {
    if (!originals.has(node)) originals.set(node, raw);
    const lead = raw.match(/^\s*/)![0];
    const trail = raw.match(/\s*$/)![0];
    const next = lead + ar + trail;
    if (node.nodeValue !== next) node.nodeValue = next;
  }
}

function translateAttrs(el: Element) {
  if (!dict || el.closest(SKIP)) return;
  for (const a of ATTRS) {
    const v = el.getAttribute(a);
    if (!v) continue;
    const ar = dict[norm(v)];
    if (ar && ar !== v) {
      const store = attrOriginals.get(el) || {};
      if (!(a in store)) store[a] = v;
      attrOriginals.set(el, store);
      el.setAttribute(a, ar);
    }
  }
}

function walk(root: Node) {
  if (root.nodeType === Node.TEXT_NODE) return translateText(root as Text);
  if (root.nodeType !== Node.ELEMENT_NODE) return;
  const el = root as Element;
  translateAttrs(el);
  const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let n: Node | null;
  while ((n = tw.nextNode())) translateText(n as Text);
  el.querySelectorAll('[placeholder],[title],[aria-label],[alt]').forEach(translateAttrs);
}

function restore() {
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n: Node | null;
  while ((n = tw.nextNode())) {
    const o = originals.get(n);
    if (o !== undefined) n.nodeValue = o;
  }
  document.querySelectorAll('[placeholder],[title],[aria-label],[alt]').forEach((el) => {
    const s = attrOriginals.get(el);
    if (s) Object.entries(s).forEach(([k, v]) => el.setAttribute(k, v));
  });
}

export async function setArabicDom(on: boolean) {
  if (observer) { observer.disconnect(); observer = null; }
  if (!on) { restore(); return; }
  if (!dict) dict = (await import('./arabicDict')).arabicDict;
  walk(document.body);
  observer = new MutationObserver((muts) => {
    observer?.disconnect();
    muts.forEach((m) => {
      if (m.type === 'characterData') walk(m.target);
      else m.addedNodes.forEach(walk);
      if (m.type === 'attributes') translateAttrs(m.target as Element);
    });
    observer?.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
}
