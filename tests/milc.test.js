import test from 'node:test';
import assert from 'node:assert/strict';
import { compress, expand, measure } from '../src/milc.js';

test('自然文をMiL;Cらしい密な表現へ圧縮する', () => {
  const input = 'フロンティアモデルではサイバー系の防御圧力が高い。オープンモデルでは弱い傾向。最近の論文のように、オープンモデルのジェイルブレイクを部品化すると有用かもしれない。';
  const output = compress(input, { objective: 'tokens' });
  assert.match(output, /O:=open_model/);
  assert.match(output, /def_pressure↑/);
  assert.match(output, /trend:=weak/);
  assert.match(output, /@recent_paper/);
  assert.match(output, /JB→parts/);
  assert.match(output, /may useful/);
});

test('最小バイト寄りではASCII演算子を使う', () => {
  const input = 'サイバー系の防御圧力が高い。改善すると性能が上がる可能性がある。';
  const token = compress(input, { objective: 'tokens' });
  const bytes = compress(input, { objective: 'bytes' });
  assert.ok(bytes.includes('+') || bytes.includes('->'));
  assert.ok(measure(input, bytes).outputBytes <= measure(input, token).outputBytes);
});

test('既存のMiL;C風表現を壊さず日本語へ展開する', () => {
  const input = 'JB:RP/scn,CoTatk;safeFT+reason may↑rob;ablt[Arditi24/13OWLM]:ref via1D;rm,FT0→ref↓⇏uncens;perf≈/TQA↓;eval+adj';
  const output = expand(input);
  assert.match(output, /ジェイルブレイク/);
  assert.match(output, /ロールプレイ/);
  assert.match(output, /性能/);
  assert.match(output, /必ずしも意味しない/);
  assert.match(output, /Arditi24\/13OWLM/);
  assert.match(output, /TQA/);
});

test('alias定義を展開する', () => {
  const input = 'C:=Cyber_JB;E:=Ero_JB;C→split(simple_task)↑;E→hard↑';
  const output = expand(input);
  assert.match(output, /サイバー系ジェイルブレイク/);
  assert.match(output, /性的コンテンツ系ジェイルブレイク/);
  assert.match(output, /単純なタスク/);
});

test('URLとメンションを保持する', () => {
  const input = 'respect: @am09_21 https://x.com/AM09_21 を参照してください';
  const output = compress(input);
  assert.match(output, /@am09_21/);
  assert.match(output, /https:\/\/x\.com\/AM09_21/);
});
