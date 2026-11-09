# 목표: 통계청 10월 예상보다 나은 쌀 단수(→생산량) 예측, 통계청 발표(10/8~10/14) 이전 시점

## 넘어야 할 기준 (2013~2025, 그해 이전 자료로만)
- 통계청 10월 예상(statdown/stat_forecast_sido.csv, 2010~2026, yield_kg10a·area_ha; 면적은 확정과 같음):
  - 전국 MAE 5.65 · RMSE 7.18 kg/10a (2010~2025: 5.53 · 6.97)
  - 8도(31~38) 시도 면적가중 RMSE 9.95 (2010~25: 9.80)
- 현재 우리 최고(9/15 작물생리 모델 M4, cropmodel/): 전국 MAE 5.47 · RMSE 7.17, 8도 시도 RMSE 13.27. 10/1 시점 13.53.
  - 즉 전국은 비김, 시도는 통계청이 훨씬 좋음. 시도 격차를 줄이는 것이 핵심.
- 생산량 = 단수 × 면적. 면적은 8월 말 통계청 재배면적 조사로 시도까지 알려짐 → 전국·시도 생산량 오차 = 단수 오차.

## 규칙
- 엄격한 실시간: Y년 예측은 Y−1년까지 정답·Y년 as-of 날짜까지 기상만. 특징·창·하이퍼파라미터 선택도 그해 이전 자료 안에서(내부 CV) 하거나, 시작 전에 README에 사전 등록. 시도한 변형 수를 모두 기록(사후 최고값만 보고 금지).
- as-of 날짜: 9/15 또는 9/30(통계청 발표 전). 9/30 이후 기상은 쓰지 말 것.
- 정답: common.py `_kosis()` (y, code, name, yield, area; code 2자리=시도, '00'=전국, 1980~2025). 평년 = 직전 5년 올림픽 평균.
- 출력: 자기 폴더에 pred_sido_{asof}.csv (y, sc, pred_yield; sc ∈ 00,31..38, 2010~2026 가능한 해), README.md(방법·사전등록·결과표), results.json. 2026 예측 포함.
- 평가: 전국 MAE·RMSE, 8도 면적가중 RMSE, 2013~2025와 2010~2025 둘 다, 통계청과 같은 해만 비교. 2020·2024 오차 따로.
- 시스템: 메모리 15GB 공유 PC. 무거운 python은 `memcap -m 3G python3 ...`, `OMP_NUM_THREADS=2`. 한 번에 하나. 네트워크 수집은 꼭 필요할 때만, 키는 /home/eins/project/rStat/.env (출력·로그에 키 찍지 말 것).
- scripts/, data/, assets/, *.html, git 은 건드리지 말 것. 다른 갈래 폴더는 읽기만.

## 쓸 수 있는 것 (모두 research/rice/ 아래, RESULTS.md·SUMMARY.md가 전체 기록)
- 기상: cropmodel/wx_sigun.pkl (시군 논 중심 일기상 1980~2026-11: tavg,tmax,tmin,rs,ss,rn,gust,wavg,hm), cropmodel/build_weather.py, common.asos()/stations(). 2026은 wx2026/.
- 작물생리 성분: cropmodel/components_sido_fixed.csv (as-of별 시도 성분), components_sigun_fixed.csv.gz, model.py(M.anomalies/backtest/to_sigun), run_final.py. contrib_sido_{0815,0915,1001}.csv에 시도 실시간 â.
- 출수 기준 기상 특징: pheno/wx_feats.csv, 생육단계 pheno/pheno_feats.csv.
- 통계청 9/15 조사 전 정보 없음. KREI 쌀 관측(9월 하순 전망 등): grep -ri krei RESULTS.md 로 위치 확인.
- 태풍: typhoon/ (JMA 진로→시군 풍속), statfix/features.py (gust_fill 등).
- 농진청 벼 작황 성적(작황시험포 17개소, 1988~2019, 회차별 생육·수량 구성): crpst/data/y{year}_getExprTmrd_0{1..9}List_v2.json, crpst/data/codes.json. 2020~는 없음 → 실시간 운영엔 못 씀, 과거 관계 연구용.
- 이미 안 된 것(반복 금지): 위성 전반(MODIS VI·생육단계·LST·LSWI, S2/S1), 도열병 지수, 기능형 곡선 PLS, 부분 풀링(도별 계수), 면적 구성 효과, 시군 잔차 지수평활.
