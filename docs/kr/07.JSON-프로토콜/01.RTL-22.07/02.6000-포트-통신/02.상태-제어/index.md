# 2.상태제어

본文档포함以이내容：

- [서보상태](#1-서보상태)
- [시스템상태](#2-시스템상태)
- [숫자입력출력](#3-숫자입력출력)
- [원격IO제어](#4-원격io제어)
- [전역변수](#5-전역변수)

---

## 1. 서보상태

### 1.1 서보연결상태

#### 1.1.1 조회서보연결상태

| 프로젝트 | 값을 |
|------|-----|
| 명령어 | `0x5042` SERVO_CONNECT_INQUIRE |

**요청 매개변수**：없음

```json
{}
```

#### 1.1.2 수신조회연결상태일 때，반환

| 프로젝트 | 값을 |
|------|-----|
| 명령어 | `0x5043` SERVO_CONNECT_RESPOND |

| 매개변수 | 유형 | 설명 |
|------|------|------|
| servoType | int | 서보유형 |

```json
{
  "servoType": 0
}
```

---

### 1.2 서보상태설정及가져오기

#### 1.2.1 호스트 컴퓨터수정변경서보상태

**명령어**：`0x2001` SERVO_STATUS_SET

| 매개변수 | 유형 | 설명 | 가져오기값을범위 |
|------|------|------|----------|
| robot | int | 선택로봇 | [1, 4] |
| status | int | 서보상태 | 0: 真实서보, 1: 虚拟서보, 2: 없음서보 |

```json
{
  "robot": 1,
  "status": 0
}
```

#### 1.2.2 호스트 컴퓨터조회서보상태

**명령어**：`0x2002` SERVO_STATUS_INQUIRE

| 매개변수 | 유형 | 설명 | 가져오기값을범위 |
|------|------|------|----------|
| robot | int | 선택로봇 | [1, 4] |

```json
{
  "robot": 1
}
```

#### 1.2.3 컨트롤러回복원서보상태

**명령어**：`0x2003` SERVO_STATUS_RESPOND

| 매개변수 | 유형 | 설명 | 가져오기값을범위 |
|------|------|------|----------|
| robot | int | 선택로봇 | [1, 4] |
| mode | int | 실행 모드 | 0: 单机모드, 1: 多机모드 |
| status | int | 서보상태 | 0: 정지, 1: 绪, 2: 오류, 3: 실행 |

```json
{
  "mode": 0,
  "robot": 1,
  "status": 0
}
```

---

### 1.3 조작모드상태설정及가져오기

**조작모드설명**：

| 모드값을 | 이름 | 설명 |
|--------|------|------|
| 0 | 표시티치 모드 (Teach) | - |
| 1 | 원격 모드 (Circle) | - |
| 2 | 실행 모드 (Repeat) | - |

#### 1.3.1 호스트 컴퓨터설정현재컨트롤러조작모드

**명령어**：`0x2101` OPERATION_MODE_SET

| 매개변수 | 유형 | 설명 | 가져오기값을범위 |
|------|------|------|----------|
| mode | int | 조작모드 | 0: 표시티치 모드, 1: 원격 모드, 2: 실행 모드 |

```json
{
  "mode": 0
}
```

#### 1.3.2 호스트 컴퓨터조회조작모드

**명령어**：`0x2102` OPERATION_MODE_INQUIRE

**요청 매개변수**：없음

```json
{}
```

#### 1.3.3 컨트롤러回복원조작모드

**명령어**：`0x2103` OPERATION_MODE_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| mode | int | 조작모드 |

```json
{
  "mode": 0
}
```

#### 1.3.4 호스트 컴퓨터수정변경표시教조작모드

**명령어**：`0x2104` TEACHTYPE_SET

| 매개변수 | 유형 | 설명 | 가져오기값을범위 |
|------|------|------|----------|
| teachType | int | 표시教유형 | 0: 조그(单이동), 1: 드래그표시教, 2: 조그(联이동) |

```json
{
  "teachType": 0
}
```

#### 1.3.5 호스트 컴퓨터조회표시教유형

**명령어**：`0x2105` TEACHTYPE_INQUIRE

**요청 매개변수**：없음

```json
{}
```

#### 1.3.6 컨트롤러回복원표시教유형

**명령어**：`0x2106` TEACHTYPE_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| teachType | int | 표시教유형 |

```json
{
  "teachType": 0
}
```

---

### 1.4 좌표모드상태설정及가져오기

**좌표모드설명**：

| 모드값을 | 이름 | 설명 |
|--------|------|------|
| 0 | 관절좌표 (Joint) | - |
| 1 | 직교좌표 (Cart) | - |
| 2 | 도구좌표 (Tool) | - |
| 3 | 사용자좌표 (User) | - |

#### 1.4.1 호스트 컴퓨터수정변경현재좌표모드

**명령어**：`0x2201` COORD_MODE_SET

| 매개변수 | 유형 | 설명 | 가져오기값을범위 |
|------|------|------|----------|
| robot | int | 선택로봇 | [1, 4] |
| coord | int | 좌표모드 | 0: 관절좌표, 1: 직교좌표, 2: 도구좌표, 3: 사용자좌표 |

```json
{
  "robot": 1,
  "coord": 0
}
```

#### 1.4.2 호스트 컴퓨터조회좌표모드

**명령어**：`0x2202` COORD_MODE_INQUIRE

| 매개변수 | 유형 | 설명 | 가져오기값을범위 |
|------|------|------|----------|
| robot | int | 선택로봇 | [1, 4] |

```json
{
  "robot": 1
}
```

#### 1.4.3 컨트롤러回복원좌표모드

**명령어**：`0x2203` COORD_MODE_RESPOND

| 매개변수 | 유형 | 설명 | 가져오기값을범위 |
|------|------|------|----------|
| robot | int | 선택로봇 | [1, 4] |
| coord | int | 좌표모드 | 0: 관절좌표, 1: 직교좌표, 2: 도구좌표, 3: 사용자좌표 |

```json
{
  "robot": 1,
  "coord": 0
}
```

---

### 1.5 서보전원 끄기상태설정及가져오기

#### 1.5.1 티치 펜던트수정변경현재전원 끄기상태

**명령어**：`0x2301` DEADMAN_STATUS_SET

| 매개변수 | 유형 | 설명 | 가져오기값을범위 |
|------|------|------|----------|
| deadman | int | 전원 끄기상태 | 0: DEADMAN전원 끄기, 1: DEADMAN전원 켜기 |

```json
{
  "deadman": 0
}
```

#### 1.5.2 티치 펜던트조회전원 끄기상태

**명령어**：`0x2302` DEADMAN_STATUS_INQUIRE

**요청 매개변수**：없음

```json
{}
```

#### 1.5.3 컨트롤러回복원전원 끄기상태

**명령어**：`0x2303` DEADMAN_STATUS_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| deadman | int | 전원 끄기상태 |

```json
{
  "deadman": 0
}
```

#### 1.5.4 호스트 컴퓨터설정전원 끄기모드

**명령어**：`0x2304` DEADMAN_MODE_SET

| 매개변수 | 유형 | 설명 | 가져오기값을범위 |
|------|------|------|----------|
| deadmanMode | int | 触전송모드 | 0: 소프트웨어触전송, 1: 하드웨어触전송 |
| deadmanPortOne | int | 활성화포트IO포트 번호 | 매번째포트最多가능할당16번째IO序번호 |
| deadmanPortTwo | int | 활성화포트IO포트 번호 | - |

```json
{
  "deadmanMode": 1,
  "deadmanPortOne": 9,
  "deadmanPortTwo": 0
}
```

#### 1.5.5 호스트 컴퓨터조회전원 끄기모드

**명령어**：`0x2305` DEADMAN_MODE_INQUIRE

**요청 매개변수**：없음

```json
{}
```

#### 1.5.6 컨트롤러回복원전원 끄기모드

**명령어**：`0x2306` DEADMAN_MODE_RESPOND

| 매개변수 | 유형 | 설명 | 가져오기값을범위 |
|------|------|------|----------|
| deadmanMode | int | 触전송모드 | 0: 소프트웨어触전송, 1: 하드웨어触전송 |
| deadmanPortOne | int | 활성화포트IO포트 번호 | 매번째포트最多가능할당16번째IO序번호 |
| deadmanPortTwo | int | 활성화포트IO포트 번호 | - |

```json
{
  "deadmanMode": 1,
  "deadmanPortOne": 9,
  "deadmanPortTwo": 0
}
```

#### 1.5.7 서보활성화（표시티치 펜던트없음해당명령어）

**명령어**：`0x2311` MAN_BEG_OPERATION

| 매개변수 | 유형 | 설명 | 가져오기값을범위 |
|------|------|------|----------|
| robot | int | 선택로봇 | [1, 4] |

```json
{
  "robot": 1
}
```

#### 1.5.8 로봇紧急정지

> 등록：原2314이(가)서보전원 끄기，프로그램에 복사합니다존재하지 않음

**명령어**：`0x2314` MAN_END_OPERATION

| 매개변수 | 유형 | 설명 | 가져오기값을범위 |
|------|------|------|----------|
| robot | int | 선택로봇 | [1, 4] |

```json
{
  "robot": 1
}
```

---

### 1.6 해제서보오류

#### 1.6.1 티치 펜던트해제서보오류

**명령어**：`0x3201` FAULT_RESET

| 매개변수 | 유형 | 설명 | 가져오기값을범위 |
|------|------|------|----------|
| robot | int | 선택로봇 | [1, 4] |

```json
{
  "robot": 1
}
```

#### 1.6.2 해제서보오류뒤，반환해제결과

**명령어**：`0x3202` FAULT_RESET_RESULT

| 매개변수 | 유형 | 설명 |
|------|------|------|
| robot | int | 선택로봇 |
| clearErrflag | bool | true: 해제서보오류성공, false: 해제실패 |

```json
{
  "robot": 1,
  "clearErrflag": true
}
```

---

## 2. 시스템상태

### 2.1 컨트롤러초기화여부완료

#### 조회여부완료

**명령어**：`0x4305` CONTROLLER_INIT_FINISH_INQUIRE

**요청 매개변수**：없음

```json
{}
```

#### 컨트롤러回복원

**명령어**：`0x4306` CONTROLLER_INIT_FINISH_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| finishinit | bool | true：완료，false：未완료 |

```json
{
  "finishinit": true
}
```

---

### 2.2 컨트롤러IP설정

#### 컨트롤러IP설정

**명령어**：`0x4301` CONTROLLER_IP_SET

| 매개변수 | 유형 | 설명 |
|------|------|------|
| name | string | 网卡이름 |
| address | string | IP주소 |
| gateway | string | 网닫기 |
| dns | string | DNS서버 |

```json
{
  "name": "p1p1",
  "address": "192.168.1.13",
  "gateway": "192.168.1.1",
  "dns": "114.114.114.114"
}
```

#### 조회컨트롤러IP

**명령어**：`0x4302` CONTROLLER_IP_INQUIRE

**요청 매개변수**：없음

#### 컨트롤러回복원

**명령어**：`0x4303` CONTROLLER_IP_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| num | int | 网卡수량 |
| network | array | 网卡정보배열 |

```json
{
  "num": 1,
  "network": [
    {
      "name": "p1p1",
      "address": "192.168.1.13",
      "gateway": "192.168.1.1",
      "dns": "114.114.114.114"
    },
    {
      "name": "p2p1",
      "address": "192.168.1.14",
      "gateway": "192.168.1.1",
      "dns": "114.114.114.114"
    }
  ]
}
```

---

### 2.3 컨트롤러License

#### 가져오기컨트롤러ID

**명령어**：`0x5052` IDENTIFY_NUMBER_INQUIRE

#### 컨트롤러回복원

**명령어**：`0x5053` IDENTIFY_NUMBER_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| controllerID | string | 컨트롤러ID |

```json
{
  "controllerID": "4DC9F0249098C82E"
}
```

#### 가져오기컨트롤러剩余사용天数

**명령어**：`0x5055` USE_REST_DAYS_INQUIRE

#### 컨트롤러回복원

**명령어**：`0x5056` USE_REST_DAYS_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| restdays | int | 剩余天数，-1：없음限期사용，0：사용期限완료 |
| year | int | 过期年복사본 |
| mon | int | 过期月복사본 |
| day | int | 过期日 |

```json
{
  "restdays": 30,
  "year": 1,
  "mon": 1,
  "day": 1
}
```

#### 업데이트序열번호

**명령어**：`0x5057` LICENSE_SERIAL_SET

| 매개변수 | 유형 | 설명 |
|------|------|------|
| license | string | 컨트롤러序열번호 |

```json
{
  "license": "ACOCWKBZHSKBEJHI"
}
```

#### 컨트롤러回복원

**명령어**：`0x5059` LICENSE_SERIAL_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| result | string | 密钥업데이트성공，컨트롤러즉값을재시작 |
| ivalid | string | 없음效密钥 |
| error | string | 존재破해제嫌疑，拒绝해제锁 |

```json
{
  "result": "success",
  "ivalid": "없음效密钥!",
  "error": "존재破해제嫌疑，拒绝해제锁!"
}
```

#### 조회图片버전

**명령어**：`0x505A` IMAGE_VERSION_INQUIRE（티치 펜던트없음이기능）

#### 반환조회결과

**명령어**：`0x505B` IMAGE_VERSION_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| result | bool | 조회여부성공 |
| version | int | 버전번호（조회성공일 때반환） |

```json
{
  "result": true,
  "version": xx
}
```

#### 컨트롤러전송（없음权사용참고）

**명령어**：`0x505C` DISABLE_CONTROLLER

| 매개변수 | 유형 | 설명 |
|------|------|------|
| reason | string | 컨트롤러없음权사용참고정보 |

```json
{
  "reason": ""
}
```

#### 컨트롤러전송（剩余天数제공醒）

**명령어**：`0x505F` REST_DAYS_REMIND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| restDays | int | 컨트롤러전송剩余사용天数 |

```json
{
  "restDays": 0
}
```

---

### 2.4 버전번호가져오기

티치 펜던트필요가져오기현재컨트롤러버전번호일 때，전송아래명령：

**명령어**：`0x3402` VERSIONNUM_INQUIRE

#### 컨트롤러수신조회명령일 때，전송아래명령

**명령어**：`0x3403` VERSIONNUM_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| configFileVersionMismatch | bool | 구성파일여부匹구성，false：不匹구성；true：匹구성 |
| jobFileVersion | string | 작업파일버전 |
| rtlVersion | string | 컨트롤러버전 |
| sysClock | string | 시스템일 때钟，형식：YYYY.MM.DD HH:MM:SS |
| version | string | 버전번호이내容 |
| servoVersion | string | 서보버전（久同컨트롤러 응답空문자열） |
| ocmVersion | string | 静态라이브러리 버전（久同컨트롤러 응답空문자열） |
| ioVersion | string | IO버전번호（久同컨트롤러 응답空문자열） |
| nodka_c1201 | object | C1201컨트롤러专사용하여노드 |

**nodka_c1201 노드매개변수 설명**：

| 매개변수 | 유형 | 설명 |
|------|------|------|
| deviceId | string | 장치ID |
| hw_version | string | 하드웨어버전번호 |
| fw_version | string | 固件버전번호 |
| drv_version | string | 驱이동버전번호 |

```json
{
  "configFileVersionMismatch": false,
  "jobFileVersion": "5.2.0",
  "rtlVersion": "22.08.0",
  "sysClock": "2023.11.10 13:29:25",
  "version": "v1.0-rc1-67-gf34dae7",
  "servoVersion": "",
  "ocmVersion": "",
  "ioVersion": "",
  "nodka_c1201": {
    "deviceId": "",
    "hw_version": "",
    "fw_version": "",
    "drv_version": ""
  }
}
```

---

### 2.5 버전核验

#### 조회여부존재현재버전티치 펜던트프로그램

**명령어**：`0x3404` EXIST_TEACHBOX_EQUAL_QTTP_INQUIRE

| 매개변수 | 유형 | 설명 |
|------|------|------|
| MD5 | string | 티치 펜던트프로그램MD5값을 |

```json
{
  "MD5": "xx"
}
```

#### 반환조회결과

**명령어**：`0x3405` EXIST_TEACHBOX_EQUAL_QTTP_RESPOND

만일未조회，则필요업로드현재버전프로그램。

| 매개변수 | 유형 | 설명 |
|------|------|------|
| backuppath | string | 티치 펜던트프로그램경로 |

```json
{
  "backuppath": "xx"
}
```

#### 조회여부존재및컨트롤러버전匹구성티치 펜던트프로그램

**명령어**：`0x3406` EXIST_CONTROLLER_MATCHED_QTTP_INQUIRE

**요청 매개변수**：없음

#### 반환조회결과

**명령어**：`0x3407` EXIST_CONTROLLER_MATCHED_QTTP_RESPOND

若결과이(가)예，则弹框하게 함고객선택여부自이동업그레이드。

| 매개변수 | 유형 | 설명 |
|------|------|------|
| backuppath | string | 티치 펜던트프로그램경로 |

```json
{
  "backuppath": "xx"
}
```

---

### 2.6 재시작컨트롤러

재시작컨트롤러일 때，티치 펜던트전송：

**명령어**：`0x5061` REBOOT_CONTROLLER

**요청 매개변수**：없음

---

### 2.7 복원출력厂설정

복원출력厂설정일 때，티치 펜던트전송：

**명령어**：`0x5064` RETURN_FACTORY_SET

| 매개변수 | 유형 | 설명 |
|------|------|------|
| clearConfigFile | bool | 해제모든시스템구성파일 |
| clearExtendedFile | bool | 해제모든扩展파일 |

```json
{
  "clearConfigFile": true,
  "clearExtendedFile": true
}
```

---

### 2.8 시스템自이동백업

#### 백업시스템

티치 펜던트전송：

**명령어**：`0x5065` CONTROLLER_BACKUP_INQUIRE

**요청 매개변수**：없음

#### 컨트롤러回복원

**명령어**：`0x5066` CONTROLLER_BACKUP_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| backUpNum | int | 백업数 |
| backUpName | array | 백업시스템名字，最多十번째 |

```json
{
  "backUpNum": 1,
  "backUpName": ["string", "string", "string"]
}
```

#### 복원시스템

티치 펜던트전송：

**명령어**：`0x5067` CONTROLLER_BACKUP_RESTORE

| 매개변수 | 유형 | 설명 |
|------|------|------|
| backUpOneName | string | 필요복원시스템이름 |

```json
{
  "backUpOneName": "string"
}
```

#### 컨트롤러回복원

**명령어**：`0x5068` CONTROLLER_BACKUP_RESTORE_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| success | bool | true：시스템복원성공，false：시스템복원실패 |

```json
{
  "success": true
}
```

---

### 2.9 서보매개변수

#### 사용하여컨트롤러설정서보이내部매개변수

**명령어**：`0x5071` SERVO_INSIDE_PARM_SET

| 매개변수 | 유형 | 설명 |
|------|------|------|
| robot | int | 로봇번호 |
| servoNum | int | 서보번호 |
| 매개변수名 | object | 서보매개변수名 |

```json
{
  "robot": 1,
  "servoNum": 1,
  "매개변수名": {
    "value": "",
    "unit": "",
    "upLimit": "",
    "lowLimit": ""
  }
}
```

#### 티치 펜던트조회

**명령어**：`0x5072` SERVO_INSIDE_PARM_INQUIRE

| 매개변수 | 유형 | 설명 |
|------|------|------|
| robot | int | 로봇번호 |
| servoNum | int | 서보번호 |

```json
{
  "robot": 1,
  "servoNum": 1
}
```

#### 컨트롤러 응답

**명령어**：`0x5073` SERVO_INSIDE_PARM_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| robot | int | 로봇번호 |
| servoNum | int | 서보번호 |
| sendNum | int | 전송编번호 |
| totalNum | int | 총 수 |
| servo | array | 具体서보매개변수배열 |

```json
{
  "robot": 1,
  "servoNum": 1,
  "sendNum": 1,
  "totalNum": 1,
  "servo": [
    {
      "name": "모터额설정功率",
      "value": 3000
    },
    {
      "name": "모터额설정转速",
      "value": 4000
    }
  ]
}
```

---

### 2.10 파일전송전송

#### 요청업로드某파일

**명령어**：`0x5501` REQUEST_UPLOAD_FILE

| 매개변수 | 유형 | 설명 |
|------|------|------|
| name | string | 파일이름 |
| size | int | 파일大小 |

```json
{
  "name": "vxWorks",
  "size": 4096
}
```

#### 同意업로드요청/拒绝업로드요청

**명령어**：`0x5502` REQUEST_UPLOAD_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| answer | string | "yes"：同意업로드，"busy"：컨트롤러忙碌 |

```json
{
  "answer": "yes"
}
```

#### 요청다운로드某파일

**명령어**：`0x5504` REQUEST_DOWNLOAD_FILE

| 매개변수 | 유형 | 설명 |
|------|------|------|
| name | string | 파일이름 |

```json
{
  "name": "log.0"
}
```

#### 同意다운로드요청/拒绝다운로드요청

**명령어**：`0x5505` REQUEST_DOWNLOAD_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| answer | string | "yes"：同意다운로드，"busy"：컨트롤러忙碌，"nofile"：없음이파일 |
| name | string | 작업파일全경로 |
| size | int | 만일拒绝，则size없음效 |

```json
{
  "answer": "yes",
  "name": "log.0",
  "size": 4096
}
```

---

### 2.11 파일전송전송网络비정상에 복사합니다해제（만티치 펜던트）

**명령어**：`0x5525` DownLoadInterrupt

**요청 매개변수**：없음

```json
{}
```

---

### 2.12 티치 펜던트조회컨트롤러구성파일디렉터리

**명령어**：`0x5507` CONFIG_FILE_INQUIRY

| 매개변수 | 유형 | 설명 |
|------|------|------|
| isExport | bool | true：의미내보내기구성，false의미가져오기구성 |

```json
{
  "isExport": true
}
```

---

### 2.13 컨트롤러向티치 펜던트전송구성파일디렉터리

**명령어**：`0x5508` CONFIG_FILE_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| filenum | int | 구성파일수량 |
| filelist | array | 구성파일이름열表 |

```json
{
  "filenum": 2,
  "filelist": ["xxx.json", "yyy.json"]
}
```

---

### 2.14 전송파일二가져오기생성데이터

**명령어**：`0x5511` UploadFileData（보고诉컨트롤러파일전송완료）

**명령어**：`0x5512` UploadFileDone（循环에게컨트롤러전송파일）

#### 컨트롤러回복원

**명령어**：`0x5513` ReceiveUploadFinish

| 매개변수 | 유형 | 설명 |
|------|------|------|
| finish | bool | true의미업로드성공，false의미실패 |

```json
{
  "finish": true
}
```

---

### 2.15 티치 펜던트요청가져오기로그파일열表

**명령어**：`0x5542` LOGFILE_LIST_INQUIRE

| 매개변수 | 유형 | 설명 |
|------|------|------|
| num | int | 의미가져오기最近多少번째파일，선택값을：5、30、100 |

```json
{
  "num": 5
}
```

#### 컨트롤러回복원로그파일열表

**명령어**：`0x5543` LOGFILE_LIST_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| absolutepath | string | 로그所에서디렉터리 |
| logfilenum | int | 주의，这번째数와/과위num不一설정相等 |
| logfilelist | array | 로그열表 |

```json
{
  "absolutepath": "log/",
  "logfilenum": 3,
  "logfilelist": ["logInfo.0", "logInfo.1", "logInfo.2"]
}
```

---

### 2.16 ENI파일열表조회

**명령어**：`0x5545` ENIFILE_LIST_INQUIRE

| 매개변수 | 유형 | 설명 |
|------|------|------|
| num | int | 의미가져오기最近多少번째파일，선택값을：5、30、100 |

```json
{
  "num": 5
}
```

#### 컨트롤러回복원ENI파일열表

**명령어**：`0x5546` ENIFILE_LIST_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| absolutepath | string | 파일所에서디렉터리 |
| ENIfilenum | int | 주의，这번째数와/과위num不一설정相等 |

```json
{
  "absolutepath": "log/",
  "ENIfilenum": 3
}
```

---

### 2.17 티치 펜던트전송의미완료연결受완료

**명령어**：`0x5544` DownLoadControlLogFileFinish

---

### 2.18 티치 펜던트요청가져오기작업파일열表

**명령어**：`0x5532` JOBFILE_LIST_INQUIRE

#### 컨트롤러回복원작업파일디렉터리及수량

**명령어**：`0x5533` JOBFILE_SUM_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| absolutepath | array | 작업파일경로 |
| jobfilenum | array | 각작업파일경로작업파일수량 |

```json
{
  "absolutepath": ["/job/R1/", "/job/R2/", "/job/R3/", "/job/R4/"],
  "jobfilenum": [2, 33, 233, 666]
}
```

#### 컨트롤러回복원작업파일열表

**명령어**：`0x5534` JOBFILE_LIST_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| robot | int | 로봇번호 |
| listnum | int | 最多10번째 |
| jobfilelist | array | 작업파일열表 |

```json
{
  "robot": 1,
  "listnum": 2,
  "jobfilelist": [
    {
      "name": "xxx.JBR",
      "MD5": "123"
    },
    {
      "name": "yyy.JBR",
      "MD5": "132"
    }
  ]
}
```

#### 연결受완료전송에게표시티치 펜던트

**명령어**：`0x5535` JOBFILE_LIST_FINISH

**요청 매개변수**：없음。때四번째로봇전송완료毕뒤전송에게표시티치 펜던트

---

### 2.19 티치 펜던트조회Lua脚본열表

**명령어**：`0x5552` LUASCRIPT_LIST_INQUIRE

**요청 매개변수**：없음

#### 컨트롤러回복원Lua脚본열表

**명령어**：`0x5553` LUASCRIPT_LIST_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| absolutepath | string | Lua脚본所에서디렉터리 |
| sum | int | 열表총 수 |
| scriptlist | array | 脚본열表 |

```json
{
  "absolutepath": "lua/",
  "sum": 3,
  "scriptlist": ["ww.lua", "ee.lua"]
}
```

---

### 2.20 정보참고

#### 오류참고

**명령어**：`0x2B03` ERROR_CODE

#### 경고참고

**명령어**：`0x2B04` WARNING_CODE

#### 메시지항목참고

**명령어**：`0x2B05` INFO_CODE

| 매개변수 | 유형 | 설명 |
|------|------|------|
| data | string | 메시지항목이내容 |
| type | int | 메시지코드 |

```json
{
  "data": "예시",
  "type": 1234
}
```

#### 弹窗참고

**명령어**：`0x2B06` POPUP_CODE

| 매개변수 | 유형 | 설명 |
|------|------|------|
| count | int | 弹窗按钮수량，최대이(가)3 |
| text1 | string | 弹窗居에 복사합니다표시主文본 |
| text2 | string | 按钮1文본 |
| text3 | string | 按钮2文본 |
| text4 | string | 按钮3文본 |
| kind | int | 弹窗참고종류클래스，1이(가)메시지，2이(가)경고，3이(가)보고오류 |
| node | string | 로봇序번호1-4 |
| Tips | bool | 弹窗呼출력이(가)true |

```json
{
  "count": 1,
  "text1": "예시",
  "text2": "예시",
  "text3": "예시",
  "text4": "예시",
  "kind": 1,
  "node": "1",
  "Tips": true
}
```

#### 弹窗交互反馈

에 따라사용자에 대해弹窗조작가져오기줄相해야 함설정：

**명령어**：`0x2B07` GET_OPTION

| 매개변수 | 유형 | 설명 |
|------|------|------|
| node | string | 로봇序번호1-4 |
| option | int | 1-3，해당弹窗선택 시항목1-3이내容 |

```json
{
  "node": "1",
  "option": 1
}
```

---

### 2.21 컨트롤러일 때사이조회

#### 일 때사이조회

**명령어**：`0x5742` CONTROLLER_TIME_INQUIRE

| 매개변수 | 유형 | 설명 |
|------|------|------|
| type | int | 1：가져오기시스템시작일 때사이至现에서s数，0：표시일 때사이 |
| format | int | 1：가져오기北京일 때사이，0：가져오기타임스탬프 |

```json
{
  "type": 0,
  "format": 0
}
```

#### 반환조회결과

**명령어**：`0x5743` CONTROLLER_TIME_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| tType | int | 1：가져오기시스템시작일 때사이至现에서s数，0：표시일 때사이 |
| format | int | 1：가져오기北京일 때사이，0：가져오기타임스탬프 |
| date | object | format이(가)1일 때사용하여格林威治标准일 때사이의미 |
| year | int | 日期에 복사합니다年복사본 |
| mon | int | 日期에 복사합니다月복사본 |
| day | int | 日期에 복사합니다天 |
| hour | int | 일 때사이에 복사합니다시간 |
| min | int | 일 때사이에 복사합니다분 |
| sec | int | 일 때사이에 복사합니다s数 |
| msec | int | 일 때사이에 복사합니다ms数 |
| timestamp | object | 以s와/과纳s形式记기록타임스탬프 |
| s | int | 타임스탬프에 복사합니다s数 |
| ns | int | 타임스탬프에 복사합니다纳s数 |

```json
{
  "tType": 0,
  "format": 0,
  "date": {
    "year": 2023,
    "mon": 1,
    "day": 1,
    "hour": 1,
    "min": 1,
    "sec": 1,
    "msec": 1
  },
  "timestamp": {
    "s": 1,
    "ns": 1
  }
}
```

---

## 3. 숫자입력출력

### 3.1 GPIO_DOUT_SET - 설정숫자출력

**명령적재**: `0x3601`

티치 펜던트설정 DOUT 일 때전송이명령。

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| port | int | 예 | 포트 번호，부터 1 시작 |
| status | int | 예 | 포트상태：0=Low，1=High |

```json
{
  "port": 1,
  "status": 1
}
```

---

### 3.2 GPIO_DOUT_INQUIRE - 조회숫자출력상태

**명령적재**: `0x3602`

티치 펜던트조회 DOUT 상태일 때전송이명령。

**요청 매개변수**：없음

---

### 3.3 GPIO_DOUT_RESPOND - 조회숫자출력상태응답

**명령적재**: `0x3603`

컨트롤러수신조회요청뒤반환이명령。

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| status | array | 예 | 매번째출력포트상태배열 |

**status 배열요소설명**:

| 값을 | 설명 |
|----|------|
| 0 | Low |
| 1 | High |
| -1 | 없음이포트 |

```json
{
  "status": [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, -1, -1, -1, -1]
}
```

---

### 3.4 GPIO_DIN_INQUIRE - 조회숫자입력상태

**명령적재**: `0x3605`

티치 펜던트조회 DIN 상태일 때전송이명령。

**요청 매개변수**：없음

---

### 3.5 GPIO_DIN_RESPOND - 조회숫자입력상태응답

**명령적재**: `0x3606`

컨트롤러수신조회요청뒤반환이명령。

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| status | array | 예 | 매번째입력포트상태배열 |

**status 배열요소설명**:

| 값을 | 설명 |
|----|------|
| 0 | Low |
| 1 | High |
| -1 | 없음이포트 |

```json
{
  "status": [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, -1, -1, -1, -1]
}
```

---

### 3.6 ANALOG_OUT_SET - 설정시뮬레이션출력

**명령적재**: `0x3607`

티치 펜던트설정 AOUT 일 때전송이명령。

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| port | int | 예 | 포트 번호，부터 1 시작 |
| value | float | 예 | 포트电압력값을（如 1.33 의미 1.33V） |

```json
{
  "port": 1,
  "value": 1.33
}
```

---

### 3.7 ANALOG_OUT_INQUIRE - 조회시뮬레이션출력상태

**명령적재**: `0x3608`

티치 펜던트조회 AOUT 상태일 때전송이명령。

**요청 매개변수**：없음

---

### 3.8 ANALOG_OUT_RESPOND - 조회시뮬레이션출력상태응답

**명령적재**: `0x3609`

컨트롤러수신조회요청뒤반환이명령。

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| value | array | 예 | 매번째시뮬레이션출력포트값배열 |

**value 배열요소설명**:

| 값을 | 설명 |
|----|------|
| 0 | Low |
| 1 | High |
| -1 | 없음이포트 |

```json
{
  "value": [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, -1, -1, -1, -1]
}
```

---

### 3.9 ANALOG_IN_INQUIRE - 조회시뮬레이션입력상태

**명령적재**: `0x360A`

티치 펜던트조회 AIN 상태일 때전송이명령。

**요청 매개변수**：없음

---

### 3.10 ANALOG_IN_RESPOND - 조회시뮬레이션입력상태응답

**명령적재**: `0x360B`

컨트롤러수신조회요청뒤반환이명령。

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| value | array | 예 | 매번째시뮬레이션입력포트값배열 |

**value 배열요소설명**:

| 값을 | 설명 |
|----|------|
| 0 | Low |
| 1 | High |
| -1 | 없음이포트 |

```json
{
  "value": [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, -1, -1, -1, -1]
}
```

---

### 3.11 FORCE_DIN_SET - 설정强생성숫자입력

**명령적재**: `0x360C`

티치 펜던트설정强생성숫자입력일 때전송이명령。

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| port | int | 예 | 포트 번호 |
| enable | bool | 예 | 여부열기시작强생성입력 |
| status | int | 예 | 설정포트高Low：0=Low，1=High |

```json
{
  "port": 1,
  "enable": true,
  "status": 0
}
```

---

### 3.12 FORCE_DIN_INQUIRE - 조회强생성숫자입력상태

**명령적재**: `0x360D`

티치 펜던트조회强생성입력상태일 때전송이명령。

**요청 매개변수**：없음

---

### 3.13 FORCE_DIN_RESPOND - 조회强생성숫자입력상태응답

**명령적재**: `0x360E`

컨트롤러수신조회요청뒤반환이명령。

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| port | int | 예 | 포트 번호 |
| enable | bool | 예 | 여부열기시작强생성입력 |
| status | int | 예 | 설정포트高Low：0=Low，1=High |

```json
{
  "port": 1,
  "enable": true,
  "status": 0
}
```

---

### 3.14 FORCE_ANALOG_IN_SET - 설정强생성시뮬레이션입력

**명령적재**: `0x3611`

티치 펜던트설정强생성시뮬레이션입력일 때전송이명령。

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| port | int | 예 | 포트 번호 |
| enable | bool | 예 | 여부열기시작强생성입력 |
| status | int | 예 | 설정포트시뮬레이션값을 |

```json
{
  "port": 1,
  "enable": true,
  "status": 0
}
```

---

### 3.15 FORCE_ANALOG_IN_INQUIRE - 조회强생성시뮬레이션입력상태

**명령적재**: `0x3612`

티치 펜던트조회强생성시뮬레이션입력상태일 때전송이명령。

**요청 매개변수**：없음

---

### 3.16 FORCE_ANALOG_IN_RESPOND - 조회强생성시뮬레이션입력상태응답

**명령적재**: `0x3613`

컨트롤러수신조회요청뒤반환이명령。

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| port | int | 예 | 포트 번호 |
| enable | bool | 예 | 여부열기시작强생성입력 |
| status | int | 예 | 설정포트시뮬레이션값을 |

```json
{
  "port": 1,
  "enable": true,
  "status": 0
}
```

---

## 4. 원격IO제어

### 4.1 IO기능인터페이스설정

#### 4.1.1 IO기능인터페이스설정（표시티치 펜던트전송）

**명령적재**: `0x2F01` IO_CONTROL_SET

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| inPort | object | 예 | 원격IO기능포트绑설정 |
| inValue | object | 예 | 포트값을，IO매개변수，0：Low유효，1：High유효 |
| program | array | 예 | 원격IO프로그램DIN와/과value绑설정，共10번째 |
| robot | int | 예 | 로봇번호 |

**inPort 객체매개변수**:

| 매개변수名 | 유형 | 설명 |
|--------|------|------|
| start | int | 시작，绑설정포트 |
| stop | int | 정지，绑설정포트 |
| pause | int | 일시정지，绑설정포트 |
| faultReset | int | 해제보고경고，绑설정포트 |
| clearoutagekeep | int | 해제해제电保持데이터，绑설정포트 |

**inValue 객체매개변수**:

| 매개변수名 | 유형 | 설명 |
|--------|------|------|
| start | int | 시작 |
| stop | int | 정지 |
| pause | int | 일시정지 |
| faultReset | int | 해제보고경고 |
| clearoutagekeep | int | 해제해제电保持데이터 |

**program 배열매개변수**:

| 매개변수名 | 유형 | 설명 |
|--------|------|------|
| port | int | 포트 번호 |
| value | int | 포트값을，0또는1 |

```json
{
  "inPort": {
    "clearoutagekeep": 16,
    "faultReset": 4,
    "pause": 3,
    "start": 1,
    "stop": 2
  },
  "inValue": {
    "clearoutagekeep": 1,
    "faultReset": 1,
    "pause": 1,
    "start": 1,
    "stop": 1
  },
  "program": [
    {"port": 5, "value": 1},
    {"port": 6, "value": 0},
    {"port": 7, "value": 0},
    {"port": 8, "value": 1},
    {"port": 9, "value": 1},
    {"port": 0, "value": 1},
    {"port": 0, "value": 1},
    {"port": 0, "value": 1},
    {"port": 0, "value": 1},
    {"port": 0, "value": 1}
  ],
  "robot": 1
}
```

---

#### 4.1.2 IO기능인터페이스조회（표시티치 펜던트전송）

**명령적재**: `0x2F02` IO_CONTROL_INQUIRE

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 로봇번호 |

```json
{
  "robot": 1
}
```

---

#### 4.1.3 IO기능인터페이스응답（컨트롤러 응답）

**명령적재**: `0x2F03` IO_CONTROL_RESPOND

**매개변수 설명**：同 4.1.1 IO기능인터페이스설정

```json
{
  "inPort": {
    "clearoutagekeep": 16,
    "faultReset": 4,
    "pause": 3,
    "start": 1,
    "stop": 2
  },
  "inValue": {
    "clearoutagekeep": 1,
    "faultReset": 1,
    "pause": 1,
    "start": 1,
    "stop": 1
  },
  "program": [
    {"port": 5, "value": 1},
    {"port": 6, "value": 0},
    {"port": 7, "value": 0},
    {"port": 8, "value": 1},
    {"port": 9, "value": 1},
    {"port": 0, "value": 1},
    {"port": 0, "value": 1},
    {"port": 0, "value": 1},
    {"port": 0, "value": 1},
    {"port": 0, "value": 1}
  ],
  "robot": 1
}
```

---

### 4.2 홈 위치설정

#### 4.2.1 홈 위치위치매개변수설정（표시티치 펜던트전송）

**명령적재**: `0x2F04` IO_CONTROL_RESETPOS_SET

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| pos | array | 예 | 로봇위치（7번째요소） |
| posSync | array | 예 | 외부 축위치（5번째요소） |
| robot | int | 예 | 로봇번호 |

```json
{
  "pos": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  "posSync": [0.0, 0.0, 0.0, 0.0, 0.0],
  "robot": 1
}
```

---

#### 4.2.2 홈 위치IO매개변수설정（표시티치 펜던트전송）

**명령적재**: `0x2F14` IO_CONTROL_RESETPORT_SET

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 로봇번호 |
| selectPiontOrFile | int | 예 | 0:홈 위치，1:리셋프로그램 |
| inPort | int | 예 | 리셋시작，IO触전송포트 |
| inValue | int | 예 | 리셋시작，IO매개변수 |
| outPort | int | 예 | 리셋종료，IO출력포트 |
| safeEnable | bool | 예 | 安全활성화 |
| returnway | int | 예 | 0:관절보간，1：직선보간 |

```json
{
  "robot": 1,
  "selectPiontOrFile": 0,
  "inPort": 0,
  "inValue": 1,
  "outPort": 0,
  "safeEnable": true,
  "returnway": 0
}
```

---

#### 4.2.3 安全点오류差매개변수설정

**명령적재**: `0x2F15` IO_CONTROL_RESETSAFEDEV_SET

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| deviation | array | 예 | 로봇위치편차（7번째요소） |
| deviationSync | array | 예 | 외부 축편차（5번째요소） |
| robot | int | 예 | 로봇번호 |

```json
{
  "deviation": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 1.0],
  "deviationSync": [1.0, 1.0, 1.0, 1.0, 1.0],
  "robot": 1
}
```

---

#### 4.2.4 安全点위치알림알림

**명령적재**: `0x2F16` IO_CONTROL_NOTIS_SAFEPOS

**설명**: 실행작업파일일 때，시작安全활성화，不에서安全点일 때컨트롤러 응답전송

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 현재로봇 |
| isSync | bool | 예 | false:로봇不에서안전 영역，true:외부 축不에서안전 영역 |
| currentPos | array | 예 | 현재좌표 |
| safePos | array | 예 | 홈 위치비트 |

```json
{
  "robot": 1,
  "isSync": false,
  "currentPos": [0, 0.1, 2, 3.3, 44, 555.55, 6, 7.7, 88],
  "safePos": [0, 0.1, 2, 3.3, 88, 555.55, 6, 7.7, 88]
}
```

---

#### 4.2.5 回리셋

**명령적재**: `0x2F17` RECOVERY_SITE

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 로봇번호 |

```json
{
  "robot": 1
}
```

---

#### 4.2.6 홈 위치설정조회（표시티치 펜던트전송）

**명령적재**: `0x2F05` IO_CONTROL_RESET_INQUIRE

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 로봇번호 |

```json
{
  "robot": 1
}
```

---

#### 4.2.7 홈 위치설정응답（컨트롤러 응답）

**명령적재**: `0x2F06` IO_CONTROL_RESET_RESPOND

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 로봇번호 |
| selectPiontOrFile | int | 예 | 0선택예点，1선택프로그램 |
| returnWay | int | 예 | 0의미선택예movj，1의미예movl |
| inPort | int | 예 | 리셋시작，IO触전송포트 |
| inValue | int | 예 | 리셋시작，IO매개변수 |
| outPort | int | 예 | 리셋종료，IO출력포트 |
| safeEnable | bool | 예 | 安全활성화 |
| pos | array | 예 | 홈 위치좌표 |
| posSync | array | 예 | 외부 축홈 위치좌표 |
| deviation | array | 예 | 安全点범위 |
| deviationSync | array | 예 | 외부 축安全点범위 |

```json
{
  "robot": 1,
  "selectPiontOrFile": 1,
  "returnWay": 1,
  "inPort": 0,
  "inValue": 1,
  "outPort": 0,
  "safeEnable": true,
  "pos": [0, 0.1, 2, 3.3, 44, 555.55, 6, 7.7, 88],
  "posSync": [0, 0.1, 2, 3.3, 44, 555.55, 6, 7.7, 88],
  "deviation": [0, 0.1, 2, 3.3, 44, 555.55, 6, 7.7, 88],
  "deviationSync": [1.0, 1.0, 1.0, 1.0, 1.0]
}
```

---

#### 4.2.8 현재위치조회（표시티치 펜던트전송）

**명령적재**: `0x2F07` IO_CONTROL_POS_INQUIRE

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 로봇번호 |
| coord | int | 예 | 좌표모드：-1-컨트롤러현재좌표，0-관절좌표，1-직교좌표，2-도구좌표，3-사용자좌표 |

```json
{
  "robot": 1,
  "coord": 0
}
```

---

#### 4.2.9 현재위치응답（컨트롤러 응답）

**명령적재**: `0x2F08` IO_CONTROL_POS_RESPOND

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 로봇번호 |
| coord | int | 예 | 좌표모드 |
| pos | array | 예 | 弧도포인트 |
| posDeg | array | 예 | 角도포인트 |
| configuration | int | 예 | 형태 |

```json
{
  "robot": 1,
  "coord": 1,
  "pos": [0, 0.1, 2, 3.3, 44, 555.55],
  "posDeg": [0, 0.1, 2, 3.3, 44, 555.55],
  "configuration": 1
}
```

---

#### 4.2.10 双机위치조회（MOVJDOUBLE명령어）

**명령적재**: `0x2F10` IO_CONTROL_DOUBLE_POS_INQUIRE

**설명**: MOVJDOUBLE명령어에서双机필요同일 때조회제一와/과제二번째로봇위치

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| robot1 | int | 예 | 로봇1 |
| coord1 | int | 예 | 로봇1좌표：1-직교좌표，2-도구좌표，3-사용자좌표 |
| robot2 | int | 예 | 로봇2 |
| coord2 | int | 예 | 同로봇1 |

```json
{
  "robot1": 1,
  "coord1": 1,
  "robot2": 2,
  "coord2": 1
}
```

---

#### 4.2.11 双机위치응답

**명령적재**: `0x2F11` IO_CONTROL_DOUBLE_POS_RESPOND

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| pos1Deg | array | 예 | 로봇1축1-7현재위치（角도의미） |
| pos1 | array | 예 | 로봇1축1-7현재위치（弧도의미） |
| pos2Deg | array | 예 | 로봇2축1-7현재위치（角도의미） |
| pos2 | array | 예 | 로봇2축1-7현재위치（弧도의미） |

```json
{
  "pos1Deg": [0, 1.1, 2, 3.3, 4.4, 5.5, 6.6],
  "pos1": [0, 1.1, 2, 3.3, 4.4, 5.5, 6.6],
  "pos2Deg": [0, 1.1, 2, 3.3, 4.4, 5.5, 6.6],
  "pos2": [0, 1.1, 2, 3.3, 4.4, 5.5, 6.6]
}
```

---

#### 4.2.12 열기작업파일

**명령적재**: `0x3114`

**설명**: 리셋프로그램固설정예RobotResetProgram，뒤缀예.ResetPro

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| jobName | string | 예 | 작업파일이름（固설정：RobotResetProgram） |
| robot | int | 예 | 로봇번호 |
| suffixname | string | 예 | 작업파일뒤缀（固설정：.ResetPro） |

```json
{
  "jobName": "RobotResetProgram",
  "robot": 1,
  "suffixname": ".ResetPro"
}
```

---

#### 4.2.13 삽입명령어

**명령적재**: `0x3121`

---

#### 4.2.14 저장작업파일

**명령적재**: `0x3120`

**설명**: 리셋프로그램固설정예RobotResetProgram，뒤缀예.ResetPro

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| jobname | string | 예 | 작업파일이름（固설정：RobotResetProgram） |
| robot | int | 예 | 로봇번호 |
| suffix | string | 예 | 작업파일뒤缀（固설정：.ResetPro） |

```json
{
  "jobname": "RobotResetProgram",
  "robot": 1,
  "suffix": ".ResetPro"
}
```

---

### 4.3 상태참고설정인터페이스

#### 4.3.1 상태참고설정（표시티치 펜던트전송）

**명령적재**: `0x2F09` IO_CONTROL_OUTPUT_SET

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| outPut | array | 예 | 출력구성배열，매번째요소해당一번째로봇 |
| remoteOut | int | 예 | 원격 모드 |
| remoteOut_value | int | 예 | 원격 모드값을：0、1、3（闪烁） |
| runOut | int | 예 | 실행 모드 |
| runOut_value | int | 예 | 실행 모드값을 |
| startUp | int | 예 | 열기机참고 |
| startUp_value | int | 예 | 열기机참고값을 |
| teachOut | int | 예 | 표시티치 모드 |
| teachOut_value | int | 예 | 표시티치 모드값을 |

**outPut 배열요소매개변수**:

| 매개변수名 | 유형 | 설명 |
|--------|------|------|
| IOenable | int | 활성화DOUT绑설정 |
| IOenable_value | int | 값을：0、1、3（闪烁） |
| continuable | int | 가능계속실행DOUT绑설정 |
| continuable_value | int | 값을：0、1、3（闪烁） |
| fault | int | 보고오류참고DOUT绑설정 |
| faultIsFickler | int | 값을：0、1、3（闪烁） |
| mainJobFirstLine | int | 主프로그램首줄DOUT绑설정 |
| mainJobFirstLine_value | int | 값을 |
| pause | int | 일시정지DOUT绑설정 |
| pause_value | int | 값을 |
| quickStopOut1 | int | 紧急비상 정지1DOUT绑설정 |
| quickStopOut2 | int | 紧急비상 정지2DOUT绑설정 |
| quickStopOutValue1 | int | 값을 |
| quickStopOutValue2 | int | 값을 |
| running | int | 실행DOUT绑설정 |
| running_value | int | 값을 |
| stop | int | 정지DOUT绑설정 |
| stop_value | int | 값을 |
| teachBoxStateOut | int | 拔출력표시티치 펜던트DOUT绑설정 |
| teachBoxStateOutValue | int | 값을 |

```json
{
  "outPut": [
    {
      "IOenable": 1,
      "IOenable_value": 1,
      "continuable": 3,
      "continuable_value": 1,
      "fault": 5,
      "faultIsFickler": 1,
      "mainJobFirstLine": 7,
      "mainJobFirstLine_value": 1,
      "pause": 9,
      "pause_value": 1,
      "quickStopOut1": 11,
      "quickStopOut2": 12,
      "quickStopOutValue1": 1,
      "quickStopOutValue2": 1,
      "running": 15,
      "running_value": 1,
      "stop": 17,
      "stop_value": 1,
      "teachBoxStateOut": 0,
      "teachBoxStateOutValue": 1
    },
    {},
    {},
    {}
  ],
  "remoteOut": 1,
  "remoteOut_value": 1,
  "runOut": 2,
  "runOut_value": 1,
  "startUp": 3,
  "startUp_value": 1,
  "teachOut": 4,
  "teachOut_value": 1
}
```

---

#### 4.3.2 상태참고조회（표시티치 펜던트전송）

**명령적재**: `0x2F0A` IO_CONTROL_OUTPUT_INQUIRE

**설명**: data: 없음

---

#### 4.3.3 상태참고응답（컨트롤러 응답）

**명령적재**: `0x2F0B` IO_CONTROL_OUTPUT_RESPOND

**설명**: data：同 0x2F09

---

### 4.4 IO리셋설정인터페이스

#### 4.4.1 IO출력리셋설정（표시티치 펜던트전송）

**명령적재**: `0x2F0D` IO_CONTROL_IORESET_SET

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 로봇번호 |
| type | int | 예 | 1-IO리셋，2-切모드정지，3-프로그램보고오류정지 |
| enable | array | 예 | 16번째요소，값을이(가)0또는1，포함리셋값을及여부리셋 |
| value | array | 예 | 16번째요소，값을이(가)0또는1，포함리셋값을及여부리셋 |

```json
{
  "robot": 1,
  "type": 1,
  "enable": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "value": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}
```

---

#### 4.4.2 IO출력리셋조회（표시티치 펜던트전송）

**명령적재**: `0x2F0E` IO_CONTROL_IORESET_INQUIRE

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 로봇번호 |
| type | int | 예 | 유형 |

```json
{
  "robot": 1,
  "type": 1
}
```

---

#### 4.4.3 IO출력리셋응답（컨트롤러 응답）

**명령적재**: `0x2F0F` IO_CONTROL_IORESET_RESPOND

**설명**: data：同 0x2F0D

---

### 4.5 IO기능상태인터페이스

#### 4.5.1 IO기능상태조회（표시티치 펜던트전송）

**명령적재**: `0x2F12` IO_FUNCTION_INQUIRE

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| type | int | 예 | 1-숫자입력，2-숫자출력，3-시뮬레이션입력，4-시뮬레이션출력 |

```json
{
  "type": 1
}
```

---

#### 4.5.2 IO기능상태응답（컨트롤러 응답）

**명령적재**: `0x2F13` IO_FUNCTION_RESPOND

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| type | int | 예 | 유형 |
| IOFunction | array | 예 | 숫자有16번째，시뮬레이션有8번째 |

```json
{
  "type": 1,
  "IOFunction": [
    "원격：로봇1시작 로봇1비전:触전송포트",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ]
}
```

---

### 4.6 원격 모드인터페이스

#### 4.6.1 예약실행상태조회（표시티치 펜던트전송）

**명령적재**: `0x2F1B` RESERVE_EXE_STATE_INQUIRE

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 로봇번호 |

```json
{
  "robot": 1
}
```

---

#### 4.6.2 예약실행상태응답（컨트롤러 응답）

**명령적재**: `0x2F1C` RESERVE_EXE_STATE_RESPOND

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 로봇번호 |
| current | object | 예 | 현재실행상태 |
| queue | array | 예 | 队열（10번째요소） |

**current 객체매개변수**:

| 매개변수名 | 유형 | 설명 |
|--------|------|------|
| station | int | 工으로站（프로그램编번호） |
| name | string | 프로그램名 |
| runtime | int | 현재실행완료실행회数 |
| times | int | 현재실행실행총 수 |
| count | int | 실행총 수 |
| status | int | 실행상태：0-없음예약，1-예약에 복사합니다，2-실행에 복사합니다，3-완료예약，4-프로그램일시정지 |

**queue 배열요소매개변수**:

| 매개변수名 | 유형 | 설명 |
|--------|------|------|
| station | int | 工으로站（프로그램编번호） |
| name | string | 프로그램名 |
| times | int | 실행회数 |
| count | int | 실행총 수 |
| status | int | 상태 |

```json
{
  "robot": 1,
  "current": {
    "station": 1,
    "name": "Q1",
    "runtime": 1,
    "times": 3,
    "count": 1,
    "status": 2
  },
  "queue": [
    {"station": 1, "name": "Q4", "times": 2, "count": 0, "status": 1},
    {"station": 1, "name": "Q1", "times": 6, "count": 0, "status": 1},
    {"station": 1, "name": "Q3", "times": 1, "count": 0, "status": 1},
    {"station": 1, "name": "", "times": 1, "count": 0, "status": 0},
    {"station": 1, "name": "", "times": 2, "count": 0, "status": 0}
  ]
}
```

---

#### 4.6.3 실행총 수清零

**명령적재**: `0x2F1D` RESERVE_EXE_STATE_CLEAR

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 로봇번호 |

```json
{
  "robot": 1
}
```

---

### 4.7 IO유형번호설정

#### 4.7.1 IO유형번호설정（표시티치 펜던트전송）

**명령적재**: `0x2F21` IO_TYPE_SET

**설명**: 재시작生效

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| simuNum | int | 예 | 虚拟IO수량 |
| serialAnalog | object | 예 | 串口아날로그구성 |

**serialAnalog 객체매개변수**:

| 매개변수名 | 유형 | 설명 |
|--------|------|------|
| type | string | 선택：SUPER_ANAIO、DAC_ANAIO |
| port | int | 포트 번호 |
| baudRate | int | Baud Rate |

```json
{
  "simuNum": 0,
  "serialAnalog": {
    "type": "SUPER_ANAIO",
    "port": 1,
    "baudRate": 115200
  }
}
```

---

#### 4.7.2 IO유형번호조회（표시티치 펜던트전송）

**명령적재**: `0x2F22` IO_TYPE_INQUIRE

---

#### 4.7.3 IO유형번호응답（컨트롤러 응답）

**명령적재**: `0x2F23` IO_TYPE_RESPOND

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| num | int | 예 | IO板수량 |
| type | array | 예 | IO板유형열表 |
| portNum | array | 예 | 포트구성 |
| simuNum | int | 예 | 虚拟IO수량 |
| serialAnalog | object | 예 | 串口아날로그구성 |

```json
{
  "num": 3,
  "type": ["IO板R1", "盟알림", "虚拟IO"],
  "portNum": [[16, 16, 2, 2], [20, 16, 4, 2], [16, 16, 0, 0]],
  "simuNum": 1,
  "serialAnalog": {
    "type": "SUPER_ANAIO",
    "port": 1,
    "baudRate": 115200
  }
}
```

---

### 4.8 원격상태참고

#### 4.8.1 원격상태참고설정

**명령적재**: `0x2F24` IO_REMOTEOUTPUT_SET

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| outPut | array | 예 | 출력구성배열 |
| robot | int | 예 | 로봇번호 |

**outPut 배열요소매개변수**:

| 매개변수名 | 유형 | 설명 |
|--------|------|------|
| outagerecover | int | 해제电保持데이터복원DOUT1-2포트绑설정 |
| outagerecover_value | int | DOUT1-2포트값을：0、1、2（2代表闪烁） |
| program1~program10 | int | 원격IO프로그램DOUT포트绑설정 |
| program_value1~program_value10 | int | 원격IO프로그램DOUT출력포트값을：0、1、2（2代表闪烁） |

```json
{
  "outPut": [{
    "outagerecover": 2,
    "outagerecover_value": 0,
    "program1": 1,
    "program2": 2,
    "program3": 3,
    "program4": 0,
    "program5": 0,
    "program6": 0,
    "program7": 0,
    "program8": 63,
    "program9": 64,
    "program10": 0,
    "program_value1": 1,
    "program_value2": 1,
    "program_value3": 1,
    "program_value4": 0,
    "program_value5": 0,
    "program_value6": 0,
    "program_value7": 0,
    "program_value8": 0,
    "program_value9": 2,
    "program_value10": 0
  }],
  "robot": 1
}
```

---

#### 4.8.2 원격상태참고조회

**명령적재**: `0x2F25` IO_REMOTEOUTPUT_INQUIRE

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 로봇번호 |

```json
{
  "robot": 1
}
```

---

#### 4.8.3 원격상태참고응답

**명령적재**: `0x2F26` IO_REMOTEOUTPUT_RESPOND

**설명**: 이내容同 0x2F24

---

### 4.9 安全监측정설정

#### 4.9.1 安全监측정설정（표시티치 펜던트전송）

**명령적재**: `0x2F31` IO_SAFE_CHECK_SET

| 매개변수名 | 유형 | 필수 | 설명 |
|--------|------|------|------|
| robot | int | 예 | 로봇번호 |
| safeScreen | object | 예 | 安全光幕구성 |
| quickStop | object | 예 | 快速정지구성 |

**safeScreen 객체매개변수**:

| 매개변수名 | 유형 | 설명 |
|--------|------|------|
| enable | bool | 활성화安全光幕 |
| port1 | int | 安全光幕1 DIN序번호（1~16） |
| value1 | int | IO电平매개변수：0-Low，1-High |
| port2 | int | 安全光幕2 DIN序번호（1~16） |

---

## 5. 전역변수

### 5.1 현재위치모드

| 값을 | 모드 | 설명 |
|---|---|---|
| -1 | 컨트롤러현재좌표 | 컨트롤러현재좌표 |
| 0 | 관절좌표(Joint) | 관절좌표계 |
| 1 | 직교좌표(Angle) | 직교좌표계 |
| 2 | 도구좌표(Tool) | 도구좌표계 |
| 3 | 사용자좌표(User) | 사용자좌표계 |

---

### 5.2 가져오기전역위치변수포인트

**명령**: `0x5602` GLOBAL_ALLPOSITION_INQUIRE

| 매개변수 | 유형 | 필수 | 설명 |
|---|---|---|---|
| robot | int | 예 | 로봇번호 |

```json
{
  "robot": 1
}
```

**컨트롤러回복원**: `0x5603` GLOBAL_ALLPOSITION_RESPOUND

| 매개변수 | 유형 | 설명 |
|---|---|---|
| robot | int | 로봇번호 |
| globalPosition | object | 전역포인트열表 |
| note | object | 등록해제열表 |

```json
{
  "robot": 1,
  "globalPosition": {
    "GP0001": [0, 0, 1.1, 2.2, 3.3, 4.4, 5.5, 6.6],
    "GP0003": [0, 0, 1.1, 2.2, 3.3, 4.4, 5.5, 6.6]
  },
  "note": {
    "GP0001": "qqqq",
    "GP0002": "",
    "GP0003": "www"
  }
}
```

> **설명**: 만일예四축로봇，最뒤两비트补0。

---

### 5.3 설정전역포인트

**명령**: `0x5604` GLOBAL_POSITION_SET

| 매개변수 | 유형 | 필수 | 설명 |
|---|---|---|---|
| robot | int | 예 | 로봇번호 |
| posName | string | 예 | 포인트이름 |
| pos | array | 예 | 포인트데이터（14요소） |
| note | string | 아니오 | 등록해제 |

**pos 배열설명** (共14요소):

| 인덱스 | 설명 |
|---|---|
| 0 | 좌표계: 0-관절, 1-직교, 2-도구, 3-사용자 |
| 1 | 단위: 0-弧도생성, 1-角도생성 |
| 2 | 자세: 0-없음, 1-手左, 2-右手 |
| 3 | 도구좌표编번호 |
| 4 | 사용자좌표编번호 |
| 5-6 | 预留비트 |
| 7-13 | 위치데이터: J1~J7 / xyzabc |

```json
{
  "robot": 1,
  "posName": "GP0001",
  "pos": [1, 0, 0, 0, 0, 0, 0, 459, 0, 796, 3.141, 0, 0, 0],
  "note": "data"
}
```

---

### 5.4 조회전역포인트

**명령**: `0x5605` GLOBAL_POSITION_INQUIRE

| 매개변수 | 유형 | 필수 | 설명 |
|---|---|---|---|
| robot | int | 예 | 로봇번호 |
| posName | string | 예 | 포인트이름 |

```json
{
  "robot": 1,
  "posName": "GP0001"
}
```

**컨트롤러回복원**: `0x5606` GLOBAL_POSITION_RESPOUND

| 매개변수 | 유형 | 설명 |
|---|---|---|
| note | string | 등록해제 |
| posName | string | 변수名 |
| posValue | array | 弧도생성포인트 |
| posValueDeg | array | 角도생성포인트 |
| robot | int | 로봇번호 |

```json
{
  "note": "",
  "posName": "GP0001",
  "posValue": [1.0, 1.0, 8.0, 0.0, 0.0, 0.0, 0.0, 377.5550, 1.3950, 718.3910, 3.104225101352, 0.106517442432, 0.024713861787, 0.0],
  "posValueDeg": [1.0, 1.0, 8.0, 0.0, 0.0, 0.0, 0.0, 377.5550, 1.3950, 718.3910, 177.858996966040, 6.102999895881, 1.415999975865, 0.0],
  "robot": 1
}
```

---

### 5.5 설정전역값변수

**명령**: `0x5607` GLOBAL_VARIANT_SET

| 매개변수 | 유형 | 필수 | 설명 |
|---|---|---|---|
| varName | string | 예 | 변수이름 |
| varType | int | 예 | 변수유형: 0-int, 1-double, 2-bool, 3-string |
| varValue | double | 아니오 | 변수값을（값유형사용） |
| varString | string | 아니오 | 변수값을（string유형사용） |
| varNote | string | 아니오 | 등록해제 |

```json
{
  "varName": "GI001",
  "varType": 1,
  "varValue": 14.0,
  "varString": "oooo",
  "varNote": "aaa"
}
```

---

### 5.6 가져오기전역값변수열表

**명령**: `0x5608` GLOBAL_VARIANT_INQUIRE

| 매개변수 | 유형 | 필수 | 설명 |
|---|---|---|---|
| varType | int | 예 | 변수유형: 1-불리언형, 2-int유형, 3-double유형 |

```json
{
  "varType": 1
}
```

**컨트롤러回복원**: `0x5609` GLOBAL_VARIANT_RESPOND

| 매개변수 | 유형 | 설명 |
|---|---|---|
| varType | int | 변수유형 |
| varNum | int | 값변수번째数 (0-100) |
| varList | array | 값변수열表 |

**varList 배열요소**:

| 매개변수 | 유형 | 설명 |
|---|---|---|
| varName | string | 변수名字 |
| varValue | mixed | 변수값을 |
| varNote | string | 등록해제 |

```json
{
  "varType": 1,
  "varNum": 2,
  "varList": [
    {
      "varName": "I001",
      "varValue": 3,
      "varNote": "QQQ"
    },
    {
      "varName": "D002",
      "varValue": 8.4,
      "varNote": "hhha"
    }
  ]
}
```

---

### 5.7 요청전역값등록해제

**명령**: `0x5610` GLOBAL_ALLVARIANT_NOTE_INQUIRE

| 매개변수 | 유형 | 필수 | 설명 |
|---|---|---|---|
| varType | int | 예 | 변수유형: 1-bool, 2-int, 3-double, 4-string |

```json
{
  "varType": 1
}
```

**컨트롤러回복원**: `0x5611` GLOBAL_ALLVARIANT_NOTE_RESPOND

| 매개변수 | 유형 | 설명 |
|---|---|---|
| varNote | object | 등록해제열表 |
| varType | int | 변수유형 |

```json
{
  "varNote": {
    "GB001": "III",
    "GB002": "SDFSF"
  },
  "varType": 1
}
```

---

### 5.8 조회单번째전역변수

**명령**: `0x560B` GLOBAL_VARIANT_INQUIRE

| 매개변수 | 유형 | 필수 | 설명 |
|---|---|---|---|
| varType | int | 예 | 변수유형: 0-int, 1-double, 2-bool, 3-string |
| varName | string | 예 | 변수이름 |
| identity | string | 아니오 | 来源标인식 |

**identity 가져오기값을설명**:

| 값을 | 설명 |
|---|---|
| VariableReview | 监控인터페이스전역변수 |
| NumerlcalVarWidget | 전역값변수인터페이스 |

```json
{
  "varType": 1,
  "varName": "GI001",
  "identity": "VariableReview"
}
```

**컨트롤러回복원**: `0x560C` GLOBAL_VARIANT_RESPOUND

| 매개변수 | 유형 | 설명 |
|---|---|---|
| varType | int | 변수유형 |
| varName | string | 변수이름 |
| varValue | mixed | 변수값을 |
| varString | string | 문자열값을（string유형） |
| identity | string | 来源标인식 |
| varNote | string | 등록해제 |

```json
{
  "varType": 1,
  "varName": "GI001",
  "varValue": 666,
  "varString": "i'm a string",
  "identity": "VariableReview",
  "varNote": "跳伞시뮬레이션器"
}
```

---

### 5.9 로컬변수위치변수P点조회

**명령**: `0x5612` LOCAL_POS_P_VAR_INQUIRE

| 매개변수 | 유형 | 필수 | 설명 |
|---|---|---|---|
| robot | int | 예 | 로봇번호 |
| varname | string | 예 | 포인트이름 |
| initialValue | bool | 예 | 여부이(가)초기시작값을 |

```json
{
  "robot": 1,
  "varname": "P0001",
  "initialValue": true
}
```

**컨트롤러回복원**: `0x5613` LOCAL_POS_P_VAR_RESPOND

| 매개변수 | 유형 | 설명 |
|---|---|---|
| robot | int | 로봇번호 |
| jobname | string | 작업파일이름 |
| varname | string | 포인트이름 |
| initialValue | bool | 여부이(가)초기시작값을 |
| pos | array | 포인트（弧도생성） |
| posDeg | array | 포인트（角도생성） |

```json
{
  "robot": 1,
  "jobname": "Q1",
  "varname": "P0001",
  "initialValue": true,
  "pos": [0, 0, 1, 2, 3, 4, 5, 6],
  "posDeg": [0, 0, 1, 2, 3, 4, 5, 6]
}
```

---

### 5.10 로컬변수위치변수E点조회

**명령**: `0x5615` LOCAL_POS_E_VAR_INQUIRE

| 매개변수 | 유형 | 필수 | 설명 |
|---|---|---|---|
| robot | int | 예 | 로봇번호 |
| varname | string | 예 | 포인트이름 |
| initialValue | bool | 예 | 여부이(가)초기시작값을 |

```json
{
  "robot": 1,
  "varname": "E0001",
  "initialValue": true
}
```

**컨트롤러回복원**: `0x5616` LOCAL_POS_E_VAR_RESPOND

| 매개변수 | 유형 | 설명 |
|---|---|---|
| robot | int | 로봇번호 |
| jobname | string | 작업파일이름 |
| varname | string | 포인트이름 |
| initialValue | bool | 여부이(가)초기시작값을 |
| pos | array | 포인트（弧도생성，11요소） |
| posDeg | array | 포인트（角도생성，11요소） |

```json
{
  "robot": 1,
  "jobname": "Q1",
  "varname": "E001",
  "initialValue": true,
  "pos": [0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  "posDeg": [0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
}
```

---

### 5.11 로컬변수값변수조회

**명령**: `0x5618` LOCAL_VALUE_VAR_INQUIRE

| 매개변수 | 유형 | 필수 | 설명 |
|---|---|---|---|
| robot | int | 예 | 로봇번호 |
| vartype | int | 예 | 변수유형: 0-int, 1-double, 2-bool, 3-string |
| varname | string | 예 | 변수이름 |
| initialValue | bool | 예 | 여부이(가)초기시작값을 |
| identify | string | 아니오 | 来源标인식 |

**identify 가져오기값을설명**:

| 값을 | 설명 |
|---|---|
| CommandInsert | 삽입명령어인터페이스변수 |
| VariableReview | 监控인터페이스값변수 |

```json
{
  "robot": 1,
  "vartype": 1,
  "varname": "I001",
  "initialValue": true,
  "identify": "CommandInsert"
}
```

**컨트롤러回복원**: `0x5619` LOCAL_VALUE_VAR_RESPOND

| 매개변수 | 유형 | 설명 |
|---|---|---|
| robot | int | 로봇번호 |
| jobname | string | 작업파일이름 |
| vartype | int | 변수유형: 1-bool, 2-int, 3-double |
| varname | string | 변수이름 |
| value | mixed | 변수값을（값유형） |
| string | string | 변수값을（문자열유형） |
| identify | string | 来源标인식 |

```json
{
  "robot": 1,
  "jobname": "Q1",
  "vartype": 1,
  "varname": "I001",
  "value": 2,
  "string": "i'm a string",
  "identify": "CommandInsert"
}
```

---

### 5.12 전역외부 축변수

> **설명**: 전역외부 축변수구조: 포인트정보(7) + 로봇위치(7) + 외부 축위치(5) + 预留(2) = 21요소

#### 5.12.1 설정전역외부 축변수

**명령**: `0x561a` GLOBAL_EXTPOS_VAR_SET

| 매개변수 | 유형 | 필수 | 설명 |
|---|---|---|---|
| robot | int | 예 | 로봇번호 |
| varname | string | 예 | 포인트이름 |
| pos | array | 예 | 포인트데이터（21요소） |
| note | string | 아니오 | 비고 |

**pos 배열설명**:

| 인덱스범위 | 설명 |
|---|---|
| 0-6 | 포인트정보 |
| 7-13 | robot위치 |
| 14-18 | sync외부 축위치 |
| 19-20 | 预留 |

```json
{
  "robot": 1,
  "varname": "GE001",
  "pos": [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 2.0, 2.1, 2.2, 2.3, 2.4, 0, 0],
  "note": "qqq"
}
```

#### 5.12.2 조회전역외부 축변수

**명령**: `0x561b` GLOBAL_EXTPOS_VAR_INQUIRE

| 매개변수 | 유형 | 필수 | 설명 |
|---|---|---|---|
| robot | int | 예 | 로봇번호 |
| varname | string | 예 | 포인트이름 |
| initialValue | bool | 예 | 여부이(가)초기시작값을 |

```json
{
  "robot": 1,
  "varname": "GE0001",
  "initialValue": true
}
```

**컨트롤러回복원**: `0x561c` GLOBAL_EXTPOS_VAR_RESPOND

| 매개변수 | 유형 | 설명 |
|---|---|---|
| note | string | 등록해제 |
| varname | string | 변수이름 |
| initialValue | bool | 여부이(가)초기시작값을 |
| posValue | array | GP + 이외部点（弧도생성） |
| posValueDeg | array | GP + 이외部点（角도생성） |

```json
{
  "note": "",
  "varname": "GE001",
  "initialValue": true,
  "posValue": [0.0, 0.0, 0.0, 0.0],
  "posValueDeg": [0.0, 0.0, 0.0, 0.0]
}
```

#### 5.12.3 가져오기전체전역외부 축포인트

**명령**: `0x561d` GLOBAL_ALLEXTPOS_VAR_INQUIRE

| 매개변수 | 유형 | 필수 | 설명 |
|---|---|---|---|
| robot | int | 예 | 로봇번호 |

```json
{
  "robot": 1
}
```

**컨트롤러回복원**: `0x561e` GLOBAL_ALLEXTPOS_VAR_RESPOND

| 매개변수 | 유형 | 설명 |
|---|---|---|
| robot | int | 로봇번호 |
| globalExtPosition | object | 포인트열表 |
| note | object | 등록해제열表 |

```json
{
  "robot": 1,
  "globalExtPosition": {
    "GE001": [0, 0, 1.1, 2.2, 3.3, 4.4, 5.5, 6.6],
    "GE003": [0, 0, 1.1, 2.2, 3.3, 4.4, 5.5, 6.6]
  },
  "note": {
    "GE001": "qqqq",
    "GE002": "",
    "GE003": "www"
  }
}
```

---

### 5.13 로봇포인트좌표계변환

**명령**: `0x2A12` POS_TRANS_COORD

| 매개변수 | 유형 | 필수 | 설명 |
|---|---|---|---|
| robot | int | 예 | 로봇번호 |
| name | string | 예 | 点名字 |
| pos | array | 예 | 포인트데이터（21요소） |
| targetCoord | int | 예 | 대상좌표계: 0-관절, 1-직교, 2-도구, 3-사용자 |

```json
{
  "robot": 1,
  "name": "P001",
  "pos": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "targetCoord": 1
}
```

**컨트롤러回복원**: `0x2A13` POS_TRANS_COORD_RESPOND

| 매개변수 | 유형 | 설명 |
|---|---|---|
| name | string | 点名字 |
| pos | array | 포인트정보（알림사용하여21비트데이터，弧도생성） |
| posDeg | array | 포인트정보（알림사용하여21비트데이터，角도생성） |
| robot | int | 로봇번호 |

```json
{
  "name": "P001",
  "pos": [1, 1, 0, 0, 0, 0, 0, 459.62120, -0.1010, 796.79160, 3.141592653590, 0.0, 0.0, 0.0],
  "posDeg": [1, 1, 0, 0, 0, 0, 0, 459.62120, -0.1010, 796.79160, 180.0, 0.0, 0.0, 0.0],
  "robot": 1
}
```
