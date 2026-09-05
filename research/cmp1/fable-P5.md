두 모델 모두 표준 API 기준으로 입력·출력 가격이 동일합니다.

| 모델 | 입력 $/1M | 출력 $/1M | 캐시 읽기 $/1M | 확실도 |
|---|---|---|---|---|
| Claude Fable 5.1 (`claude-fable-5-1`) | $10.00 | $50.00 | $0.25 | 높음 (Anthropic 공식 참조 자료, 2026-06 기준) |
| GPT-6 Astra | $10.00 | $50.00 | $1.00 (캐시 쓰기 $12.50) | 중간 (2026-09-03 출시, 웹 검색 결과 기반) |

**Claude Fable 5.1** 가격은 Anthropic 공식 참조 자료에서 확인했습니다. Batch API 사용 시 50% 할인이 적용됩니다. Fable 5.1은 Priority Tier를 지원하지 않습니다.

**GPT-6 Astra**는 이틀 전 출시된 모델이라 제 학습 데이터에는 없고, 웹 검색으로 확인했습니다. 여러 매체와 OpenAI 모델 페이지 목록에서 입력 $10, 출력 $50으로 일치하지만, 캐시 가격과 Fast 모드(2배 가격), Batch/Flex(50%) 같은 세부 조건은 2차 출처 기반이므로 OpenAI 공식 가격 페이지에서 재확인을 권합니다.

Sources:
- [OpenAI: GPT-6 Astra 모델 페이지](https://developers.openai.com/api/docs/models/gpt-6-astra)
- [OpenAI: GPT-6 Astra 발표](https://openai.com/index/gpt-6-astra/)
- [CloudZero: GPT-6 Astra pricing](https://www.cloudzero.com/blog/gpt-6-pricing/)
- [OpenRouter: GPT-6 Astra](https://openrouter.ai/openai/gpt-6-astra)
- [Wall St Engine (X)](https://x.com/wallstengine/status/2095576937288839395)
