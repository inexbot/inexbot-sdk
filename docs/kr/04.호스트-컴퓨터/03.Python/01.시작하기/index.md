# 입문 튜토리얼

이 튜토리얼에서는 처음부터 Python 프로젝트 환경을 구축하고, 컨트롤러에 연결한 후 기본 운동 명령을 실행합니다.

## 사전 조건

Python 3.x가 설치되어 있고 SDK 버전이 Python 버전과 일치해야 합니다.

## 빠른 시작

### 1. SDK 파일 준비

리소스 다운로드 페이지에서 Python 버전 SDK를 가져와 압축을 해제하면 다음 두 파일을 얻습니다.

- `_nrc_host.so` — Python 호출 인터페이스의 동적 라이브러리
- `nrc_interface.py` — Python 인터페이스 래퍼 모듈

이 두 파일을 프로젝트 디렉터리에 넣습니다.

### 2. 컨트롤러 연결

```py
# -*- coding: UTF-8 -*-
import nrc_interface
import time

socketFd = nrc_interface.connect_robot("192.168.1.16", "6001")
print(socketFd)

if socketFd <= 0:
    import sys
    sys.exit(1)

pos = nrc_interface.VectorDouble(7)
nrc_interface.get_current_position(socketFd, 0, pos)
position = [pos[0], pos[1], pos[2], pos[3], pos[4], pos[5], pos[6]]
pos[0] = pos[0] - 1

nrc_interface.queue_motion_set_status(socketFd, True)
moveCmd = nrc_interface.MoveCmd()
moveCmd.coord = 0
moveCmd.targetPosType = nrc_interface.PosType_data
moveCmd.targetPosValue = pos
moveCmd.velocity = 20
moveCmd.acc = 20
moveCmd.dec = 20
moveCmd.pl = 5
nrc_interface.queue_motion_push_back_moveJ(socketFd, moveCmd)
nrc_interface.queue_motion_send_to_controller(socketFd, 1)
print(position)
```

### 3. 다음 단계

- **인터페이스 예시 / 기본 애플리케이션** — 연결, 메시지 콜백
- **인터페이스 예시 / 고급 애플리케이션** — servo_move 추적 운동
