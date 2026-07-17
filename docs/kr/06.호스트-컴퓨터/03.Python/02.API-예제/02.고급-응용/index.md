# 고급 응용

## servo_move 추적 모션

`servo_move()`는 포인트 그룹을 수신하여 timeStamp에 따라 평활 처리한 후 서보로 전송하여 추적 모션을 수행합니다.

### ServoMovePara 매개변수 설명

| 매개변수 | 유형 | 설명 |
|------|------|------|
| robotNum | int | 제어할 로봇 번호 지정 |
| clearBuffer | bool | 이전에 전송했으나 보간 계산이 시작되지 않은 포인트를 삭제할지 여부 |
| targetMode | int | 0-독립 포인트; 1-연속 궤적 |
| sendMode | int | 0-전체 궤적을 한 번에 전송; 1-일부 포인트를 한 번에 전송 |
| runMode | int | 0-수신 완료 후 모션; 1-수신하면서 모션 |
| sum | int | 총 전송 횟수 |
| count | int | 현재 전송 순번 |
| coord | int | 0-관절 좌표계; 1-직교 좌표계 |
| size | int | 이번 전송의 포인트 수 |
| pos | vector&lt;vector&lt;double>> | 2차원 배열, 1차원은 포인트 수, 2차원은 7개 관절 각도 또는 Cartesian 좌표 |
| axisvel | vector&lt;vector&lt;double>> | 각 축의 속도 |
| axisacc | vector&lt;vector&lt;double>> | 각 축의 가속도 |
| timeStamp | vector&lt;double> | 해당 포인트에 도달하는 시간 (ms 단위) |

### 사용 전제

실행 모드에서는 컨트롤러에서 **외부 포인트 명령**이 포함된 작업 파일을 실행해야 합니다(외부 포인트 명령이 servo_move로 전송된 데이터를 수신).

### 예시: 연속 궤적 한 번에 전송

```py
def test_7000(socketFd):
    print('7000 테스트 시작.....')
    socket_7000 = aa.connect_robot("192.168.1.13", "7000")
    servomovepara = aa.ServoMovePara()
    pos = aa.VectorVectorDouble()
    time = aa.VectorDouble()

    time_pos = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550]
    for value in time_pos:
        time.append(value)

    axis_pos = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 2, 0],
        [0, 0, 0, 0, 0, 3, 0],
        [0, 0, 0, 0, 0, 4, 0],
        [0, 0, 0, 0, 0, 5, 0],
        [0, 0, 0, 0, 0, 6, 0],
        [0, 0, 0, 0, 0, 7, 0],
        [0, 0, 0, 0, 0, 8, 0],
        [0, 0, 0, 0, 0, 9, 0],
        [0, 0, 0, 0, 0, 10, 0],
    ]
    for value in axis_pos:
        pos.append(value)

    for k in range(11):
        servomovepara.pos = pos
    for j in range(11):
        servomovepara.timeStamp = time

    servomovepara.runMode = 0
    servomovepara.clearBuffer = True
    servomovepara.targetMode = 1
    servomovepara.coord = 0
    servomovepara.size = 11

    result = aa.servo_move(socket_7000, servomovepara)
    print("return ", result)
```
