import { compress, expand, measure } from './milc.js';

const $ = (id) => document.getElementById(id);
const input = $('input');
const output = $('output');
const toMilc = $('toMilc');
const toJa = $('toJa');
const objective = $('objective');
const inputMeta = $('inputMeta');
const outputMeta = $('outputMeta');
const savedMeta = $('savedMeta');
const copy = $('copy');
const share = $('share');
const clear = $('clear');
const install = $('install');
const toast = $('toast');

let direction = 'to';
let installEvent = null;
let debounce;

function showToast(message) {
  toast.textContent = message;
  toast.dataset.show = 'true';
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => { delete toast.dataset.show; }, 1400);
}

function convert() {
  const source = input.value;
  const result = direction === 'to'
    ? compress(source, { objective: objective.value })
    : expand(source);
  output.value = result;

  const m = measure(source, result);
  inputMeta.textContent = `${m.inputChars}字 / ${m.inputBytes}B`;
  outputMeta.textContent = `${m.outputChars}字 / ${m.outputBytes}B`;
  savedMeta.textContent = direction === 'to' && m.inputBytes > 0 ? `${m.savedPercent}%` : '—';
}

function setDirection(next, swap = true) {
  if (next === direction) return;
  if (swap && output.value) input.value = output.value;
  direction = next;
  toMilc.setAttribute('aria-pressed', String(next === 'to'));
  toJa.setAttribute('aria-pressed', String(next === 'from'));
  $('inputLabel').textContent = next === 'to' ? '自然文' : 'MiL;C';
  $('outputLabel').textContent = next === 'to' ? 'MiL;C' : '自然文';
  objective.disabled = next !== 'to';
  convert();
}

async function copyText(text, message) {
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    output.select();
    document.execCommand('copy');
  }
  showToast(message);
}

function encodeState() {
  const json = JSON.stringify({ d: direction, o: objective.value, t: input.value });
  const bytes = new TextEncoder().encode(json);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function decodeState(value) {
  let base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) base64 += '=';
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

function loadState() {
  if (!location.hash.startsWith('#s=')) return false;
  try {
    const state = decodeState(location.hash.slice(3));
    direction = state.d === 'from' ? 'from' : 'to';
    objective.value = state.o === 'bytes' ? 'bytes' : 'tokens';
    input.value = typeof state.t === 'string' ? state.t : '';
    toMilc.setAttribute('aria-pressed', String(direction === 'to'));
    toJa.setAttribute('aria-pressed', String(direction === 'from'));
    $('inputLabel').textContent = direction === 'to' ? '自然文' : 'MiL;C';
    $('outputLabel').textContent = direction === 'to' ? 'MiL;C' : '自然文';
    objective.disabled = direction !== 'to';
    convert();
    return true;
  } catch {
    return false;
  }
}

input.addEventListener('input', () => {
  clearTimeout(debounce);
  debounce = setTimeout(convert, 80);
});
objective.addEventListener('change', convert);
toMilc.addEventListener('click', () => setDirection('to'));
toJa.addEventListener('click', () => setDirection('from'));
copy.addEventListener('click', () => copyText(output.value, 'コピーしました'));
share.addEventListener('click', () => {
  const url = `${location.href.split('#')[0]}#s=${encodeState()}`;
  copyText(url, '共有リンクをコピーしました');
});
clear.addEventListener('click', () => {
  input.value = '';
  output.value = '';
  history.replaceState(null, '', location.href.split('#')[0]);
  convert();
  input.focus();
});

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installEvent = event;
  install.hidden = false;
});
install.addEventListener('click', async () => {
  if (!installEvent) return;
  installEvent.prompt();
  await installEvent.userChoice;
  installEvent = null;
  install.hidden = true;
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}

if (!loadState()) {
  input.value = 'フロンティアモデルではサイバー系の防御圧力が高い。オープンモデルでは弱い傾向。最近の論文のように、オープンモデルのジェイルブレイクを部品化すると有用かもしれない。';
  convert();
}
