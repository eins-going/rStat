"""연도별 전 회차 내려받기 → data/y{year}_{op}.json"""
import requests, json, os, time
k=[l.split('=',1)[1].strip().strip('"\'') for l in open('/home/eins/project/rStat/.env') if l.startswith('DATA_PORTAL_API_KEY=')][0]
B='https://apis.data.go.kr/1390803/RcepntCrpstScoreInfoService_v2/'
ops=['getCtvtMthList_v2']+[f'getExprTmrd_0{i}List_v2' for i in range(1,10)]
def get(op,y):
    items=[];p=1
    while True:
        for t in range(4):
            try: j=requests.get(B+op,params={'serviceKey':k,'pageNo':p,'numOfRows':1000,'srchExprYear':y},timeout=60).json(); break
            except Exception as e: time.sleep(3)
        b=j['body']; it=b.get('items') or []
        items+=it
        if len(items)>=b['totalCount'] or not it: return items
        p+=1; time.sleep(0.3)
for y in range(1960,2020):
    n=[]
    for op in ops:
        fn=f'data/y{y}_{op}.json'
        if os.path.exists(fn): n.append(len(json.load(open(fn)))); continue
        it=get(op,y); json.dump(it,open(fn,'w'),ensure_ascii=False); n.append(len(it)); time.sleep(0.3)
        if op==ops[0] and not it: break
    print(y,n,flush=True)
