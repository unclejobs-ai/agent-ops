# Claude Code changelog check

- Checked at: 2026-03-27T16:00:44.507Z
- Installed version: 2.1.85
- Latest changelog version: 2.1.85
- Previously seen version: 2.1.85
- New update found: no
- Installed behind latest: no

## Latest version snapshot (2.1.85)

- Added `CLAUDE_CODE_MCP_SERVER_NAME` and `CLAUDE_CODE_MCP_SERVER_URL` environment variables to MCP `headersHelper` scripts, allowing one helper to serve multiple servers
- Added conditional `if` field for hooks using permission rule syntax (e.g., `Bash(git *)`) to filter when they run, reducing process spawning overhead
- Added timestamp markers in transcripts when scheduled tasks (`/loop`, `CronCreate`) fire
- Added trailing space after `[Image #N]` placeholder when pasting images
- Deep link queries (`claude-cli://open?q=…`) now support up to 5,000 characters, with a "scroll to review" warning for long pre-filled prompts

## Telegram-ready summary

✅ Claude Code 업데이트 완료: 2.1.81 → 2.1.85


- 최신 changelog: 2.1.85
- 현재 설치: 2.1.85
- 마지막 확인: 2.1.85

핵심 변경점:
- Added `CLAUDE_CODE_MCP_SERVER_NAME` and `CLAUDE_CODE_MCP_SERVER_URL` environment variables to MCP `headersHelper` scripts, allowing one helper to serve multiple servers
- Added conditional `if` field for hooks using permission rule syntax (e.g., `Bash(git *)`) to filter when they run, reducing process spawning overhead
- Added timestamp markers in transcripts when scheduled tasks (`/loop`, `CronCreate`) fire
- Added trailing space after `[Image #N]` placeholder when pasting images
- Deep link queries (`claude-cli://open?q=…`) now support up to 5,000 characters, with a "scroll to review" warning for long pre-filled prompts

원문: https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md
