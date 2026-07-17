# 2.상태제어

本文档包含以下内容：

- [伺服상태](#1-伺服상태)
- [시스템상태](#2-시스템상태)
- [数字输入输出](#3-数字输入输出)
- [远程IO제어](#4-远程io제어)
- [全局변수](#5-全局변수)

---

## 1. 伺服상태

### 1.1 伺服연결상태

#### 1.1.1 조회伺服연결상태

| 项目 | 值 |
|------|-----|
| 명령어 | `0x5042` SERVO_CONNECT_INQUIRE |

**요청 매개변수**：无

```json
{}
```

#### 1.1.2 收到조회연결상태时，반환

| 项目 | 值 |
|------|-----|
| 명령어 | `0x5043` SERVO_CONNECT_RESPOND |

| 매개변수 | 유형 | 설명 |
|------|------|------|
| servoType | int | 伺服유형 |

```json
{
  "servoType": 0
}
```

---

### 1.2 伺服상태설정及获取

#### 1.2.1 호스트 컴퓨터改变伺服的상태

**명령어**：`0x2001` SERVO_STATUS_SET

| 매개변수 | 유형 | 설명 | 取值범위 |
|------|------|------|----------|
| robot | int | 选择로봇 | [1, 4] |
| status | int | 伺服상태 | 0: 真实伺服, 1: 虚拟伺服, 2: 无伺服 |

```json
{
  "robot": 1,
  "status": 0
}
```

#### 1.2.2 호스트 컴퓨터조회伺服상태

**명령어**：`0x2002` SERVO_STATUS_INQUIRE

| 매개변수 | 유형 | 설명 | 取值범위 |
|------|------|------|----------|
| robot | int | 选择로봇 | [1, 4] |

```json
{
  "robot": 1
}
```

#### 1.2.3 컨트롤러回复伺服상태

**명령어**：`0x2003` SERVO_STATUS_RESPOND

| 매개변수 | 유형 | 설명 | 取值범위 |
|------|------|------|----------|
| robot | int | 选择로봇 | [1, 4] |
| mode | int | 실행 모드 | 0: 单机모드, 1: 多机모드 |
| status | int | 伺服상태 | 0: 停止, 1: 就绪, 2: 错误, 3: 실행 |

```json
{
  "mode": 0,
  "robot": 1,
  "status": 0
}
```

---

### 1.3 조작모드상태설정及获取

**조작모드설명**：

| 모드值 | 名称 | 설명 |
|--------|------|------|
| 0 | 示티치 모드 (Teach) | - |
| 1 | 원격 모드 (Circle) | - |
| 2 | 실행 모드 (Repeat) | - |

#### 1.3.1 호스트 컴퓨터설정当前컨트롤러조작모드

**명령어**：`0x2101` OPERATION_MODE_SET

| 매개변수 | 유형 | 설명 | 取值범위 |
|------|------|------|----------|
| mode | int | 조작모드 | 0: 示티치 모드, 1: 원격 모드, 2: 실행 모드 |

```json
{
  "mode": 0
}
```

#### 1.3.2 호스트 컴퓨터조회조작모드

**명령어**：`0x2102` OPERATION_MODE_INQUIRE

**요청 매개변수**：无

```json
{}
```

#### 1.3.3 컨트롤러回复조작모드

**명령어**：`0x2103` OPERATION_MODE_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| mode | int | 조작모드 |

```json
{
  "mode": 0
}
```

#### 1.3.4 호스트 컴퓨터改变示教的조작모드

**명령어**：`0x2104` TEACHTYPE_SET

| 매개변수 | 유형 | 설명 | 取值범위 |
|------|------|------|----------|
| teachType | int | 示教유형 | 0: 点动(单动), 1: 拖拽示教, 2: 点动(联动) |

```json
{
  "teachType": 0
}
```

#### 1.3.5 호스트 컴퓨터조회示教유형

**명령어**：`0x2105` TEACHTYPE_INQUIRE

**요청 매개변수**：无

```json
{}
```

#### 1.3.6 컨트롤러回复示教유형

**명령어**：`0x2106` TEACHTYPE_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| teachType | int | 示教유형 |

```json
{
  "teachType": 0
}
```

---

### 1.4 좌표모드상태설정及获取

**좌표모드설명**：

| 모드值 | 名称 | 설명 |
|--------|------|------|
| 0 | 관절좌표 (Joint) | - |
| 1 | 直角좌표 (Cart) | - |
| 2 | 도구좌표 (Tool) | - |
| 3 | 사용자좌표 (User) | - |

#### 1.4.1 호스트 컴퓨터改变当前좌표모드

**명령어**：`0x2201` COORD_MODE_SET

| 매개변수 | 유형 | 설명 | 取值범위 |
|------|------|------|----------|
| robot | int | 选择로봇 | [1, 4] |
| coord | int | 좌표모드 | 0: 관절좌표, 1: 直角좌표, 2: 도구좌표, 3: 사용자좌표 |

```json
{
  "robot": 1,
  "coord": 0
}
```

#### 1.4.2 호스트 컴퓨터조회좌표모드

**명령어**：`0x2202` COORD_MODE_INQUIRE

| 매개변수 | 유형 | 설명 | 取值범위 |
|------|------|------|----------|
| robot | int | 选择로봇 | [1, 4] |

```json
{
  "robot": 1
}
```

#### 1.4.3 컨트롤러回复좌표모드

**명령어**：`0x2203` COORD_MODE_RESPOND

| 매개변수 | 유형 | 설명 | 取值범위 |
|------|------|------|----------|
| robot | int | 选择로봇 | [1, 4] |
| coord | int | 좌표모드 | 0: 관절좌표, 1: 直角좌표, 2: 도구좌표, 3: 사용자좌표 |

```json
{
  "robot": 1,
  "coord": 0
}
```

---

### 1.5 伺服上下电상태설정及获取

#### 1.5.1 티치 펜던트改变当前上下电상태

**명령어**：`0x2301` DEADMAN_STATUS_SET

| 매개변수 | 유형 | 설명 | 取值범위 |
|------|------|------|----------|
| deadman | int | 上下电상태 | 0: DEADMAN下电, 1: DEADMAN上电 |

```json
{
  "deadman": 0
}
```

#### 1.5.2 티치 펜던트조회上下电상태

**명령어**：`0x2302` DEADMAN_STATUS_INQUIRE

**요청 매개변수**：无

```json
{}
```

#### 1.5.3 컨트롤러回复上下电상태

**명령어**：`0x2303` DEADMAN_STATUS_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| deadman | int | 上下电상태 |

```json
{
  "deadman": 0
}
```

#### 1.5.4 호스트 컴퓨터설정上下电모드

**명령어**：`0x2304` DEADMAN_MODE_SET

| 매개변수 | 유형 | 설명 | 取值범위 |
|------|------|------|----------|
| deadmanMode | int | 触发모드 | 0: 软件触发, 1: 硬件触发 |
| deadmanPortOne | int | 上使能포트IO포트 번호 | 每个포트最多可分配16个IO序号 |
| deadmanPortTwo | int | 下使能포트IO포트 번호 | - |

```json
{
  "deadmanMode": 1,
  "deadmanPortOne": 9,
  "deadmanPortTwo": 0
}
```

#### 1.5.5 호스트 컴퓨터조회上下电모드

**명령어**：`0x2305` DEADMAN_MODE_INQUIRE

**요청 매개변수**：无

```json
{}
```

#### 1.5.6 컨트롤러回复上下电모드

**명령어**：`0x2306` DEADMAN_MODE_RESPOND

| 매개변수 | 유형 | 설명 | 取值범위 |
|------|------|------|----------|
| deadmanMode | int | 触发모드 | 0: 软件触发, 1: 硬件触发 |
| deadmanPortOne | int | 上使能포트IO포트 번호 | 每个포트最多可分配16个IO序号 |
| deadmanPortTwo | int | 下使能포트IO포트 번호 | - |

```json
{
  "deadmanMode": 1,
  "deadmanPortOne": 9,
  "deadmanPortTwo": 0
}
```

#### 1.5.7 伺服上使能（示教盒无该명령어）

**명령어**：`0x2311` MAN_BEG_OPERATION

| 매개변수 | 유형 | 설명 | 取值범위 |
|------|------|------|----------|
| robot | int | 选择로봇 | [1, 4] |

```json
{
  "robot": 1
}
```

#### 1.5.8 로봇紧急停止

> 注：原2314为伺服下电，프로그램中不存在

**명령어**：`0x2314` MAN_END_OPERATION

| 매개변수 | 유형 | 설명 | 取值범위 |
|------|------|------|----------|
| robot | int | 选择로봇 | [1, 4] |

```json
{
  "robot": 1
}
```

---

### 1.6 清除伺服错误

#### 1.6.1 티치 펜던트清除伺服错误

**명령어**：`0x3201` FAULT_RESET

| 매개변수 | 유형 | 설명 | 取值범위 |
|------|------|------|----------|
| robot | int | 选择로봇 | [1, 4] |

```json
{
  "robot": 1
}
```

#### 1.6.2 清除伺服错误后，반환清除结果

**명령어**：`0x3202` FAULT_RESET_RESULT

| 매개변수 | 유형 | 설명 |
|------|------|------|
| robot | int | 选择로봇 |
| clearErrflag | bool | true: 清除伺服错误成功, false: 清除失败 |

```json
{
  "robot": 1,
  "clearErrflag": true
}
```

---

## 2. 시스템상태

### 2.1 컨트롤러初始化是否完成

#### 조회是否完成

**명령어**：`0x4305` CONTROLLER_INIT_FINISH_INQUIRE

**요청 매개변수**：无

```json
{}
```

#### 컨트롤러回复

**명령어**：`0x4306` CONTROLLER_INIT_FINISH_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| finishinit | bool | true：完成，false：未完成 |

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
| name | string | 网卡名称 |
| address | string | IP주소 |
| gateway | string | 网关 |
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

**요청 매개변수**：无

#### 컨트롤러回复

**명령어**：`0x4303` CONTROLLER_IP_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| num | int | 网卡数量 |
| network | array | 网卡信息数组 |

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

#### 获取컨트롤러ID

**명령어**：`0x5052` IDENTIFY_NUMBER_INQUIRE

#### 컨트롤러回复

**명령어**：`0x5053` IDENTIFY_NUMBER_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| controllerID | string | 컨트롤러ID |

```json
{
  "controllerID": "4DC9F0249098C82E"
}
```

#### 获取컨트롤러剩余使用天数

**명령어**：`0x5055` USE_REST_DAYS_INQUIRE

#### 컨트롤러回复

**명령어**：`0x5056` USE_REST_DAYS_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| restdays | int | 剩余天数，-1：无限期使用，0：使用期限已到 |
| year | int | 过期年份 |
| mon | int | 过期月份 |
| day | int | 过期日 |

```json
{
  "restdays": 30,
  "year": 1,
  "mon": 1,
  "day": 1
}
```

#### 更新序列号

**명령어**：`0x5057` LICENSE_SERIAL_SET

| 매개변수 | 유형 | 설명 |
|------|------|------|
| license | string | 컨트롤러序列号 |

```json
{
  "license": "ACOCWKBZHSKBEJHI"
}
```

#### 컨트롤러回复

**명령어**：`0x5059` LICENSE_SERIAL_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| result | string | 密钥更新成功，컨트롤러即将重启 |
| ivalid | string | 无效的密钥 |
| error | string | 存在破解嫌疑，拒绝解锁 |

```json
{
  "result": "success",
  "ivalid": "无效的密钥!",
  "error": "存在破解嫌疑，拒绝解锁!"
}
```

#### 조회图片版本

**명령어**：`0x505A` IMAGE_VERSION_INQUIRE（티치 펜던트无此기능）

#### 반환조회结果

**명령어**：`0x505B` IMAGE_VERSION_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| result | bool | 조회是否成功 |
| version | int | 版本号（조회成功时반환） |

```json
{
  "result": true,
  "version": xx
}
```

#### 컨트롤러전송（无权使用提示）

**명령어**：`0x505C` DISABLE_CONTROLLER

| 매개변수 | 유형 | 설명 |
|------|------|------|
| reason | string | 컨트롤러无权使用提示信息 |

```json
{
  "reason": ""
}
```

#### 컨트롤러전송（剩余天数提醒）

**명령어**：`0x505F` REST_DAYS_REMIND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| restDays | int | 컨트롤러전송剩余使用天数 |

```json
{
  "restDays": 0
}
```

---

### 2.4 版本号获取

티치 펜던트需要获取当前컨트롤러版本号时，전송下面명령：

**명령어**：`0x3402` VERSIONNUM_INQUIRE

#### 컨트롤러收到조회명령时，전송下面명령

**명령어**：`0x3403` VERSIONNUM_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| configFileVersionMismatch | bool | 구성파일是否匹配，false：不匹配；true：匹配 |
| jobFileVersion | string | 작업파일版本 |
| rtlVersion | string | 컨트롤러版本 |
| sysClock | string | 시스템时钟，格式：YYYY.MM.DD HH:MM:SS |
| version | string | 版本号内容 |
| servoVersion | string | 伺服版本（久同컨트롤러 응답空字符串） |
| ocmVersion | string | 静态库版本（久同컨트롤러 응답空字符串） |
| ioVersion | string | IO版本号（久同컨트롤러 응답空字符串） |
| nodka_c1201 | object | C1201컨트롤러专用节点 |

**nodka_c1201 节点매개변수 설명**：

| 매개변수 | 유형 | 설명 |
|------|------|------|
| deviceId | string | 设备ID |
| hw_version | string | 硬件版本号 |
| fw_version | string | 固件版本号 |
| drv_version | string | 驱动版本号 |

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

### 2.5 版本核验

#### 조회是否存在当前版本的티치 펜던트프로그램

**명령어**：`0x3404` EXIST_TEACHBOX_EQUAL_QTTP_INQUIRE

| 매개변수 | 유형 | 설명 |
|------|------|------|
| MD5 | string | 티치 펜던트프로그램的MD5值 |

```json
{
  "MD5": "xx"
}
```

#### 반환조회结果

**명령어**：`0x3405` EXIST_TEACHBOX_EQUAL_QTTP_RESPOND

如果未조회到，则需要上传当前版本的프로그램。

| 매개변수 | 유형 | 설명 |
|------|------|------|
| backuppath | string | 티치 펜던트프로그램路径 |

```json
{
  "backuppath": "xx"
}
```

#### 조회是否存在与컨트롤러版本匹配的티치 펜던트프로그램

**명령어**：`0x3406` EXIST_CONTROLLER_MATCHED_QTTP_INQUIRE

**요청 매개변수**：无

#### 반환조회结果

**명령어**：`0x3407` EXIST_CONTROLLER_MATCHED_QTTP_RESPOND

若结果为是，则弹框让客户选择是否自动升级。

| 매개변수 | 유형 | 설명 |
|------|------|------|
| backuppath | string | 티치 펜던트프로그램路径 |

```json
{
  "backuppath": "xx"
}
```

---

### 2.6 重启컨트롤러

重启컨트롤러时，티치 펜던트전송：

**명령어**：`0x5061` REBOOT_CONTROLLER

**요청 매개변수**：无

---

### 2.7 恢复出厂설정

恢复出厂설정时，티치 펜던트전송：

**명령어**：`0x5064` RETURN_FACTORY_SET

| 매개변수 | 유형 | 설명 |
|------|------|------|
| clearConfigFile | bool | 清除所有시스템구성파일 |
| clearExtendedFile | bool | 清除所有扩展파일 |

```json
{
  "clearConfigFile": true,
  "clearExtendedFile": true
}
```

---

### 2.8 시스템自动备份

#### 备份시스템

티치 펜던트전송：

**명령어**：`0x5065` CONTROLLER_BACKUP_INQUIRE

**요청 매개변수**：无

#### 컨트롤러回复

**명령어**：`0x5066` CONTROLLER_BACKUP_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| backUpNum | int | 备份数 |
| backUpName | array | 备份시스템的名字，最多十个 |

```json
{
  "backUpNum": 1,
  "backUpName": ["string", "string", "string"]
}
```

#### 恢复시스템

티치 펜던트전송：

**명령어**：`0x5067` CONTROLLER_BACKUP_RESTORE

| 매개변수 | 유형 | 설명 |
|------|------|------|
| backUpOneName | string | 需要恢复的시스템名称 |

```json
{
  "backUpOneName": "string"
}
```

#### 컨트롤러回复

**명령어**：`0x5068` CONTROLLER_BACKUP_RESTORE_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| success | bool | true：시스템恢复成功，false：시스템恢复失败 |

```json
{
  "success": true
}
```

---

### 2.9 伺服매개변수

#### 通过컨트롤러설정伺服内部매개변수

**명령어**：`0x5071` SERVO_INSIDE_PARM_SET

| 매개변수 | 유형 | 설명 |
|------|------|------|
| robot | int | 로봇号 |
| servoNum | int | 伺服号 |
| 매개변수名 | object | 伺服매개변수名 |

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
| robot | int | 로봇号 |
| servoNum | int | 伺服号 |

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
| robot | int | 로봇号 |
| servoNum | int | 伺服号 |
| sendNum | int | 전송编号 |
| totalNum | int | 总数 |
| servo | array | 具体伺服매개변수数组 |

```json
{
  "robot": 1,
  "servoNum": 1,
  "sendNum": 1,
  "totalNum": 1,
  "servo": [
    {
      "name": "电机额定功率",
      "value": 3000
    },
    {
      "name": "电机额定转速",
      "value": 4000
    }
  ]
}
```

---

### 2.10 파일传输

#### 요청上传某파일

**명령어**：`0x5501` REQUEST_UPLOAD_FILE

| 매개변수 | 유형 | 설명 |
|------|------|------|
| name | string | 파일名称 |
| size | int | 파일大小 |

```json
{
  "name": "vxWorks",
  "size": 4096
}
```

#### 同意上传요청/拒绝上传요청

**명령어**：`0x5502` REQUEST_UPLOAD_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| answer | string | "yes"：同意上传，"busy"：컨트롤러忙碌 |

```json
{
  "answer": "yes"
}
```

#### 요청下载某파일

**명령어**：`0x5504` REQUEST_DOWNLOAD_FILE

| 매개변수 | 유형 | 설명 |
|------|------|------|
| name | string | 파일名称 |

```json
{
  "name": "log.0"
}
```

#### 同意下载요청/拒绝下载요청

**명령어**：`0x5505` REQUEST_DOWNLOAD_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| answer | string | "yes"：同意下载，"busy"：컨트롤러忙碌，"nofile"：无此파일 |
| name | string | 작업파일全路径 |
| size | int | 如果拒绝，则size无效 |

```json
{
  "answer": "yes",
  "name": "log.0",
  "size": 4096
}
```

---

### 2.11 파일传输网络异常中断（仅티치 펜던트）

**명령어**：`0x5525` DownLoadInterrupt

**요청 매개변수**：无

```json
{}
```

---

### 2.12 티치 펜던트조회컨트롤러구성파일目录

**명령어**：`0x5507` CONFIG_FILE_INQUIRY

| 매개변수 | 유형 | 설명 |
|------|------|------|
| isExport | bool | true：表示导出구성，false表示导入구성 |

```json
{
  "isExport": true
}
```

---

### 2.13 컨트롤러向티치 펜던트전송구성파일目录

**명령어**：`0x5508` CONFIG_FILE_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| filenum | int | 구성파일数量 |
| filelist | array | 구성파일名称列表 |

```json
{
  "filenum": 2,
  "filelist": ["xxx.json", "yyy.json"]
}
```

---

### 2.14 전송파일二进制데이터

**명령어**：`0x5511` UploadFileData（告诉컨트롤러파일전송完成）

**명령어**：`0x5512` UploadFileDone（循环给컨트롤러전송파일）

#### 컨트롤러回复

**명령어**：`0x5513` ReceiveUploadFinish

| 매개변수 | 유형 | 설명 |
|------|------|------|
| finish | bool | true表示上传成功，false表示失败 |

```json
{
  "finish": true
}
```

---

### 2.15 티치 펜던트요청获取日志파일列表

**명령어**：`0x5542` LOGFILE_LIST_INQUIRE

| 매개변수 | 유형 | 설명 |
|------|------|------|
| num | int | 表示获取最近多少个파일，可选值：5、30、100 |

```json
{
  "num": 5
}
```

#### 컨트롤러回复日志파일列表

**명령어**：`0x5543` LOGFILE_LIST_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| absolutepath | string | 日志所在目录 |
| logfilenum | int | 注意，这个数和上面的num不一定相等 |
| logfilelist | array | 日志列表 |

```json
{
  "absolutepath": "log/",
  "logfilenum": 3,
  "logfilelist": ["logInfo.0", "logInfo.1", "logInfo.2"]
}
```

---

### 2.16 ENI파일列表조회

**명령어**：`0x5545` ENIFILE_LIST_INQUIRE

| 매개변수 | 유형 | 설명 |
|------|------|------|
| num | int | 表示获取最近多少个파일，可选值：5、30、100 |

```json
{
  "num": 5
}
```

#### 컨트롤러回复ENI파일列表

**명령어**：`0x5546` ENIFILE_LIST_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| absolutepath | string | 파일所在目录 |
| ENIfilenum | int | 注意，这个数和上面的num不一定相等 |

```json
{
  "absolutepath": "log/",
  "ENIfilenum": 3
}
```

---

### 2.17 티치 펜던트전송表示已接受完成

**명령어**：`0x5544` DownLoadControlLogFileFinish

---

### 2.18 티치 펜던트요청获取작업파일列表

**명령어**：`0x5532` JOBFILE_LIST_INQUIRE

#### 컨트롤러回复작업파일目录及数量

**명령어**：`0x5533` JOBFILE_SUM_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| absolutepath | array | 작업파일路径 |
| jobfilenum | array | 各작업파일路径下的작업파일数量 |

```json
{
  "absolutepath": ["/job/R1/", "/job/R2/", "/job/R3/", "/job/R4/"],
  "jobfilenum": [2, 33, 233, 666]
}
```

#### 컨트롤러回复작업파일列表

**명령어**：`0x5534` JOBFILE_LIST_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| robot | int | 로봇号 |
| listnum | int | 最多10个 |
| jobfilelist | array | 작업파일列表 |

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

#### 接受完成전송给示教盒

**명령어**：`0x5535` JOBFILE_LIST_FINISH

**요청 매개변수**：无。当四个로봇전송完毕后전송给示教盒

---

### 2.19 티치 펜던트조회Lua脚本列表

**명령어**：`0x5552` LUASCRIPT_LIST_INQUIRE

**요청 매개변수**：无

#### 컨트롤러回复Lua脚本列表

**명령어**：`0x5553` LUASCRIPT_LIST_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| absolutepath | string | Lua脚本所在目录 |
| sum | int | 列表总数 |
| scriptlist | array | 脚本列表 |

```json
{
  "absolutepath": "lua/",
  "sum": 3,
  "scriptlist": ["ww.lua", "ee.lua"]
}
```

---

### 2.20 信息提示

#### 错误提示

**명령어**：`0x2B03` ERROR_CODE

#### 警告提示

**명령어**：`0x2B04` WARNING_CODE

#### 消息条提示

**명령어**：`0x2B05` INFO_CODE

| 매개변수 | 유형 | 설명 |
|------|------|------|
| data | string | 消息条内容 |
| type | int | 消息代码 |

```json
{
  "data": "예시",
  "type": 1234
}
```

#### 弹窗提示

**명령어**：`0x2B06` POPUP_CODE

| 매개변수 | 유형 | 설명 |
|------|------|------|
| count | int | 弹窗按钮数量，最大为3 |
| text1 | string | 弹窗居中显示的主文本 |
| text2 | string | 按钮1的文本 |
| text3 | string | 按钮2的文本 |
| text4 | string | 按钮3的文本 |
| kind | int | 弹窗提示种类，1为消息，2为警告，3为报错 |
| node | string | 로봇序号1-4 |
| Tips | bool | 弹窗呼出为true |

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

根据사용자对弹窗的조작进行相应설정：

**명령어**：`0x2B07` GET_OPTION

| 매개변수 | 유형 | 설명 |
|------|------|------|
| node | string | 로봇序号1-4 |
| option | int | 1-3，对应弹窗选项1-3的内容 |

```json
{
  "node": "1",
  "option": 1
}
```

---

### 2.21 컨트롤러时间조회

#### 时间조회

**명령어**：`0x5742` CONTROLLER_TIME_INQUIRE

| 매개변수 | 유형 | 설명 |
|------|------|------|
| type | int | 1：获取시스템开始时间至现在秒数，0：显示时间 |
| format | int | 1：获取北京时间，0：获取时间戳 |

```json
{
  "type": 0,
  "format": 0
}
```

#### 반환조회结果

**명령어**：`0x5743` CONTROLLER_TIME_RESPOND

| 매개변수 | 유형 | 설명 |
|------|------|------|
| tType | int | 1：获取시스템开始时间至现在秒数，0：显示时间 |
| format | int | 1：获取北京时间，0：获取时间戳 |
| date | object | format为1时用格林威治标准时间表示 |
| year | int | 日期中的年份 |
| mon | int | 日期中的月份 |
| day | int | 日期中的天 |
| hour | int | 时间中的小时 |
| min | int | 时间中的分钟 |
| sec | int | 时间中的秒数 |
| msec | int | 时间中的毫秒数 |
| timestamp | object | 以秒和纳秒的形式记录时间戳 |
| s | int | 时间戳中的秒数 |
| ns | int | 时间戳中的纳秒数 |

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

## 3. 数字输入输出

### 3.1 GPIO_DOUT_SET - 설정数字输出

**명령码**: `0x3601`

티치 펜던트설정 DOUT 时전송此명령。

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| port | int | 是 | 포트 번호，从 1 开始 |
| status | int | 是 | 포트상태：0=低电平，1=高电平 |

```json
{
  "port": 1,
  "status": 1
}
```

---

### 3.2 GPIO_DOUT_INQUIRE - 조회数字输出상태

**명령码**: `0x3602`

티치 펜던트조회 DOUT 상태时전송此명령。

**요청 매개변수**：无

---

### 3.3 GPIO_DOUT_RESPOND - 조회数字输出상태응답

**명령码**: `0x3603`

컨트롤러收到조회요청后반환此명령。

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| status | array | 是 | 每个输出포트的상태数组 |

**status 数组元素설명**:

| 值 | 설명 |
|----|------|
| 0 | 低电平 |
| 1 | 高电平 |
| -1 | 无此포트 |

```json
{
  "status": [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, -1, -1, -1, -1]
}
```

---

### 3.4 GPIO_DIN_INQUIRE - 조회数字输入상태

**명령码**: `0x3605`

티치 펜던트조회 DIN 상태时전송此명령。

**요청 매개변수**：无

---

### 3.5 GPIO_DIN_RESPOND - 조회数字输入상태응답

**명령码**: `0x3606`

컨트롤러收到조회요청后반환此명령。

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| status | array | 是 | 每个输入포트的상태数组 |

**status 数组元素설명**:

| 值 | 설명 |
|----|------|
| 0 | 低电平 |
| 1 | 高电平 |
| -1 | 无此포트 |

```json
{
  "status": [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, -1, -1, -1, -1]
}
```

---

### 3.6 ANALOG_OUT_SET - 설정模拟输出

**명령码**: `0x3607`

티치 펜던트설정 AOUT 时전송此명령。

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| port | int | 是 | 포트 번호，从 1 开始 |
| value | float | 是 | 포트电压值（如 1.33 表示 1.33V） |

```json
{
  "port": 1,
  "value": 1.33
}
```

---

### 3.7 ANALOG_OUT_INQUIRE - 조회模拟输出상태

**명령码**: `0x3608`

티치 펜던트조회 AOUT 상태时전송此명령。

**요청 매개변수**：无

---

### 3.8 ANALOG_OUT_RESPOND - 조회模拟输出상태응답

**명령码**: `0x3609`

컨트롤러收到조회요청后반환此명령。

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| value | array | 是 | 每个模拟输出포트的值数组 |

**value 数组元素설명**:

| 值 | 설명 |
|----|------|
| 0 | 低电平 |
| 1 | 高电平 |
| -1 | 无此포트 |

```json
{
  "value": [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, -1, -1, -1, -1]
}
```

---

### 3.9 ANALOG_IN_INQUIRE - 조회模拟输入상태

**명령码**: `0x360A`

티치 펜던트조회 AIN 상태时전송此명령。

**요청 매개변수**：无

---

### 3.10 ANALOG_IN_RESPOND - 조회模拟输入상태응답

**명령码**: `0x360B`

컨트롤러收到조회요청后반환此명령。

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| value | array | 是 | 每个模拟输入포트的值数组 |

**value 数组元素설명**:

| 值 | 설명 |
|----|------|
| 0 | 低电平 |
| 1 | 高电平 |
| -1 | 无此포트 |

```json
{
  "value": [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, -1, -1, -1, -1]
}
```

---

### 3.11 FORCE_DIN_SET - 설정强制数字输入

**명령码**: `0x360C`

티치 펜던트설정强制数字输入时전송此명령。

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| port | int | 是 | 포트 번호 |
| enable | bool | 是 | 是否开启强制输入 |
| status | int | 是 | 설정포트的高低电平：0=低电平，1=高电平 |

```json
{
  "port": 1,
  "enable": true,
  "status": 0
}
```

---

### 3.12 FORCE_DIN_INQUIRE - 조회强制数字输入상태

**명령码**: `0x360D`

티치 펜던트조회强制输入상태时전송此명령。

**요청 매개변수**：无

---

### 3.13 FORCE_DIN_RESPOND - 조회强制数字输入상태응답

**명령码**: `0x360E`

컨트롤러收到조회요청后반환此명령。

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| port | int | 是 | 포트 번호 |
| enable | bool | 是 | 是否开启强制输入 |
| status | int | 是 | 설정포트的高低电平：0=低电平，1=高电平 |

```json
{
  "port": 1,
  "enable": true,
  "status": 0
}
```

---

### 3.14 FORCE_ANALOG_IN_SET - 설정强制模拟输入

**명령码**: `0x3611`

티치 펜던트설정强制模拟输入时전송此명령。

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| port | int | 是 | 포트 번호 |
| enable | bool | 是 | 是否开启强制输入 |
| status | int | 是 | 설정포트的模拟值 |

```json
{
  "port": 1,
  "enable": true,
  "status": 0
}
```

---

### 3.15 FORCE_ANALOG_IN_INQUIRE - 조회强制模拟输入상태

**명령码**: `0x3612`

티치 펜던트조회强制模拟输入상태时전송此명령。

**요청 매개변수**：无

---

### 3.16 FORCE_ANALOG_IN_RESPOND - 조회强制模拟输入상태응답

**명령码**: `0x3613`

컨트롤러收到조회요청后반환此명령。

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| port | int | 是 | 포트 번호 |
| enable | bool | 是 | 是否开启强制输入 |
| status | int | 是 | 설정포트的模拟值 |

```json
{
  "port": 1,
  "enable": true,
  "status": 0
}
```

---

## 4. 远程IO제어

### 4.1 IO기능界面설정

#### 4.1.1 IO기능界面설정（示教盒전송）

**명령码**: `0x2F01` IO_CONTROL_SET

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| inPort | object | 是 | 远程IO기능포트绑定 |
| inValue | object | 是 | 포트值，IO매개변수，0：低电平有效，1：高电平有效 |
| program | array | 是 | 远程IO프로그램DIN和value绑定，共10个 |
| robot | int | 是 | 로봇号 |

**inPort 对象매개변수**:

| 매개변수名 | 유형 | 설명 |
|--------|------|------|
| start | int | 启动，绑定포트 |
| stop | int | 停止，绑定포트 |
| pause | int | 暂停，绑定포트 |
| faultReset | int | 清除报警，绑定포트 |
| clearoutagekeep | int | 清除断电保持데이터，绑定포트 |

**inValue 对象매개변수**:

| 매개변수名 | 유형 | 설명 |
|--------|------|------|
| start | int | 启动 |
| stop | int | 停止 |
| pause | int | 暂停 |
| faultReset | int | 清除报警 |
| clearoutagekeep | int | 清除断电保持데이터 |

**program 数组매개변수**:

| 매개변수名 | 유형 | 설명 |
|--------|------|------|
| port | int | 포트 번호 |
| value | int | 포트值，0或1 |

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

#### 4.1.2 IO기능界面조회（示教盒전송）

**명령码**: `0x2F02` IO_CONTROL_INQUIRE

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| robot | int | 是 | 로봇号 |

```json
{
  "robot": 1
}
```

---

#### 4.1.3 IO기능界面응답（컨트롤러 응답）

**명령码**: `0x2F03` IO_CONTROL_RESPOND

**매개변수 설명**：同 4.1.1 IO기능界面설정

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

#### 4.2.1 홈 위치위치매개변수설정（示教盒전송）

**명령码**: `0x2F04` IO_CONTROL_RESETPOS_SET

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| pos | array | 是 | 로봇위치（7个元素） |
| posSync | array | 是 | 외부 축위치（5个元素） |
| robot | int | 是 | 로봇号 |

```json
{
  "pos": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  "posSync": [0.0, 0.0, 0.0, 0.0, 0.0],
  "robot": 1
}
```

---

#### 4.2.2 홈 위치IO매개변수설정（示教盒전송）

**명령码**: `0x2F14` IO_CONTROL_RESETPORT_SET

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| robot | int | 是 | 로봇号 |
| selectPiontOrFile | int | 是 | 0:홈 위치，1:复位프로그램 |
| inPort | int | 是 | 复位开始，IO触发포트 |
| inValue | int | 是 | 复位开始，IO매개변수 |
| outPort | int | 是 | 复位结束，IO输出포트 |
| safeEnable | bool | 是 | 安全使能 |
| returnway | int | 是 | 0:관절插补，1：直线插补 |

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

#### 4.2.3 安全点误差매개변수설정

**명령码**: `0x2F15` IO_CONTROL_RESETSAFEDEV_SET

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| deviation | array | 是 | 로봇위치偏差（7个元素） |
| deviationSync | array | 是 | 외부 축偏差（5个元素） |
| robot | int | 是 | 로봇号 |

```json
{
  "deviation": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 1.0],
  "deviationSync": [1.0, 1.0, 1.0, 1.0, 1.0],
  "robot": 1
}
```

---

#### 4.2.4 安全点위치通知

**명령码**: `0x2F16` IO_CONTROL_NOTIS_SAFEPOS

**설명**: 실행작업파일时，开始安全使能，不在安全点时컨트롤러 응답전송

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| robot | int | 是 | 当前로봇 |
| isSync | bool | 是 | false:로봇不在安全区，true:외부 축不在安全区 |
| currentPos | array | 是 | 当前좌표 |
| safePos | array | 是 | 홈 위치位 |

```json
{
  "robot": 1,
  "isSync": false,
  "currentPos": [0, 0.1, 2, 3.3, 44, 555.55, 6, 7.7, 88],
  "safePos": [0, 0.1, 2, 3.3, 88, 555.55, 6, 7.7, 88]
}
```

---

#### 4.2.5 回复位

**명령码**: `0x2F17` RECOVERY_SITE

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| robot | int | 是 | 로봇号 |

```json
{
  "robot": 1
}
```

---

#### 4.2.6 홈 위치설정조회（示教盒전송）

**명령码**: `0x2F05` IO_CONTROL_RESET_INQUIRE

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| robot | int | 是 | 로봇号 |

```json
{
  "robot": 1
}
```

---

#### 4.2.7 홈 위치설정응답（컨트롤러 응답）

**명령码**: `0x2F06` IO_CONTROL_RESET_RESPOND

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| robot | int | 是 | 로봇号 |
| selectPiontOrFile | int | 是 | 0选择的是点，1选择的프로그램 |
| returnWay | int | 是 | 0表示选择的是movj，1表示的是movl |
| inPort | int | 是 | 复位开始，IO触发포트 |
| inValue | int | 是 | 复位开始，IO매개변수 |
| outPort | int | 是 | 复位结束，IO输出포트 |
| safeEnable | bool | 是 | 安全使能 |
| pos | array | 是 | 홈 위치좌표 |
| posSync | array | 是 | 외부 축홈 위치좌표 |
| deviation | array | 是 | 安全点범위 |
| deviationSync | array | 是 | 외부 축安全点범위 |

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

#### 4.2.8 当前위치조회（示教盒전송）

**명령码**: `0x2F07` IO_CONTROL_POS_INQUIRE

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| robot | int | 是 | 로봇号 |
| coord | int | 是 | 좌표모드：-1-컨트롤러当前좌표，0-관절좌표，1-直角좌표，2-도구좌표，3-사용자좌표 |

```json
{
  "robot": 1,
  "coord": 0
}
```

---

#### 4.2.9 当前위치응답（컨트롤러 응답）

**명령码**: `0x2F08` IO_CONTROL_POS_RESPOND

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| robot | int | 是 | 로봇号 |
| coord | int | 是 | 좌표모드 |
| pos | array | 是 | 弧度点位 |
| posDeg | array | 是 | 角度点位 |
| configuration | int | 是 | 形态 |

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

**명령码**: `0x2F10` IO_CONTROL_DOUBLE_POS_INQUIRE

**설명**: MOVJDOUBLE명령어在双机下需要同时조회第一和第二个로봇위치

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| robot1 | int | 是 | 로봇1 |
| coord1 | int | 是 | 로봇1좌표：1-直角좌표，2-도구좌표，3-사용자좌표 |
| robot2 | int | 是 | 로봇2 |
| coord2 | int | 是 | 同로봇1 |

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

**명령码**: `0x2F11` IO_CONTROL_DOUBLE_POS_RESPOND

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| pos1Deg | array | 是 | 로봇1轴1-7当前위치（角度表示） |
| pos1 | array | 是 | 로봇1轴1-7当前위치（弧度表示） |
| pos2Deg | array | 是 | 로봇2轴1-7当前위치（角度表示） |
| pos2 | array | 是 | 로봇2轴1-7当前위치（弧度表示） |

```json
{
  "pos1Deg": [0, 1.1, 2, 3.3, 4.4, 5.5, 6.6],
  "pos1": [0, 1.1, 2, 3.3, 4.4, 5.5, 6.6],
  "pos2Deg": [0, 1.1, 2, 3.3, 4.4, 5.5, 6.6],
  "pos2": [0, 1.1, 2, 3.3, 4.4, 5.5, 6.6]
}
```

---

#### 4.2.12 打开작업파일

**명령码**: `0x3114`

**설명**: 复位프로그램固定是RobotResetProgram，后缀是.ResetPro

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| jobName | string | 是 | 작업파일名称（固定：RobotResetProgram） |
| robot | int | 是 | 로봇号 |
| suffixname | string | 是 | 작업파일后缀（固定：.ResetPro） |

```json
{
  "jobName": "RobotResetProgram",
  "robot": 1,
  "suffixname": ".ResetPro"
}
```

---

#### 4.2.13 插入명령어

**명령码**: `0x3121`

---

#### 4.2.14 保存작업파일

**명령码**: `0x3120`

**설명**: 复位프로그램固定是RobotResetProgram，后缀是.ResetPro

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| jobname | string | 是 | 작업파일名称（固定：RobotResetProgram） |
| robot | int | 是 | 로봇号 |
| suffix | string | 是 | 작업파일后缀（固定：.ResetPro） |

```json
{
  "jobname": "RobotResetProgram",
  "robot": 1,
  "suffix": ".ResetPro"
}
```

---

### 4.3 상태提示설정界面

#### 4.3.1 상태提示설정（示教盒전송）

**명령码**: `0x2F09` IO_CONTROL_OUTPUT_SET

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| outPut | array | 是 | 输出구성数组，每个元素对应一个로봇 |
| remoteOut | int | 是 | 원격 모드 |
| remoteOut_value | int | 是 | 원격 모드值：0、1、3（闪烁） |
| runOut | int | 是 | 실행 모드 |
| runOut_value | int | 是 | 실행 모드值 |
| startUp | int | 是 | 开机提示 |
| startUp_value | int | 是 | 开机提示值 |
| teachOut | int | 是 | 示티치 모드 |
| teachOut_value | int | 是 | 示티치 모드值 |

**outPut 数组元素매개변수**:

| 매개변수名 | 유형 | 설명 |
|--------|------|------|
| IOenable | int | 使能DOUT绑定 |
| IOenable_value | int | 值：0、1、3（闪烁） |
| continuable | int | 可继续执行DOUT绑定 |
| continuable_value | int | 值：0、1、3（闪烁） |
| fault | int | 报错提示DOUT绑定 |
| faultIsFickler | int | 值：0、1、3（闪烁） |
| mainJobFirstLine | int | 主프로그램首行DOUT绑定 |
| mainJobFirstLine_value | int | 值 |
| pause | int | 暂停DOUT绑定 |
| pause_value | int | 值 |
| quickStopOut1 | int | 紧急急停1DOUT绑定 |
| quickStopOut2 | int | 紧急急停2DOUT绑定 |
| quickStopOutValue1 | int | 值 |
| quickStopOutValue2 | int | 值 |
| running | int | 실행DOUT绑定 |
| running_value | int | 值 |
| stop | int | 停止DOUT绑定 |
| stop_value | int | 值 |
| teachBoxStateOut | int | 拔出示教盒DOUT绑定 |
| teachBoxStateOutValue | int | 值 |

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

#### 4.3.2 상태提示조회（示教盒전송）

**명령码**: `0x2F0A` IO_CONTROL_OUTPUT_INQUIRE

**설명**: data: 无

---

#### 4.3.3 상태提示응답（컨트롤러 응답）

**명령码**: `0x2F0B` IO_CONTROL_OUTPUT_RESPOND

**설명**: data：同 0x2F09

---

### 4.4 IO复位설정界面

#### 4.4.1 IO输出复位설정（示教盒전송）

**명령码**: `0x2F0D` IO_CONTROL_IORESET_SET

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| robot | int | 是 | 로봇号 |
| type | int | 是 | 1-IO复位，2-切모드停止，3-프로그램报错停止 |
| enable | array | 是 | 16个元素，值为0或1，包含复位值及是否复位 |
| value | array | 是 | 16个元素，值为0或1，包含复位值及是否复位 |

```json
{
  "robot": 1,
  "type": 1,
  "enable": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "value": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}
```

---

#### 4.4.2 IO输出复位조회（示教盒전송）

**명령码**: `0x2F0E` IO_CONTROL_IORESET_INQUIRE

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| robot | int | 是 | 로봇号 |
| type | int | 是 | 유형 |

```json
{
  "robot": 1,
  "type": 1
}
```

---

#### 4.4.3 IO输出复位응답（컨트롤러 응답）

**명령码**: `0x2F0F` IO_CONTROL_IORESET_RESPOND

**설명**: data：同 0x2F0D

---

### 4.5 IO기능상태界面

#### 4.5.1 IO기능상태조회（示教盒전송）

**명령码**: `0x2F12` IO_FUNCTION_INQUIRE

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| type | int | 是 | 1-数字输入，2-数字输出，3-模拟输入，4-模拟输出 |

```json
{
  "type": 1
}
```

---

#### 4.5.2 IO기능상태응답（컨트롤러 응답）

**명령码**: `0x2F13` IO_FUNCTION_RESPOND

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| type | int | 是 | 유형 |
| IOFunction | array | 是 | 数字有16个，模拟有8个 |

```json
{
  "type": 1,
  "IOFunction": [
    "远程：로봇1启动 로봇1비전:触发포트",
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

### 4.6 원격 모드界面

#### 4.6.1 预约执行상태조회（示教盒전송）

**명령码**: `0x2F1B` RESERVE_EXE_STATE_INQUIRE

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| robot | int | 是 | 로봇号 |

```json
{
  "robot": 1
}
```

---

#### 4.6.2 预约执行상태응답（컨트롤러 응답）

**명령码**: `0x2F1C` RESERVE_EXE_STATE_RESPOND

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| robot | int | 是 | 로봇号 |
| current | object | 是 | 当前실행상태 |
| queue | array | 是 | 队列（10个元素） |

**current 对象매개변수**:

| 매개변수名 | 유형 | 설명 |
|--------|------|------|
| station | int | 工作站（프로그램编号） |
| name | string | 프로그램名 |
| runtime | int | 当前실행的已실행次数 |
| times | int | 当前실행的실행总数 |
| count | int | 실행总数 |
| status | int | 실행상태：0-无预约，1-预约中，2-실행中，3-已预约，4-프로그램暂停 |

**queue 数组元素매개변수**:

| 매개변수名 | 유형 | 설명 |
|--------|------|------|
| station | int | 工作站（프로그램编号） |
| name | string | 프로그램名 |
| times | int | 실행次数 |
| count | int | 실행总数 |
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

#### 4.6.3 실행总数清零

**명령码**: `0x2F1D` RESERVE_EXE_STATE_CLEAR

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| robot | int | 是 | 로봇号 |

```json
{
  "robot": 1
}
```

---

### 4.7 IO型号설정

#### 4.7.1 IO型号설정（示教盒전송）

**명령码**: `0x2F21` IO_TYPE_SET

**설명**: 重启生效

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| simuNum | int | 是 | 虚拟IO数量 |
| serialAnalog | object | 是 | 串口模拟量구성 |

**serialAnalog 对象매개변수**:

| 매개변수名 | 유형 | 설명 |
|--------|------|------|
| type | string | 可选：SUPER_ANAIO、DAC_ANAIO |
| port | int | 포트 번호 |
| baudRate | int | 波特率 |

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

#### 4.7.2 IO型号조회（示教盒전송）

**명령码**: `0x2F22` IO_TYPE_INQUIRE

---

#### 4.7.3 IO型号응답（컨트롤러 응답）

**명령码**: `0x2F23` IO_TYPE_RESPOND

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| num | int | 是 | IO板数量 |
| type | array | 是 | IO板유형列表 |
| portNum | array | 是 | 포트구성 |
| simuNum | int | 是 | 虚拟IO数量 |
| serialAnalog | object | 是 | 串口模拟量구성 |

```json
{
  "num": 3,
  "type": ["IO板R1", "盟通", "虚拟IO"],
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

### 4.8 远程상태提示

#### 4.8.1 远程상태提示설정

**명령码**: `0x2F24` IO_REMOTEOUTPUT_SET

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| outPut | array | 是 | 输出구성数组 |
| robot | int | 是 | 로봇号 |

**outPut 数组元素매개변수**:

| 매개변수名 | 유형 | 설명 |
|--------|------|------|
| outagerecover | int | 断电保持데이터恢复DOUT1-2포트绑定 |
| outagerecover_value | int | DOUT1-2포트值：0、1、2（2代表闪烁） |
| program1~program10 | int | 远程IO프로그램DOUT포트绑定 |
| program_value1~program_value10 | int | 远程IO프로그램DOUT输出포트值：0、1、2（2代表闪烁） |

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

#### 4.8.2 远程상태提示조회

**명령码**: `0x2F25` IO_REMOTEOUTPUT_INQUIRE

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| robot | int | 是 | 로봇号 |

```json
{
  "robot": 1
}
```

---

#### 4.8.3 远程상태提示응답

**명령码**: `0x2F26` IO_REMOTEOUTPUT_RESPOND

**설명**: 内容同 0x2F24

---

### 4.9 安全监测설정

#### 4.9.1 安全监测설정（示教盒전송）

**명령码**: `0x2F31` IO_SAFE_CHECK_SET

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| robot | int | 是 | 로봇号 |
| safeScreen | object | 是 | 安全光幕구성 |
| quickStop | object | 是 | 快速停止구성 |

**safeScreen 对象매개변수**:

| 매개변수名 | 유형 | 설명 |
|--------|------|------|
| enable | bool | 使能安全光幕 |
| port1 | int | 安全光幕1 DIN序号（1~16） |
| value1 | int | IO电平매개변수：0-低电平，1-高电平 |
| port2 | int | 安全光幕2 DIN序号（1~16） |

---

## 5. 全局변수

### 5.1 当前위치모드

| 值 | 모드 | 설명 |
|---|---|---|
| -1 | 컨트롤러当前좌표 | 컨트롤러当前좌표 |
| 0 | 관절좌표(Joint) | 관절좌표계 |
| 1 | 直角좌표(Angle) | 直角좌표계 |
| 2 | 도구좌표(Tool) | 도구좌표계 |
| 3 | 사용자좌표(User) | 사용자좌표계 |

---

### 5.2 获取全局위치변수点位

**명령**: `0x5602` GLOBAL_ALLPOSITION_INQUIRE

| 매개변수 | 유형 | 必填 | 설명 |
|---|---|---|---|
| robot | int | 是 | 로봇号 |

```json
{
  "robot": 1
}
```

**컨트롤러回复**: `0x5603` GLOBAL_ALLPOSITION_RESPOUND

| 매개변수 | 유형 | 설명 |
|---|---|---|
| robot | int | 로봇号 |
| globalPosition | object | 全局点位列表 |
| note | object | 注释列表 |

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

> **설명**: 如果是四轴로봇，最后两位补0。

---

### 5.3 설정全局点位

**명령**: `0x5604` GLOBAL_POSITION_SET

| 매개변수 | 유형 | 必填 | 설명 |
|---|---|---|---|
| robot | int | 是 | 로봇号 |
| posName | string | 是 | 点位名称 |
| pos | array | 是 | 点位데이터（14元素） |
| note | string | 否 | 注释 |

**pos 数组설명** (共14元素):

| 索引 | 설명 |
|---|---|
| 0 | 좌표계: 0-관절, 1-直角, 2-도구, 3-사용자 |
| 1 | 单位: 0-弧度制, 1-角度制 |
| 2 | 姿态: 0-无, 1-手左, 2-右手 |
| 3 | 도구좌표编号 |
| 4 | 사용자좌표编号 |
| 5-6 | 预留位 |
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

### 5.4 조회全局点位

**명령**: `0x5605` GLOBAL_POSITION_INQUIRE

| 매개변수 | 유형 | 必填 | 설명 |
|---|---|---|---|
| robot | int | 是 | 로봇号 |
| posName | string | 是 | 点位名称 |

```json
{
  "robot": 1,
  "posName": "GP0001"
}
```

**컨트롤러回复**: `0x5606` GLOBAL_POSITION_RESPOUND

| 매개변수 | 유형 | 설명 |
|---|---|---|
| note | string | 注释 |
| posName | string | 변수名 |
| posValue | array | 弧度制点位 |
| posValueDeg | array | 角度制点位 |
| robot | int | 로봇号 |

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

### 5.5 설정全局数值변수

**명령**: `0x5607` GLOBAL_VARIANT_SET

| 매개변수 | 유형 | 必填 | 설명 |
|---|---|---|---|
| varName | string | 是 | 변수名称 |
| varType | int | 是 | 변수유형: 0-int, 1-double, 2-bool, 3-string |
| varValue | double | 否 | 변수值（数值유형使用） |
| varString | string | 否 | 변수值（string유형使用） |
| varNote | string | 否 | 注释 |

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

### 5.6 获取全局数值변수列表

**명령**: `0x5608` GLOBAL_VARIANT_INQUIRE

| 매개변수 | 유형 | 必填 | 설명 |
|---|---|---|---|
| varType | int | 是 | 변수유형: 1-布尔型, 2-int型, 3-double型 |

```json
{
  "varType": 1
}
```

**컨트롤러回复**: `0x5609` GLOBAL_VARIANT_RESPOND

| 매개변수 | 유형 | 설명 |
|---|---|---|
| varType | int | 변수유형 |
| varNum | int | 数值변수个数 (0-100) |
| varList | array | 数值변수列表 |

**varList 数组元素**:

| 매개변수 | 유형 | 설명 |
|---|---|---|
| varName | string | 변수名字 |
| varValue | mixed | 변수值 |
| varNote | string | 注释 |

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

### 5.7 요청全局数值注释

**명령**: `0x5610` GLOBAL_ALLVARIANT_NOTE_INQUIRE

| 매개변수 | 유형 | 必填 | 설명 |
|---|---|---|---|
| varType | int | 是 | 변수유형: 1-bool, 2-int, 3-double, 4-string |

```json
{
  "varType": 1
}
```

**컨트롤러回复**: `0x5611` GLOBAL_ALLVARIANT_NOTE_RESPOND

| 매개변수 | 유형 | 설명 |
|---|---|---|
| varNote | object | 注释列表 |
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

### 5.8 조회单个全局변수

**명령**: `0x560B` GLOBAL_VARIANT_INQUIRE

| 매개변수 | 유형 | 必填 | 설명 |
|---|---|---|---|
| varType | int | 是 | 변수유형: 0-int, 1-double, 2-bool, 3-string |
| varName | string | 是 | 변수名称 |
| identity | string | 否 | 来源标识 |

**identity 取值설명**:

| 值 | 설명 |
|---|---|
| VariableReview | 监控界面的全局변수 |
| NumerlcalVarWidget | 全局数值변수界面 |

```json
{
  "varType": 1,
  "varName": "GI001",
  "identity": "VariableReview"
}
```

**컨트롤러回复**: `0x560C` GLOBAL_VARIANT_RESPOUND

| 매개변수 | 유형 | 설명 |
|---|---|---|
| varType | int | 변수유형 |
| varName | string | 변수名称 |
| varValue | mixed | 변수值 |
| varString | string | 字符串值（string유형） |
| identity | string | 来源标识 |
| varNote | string | 注释 |

```json
{
  "varType": 1,
  "varName": "GI001",
  "varValue": 666,
  "varString": "i'm a string",
  "identity": "VariableReview",
  "varNote": "跳伞模拟器"
}
```

---

### 5.9 局部변수위치변수P点조회

**명령**: `0x5612` LOCAL_POS_P_VAR_INQUIRE

| 매개변수 | 유형 | 必填 | 설명 |
|---|---|---|---|
| robot | int | 是 | 로봇号 |
| varname | string | 是 | 点位名称 |
| initialValue | bool | 是 | 是否为初始值 |

```json
{
  "robot": 1,
  "varname": "P0001",
  "initialValue": true
}
```

**컨트롤러回复**: `0x5613` LOCAL_POS_P_VAR_RESPOND

| 매개변수 | 유형 | 설명 |
|---|---|---|
| robot | int | 로봇号 |
| jobname | string | 작업파일名称 |
| varname | string | 点位名称 |
| initialValue | bool | 是否为初始值 |
| pos | array | 点位（弧度制） |
| posDeg | array | 点位（角度制） |

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

### 5.10 局部변수위치변수E点조회

**명령**: `0x5615` LOCAL_POS_E_VAR_INQUIRE

| 매개변수 | 유형 | 必填 | 설명 |
|---|---|---|---|
| robot | int | 是 | 로봇号 |
| varname | string | 是 | 点位名称 |
| initialValue | bool | 是 | 是否为初始值 |

```json
{
  "robot": 1,
  "varname": "E0001",
  "initialValue": true
}
```

**컨트롤러回复**: `0x5616` LOCAL_POS_E_VAR_RESPOND

| 매개변수 | 유형 | 설명 |
|---|---|---|
| robot | int | 로봇号 |
| jobname | string | 작업파일名称 |
| varname | string | 点位名称 |
| initialValue | bool | 是否为初始值 |
| pos | array | 点位（弧度制，11元素） |
| posDeg | array | 点位（角度制，11元素） |

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

### 5.11 局部변수数值변수조회

**명령**: `0x5618` LOCAL_VALUE_VAR_INQUIRE

| 매개변수 | 유형 | 必填 | 설명 |
|---|---|---|---|
| robot | int | 是 | 로봇号 |
| vartype | int | 是 | 변수유형: 0-int, 1-double, 2-bool, 3-string |
| varname | string | 是 | 변수名称 |
| initialValue | bool | 是 | 是否为初始值 |
| identify | string | 否 | 来源标识 |

**identify 取值설명**:

| 值 | 설명 |
|---|---|
| CommandInsert | 插入명령어界面변수 |
| VariableReview | 监控界面数值변수 |

```json
{
  "robot": 1,
  "vartype": 1,
  "varname": "I001",
  "initialValue": true,
  "identify": "CommandInsert"
}
```

**컨트롤러回复**: `0x5619` LOCAL_VALUE_VAR_RESPOND

| 매개변수 | 유형 | 설명 |
|---|---|---|
| robot | int | 로봇号 |
| jobname | string | 작업파일名称 |
| vartype | int | 변수유형: 1-bool, 2-int, 3-double |
| varname | string | 변수名称 |
| value | mixed | 변수值（数值유형） |
| string | string | 변수值（字符串유형） |
| identify | string | 来源标识 |

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

### 5.12 全局외부 축변수

> **설명**: 全局외부 축변수结构: 点位信息(7) + 로봇위치(7) + 외부 축위치(5) + 预留(2) = 21元素

#### 5.12.1 설정全局외부 축변수

**명령**: `0x561a` GLOBAL_EXTPOS_VAR_SET

| 매개변수 | 유형 | 必填 | 설명 |
|---|---|---|---|
| robot | int | 是 | 로봇号 |
| varname | string | 是 | 点位名称 |
| pos | array | 是 | 点位데이터（21元素） |
| note | string | 否 | 备注 |

**pos 数组설명**:

| 索引범위 | 설명 |
|---|---|
| 0-6 | 点位信息 |
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

#### 5.12.2 조회全局외부 축변수

**명령**: `0x561b` GLOBAL_EXTPOS_VAR_INQUIRE

| 매개변수 | 유형 | 必填 | 설명 |
|---|---|---|---|
| robot | int | 是 | 로봇号 |
| varname | string | 是 | 点位名称 |
| initialValue | bool | 是 | 是否为初始值 |

```json
{
  "robot": 1,
  "varname": "GE0001",
  "initialValue": true
}
```

**컨트롤러回复**: `0x561c` GLOBAL_EXTPOS_VAR_RESPOND

| 매개변수 | 유형 | 설명 |
|---|---|---|
| note | string | 注释 |
| varname | string | 변수名称 |
| initialValue | bool | 是否为初始值 |
| posValue | array | GP + 外部点（弧度制） |
| posValueDeg | array | GP + 外部点（角度制） |

```json
{
  "note": "",
  "varname": "GE001",
  "initialValue": true,
  "posValue": [0.0, 0.0, 0.0, 0.0],
  "posValueDeg": [0.0, 0.0, 0.0, 0.0]
}
```

#### 5.12.3 获取全部全局외부 축点位

**명령**: `0x561d` GLOBAL_ALLEXTPOS_VAR_INQUIRE

| 매개변수 | 유형 | 必填 | 설명 |
|---|---|---|---|
| robot | int | 是 | 로봇号 |

```json
{
  "robot": 1
}
```

**컨트롤러回复**: `0x561e` GLOBAL_ALLEXTPOS_VAR_RESPOND

| 매개변수 | 유형 | 설명 |
|---|---|---|
| robot | int | 로봇号 |
| globalExtPosition | object | 点位列表 |
| note | object | 注释列表 |

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

### 5.13 로봇点位좌표계转换

**명령**: `0x2A12` POS_TRANS_COORD

| 매개변수 | 유형 | 必填 | 설명 |
|---|---|---|---|
| robot | int | 是 | 로봇号 |
| name | string | 是 | 点名字 |
| pos | array | 是 | 点位데이터（21元素） |
| targetCoord | int | 是 | 目标좌표계: 0-관절, 1-直角, 2-도구, 3-사용자 |

```json
{
  "robot": 1,
  "name": "P001",
  "pos": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "targetCoord": 1
}
```

**컨트롤러回复**: `0x2A13` POS_TRANS_COORD_RESPOND

| 매개변수 | 유형 | 설명 |
|---|---|---|
| name | string | 点名字 |
| pos | array | 点位信息（通用21位데이터，弧度制） |
| posDeg | array | 点位信息（通用21位데이터，角度制） |
| robot | int | 로봇号 |

```json
{
  "name": "P001",
  "pos": [1, 1, 0, 0, 0, 0, 0, 459.62120, -0.1010, 796.79160, 3.141592653590, 0.0, 0.0, 0.0],
  "posDeg": [1, 1, 0, 0, 0, 0, 0, 459.62120, -0.1010, 796.79160, 180.0, 0.0, 0.0, 0.0],
  "robot": 1
}
```
