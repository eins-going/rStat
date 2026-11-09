# 쌀 단수 예측 연구 — 공통 규칙

목표: 위성·기상·통계로 쌀 단수를 '평년값'보다 확실히 잘 맞히는 모델. 화면에 정확도와 함께 걸 수 있어야 하고, 설명이 되어야 한다.

## 정답과 검증 (common.py)
- 정답: KOSIS DT_1ET0034 시군 논벼 10a당 생산량(정곡). `targets()`, `nation()`.
- 검증: **실시간(expanding window)만** 인정. y년 예측은 y년 이전 해로만 학습·조정(특징 선택·하이퍼파라미터 포함). 같은 해 다른 시군 정답 사용 금지.
- 기간 2013~2025 (S2처럼 늦게 시작한 자료는 가능한 해부터, 같은 해 평년과 비교).
- 예측 시점(as-of)을 밝힌다: 8/15 · 9/15 · 10/1.
- `evaluate(pred_df)`로 보고: 시군 RMSE·skill(1-RMSE/평년RMSE), 같은 해 순위상관, 전국 RMSE, 2020 전국 오차·감수 시군 적중.
- 지금까지: 평년 시군 RMSE 29.0 · 전국 21.8kg. 기상(시도) skill 약 +8%, MODIS 시군 skill 음(-). 통계청 10월 예상 전국 MAE 5.7, KREI 7.0.
- 성공 기준(잠정): 9/15 시점 시군 skill ≥ +0.25, 2020 감수 시군 적중 ≥ 0.6.

## 자료 (db/는 커밋 안 함, 읽기만. 새 파생 자료는 research/rice/<갈래>/ 아래)
- KOSIS: db/raw/kosis_rice/dt_1et0034.csv (1980~2025, 시군 1996~)
- 기상 ASOS: db/raw/kma/asos_daily.csv.gz (97곳 일자료 1980~2025), asos_stations.csv(경위도). KMA API: .env KMA_API_KEY (apihub.kma.go.kr; kma_sfcdd3.php 등 활용신청된 것만)
- MODIS 논 격자: db/raw/modis/vi_{2000..2026}.npz (pix[col,row], comp, ndvi/evi/rel/doy int16 ×1e4, 결측 -32768), db/clean/rice/paddy_modis.csv (격자별 논 비율·시군), db/clean/rice/modis_curves.csv
- 팜맵 논 필지: db/raw/farmmap/2026/*.gz (필지 GeoJSON, EPSG:5179?), R2 kr.pmtiles
- 위성 원자료: Microsoft Planetary Computer STAC (sentinel-2-l2a, sentinel-1-rtc, landsat-c2-l2, modis-*), 계정 불필요; NASA Earthdata 토큰 .env NASA_API_KEY
- 기존 시험: scripts/rice_feasibility.py(기상), scripts/rice_modis_test.py(MODIS)

## 이 PC 규칙 (반드시)
- RAM 15GB, 4코어, 다른 세션도 돈다. 무거운 계산은 `memcap -m 3G 명령`(상한 넘으면 그 작업만 종료). 먼저 작은 입력으로 `/usr/bin/time -v` 최대 메모리 측정.
- 오래 걸리는 수집은 `systemd-run --user --unit=rice-<이름> -p MemoryMax=3G -p MemorySwapMax=0 ...` 서비스로.
- `OMP_NUM_THREADS=2`. 큰 위성 수집(네트워크 무거운 것)은 한 번에 하나만 — 시작 전 `systemctl --user list-units 'rice-*'`로 확인.
- 키 값은 출력하지 않는다. 커밋하지 않는다. scripts/·data/·화면 파일은 건드리지 않는다.

## 추가 (00:43)
- 2026년 기상: research/rice/wx2026/asos_daily.csv.gz (같은 형식, 2026-01-01~11-08, 97곳). 2026 예측을 낼 때 common.asos()에 이어 붙여 쓴다.
- 통계청 10월 시도 예상 2010~2026: statdown/stat_forecast_sido.csv. 10월 기준선: 시군 = 평년 × (1+시도 예상 편차) skill +0.367, beta_p +0.389, + 8/1~9/14 강풍일 보정 +0.404 (statfix).
