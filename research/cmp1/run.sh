#!/bin/bash
cd /root/campaign/drafts/research/cmp1
while IFS='|' read -r id prompt; do
  [ -z "$id" ] && continue
  ( s=$(date +%s); timeout 600 codex exec --model gpt-6-astra -c model_reasoning_effort="medium" --skip-git-repo-check -o "astra-$id.md" "$prompt" < /dev/null > "astra-$id.log" 2>&1; echo "$(( $(date +%s)-s ))s" > "astra-$id.time" ) &
  ( s=$(date +%s); timeout 600 claude -p --model claude-fable-5-1 "$prompt" < /dev/null > "fable-$id.md" 2> "fable-$id.log"; echo "$(( $(date +%s)-s ))s" > "fable-$id.time" ) &
  wait
  echo "$id done $(date -u +%T)"
done < prompts.txt
echo ALLDONE
