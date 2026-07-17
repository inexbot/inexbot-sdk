# 5.外部제어与통신方式

## 目录

- [远程프로그램설정](#远程프로그램설정)
- [Lua프로그램](#lua프로그램)
- [Modbus](#modbus)
- [TCP통신](#tcp통신)

---

## 远程프로그램설정

### 원격 모드연결상태

#### 조회 Modbus、外部 IO 연결상태

**명령어**: `0x5032 REMOTE_CONNECT_INQUIRE`

요청包体：

```json
{}
```

#### 반환연결상태

**명령어**: `0x5033 REMOTE_CONNECT_RESPOND`

응답包体：

```json
{
  "ModbusConnect": false,
  "ExternIOConnect": true,
  "type": 2
}
```

| 매개변수 | 유형 | 설명 |
|------|------|------|
| ModbusConnect | bool | Modbus 연결상태：`false` 未연결，`true` 已연결 |
| ExternIOConnect | bool | 外部 IO 연결상태：`false` 未연결，`true` 已연결 |
| type | int | 연결유형：0:NAN, 1:RTU, 2:TCP |

---

### 远程작업파일설정

#### 설정远程작업파일

**명령어**: `0x2C01 REMOTE_JOBFILE_SET`

| 매개변수 | 유형 | 설명 |
|------|------|------|
| robot | int | 로봇号 |
| jobFile | array | 작업파일列表 |

**jobFile 数组元素**:

| 매개변수 | 유형 | 설명 |
|------|------|------|
| name | string | 작업파일名称 |
| times | int | 실행次数 |

요청包体：

```json
{
  "robot": 1,
  "jobFile": [
    {"name": "Q1", "times": 1},
    {"name": "Q2", "times": 1},
    {"name": "Q3", "times": 1},
    {"name": "Q4", "times": 1},
    {"name": "Q5", "times": 1}
  ]
}
```

> 最多 10 个작업파일

#### 获取远程작업파일

**명령어**: `0x2C02 REMOTE_JOBFILE_INQUIRE`

요청包体：

```json
{
  "robot": 1
}
```

#### 반환작업파일조회结果

**명령어**: `0x2C03 REMOTE_JOBFILE_RESPOND`

응답包体：

```json
{
  "robot": 1,
  "jobFile": [
    {"name": "Q1", "times": 3},
    {"name": "Q2", "times": 3},
    {"name": "", "times": 1},
    {"name": "Q4", "times": 2},
    {"name": "", "times": 1}
  ]
}
```

---

### 원격 모드매개변수설정

#### 설정원격 모드매개변수

**명령어**: `0x2C04 REMOTE_PARA_SET`

| 매개변수 | 유형 | 설명 |
|------|------|------|
| robot | int | 로봇号 |
| remoteDefaultSpeed | int | 원격 모드속도，범위 1~100 |
| reserveIsStart | int | 预约并启动：`1` 启动，`0` 关闭 |
| reserveTrgTime | int | 确认启动时间，범위 200~1000ms |
| waitingTime | int | IO 重复触发时间 |

요청包体：

```json
{
  "robot": 1,
  "remoteDefaultSpeed": 15,
  "reserveIsStart": 1,
  "reserveTrgTime": 200,
  "waitingTime": 500
}
```

#### 조회원격 모드매개변수

**명령어**: `0x2C05 REMOTE_PARA_INQUIRE`

요청包体：

```json
{
  "robot": 1
}
```

#### 반환원격 모드매개변수조회结果

**명령어**: `0x2C06 REMOTE_PARA_RESPOND`

응답包体：

```json
{
  "robot": 1,
  "remoteDefaultSpeed": 15,
  "reserveIsStart": 1,
  "reserveTrgTime": 200,
  "waitingTime": 500
}
```

---

## Lua프로그램

Lua파일存放在 `~/robot/job/lua` 目录内。

上传파일和查看파일列表用 SCP 的方式。

### 실행프로그램

**호스트 컴퓨터 전송**: `0x2511`

```json
{
  "fileName": "xxx.lua"
}
```

**컨트롤러 응답**: `0x2512`

```json
{
  "fileName": "xxx.lua",
  "result": true,
  "error": "错误原因"
}
```

| 매개변수 | 유형 | 必填 | 설명 |
|------|------|------|------|
| fileName | string | 是 | Lua파일名 |
| result | bool | 是 | 실행是否成功 |
| error | string | 是 | 错误原因，成功时为空字符串 |

---

### 停止프로그램

**호스트 컴퓨터 전송**: `0x2513`

```json
{
  "fileName": "xxx.lua"
}
```

| 매개변수 | 유형 | 必填 | 설명 |
|------|------|------|------|
| fileName | string | 是 | Lua파일名 |

---

### 当前실행

**호스트 컴퓨터 전송**: `0x2515`

```json
{}
```

**컨트롤러回复**: `0x2516`

```json
{
  "fileNames": [
    {
      "fileName": "xxx.lua",
      "status": 1
    }
  ]
}
```

| 매개변수 | 유형 | 必填 | 설명 |
|------|------|------|------|
| fileNames | array | 是 | 실행中的파일列表 |
| fileNames[].fileName | string | 是 | Lua파일名 |
| fileNames[].status | int | 是 | 1-暂停，2-실행 |

---

## Modbus

### 1. 설정 Modbus 프로그램

**명령어**: `0x5701` `EXTERN_PROGRAM_SET`

```json
{
  "robot": 1,
  "programid": 1,
  "jobname": "xxxx"
}
```

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| robot | int | 是 | 로봇 번호，범위 1-4 |
| programid | int | 是 | 프로그램 ID，범위 1-300 |
| jobname | string | 是 | 작업파일名（不含后缀） |

---

### 2. 조회 Modbus 프로그램

**명령어**: `0x5702` `EXTERN_PROGRAM_INQUIRE`

```json
{
  "robot": 1,
  "startprogramid": 1,
  "num": 10
}
```

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| robot | int | 是 | 로봇 번호，범위 1-4 |
| startprogramid | int | 是 | 프로그램起始 ID |
| num | int | 是 | 需要获取的프로그램个数，범위 1-10 |

---

### 3. 조회 Modbus 프로그램응답

**명령어**: `0x5703` `EXTERN_PROGRAM_RESPOND`

```json
{
  "robot": 1,
  "startprogramid": 1,
  "jobnamelist": ["xxx", "", "yyyy"]
}
```

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| robot | int | 是 | 로봇 번호，범위 1-4 |
| startprogramid | int | 是 | 프로그램起始 ID |
| jobnamelist | array | 是 | 작업파일名列表，共 10 个元素，没有则填空字符串 |

---

### 4. 설정컨트롤러的 Modbus 유형

**명령어**: `0x5711`

```json
{
  "RTU": {
    "baudrate": 115200,
    "port": 2,
    "slaveId": 1
  },
  "TCP": {
    "IP": "192.168.1.11",
    "port": 502
  },
  "master-slave": 1,
  "scancycle": 100,
  "stoprun": 0,
  "type": "TCP"
}
```

| 매개변수分类 | 매개변수名 | 유형 | 必填 | 설명 |
|----------|--------|------|------|------|
| RTU | baudrate | string | 是 | Modbus RTU 通信的波特率 |
| RTU | port | int | 是 | Modbus RTU 通信的串口号 |
| RTU | slaveId | int | 是 | Modbus RTU 通信的从设备 ID |
| TCP | IP | string | 是 | Modbus TCP 通信的서버 IP 주소 |
| TCP | port | int | 是 | Modbus TCP 通信的포트 번호 |
| 通用 | master-slave | string | 是 | 主从모드：0 表示主모드，1 表示从모드 |
| 通用 | scancycle | int | 是 | 扫描周期，单位：毫秒 |
| 通用 | stoprun | bool | 是 | 실행停止标志：0 表示未停止，1 表示停止 |
| 通用 | type | string | 是 | 通信유형，可选 RTU 或 TCP |

---

### 5. 조회컨트롤러的 Modbus 유형

**명령어**: `0x5712`

```json
{}
```

**컨트롤러응답** (`0x5713`):

```json
{
  "RTU": {
    "baudrate": 115200,
    "port": 2,
    "slaveId": 1
  },
  "TCP": {
    "IP": "192.168.1.11",
    "port": 502
  },
  "enable": true,
  "master-slave": 1,
  "scancycle": 100,
  "stoprun": 0,
  "type": "TCP"
}
```

| 매개변수分类 | 매개변수名 | 유형 | 必填 | 설명 |
|----------|--------|------|------|------|
| RTU | baudrate | string | 是 | Modbus RTU 通信的波特率 |
| RTU | port | int | 是 | Modbus RTU 通信的串口号 |
| RTU | slaveId | int | 是 | Modbus RTU 通信的从设备 ID |
| TCP | IP | string | 是 | Modbus TCP 通信的서버 IP 주소 |
| TCP | port | int | 是 | Modbus TCP 通信的포트 번호 |
| 通用 | enable | bool | 是 | 是否启用 Modbus 通信 |
| 通用 | master-slave | string | 是 | 主从모드：0 表示主모드，1 表示从모드 |
| 通用 | scancycle | int | 是 | 扫描周期，单位：毫秒 |
| 通用 | stoprun | bool | 是 | 실행停止标志：0 表示未停止，1 表示停止 |
| 通用 | type | string | 是 | 通信유형，可选 RTU 或 TCP |

---

### 6. 컨트롤러 Modbus 使能

**명령어**: `0x5714`

```json
{
  "enable": false
}
```

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| enable | bool | 是 | 是否启用 Modbus 通信：false 禁用，true 启用 |

---

### 7. 설정 Modbus 心跳检测

**명령어**: `0x5715` `MODBUS_CHECKHEART_SET`

```json
{
  "checkheart": true
}
```

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| checkheart | bool | 是 | Modbus 心跳检测开关 |

---

### 8. 조회 Modbus 心跳检测

**명령어**: `0x5716` `MODBUS_CHECKHEART_INQUIRE`

```json
{}
```

**컨트롤러응답** (`0x5717`):

```json
{
  "checkheart": true
}
```

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| checkheart | bool | 是 | Modbus 心跳检测상태：true 开启，false 关闭 |

---

### 9. 조회컨트롤러作为从站是否연결

**명령어**: `0x5718`

**요청**:

```json
{}
```

**응답**:

```json
{
  "ModbusConnect": false
}
```

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| ModbusConnect | bool | 是 | 연결상태：false 未연결，true 已연결 |

---

### 10. 컨트롤러作为主站的매개변수설정

**명령어**: `0x5719`

```json
{
  "masterStation": {
    "RTU": {
      "baudrate": 115200,
      "checkBit": "E",
      "dataBit": 5,
      "port": 2,
      "slaveId": 1,
      "stopBit": 1
    },
    "TCP": {
      "IP": "192.168.10.56",
      "port": 503
    },
    "processNumber": 1,
    "type": "TCP"
  },
  "startAddress": false
}
```

| 매개변수分类 | 매개변수名 | 유형 | 必填 | 설명 |
|----------|--------|------|------|------|
| masterStation | type | string | 是 | 通信유형：RTU 或 TCP |
| masterStation | processNumber | int | 是 | 프로세스号 |
| masterStation.RTU | baudrate | int | 是 | 波特率 |
| masterStation.RTU | checkBit | string | 是 | 校验位：如 "E"（偶校验）、"O"（奇校验）、"N"（无校验） |
| masterStation.RTU | dataBit | int | 是 | 데이터位 |
| masterStation.RTU | port | int | 是 | 串口号 |
| masterStation.RTU | slaveId | int | 是 | 从设备 ID |
| masterStation.RTU | stopBit | int | 是 | 停止位 |
| masterStation.TCP | IP | string | 是 | TCP 서버 IP 주소 |
| masterStation.TCP | port | int | 是 | TCP 포트 번호 |
| 通用 | startAddress | bool | 是 | 起始주소开关 |

---

### 11. 조회컨트롤러作为主站时的信息

**명령어**: `0x5744`

```json
{
  "processNumber": 2
}
```

| 매개변수名 | 유형 | 必填 | 설명 |
|--------|------|------|------|
| processNumber | int | 是 | 프로세스号 |

---

### 12. 조회主站信息응답

**명령어**: `0x5745`

```json
{
  "RTU": {
    "baudrate": 115200,
    "checkBit": "E",
    "dataBit": 5,
    "port": 3,
    "slaveId": 56,
    "stopBit": 1
  },
  "TCP": {
    "IP": "192.168.1.14",
    "port": 503
  },
  "modbus_state": false,
  "response_time_out": 100,
  "startAddress": true,
  "type": "RTU"
}
```

| 매개변수分类 | 매개변수名 | 유형 | 必填 | 설명 |
|----------|--------|------|------|------|
| RTU | baudrate | int | 是 | 波特率 |
| RTU | checkBit | string | 是 | 校验位 |
| RTU | dataBit | int | 是 | 데이터位 |
| RTU | port | int | 是 | 串口号 |
| RTU | slaveId | int | 是 | 从设备 ID |
| RTU | stopBit | int | 是 | 停止位 |
| TCP | IP | string | 是 | TCP 서버 IP 주소 |
| TCP | port | int | 是 | TCP 포트 번호 |
| 通用 | modbus_state | bool | 是 | MODBUS 상태 |
| 通用 | response_time_out | int | 是 | 응답超时时间，单位：毫秒 |
| 通用 | startAddress | bool | 是 | 起始주소开关 |
| 通用 | type | string | 是 | 通信유형：RTU 或 TCP |

---

### 13. 명령어汇总

| 명령어 | 기능 | 方向 |
|--------|------|------|
| 0x5701 | 설정 Modbus 프로그램 | 호스트 컴퓨터 → 컨트롤러 |
| 0x5702 | 조회 Modbus 프로그램 | 호스트 컴퓨터 → 컨트롤러 |
| 0x5703 | 조회 Modbus 프로그램응답 | 컨트롤러 → 호스트 컴퓨터 |
| 0x5711 | 설정컨트롤러 Modbus 유형 | 호스트 컴퓨터 → 컨트롤러 |
| 0x5712 | 조회컨트롤러 Modbus 유형 | 호스트 컴퓨터 → 컨트롤러 |
| 0x5713 | 조회컨트롤러 Modbus 유형응답 | 컨트롤러 → 호스트 컴퓨터 |
| 0x5714 | 컨트롤러 Modbus 使能 | 호스트 컴퓨터 → 컨트롤러 |
| 0x5715 | 설정 Modbus 心跳检测 | 호스트 컴퓨터 → 컨트롤러 |
| 0x5716 | 조회 Modbus 心跳检测 | 호스트 컴퓨터 → 컨트롤러 |
| 0x5717 | 조회 Modbus 心跳检测응답 | 컨트롤러 → 호스트 컴퓨터 |
| 0x5718 | 조회从站연결상태 | 호스트 컴퓨터 → 컨트롤러 |
| 0x5719 | 설정主站매개변수 | 호스트 컴퓨터 → 컨트롤러 |
| 0x5744 | 조회主站信息 | 호스트 컴퓨터 → 컨트롤러 |
| 0x5745 | 조회主站信息응답 | 컨트롤러 → 호스트 컴퓨터 |

---

## TCP통신

### 설정网络매개변수

**명령어**: `0x4180 MSGCOMM_PARAM_SET`

#### 클라이언트

**요청 매개변수**

| 필드 | 유형 | 설명 |
|------|------|------|
| frameHeader | string | 帧头 |
| ip | string | IP주소 |
| numberSystem | int | 0: 十进制, 1: 十六进制 |
| port | int | 포트 번호 |
| separator | string | 分隔符 |
| terminator | string | 结束符 |
| craft | int | 프로세스号 (1~9) |
| robot | int | 로봇号 |
| type | int | 0: 서버, 1: 클라이언트 |

**요청 예시**

```json
{
  "client": {
    "frameHeader": "@",
    "ip": "192.168.1.111",
    "numberSystem": 1,
    "port": 9000,
    "separator": ",",
    "terminator": "!"
  },
  "craft": 1,
  "robot": 1,
  "type": 1
}
```

#### 服务端

**요청 매개변수**

| 필드 | 유형 | 설명 |
|------|------|------|
| frameHeader | string | 帧头 |
| ip | string | IP주소 |
| numberSystem | int | 0: 十进制, 1: 十六进制 |
| port | int | 포트 번호 |
| separator | string | 分隔符 |
| terminator | string | 结束符 |
| craft | int | 프로세스号 (1~9) |
| robot | int | 로봇号 |
| type | int | 0: 서버, 1: 클라이언트 |

**요청 예시**

```json
{
  "craft": 3,
  "robot": 1,
  "server": {
    "frameHeader": "@A",
    "ip": "192.168.1.14",
    "numberSystem": 0,
    "port": 9001,
    "separator": "B",
    "terminator": "C"
  },
  "type": 0
}
```

---

### 조회网络매개변수

**명령어**: `0x4181 MSGCOMM_PARAM_INQUIRE`

**요청 매개변수**

| 필드 | 유형 | 설명 |
|------|------|------|
| robot | int | 로봇号 |
| craft | int | 프로세스号 |
| type | int | 0: 서버, 1: 클라이언트 |

**요청 예시**

```json
{
  "robot": 1,
  "craft": 1,
  "type": 2
}
```

---

### 응답网络매개변수조회

**명령어**: `0x4182 MSGCOMM_PARAM_RESPOND`

#### 클라이언트

**응답 매개변수**

| 필드 | 유형 | 설명 |
|------|------|------|
| frameHeader | string | 帧头 |
| ip | string | IP주소 |
| numberSystem | int | 0: 十进制, 1: 十六进制 |
| port | int | 포트 번호 |
| separator | string | 分隔符 |
| terminator | string | 结束符 |
| craft | int | 프로세스号 |
| netState | bool | true: 연결, false: 断开 |
| robot | int | 로봇号 |
| type | int | 0: 서버, 1: 클라이언트 |

**응답 예시**

```json
{
  "client": {
    "frameHeader": "@",
    "ip": "192.168.1.111",
    "numberSystem": 0,
    "port": 9000,
    "separator": ",",
    "terminator": "!"
  },
  "craft": 1,
  "netState": false,
  "robot": 1,
  "type": 1
}
```

#### 服务端

**응답 매개변수**

| 필드 | 유형 | 설명 |
|------|------|------|
| frameHeader | string | 帧头 |
| ip | string | IP주소 |
| numberSystem | int | 0: 十进制, 1: 十六进制 |
| port | int | 포트 번호 |
| separator | string | 分隔符 |
| terminator | string | 结束符 |
| craft | int | 프로세스号 |
| netState | bool | true: 연결, false: 断开 |
| robot | int | 로봇号 |
| type | int | 0: 서버, 1: 클라이언트 |

**응답 예시**

```json
{
  "craft": 1,
  "netState": false,
  "robot": 1,
  "server": {
    "frameHeader": "@",
    "ip": "192.168.1.14",
    "numberSystem": 0,
    "port": 22,
    "separator": ",",
    "terminator": "!"
  },
  "type": 0
}
```

---

### 연결MSGCOMM网络

**명령어**: `0x4183 MSGCOMM_DEVICE_CONNECT`

**요청 매개변수**

| 필드 | 유형 | 설명 |
|------|------|------|
| robot | int | 로봇号 |
| craft | int | 프로세스号 |

**요청 예시**

```json
{
  "robot": 1,
  "craft": 1
}
```

---

### 关闭MSGCOMM网络

**명령어**: `0x4184 MSGCOMM_DEVICE_CLOSE`

**요청 매개변수**

| 필드 | 유형 | 설명 |
|------|------|------|
| robot | int | 로봇号 |
| craft | int | 프로세스号 |

**요청 예시**

```json
{
  "robot": 1,
  "craft": 1
}
```
