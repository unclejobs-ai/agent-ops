```bash
#!/usr/bin/env bash
set -euo pipefail

mkdir -p -- out

# 현재 디렉토리에서 40MiB(41,943,040바이트)를 초과하는 MP4만 처리
while IFS= read -r -d '' file; do
  # 화면 비율을 유지해 최대 1920×1080으로 변환하고, 기존 출력은 덮어쓰지 않음
  ffmpeg -nostdin -n -i "$file" \
    -map 0:v:0 -map '0:a?' \
    -vf 'scale=1920:1080:force_original_aspect_ratio=decrease:force_divisible_by=2' \
    -c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p \
    -c:a aac -b:a 192k -movflags +faststart \
    "out/${file#./}" \
    || printf '변환 실패 또는 기존 출력 존재: %s\n' "$file" >&2
done < <(find . -maxdepth 1 -type f -iname '*.mp4' -size +41943040c -print0)
```