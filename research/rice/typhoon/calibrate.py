"""바람장 보정: ASOS 일 최대순간풍속(ws_ins) vs 모델 일 최대풍속, 태풍 영향일만 (수량 자료는 보지 않음).

표본: 1990~2025, 7/1~10/31, 모델 풍속 ≥ 8 m/s 이고 태풍 중심이 400 km 이내였던 관측소-일.
보정식: ws_ins ≈ a·V_model (원점 통과, 최소제곱) → 피처의 V_g = a·V_model (순간풍속 상당, m/s).
"""
import json
import os
import sys

import numpy as np
import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [os.path.dirname(HERE), HERE]
import common as C  # noqa: E402
import windfield as W  # noqa: E402

h = W.load_tracks(1988, 2025)
h.to_pickle(os.path.join(HERE, "data/tracks_hourly.pkl"))
st = C.stations()[["stn", "lat", "lon"]]
dm = W.daily_max(h, st, max_km=800)
dm["stn"] = st.stn.values[dm.i]
dm["date"] = dm.date.dt.strftime("%Y%m%d").astype(int)
a = C.asos(["date", "stn", "ws_ins"])
d = dm.merge(a, on=["date", "stn"], how="inner").dropna(subset=["ws_ins"])
d = d[(d.date // 10000 >= 1990)]
s = d[(d.v >= 8) & (d.r <= 400)]
aa = float((s.v * s.ws_ins).sum() / (s.v ** 2).sum())
r = float(np.corrcoef(s.v, s.ws_ins)[0, 1])
lin = np.polyfit(s.v, s.ws_ins, 1)
res = {"n": int(len(s)), "a": round(aa, 3), "r": round(r, 3), "lin_slope": round(float(lin[0]), 3), "lin_icpt": round(float(lin[1]), 2),
       "rmse": round(float(np.sqrt(((aa * s.v - s.ws_ins) ** 2).mean())), 2)}
s = s.assign(dec=(s.date // 100000) * 10)
res["by_decade"] = {int(k): {"n": int(len(g)), "r": round(float(np.corrcoef(g.v, g.ws_ins)[0, 1]), 3),
                             "ratio": round(float((g.v * g.ws_ins).sum() / (g.v ** 2).sum()), 3)} for k, g in s.groupby("dec")}
# 구간별 평균 (모델 풍속 bin → 관측 평균)
s["bin"] = pd.cut(s.v, [8, 12, 16, 20, 25, 30, 40, 60])
res["bins"] = {str(k): [int(len(g)), round(float(g.ws_ins.mean()), 1), round(float(aa * g.v.mean()), 1)] for k, g in s.groupby("bin", observed=True)}
# 주요 태풍 점검: 관측 최대 vs 보정 모델 최대 (관측소 전체)
chk = {}
for sid, g in d[d.v > 0].groupby("sid"):
    nm = h[h.sid == sid].name.iloc[0]
    if nm in ("MAEMI", "RUSA", "BOLAVEN", "SANBA", "LINGLING", "MAYSAK", "HAISHEN", "BAVI", "TAPAH", "MITAG", "HINNAMNOR", "KOMPASU", "SOULIK"):
        chk[f"{nm}_{sid}"] = {"obs_max": float(g.ws_ins.max()), "model_max": round(aa * float(g.v.max()), 1),
                             "r_stations": round(float(np.corrcoef(g.groupby('stn').v.max(), g.groupby('stn').ws_ins.max())[0, 1]), 2)}
res["storms"] = chk
print(json.dumps(res, ensure_ascii=False, indent=1))
json.dump(res, open(os.path.join(HERE, "calib.json"), "w"), ensure_ascii=False, indent=1)
