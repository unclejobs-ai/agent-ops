# Channel bridge v2 (safe foundation)

This bridge is intentionally **disabled by default** and currently supports **Telegram → Discord only**.

That is a deliberate safety choice:
- no Discord polling loop
- no Discord → Telegram re-entry into OpenClaw
- isolated process with its own PID, log, and state files
- explicit start/stop/status commands
- aggressive filtering of OpenClaw/system/tool/internal text before forwarding

## What v2 does

Source:
- tails a single OpenClaw Telegram private-session file

Destination:
- sends filtered user messages to one Discord channel via `openclaw message send`

Forwarding rules:
- only `message.role === "user"`
- strips injected OpenClaw metadata blocks
- drops internal/system/tool/subagent/runtime-style messages
- drops obvious bridge echoes like `[TG→DC]` / `[DC→TG]`
- truncates oversized outbound messages for Discord

## What v2 does **not** do

- no Discord → Telegram forwarding
- no direct Telegram/Discord bot connections
- no backfill replay on first start
- no autostart / cron / systemd unit in this repo

## Config

Main config:
- `ops/channel-bridge/bridge.config.json`

Template:
- `ops/channel-bridge/bridge.config.example.json`

Important fields:
- `enabled`: must be set to `true` manually before start
- `direction`: must stay `telegram_to_discord`
- `telegram.sessionKey`: OpenClaw Telegram private session key to tail
- `discord.target`: destination Discord channel target
- `runtimeDir`: where PID/log/state files are written

## Start

1. Edit `ops/channel-bridge/bridge.config.json`
2. Set:
   - `"enabled": true`
   - correct `telegram.sessionKey`
   - correct `discord.target`
3. Start manually:

```bash
bun run bridge:start
```

This launches a detached background process.

## Status

```bash
bun run bridge:status
```

## Stop

```bash
bun run bridge:stop
```

## Logs and runtime files

Default runtime directory:
- `ops/channel-bridge/runtime/`

Files:
- `bridge.pid` — current bridge process PID
- `bridge.log` — append-only runtime log
- `telegram-state.json` — last byte offset in the Telegram session file

## Test plan

### Safe dry-ish validation
1. Keep `enabled: false`
2. Run:
   ```bash
   bun run bridge:status
   ```
3. Confirm nothing is running.

### Real validation
1. Set `enabled: true`
2. Start the bridge:
   ```bash
   bun run bridge:start
   ```
3. Send a plain human message in the configured Telegram DM
4. Confirm it appears once in the configured Discord channel
5. Confirm internal/system/tool text does **not** forward
6. Stop the bridge:
   ```bash
   bun run bridge:stop
   ```

## Operational notes

- The bridge starts tailing from the current end of the Telegram session file on first run to avoid replaying historical content.
- On later restarts it resumes from `telegram-state.json`.
- Polling is intentionally conservative (`5000ms` default).
- If the PID file exists but the process is gone, `bridge:stop` cleans the stale PID file.

## Why this is safer than the previous experiment

The earlier version was symmetric and polled Discord continuously, which created more ways to loop traffic back into OpenClaw and more chances to interfere with responsiveness.

This v2 foundation reduces risk by:
- making the bridge one-way only
- removing Discord reads entirely
- running outside the main agent flow as a detached process
- requiring explicit manual enable/start
- keeping shutdown simple and immediate
