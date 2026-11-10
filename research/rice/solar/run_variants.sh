#!/bin/bash
cd /home/eins/project/rStat/research/rice/cropmodel
PY=/home/eins/project/rStat/.venv/bin/python
for v in A P1 P2 P3; do
  f=wx_sigun_$v.pkl; [ $v = A ] && f=wx_sigun.pkl
  echo "== $v $(date +%T)"
  OMP_NUM_THREADS=2 WX_FILE=$f WX_VARIANT_SUFFIX=_$v memcap -m 3G $PY -I components.py > ../solar/comp_$v.log 2>&1 || { echo "components 실패 $v"; continue; }
  OMP_NUM_THREADS=2 WX_VARIANT_SUFFIX=_$v memcap -m 3G $PY -I run_final.py > ../solar/final_$v.log 2>&1 || echo "run_final 실패 $v"
  grep "^M4_sink-source|" ../solar/final_$v.log
done
echo 끝 $(date +%T)
