# 레이저 커팅 공정

## IO 포트 설정

### 0x4401 LASER_IOPORT_SET - IO 포트 설정

**설명**: 레이저 커팅 공정의 IO 포트 설정을 구성합니다

#### 요청 파라미터

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| DO_backMiddle | int | 복귀 |
| DO_liftUp | int | 인상 |
| DO_follow | int | 팔로잉 |
| DO_lightGate | int | 라이트 게이트 |
| DO_aspiration | int | 가스 분사 |
| DOFeedCoolGas | int | 냉각 가스 |
| DOCleanNozzle | int | 노즐 청소 |
| DI_liftUpArrival | int | 정지 위치 도달 |
| DI_backMiddleArrival | int | 복귀 위치 도달 |
| DI_followArrival | int | 팔로잉 위치 도달 |
| DI_perforateArrival | int | 천공 위치 도달 |
| DI_laserFault | int | 레이저 고장 |
| DI_regulatorFault | int | 하이트 컨트롤러 고장 |
| DI_watercoolerFault | int | 수냉기 고장 |
| DI_pressureFault | int | 공압 고장 |
| AO_pressure | int | 공압 |
| AO_laserPower | int | 레이저 출력 |

#### 요청 예시

```json
{
  "IO": {
    "DO_backMiddle": 0,
    "DO_liftUp": 0,
    "DO_follow": 0,
    "DO_lightGate": 0,
    "DO_aspiration": 0,
    "DOFeedCoolGas": 0,
    "DOCleanNozzle": 0,
    "DI_liftUpArrival": 0,
    "DI_backMiddleArrival": 0,
    "DI_followArrival": 0,
    "DI_perforateArrival": 0,
    "DI_laserFault": 0,
    "DI_regulatorFault": 0,
    "DI_watercoolerFault": 0,
    "DI_pressureFault": 0,
    "AO_pressure": 0,
    "AO_laserPower": 0
  }
}
```

### 0x4402 LASER_IOPORT_INQUIRE - IO 포트 조회

**설명**: 현재 IO 포트 설정을 조회합니다

- data: 없음

### 0x4403 LASER_IOPORT_RESPOND - IO 포트 응답

**설명**: 컨트롤러가 IO 포트 조회 결과를 반환합니다

- 반환 형식: 0x4401과 동일

---

## 전역 파라미터 설정

### 0x4404 LASER_EQUIPMENT_SET - 전역 파라미터 설정

**설명**: 레이저 커팅 공정의 전역 파라미터를 설정합니다

#### equipment 파라미터

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| arrivalOutLightMode | int | 위치 도달 출광 모드: 0-위치 도달 출광 모드, 1-직접 출광 모드 |
| preAspiratedTime | double | 사전 가스 공급 시간 |
| waitLiftUpTime | double | 인상 대기 시간 |
| waitFollowTime | double | 팔로잉 대기 시간 |
| RetreatDistance | double | 후퇴 거리 |
| delAspiratedMode | int | 가스 차단 모드: 0-지연 후 가스 차단, 1-사전 가스 차단 |
| delAspiratedTime | double | 가스 차단 시간 |

#### perforate 파라미터

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| time | double | 천공 시간 |
| pressure | double | 천공 공압 |
| power | int | 천공 출력 |
| freq | int | 천공 주파수 |
| dutyRatio | int | 천공 듀티비 |

#### 요청 예시

```json
{
  "equipment": {
    "arrivalOutLightMode": 0,
    "preAspiratedTime": 0,
    "waitLiftUpTime": 0,
    "waitFollowTime": 0,
    "RetreatDistance": 0,
    "delAspiratedMode": 0,
    "delAspiratedTime": 0
  },
  "perforate": {
    "time": 0,
    "pressure": 0,
    "power": 0,
    "freq": 0,
    "dutyRatio": 0
  }
}
```

### 0x4405 LASER_EQUIPMENT_INQUIRE - 전역 파라미터 조회

**설명**: 현재 전역 파라미터 설정을 조회합니다

- data: 없음

### 0x4406 LASER_EQUIPMENT_RESPOND - 전역 파라미터 응답

**설명**: 컨트롤러가 전역 파라미터 조회 결과를 반환합니다

- 반환 형식: 0x4404와 동일

---

## 아날로그 매칭 설정

### 0x4407 LASER_ANALOGMATCH_SET - 아날로그 매칭 설정

**설명**: 레이저 출력과 공압의 아날로그 매칭 파라미터를 설정합니다

#### laserPower 파라미터

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| x1 | double | x축 1번째 파라미터 |
| x2 | double | x축 2번째 파라미터 |
| y1 | double | y축 1번째 파라미터 |
| y2 | double | y축 2번째 파라미터 |

#### pressure 파라미터

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| x1 | double | x축 1번째 파라미터 |
| x2 | double | x축 2번째 파라미터 |
| y1 | double | y축 1번째 파라미터 |
| y2 | double | y축 2번째 파라미터 |

#### 요청 예시

```json
{
  "analogMatch": {
    "laserPower": {
      "x1": 0,
      "x2": 0,
      "y1": 0,
      "y2": 0
    },
    "pressure": {
      "x1": 0,
      "x2": 0,
      "y1": 0,
      "y2": 0
    }
  }
}
```

### 0x4408 LASER_ANALOGMATCH_INQUIRE - 아날로그 매칭 조회

**설명**: 현재 아날로그 매칭 설정을 조회합니다

- data: 없음

### 0x4409 LASER_ANALOGMATCH_RESPOND - 아날로그 매칭 응답

**설명**: 컨트롤러가 아날로그 매칭 조회 결과를 반환합니다

#### IO 파라미터

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| laserPower | int | 레이저 출력 포트 번호 |
| pressure | int | 공압 포트 번호 |

#### analogMatch 파라미터

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| laserPower | object | 레이저 출력 매칭 파라미터 (x1, x2, y1, y2) |
| pressure | object | 공압 매칭 파라미터 (x1, x2, y1, y2) |

#### 응답 예시

```json
{
  "IO": {
    "laserPower": 0,
    "pressure": 0
  },
  "analogMatch": {
    "laserPower": {
      "x1": 0,
      "x2": 0,
      "y1": 0,
      "y2": 0
    },
    "pressure": {
      "x1": 0,
      "x2": 0,
      "y1": 0,
      "y2": 0
    }
  }
}
```

---

## 커팅 파라미터 설정

### 0x440A LASER_CUTPARM_SET - 커팅 파라미터 설정

**설명**: 커팅 공정 파라미터를 설정합니다

#### 요청 파라미터

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| num | int | 공정 번호 |
| cut.pressure | double | 공압 |
| cut.power | int | 출력 |
| cut.freq | int | 주파수 |
| cut.dutyRatio | int | 듀티비 |

#### 요청 예시

```json
{
  "num": 1,
  "cut": {
    "pressure": 0,
    "power": 0,
    "freq": 0,
    "dutyRatio": 0
  }
}
```

### 0x440B LASER_CUTPARM_INQUIRE - 커팅 파라미터 조회

**설명**: 지정된 공정 번호의 커팅 파라미터를 조회합니다

#### 요청 파라미터

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| num | int | 공정 번호 |

#### 요청 예시

```json
{
  "num": 1
}
```

### 0x440C LASER_CUTPARM_RESPOND - 커팅 파라미터 응답

**설명**: 컨트롤러가 커팅 파라미터 조회 결과를 반환합니다

- 반환 형식: 0x440A와 동일

---

## 상태 조회

### 0x440E LASER_STATE_INQUIRE - 상태 조회

**설명**: 레이저 커팅 공정의 현재 상태를 조회합니다

- data: 없음

### 0x440F LASER_STATE_RESPOND - 상태 응답

**설명**: 컨트롤러가 레이저 커팅 공정의 현재 상태를 반환합니다

#### 응답 파라미터

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| liftUpArrival | bool | 정지 위치 도달 |
| backMiddleArrival | bool | 복귀 위치 도달 |
| followArrival | bool | 팔로잉 위치 도달 |
| perforateArrival | bool | 천공 위치 도달 |
| lightGateEnable | bool | 라이트 게이트 활성화 |
| laserFault | bool | 레이저 고장 |
| regulatorFault | bool | 하이트 컨트롤러 고장 |
| watercoolerFault | bool | 수냉기 고장 |
| pressureFault | bool | 공압 고장 |
| currentPressure | double | 현재 공압 |
| currentPower | int | 현재 출력 |
| currentFreq | int | 현재 주파수 |
| currentDutyRatio | int | 현재 듀티비 |

#### 응답 예시

```json
{
  "liftUpArrival": false,
  "backMiddleArrival": false,
  "followArrival": false,
  "perforateArrival": false,
  "lightGateEnable": false,
  "laserFault": false,
  "regulatorFault": false,
  "watercoolerFault": false,
  "pressureFault": false,
  "currentPressure": 0,
  "currentPower": 0,
  "currentFreq": 0,
  "currentDutyRatio": 0
}
```

---

## 샷 파라미터 설정

### 0x4410 LASER_SHOTPARM_SET - 샷 파라미터 설정

**설명**: 샷 파라미터를 설정합니다

#### 요청 파라미터

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| shotPower | int | 샷 출력 |
| shotTime | double | 샷 시간, 값 범위는 0-1 |

#### 요청 예시

```json
{
  "shotPower": 0,
  "shotTime": 0.1
}
```

---

## 수동 조작

### 0x4411 LASER_HANDOP_SET - 수동 조작 설정

**설명**: 수동 조작을 실행합니다

#### 요청 파라미터

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| type | int | 수동 조작 타입: 1-라이트 게이트 스위치, 2-샷, 3-가스 감지, 4-인상, 5-복귀, 6-팔로잉 |
| value | int | 1은 켜기, 0은 끄기 (샷의 경우 1만 가능) |

#### 요청 예시

```json
{
  "type": 1,
  "value": 1
}
```

### 0x4412 LASER_HANDOP_INQUIRE - 수동 조작 상태 조회

**설명**: 수동 조작의 현재 상태를 조회합니다

- data: 없음

### 0x4413 LASER_HANDOP_RESPOND - 수동 조작 상태 응답

**설명**: 컨트롤러가 수동 조작의 현재 상태를 반환합니다

#### 응답 파라미터

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| lightGate | int | 라이트 게이트 |
| shotPower | int | 샷 출력 |
| shotTime | double | 샷 시간 |
| aspiration | int | 가스 감지 |
| liftUp | int | 인상 |
| backMiddle | int | 복귀 |
| follow | int | 팔로잉 |

#### 응답 예시

```json
{
  "lightGate": 0,
  "shotPower": 0,
  "shotTime": 0.1,
  "aspiration": 0,
  "liftUp": 0,
  "backMiddle": 0,
  "follow": 0
}
```

---

## 아날로그 매칭 전송

### 0x4417 LASER_FACTCURVOL_SET - 아날로그 전송 설정

**설명**: 아날로그 매칭 값을 전송합니다

#### 요청 파라미터

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| type | int | 전송 번호: 1-1번째 전송, 2-2번째 전송, 3-3번째 전송, 4-4번째 전송 |
| value | double | 전송 값, 범위 0-10 |

#### 요청 예시

```json
{
  "type": 1,
  "value": 5.5
}
```

### 0x4419 LASER_FACTCURVOL_RESPOND - 아날로그 전송 응답

**설명**: 컨트롤러가 아날로그 전송 설정 결과를 반환합니다

#### 응답 파라미터

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| result | int | 1-설정 성공, 0-설정 실패 |

#### 응답 예시

```json
{
  "result": 1
}
```

---

## 노즐 청소

### 0x4423 LASER_CUT_NOZZLE_CLEAN - 노즐 청소

**설명**: 노즐 청소 기능을 제어합니다

#### 요청 파라미터

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| cleanNozzleTime | int | 청소 시간 (ms), 0보다 큰 값을 전송하면 켜지고 설정된 초 후에 자동으로 꺼집니다 |

#### 요청 예시

```json
{
  "cleanNozzleTime": 0
}
```

---

## 냉각 가스 제어

### 0x4422 LASER_CUT_FEED_COOL_GAS - 냉각 가스 제어

**설명**: 냉각 가스 스위치를 제어합니다

#### 요청 파라미터

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| feedCoolGas | int | 1-켜기, 0-끄기 |

#### 요청 예시

```json
{
  "feedCoolGas": 0
}
```