# AI 브리핑 자동화 (매일 08:30)

요청한 형식(HN 3 + 글로벌 7)으로 매일 아침 자동 브리핑을 만들기 위한 설정입니다.

## 동작 방식
- `collect` 모드: 전일/당일 아침 07:00~07:59 (로컬 타임존) 구간에서 AI 관련 뉴스를 수집해서 raw 파일로 보관
- `build` 모드: 수집된 데이터로 정리본을 생성 (`HN Top 3`, `US/Global AI Top 7`, 한 줄 정리)

## 수동 실행
```bash
# 1) 수집
bunx tsx ops/ai-brief/daily-ai-brief.ts --mode collect

# 2) 정리본 생성
bunx tsx ops/ai-brief/daily-ai-brief.ts --mode build
```

## 크론(자동화) 추천
운영서버의 `crontab -e`에 아래를 추가하세요.

> 사용자 기본 타임존이 **Asia/Seoul**이라고 가정

```cron
# 07:00-07:59마다 15분 간격 수집
*/15 7 * * * cd /root/christmas-ai-studio && TZ=Asia/Seoul bunx tsx ops/ai-brief/daily-ai-brief.ts --mode collect >> /tmp/ai-brief.log 2>&1

# 08:30 브리핑 출력/산출물 생성
30 8 * * * cd /root/christmas-ai-studio && TZ=Asia/Seoul bunx tsx ops/ai-brief/daily-ai-brief.ts --mode build >> /tmp/ai-brief.log 2>&1
```

## 자동 전송(옵션)
원하면 이 스크립트 뒤에 Telegram/Slack 전송을 붙여서 보내도록 확장 가능합니다. 
현재는 산출물만 파일로 남깁니다.

출력 위치:
- `ops/ai-brief/raw/YYYY-MM-DD.jsonl`
- `ops/ai-brief/output/YYYY-MM-DD.md`
- `ops/ai-brief/output/YYYY-MM-DD.json`
