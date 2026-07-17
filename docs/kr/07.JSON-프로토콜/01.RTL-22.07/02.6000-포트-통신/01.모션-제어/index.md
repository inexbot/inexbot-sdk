# 1. 모션 제어

---

## 목차

- [로봇 모션](#로봇-모션)
- [로봇 설정](#로봇-설정)
- [외부축 모션](#외부축-모션)
- [외부축 설정](#외부축-설정)
- [역학 기능](#역학-기능)
- [큐 모드 모션 통신](#큐-모드-모션-통신)
- [캘리브레이션](#캘리브레이션)
- [3D 마우스 제어](#3d-마우스-제어)

---

## 로봇 모션

### 로봇 동작 상태의 조회 및 응답

#### 티치 펜던트가 로봇의 동작 상태를 조회

**명령 코드:** `0x2304`

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 로봇 선택, 값 범위 [1, 4] |
| jobfilename | string | 예 | 작업 파일명 (확장자 제외) |
| suffix | string | 예 | 파일 확장자: .JBR 메인 프로그램 / .JBP 백그라운드 로컬 프로그램 / .JBPG 백그라운드 글로벌 프로그램 |

**요청 예시:**

```json
{
  "robot": 1,
  "jobfilename": "AAA",
  "suffix": ".JBR"
}
```

#### 컨트롤러가 로봇 동작 상태를 응답

**명령 코드:** `0x9103`

**응답 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| robot | int | 로봇 번호, 값 범위 [1, 4] |
| status | int | 동작 상태: 0-정지, 1-일시정지, 2-실행 |
| continueRun | int | 브레이크포인트 실행 존재 여부: 0/1 |
| currentRun | bool | 현재 라인 실행 존재 여부: false/true |
| mainProgramRun | int | 메인 프로그램 실행 여부: 0/1 |

**응답 예시:**

```json
{
  "robot": 1,
  "status": 0,
  "continueRun": 0,
  "currentRun": false,
  "mainProgramRun": 0
}
```

---

### 로봇 모션 제어

#### 로봇 관절 모션 MOVJ

**명령 코드:** `0x4501`

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 로봇 선택, 값 범위 [1, 4] |
| vel | int | 예 | 속도 비율, 값 범위 [1, 100] |
| coord | int | 예 | 좌표계: 0-관절 좌표, 1-직각 좌표, 2-사용자 좌표, 3-도구 좌표 |
| pos | double[7] | 예 | 목표 위치, 앞 7자리는 로봇 본체 목표 위치, 뒤 5자리는 외부축 목표 위치 |

**요청 예시:**

```json
{
  "robot": 1,
  "vel": 5,
  "coord": 0,
  "pos": [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7]
}
```

#### 로봇 직선 모션 MOVL

**명령 코드:** `0x4502`

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 로봇 선택, 값 범위 [1, 4] |
| vel | int | 예 | 속도 mm/s, 값 범위 [1, 1000] |
| coord | int | 예 | 좌표계: 0-관절 좌표, 1-직각 좌표, 2-사용자 좌표, 3-도구 좌표 |
| pos | double[7] | 예 | 목표 위치, 앞 7자리는 로봇 본체 목표 위치, 뒤 5자리는 외부축 목표 위치 |

**요청 예시:**

```json
{
  "robot": 1,
  "vel": 5,
  "coord": 0,
  "pos": [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7]
}
```

#### 로봇 원호 모션 MOVC

**명령 코드:** `0x4503`

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 로봇 선택, 값 범위 [1, 4] |
| vel | int | 예 | 속도 mm/s, 값 범위 [1, 1000] |
| coord | int | 예 | 좌표계: 0-관절 좌표, 1-직각 좌표, 2-사용자 좌표, 3-도구 좌표 |
| isFull | bool | 예 | false-MOVC, true-MOVCA |
| posOne | double[7] | 예 | 원호 시작점, 로봇 본체 포인트 |
| posTwo | double[7] | 예 | 원호의 중간 경유점, 로봇 본체 포인트 |
| posThree | double[7] | 예 | 원호의 목표점, 로봇 본체 포인트 |

**요청 예시:**

```json
{
  "robot": 1,
  "vel": 5,
  "coord": 0,
  "isFull": false,
  "posOne": [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7],
  "posTwo": [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7],
  "posThree": [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7]
}
```

#### 로봇 스플라인 곡선 모션 MOVS

**명령 코드:** `0x4504`

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 로봇 선택, 값 범위 [1, 4] |
| vel | int | 예 | 속도 mm/s, 값 범위 [1, 1000] |
| coord | int | 예 | 좌표계: 0-관절 좌표, 1-직각 좌표, 2-사용자 좌표, 3-도구 좌표 |
| size | int | 예 | 스플라인 곡선의 포인트 수, 최소 4개 포인트 필요 |
| pos | double[][7] | 예 | 스플라인 곡선의 궤적 포인트, 2차원 배열 |

**요청 예시:**

```json
{
  "robot": 1,
  "vel": 5,
  "coord": 0,
  "size": 4,
  "pos": [
    [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7],
    [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7],
    [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7],
    [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7]
  ]
}
```

---

### 목표 포인트로 이동

#### 목표 포인트로 이동

**명령 코드:** `0x3003` GO_POSITION

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 로봇 번호 |
| positionName | string | 예 | 목표 포인트명: SetPosition_EntrancePoint/SetPosition_AuxiliaryPoint/SetPosition_JobPoint |
| RobotPos | object | 예 | 로봇 위치 객체 |

**RobotPos 내부 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| ctype | int | 타입: NONE_TYPE=0/P_TYPE/E_TYPE/RP_TYPE/AP_TYPE/GP_TYPE/GE_TYPE |
| data | double[21] | 위치 데이터 배열, 자세한 내용은 아래 설명 참조 |
| key | string | 변수 타입 |
| paraVarData | array | 변수 배열 |

**data 배열 설명:**

| 인덱스 위치 | 설명 |
|----------|------|
| 제1, 2위치 | 좌표 타입: 0,0-관절 좌표; 1,1-직각 좌표; 2,1-도구 좌표; 3,1-사용자 좌표 |
| 제3위치 | 좌우수: 1-왼손, 2-오른손, 0-좌우수 없음 (기본값 0) |
| 제4, 5, 6, 7위치 | 예비, 기본값 0 |
| 제8-14위치 | 로봇 본체 좌표값 (7자리): 관절 좌표에서는 1-6축 각도값, 다른 좌표에서는 x,y,z,a,b,c |
| 제15-19위치 | 외부축 좌표값 (최대 5개 외부축, 부족분은 0으로 채움) |

**요청 예시:**

```json
{
  "robot": 1,
  "positionName": "SetPosition_JobPoint",
  "RobotPos": {
    "ctype": 0,
    "key": "",
    "data": [1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 6.0, 0.0, 6.0, 3.141590, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    "paraVarData": [
      {"data": 1.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 1.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 6.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 6.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 3.141590, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""}
    ]
  }
}
```

> **설명:** 프로그램에 해당 명령이 없음

#### 작업 파일 포인트로 이동

**명령 코드:** `0x3005` GO_JOBFILEPOSITION

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 로봇 번호 |
| jobName | string | 예 | 작업 파일명 |
| suffixname | string | 예 | 작업 파일 확장자 (예: .JBR) |
| posName | string | 예 | 포인트명 |

**요청 예시:**

```json
{
  "robot": 1,
  "jobName": "Q1",
  "suffixname": ".JBR",
  "posName": "P001"
}
```

#### 사용자 좌표 캘리브레이션 포인트로 이동

**명령 코드:** `0x3006` GO_USERCALIBRATIONPOS

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 로봇 번호 |
| userNum | int | 예 | 사용자 번호 |
| posType | int | 예 | 포인트 타입: 0-원점, 1-X값, 2-Y값 |

**요청 예시:**

```json
{
  "robot": 1,
  "userNum": 1,
  "posType": 0
}
```

#### 복귀점으로 이동

**명령 코드:** `0x3007` GO_RESET_POSITION

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 로봇 번호 |

**요청 예시:**

```json
{
  "robot": 1
}
```

---

### 원점 복귀 명령

#### 원점 복귀 명령

**명령 코드:** `0x3002` GO_HOME

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 로봇 번호 (1-4) |
| type | int | 예 | 원점 복귀 타입: 0-로봇 원점 복귀, 1-외부축 원점 복귀 |

**요청 예시:**

```json
{
  "robot": 1,
  "type": 1
}
```

---

## 로봇 설정

### 조그 속도 설정

#### 관절축 조그 속도 설정

**명령 코드:** `0x2604` JOG_JOINTPARAMETER_SET

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| AxisNum | int | 예 | 관절축 번호 |
| minTrajectTime.minAccTime | float | 예 | 최소 가속 시간 |
| minTrajectTime.minDecTime | float | 예 | 최소 감속 시간 |
| MaxSpeed | float | 예 | 관절축 최대 조그 속도, 단위: 도°/s |
| MaxAcc | float | 예 | 관절축 조그 가속도, 단위: 도°/s² |

**요청 예시:**

```json
{
  "AxisNum": 1,
  "minTrajectTime": {
    "minAccTime": 0.10,
    "minDecTime": 0.10
  },
  "MaxSpeed": 10,
  "MaxAcc": 10
}
```

#### 관절축 조그 속도 조회

**송신 명령 코드:** `0x2605` JOG_JOINTPARAMETER_INQUIRE

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| AxisNum | int | 예 | 관절축 번호 |

**반환 명령 코드:** `0x2606` JOG_JOINTPARAMETER_RESPOND

**응답 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| AxisNum | int | 관절축 번호 |
| MaxSpeed | float | 관절축 최대 조그 속도, 단위: 도°/s |
| MaxAcc | float | 관절축 조그 가속도, 단위: 도°/s² |

**응답 예시:**

```json
{
  "AxisNum": 1,
  "MaxSpeed": 10,
  "MaxAcc": 10
}
```

#### 직각 좌표 조그 속도 설정

**명령 코드:** `0x2607` JOG_RECTPARAMETER_SET

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| MaxSpeed | float | 예 | 관절축 최대 조그 속도, 단위: mm/s |
| MaxAcc | float | 예 | 관절축 조그 가속도, 단위: mm/s² |

**요청 예시:**

```json
{
  "MaxSpeed": 10,
  "MaxAcc": 10
}
```

#### 직각 좌표 조그 속도 조회

**송신 명령 코드:** `0x2608` JOG_RECTPARAMETER_INQUIRE

**data: 비어 있음**

**반환 명령 코드:** `0x2609` JOG_RECTPARAMETER_RESPOND

**응답 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| MaxSpeed | float | 관절축 최대 조그 속도, 단위: mm/s |
| MaxAcc | float | 관절축 조그 가속도, 단위: mm/s² |

**응답 예시:**

```json
{
  "MaxSpeed": 10,
  "MaxAcc": 10
}
```

---

### 조그 감도 설정

#### 조그 감도 설정

**명령 코드:** `0x260A` JOG_SENSITIVITY_SET

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| Sensitivity | float | 예 | 감도, 단위: 도, 범위: 0.001 - 1 |

**요청 예시:**

```json
{
  "Sensitivity": 0.001
}
```

#### 조그 감도 조회

**송신 명령 코드:** `0x260B` JOG_SENSITIVITY_INQUIRE

**data: 비어 있음**

**반환 명령 코드:** `0x260C` JOG_SENSITIVITY_RESPOND

**응답 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| Sensitivity | float | 감도, 단위: 도, 범위: 0.001 - 1 |

**응답 예시:**

```json
{
  "Sensitivity": 0.001
}
```

---

### 현재 위치 조회

#### 좌표 모드 설명

| 좌표 모드 값 | 설명 |
|------------|------|
| -1 | 컨트롤러 현재 좌표 |
| 0 | 관절 좌표 (Joint) |
| 1 | 직각 좌표 (Cart) |
| 2 | 도구 좌표 (Tool) |
| 3 | 사용자 좌표 (User) |
| 4 | 모터 위치 |

#### 현재 위치 조회

**송신 명령 코드:** `0x2A02` CURRENTPOS_INQUIRE

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 로봇 번호 (1, 2, 3, 4) |
| coord | int | 예 | 좌표 모드: -1-컨트롤러 현재 좌표, 0-관절 좌표, 1-직각 좌표, 2-도구 좌표, 3-사용자 좌표, 4-모터 위치 |

**요청 예시:**

```json
{
  "robot": 1,
  "coord": 2
}
```

**반환 명령 코드:** `0x2A03` CURRENTPOS_RESPOND

**응답 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| robot | int | 로봇 번호 (1, 2, 3, 4) |
| deg | int | ACS 좌표계 여부; 0: 예; 1: 아니오 |
| pos | array | 라디안 포인트 값, 좌표값은 7자리로 저장되며 관절 좌표에서는 앞 6자리가 J1~J6축 각도값(도) 또는 직각/도구/사용자 좌표 XYZ(밀리미터), 4-6자리가 ABC 좌표값(라디안), 7번째 자리 예약 |
| posDeg | array | 각도 포인트 값, 직각/도구/사용자 좌표에서 ABC 라디안 값을 각도값으로 변환, 나머지 상태 값은 pos와 동일 |
| coord | int | 좌표 모드: -1-컨트롤러 현재 좌표, 0-관절 좌표, 1-직각 좌표, 2-도구 좌표, 3-사용자 좌표, 4-모터 위치 |
| configuration | int | 자세 또는 (SCARA) 좌우수 |

**응답 예시:**

```json
{
  "robot": 1,
  "deg": 1,
  "pos": [0, 0.1, 2, 3.3, 44, 555.55, 0.0],
  "posDeg": [0.0, 0.0, 1, 2, 3.3, 44, 5.55],
  "coord": -1,
  "configuration": 1
}
```

#### 모터 속도 조회

**송신 명령 코드:** `0x2A04` CURRENTVEL_INQUIRE

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 로봇 번호 (1, 2, 3, 4) |

**요청 예시:**

```json
{
  "robot": 1
}
```

**반환 명령 코드:** `0x2A05` CURRENTVEL_RESPOND

**응답 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| robot | int | 로봇 번호 (1, 2, 3, 4) |
| vel | array | 모터 속도, 4축도 6개 송신 |
| velSync | array | 외부축 모터 속도 |
| maxVel | array | 최대 모터 속도 |
| maxVelSync | array | 최대 외부축 모터 속도 |

**응답 예시:**

```json
{
  "robot": 1,
  "vel": [0, 0, 0, 0, 0, 0],
  "velSync": [0, 0, 0, 0, 0],
  "maxVel": [0, 0, 0, 0, 0, 0],
  "maxVelSync": [0, 0, 0, 0, 0]
}
```

#### 모터 토크 조회

**송신 명령 코드:** `0x2A06` CURRENTTORQ_INQUIRE

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 로봇 번호 (1, 2, 3, 4) |

**요청 예시:**

```json
{
  "robot": 1
}
```

**반환 명령 코드:** `0x2A07` CURRENTTORQ_RESPOND

**응답 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| robot | int | 로봇 번호 (1, 2, 3, 4) |
| torq | array | 모터 토크 |
| theoTorq | array | 이론 모터 토크 |
| maxTorq | array | 모터 최대 토크 |
| maxTheoTorq | array | 이론 모터 최대 토크 |
| maxTorqSync | array | 외부축 모터 최대 토크 |
| torqSync | array | 외부축 모터 토크 |

**응답 예시:**

```json
{
  "robot": 1,
  "torq": [0, 0, 0, 0, 0, 0],
  "theoTorq": [0, 0, 0, 0, 0, 0],
  "maxTorq": [0, 0, 0, 0, 0, 0],
  "maxTheoTorq": [0, 0, 0, 0, 0, 0],
  "maxTorqSync": [0, 0, 0, 0, 0],
  "torqSync": [0, 0, 0, 0, 0]
}
```

---

### 동작 파라미터 설정

#### 동작 파라미터 설정

**명령 코드:** `0x2801` INTERPOLATION_MODE_SET

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| absolutePosResolution | float | 예 | 절대 위치 분해능, 범위: 0.0001 - 0.1 도 |
| interpolationMethod | int | 예 | 로봇 보간 방식: 0-S형, 1-사다리꼴, 2-가속-가속 보간 |
| runDelayTime | int | 예 | 동작 지연 시간, 범위: 500 - 20000 밀리초 |
| stopTime | int | 예 | 일시정지 시간, 범위: 240 - 2000 밀리초 |

**요청 예시:**

```json
{
  "absolutePosResolution": 0.010,
  "interpolationMethod": 0,
  "runDelayTime": 500,
  "stopTime": 240
}
```

#### 동작 파라미터 조회

**송신 명령 코드:** `0x2802` INTERPOLATION_MODE_INQUIRE

**data: 없음**

**반환 명령 코드:** `0x2803` INTERPOLATION_MODE_RESPOND

**응답 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| absolutePosResolution | float | 절대 위치 분해능, 단위: 도 |
| interpolationMethod | int | 로봇 보간 방식: 0-S형, 1-사다리꼴, 2-가속-가속 보간 |
| runDelayTime | int | 동작 지연 시간, 단위: 밀리초 |
| stopTime | int | 일시정지 시간, 단위: 밀리초 |

**응답 예시:**

```json
{
  "absolutePosResolution": 0.010,
  "interpolationMethod": 0,
  "runDelayTime": 500,
  "stopTime": 240
}
```

---

### 로봇 타입, 수량 조회

#### 로봇 타입 조회

**송신 명령 코드:** `0x2E02` ROBOT_TYPE_INQUIRE

**data: null**

**반환 명령 코드:** `0x2E03` ROBOT_TYPE_RESPOND

**응답 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| type | int | 현재 로봇 타입 |

**응답 예시:**

```json
{
  "type": 1
}
```

**로봇 타입 대응표:**

| 타입 값 | 설명 |
|--------|------|
| 0 | 없음 |
| 1 | 범용 6축 직렬 다관절 |
| 2 | 4축 SCARA |
| 3 | 4축 파레트 |
| 4 | 4축 직렬 다관절 |
| 5 | 단축 |
| 6 | 5축 직렬 다관절 |
| 7 | 6축 협업 |
| 8 | 2축 SCARA |
| 9 | 3축 SCARA |
| 10 | 3축 직각 |
| 11 | 3축 비표준 1 |
| 12 | 7축 직렬 다관절 |
| 13 | SCARA 비표준 1 |
| 14 | 4축 파레트 리드 스크류 |
| ... | 더 많은 타입은 생략 |

#### 로봇 수량 조회

**송신 명령 코드:** `0x2E05` ROBOT_SUM_INQUIRE

**data: null**

**반환 명령 코드:** `0x2E06` ROBOT_SUM_RESPOND

**응답 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| sum | int | 로봇 수량 |

**응답 예시:**

```json
{
  "sum": 1
}
```

#### 로봇 통신 주기 설정

**명령 코드:** `0x2E07` CONTROL_CYCLE_SET

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| controlCycle | int | 예 | 통신 주기, 범위: 1, 2, 4, 8, 컨트롤러 재시작 후 적용 |
| baudRate | string | 예 | CAN_OPEN의 보드 레이트 |

**요청 예시:**

```json
{
  "controlCycle": 1,
  "baudRate": "10K"
}
```

#### 로봇 통신 주기 조회

**송신 명령 코드:** `0x2E08` CONTROL_CYCLE_INQUIRE

**data: null**

**반환 명령 코드:** `0x2E09` CONTROL_CYCLE_RESPOND

**응답 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| controlCycle | int | 통신 주기 |

**응답 예시:**

```json
{
  "controlCycle": 1
}
```

#### 컨트롤러 기능 제한 상황 조회

**송신 명령 코드:** `0x2E0B` CONTROLLER_LIMIT_INQUIRE

**data: null**

**반환 명령 코드:** `0x2E0C` CONTROLLER_LIMIT_RESPOND

**응답 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| robotsum | int | 로봇 수 |
| maxRobotCount | int | 로봇 최대 수 |
| robottypes | object | 로봇 타입 잠금 해제 상태, true-잠금 해제됨, false-잠금 해제되지 않음 |
| craft | object | 공정 잠금 해제 상태, true-잠금 해제됨, false-잠금 해제되지 않음 |

**응답 예시:**

```json
{
  "robotsum": 2,
  "maxRobotCount": 4,
  "robottypes": {
    "R_GENERAL_6S": false,
    "R_SCARA": true,
    "R_FOURAXIS_PALLET": true,
    "R_FOURAXIS": true,
    "R_GENERAL_1S": true,
    "R_GENERAL_5S": true,
    "R_GENERAL_6S_1": true,
    "R_SCARA_TWOAXIS": true,
    "R_SCARA_THREEAXIS": true,
    "R_THREE_CARTESIAN_COORDINATE": true,
    "R_THREE_CARTESIAN_COORDINATE_1": true,
    "R_GENERAL_7S": true,
    "R_SCARA_1": true,
    "R_FOURAXIS_PALLET_1": true,
    "R_FOUR_CARTESIAN_COORDINATE": true,
    "R_SIXAXIS_SPRAY_BBR": true,
    "R_FOUR_POLAR_COORDINATE_1": true,
    "R_GENERAL_6S_2": true,
    "R_GANTRY_WELD": true,
    "R_DELTA": true,
    "R_WINE_CHAMFER": true
  },
  "craft": {
    "pallet": true,
    "weld": false,
    "lasercut": true,
    "polish": true,
    "spray": true,
    "search": true,
    "pun": true,
    "vision": true
  }
}
```

---

## 외부축 모션

### 로봇 외부축 관절 모션 MOVJEXT

**명령 코드:** `0x4507`

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 | 값 범위 |
|--------|------|------|------|----------|
| robot | int | 예 | 로봇 선택 | [1, 4] |
| vel | int | 예 | 속도 | [1, 100], 단위: % |
| coord | int | 예 | 좌표계 | 0-관절 좌표, 1-직각 좌표, 2-사용자 좌표, 3-도구 좌표 |
| pos | double[12] | 예 | 목표 위치: 앞 7자리는 로봇 본체 목표 위치, 뒤 5자리는 외부축 목표 위치 | - |

**요청 예시:**

```json
{
  "robot": 1,
  "vel": 5,
  "coord": 0,
  "pos": [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7, 1.0, 2.0, 3.0, 4.0, 5.0]
}
```

---

### 로봇 외부축 직선 모션 MOVLEXT

**명령 코드:** `0x4508`

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 | 값 범위 |
|--------|------|------|------|----------|
| robot | int | 예 | 로봇 선택 | [1, 4] |
| vel | int | 예 | 속도 | [1, 1000], 단위: mm/s |
| coord | int | 예 | 좌표계 | 0-관절 좌표, 1-직각 좌표, 2-사용자 좌표, 3-도구 좌표 |
| pos | double[12] | 예 | 목표 위치: 앞 7자리는 로봇 본체 목표 위치, 뒤 5자리는 외부축 목표 위치 | - |

**요청 예시:**

```json
{
  "robot": 1,
  "vel": 5,
  "coord": 0,
  "pos": [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7, 1.0, 2.0, 3.0, 4.0, 5.0]
}
```

---

### 로봇 외부축 원호 모션 MOVCEXT

**명령 코드:** `0x4509`

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 | 값 범위 |
|--------|------|------|------|----------|
| robot | int | 예 | 로봇 선택 | [1, 4] |
| vel | int | 예 | 속도 | [1, 1000], 단위: mm/s |
| coord | int | 예 | 좌표계 | 0-관절 좌표, 1-직각 좌표, 2-사용자 좌표, 3-도구 좌표 |
| posOne | double[12] | 예 | 원호 시작점: 앞 7자리는 로봇 본체 목표 위치, 뒤 5자리는 외부축 목표 위치 | - |
| posTwo | double[12] | 예 | 원호의 중간 경유점: 앞 7자리는 로봇 본체 목표 위치, 뒤 5자리는 외부축 목표 위치 | - |
| posThree | double[12] | 예 | 원호의 목표점: 앞 7자리는 로봇 본체 목표 위치, 뒤 5자리는 외부축 목표 위치 | - |

**요청 예시:**

```json
{
  "robot": 1,
  "vel": 5,
  "coord": 0,
  "posOne": [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7, 1.0, 2.0, 3.0, 4.0, 5.0],
  "posTwo": [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7, 1.0, 2.0, 3.0, 4.0, 5.0],
  "posThree": [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7, 1.0, 2.0, 3.0, 4.0, 5.0]
}
```

---

### 외부축을 목표점으로 이동

**명령 코드:** `0x3004` (GO_SYNCPOSITION)

#### RobotPos 구조 설명

| 필드 | 타입 | 설명 |
|------|------|------|
| ctype | int | P 타입: NONE_TYPE=0, P_TYPE, E_TYPE, RP_TYPE, AP_TYPE, GP_TYPE, GE_TYPE |
| data | double[21] | 위치 데이터 배열, 자세한 내용은 아래 배열 인덱스 설명 참조 |
| key | string | 변수 타입 |
| paraVarData | array | 변수 데이터 배열 |

#### data 배열 인덱스 설명

| 인덱스 위치 | 의미 | 설명 |
|----------|------|------|
| 0, 1 | 좌표계 식별 | 0 0-관절 좌표, 1 1-직각 좌표, 2 1-도구 좌표, 3 1-사용자 좌표 |
| 2 | 좌우수 | 1-왼손, 2-오른손, 0-좌우수 없음 (기본값 0) |
| 3, 4, 5, 6 | 예비 | 기본값 0 |
| 7 ~ 13 | 로봇 본체 좌표 | 7자리, 관절 좌표에서는 1-6축 각도값, 다른 좌표에서는 x,y,z,a,b,c |
| 14 ~ 18 | 외부축 좌표 | 최대 5개 외부축 지원, 관절값만, 부족분은 0으로 채움 |

**요청 예시:**

```json
{
  "RobotPos": {
    "ctype": 0,
    "data": [1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 6.0, 0.0, 6.0, 3.141590, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    "key": "",
    "paraVarData": [
      {"data": 1.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 1.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 6.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 6.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 3.141590, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""}
    ]
  },
  "robot": 1
}
```

---

## 외부축 설정

### 1. 포지셔너 좌표 보정 계산 설정

**명령 ID:** `0x7001` SYNCPOSITIONER_CALIBRATION_SET

**설명:** 포지셔너 좌표 보정 계산 설정, 다음 명령을 송신

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| calibrateNum | int | 예 | 포지셔너 그룹 번호, 선택 가능 값: 1, 2, 3 |

**요청 예시:**

```json
{
  "calibrateNum": 1
}
```

**컨트롤러 반환 명령 ID:** `0x7004` SYNCPOSITIONER_CALIBRATION_RESULT

**응답 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| result | bool | 외부축 데이터 계산 성공 여부 |

**응답 예시:**

```json
{
  "result": true
}
```

---

### 2. 캘리브레이션 포인트 좌표

**명령 ID:** `0x7002` SYNCPOSITIONER_CALIBRATION_INQUIRE

**설명:** 캘리브레이션 포인트 좌표, 다음 명령을 송신

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| syncPositionerNum | int | 예 | 포지셔너 그룹 번호, 선택 가능 값: 1, 2, 3 |
| pointNum | int | 예 | 값 범위: 0~3 또는 5 |

**요청 예시:**

```json
{
  "syncPositionerNum": 1,
  "pointNum": 0
}
```

**컨트롤러 응답 명령 ID:** `0x7003` SYNCPOSITIONER_CALIBRATION_RESPOND

**응답 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| syncPositionerNum | int | 포지셔너 그룹 번호, 선택 가능 값: 1, 2, 3 |
| pointNum | int | 값 범위: 0~3 또는 5 |
| pos | array | 현재 포인트 |

**응답 예시:**

```json
{
  "syncPositionerNum": 1,
  "pointNum": 0,
  "pos": [0, 0, 0, 0, 0, 0]
}
```

---

### 3. 모든 외부축의 캘리브레이션 결과 조회

**명령 ID:** `0x7005` SYNCPOSITIONER_TYPEANDCALIBRATIONRESULT_INQUIRE

**설명:** 모든 외부축의 캘리브레이션 결과를 조회

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 로봇 번호 |

**요청 예시:**

```json
{
  "robot": 1
}
```

**반환 명령 ID:** `0x7006` SYNCPOSITIONER_TYPEANDCALIBRATIONRESULT_RESPOND

**응답 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| robot | int | 로봇 번호 |
| calibrateResult | array | 캘리브레이션 완료 여부, 배열은 외부축 그룹 번호의 캘리브레이션 완료 여부를 나타냄 |
| syncType | array | 동기화 타입 |

**응답 예시:**

```json
{
  "robot": 1,
  "calibrateResult": [false, false, true],
  "syncType": [1, 1, 1]
}
```

---

### 4. 캘리브레이션 결과 조회

**명령 ID:** `0x7007` SYNCPOSITIONER_COORD_INQUIRE

**설명:** 캘리브레이션 결과 조회 (티치 펜던트에 이 기능 없음)

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| syncPositionerNum | int | 예 | 포지셔너 그룹 번호 |
| coordNum | int | 예 | 캘리브레이션 결과 조회 |

**요청 예시:**

```json
{
  "syncPositionerNum": 1,
  "coordNum": 0
}
```

**응답 명령 ID:** `0x7008` SYNCPOSITIONER_COORD_RESPOND

**응답 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| syncPositionerNum | int | 포지셔너 그룹 번호 |
| coordNum | int | 캘리브레이션 결과 번호 |
| pos | array | 현재 포인트 |

**응답 예시:**

```json
{
  "syncPositionerNum": 1,
  "coordNum": 1,
  "pos": [0, 0, 0, 0, 0, 0]
}
```

---

### 5. 현재 협업 외부축 그룹 번호 설정

**명령 ID:** `0x7009` SYNCPOSITIONER_COORDNUM_SWITCH

**설명:** 현재 협업 외부축 그룹 번호 설정

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| curSyncPositionerNum | int | 예 | 현재 협업 외부축 그룹 번호 |

**요청 예시:**

```json
{
  "curSyncPositionerNum": 3
}
```

**현재 협업 외부축 그룹 번호 조회:**

**명령 ID:** `0x700A` SYNCPOSITIONER_COORDNUM_INQUIRE

**설명:** 데이터 송신 불필요

**컨트롤러 응답 명령 ID:** `0x700B` SYNCPOSITIONER_COORDNUM_RESPOND

**응답 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| curSyncPositionerNum | int | 현재 협업 외부축 그룹 번호 |

**응답 예시:**

```json
{
  "curSyncPositionerNum": 2
}
```

---

### 6. 지레일 파라미터 설정

**명령 ID:** `0x700D` SYNCTRACK_SET

**설명:** 지레일 파라미터 설정, 티치 펜던트가 아래 명령을 송신

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| calibrateResult | bool | 예 | 협업 여부 |
| xConversionRatio | float | 예 | x 방향 변환 비율 |
| yConversionRatio | float | 예 | y 방향 변환 비율 |
| zConversionRatio | float | 예 | z 방향 변환 비율 |

**요청 예시:**

```json
{
  "calibrateResult": true,
  "xConversionRatio": 1.0,
  "yConversionRatio": 1.0,
  "zConversionRatio": 1.0
}
```

**조회 명령 ID:** `0x700E` SYNCTRACK_INQUIRE

**컨트롤러 응답 명령 ID:** `0x700F` SYNCTRACK_RESPOND

**응답 예시:**

```json
{
  "calibrateResult": true,
  "xConversionRatio": 1.0,
  "yConversionRatio": 1.0,
  "zConversionRatio": 1.0
}
```

---

### 7. 현재 위치 조회

**명령 ID:** `0x7012` SYNC_POS_INQUIRE

**설명:** 외부축 설정 인터페이스, 티치 펜던트가 아래 명령을 송신

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 로봇 번호 |
| coord | int | 예 | 좌표 모드<br/>- -1: 컨트롤러 현재 좌표<br/>- 0: 관절 좌표<br/>- 1: 직각 좌표<br/>- 2: 도구 좌표<br/>- 3: 사용자 좌표 |

**요청 예시:**

```json
{
  "robot": 1,
  "coord": 0
}
```

**컨트롤러 응답 명령 ID:** `0x7013` SYNC_POS_RESPOND

**설명:** 복귀점 설정 인터페이스, 컨트롤러가 현재 위치 조회 요청을 수신할 때 송신

**응답 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| robot | int | 로봇 번호 |
| coord | int | 좌표 모드<br/>- -1: 컨트롤러 현재 좌표<br/>- 0: 관절 좌표<br/>- 1: 직각 좌표<br/>- 2: 도구 좌표<br/>- 3: 사용자 좌표 |
| configuration | int | 자세 또는 좌우수 |
| pos | array | 현재 위치 (라디안) |
| posDeg | array | 현재 위치 (각도) |
| posSync | array | 외부축 현재 위치 |

**응답 예시:**

```json
{
  "robot": 1,
  "coord": 0,
  "configuration": 1,
  "pos": [0, 0.1, 2, 3.3, 44, 555.55, 66.6, 77.77],
  "posDeg": [0, 0.1, 2, 3.3, 44, 555.55, 66.6, 77.77],
  "posSync": [0, 0.1, 2, 3.3, 44, 555.55, 66.6, 77.77]
}
```

---

### 8. 듀얼 로봇 협업 활성화

**듀얼 로봇 협업 활성화 설정 명령 ID:** `0x7015` COOPERATIVE_SET

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| cooperativeRobot | int | 예 | 협업 설정<br/>- 0: 협업 없음<br/>- 1: 협업 |

**요청 예시:**

```json
{
  "cooperativeRobot": 0
}
```

**협업 상태 조회 명령 ID:** `0x7016` COOPERATIVE_INQUIRE

**협업 상태 응답 명령 ID:** `0x7017` COOPERATIVE_RESPOND

**응답 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| cooperativeRobot | int | 협업 상태<br/>- 0: 협업 없음<br/>- 1: 협업 |

**응답 예시:**

```json
{
  "cooperativeRobot": 0
}
```

---

### 9. 외부축 관절 파라미터 설정

**명령 ID:** `0x7021` JOINTPARAMETER_SYNCPOSITIONER_SET

**설명:** 외부축 관절 파라미터 설정

#### 단축 포지셔너

**요청 예시:**

```json
{
  "Joint": [
    {
      "BackLash": 0.0,
      "DeRatedVel": -30000.0,
      "Direction": 1.0,
      "EncoderResolution": 17.0,
      "MaxAcc": 1.0,
      "MaxDeRotSpeed": -1.0,
      "MaxDecel": -1.0,
      "MaxRotSpeed": 1.0,
      "maxJerkAcc": 1.0,
      "maxJerkDec": -1.0,
      "NegSWLimit": -360.0,
      "PosSWLimit": 720.0,
      "RatedDeRotSpeed": -5000.0,
      "RatedRotSpeed": 5000.0,
      "RatedVel": 30000.0,
      "ReducRatio": 1.0,
      "syncAxisNum": 1,
      "syncGroupNum": 1
    }
  ],
  "syncGroupNum": 1
}
```

#### 2축 포지셔너

**요청 예시:**

```json
{
  "Joint": [
    {
      "BackLash": 0.0,
      "DeRatedVel": -18000.0,
      "Direction": 1.0,
      "EncoderResolution": 17.0,
      "MaxAcc": 1.0,
      "MaxDeRotSpeed": -1.0,
      "MaxDecel": -1.0,
      "MaxRotSpeed": 1.0,
      "NegSWLimit": -100.0,
      "PosSWLimit": 100.0,
      "RatedDeRotSpeed": -3000.0,
      "RatedRotSpeed": 3000.0,
      "RatedVel": 18000.0,
      "ReducRatio": 1.0,
      "maxJerkAcc": 1.0,
      "maxJerkDec": -1.0,
      "syncAxisNum": 1,
      "syncGroupNum": 2
    },
    {
      "BackLash": 0.0,
      "DeRatedVel": -12000.0,
      "Direction": -1.0,
      "EncoderResolution": 17.0,
      "MaxAcc": 1.0,
      "MaxDeRotSpeed": -1.0,
      "MaxDecel": -1.0,
      "MaxRotSpeed": 1.0,
      "NegSWLimit": -80.0,
      "PosSWLimit": 80.0,
      "RatedDeRotSpeed": -2000.0,
      "RatedRotSpeed": 2000.0,
      "RatedVel": 12000.0,
      "ReducRatio": 1.0,
      "maxJerkAcc": 1.0,
      "maxJerkDec": -1.0,
      "syncAxisNum": 2,
      "syncGroupNum": 2
    }
  ],
  "syncGroupNum": 2
}
```

**Joint 파라미터 설명:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| BackLash | float | 기어 백래시 |
| DeRatedVel | float | 정격 역방향 속도 |
| Direction | float | 정역방향: 1.0은 정방향 |
| EncoderResolution | float | 엔코더 분해능 (비트 수) |
| MaxAcc | float | 최대 가속도 |
| MaxDeRotSpeed | float | 최대 역회전 속도 |
| MaxDecel | float | 최대 감속도 |
| MaxRotSpeed | float | 최대 정회전 속도 |
| maxJerkAcc | float | 최대 가가속도 |
| maxJerkDec | float | 최대 감감속도 |
| NegSWLimit | float | 역방향 리미트 각도 |
| PosSWLimit | float | 정방향 리미트 각도 |
| RatedDeRotSpeed | float | 정격 역회전 속도 |
| RatedRotSpeed | float | 정격 정회전 속도 |
| RatedVel | float | 정격 속도 |
| ReducRatio | float | 관절 감속비 |
| syncAxisNum | int | 축 수 |
| syncGroupNum | int | 동기 그룹 번호 |

**루트 레벨 파라미터 설명:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| syncGroupNum | int | 동기 그룹 번호 |

**관절 파라미터 조회 명령 ID:** `0x7022` JOINTPARAMETER_SYNCPOSITIONER_INQUIRE

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| syncGroupNum | int | 예 | 동기 그룹 번호 |

**요청 예시:**

```json
{
  "syncGroupNum": 1
}
```
**관절 파라미터 반환 명령 ID:** `0x7023` JOINTPARAMETER_SYNCPOSITIONER_RESPOND

**설명:** 0x7021과 동일

---

### 10. 외부축 조그 관절 속도 설정

**명령 ID:** `0x7024` JOG_JOINTPARAMETER_SYNCPOSITIONER_SET

**설명:** 외부축 조그 관절 속도 설정

---

## 역학 기능

### 1. 충돌 감지

#### 충돌 감지 스위치 설정

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x7406 | COLLISION_DETECTION_SET | |

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| switch | bool | 예 | 충돌 감지 스위치 |

**요청 예시:**

```json
{
  "switch": true
}
```

#### 충돌 감지 스위치 상태 조회

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x7407 | COLLISION_DETECTION_INQUIRE | |

**요청 파라미터:** 없음

#### 컨트롤러 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x7408 | COLLISION_DETECTION_RESPOND | |

**응답 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| is_identification | bool | 식별 상태 |
| restrart_switch | bool | 재시작 스위치 |
| switch | bool | 충돌 감지 스위치 |

**응답 예시:**

```json
{
  "is_identification": true,
  "restrart_switch": true,
  "switch": true
}
```

#### 충돌 감지 파라미터 설정

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x7409 | COLLISION_DETECTION_PARAM_SET | |

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| Co_De_para | array[double] | 예 | 임계값, 배열 길이 6 |
| error_enable_time | double | 예 | 오차 허용 시간 |
| pos_delay_time | double | 예 | 명령 위치 응답 시간 |

**요청 예시:**

```json
{
  "Co_De_para": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0],
  "error_enable_time": 2.0,
  "pos_delay_time": 1.0
}
```

#### 충돌 감지 파라미터 조회

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x740A | COLLISION_DETECTION_PARAM_INQUIRE | |

**요청 파라미터:** 없음

**컨트롤러 응답 명령 코드:** `0x740B` COLLISION_DETECTION_PARAM_RESPOND

**응답 파라미터:** 0x7409와 동일

---

### 2. 토크 피드포워드

#### 토크 피드포워드 스위치 설정

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x740C | TORQ_FEEDBACK_SET | |

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| torqFeedback | bool | 예 | 토크 피드포워드 스위치 |

**요청 예시:**

```json
{
  "torqFeedback": true
}
```

#### 토크 피드포워드 상태 조회

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x740D | TORQ_FEEDBACK_INQUIRE | |

**요청 파라미터:** 없음

#### 컨트롤러 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x740E | TORQ_FEEDBACK_RESPOND | |

**응답 파라미터:** 0x740C와 동일

---

### 3. 드래그 티치

#### 드래그 티치 조회

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x7501 | DRAG_TRAJ_INQUIRE | |

**요청 파라미터:** 없음

#### 컨트롤러 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x7502 | DRAG_TRAJ_RESPOND | |

**응답 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| TrajName | array[string] | 예 | 궤적명 리스트 |

**응답 예시:**

```json
{
  "TrajName": ["RRR", "TTT"]
}
```

#### 드래그 티치 파라미터 설정

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x7504 | DRAG_PARAM_SET | |

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| DecareLimit | double | 예 | 데카르트 공간 선속도 제한 |
| JointVelLimit | double | 예 | 관절 공간 속도 제한 |
| drag_mode | int | 예 | 드래그 모드: 0-자유 드래그, 1-위치 드래그, 2-자세 드래그 |
| frictionOffset | array[double] | 예 | 1-6 관절 마찰력 보상 보정 계수 |
| dragCoefficient | array[double] | 예 | 관절 한계 초과 저항 계수, 길이 6, 범위 [1, 100] |

**요청 예시:**

```json
{
  "DecareLimit": 1.0,
  "JointVelLimit": 2.0,
  "drag_mode": 0,
  "frictionOffset": [3.0, 3.0, 3.0, 3.0, 3.0, 3.0],
  "dragCoefficient": [5.0, 5.0, 5.0, 5.0, 5.0, 5.0]
}
```

#### 드래그 티치 파라미터 조회

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x7505 | DRAG_PARAM_INQUIRE | |

**요청 파라미터:** 없음

#### 컨트롤러 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x7506 | DRAG_PARAM_RESPOND | |

**응답 파라미터:** 0x7504와 동일

---

### 4. 드래그 궤적 관련

#### 드래그 티치 궤적 재생 파라미터 설정

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x7507 | DRAG_TRAJ_PARAM_SET | |

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| MaxSamplingNum | double | 예 | 최대 샘플링 포인트 수 |
| SamplingInterval | double | 예 | 샘플링 간격 |
| Start | bool | 예 | false-종료, true-시작 |

**요청 예시:**

```json
{
  "MaxSamplingNum": 3000.0,
  "SamplingInterval": 0.030,
  "Start": false
}
```

#### 드래그 궤적 파라미터 조회

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x7508 | DRAG_TRAJ_PARAM_INQUIRE | |

**요청 파라미터:** 없음

#### 컨트롤러 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x7509 | DRAG_TRAJ_PARAM_RESPOND | |

**응답 파라미터:** 0x7507과 동일

#### 궤적 기록 여부 조회

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x750A | DRAG_TRAJ_RECORD_INQUIRE | |

**요청 파라미터:** 없음

#### 컨트롤러 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x750B | DRAG_TRAJ_RECORD_RESPOND | |

**응답 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| record | bool | 예 | 드래그 궤적 기록 여부 |

**응답 예시:**

```json
{
  "record": true
}
```

#### 궤적 재생

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x750C | DRAG_TRAJ_PLAYBACK | |

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| trajName | string | 예 | 궤적명 |
| vel | int | 예 | 궤적 재생 속도, 티치 펜던트는 고정값 100 송신 |

**요청 예시:**

```json
{
  "trajName": "",
  "vel": 100
}
```

#### 궤적 저장

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x750D | DRAG_TRAJ_SAVE | |

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| TrajName | string | 예 | 궤적명 |

**요청 예시:**

```json
{
  "TrajName": "SSSSS"
}
```

#### 궤적 삭제

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x750E | DRAG_TRAJ_DELETE | |

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| TrajName | string | 예 | 궤적명 |

**요청 예시:**

```json
{
  "TrajName": "SSSSS"
}
```

#### 드래그 모드 설정

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x750F | DRAG_MODE | |

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| mode | int | 예 | 드래그 모드: 0-없음, 1-3D 마우스, 2-토크 |
| port | int | 예 | 외부 트리거 신호 포트 번호 |
| value | int | 예 | 외부 트리거 신호 값 |

**요청 예시:**

```json
{
  "mode": 2,
  "port": 3,
  "value": 1
}
```

#### 드래그 모드 조회

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x7510 | DRAG_MODE_INQUIRE | |

**요청 파라미터:** 없음

#### 컨트롤러 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x7511 | DRAG_MODE_RESPOND | |

**응답 파라미터:** 0x750F와 동일

---

### 5. 외부 버튼

#### 기능 제어 파라미터 조회

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x9114 | FUNCTIONALCONTROL_INQUIRE | |

**요청 파라미터:** 없음

#### 컨트롤러 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x9115 | FUNCTIONALCONTROL_RESPOND | |

> 배열 인덱스 설명: 0-드래그 모드, 1-조그 모드, 2-궤적 수집 시작, 3-궤적 수집 종료, 4-궤적 재생 시작, 5-위 enable, 6-아래 enable, 7-그리퍼 열림, 8-그리퍼 닫힘, 9-궤적 저장

**응답 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| IoInPortArr | array[int] | 예 | 트리거 포트(DIN), 배열 길이 11 |
| hardwareTypeArr | array[int] | 예 | 하드웨어 타입: 0-IO, 배열 길이 11 |
| modeArr | array[int] | 예 | 트리거 방식: 0-길게 누름 트리거 포트, 1-짧게 누름 트리거 포트, 배열 길이 11 |
| parameterArr | array[int] | 예 | 파라미터: 0-트리거 포트 닫힐 때 트리거, 1-트리거 포트 열릴 때 트리거, 배열 길이 11 |

**응답 예시:**

```json
{
  "IoInPortArr": [1, 2, 3, 4, 5, 0, 6, 7, 8, 9, 10],
  "hardwareTypeArr": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "modeArr": [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  "parameterArr": [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0]
}
```

#### 상태 알림 조회

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x9116 | STATUSPROMPT_INQUIRE | |

**요청 파라미터:** 없음

#### 컨트롤러 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x9117 | STATUSPROMPT_RESPOND | |

> 배열 인덱스 설명: 0-드래그 모드, 1-조그 모드, 2-궤적 수집 시작, 3-궤적 수집 종료, 4-궤적 재생 시작, 5-위 enable, 6-아래 enable, 7-그리퍼 열림, 8-그리퍼 닫힘

**응답 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| IoDoutPortArr | array[int] | 예 | 트리거 포트(DOUT), 배열 길이 11 |
| hardwareTypeArr | array[int] | 예 | 하드웨어 타입: 0-IO, 배열 길이 11 |
| parameterArr | array[int] | 예 | 파라미터: 0-트리거 포트 닫힘, 1-트리거 포트 열림, 2-깜빡임, 배열 길이 11 |

**응답 예시:**

```json
{
  "IoDoutPortArr": [1, 2, 3, 4, 5, 0, 6, 7, 0, 0, 0],
  "hardwareTypeArr": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "parameterArr": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}
```

#### 외부 버튼 파라미터 설정

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x9118 | EXTERNKEYPARA_SET | |

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| _isFunctionalControl | bool | 예 | true-기능 제어 파라미터 설정, false-상태 알림 파라미터 설정 |
| hardwareTypeArr | array[int] | 예 | 하드웨어 타입: 0-IO, 배열 길이 11 |
| isClearTrack | int | 예 | 저장 후 궤적 삭제 여부 |
| modeArr | array[int] | 예 | 트리거 방식: 0-길게 누름 트리거 포트, 1-짧게 누름 트리거 포트, 배열 길이 11 |
| parameterArr | array[int] | 예 | 파라미터, 배열 길이 11 |
| portArr | array[int] | 예 | 트리거 포트, 배열 길이 11 |

**요청 예시:**

```json
{
  "_isFunctionalControl": true,
  "hardwareTypeArr": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "isClearTrack": 1,
  "modeArr": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "parameterArr": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "portArr": [1, 2, 3, 4, 5, 0, 6, 7, 8, 9, 10]
}
```

---

### 6. 동역학 파라미터

> 동역학 식별은 정장착 일반 6축, 무부하만 지원하며, 식별 관련 파라미터 설정

#### 궤적 파라미터 설정

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x7601 | TRAJECTORY_PARAM_SET | |

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| traSize | double | 예 | 궤적 범위 |
| traVel | double | 예 | 궤적 속도 |

**요청 예시:**

```json
{
  "traSize": 10.0,
  "traVel": 100.0
}
```

#### 식별 궤적 파라미터 조회

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x7602 | TRAJECTORY_PARAM_INQUIRE | |

**요청 파라미터:** 없음

#### 컨트롤러 응답

| 필드 | 타입 | 설명 |
|------|------|------|
| 0x7603 | TRAJECTORY_PARAM_RESPOND | |

---

## 큐 모드 모션 통신

### 1. socket 제어 추가 모션

#### 1.1 socket 직접 제어 모션 모드 활성화/비활성화

활성화하면 특수한 동작 모드로 진입하며, 비활성화 후에는 수동으로 티치 모드로 전환해야 합니다.

**메시지 ID:** `0x50B1` DIRECTMOTION_MODE_SET

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| robot | number | 예 | 로봇 번호 (1, 2, 3, 4) |
| open | boolean | 예 | true=활성화, false=비활성화 |

**요청 예시:**

```json
{
  "robot": 1,
  "open": true
}
```

---

#### 1.2 컨트롤러가 활성화 성공/실패를 반환

**메시지 ID:** `0x50B3` DIRECTMOTION_MODE_RESPOND

**응답 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| robot | number | 로봇 번호 |
| open | boolean | 현재 상태 |

**응답 예시:**

```json
{
  "robot": 1,
  "open": true
}
```

---

#### 1.3 작업 파일 명령 큐 송신

**메시지 ID:** `0x50B4` DIRECTMOTION_INSERT_INSTRVEC

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| robot | number | 예 | 로봇 번호 |
| data | array | 예 | 명령 json 리스트 |

**data 배열 요소 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| type | number | 예 | 명령 타입: 1=포인트 투 포인트, 2=직선, 3=원호, 4=정원 |
| positionId | string | 조건부 | 글로벌 포인트 (전역 GP 포인트 사용 시 필수) |
| RobotPos | object | 조건부 | 사용자 정의 포인트 (자동 포인트 사용 시 필수) |
| ParaACC | object | 예 | 가속도 파라미터 |
| ParaDEC | object | 예 | 감속도 파라미터 |
| ParaV | object | 예 | 속도 파라미터 |
| ParaPL | object | 예 | 평활 파라미터 |
| ParaTIME | object | 예 | 사전 실행 시간(ms) |
| ParaSPIN | object | 아니오 | 원호 및 정원 명령: 0=자세 불변, 1=6축 비회전, 2=6축 회전 |
| ParaSYNC | object | 아니오 | 포지셔너 동기화 여부 |
| imovecoord | string | 아니오 | 이동 좌표계 |
| ctype | number | 아니오 | 좌표계 타입 |
| length | number | 아니오 | 길이 |
| radius | number | 아니오 | 반경 |
| margin | number | 아니오 | 경계 |
| offsetAxis | number | 아니오 | 축 오프셋 |
| polish | number | 아니오 | 연마 파라미터 |
| polishAngle | number | 아니오 | 연마 각도 |
| polishID | number | 아니오 | 연마 ID |
| posidname | string | 아니오 | 포인트명 |
| posidtype | number | 아니오 | 포인트 타입 |
| logout | boolean | 아니오 | 로그아웃 |
| para | number | 아니오 | 예약 파라미터 |
| side | number | 아니오 | 측면 |
| userParamInt | number | 아니오 | 사용자 정의 정수 |
| userParamString | string | 아니오 | 사용자 정의 문자열 |
| width | number | 아니오 | 너비 |

**ParaACC / ParaDEC / ParaV / ParaPL / ParaTIME / ParaSPIN / ParaSYNC 파라미터 구조:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| data | number | 예 | 파라미터 값 |
| m_vUnit | number | 조건부 | 속도 단위 (ParaV 사용 시 필수): 0=cm/s, 1=mm/s, 2=비율 |
| secondvalue | number | 아니오 | 두 번째 값 |
| value | number | 아니오 | 구버전 파라미터 값 |
| varname | string | 아니오 | 변수명 |

**RobotPos 파라미터 구조:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| ctype | number | 예 | 좌표계 타입: 0-관절, 1-직각, 2-도구, 3-사용자 |
| data | array | 예 | 위치 데이터 배열 |
| key | string | 아니오 | 키명 |
| paraVarData | array | 아니오 | 파라미터 변수 데이터 |

**data 배열 좌표 설명 (ctype가 좌표계 결정):**

| 인덱스 | 명칭 | 설명 |
|------|------|------|
| 0 | 좌표계 | 0-관절, 1-직각, 2-도구, 3-사용자 |
| 1 | 단위 | 각도-0, 라디안-1 |
| 2 | 형태 | 형태 값 |
| 3 | 도구 공정 번호 | 도구 번호 |
| 4 | 사용자 공정 번호 | 사용자 번호 |
| 5-6 | 예약 | 예약 필드 |
| 7 | J1/X | X 좌표값 |
| 8 | J2/Y | Y 좌표값 |
| 9 | J3 | J3 값 |
| 10 | J4 | J4 값 |
| 11 | J5 | J5 값 |
| 12 | J6 | J6 값 |
| 13 | J7 | J7 값 |
| 14-19 | 사전 설정 값 | 사전 설정 위치 데이터 |

---

#### 1.4 사례 1: 전역 GP 포인트 사용

```json
{
  "data": [
    {
      "ParaACC": {"data": 25.0, "secondvalue": 0, "value": 0, "varname": ""},
      "ParaDEC": {"data": 25.0, "secondvalue": 0, "value": 0, "varname": ""},
      "ParaPL": {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      "ParaSPIN": {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      "ParaSYNC": {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      "ParaTIME": {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      "ParaV": {"data": 25.0, "m_vUnit": 2, "secondvalue": 0, "value": 0, "varname": ""},
      "ctype": 0,
      "imovecoord": "UF",
      "length": 0.0,
      "logout": false,
      "margin": 0.0,
      "offsetAxis": 0,
      "para": 0,
      "polish": 0,
      "polishAngle": 0.0,
      "polishID": 1,
      "posidname": "",
      "posidtype": 0,
      "positionId": "GP0015",
      "radius": 0.0,
      "side": 0.0,
      "type": 1,
      "userParamInt": 0,
      "userParamString": "",
      "width": 0.0
    },
    {
      "ParaACC": {"data": 100.0, "secondvalue": 0, "value": 0, "varname": ""},
      "ParaDEC": {"data": 100.0, "secondvalue": 0, "value": 0, "varname": ""},
      "ParaPL": {"data": 5.0, "secondvalue": 0, "value": 0, "varname": ""},
      "ParaSPIN": {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      "ParaSYNC": {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      "ParaTIME": {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      "ParaV": {"data": 1000.0, "m_vUnit": 1, "secondvalue": 0, "value": 0, "varname": ""},
      "ctype": 0,
      "imovecoord": "UF",
      "length": 0.0,
      "logout": false,
      "margin": 0.0,
      "offsetAxis": 0,
      "para": 0,
      "polish": 0,
      "polishAngle": 0.0,
      "polishID": 1,
      "posidname": "",
      "posidtype": 0,
      "positionId": "GP0001",
      "radius": 0.0,
      "side": 0.0,
      "type": 2,
      "userParamInt": 0,
      "userParamString": "",
      "width": 0.0
    }
  ],
  "robot": 1
}
```

---

#### 1.5 사례 2: 자동 포인트 사용

```json
{
  "data": [
    {
      "ParaACC": {"data": 10.0, "secondvalue": 0, "value": 0, "varname": ""},
      "ParaDEC": {"data": 10.0, "secondvalue": 0, "value": 0, "varname": ""},
      "ParaPL": {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      "ParaSPIN": {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      "ParaSYNC": {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      "ParaTIME": {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      "ParaV": {"data": 10.0, "m_vUnit": 2, "secondvalue": 0, "value": 0, "varname": ""},
      "RobotPos": {
        "ctype": 1,
        "data": [0.0, 0.0, 8.0, 0.0, 0.0, 0.0, 0.0, 0.999998884198, 1.999999207078, 2.999999330055, 3.999999217981, 4.999999652293, 5.999998732478, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        "key": "",
        "paraVarData": [
          {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
          {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
          {"data": 8.0, "secondvalue": 0, "value": 0, "varname": ""},
          {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
          {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
          {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
          {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
          {"data": 0.999998884198, "secondvalue": 0, "value": 0, "varname": ""},
          {"data": 1.999999207078, "secondvalue": 0, "value": 0, "varname": ""},
          {"data": 2.999999330055, "secondvalue": 0, "value": 0, "varname": ""},
          {"data": 3.999999217981, "secondvalue": 0, "value": 0, "varname": ""},
          {"data": 4.999999652293, "secondvalue": 0, "value": 0, "varname": ""},
          {"data": 5.999998732478, "secondvalue": 0, "value": 0, "varname": ""},
          {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
          {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
          {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
          {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
          {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
          {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
          {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""}
        ]
      },
      "ctype": 0,
      "imovecoord": "UF",
      "length": 0.0,
      "logout": false,
      "margin": 0.0,
      "offsetAxis": 0,
      "para": 0,
      "polish": 0,
      "polishAngle": 0.0,
      "polishID": 1,
      "posidname": "",
      "posidtype": 0,
      "positionId": "",
      "radius": 0.0,
      "side": 0.0,
      "type": 1,
      "userParamInt": 0,
      "userParamString": "",
      "width": 0.0
    }
  ],
  "robot": 1
}
```

---

#### 1.6 추가 실행 일시정지

**메시지 ID:** `0x50B7` DIRECTMOTION_MODE_SUSPEND

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| robot | number | 예 | 로봇 번호 (1, 2, 3, 4) |

**요청 예시:**

```json
{
  "robot": 1
}
```

---

#### 1.7 추가 실행 시작 (일시정지 후 사용)

**메시지 ID:** `0x50B8` DIRECTMOTION_MODE_START

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| robot | number | 예 | 로봇 번호 (1, 2, 3, 4) |

**요청 예시:**

```json
{
  "robot": 1
}
```

---

#### 1.8 추가 실행 정지

**메시지 ID:** `0x50B9` DIRECTMOTION_MODE_STOP

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| robot | number | 예 | 로봇 번호 (1, 2, 3, 4) |

**요청 예시:**

```json
{
  "robot": 1
}
```

---

#### 1.9 큐 모드 정지 시 전원 미차단 설정

**메시지 ID:** `0x50BA`

**요청 파라미터:**

| 파라미터명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| robot | number | 예 | 로봇 번호 (1, 2, 3, 4) |

**요청 예시:**

```json
{
  "robot": 1
}
```

---

## 캘리브레이션

### 도구 캘리브레이션

![도구 캘리브레이션 설정 인터페이스](assets/json-01.png)

#### 0x3801 TOOLCALIBRATION_SET

도구 캘리브레이션 설정

**요청 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| toolNum | int | 도구 번호 |
| calibrationPointNum | int | 6점 캘리브레이션 또는 7점 캘리브레이션 설정 |

**요청 예시:**

```json
{
  "toolNum": 2,
  "calibrationPointNum": 6
}
```

---

#### 0x3804 TOOLCALIBRATION_RESULT

캘리브레이션 계산 완료 응답

**응답 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| result | bool | 계산 성공 여부 |

**응답 예시:**

```json
{
  "result": true
}
```

![도구 캘리브레이션 계산 완료 알림](assets/json-02.png)

---

#### 0x3802 TOOLCALIBRATION_INQUIRE

캘리브레이션 포인트 데이터 조회

**요청 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| pointNum | int | 인덱스 0~6 |
| toolNum | int | 도구 번호 |

**요청 예시:**

```json
{
  "pointNum": 2,
  "toolNum": 1
}
```

---

#### 0x3803 TOOLCALIBRATION_RESPOND

캘리브레이션 포인트 데이터 반환

**응답 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| pointNum | int | 인덱스 0~6 |
| pos | array[6] | 위치 데이터 [x,y,z,rx,ry,rz] |

**응답 예시:**

```json
{
  "pointNum": 2,
  "pos": [0, 0, 0, 0, 0, 0]
}
```

---

#### 0x3815 TOOL_CALIBRATION_POINTS_STATUS_INQUIRE

캘리브레이션 상태 조회

**요청 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| toolNum | int | 도구 번호 |

**요청 예시:**

```json
{
  "toolNum": 2
}
```

---

#### 0x3816 TOOL_CALIBRATION_POINTS_STATUS_RESPOND

캘리브레이션 상태 반환

**응답 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| status | array[7] | 캘리브레이션 상태: 1=캘리브레이션 완료, 0=캘리브레이션 대기 |

**응답 예시:**

```json
{
  "status": [1, 0, 1, 0, 1, 0, 1]
}
```

---

#### 0x3817 TOOL_CALIBRATION_POINTS_STATUS_CLEAR

캘리브레이션 삭제

**요청 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| pointNum | int | 인덱스 0~6 |
| toolNum | int | 도구 번호 |

**요청 예시:**

```json
{
  "pointNum": 2,
  "toolNum": 1
}
```

![캘리브레이션 삭제 작업 인터페이스](assets/json-03.png)

---

#### 0x3805 TOOLPARAMETER_SET

도구 파라미터 설정

**요청 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| tool.A | float | A축 회전 각도 |
| tool.B | float | B축 회전 각도 |
| tool.C | float | C축 회전 각도 |
| tool.note | string | 주석 |
| tool.payload_inertia | float | 부하 관성 |
| tool.payload_mass | float | 부하 질량 |
| tool.payload_mass_center_X | float | 부하 질량 중심 X |
| tool.payload_mass_center_Y | float | 부하 질량 중심 Y |
| tool.payload_mass_center_Z | float | 부하 질량 중심 Z |
| tool.x | float | X축 오프셋 |
| tool.y | float | Y축 오프셋 |
| tool.z | float | Z축 오프셋 |
| toolNum | int | 도구 번호 |

**요청 예시:**

```json
{
  "tool": {
    "A": 3.0,
    "B": 3.0,
    "C": 3.0,
    "note": "",
    "payload_inertia": 5.0,
    "payload_mass": 4.0,
    "payload_mass_center_X": 6.0,
    "payload_mass_center_Y": 7.0,
    "payload_mass_center_Z": 8.0,
    "x": 1.0,
    "y": 2.0,
    "z": 3.0
  },
  "toolNum": 1
}
```

---

#### 0x3806 TOOLPARAMETER_INQUIRE

도구 파라미터 조회

**요청 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| toolNum | int | 도구 번호 |

**요청 예시:**

```json
{
  "toolNum": 2
}
```

---

#### 0x3807 TOOLPARAMETER_RESPOND

도구 파라미터 반환

응답 형식은 0x3805와 동일

---

#### 0x380A TOOLNUMBER_SWITCH

도구 전환

**요청 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| robot | int | 로봇 번호 1-4 |
| curToolNum | int | 현재 도구 번호 |

**요청 예시:**

```json
{
  "robot": 1,
  "curToolNum": 2
}
```

---

#### 0x380B TOOLNUMBER_INQUIRE

현재 도구 조회

**요청 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| robot | int | 로봇 번호 1-4 |

**요청 예시:**

```json
{
  "robot": 1
}
```

---

#### 0x380C TOOLNUMBER_RESPOND

현재 도구 반환

**응답 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| robot | int | 로봇 번호 1-4 |
| curToolNum | int | 현재 도구 번호 |

**응답 예시:**

```json
{
  "robot": 1,
  "curToolNum": 2
}
```

---

#### 0x3812 TOOL_CALIBRATION_POINTS_POS_INQUIRE

캘리브레이션된 포인트 데이터 조회

**요청 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| pointNum | int | 인덱스 0~6, 총 7개 포인트 |
| toolNum | int | 도구 번호 |

**요청 예시:**

```json
{
  "pointNum": 0,
  "toolNum": 1
}
```

---

#### 0x3813 TOOL_CALIBRATION_POINTS_POS_RESPOND

캘리브레이션된 포인트 데이터 반환

**응답 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| pointNum | int | 인덱스 0~6 |
| pos | array[6] | 위치 데이터 [x,y,z,rx,ry,rz] |

**응답 예시:**

```json
{
  "pointNum": 0,
  "pos": [0, 0, 0, 0, 0, 0]
}
```

![캘리브레이션된 포인트 위치 데이터 조회 결과](assets/json-04.png)

---

### 사용자 좌표 보정

#### 0x3C01 USERCALIBRATION_CALC

사용자 좌표 보정 설정

**요청 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| userNum | int | 사용자 좌표 번호 |

**요청 예시:**

```json
{
  "userNum": 1
}
```

---

#### 0x3C02 USERCALIBRATION_RESULT

사용자 좌표 보정 결과 반환

**응답 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| result | bool | true=캘리브레이션 성공, false=캘리브레이션 실패 |
| status.O | bool | O 포인트 상태 |
| status.X | bool | X 포인트 상태 |
| status.Y | bool | Y 포인트 상태 |

**응답 예시:**

```json
{
  "result": true,
  "status": {
    "O": false,
    "X": false,
    "Y": false
  }
}
```

---

#### 0x3C03 USERCALIBRATION_RECORD

사용자 원점, X, Y 값 마킹

**요청 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| userNum | int | 사용자 좌표 번호 |
| inquire | string | 값 "O", "X", "Y" 또는 "OXY" |
| posZero | array[6] | 원점 마킹 (라디안), inquire가 "OXY"일 때 존재 |
| posX | array[6] | X 값 마킹 (라디안), inquire가 "OXY"일 때 존재 |
| posY | array[6] | Y 값 마킹 (라디안), inquire가 "OXY"일 때 존재 |

**요청 예시:**

```json
{
  "userNum": 1,
  "inquire": "X",
  "posZero": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  "posX": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  "posY": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
}
```

---

#### 0x3C04 USERCALIBRATION_RECORD_RESPOND

마킹 결과 응답

**응답 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| userNum | int | 사용자 좌표 번호 |
| inquire | string | 값 "O", "X", "Y" |
| status | bool | 상태 |
| pos | array[6] | 라디안 위치 데이터 |
| posDeg | array[6] | 각도 위치 데이터 |

**응답 예시:**

```json
{
  "userNum": 1,
  "inquire": "X",
  "status": true,
  "pos": [0, 0, 0, 0, 0, 0],
  "posDeg": [0, 0, 0, 0, 0, 0]
}
```

![사용자 좌표 마킹 결과 응답](assets/json-05.png)

---

#### 0x3C07 USERPARAMETER_SET

사용자 좌표 설정

**요청 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| pos | array[6] | 사용자 좌표 위치 [x,y,z,rx,ry,rz] |
| userNum | int | 사용자 좌표 번호 |

**요청 예시:**

```json
{
  "pos": [460.0, 0.0, 637.0, 0.0, 3.10, 3.0],
  "userNum": 1
}
```

---

#### 0x3C08 USERPOSDATA_INQUIRE

사용자 좌표 조회

**요청 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| userNum | int | 사용자 좌표 번호 |
| inquire | string | 조회 타입: "Calibration", "O", "X", "Y" |

**요청 예시:**

```json
{
  "userNum": 1,
  "inquire": "Calibration"
}
```

---

#### 0x3C09 USERPOSDATA_RESPOND

사용자 좌표 조회 응답

**응답 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| userNum | int | 사용자 좌표 번호 |
| inquire | string | 조회 타입 |
| status | bool | 상태 |
| pos | array[6] | 라디안 위치 데이터 |
| posDeg | array[6] | 각도 위치 데이터 |

**응답 예시:**

```json
{
  "userNum": 1,
  "inquire": "Calibration",
  "status": false,
  "pos": [0, 0, 0, 0, 0, 0],
  "posDeg": [0, 0, 0, 0, 0, 0]
}
```

---

#### 0x3C0A USERCOORDINATE_SWITCH

사용자 좌표 번호 설정

**요청 파라미터:**

| 파라미터명 | 타입 | 설명 |
|--------|------|------|
| robot | int | 로봇 번호 1-4 |
| userNum | int | 사용자 좌표 번호 |

**요청 예시:**

```json
{
  "robot": 1,
  "userNum": 1
}
```

---

## 3D 마우스 제어

### 감도 설정 송신

**0x7301** THREED_MOUSE_SET

**요청 파라미터:**

| 파라미터 | 타입 | 설명 |
|------|------|------|
| ABC | int | 자세 ABC |
| mouseSen | int[4] | 마우스 감도 xyz 및 자세 감도 (0-300) |

**요청 예시:**

```json
{
  "ABC": 4,
  "mouseSen": [128, 128, 128, 128]
}
```

---

### 감도 조회

**0x7302** THREED_MOUSE_INQUIRE

**data: 없음**

---

### 컨트롤러 응답

**0x7303** THREED_MOUSE_RESPOND

**응답 파라미터:**

| 파라미터 | 타입 | 설명 |
|------|------|------|
| ABC | int | 자세 ABC |
| mouseSen | int[4] | 마우스 감도 xyz 및 자세 감도 (0-300) |

**응답 예시:**

```json
{
  "ABC": 4,
  "mouseSen": [128, 128, 128, 128]
}
```

---

### 3D 마우스 영점 마킹 송신

**0x7304** THREED_MOUSE_SETZERO

**data: 없음**

---

### 영점 마킹 상태 조회

**0x7305** THREED_MOUSE_SETZERO_INQUIRE

**data: 없음**

---

### 컨트롤러 응답

**0x7306** THREED_MOUSE_SETZERO_RESPOND

**응답 파라미터:**

| 파라미터 | 타입 | 설명 |
|------|------|------|
| zeroTagged | int | 0: 마킹되지 않음, 1: 마킹됨, 2: 통신 실패 |

**응답 예시:**

```json
{
  "zeroTagged": 0
}
```

---

### 3D 마우스 정방향 마킹 설정

**0x7307** THREED_MOUSE_SIGN_DIRECTION

**요청 파라미터:**

| 파라미터 | 타입 | 설명 |
|------|------|------|
| axis | int | 1은 X 정방향 마킹, 2: Y, 3: Z |

**요청 예시:**

```json
{
  "axis": 1
}
```

---

### 3D 마우스 정방향 마킹 상태 조회

**0x7308** THREED_MOUSE_SIGN_DIRECTION_INQUIRE

**data: 없음**

---

### 3D 마우스 정방향 마킹 상태 조회, 컨트롤러 응답

**0x7309** THREED_MOUSE_SIGN_DIRECTION_RESPOND

**응답 파라미터:**

| 파라미터 | 타입 | 설명 |
|------|------|------|
| xTagged | int | X 정방향 0: 실패, 1: 성공, 2: 캘리브레이션 중 |
| yTagged | int | Y 정방향 0: 실패, 1: 성공, 2: 캘리브레이션 중 |
| zTagged | int | Z 정방향 0: 실패, 1: 성공, 2: 캘리브레이션 중 |

**응답 예시:**

```json
{
  "xTagged": 0,
  "yTagged": 0,
  "zTagged": 0
}
```

---

### 페이지 종료 시 티치 펜던트 송신

**0x730A** PAGE_BACK

**요청 파라미터:**

| 파라미터 | 타입 | 설명 |
|------|------|------|
| pageBack | int | 3D 마우스 포인트 마킹 방향은 마킹되지 않았지만 직접 인터페이스를 전환할 때 컨트롤러에 마킹 방향 스레드 종료를 알림 |

**요청 예시:**

```json
{
  "pageBack": 1
}
```

---

### 3D 마우스 포트 번호 설정

**0x730B** THREED_MOUSE_SET_PORT

**요청 파라미터:**

| 파라미터 | 타입 | 설명 | 값 범위 |
|------|------|------|----------|
| port | int | 포트 번호 | 1-10 |

**요청 예시:**

```json
{
  "port": 1
}
```

---

### 3D 마우스 포트 번호 조회

**0x730C** THREED_MOUSE_INQUIRE_PORT

**data: {}**

---

### 조회 결과 반환

**0x730D** THREED_MOUSE_RESPOND_PORT

**응답 파라미터:**

| 파라미터 | 타입 | 설명 | 값 범위 |
|------|------|------|----------|
| port | int | 포트 번호 | 1-10 |

**응답 예시:**

```json
{
  "port": 1
}
```
