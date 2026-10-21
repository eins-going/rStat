"""시도별 필지 타일(build_farmmap.py) → 전국 타일 하나로 합쳐 Cloudflare R2(rstat-tiles)에 올린다.

자세히 보기(assets/farm.js)가 확대한 지도에서 이 파일을 범위 요청으로 읽어 필지 경계를 그린다.
- 합치기: tile-join으로 db/clean/farmmap/<판>/<시도>.pmtiles 17개 → kr.pmtiles (시도 경계에 걸친 타일은 한 타일로 합쳐진다)
- 올리기: farmmap/<팜맵 연도>/kr.pmtiles. 버킷은 r2.dev 공개 주소와 CORS(서비스 도메인, Range)를 켜 둔다.
- 키는 .env CLOUDFLARE_R2_ENDPOINT·CLOUDFLARE_R2_ACCESS_KEY_ID·CLOUDFLARE_R2_SECRET_ACCESS_KEY

실행: python scripts/upload_farmmap_tiles.py [--tag 2026] [--year 2025] [--no-join]
"""
import argparse
import glob
import json
import os
import subprocess
import time

import boto3
from boto3.s3.transfer import TransferConfig

from build_farmmap import JS, OUT
from regions import SIDOS

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TILE_JOIN = os.path.expanduser("~/.local/bin/tile-join")
BUCKET = "rstat-tiles"


def env():
    out = {}
    with open(os.path.join(ROOT, ".env"), encoding="utf-8") as f:
        for line in f:
            if "=" in line and not line.lstrip().startswith("#"):
                k, v = line.rstrip("\n").split("=", 1)
                out[k.strip()] = v.strip().strip("'\"")
    return out


def farmmap_year():
    with open(JS, encoding="utf-8") as f:
        s = f.read()
    return json.loads(s[s.index("{"):s.rindex("}") + 1])["year"]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--tag", default=time.strftime("%Y"))
    ap.add_argument("--year", help="팜맵 연도 (없으면 data/farmmap.js의 year)")
    ap.add_argument("--no-join", action="store_true", help="이미 만든 kr.pmtiles를 그대로 올린다")
    a = ap.parse_args()
    outdir = os.path.join(OUT, a.tag)
    target = os.path.join(outdir, "kr.pmtiles")
    if not a.no_join:
        parts = sorted(glob.glob(os.path.join(outdir, "[0-9][0-9].pmtiles")))
        missing = set(SIDOS) - {os.path.basename(p)[:2] for p in parts}
        if missing:
            raise SystemExit(f"시도 타일이 모자랍니다: {', '.join(sorted(missing))}")
        subprocess.run([TILE_JOIN, "-o", target, "--force", "-pk", "-q", *parts], check=True)
    year = a.year or farmmap_year()
    key = f"farmmap/{year}/kr.pmtiles"
    e = env()
    s3 = boto3.client("s3", endpoint_url=e["CLOUDFLARE_R2_ENDPOINT"], region_name="auto",
                      aws_access_key_id=e["CLOUDFLARE_R2_ACCESS_KEY_ID"],
                      aws_secret_access_key=e["CLOUDFLARE_R2_SECRET_ACCESS_KEY"])
    print(f"올리는 중 {target} ({os.path.getsize(target) / 1e6:.0f}MB) → {BUCKET}/{key}", flush=True)
    s3.upload_file(target, BUCKET, key, Config=TransferConfig(multipart_chunksize=64 * 2**20, max_concurrency=8),
                   ExtraArgs={"ContentType": "application/vnd.pmtiles", "CacheControl": "public, max-age=86400"})
    print("→", key)


if __name__ == "__main__":
    main()
