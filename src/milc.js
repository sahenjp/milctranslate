const TOKEN_OPS = Object.freeze({
  then: '→', imply: '⇒', and: '∧', or: '∨', not: '¬', approx: '≈',
  because: '∵', therefore: '∴', up: '↑', down: '↓', delta: 'Δ', notImply: '⇏',
});

const BYTE_OPS = Object.freeze({
  then: '->', imply: '=>', and: '&', or: '|', not: '!', approx: '~',
  because: 'bc', therefore: 'so', up: '+', down: '-', delta: 'd', notImply: '!=>',
});

const COMMON = [
  [/サイバー(?:系)?(?:の)?ジェイルブレイク/giu, 'Cyber_JB'],
  [/サイバー(?:系)?/giu, 'Cyber'],
  [/(?:エロ|性的)(?:系)?(?:の)?ジェイルブレイク/giu, 'Ero_JB'],
  [/フロンティア(?:モデル)?/giu, 'frontier_model'],
  [/オープン(?:モデル)?/giu, 'open_model'],
  [/ジェイルブレイク/giu, 'JB'],
  [/ロールプレイ/giu, 'RP'],
  [/シナリオ/giu, 'scn'],
  [/防御圧力/giu, 'def_pressure'],
  [/安全(?:性)?/giu, 'safe'],
  [/理由|根拠/giu, 'reason'],
  [/堅牢(?:性)?/giu, 'rob'],
  [/能力/giu, 'ablt'],
  [/参照(?:する|した|して)?/giu, 'ref'],
  [/性能|パフォーマンス/giu, 'perf'],
  [/評価(?:する|した|して)?/giu, 'eval'],
  [/調整(?:する|した|して)?/giu, 'adj'],
  [/文脈|コンテキスト/giu, 'ctx'],
  [/実験(?:する|した|して)?/giu, 'exp'],
  [/スタイル/giu, 'style'],
  [/トレンド|傾向/giu, 'trend'],
  [/防御/giu, 'def'],
  [/実際(?:の|に)?/giu, 'actual'],
  [/最近(?:の|に)?/giu, 'recent'],
  [/論文/giu, 'paper'],
  [/モデル/giu, 'M'],
  [/企業(?:の)?安全(?:性)?/giu, 'corp_safety'],
  [/状態/giu, 'state'],
  [/部品(?:化|に分ける|分割)/giu, 'parts'],
  [/分割(?:する|した|して)?/giu, 'split'],
  [/簡単(?:な)?タスク/giu, 'simple_task'],
  [/技術的(?:に)?正当(?:な|化)?/giu, 'techLegit'],
  [/逐次(?:実行)?/giu, 'seqExec'],
  [/セキュリティ(?:監査)?/giu, 'sec_audit'],
  [/発見(?:する|した|して)?/giu, 'discover'],
  [/実行(?:する|した|して)?/giu, 'exec'],
  [/概念実証|PoC/giu, 'PoC'],
  [/推論(?:する|した|して)?/giu, 'infer'],
  [/復元可能(?:な|性)?/giu, 'recoverable'],
  [/曖昧(?:な|さ)?/giu, 'amb'],
  [/質問(?:する|した|して)?/giu, 'q'],
  [/方向/giu, 'direction'],
  [/最小(?:の)?バイト/giu, 'min_bytes'],
  [/マルチバイト/giu, 'multibyte'],
  [/バイト/giu, 'bytes'],
  [/最小(?:化|にする)?/giu, 'min'],
  [/圧縮(?:する|した|して)?/giu, 'compress'],
  [/違い|差分?|変化/giu, 'delta'],
  [/可能(?:性)?/giu, 'possible'],
  [/有用|役立つ/giu, 'useful'],
  [/弱い/giu, 'weak'],
  [/強い/giu, 'strong'],
  [/難しい|困難/giu, 'hard'],
  [/簡単|容易/giu, 'easy'],
  [/高い/giu, 'high'],
  [/低い/giu, 'low'],
  [/将来|未来/giu, 'future'],
  [/来年/giu, 'next_year'],
  [/急速(?:に)?/giu, 'rapid'],
  [/復活(?:する|した|して)?/giu, 'revive'],
  [/議論(?:する|した|して)?/giu, 'discuss'],
  [/出力/giu, 'output'],
  [/入力/giu, 'input'],
  [/生成(?:する|した|して)?/giu, 'gen'],
  [/文章|テキスト/giu, 'text'],
  [/知識/giu, 'knowledge'],
  [/自己(?:の)?知識/giu, 'self_knowledge'],
  [/どの(?:方向|方面)/giu, 'which_direction'],
  [/活発|アクティブ/giu, 'active'],
  [/受け取(?:る|った)/giu, 'received'],
  [/方言/giu, 'dialects'],
  [/仮説/giu, 'hyp'],
  [/圧力/giu, 'pressure'],
  [/定義/giu, 'def'],
  [/制約/giu, 'constraint'],
  [/検閲なし|無検閲/giu, 'uncens'],
];

const EN_ABBR = [
  [/\breference(s)?\b/giu, 'ref'], [/\bperformance\b/giu, 'perf'],
  [/\bevaluation\b/giu, 'eval'], [/\badjustment\b/giu, 'adj'],
  [/\bability\b/giu, 'ablt'], [/\bexperiment\b/giu, 'exp'],
  [/\bcontext\b/giu, 'ctx'], [/\bscenario\b/giu, 'scn'],
  [/\bsecurity\b/giu, 'sec'], [/\bapproximately\b/giu, 'approx'],
  [/\bfrontier model\b/giu, 'frontier_model'], [/\bopen model\b/giu, 'open_model'],
  [/\bcyber jailbreak\b/giu, 'Cyber_JB'], [/\berotic jailbreak\b/giu, 'Ero_JB'],
  [/\bjailbreak\b/giu, 'JB'], [/\brole[ -]?play\b/giu, 'RP'],
  [/\brobustness\b/giu, 'rob'], [/\bdirection\b/giu, 'dir'],
];

const DROP = [
  /(?:してください|して下さい|お願いします|お願いいたします)/giu,
  /(?:だと思います|と思います|と考えます)/giu,
  /(?:です|でした|ます|ました|でしょう)/giu,
];

function protect(input) {
  const values = [];
  const text = input.replace(/https?:\/\/[^\s<>]+|@[A-Za-z0-9_]+|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/gu, (value) => {
    const id = `__MILC_P${values.length}__`;
    values.push(value);
    return id;
  });
  return { text, values };
}

function restore(input, values) {
  return input.replace(/__MILC_P(\d+)__/g, (_, n) => values[Number(n)] ?? '');
}

function operators(objective) {
  return objective === 'bytes' ? BYTE_OPS : TOKEN_OPS;
}

function applyStructure(text, op) {
  let out = text;

  out = out
    .replace(/recentpaper\s*(?:の)?ように/giu, '@recent_paper')
    .replace(/recent\s*paper\s*(?:の)?ように/giu, '@recent_paper')
    .replace(/def_pressure(?:が|は)?\s*high/giu, `def_pressure${op.up}`)
    .replace(/(?:weak\s*trend|weaktrend)/giu, 'trend:=weak')
    .replace(/(?:strong\s*trend|strongtrend)/giu, 'trend:=strong')
    .replace(/\s*partsすると/giu, `${op.then}parts;`)
    .replace(/useful\s+may/giu, 'may useful')
    .replace(/(?:かもしれない|可能性がある|可能性もある|あり得る)/giu, ' may')
    .replace(/(?:可能性が高い)/giu, ` may${op.up}`)
    .replace(/(?:可能性が低い)/giu, ` may${op.down}`)
    .replace(/(?:増える|増加する|高まる|上がる|向上する|強まる)/giu, op.up)
    .replace(/(?:減る|減少する|下がる|低下する|弱まる)/giu, op.down)
    .replace(/(?:ほぼ同じ|同程度|おおむね同じ)/giu, op.approx)
    .replace(/(?:意味しない|必ずしも.*?ない)/giu, op.notImply)
    .replace(/(?:ではない|じゃない|でない|不可能)/giu, `${op.not}`)
    .replace(/(?:したがって|そのため|ゆえに|なので)/giu, ` ${op.therefore} `)
    .replace(/(?:なぜなら|というのも)/giu, ` ${op.because} `)
    .replace(/(?:かつ|そして|さらに)/giu, ` ${op.and} `)
    .replace(/(?:または|もしくは|あるいは)/giu, ` ${op.or} `)
    .replace(/(?:すると|ならば|なら|の場合は|場合)/giu, ` ${op.then} `)
    .replace(/(?:より大きい|を上回る)/giu, '>')
    .replace(/(?:より小さい|を下回る)/giu, '<');

  out = out
    .replace(/\bbecause\b/giu, ` ${op.because} `)
    .replace(/\btherefore\b|\bthus\b/giu, ` ${op.therefore} `)
    .replace(/\band\b/giu, ` ${op.and} `)
    .replace(/\bor\b/giu, ` ${op.or} `)
    .replace(/\bnot\b/giu, `${op.not}`)
    .replace(/\bapproximately\b|\babout\b/giu, op.approx)
    .replace(/\bincreases?\b|\bimproves?\b/giu, op.up)
    .replace(/\bdecreases?\b|\bdrops?\b/giu, op.down)
    .replace(/\bmay\s+be\b|\bperhaps\b|\bmaybe\b/giu, 'may')
    .replace(/useful\s+may/giu, 'may useful');

  return out;
}

function compactJapaneseGlue(text) {
  return text
    .replace(/(?:という|ことが|ことを|ことは)/giu, '')
    .replace(/(?:について|に関して)/giu, ':')
    .replace(/(?:において|では)/giu, ':')
    .replace(/(?:すること|できること)/giu, '')
    .replace(/(?:を使って|を用いて)/giu, ' via ')
    .replace(/(?:から|より)/giu, '>')
    .replace(/(?:まで)/giu, '<')
    .replace(/(?:のほうが|の方が)/giu, '>')
    .replace(/(?:だけ|のみ)/giu, ' only ')
    .replace(/(?:も)/giu, '+')
    .replace(/(?:は|が|を|に|へ|の)(?=[A-Za-z0-9_@])/gu, ' ')
    .replace(/(?<=[A-Za-z0-9_])(?:は|が|を|に|へ|の)/gu, ' ');
}

function compactWhitespace(text, op) {
  const operatorChars = objectiveSafeOperatorPattern(op);
  return text
    .replace(/[。！？!?]+/g, ';')
    .replace(/[、，]+/g, ',')
    .replace(/[：]/g, ':')
    .replace(/[；]/g, ';')
    .replace(/\s*([,;:()\[\]{}])\s*/g, '$1')
    .replace(operatorChars, '$1')
    .replace(/\s+/g, ' ')
    .replace(/\s*;\s*/g, ';')
    .replace(/;+$/g, '')
    .trim();
}

function objectiveSafeOperatorPattern(op) {
  const escaped = Object.values(op)
    .filter((v) => v.length <= 3)
    .sort((a, b) => b.length - a.length)
    .map((v) => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  return new RegExp(`\\s*(${escaped})\\s*`, 'g');
}

function addAliases(text) {
  const candidates = [
    ['C', 'Cyber_JB'], ['E', 'Ero_JB'], ['F', 'frontier_model'], ['O', 'open_model'],
  ];
  const defs = [];
  let body = text;
  for (const [alias, value] of candidates) {
    const count = body.split(value).length - 1;
    if (count >= 2) {
      body = body.replace(new RegExp(`\\b${value}\\b`, 'g'), alias);
      defs.push(`${alias}:=${value}`);
    }
  }
  return defs.length ? `${defs.join(';')};${body}` : body;
}

function applyByteTightening(text) {
  return text
    .replace(/\breason\b/giu, 'rsn')
    .replace(/\bpossible\b/giu, 'poss')
    .replace(/\bactual\b/giu, 'act')
    .replace(/\brecent\b/giu, 'rcnt')
    .replace(/\bpressure\b/giu, 'prs')
    .replace(/\bconstraint\b/giu, 'cstr')
    .replace(/\bdirection\b/giu, 'dir')
    .replace(/\bknowledge\b/giu, 'knw')
    .replace(/\boutput\b/giu, 'out')
    .replace(/\binput\b/giu, 'in');
}

export function compress(input, options = {}) {
  const objective = options.objective === 'bytes' ? 'bytes' : 'tokens';
  const op = operators(objective);
  const { text: protectedText, values } = protect(String(input ?? '').replace(/\r\n?/g, '\n').trim());
  if (!protectedText) return '';

  let out = protectedText;
  for (const pattern of DROP) out = out.replace(pattern, '');
  for (const [pattern, replacement] of COMMON) out = out.replace(pattern, replacement);
  for (const [pattern, replacement] of EN_ABBR) out = out.replace(pattern, replacement);
  out = applyStructure(out, op);
  out = compactJapaneseGlue(out);
  out = compactWhitespace(out, op);
  out = addAliases(out);
  if (objective === 'bytes') out = applyByteTightening(out);
  return restore(out, values);
}

function protectUrls(input) {
  const values = [];
  const text = input.replace(/https?:\/\/[^\s;]+/gu, (value) => {
    const id = `__URL_${values.length}__`;
    values.push(value);
    return id;
  });
  return { text, values };
}

const EXPAND_WORDS = [
  [/\bCyber_JB\b/g, 'サイバー系ジェイルブレイク'], [/\bEro_JB\b/g, '性的コンテンツ系ジェイルブレイク'],
  [/\bfrontier_model\b/g, 'フロンティアモデル'], [/\bopen_model\b/g, 'オープンモデル'],
  [/\bdef_pressure\b/g, '防御圧力'], [/\bcorp_safety\b/g, '企業の安全対策'],
  [/\bsec_audit\b/g, 'セキュリティ監査'], [/\bsimple_task\b/g, '単純なタスク'],
  [/\btechLegit\b/g, '技術的に正当な形'], [/\bseqExec\b/g, '逐次実行'],
  [/\bJB\b/g, 'ジェイルブレイク'], [/\bRP\b/g, 'ロールプレイ'], [/\bscn\b/g, 'シナリオ'],
  [/\bsafe\b/g, '安全性'], [/\brsn\b|\breason\b/g, '理由'], [/\brob\b/g, '堅牢性'],
  [/\bablt\b/g, '能力'], [/\bref\b/g, '参照'], [/\bperf\b/g, '性能'],
  [/\beval\b/g, '評価'], [/\badj\b/g, '調整'], [/\bctx\b/g, '文脈'], [/\bexp\b/g, '実験'],
  [/\btrend\b/g, '傾向'], [/\bact\b|\bactual\b/g, '実際'], [/\brcnt\b|\brecent\b/g, '最近'],
  [/\bpaper\b/g, '論文'], [/\bM\b/g, 'モデル'], [/\bparts\b/g, '部品化'], [/\bsplit\b/g, '分割'],
  [/\bdiscover\b/g, '発見'], [/\bexec\b/g, '実行'], [/\binfer\b/g, '推論'],
  [/\brecoverable\b/g, '復元可能'], [/\bamb\b/g, '曖昧'], [/\bq\b/g, '質問'],
  [/\bposs\b|\bpossible\b/g, '可能'], [/\buseful\b/g, '有用'], [/\bweak\b/g, '弱い'],
  [/\bstrong\b/g, '強い'], [/\bhard\b/g, '難しい'], [/\beasy\b/g, '容易'], [/\bhigh\b/g, '高い'],
  [/\blow\b/g, '低い'], [/\bfuture\b/g, '将来'], [/\bnext_year\b/g, '来年'], [/\brapid\b/g, '急速'],
  [/\brevive\b/g, '復活'], [/\bdiscuss\b/g, '議論'], [/\bout\b|\boutput\b/g, '出力'],
  [/\bin\b|\binput\b/g, '入力'], [/\bgen\b/g, '生成'], [/\btext\b/g, '文章'],
  [/\bself_knowledge\b/g, '自己知識'], [/\bwhich_direction\b|\bdir\b|\bdirection\b/g, '方向'],
  [/\bactive\b/g, '活発'], [/\breceived\b/g, '受け取った'], [/\bdialects\b/g, '方言'],
  [/\bhyp\b/g, '仮説'], [/\bprs\b|\bpressure\b/g, '圧力'], [/\bdef\b/g, '定義'],
  [/\bcstr\b|\bconstraint\b/g, '制約'], [/\buncens\b/g, '無検閲'], [/\bmay\b/g, '可能性がある'],
];

function expandAliases(text) {
  const aliases = new Map();
  let body = text;
  body = body.replace(/(?:^|;)\\s*([A-Z]):=([A-Za-z][A-Za-z0-9_]*)(?=\\s*;|$)/g, (full, alias, value) => {
    aliases.set(alias, value);
    return '';
  });
  for (const [alias, value] of aliases) {
    body = body.replace(new RegExp(`\\b${alias}\\b`, 'g'), value);
  }
  return body.replace(/^;+|;+$/g, '');
}

export function expand(input) {
  const original = String(input ?? '').trim();
  if (!original) return '';
  const { text: protectedText, values } = protectUrls(original);
  let out = expandAliases(protectedText.replace(/^\\s*MiL\\s*;?/i, ''));

  out = out
    .replace(/!=>|⇏/g, ' 必ずしも意味しない ')
    .replace(/=>|⇒/g, ' ならば ')
    .replace(/->|→/g, ' から ')
    .replace(/∵|\bbc\b/g, ' なぜなら ')
    .replace(/∴|\bso\b/g, ' したがって ')
    .replace(/∧|&/g, ' かつ ')
    .replace(/∨|\|/g, ' または ')
    .replace(/¬|!(?!=)/g, ' ではない ')
    .replace(/≈|~/g, ' おおむね同等 ')
    .replace(/↑/g, ' 増加 ')
    .replace(/↓/g, ' 低下 ')
    .replace(/←/g, ' は次の要因から影響 ')
    .replace(/Δ|\bd\b/g, ' 変化 ')
    .replace(/(?<=[A-Za-z0-9_)\]])\+(?=[A-Za-z0-9_(\[])/g, ' かつ ');

  // ASCII + / - are ambiguous, so only expand when attached to known compact terms.
  out = out
    .replace(/\b(may|rob|safe|perf|active|pressure|prs|def)\+/g, '$1 増加')
    .replace(/\b(may|rob|safe|perf|active|pressure|prs|def)-/g, '$1 低下');

  for (const [pattern, replacement] of EXPAND_WORDS) out = out.replace(pattern, replacement);
  out = out
    .replace(/;/g, '。\n')
    .replace(/\s+,\s*/g, '、')
    .replace(/\s*:\s*/g, '：')
    .replace(/[ \t]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/。{2,}/g, '。')
    .trim();

  out = out.replace(/__URL_(\d+)__/g, (_, n) => values[Number(n)] ?? '');
  if (out && !/[。.!?]$/u.test(out)) out += '。';
  return out;
}

export function measure(input, output) {
  const enc = new TextEncoder();
  const inBytes = enc.encode(String(input ?? '')).length;
  const outBytes = enc.encode(String(output ?? '')).length;
  const saved = inBytes === 0 ? 0 : Math.max(0, Math.round((1 - outBytes / inBytes) * 100));
  return {
    inputChars: String(input ?? '').length,
    outputChars: String(output ?? '').length,
    inputBytes: inBytes,
    outputBytes: outBytes,
    savedPercent: saved,
  };
}
