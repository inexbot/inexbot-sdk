# 파라미터 설정

## 1. 로봇 타입

**설명:** 현재 로봇 타입을 조회합니다.

### 상위 시스템에서 로봇 타입 조회

- **명령어:** `0x2000`

```json
{}
```

### 컨트롤러 응답 로봇 타입

- **명령어:** `0x2001`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| type | int | 로봇 타입 번호, 값 범위[0,35] |

```json
{
  "type": 0
}
```

### 로봇 타입 매핑 테이블

| 타입 값 | 설명 |
|--------|------|
| 0 | 선택되지 않은 로봇 타입 |
| 1 | 6축 직렬 다관절 |
| 2 | 6축 협동 |
| 3 | 6축 도장 로봇 |
| 4 | 6축 비표준 2 |
| 5 | 5축 로봇 |
| 6 | 4축 SCARA 로봇 |
| 7 | 4축 SCARA 비표준 1 로봇 |
| 8 | 4축 링크 팔레타이징 로봇 |
| 9 | 4축 팔레타이징 스크류 로봇 |
| 10 | 4축 로봇 |
| 11 | 4축 직각 로봇 |
| 12 | 4축 극좌표 비표준 로봇 |
| 13 | 3축 SCARA 로봇 |
| 14 | 3축 직각 로봇 |
| 15 | 3축 비표준 1 로봇 |
| 16 | 2축 SCARA 로봇 |
| 17 | 7축 범용 로봇 |
| 18 | 1축 로봇 |
| 19 | 5축 갠트리 용접 로봇 |
| 20 | delta 로봇 (4축 병렬 로봇) |
| 21 | 와인 챔버 모델 |
| 22 | 5축 갠트리 용접 로봇 타입 2 |
| 23 | 4축 직각 비표준 1 로봇 |
| 24 | 6축 갠트리 용접 로봇 |
| 25 | 5축 하이브리드 로봇 |
| 26 | 4축 SCARA 비표준 2 |
| 27 | 6축 비표준 3 |
| 28 | 3축 SCARA 비표준 1 |
| 29 | delta2D 병렬 로봇 모델 |
| 30 | 5축 갠트리 용접 로봇 타입 3 |
| 31 | 3축 직렬 비표준 1 |
| 32 | 5축 협동 로봇 |
| 33 | 4축 SCARA 비표준 3 로봇 |
| 34 | 6축 직렬 - CBBARA |
| 35 | 고하중 기둥 회전 4축 |

---

## 2. 로봇 타입 및 매핑

**설명:** 모든 로봇 타입 및 서보 매핑의 조회 및 설정

### 상위 시스템에서 로봇 타입 및 매핑 설정

- **명령어:** `0x2002`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| sum | int | 로봇 수, 값 범위[1,4] |
| robot | array | 로봇 파라미터 목록, 로봇 타입, 서보 매핑, 주석 포함 |

```json
{
  "robot":
  [
    {
      "note":"",
      "robotType":"R_GENERAL_7S",
      "servoMap":[0,0,0,0,0,0,0]
    },
    {
      "note":"",
      "robotType":"R_GENERAL_5S",
      "servoMap":[0,0,0,0,0]
    },
    {
      "note":"",
      "robotType":"R_GENERAL_6S",
      "servoMap":[0,0,0,0,0,0]
    }
  ],
  "sum":3
}
```

**robot 서브 오브젝트 파라미터:**

| 파라미터 | 타입 | 설명 |
|------|------|------|
| robotType | string | 로봇 타입 식별자 |
| servoMap | array | 서보 매핑 목록, int 타입, 길이는 로봇 축 수 |
| note | string | 주석 |

**robotType 타입 매핑 테이블:**

| 타입 식별자 | 설명 |
|----------|------|
| R_NULL | 선택되지 않은 로봇 타입 |
| R_GENERAL_6S | 6축 직렬 다관절 |
| R_GENERAL_6S_1 | 6축 협동 |
| R_SIXAXIS_SPRAY_BBR | 6축 도장 로봇 |
| R_GENERAL_6S_2 | 6축 비표준 2 |
| R_GENERAL_5S | 5축 로봇 |
| R_SCARA | 4축 SCARA 로봇 |
| R_SCARA_1 | 4축 SCARA 비표준 1 로봇 |
| R_FOURAXIS_PALLET | 4축 링크 팔레타이징 로봇 |
| R_FOURAXIS_PALLET_1 | 4축 팔레타이징 스크류 로봇 |
| R_FOURAXIS | 4축 로봇 |
| R_FOUR_CARTESIAN_COORDINATE | 4축 직각 로봇 |
| R_FOUR_POLAR_COORDINATE_1 | 4축 극좌표 비표준 로봇 |
| R_SCARA_THREEAXIS | 3축 SCARA 로봇 |
| R_THREE_CARTESIAN_COORDINATE | 3축 직각 로봇 |
| R_THREE_CARTESIAN_COORDINATE_1 | 3축 비표준 1 로봇 |
| R_SCARA_TWOAXIS | 2축 SCARA 로봇 |
| R_GENERAL_7S | 7축 범용 로봇 |
| R_GENERAL_1S | 1축 로봇 |
| R_GANTRY_WELD | 5축 갠트리 용접 로봇 |
| R_DELTA | delta 로봇 (4축 병렬 로봇) |
| R_WINE_CHAMFER | 와인 챔버 모델 |
| R_GANTRY_WELD_2 | 5축 갠트리 용접 로봇 타입 2 |
| R_FOUR_CARTESIAN_COORDINATE_1 | 4축 직각 비표준 1 로봇 |
| R_GANTRY_WELD_6 | 6축 갠트리 용접 로봇 |
| FIVE_AXLE_MIXED | 5축 하이브리드 로봇 |
| R_SCARA_FOURAXIS_2 | 4축 SCARA 비표준 2 |
| R_SIX_AXLE_ABNORMITY_3 | 6축 비표준 3 |
| R_SCARA_THREEAXIS_1 | 3축 SCARA 비표준 1 |
| R_DELTA_2D_ | delta2D 병렬 로봇 모델 |
| R_GANTRY_WELD_3 | 5축 갠트리 용접 로봇 타입 3 |
| R_GENERAL_3S_1 | 3축 직렬 비표준 1 |
| R_GENERAL_5S_COLLABORATIVE_ | 5축 협동 로봇 |
| R_SCARA_3_ | 4축 SCARA 비표준 3 로봇 |
| R_GENERAL_6S_CBBARA_ | 6축 직렬 - CBBARA |
| R_HEAVY_DUTY_FOUR_AXIS_ | 고하중 기둥 회전 4축 |

### 상위 시스템에서 로봇 타입 및 매핑 조회

- **명령어:** `0x2003`

```json
{}
```

### 컨트롤러 응답 로봇 타입 및 매핑

- **명령어:** `0x2004`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| sum | int | 로봇 수, 범위[1,4] |
| servoSum | int | 서보 개수 |
| robot | array | 로봇 파라미터 목록 |

```json
{
  "robot":
  [
    {
      "note":"",
      "robotType":"R_GENERAL_7S",
      "servoMap":[0,0,0,0,0,0,0]
    },
    {
      "note":"",
      "robotType":"R_GENERAL_5S",
      "servoMap":[0,0,0,0,0]
    },
    {
      "note":"",
      "robotType":"R_GENERAL_6S",
      "servoMap":[0,0,0,0,0,0]
    }
  ],
  "servoSum":0,
  "sum":3
}
```

---

## 3. 로봇 수

**설명:** 로봇 수를 조회합니다.

### 상위 시스템에서 로봇 수 조회

- **명령어:** `0x2010`

```json
{}
```

### 컨트롤러 응답 로봇 수

- **명령어:** `0x2011`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| sum | int | 로봇 수, 범위[1,4] |

```json
{
  "sum": 1
}
```

---

## 4. 로봇 통신 주기

**설명:** 로봇 통신 주기, 보드 레이트, 서보 제어 워드, 프레임 손실 허용 오차 파라미터의 설정 및 조회. 보드 레이트, 서보 제어 워드, 프레임 손실 허용 오차는 canopen 통신 시 작동하며, 컨트롤러 재시작 후 적용됩니다.

### 상위 시스템에서 로봇 통신 주기 설정

- **명령어:** `0x2020`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| baudRate | string | 보드 레이트, 값: "10K","20K","50K","100K","500K","800K","1000K" |
| controlCycle | int | 통신 주기, 값 범위: 1,2,4,8 ms |
| control_word | int | 서보 제어 워드, 값 범위[7,8] |
| pdo_lost_tolerance | int | 프레임 손실 허용 오차, 값 범위[1,5] |

```json
{
  "baudRate":"500K",
  "controlCycle":1,
  "control_word":7,
  "pdo_lost_tolerance":2
}
```

### 상위 시스템에서 로봇 통신 주기 조회

- **명령어:** `0x2021`

```json
{}
```

### 컨트롤러 응답 로봇 통신 주기

- **명령어:** `0x2022`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| baudRate | string | 보드 레이트, 범위: "10K","20K","50K","100K","500K","800K","1000K" |
| busType | int | 통신 방식, 범위 1,16; 1은 etherCat 통신, 16은 CanOpen 통신 |
| controlCycle | int | 통신 주기, 범위 1,2,4,8 ms |
| control_word | int | 서보 제어 워드, 범위[7,8] |
| pdo_lost_tolerance | int | 프레임 손실 허용 오차, 범위[1,5] |

```json
{
  "baudRate":"500K",
  "busType":1,
  "controlCycle":1,
  "control_word":7,
  "pdo_lost_tolerance":2
}
```

---

## 5. 로봇 동기 축

**설명:** 로봇 외부 축 파라미터 설정 및 조회

### 상위 시스템에서 로봇 동기 축 설정

- **명령어:** `0x2030`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| sum | int | 외부 축 그룹 수, 범위[0,12] |
| extGroup | array | 외부 축 파라미터 목록, 외부 축 타입, 서보 매핑, 주석 포함 |

**extGroup 서브 오브젝트 파라미터:**

| 파라미터 | 타입 | 설명 |
|------|------|------|
| groupType | int | 외부 축 타입, 범위[0,5] |
| servoMap | array | 서보 매핑 목록, int 타입, 길이는 3 |
| note | string | 주석 |

**groupType 타입 설명:**

| 타입 값 | 설명 |
|--------|------|
| 0 | 외부 축 없음 |
| 1 | 회전 단일 축 |
| 2 | 회전 이중 축 |
| 3 | 직선 단일 축 |
| 4 | 직선 이중 축 |
| 5 | 직선 삼축 |

```json
{
  "extGroup":
  [
    {
      "note":"",
      "groupType":1,
      "servoMap":[0,0,0]
    },
  ],
  "sum":1
}
```

### 상위 시스템에서 로봇 동기 축 조회

- **명령어:** `0x2031`

```json
{}
```

### 컨트롤러 응답 로봇 동기 축

- **명령어:** `0x2032`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| sum | int | 외부 축 그룹 수, 범위[0,12] |
| servoSum | int | 서보 개수 |
| extGroup | array | 외부 축 파라미터 목록 |

```json
{
  "extGroup":
  [
    {
      "note":"",
      "groupType":1,
      "servoMap":[0,0,0]
    },
  ],
  "servoSum":0,
  "sum":1
}
```

---

## 6. 로봇 축 그룹 조합

**설명:** 여러 로봇이 존재할 때, 동일한 외부 축 그룹을 공유할 수 없습니다.

### 상위 시스템에서 로봇 축 그룹 조합 설정

- **명령어:** `0x2040`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| binding | array | 축 그룹 조합 목록, 길이는 로봇 수 |

**binding 서브 오브젝트 파라미터:**

| 파라미터 | 타입 | 설명 |
|------|------|------|
| note | string | 주석 |
| extGroupSum | int | 로봇이 바인딩된 외부 축 그룹 수, 범위[0,3] |
| extGroupNum | array | 외부 축 그룹 바인딩 목록, 길이는 3, 범위는 0~설정된 동기 축 수 |

```json
{
  "binding":
  [
    {
      "extGroupNum":[1,2,0],
      "extGroupSum":2,
      "note":""
    },
    {
      "extGroupNum":[0,0,0],
      "extGroupSum":0,
      "note":""
    },
  ],
}
```

### 상위 시스템에서 로봇 축 그룹 조합 조회

- **명령어:** `0x2041`

```json
{}
```

### 컨트롤러 응답 로봇 축 그룹 조합

- **명령어:** `0x2042`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| sum | int | 로봇 수, 범위[1,4] |
| binding | array | 축 그룹 조합 목록 |

**binding 서브 오브젝트 파라미터:**

| 파라미터 | 타입 | 설명 |
|------|------|------|
| note | string | 주석 |
| extGroupSum | int | 로봇이 바인딩된 외부 축 그룹 수, 범위[0,3] |
| extGroupNum | array | 외부 축 그룹 바인딩 목록, 길이는 바인딩된 외부 축 그룹 수, 최소 1, 범위는 0~설정된 동기 축 수 |

```json
{
  "binding":
  [
    {
      "extGroupNum":[1,2],
      "extGroupSum":2,
      "note":""
    },
    {
      "extGroupNum":[0],
      "extGroupSum":0,
      "note":""
    },
  ],
  "sum":2
}
```

---

## 7. 로봇 축 종동 축 구성

**설명:** 로봇 또는 외부 축 관절 종동 축 구성의 설정 및 조회

### 상위 시스템에서 로봇 종동 축 구성 설정

- **명령어:** `0x2050`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| robot | array | 종동 축 구성 파라미터 전체 목록, 길이는 로봇 수 |

**robot 서브 오브젝트 파라미터:**

| 파라미터 | 타입 | 설명 |
|------|------|------|
| sum | int | 종동 축 수, 범위[0,3] |
| data | array | 종동 축 구성 파라미터 목록, 길이는 현재 로봇의 축 수 |

**data 서브 오브젝트 파라미터:**

| 파라미터 | 타입 | 설명 |
|------|------|------|
| dir | int | 주 모터 방향 대비 상대 방향, 범위[-1,1] |
| encoder | int | 엔코더 비트 수, 범위[1,32] |
| num | int | 서보 매핑 |
| reducRatio | double | 감속비, 범위[0,500] |

```json
{
  "robot":
  [
    [
      {
        "data":
        [
          {
            "dir":-1,
            "encoder":8,
            "num":0,
            "reducRatio":2.0
          },
          {
            "dir":1,
            "encoder":9,
            "num":0,
            "reducRatio":3.0
          },
        ],
        "sum":2
      },
      {
        "data":
        [
          {
            "dir":-1,
            "encoder":8,
            "num":0,
            "reducRatio":2.0
          },
        ],
        "sum":1
      },
      {
        "sum":0
      },
      {
        "sum":0
      },
      {
        "sum":0
      },
      {
        "sum":0
      }
    ],
    [
      {
        "data":
        [
          {
            "dir":-1,
            "encoder":8,
            "num":0,
            "reducRatio":2.0
          },
        ],
        "sum":1
      },
      {
        "sum":0
      },
      {
        "sum":0
      },
      {
        "sum":0
      },
      {
        "sum":0
      },
      {
        "sum":0
      }
    ]
  ]
}
```

### 상위 시스템에서 로봇 종동 축 구성 조회

- **명령어:** `0x2051`

```json
{}
```

### 컨트롤러 응답 로봇 종동 축 구성

- **명령어:** `0x2052`

```json
{
  "robot":
  [
    [
      {
        "data":
        [
          {
            "dir":-1,
            "encoder":8,
            "num":0,
            "reducRatio":2.0
          }
        ],
        "sum":1
      },
      {
        "sum":0
      },
      {
        "sum":0
      },
      {
        "sum":0
      },
      {
        "sum":0
      },
      {
        "sum":0
      }
    ]
  ]
}
```

### 상위 시스템에서 로봇 외부 축 종동 축 구성 설정

- **명령어:** `0x2053`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| external | array | 외부 축 종동 축 구성 파라미터 전체 목록, 길이는 외부 축 수 |

```json
{
  "external":
  [
    [
      {
        "data":
        [
          {
            "dir":1,
            "encoder":3,
            "num":0,
            "reducRatio":1.0
          }
        ],
        "sum":1
      }
    ],
    [
      {
        "sum":0
      },
      {
        "sum":0
      }
    ]
  ]
}
```

### 상위 시스템에서 로봇 외부 축 종동 축 구성 조회

- **명령어:** `0x2054`

```json
{}
```

### 컨트롤러 응답 로봇 외부 축 종동 축 구성

- **명령어:** `0x2055`

```json
{
  "external":
  [
    [
      {
        "data":
        [
          {
            "dir":1,
            "encoder":3,
            "num":0,
            "reducRatio":1.0
          }
        ],
        "sum":1
      }
    ],
    [
      {
        "sum":0
      },
      {
        "sum":0
      }
    ]
  ]
}
```

---

## 8. 로봇 운전 시간

**설명:** 현재 로봇 메인 프로그램 운전 시간을 조회합니다.

### 상위 시스템에서 로봇 메인 프로그램 운전 시간 조회

- **명령어:** `0x2060`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| robot | int | 조회할 로봇, 값 범위[1,4] |

```json
{
  "robot":1
}
```

### 컨트롤러 응답 로봇 메인 프로그램 운전 시간

- **명령어:** `0x2055`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| robot | int | 현재 로봇 번호, 범위[1,4] |
| time | int | 운전 시간, 단위 s |

```json
{
  "robot":1,
  "time":10
}
```

---

## 9. 로봇 파라미터 복사

**설명:** 로봇 파라미터를 다른 로봇으로 복사합니다. 파라미터는 본체를 제외한 여러 로봇으로 복사할 수 있으며, 파라미터 모델이 일치하지 않는 로봇은 복사가 실패합니다.

### 상위 시스템에서 로봇 파라미터 복사

- **명령어:** `0x2062`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| mainRobot | int | 파라미터를 복사할 로봇 번호 |
| copyToRobot | array | 파라미터를 복사할 로봇 목록, bool 타입, 길이는 4; true는 복사 실행, false는 복사 미실행 |

```json
{
  "copyToRobot":[false,true,false,false],
  "mainRobot":1
}
```

---

## 10. 협동 로봇

**설명:** 협동 로봇 관련 파라미터의 설정 및 조회. 듀얼 머신 협동, 브레이크 잠금 방지 등의 기능을 포함합니다.

### 상위 시스템에서 듀얼 머신 협동 모드 설정

- **명령어:** `0x2070`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| cooperationRobots | bool | 듀얼 머신 동기 모드 사용 여부, true는 사용, false는 미사용 |

```json
{
  "cooperationRobots":true
}
```

### 상위 시스템에서 듀얼 머신 협동 모드 조회

- **명령어:** `0x2071`

```json
{}
```

### 컨트롤러 응답 듀얼 머신 협동 모드

- **명령어:** `0x2072`

```json
{
  "cooperationRobots":true
}
```

### 상위 시스템에서 브레이크 잠금 방지 활성화 설정

- **명령어:** `0x2073`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| enable | bool | 브레이크 잠금 방지 활성화 스위치, true는 On, false는 Off |

```json
{
  "enable":true
}
```

### 상위 시스템에서 브레이크 잠금 방지 활성화 조회

- **명령어:** `0x2074`

```json
{}
```

### 컨트롤러 응답 브레이크 잠금 방지 활성화

- **명령어:** `0x2075`

```json
{
  "enable":true
}
```

### 상위 시스템에서 브레이크 잠금 방지 지연 설정

- **명령어:** `0x2076`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| enableDelay | double | 브레이크 잠금 방지 활성화 지연, 단위 s, 범위[0,99999.99] |
| brakeOnDelay | double | 브레이크 On 지연, 단위 s, 범위[0,99999.99] |
| brakeOffDelay | double | 브레이크 Off 지연, 단위 s, 범위[0,99999.99] |

```json
{
  "enableDelay":0.5,
  "brakeOnDelay":0.5,
  "brakeOffDelay":0.5
}
```

### 상위 시스템에서 브레이크 잠금 방지 지연 조회

- **명령어:** `0x2077`

```json
{}
```

### 컨트롤러 응답 브레이크 잠금 방지 지연

- **명령어:** `0x2078`

```json
{
  "enableDelay":0.5,
  "brakeOnDelay":0.5,
  "brakeOffDelay":0.5
}
```

### 상위 시스템에서 브레이크 파라미터 설정

- **명령어:** `0x2079`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| jointNum | int | 현재 설정된 관절 번호, 범위[1,6] |
| EncodeNum | int | 엔코더 개수, 범위[1,2]; 브레이크 타입이 핀 타입일 때 적용 |
| Encode1Resolusion | int | 엔코더 1 비트 수, 범위[0,99999]; 브레이크 타입이 핀 타입일 때 적용 |
| Encode2Resolusion | int | 엔코더 2 비트 수, 범위[0,99999]; 브레이크 타입이 핀 타입이고 엔코더 개수가 2일 때 적용; 엔코더 개수가 1일 때 0으로 설정 필요 |
| BrakeType | int | 브레이크 타입, 범위[1,2]; 1은 핀 타입, 2는 패드 타입 |
| Distance | double | 운동 거리, 범위[0,99999.99]; 브레이크 타입이 패드 타입일 때 0으로 설정 필요 |
| CheckDistance | double | 검사 거리, 범위[0,99999.99]; 브레이크 타입이 핀 타입이고 브레이크 잠금 방지 활성화가 켜져 있을 때 적용 |
| CheckTorq | double | 검사 토크, 범위[0,99999.99]; 브레이크 타입이 핀 타입이고 브레이크 잠금 방지 활성화가 켜져 있을 때 적용 |

```json
{
  "BrakeType":2,
  "CheckDistance":0.0,
  "CheckTorq":0.0,
  "Distance":0,
  "Encode1Resolusion":17,
  "Encode2Resolusion":0,
  "EncodeNum":1,
  "jointNum":1
}
```

### 상위 시스템에서 브레이크 파라미터 조회

- **명령어:** `0x207A`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| jointNum | int | 조회할 관절 브레이크 파라미터, 범위[1,6] |

```json
{
  "jointNum":1
}
```

### 컨트롤러 응답 브레이크 파라미터

- **명령어:** `0x2079`

```json
{
  "BrakeType":2,
  "CheckDistance":0.0,
  "CheckTorq":0.0,
  "Distance":0,
  "Encode1Resolusion":17,
  "Encode2Resolusion":0,
  "EncodeNum":1,
  "jointNum":1
}
```

### 상위 시스템에서 정적 토크 조회

- **명령어:** `0x207C`

```json
{}
```

### 컨트롤러 응답 정적 토크

- **명령어:** `0x207D`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| torq | array | 정적 토크 목록, double 타입, 길이는 6 |

```json
{
    "torq":[0.0,0.0,0.0,0.0,0.0,0.0]
}
```

### 상위 시스템에서 협동 로봇 수 설정

- **명령어:** `0x207E`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| cooperativeRobot | int | 협동 로봇 수, 범위[0,4]; 0일 때 협동 로봇 없음을 의미 |

```json
{
  "cooperativeRobot":1
}
```

### 상위 시스템에서 협동 로봇 수 조회

- **명령어:** `0x207F`

```json
{}
```

### 컨트롤러 응답 협동 로봇 수

- **명령어:** `0x2080`

```json
{
  "cooperativeRobot":1
}
```

---

## 11. 외부 축 파라미터

**설명:** 외부 축 관련 파라미터의 설정 및 조회. 영점, 관절 파라미터, 조그 속도 등을 포함합니다.

### 상위 시스템에서 외부 축 영점 / 다회전 값 클리어 설정

- **명령어:** `0x20A0`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| robot | int | 현재 로봇 번호, 범위[1,4] |
| axis | int | 외부 축 축 번호, 범위[0,5]; 0일 때 모든 축 설정 |
| clearEncoder | bool | 다회전 값 클리어 여부 |

```json
{
  "robot": 1,
  "axis": 1,
  "clearEncoder": false
}
```

### 컨트롤러 응답 외부 축 영점 설정 / 다회전 값 클리어 결과

- **명령어:** `0x20A1`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| robot | int | 현재 로봇 번호, 범위[1,4] |
| axis | int | 외부 축 축 번호, 범위[0,5] |
| result | int | 영점 설정 / 다회전 값 클리어 결과; 0은 실패, 1은 성공 |

```json
{
  "robot": 1,
  "axis": 1,
  "result": 0
}
```

### 상위 시스템에서 외부 축 영점 오프셋 설정

- **명령어:** `0x20A2`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| robot | int | 현재 로봇 번호, 범위[1,4] |
| axis | int | 외부 축 축 번호, 범위[0,5]; 0일 때 모든 축 설정 |
| offset | array | 축 영점 오프셋 값 목록, double 타입, 길이는 5; 외부 축 번호가 0이 아닐 때, 해당 위치에만 값이 있고 다른 축은 모두 0이 됨 |

```json
{
  "axis":1,
  "offset":[6.0,0,0,0,0],
  "robot":1
}
```

### 상위 시스템에서 외부 축 단회전 값 설정

- **명령어:** `0x20A3`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| robot | int | 현재 로봇 번호, 범위[1,4] |
| axis | int | 현재 축 번호, 범위[1,5] |
| singleEncoder | int | 단회전 값 수치, 범위[0,999999999] |

```json
{
  "robot": 1,
  "axis": 1,
  "singleEncoder": 0
}
```

### 상위 시스템에서 외부 축 단회전 값 조회

- **명령어:** `0x20A4`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| robot | int | 현재 로봇 번호, 범위[1,4] |
| axis | int | 현재 축 번호, 범위[1,5] |

```json
{
  "robot": 1,
  "axis": 1
}
```

### 컨트롤러 응답 외부 축 단회전 값

- **명령어:** `0x20A5`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| robot | int | 현재 로봇 번호, 범위[1,4] |
| axis | int | 현재 축 번호, 범위[1,5] |
| singleEncoder | int | 단회전 값 수치, 범위[0,999999999] |

```json
{
  "robot": 1,
  "axis": 1,
  "singleEncoder": 0
}
```

### 상위 시스템에서 외부 축 관절 파라미터 설정

- **명령어:** `0x20A6`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| robot | int | 현재 로봇 번호, 범위[1,4] |
| isNotInsideRobot | bool | 현재 제어 대상이 외부 장치인지 여부; 비 ide는 보내지 않아도 됨 |
| externalGroupNum | int | 외부 축 그룹 번호, 범위[1,3]; 이 파라미터의 최대값은 현재 로봇에 바인딩된 외부 축 수; "isNotInsideRobot"이 true일 때, 이 파라미터는 총 번호를 나타냄 |
| joint | array | 관절 파라미터 목록, 길이는 현재 외부 축의 축 수 |

**joint 서브 오브젝트 파라미터:**

| 파라미터 | 타입 | 설명 |
|------|------|------|
| backLash | double | 기어 백래시, 범위[0,10]; 이 기능은 추가 개선이 필요하며, 0.0을 권장함 |
| direction | int | 모델 방향, 범위[1,-1]; 1은 정방향, -1은 부방향 |
| encoderResolution | int | 엔코더 비트 수, 범위[1,100] |
| maxAcc | double | 관절 최대 가속도, 범위[1,10000] |
| maxDec | double | 관절 최대 감속도, 범위[-10000,-1] |
| maxJerkAcc | double | 최대 가가속도, 범위[1,20000]; 로봇 보간 방식이 가가속도일 때 적용 |
| maxJerkDec | double | 최대 감감속도, 범위[-20000,-1]; 로봇 보간 방식이 가가속도일 때 적용 |
| maxRPM | double | 최대 정회전 속도, 범위[1,5] |
| maxReverseRPM | double | 최대 역회전 속도, 범위[-5,-1] |
| positiveLimit | double | 관절 정방향 리미트, 범위[1,3000]°; 값 100000000은 제한 없음을 의미 |
| ratedRPM | double | 정격 정회전 속도, 범위[1,10000]rpm |
| ratedReverseRPM | double | 정격 역회전 속도, 범위[-10000,-1]rpm; 수치는 정격 정속도의 음수 값 |
| ratedReverseSpeed | double | 관절 정격 역속도, 단위 °/s; 회전 외부 축 공식: 정격 역속도 / 관절 감속비 * 6; 직선 외부 축 공식: 방향 변환비 * (정격 역속도 / 관절 감속비 * 6) / 360 |
| ratedSpeed | double | 관절 정격 정속도, 단위 °/s; 회전 외부 축 공식: 정격 정속도 / 관절 감속비 * 6; 직선 외부 축 공식: 방향 변환비 * (정격 정속도 / 관절 감속비 * 6) / 360 |
| reducRatio | double | 관절 감속비, 범위(0,1000] |
| reverseLimit | double | 관절 역방향 리미트, 범위[-3000,-1]°; 값 100000000은 제한 없음을 의미 |

```json
{
  "externalGroupNum": 1,
  "isNotInsideRobot":false,
  "joint":
  [
    {
      "backLash": 0.0,
      "direction": 1,
      "encoderResolution": 17,
      "maxAcc": 1.50,
      "maxDec": -1.50,
      "maxJerkAcc": 1.0,
      "maxJerkDec": -1.0,
      "maxRPM": 1.0,
      "maxReverseRPM": -1.0,
      "positiveLimit": 999.0,
      "ratedRPM": 3000.0,
      "ratedReverseRPM": -3000.0,
      "ratedReverseSpeed": -3600.0,
      "ratedSpeed": 3600.0,
      "reducRatio": 5.0,
      "reverseLimit": -999.0
    }
  ],
  "robot": 1
}
```

### 상위 시스템에서 외부 축 관절 파라미터 조회

- **명령어:** `0x20A7`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| robot | int | 현재 로봇 번호, 범위[1,4] |
| externalGroupNum | int | 축 그룹 조합의 그룹 번호; 이 파라미터의 최대값은 현재 로봇에 바인딩된 외부 축 수 |
| isNotInsideRobot | bool | 현재 제어 대상이 외부 장치인지 여부; 비 ide는 보내지 않아도 됨 |

```json
{
  "robot": 1,
  "externalGroupNum": 1,
  "isNotInsideRobot": false
}
```

### 컨트롤러 응답 외부 축 관절 파라미터

- **명령어:** `0x20A8`

```json
{
  "externalGroupNum": 1,
  "isNotInsideRobot":false,
  "joint":
  [
    {
      "backLash": 0.0,
      "direction": 1,
      "encoderResolution": 17,
      "maxAcc": 1.50,
      "maxDec": -1.50,
      "maxJerkAcc": 1.0,
      "maxJerkDec": -1.0,
      "maxRPM": 1.0,
      "maxReverseRPM": -1.0,
      "positiveLimit": 999.0,
      "ratedRPM": 3000.0,
      "ratedReverseRPM": -3000.0,
      "ratedReverseSpeed": -3600.0,
      "ratedSpeed": 3600.0,
      "reducRatio": 5.0,
      "reverseLimit": -999.0
    }
  ],
  "robot": 1
}
```

### 상위 시스템에서 외부 축 관절 조그 속도 설정

- **명령어:** `0x20A9`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| robot | int | 현재 로봇 번호, 범위[1,4] |
| externalGroupNum | int | 외부 축 그룹 번호, 범위[1,3] |
| isNotInsideRobot | bool | 현재 제어 대상이 외부 장치인지 여부; 비 ide는 보내지 않아도 됨 |
| externalJogParameter | array | 관절 조그 속도 목록, 길이는 현재 외부 축 축 수 |

**externalJogParameter 서브 오브젝트 파라미터:**

| 파라미터 | 타입 | 설명 |
|------|------|------|
| maxAcc | double | 관절 축 조그 가속도, 범위[1,1000]°/s^2 |
| maxSpeed | double | 관절 축 최대 조그 속도, 범위[1,100]°/s |

```json
{
  "externalGroupNum":1,
  "externalJogParameter":
  [
    {
      "maxAcc":800.0,
      "maxSpeed":40.0
    }
  ],
  "isNotInsideRobot":false,
  "robot":1
}
```

### 상위 시스템에서 외부 축 관절 조그 속도 조회

- **명령어:** `0x20AA`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| robot | int | 현재 로봇 번호, 범위[1,4] |
| externalGroupNum | int | 축 그룹 조합의 그룹 번호 |
| isNotInsideRobot | bool | 현재 제어 대상이 외부 장치인지 여부; 비 ide는 보내지 않아도 됨 |

```json
{
  "externalGroupNum":1,
  "isNotInsideRobot":false,
  "robot":1
}
```

### 컨트롤러 응답 외부 축 관절 조그 속도

- **명령어:** `0x20AB`

```json
{
  "externalGroupNum":1,
  "externalJogParameter":
  [
    {
      "maxAcc":800.0,
      "maxSpeed":40.0
    }
  ],
  "isNotInsideRobot":false,
  "robot":1
}
```

### 상위 시스템에서 외부 축 단축 캘리브레이션 결과 포인트 조회

- **명령어:** `0x20AC`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| syncPositionerNum | int | 외부 축 번호, 범위[1,3] |
| coordNum | int | 외부 축의 좌표계 번호, 값 범위[0,3] |

```json
{
  "syncPositionerNum":1,
  "coordNum":1
}
```

### 컨트롤러 응답 외부 축 단축 캘리브레이션 결과 포인트

- **명령어:** `0x20AD`

| 파라미터 | 타입 | 설명 |
|------|------|------|
| syncPositionerNum | int | 외부 축 번호, 범위[1,3] |
| coordNum | int | 외부 축의 좌표계 번호, 값 범위[0,3] |
| pos | array | 포인트 데이터, double 배열, 길이는 6 |

```json
{
  "syncPositionerNum":1,
  "coordNum":1,
  "pos":[0,0,0,0,0,0]
}
```
