"""사후 변형 (relmodel 결과를 본 뒤, 11-09) — P8 주변 4개. 채택 근거로 쓰지 않고 견고성 확인용."""
import json
import os
import sys

import numpy as np
import pandas as pd

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import relmodel as R  # noqa: E402

out = {}
for asof in ["0915", "1001"]:
    V = pd.read_pickle(os.path.join(R.HERE, f"work/rel_{asof}.pkl"))["V"]
    H = {}
    H["H1_P8+RE"] = R.add_re(V["P8"])
    H["H2_stack_P0_P8"] = R.stack(V["P0"], V["P8"])
    # H3: crpst + KOSIS 행을 함께 학습
    orig = R.train_rows

    def both(Y, feats, target="kosis"):
        a = orig(Y, feats, "kosis")
        b = orig(Y, feats, "crpst")
        return tuple(np.concatenate([u, v]) for u, v in zip(a, b))
    R.train_rows = both
    H["H3_pooled_targets"] = R.scale_k(R.rel_ridge(asof, R.SMALL))
    R.train_rows = orig
    m = V["P8"].merge(V["P4s"][["y", "sc", "dhat"]].rename(columns={"dhat": "d2"}), on=["y", "sc"])
    H["H4_avg_P8_P4s"] = m.assign(dhat=(m.dhat + m.d2) / 2)[["y", "sc", "dhat"]]
    for k, o in H.items():
        pr, _ = R.assemble(o, asof)
        r = {"13_25": R.score(pr, R.Y13), "10_25": R.score(pr, R.Y10), "96_09": R.score(pr, R.Y96),
             "13_19": R.score(pr, list(range(2013, 2020))), "20_25": R.score(pr, list(range(2020, 2026)))}
        out[f"{asof}|{k}"] = r
        print(f"{asof} {k:18s} 8도w 13-25 {r['13_25']['prov_rmse_w']:6.2f} (고유 {r['13_25']['prov_spec']:5.2f}) | 10-25 {r['10_25']['prov_rmse_w']:6.2f} | 96-09 고유 {r['96_09']['prov_spec']:5.2f} | 13-19 {r['13_19']['prov_rmse_w']} 20-25 {r['20_25']['prov_rmse_w']}", flush=True)
json.dump(out, open(os.path.join(R.HERE, "results_posthoc.json"), "w"), ensure_ascii=False, indent=1)
