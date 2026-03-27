#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const TZ = process.env.AI_BRIEF_TZ || 'Asia/Seoul';
const PROJECT_TZ = process.env.TZ || TZ;
const DATA_DIR = path.join(process.cwd(), 'ops', 'ai-brief');
const RAW_DIR = path.join(DATA_DIR, 'raw');
const OUT_DIR = path.join(DATA_DIR, 'output');

type Item = {
  title: string;
  link: string;
  pubDateRaw: string;
  pubDate?: Date;
  source?: string;
  sourceUrl?: string;
  snippet?: string;
  feed: 'hn' | 'global';
};

type Mode = 'collect' | 'build';

function nowLocal(d: Date = new Date()): Intl.DateTimeFormat {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: PROJECT_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

function nowDateLocal(now = new Date()) {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: PROJECT_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return fmt.format(now);
}

function parseDate(dateRaw: string): Date | undefined {
  const d = new Date(dateRaw);
  if (Number.isNaN(d.getTime())) return undefined;
  return d;
}

function stripCdata(v: string): string {
  return v.replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1').trim();
}

function normalizeText(v: string): string {
  return stripCdata(v)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseItems(xml: string, feed: 'hn' | 'global'): Item[] {
  const items: Item[] = [];
  const blocks = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];

  for (const raw of blocks) {
    const get = (tag: string) => {
      const m = raw.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'i'));
      return m ? normalizeText(m[1]) : '';
    };

    const title = get('title');
    const link = get('link');
    const pub = get('pubDate');
    const desc = get('description');
    const sourceTag = raw.match(/<source[^>]*>([\s\S]*?)<\/source>/i);

    if (!title || !link) continue;

    let source = sourceTag ? normalizeText(sourceTag[1]) : '';
    let sourceUrl = '';
    const sourceUrlMatch = raw.match(/<source[^>]*url="([^"]+)"[^>]*>/i);
    if (sourceUrlMatch) sourceUrl = sourceUrlMatch[1] ?? '';

    if (!source) {
      const d = link.match(/https?:\/\/([^/]+)/);
      if (d) source = d[1].replace(/^www\./, '');
    }

    items.push({
      title: decodeHtml(title),
      link,
      pubDateRaw: pub || '',
      pubDate: parseDate(pub),
      source,
      sourceUrl,
      snippet: desc ? normalizeText(desc).slice(0, 220) : '',
      feed,
    });
  }

  return items;
}

function decodeHtml(input: string): string {
  return input
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
}

function isAiItem(title: string): boolean {
  const t = title.toLowerCase();
  return /\b(ai|artificial intelligence|large language model|llm|chatgpt|claude|gpt|gemini|openai|anthropic|machine learning|deep learning|agent|agentic|robot|automation|chip|semiconductor)\b/.test(t);
}

function isPreferredSource(source: string): boolean {
  const s = source.toLowerCase();
  const preferred = [
    'reuters.com',
    'techcrunch.com',
    'theverge.com',
    'forbes.com',
    'ft.com',
    'wsj.com',
    'arstechnica.com',
    'axios.com',
    'cnn.com',
    'bloomberg.com',
    'cnbc.com',
    'investors.com',
    'theinformation.com',
  ];
  return preferred.some((d) => s.includes(d));
}

function withinCollectWindow(pubDate: Date | undefined, now = new Date()): boolean {
  if (!pubDate) return false;
  // Convert to local date/hour in configured timezone.
  const fmt = new Intl.DateTimeFormat('en', {
    timeZone: PROJECT_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const currentParts = fmt.formatToParts(now).reduce<Record<string, string>>((acc, p) => {
    if (p.type !== 'literal') acc[p.type] = p.value;
    return acc;
  }, {});
  const today = `${currentParts.year}-${currentParts.month}-${currentParts.day}`;

  const pubParts = fmt.formatToParts(pubDate).reduce<Record<string, string>>((acc, p) => {
    if (p.type !== 'literal') acc[p.type] = p.value;
    return acc;
  }, {});

  const pubYmd = `${pubParts.year}-${pubParts.month}-${pubParts.day}`;
  if (!pubYmd || pubYmd !== today) return false;

  const hour = Number(pubParts.hour);
  return hour >= 7 && hour < 8;
}

function summarize(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('meta') || t.includes('openai') || t.includes('anthropic') || t.includes('tesla') || t.includes('nvidia')) {
    return '기업·정책·산업 쪽 동향으로 이어질 가능성이 큽니다.';
  }
  if (t.includes('job') || t.includes('labor') || t.includes('worker') || t.includes('job market')) {
    return '노동시장·조직 운영에 바로 연결되는 항목입니다.';
  }
  if (t.includes('privacy') || t.includes('risk') || t.includes('security') || t.includes('law')) {
    return '법적/안전 리스크 관점에서 체크할 가치가 큽니다.';
  }
  return 'AI 활용 범위가 실사용·서비스로 확장되는 흐름을 보여줍니다.';
}

async function fetchXml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'christmas-ai-studio/ai-brief-bot (automation)',
    },
  });
  if (!res.ok) {
    throw new Error(`fetch failed ${url}: ${res.status}`);
  }
  return res.text();
}

function ensureDirs() {
  [RAW_DIR, OUT_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });
}

function rawPathForDate(dateStr: string) {
  return path.join(RAW_DIR, `${dateStr}.jsonl`);
}

function outputPathForDate(dateStr: string, ext: 'md' | 'json') {
  return path.join(OUT_DIR, `${dateStr}.${ext}`);
}

function dedupe(items: Item[]): Item[] {
  const seen = new Set<string>();
  const out: Item[] = [];
  for (const item of items) {
    const key = `${item.link}|${item.title}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

function score(item: Item): number {
  const p = (item.source || '').toLowerCase();
  const srcRank = isPreferredSource(p) ? 0 : 3;
  const aiRank = isAiItem(item.title) ? 0 : 2;
  const freshness = item.pubDate ? 0 : 1;
  return srcRank + aiRank + freshness;
}

async function runCollect() {
  ensureDirs();
  const today = nowDateLocal(new Date());
  const hnXml = await fetchXml('https://news.ycombinator.com/rss');
  const globalXml = await fetchXml(
    'https://news.google.com/rss/search?q=AI%20OR%20artificial%20intelligence%20site:reuters.com%20site:techcrunch.com%20site:theverge.com%20site:forbes.com%20site:ft.com%20site:wsj.com%20site:arstechnica.com%20site:cnn.com%20site:bloomberg.com%20site:cnbc.com%20site:theinformation.com&hl=en-US&gl=US&ceid=US:en',
  );

  const hnItems = parseItems(hnXml, 'hn');
  const globalItems = parseItems(globalXml, 'global');

  const candidates = dedupe([
    ...hnItems.filter((i) => isAiItem(i.title) && withinCollectWindow(i.pubDate)),
    ...globalItems.filter((i) => isAiItem(i.title) && withinCollectWindow(i.pubDate)),
  ]);

  const selected = candidates.sort((a, b) => {
    const pa = a.pubDate?.getTime() ?? 0;
    const pb = b.pubDate?.getTime() ?? 0;
    return pb - pa;
  });

  const rawPath = rawPathForDate(today);
  const lines = selected.map((item) => JSON.stringify(item));
  if (lines.length > 0) {
    fs.appendFileSync(rawPath, lines.join('\n') + '\n', 'utf8');
  }

  console.log(`Collected ${selected.length} items into ${rawPath}`);
}

function formatLine(item: Item): string {
  const src = item.source || new URL(item.link).hostname.replace('www.', '');
  return `- **${item.title}** (${src})\n  - 링크: ${item.link}\n  - 한 줄 요약: ${summarize(item.title)}\n`;
}

async function runBuild(targetDate?: string) {
  ensureDirs();
  const date = targetDate || nowDateLocal(new Date());
  const rawPath = rawPathForDate(date);

  if (!fs.existsSync(rawPath)) {
    console.log(`No collected raw data for ${date}.`);
    return;
  }

  const rawLines = fs.readFileSync(rawPath, 'utf8').split('\n').filter(Boolean);
  const items = rawLines.map((line) => JSON.parse(line) as Item).filter((i) => i.title && i.link);
  const uniq = dedupe(items);

  const hnTop = uniq
    .filter((i) => i.feed === 'hn')
    .filter((i) => isAiItem(i.title))
    .sort((a, b) => (b.pubDate ? b.pubDate.getTime() : 0) - (a.pubDate ? a.pubDate.getTime() : 0))
    .slice(0, 3);

  const globalTop = uniq
    .filter((i) => i.feed === 'global')
    .filter((i) => isAiItem(i.title))
    .sort((a, b) => score(a) - score(b) || ((b.pubDate ? b.pubDate.getTime() : 0) - (a.pubDate ? a.pubDate.getTime() : 0)))
    .slice(0, 7);

  const header = `## 🌎 Global AI Brief (${date})\n\n### 1) HN Top 3\n`;
  const markdown = [
    header,
    ...hnTop.map(formatLine),
    '\n### 2) US/Global AI Top 7',
    ...globalTop.map(formatLine),
    '\n### 한 줄 정리',
    '- 오늘 AI 동향은 모델 공개보다 실서비스·조직·안전·삶비 영향 쪽 이야기가 두드러집니다.',
    '- 7~8시 수집분을 바탕으로 계속 업데이트합니다.',
    '',
  ].join('\n');

  const outMd = outputPathForDate(date, 'md');
  fs.writeFileSync(outMd, markdown, 'utf8');
  const outJson = outputPathForDate(date, 'json');
  fs.writeFileSync(
    outJson,
    JSON.stringify(
      {
        date,
        collectedAt: new Date().toISOString(),
        timezone: PROJECT_TZ,
        hnTop,
        globalTop,
      },
      null,
      2,
    ),
    'utf8',
  );

  console.log(markdown);
  console.log(`Saved: ${outMd}`);
}

function showUsage() {
  console.log(`Usage: bun run scripts/daily-ai-brief.ts --mode <collect|build> [--date YYYY-MM-DD]\n\n` +
    `Modes:\n` +
    `  collect   - 07:00~07:59 로컬 수집 구간에서 AI 항목 수집\n` +
    `  build     - 수집 결과를 정리해서 HN Top 3 + US/Global Top 7 포맷 생성`);
}

async function main() {
  const args = process.argv.slice(2);
  const modeArg = args.find((a) => a === 'collect' || a === 'build' || a === '--mode')?.toString();

  let mode: Mode = 'build';
  if (args.includes('--mode')) {
    const idx = args.indexOf('--mode');
    const m = args[idx + 1] as Mode;
    if (m === 'collect' || m === 'build') mode = m;
  } else if (modeArg === 'collect' || modeArg === 'build') {
    mode = modeArg as Mode;
  }

  const dateArgIdx = args.indexOf('--date');
  const date = dateArgIdx > -1 ? args[dateArgIdx + 1] : undefined;

  if (mode === 'collect') {
    await runCollect();
    return;
  }

  if (!date && args.includes('--collect-now')) {
    await runCollect();
  }

  await runBuild(date);
}

main().catch((e) => {
  console.error(e);
  showUsage();
  process.exit(1);
});
