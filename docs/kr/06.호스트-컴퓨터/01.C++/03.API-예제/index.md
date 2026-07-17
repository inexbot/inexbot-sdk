# API 예제

C++ SDK 사용 예제로, 기본 응용과 고급 응용으로 나뉩니다.

## 기본 응용

순서대로 읽는 것을 권장하며, 초보자는 첫 번째 예제부터 시작하세요:

| # | 예제 | 설명 |
|---|------|------|
| 1 | 다양한 좌표계의 위치 가져오기 | connect_robot + get_current_position |
| 2 | 스무딩 없는 단일 포인트 모션 | robot_movej, 티치 모드에서 단일 축 이동 |
| 3 | 스무딩 연속 궤적 모션 | queue_motion 시리즈, 큐로 여러 명령 전송 |
| 4 | 티치 모드 유형 전환 및 궤적 재생 | 드래그 티치, 궤적 기록 및 재생 |
| 5 | 도구 캘리브레이션 | 7점, 20점 도구 캘리브레이션 과정 |
| 6 | 모션 큐의 곡선 모션 | MOVS 곡선 보간 |

## 고급 응용

| 예제 | 설명 |
|------|------|
| servoJ 관절 제어 | open_servoJ / set_servoJ_pos / stop_servoJ |
| servo_move 추적 모션 | 연속 궤적 스무딩 전송 |
| 서보 포인트 위치 제어 | servo_point_position_motion_control |
