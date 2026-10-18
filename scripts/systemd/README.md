# 자료 수집 타이머 (이 PC 전용)

`scripts/update.py run`을 매일 07:30에 돌리는 systemd 사용자 타이머. PC가 꺼져 있던 날은 켜진 뒤 한 번 따라잡는다(Persistent).

설치·확인·끄기:

    mkdir -p ~/.config/systemd/user
    cp scripts/systemd/rstat-update.* ~/.config/systemd/user/
    systemctl --user daemon-reload
    systemctl --user enable --now rstat-update.timer
    systemctl --user list-timers rstat-update.timer      # 다음 실행 시각
    journalctl --user -u rstat-update.service -n 50      # 마지막 실행 출력
    systemctl --user disable --now rstat-update.timer    # 끄기

로그아웃 상태에서도 돌도록 linger가 켜져 있어야 한다(`loginctl enable-linger $USER`, 지금 켜져 있음).
