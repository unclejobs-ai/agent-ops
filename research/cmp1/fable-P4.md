```bash
#!/usr/bin/env bash
# 현재 디렉토리의 40MB 초과 mp4 파일을 1080p H.264로 재인코딩하여 out/ 에 저장

set -euo pipefail

# 임계값: 40MB (바이트 단위)
THRESHOLD=$((40 * 1024 * 1024))

# 출력 디렉토리 생성
OUT_DIR="out"
mkdir -p "$OUT_DIR"

# ffmpeg 존재 여부 확인
command -v ffmpeg >/dev/null 2>&1 || { echo "ffmpeg이 설치되어 있지 않습니다." >&2; exit 1; }

# mp4 파일이 없을 때 글롭이 그대로 남지 않도록 설정
shopt -s nullglob nocaseglob

for f in *.mp4; do
    # 파일 크기(바이트) 확인
    size=$(stat -c %s "$f")

    # 40MB 이하이면 건너뜀
    if (( size <= THRESHOLD )); then
        echo "건너뜀 (40MB 이하): $f"
        continue
    fi

    out="$OUT_DIR/${f%.*}.mp4"

    # 이미 처리된 파일은 건너뜀
    if [[ -f "$out" ]]; then
        echo "건너뜀 (이미 존재): $out"
        continue
    fi

    echo "재인코딩 중: $f -> $out"

    # 세로 해상도 1080으로 축소(원본이 더 작으면 유지), 가로는 비율에 맞춰 짝수로 계산
    # 영상: libx264, 품질 CRF 23 / 오디오: AAC 128k
    # -nostdin: 루프 내에서 ffmpeg이 표준 입력을 가로채지 않도록 방지
    ffmpeg -nostdin -hide_banner -loglevel error -stats \
        -i "$f" \
        -vf "scale=-2:'min(1080,ih)'" \
        -c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p \
        -c:a aac -b:a 128k \
        -movflags +faststart \
        "$out"

    echo "완료: $out"
done

echo "모든 작업이 끝났습니다."
```
