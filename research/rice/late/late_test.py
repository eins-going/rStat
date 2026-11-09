"""10/8 이후 기상(10/9~10/31, ~11/10)으로 10월 8일 예측(1010)의 전국 오차를 실시간으로 더 줄일 수 있나."""
import sys; R='/home/eins/project/rStat/research/rice'; sys.path.insert(0,R)
import numpy as np, pandas as pd, common as c
st=c.stations(); st=st[(st.seen_first<=1995)&(st.seen_last>=2025)&(st.ht<400)]
cen=c.paddy_centroids().dropna(subset=["sc"])
lat0=np.radians(36); dx=(cen.lon.values[:,None]-st.lon.values[None])*np.cos(lat0); dy=cen.lat.values[:,None]-st.lat.values[None]
cen["stn"]=st.stn.values[np.argmin(dx**2+dy**2,axis=1)]
W=cen.groupby("stn").paddy_ha.sum()
a=c.asos(["date","stn","ta_avg","ws_ins","ss_day","rn_day"]); a=a[a.stn.isin(W.index)]
a["y"]=a.date//10000; md=a.date%10000; a["rn_day"]=a.rn_day.fillna(0)
rows={}
for wn,(d0,d1) in {"oct":(1009,1031),"nov":(1009,1110)}.items():
    x=a[(md>=d0)&(md<=d1)&(a.y>=1995)]; g=x.groupby(["stn","y"])
    f=pd.DataFrame({f"gust_{wn}":g.ws_ins.apply(lambda v:(v>=15).sum()), f"rd_{wn}":g.rn_day.apply(lambda v:(v>=1).sum()),
                    f"hr_{wn}":g.rn_day.apply(lambda v:(v>=20).sum()), f"rn_{wn}":g.rn_day.sum(), f"ss_{wn}":g.ss_day.mean(), f"t_{wn}":g.ta_avg.mean()}).reset_index()
    f["w"]=f.stn.map(W); cols=[c_ for c_ in f.columns if "_" in c_]
    rows[wn]=f.groupby("y").apply(lambda d: pd.Series(np.average(d[cols].fillna(d[cols].mean()),weights=d.w,axis=0),index=cols))
X=pd.concat(rows.values(),axis=1).sort_index()
X=X-X.shift(1).rolling(15,min_periods=10).mean()   # 이전 15년 평균 대비
fc=pd.read_csv('/home/eins/project/rStat/db/clean/rice/rice_forecast.csv',dtype={'sc':str,'asof':str})
n=fc[(fc['asof']=='1010')&(fc.level=='nation')].set_index('y')['yield']
obs=c.nation().set_index('y')['yield']
D=pd.DataFrame({"p":n,"obs":obs}).dropna(); D["e"]=D.obs/D.p-1; D=D.join(X)
print(D[["p","obs","e","gust_oct","rd_oct","hr_oct","ss_oct"]].round(3).to_string())
base=(D.obs-D.p).abs()
print("1010 그대로 MAE", round(base.mean(),2), "RMSE", round(np.sqrt(((D.obs-D.p)**2).mean()),2))
for f in [c_ for c_ in X.columns]:
    pr={}
    for y in D.index:
        tr=D[(D.index<y)].dropna(subset=[f,"e"])
        if len(tr)<5 or pd.isna(D.loc[y,f]): pr[y]=0.0; continue
        b=np.polyfit(tr[f],tr.e,1); pr[y]=b[0]*D.loc[y,f]+b[1]
    adj=D.p*(1+pd.Series(pr)); e=adj-D.obs
    r=np.corrcoef(D.dropna(subset=[f])[f],D.dropna(subset=[f]).e)[0,1]
    print(f"{f:10s} r(전체,사후) {r:+.2f} | 실시간 보정 MAE {e.abs().mean():.2f} RMSE {np.sqrt((e**2).mean()):.2f}")
