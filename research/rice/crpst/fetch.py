"""벼 작황 성적 정보 서비스(data.go.kr 15064971) 전 회차 내려받기 → data/*.json"""
import requests, json, os, time
k=[l.split('=',1)[1].strip().strip('"\'') for l in open('/home/eins/project/rStat/.env') if l.startswith('DATA_PORTAL_API_KEY=')][0]
B='https://apis.data.go.kr/1390803/RcepntCrpstScoreInfoService_v2/'
os.makedirs('data',exist_ok=True)
r=requests.get(B+'getCodeList_v2',params={'serviceKey':k},timeout=60); json.dump(r.json(),open('data/codes.json','w'),ensure_ascii=False)
ops=['getCtvtMthList_v2']+[f'getExprTmrd_0{i}List_v2' for i in range(1,10)]
for op in ops:
    items=[];p=1
    while True:
        j=requests.get(B+op,params={'serviceKey':k,'pageNo':p,'numOfRows':1000},timeout=60).json()
        b=j['body']; it=b.get('items') or []
        if isinstance(it,dict): it=it.get('item',[it])
        items+=it
        if len(items)>=b['totalCount'] or not it: break
        p+=1; time.sleep(0.3)
    json.dump(items,open(f'data/{op}.json','w'),ensure_ascii=False)
    ys=sorted({x.get('exprYear') for x in items})
    print(op,len(items),ys[:3],'…',ys[-3:],len(ys),'years')
    time.sleep(0.3)
