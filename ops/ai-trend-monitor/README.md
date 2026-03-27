# AI trend monitor v1

Safe, manual-run-first monitor for AI/coding-agent/vibe-coding trends using **non-X sources only**.

## What it watches

Focused topics:
- Claude Code
- Codex
- Cursor
- Gemini code tools
- OpenHands
- OpenClaw
- Bolt / Lovable / Replit-style builders
- Other likely high-attention AI developer-tool news

Explicitly excluded:
- Windsurf
- Devin

## Source strategy

V1 intentionally stays simple and low-risk:
- Hacker News RSS (`https://news.ycombinator.com/rss`)
- Google News RSS queries per target topic

This keeps collection read-only, credential-free, and schedule-friendly.

Config file:
- `ops/ai-trend-monitor/sources.json`

## How scoring works

Each fetched item is scored with a practical heuristic:
- topic match priority
- source priority
- title boost for launch/release/announce/open-source/funding/agent/coding terms
- freshness boost
- extra boost when the title directly names a target tool/topic
- hard exclusion if title/snippet/link contains banned terms (`windsurf`, `devin`)

This is designed for **compact attention filtering**, not perfect relevance.

## Commands

From repo root:

```bash
bun run ai-trend:run
```

Manual collection only:

```bash
bun run ai-trend:collect
```

Build digest from latest collected run:

```bash
bun run ai-trend:build
```

Useful flags:

```bash
bunx tsx scripts/ai-trend-monitor.ts --mode run --since-hours 48 --limit 6
bunx tsx scripts/ai-trend-monitor.ts --mode build --input ops/ai-trend-monitor/runs/<timestamp>.json
```

## Output files

- Latest markdown digest: `ops/ai-trend-monitor/latest.md`
- Latest JSON snapshot: `ops/ai-trend-monitor/latest.json`
- Per-run raw/scored snapshots: `ops/ai-trend-monitor/runs/*.json`

## Compact output format

The markdown digest is optimized for quick reading:
- top items only
- score + source + age
- matched topic tags
- short reason trace
- one-line note
- direct link
- tiny Telegram/Slack-sized summary section at the end

## Telegram delivery v1

Safe default: **disabled/manual-first**.

Config:
- `ops/ai-trend-monitor/delivery.config.json`
- `enabled` is `false` by default
- target is prewired to Telegram DM `7461087650` on account `uclejobs`

State:
- `ops/ai-trend-monitor/delivery-state.json`

Manual preview:

```bash
bun run ai-trend:telegram:preview
```

Manual send:

```bash
bun run ai-trend:telegram:send
```

Scheduled-safe mode:

```bash
bun run ai-trend:telegram:scheduled
```

What scheduled mode does:
- sends only when `enabled: true`
- skips stale digests older than `maxAgeHours`
- skips duplicate digests
- enforces `minHoursBetweenSends` cooldown

Recommended manual-first flow:

```bash
bun run ai-trend:run
bun run ai-trend:telegram:preview
bun run ai-trend:telegram:send
```

If you later want automation, schedule these two commands in order:

```bash
bun run ai-trend:run
bun run ai-trend:telegram:scheduled
```

Recommended starting cadence:
- every 2-4 hours

## Notes

- Telegram delivery now exists, but auto-send is still off by default.
- v1 uses `openclaw message send` so delivery stays inside existing OpenClaw channel plumbing.
- The source list is easy to extend later with more RSS/Atom feeds or official release feeds.
