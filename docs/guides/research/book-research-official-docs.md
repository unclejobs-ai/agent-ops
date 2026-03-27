# Claude 공식 문서 리서치 메모

작성 목적: **클로드를 ‘챗봇’이 아니라 ‘일(work) 시스템’으로 다루는 진지한 책**을 쓰기 위한 공식 자료 정리. 사용법 튜토리얼이 아니라, **제품 철학·작동 방식·조직적 의미·서사적 포인트**를 뽑아내는 데 초점을 둔다.

---

## 한 줄 요약

Anthropic/Claude의 공식 포지셔닝은 점점 더 분명하다. Claude는 단순히 대화형 답변기가 아니라, **맥락을 축적하고, 작업 공간을 분리하고, 권한을 받아 도구를 실행하며, 결과물을 대신 생산하는 ‘에이전트형 작업 환경’**으로 설계되고 있다. 이 관점에서 책은 “Claude에게 말을 거는 법”보다 **“Claude와 함께 일의 구조를 어떻게 재편하는가”**를 중심축으로 잡는 편이 더 정확하다.

---

## 1) 책의 중심 논지로 삼기 좋은 공식 포지셔닝

### A. Claude는 ‘stateless chat’에서 ‘knowledgeable collaborator’로 이동 중이다

공식 지원 문서는 메모리 기능을 설명하며 Claude가 **“a stateless chat interface”에서 “a knowledgeable collaborator that builds understanding over time”**로 변한다고 말한다.

- 출처: Use Claude’s chat search and memory to build on previous context  
  https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context

**책에 쓸 해석**
- Anthropic는 Claude를 단발성 질문응답 도구로 고정하지 않는다.
- 핵심 변화는 “더 똑똑한 답변”이 아니라 **시간에 따라 축적되는 협업성**이다.
- 즉, Claude의 진짜 경쟁력은 모델 IQ만이 아니라 **기억·프로젝트·권한·도구·작업 흐름의 결합**에 있다.

### B. Claude Code와 Cowork는 같은 에이전트 아키텍처의 두 표면이다

Cowork 소개 문서는 Cowork를 **“Claude Code's agentic capabilities to Claude Desktop for knowledge work beyond coding”**라고 설명한다. Claude Code 문서 역시 이를 **agentic coding tool**로 정의한다.

- 출처: Get started with Cowork  
  https://support.claude.com/en/articles/13345190-get-started-with-cowork
- 출처: Claude Code overview  
  https://code.claude.com/docs/en/overview

**책에 쓸 해석**
- 코딩용 제품과 일반 업무용 제품이 따로 노는 것이 아니라, **동일한 에이전트 논리가 서로 다른 업무 도메인에 확장**되는 구조다.
- 따라서 책은 Chat / Projects / Code / Cowork를 기능별 장난감처럼 병렬 소개하기보다, **“하나의 작업 체계가 여러 인터페이스로 구현된다”**는 식으로 묶는 편이 강하다.

### C. 공식 메시지는 “답변”보다 “완료된 결과물(deliverable)”에 기울어 있다

Cowork 제품 페이지는 “Hand off a task, get a polished deliverable”, “Unlike Chat, Cowork lets Claude complete work on its own”, “Claude delivers finished work instead of step-by-step updates”라고 반복한다.

- 출처: Cowork product page  
  https://claude.com/product/cowork

**책에 쓸 해석**
- Anthropic가 밀고 있는 미래상은 “대화가 잘 되는 AI”보다 **“맡기면 결과물을 내놓는 AI”**다.
- 인간의 역할도 재정의된다. 제품 페이지의 고객 코멘트는 인간 역할을 **validation, refinement, decision-making** 쪽으로 이동시키고 있다.
- 책에서는 이를 “클로드는 노동을 대체한다”가 아니라 **“사람의 노동을 검토·판단 중심으로 재배치한다”**로 풀어내는 것이 더 정교하다.

---

## 2) Chat: Claude는 여전히 대화 인터페이스지만, 제품 철학은 이미 ‘대화 이후’를 겨냥한다

지원 문서상 Chat은 여전히 기본 인터페이스지만, 중요한 변화는 두 가지다.

### 핵심 포인트
- Claude는 과거 대화를 **검색**할 수 있다. 이는 RAG 방식으로 작동한다.
- Claude는 과거 대화를 바탕으로 **메모리 요약(memory summary)** 를 만든다.
- 이 메모리는 24시간 주기로 합성되며, 새 대화의 배경이 된다.
- 사용자는 메모리를 끄거나, 보고 편집하거나, 특정 대화를 제외할 수 있다.
- 인코그니토 채팅은 검색/메모리 대상에서 제외된다.

- 출처: Use Claude’s chat search and memory to build on previous context  
  https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context

### 책을 위한 해석
- Chat은 더 이상 ‘매번 처음 만나는 창’이 아니다.
- 하지만 동시에 Anthropic는 **기억을 완전 자동화된 진실 저장소로 말하지 않는다.** 요약(synthesis), 인용(citation), 토글, 삭제 등 **가시성과 통제성**을 강조한다.
- 즉 책에서는 Claude를 “모든 걸 기억하는 비서”로 미화하기보다, **기억을 생성·편집·비활성화할 수 있는 작업 인프라**로 묘사하는 편이 공식 문서와 맞다.

### 서사 아이디어
- 첫 장에서 Claude를 챗봇으로 소개한 뒤, 곧바로 “그러나 공식 문서가 말하는 Claude는 이미 챗봇 이후의 존재다”라고 전환하기 좋다.
- 메모리 기능은 이 전환의 가장 좋은 증거다.

---

## 3) Projects: Claude의 ‘기억’을 일의 단위로 분리하는 장치

Projects 관련 문서는 Claude 프로젝트를 단순 폴더가 아니라 **공유 가능한 지식 베이스 + 지시문 + 대화 묶음 + 메모리 경계**로 설명한다.

### 공식적으로 확인되는 점
- 프로젝트 안에 업로드한 지식은 해당 프로젝트의 모든 대화에 사용된다.
- Team/Enterprise에서는 프로젝트 공유가 가능하다.
- 채팅을 프로젝트 안팎으로 옮길 수 있다.
- 메모리도 프로젝트별로 분리된다.
- 잘못 넣은 대화를 다른 프로젝트나 일반 채팅 영역으로 옮김으로써, 어떤 기억 요약에 포함될지 관리할 수 있다.

- 출처: How can I create and manage projects?  
  https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects
- 출처: Use Claude’s chat search and memory to build on previous context  
  https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context

### 책을 위한 해석
- Projects는 파일 정리 기능이 아니라, **맥락 오염을 막는 작업 경계 장치**다.
- “AI를 잘 쓰는 법”의 핵심이 프롬프트 엔지니어링이라기보다 **맥락 설계(context architecture)** 라는 점을 보여주는 훌륭한 사례다.
- 인간이 프로젝트를 만드는 행위는, Claude에게 일을 맡길 **인지적 방(room)** 을 만드는 행위에 가깝다.

### 문장화 아이디어
- “프로젝트는 폴더가 아니다. 프로젝트는 Claude가 무엇을 기억하고, 무엇을 잊고, 무엇을 일의 배경으로 삼을지를 결정하는 기억의 경계선이다.”

---

## 4) Claude Code: ‘대답하는 모델’이 아니라 ‘행동하는 에이전트’라는 점을 가장 선명하게 보여주는 표면

Claude Code 공식 문서는 제품을 반복적으로 **agentic** 이라고 규정한다.

### 공식적으로 중요한 표현
- Claude Code는 codebase를 읽고, 파일을 편집하고, 명령을 실행하고, 개발 도구와 통합된다.
- 핵심 구조는 **agentic loop**: gather context → take action → verify results.
- 모델은 추론하고, 도구는 행동한다. Claude Code는 그 둘을 묶는 **agentic harness** 다.
- Claude는 전체 프로젝트, git 상태, CLAUDE.md, auto memory, 확장 도구(MCP/skills/subagents)에 접근할 수 있다.

- 출처: Claude Code overview  
  https://code.claude.com/docs/en/overview
- 출처: How Claude Code works  
  https://code.claude.com/docs/en/how-claude-code-works

### 책을 위한 해석
- Anthropic가 Claude를 이해하는 방식은 “좋은 답을 생성하는 언어모델”보다 **“모델 + 도구 + 권한 + 검증 루프”**에 가깝다.
- 따라서 책에서 Claude를 설명할 때 모델 자체 성능만 파고들면 반쪽짜리가 된다.
- 더 중요한 것은 Claude가 **작업을 어떻게 분해하고, 외부 세계에 개입하고, 결과를 검증하며, 사람의 승인 구조 안에서 움직이는가**다.

### 서사적으로 중요한 포인트
- Code는 개발자 전용 부가 기능이 아니라, Claude 전체 철학의 **가장 노골적인 형태**다.
- Cowork는 이를 비개발 업무로 일반화한 것처럼 읽힌다.

---

## 5) Cowork: 책에서 가장 흥미로운 대상 — ‘지식노동용 에이전트 운영체제’라는 실험

Cowork 관련 공식 문서와 제품 페이지를 함께 보면, Anthropic는 Cowork를 단순한 데스크톱 챗 UI가 아니라 **에이전트형 지식노동 환경**으로 밀고 있다.

### 공식적으로 드러나는 성격
- Cowork는 Claude Code의 agentic architecture를 지식노동으로 확장한 연구 프리뷰다.
- 사용자는 목표를 설명하고 자리를 비울 수 있으며, Claude는 장시간 작업을 수행한다.
- 파일 접근, 스케줄링, 프로젝트, 메모리, 플러그인, 컴퓨터 사용이 결합된다.
- Cowork 프로젝트는 로컬 데스크톱에 존재하며, 파일/지시문/메모리가 묶인다.
- 폰에서 시작한 대화가 데스크톱으로 이어지는 식의 연속성도 강조된다.

- 출처: Get started with Cowork  
  https://support.claude.com/en/articles/13345190-get-started-with-cowork
- 출처: Organize your tasks with projects in Cowork  
  https://support.claude.com/en/articles/14116274-organize-your-tasks-with-projects-in-cowork
- 출처: Cowork product page  
  https://claude.com/product/cowork

### 책을 위한 해석
- Cowork는 “AI가 문서를 써준다” 수준이 아니다. 공식 표현대로라면 **결과물 생산의 위임 시스템**이다.
- 중요한 건 UI가 아니라 **작업 위임의 문법**이다: 목표, 주기, 접근 권한, 자료, 기억, 점검 지점.
- 책에서 Cowork는 “클로드가 일하는 방식”을 보여주는 핵심 사례가 될 수 있다. 특히 “회의록 정리”, “주간 브리핑”, “리서치 문서 초안”, “폴더 정리” 같은 사례는 실제 사무노동 구조를 바꾸는 서사를 만들기 좋다.

### 특히 흥미로운 공식 메시지
제품 페이지는 사람의 역할을 “validation, refinement, decision-making”으로 이동시킨다.

**책에서 쓸 수 있는 해석**
- 이는 지식노동의 종말론이 아니라 **지식노동의 재배치론**이다.
- Claude는 판단 그 자체가 아니라, **판단 전후의 수집·정리·가공·초안화·반복 실행을 맡는 시스템**으로 읽는 편이 정확하다.

---

## 6) Memory / Context: Anthropic가 가장 일관되게 밀고 있는 주제는 ‘긴 문맥’이 아니라 ‘지속되는 작업 맥락’이다

### Chat 쪽 메모리
- 과거 채팅 검색
- 자동 메모리 요약
- 프로젝트별 별도 메모리
- 편집/토글/삭제/인용 가능

- 출처: https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context

### Claude Code 쪽 메모리
- 모든 세션은 새 컨텍스트 윈도우에서 시작하지만, 지식은 두 메커니즘으로 이어진다: **CLAUDE.md** 와 **auto memory**.
- CLAUDE.md는 사람이 쓰는 지속 지시문, auto memory는 Claude가 스스로 쌓는 학습 노트다.
- 둘 다 매 세션 시작 시 로드되지만, “enforced configuration”이 아니라 **context** 로 취급된다.
- 좋은 기억은 길고 포괄적인 규칙이 아니라, 구체적이고 짧고 구조화된 지시다.

- 출처: How Claude remembers your project  
  https://code.claude.com/docs/en/memory

### 책을 위한 해석
- Anthropic의 메모리 철학은 “영구적으로 다 기억하는 AI”보다 **작업에 필요한 지속 맥락을 점층적으로 불러오는 구조**에 가깝다.
- 즉 기억은 신비한 지능의 부산물이 아니라, **명시적 지시문과 자동 학습 노트의 혼합체**다.
- 책에서는 이를 “AI 기억”보다 **협업 문서화 + 컨텍스트 관리의 진화형**으로 다루는 편이 설득력 있다.

### 아주 중요한 대비
- 컨텍스트 윈도우(context window)는 기술적 한계의 언어다.
- 메모리(memory), 프로젝트(project), CLAUDE.md는 작업 지속성의 언어다.
- Anthropic는 단순히 컨텍스트를 크게 만드는 회사가 아니라, **컨텍스트를 운영하는 회사**처럼 보인다.

---

## 7) 비용(costs): 공식 문서가 보여주는 것은 ‘싼 AI’가 아니라 ‘관리 가능한 작업 비용’이라는 프레임

### Claude 일반 사용량
- usage limits와 length limits는 다르다.
- claude.ai, Claude Code, Claude Desktop 사용량은 같은 usage limit에 합산된다.
- 자동 컨텍스트 관리가 긴 대화를 계속 이어주기도 한다.

- 출처: How do usage and length limits work?  
  https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work

### 유료 플랜과 추가 사용량
- Pro/Max는 한도 초과 시 extra usage를 켜서 API 요금 기반으로 계속 쓸 수 있다.
- Claude Code 사용량도 같은 한도/추가 사용량 체계에 포함된다.
- 프로젝트 파일/리서치/코드 실행 등은 모두 토큰 비용과 연결된다.

- 출처: Using Claude Code with your Pro or Max plan  
  https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan
- 출처: Manage extra usage for paid Claude plans  
  https://support.claude.com/en/articles/12429409-manage-extra-usage-for-paid-claude-plans

### Claude Code 팀 비용 문서
- 평균 비용: 개발자당 하루 약 $6, 월 약 $100~200(소넷 4.6 기준, 편차 큼).
- 비용은 코드베이스 규모, 질의 복잡도, 대화 길이, 병렬 에이전트 수에 따라 커진다.
- 비용 절감 포인트는 컨텍스트 관리, 모델 선택, MCP 오버헤드 감소, hooks/skills로 전처리하기 등이다.

- 출처: Manage costs effectively  
  https://code.claude.com/docs/en/costs

### 책을 위한 해석
- Anthropic는 비용을 감추지 않는다. 오히려 **작업 시스템의 운영비용**으로 노골적으로 다룬다.
- 이것은 책에서 매우 중요한 포인트다. Claude는 “한 번 결제하면 무한히 말동무가 되는 서비스”가 아니라, **맥락·도구·자동화·병렬성에 따라 비용 구조가 달라지는 작업 인프라**다.
- 따라서 책은 “Claude가 얼마나 똑똑한가”뿐 아니라, **Claude를 어떤 업무에 투입해야 비용 대비 효과가 나는가**를 다뤄야 한다.

### 좋은 문장 재료
- “Claude의 가격은 구독료에 있지 않다. 진짜 가격은 당신이 얼마나 많은 맥락을 불러오고, 얼마나 자주 검증 루프를 돌리고, 몇 명의 에이전트를 동시에 일하게 하느냐에 있다.”

---

## 8) Permissions / Security: Anthropic의 진짜 차별점 중 하나는 ‘자율성’이 아니라 ‘승인 구조’다

### Claude Code 권한 체계
- 기본은 read-only에 가깝다.
- 파일 읽기, 수정, Bash 실행은 서로 다른 승인 체계를 가진다.
- allow / ask / deny 규칙이 있고, deny → ask → allow 순으로 평가된다.
- permission mode는 default / acceptEdits / plan / auto / dontAsk / bypassPermissions 등으로 나뉜다.
- auto 모드는 background safety checks를 동반하는 research preview다.
- bypassPermissions는 위험하므로 격리 환경에서만 쓰라고 강하게 경고한다.

- 출처: Choose a permission mode  
  https://code.claude.com/docs/en/permission-modes
- 출처: Configure permissions  
  https://code.claude.com/docs/en/permissions

### Claude Code 보안 문서
- permission-based architecture를 보안의 기반으로 설명한다.
- bash sandbox, write scope 제한, command blocklist, trust verification, isolated context windows for web fetch 등을 명시한다.
- prompt injection을 주요 위협 모델로 다룬다.
- cloud execution과 remote control의 보안 모델 차이도 구분한다.

- 출처: Security  
  https://code.claude.com/docs/en/security

### Cowork 안전 문서
- Claude가 파일, 브라우저, 연결 서비스, 앱에 접근할 수 있으므로 위험이 존재한다고 명시한다.
- audit logs / Compliance API / data exports에 Cowork 활동이 잡히지 않는다고 경고한다.
- 규제 워크로드에는 쓰지 말라고 한다.
- 민감한 폴더 접근 최소화, 스케줄 작업 주의, 브라우저/웹 접근 제한, 낯선 MCP/플러그인 경계 등을 권한다.

- 출처: Use Cowork safely  
  https://support.claude.com/en/articles/13364135-use-cowork-safely
- 출처: Use Cowork on Team and Enterprise plans  
  https://support.claude.com/en/articles/13455879-use-cowork-on-team-and-enterprise-plans

### Enterprise 데이터 통제
- 조직은 데이터 보존 기간을 커스텀할 수 있다.
- 최소 30일이며, last observed activity 기준으로 삭제 계산이 된다.
- 관련 활동은 audit logs에 남는다.

- 출처: Configure custom data retention controls for Enterprise plans  
  https://support.claude.com/en/articles/10440198-configure-custom-data-retention-controls-for-enterprise-plans

### 책을 위한 해석
- Anthropic는 “AI가 뭐든 알아서 해준다”보다 **“AI가 무엇을 하게 둘 것인가를 인간이 설계한다”**는 방향을 취한다.
- 즉 Claude의 진짜 테마는 완전 자율이 아니라 **조정 가능한 자율성(governed autonomy)** 이다.
- 이것은 책 전체의 핵심 프레임이 될 수 있다. Claude를 잘 쓰는 사람은 프롬프트를 예쁘게 쓰는 사람이 아니라, **권한·맥락·검증·범위를 설계하는 사람**이라는 식이다.

---

## 9) 조직/협업 관점: Claude는 개인 도구에서 조직 운영체계로 넘어가고 있다

### 공식 문서에서 보이는 조직화 징후
- Team/Enterprise에서는 프로젝트 공유가 가능하다.
- 역할(Role)에 따라 청구, 멤버십, 기능 활성화, 보안·데이터 통제, 감사 로그 접근 권한이 다르다.
- Primary Owner/Owner/Admin/User로 역할이 분리된다.
- 조직은 데이터 보존 정책, 기능 토글, 플러그인 배포, 브랜딩 등을 관리할 수 있다.
- Claude Code는 팀 차원에서 관리 설정, spend limit, analytics를 붙일 수 있다.

- 출처: Roles and permissions  
  https://support.claude.com/en/articles/9267276-roles-and-permissions
- 출처: Who owns and manages the data of my team?  
  https://support.claude.com/en/articles/9265372-who-owns-and-manages-the-data-of-my-team
- 출처: Manage costs effectively  
  https://code.claude.com/docs/en/costs

### 책을 위한 해석
- Claude는 개인 생산성 툴을 넘어서 **업무 규칙이 반영되는 조직 인터페이스**로 이동 중이다.
- 이 때문에 책은 개인 팁 모음보다, **팀이 Claude를 도입하면 업무 분장·보안 규칙·문서화 습관이 어떻게 바뀌는가**를 다루는 것이 더 장기적으로 가치 있다.

---

## 10) 공식 문서로부터 추출한 ‘워크플로 철학’

아래 항목은 여러 문서에 흩어진 메시지를 책용 개념어로 재조합한 것이다.

### 1. Claude는 질문응답기가 아니라 루프를 돌리는 작업자다
- gather context → take action → verify results
- 말보다 절차와 검증이 중요하다.

### 2. 좋은 사용자는 프롬프트 엔지니어가 아니라 작업 설계자다
- 프로젝트 경계 설정
- 기억 범위 관리
- 권한 모드 선택
- 검토 지점 지정
- 비용·오버헤드 관리

### 3. Claude의 핵심 능력은 ‘대답’이 아니라 ‘맥락 운영’이다
- 과거 채팅 검색
- 메모리 합성
- 프로젝트별 기억 분리
- CLAUDE.md / auto memory / rules / hooks / skills

### 4. 자율성은 무한할수록 좋은 것이 아니라, 조정 가능할수록 좋다
- default / plan / auto / bypassPermissions 같은 계층적 모드
- 민감한 일에는 감독이 필요하다.
- 반복 작업에는 허용 규칙과 자동화가 필요하다.

### 5. 인간의 역할은 사라지지 않고 이동한다
- 수집과 정리에 쓰던 시간이 줄고
- 승인, 검토, 우선순위 결정, 품질 판단의 비중이 커진다.

### 6. Claude의 진짜 단위는 ‘대화’가 아니라 ‘작업 공간’이다
- chat, project, code session, cowork project, scheduled task
- 즉 “한 번 물어보고 끝”이 아니라 “맥락을 가진 업무 컨테이너”가 기본 단위가 된다.

---

## 11) 책 집필에 바로 도움이 될 만한 장 구성 아이디어

### 제안 1: “챗봇 이후의 Claude”
- Chat에서 시작하지만, 메모리와 검색으로 이미 stateless를 벗어난다.
- 독자에게 “왜 Claude를 그냥 챗봇으로 보면 놓치는가”를 설명하는 장.

### 제안 2: “프로젝트는 기억의 경계선이다”
- Projects를 폴더가 아니라 맥락 설계 도구로 다룬다.
- 개인 지식노동과 팀 협업 모두에 적용 가능.

### 제안 3: “Claude Code가 먼저 보여준 미래”
- agentic loop, permissions, tools, verification.
- Claude 전체 철학을 가장 선명하게 해설하는 장.

### 제안 4: “Cowork와 지식노동의 재배치”
- 결과물 위임, 스케줄 작업, 파일/앱/브라우저 접근.
- 인간 역할이 validation/refinement/decision으로 이동하는 과정.

### 제안 5: “AI를 잘 쓰는 사람은 권한을 설계하는 사람이다”
- permissions, security, prompt injection, data retention.
- 기술 낙관론이나 공포론을 피하고 실제 운영 원리를 설명.

### 제안 6: “비용은 돈의 문제가 아니라 맥락의 문제다”
- 컨텍스트, 장기 세션, 병렬 에이전트, 프로젝트 파일, 추가 사용량.
- Claude의 경제학을 업무 설계 관점으로 풀이.

---

## 12) 저술 시 주의할 점

### 피해야 할 오해
- Claude를 ‘모든 걸 기억하는 비서’로 과장하기
- Cowork를 안정적으로 완성된 엔터프라이즈 제품처럼 서술하기
- auto / bypass 권한을 ‘완전 자동화’의 승리로 묘사하기
- 비용을 단순 구독료 표로 축소하기

### 공식 문서상 반드시 붙여야 할 뉘앙스
- Cowork는 **research preview** 다.
- Cowork는 안전/감사/규제 측면에서 아직 제한이 있다.
- 메모리는 사용자가 끄고 편집할 수 있으며, 프로젝트별로 분리된다.
- 권한은 제품의 핵심 설계요소다.
- Claude의 행동성은 언제나 도구/권한/검증과 함께 설명해야 한다.

---

## 13) 가장 중요한 저자용 결론

이 책의 가장 강한 문장은 아마 이런 방향이어야 한다.

> Claude는 더 나은 채팅창이 아니다.  
> Claude는 기억, 프로젝트, 권한, 도구, 검증 루프를 통해  
> 인간의 일을 재구성하는 작업 시스템이다.

Anthropic 공식 문서는 이 문장을 여러 방식으로 뒷받침한다. Chat은 기억을 얻고, Projects는 맥락을 구획하고, Claude Code는 행동 루프를 드러내고, Cowork는 그 루프를 지식노동 전반으로 확장한다. 비용과 보안 문서까지 포함해서 보면, Anthropic가 파는 것은 단순한 “똑똑한 모델”이 아니라 **조직 가능한 자율성**이다.

책은 바로 이 지점에서 힘을 얻을 수 있다.

---

## 참고 공식 출처 목록

1. Claude Code overview  
   https://code.claude.com/docs/en/overview
2. How Claude Code works  
   https://code.claude.com/docs/en/how-claude-code-works
3. How Claude remembers your project  
   https://code.claude.com/docs/en/memory
4. Manage costs effectively  
   https://code.claude.com/docs/en/costs
5. Choose a permission mode  
   https://code.claude.com/docs/en/permission-modes
6. Configure permissions  
   https://code.claude.com/docs/en/permissions
7. Security  
   https://code.claude.com/docs/en/security
8. Use Claude’s chat search and memory to build on previous context  
   https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context
9. How can I create and manage projects?  
   https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects
10. Get started with Cowork  
    https://support.claude.com/en/articles/13345190-get-started-with-cowork
11. Organize your tasks with projects in Cowork  
    https://support.claude.com/en/articles/14116274-organize-your-tasks-with-projects-in-cowork
12. Use Cowork safely  
    https://support.claude.com/en/articles/13364135-use-cowork-safely
13. Use Cowork on Team and Enterprise plans  
    https://support.claude.com/en/articles/13455879-use-cowork-on-team-and-enterprise-plans
14. How do usage and length limits work?  
    https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work
15. Using Claude Code with your Pro or Max plan  
    https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan
16. Manage extra usage for paid Claude plans  
    https://support.claude.com/en/articles/12429409-manage-extra-usage-for-paid-claude-plans
17. Roles and permissions  
    https://support.claude.com/en/articles/9267276-roles-and-permissions
18. Who owns and manages the data of my team?  
    https://support.claude.com/en/articles/9265372-who-owns-and-manages-the-data-of-my-team
19. Configure custom data retention controls for Enterprise plans  
    https://support.claude.com/en/articles/10440198-configure-custom-data-retention-controls-for-enterprise-plans
20. Cowork: Claude Code power for knowledge work  
    https://claude.com/product/cowork
