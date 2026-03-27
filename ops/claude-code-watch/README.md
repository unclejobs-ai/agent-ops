# Claude Code changelog watcher

Claude Code 변경 로그를 주기적으로 확인해서 최신 버전이 올라오면 바로 요약하고, 설치본이 뒤처졌으면 업데이트 명령까지 함께 안내하는 감시 스크립트입니다.

## 수동 실행

```bash
cd /root/christmas-ai-studio
bunx tsx scripts/check-claude-code-changelog.ts
```

JSON 결과만 필요하면:

```bash
bunx tsx scripts/check-claude-code-changelog.ts --json
```

자동 업데이트를 직접 시도하려면:

```bash
bunx tsx scripts/update-claude-code.ts
```

이 스크립트는 실행 결과를 바로 메시지로 쓸 수 있게 `summaryMarkdown`도 함께 출력합니다.

## 출력물

- 최신 상태 마크다운: `ops/claude-code-watch/latest.md`
- 최신 상태 JSON: `ops/claude-code-watch/latest.json`
- 새 버전 발견 시 보고서: `ops/claude-code-watch/reports/<timestamp>-<version>.md`
- 상태 파일: `ops/claude-code-watch/state.json`

## 동작 방식

1. `claude --version`으로 현재 설치 버전 확인
2. GitHub raw changelog에서 최신 `CHANGELOG.md` 다운로드
3. 최상단 버전(`## x.y.z`)과 마지막 확인 버전 비교
4. 새 버전이 있으면 핵심 bullet을 뽑아 한국어 전달용 요약 베이스 생성
5. 로컬 설치 버전이 최신 changelog 버전보다 낮은지도 함께 판별
6. 상태 파일 업데이트

## OpenClaw cron 등록 예시

> 실제 등록은 Gateway가 켜져 있어야 하며, 등록 전 `openclaw cron list`로 기존 잡 확인 권장

에이전트가 직접 체크하고, 새 버전일 때만 채팅에 알리게 하려면 아래 메시지로 스케줄링하면 됩니다.

```bash
openclaw cron add \
  --name claude-code:changelog-watch \
  --cron '*/30 * * * *' \
  --tz UTC \
  --announce \
  --message "Run 'bunx tsx scripts/check-claude-code-changelog.ts --json'. If isNew is true, send a concise Korean summary of unseenEntries to the current chat with the new version number and top changes. If isNew is false, reply with NO_REPLY." \
  --description "Watch Claude Code changelog and announce new releases"
```

## 참고

- 최초 1회 실행은 현재 최신 버전을 `lastSeenVersion`으로 저장합니다.
- changelog에 새 항목이 없어도, 로컬 설치 버전이 최신보다 낮으면 `isInstalledOutdated: true`로 표시되고 업데이트 권장 명령도 함께 요약에 포함됩니다.
- 자동 업데이트 스크립트는 실행 결과를 `summaryMarkdown`으로 함께 출력하므로, 실행 성공/실패/버전 변경 유무를 바로 메시지로 전달할 수 있습니다.
- 즉시 알림 테스트를 하려면 `ops/claude-code-watch/state.json`의 `lastSeenVersion`을 예전 버전으로 바꾼 뒤 다시 실행하면 됩니다.
- changelog 원문 소스: `https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md`
