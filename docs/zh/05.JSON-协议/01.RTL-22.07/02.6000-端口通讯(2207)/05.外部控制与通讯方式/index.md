# 5.外部控制与通讯方式

## 目录

- [远程程序设置](#远程程序设置)
- [Lua 程序](#lua程序)
- [Modbus](#modbus)
- [TCP 通讯](#tcp通讯)

---

## 远程程序设置

### 远程模式连接状态

#### 查询 Modbus、外部 IO 连接状态

**命令字**: `0x5032 REMOTE_CONNECT_INQUIRE`

请求包体：

```json
{}
```

#### 返回连接状态

**命令字**: `0x5033 REMOTE_CONNECT_RESPOND`

响应包体：

```json
{
  "ModbusConnect": false,
  "ExternIOConnect": true,
  "type": 2
}
```

| 参数 | 类型 | 描述 |
|------|------|------|
| ModbusConnect | bool | Modbus 连接状态：`false` 未连接，`true` 已连接 |
| ExternIOConnect | bool | 外部 IO 连接状态：`false` 未连接，`true` 已连接 |
| type | int | 连接类型：0:NAN, 1:RTU, 2:TCP |

---

### 远程作业文件设置

#### 设置远程作业文件

**命令字**: `0x2C01 REMOTE_JOBFILE_SET`

| 参数 | 类型 | 描述 |
|------|------|------|
| robot | int | 机器人号 |
| jobFile | array | 作业文件列表 |

**jobFile 数组元素**:

| 参数 | 类型 | 描述 |
|------|------|------|
| name | string | 作业文件名称 |
| times | int | 运行次数 |

请求包体：

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

> 最多 10 个作业文件

#### 获取远程作业文件

**命令字**: `0x2C02 REMOTE_JOBFILE_INQUIRE`

请求包体：

```json
{
  "robot": 1
}
```

#### 返回作业文件查询结果

**命令字**: `0x2C03 REMOTE_JOBFILE_RESPOND`

响应包体：

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

### 远程模式参数设置

#### 设置远程模式参数

**命令字**: `0x2C04 REMOTE_PARA_SET`

| 参数 | 类型 | 描述 |
|------|------|------|
| robot | int | 机器人号 |
| remoteDefaultSpeed | int | 远程模式速度，范围 1~100 |
| reserveIsStart | int | 预约并启动：`1` 启动，`0` 关闭 |
| reserveTrgTime | int | 确认启动时间，范围 200~1000ms |
| waitingTime | int | IO 重复触发时间 |

请求包体：

```json
{
  "robot": 1,
  "remoteDefaultSpeed": 15,
  "reserveIsStart": 1,
  "reserveTrgTime": 200,
  "waitingTime": 500
}
```

#### 查询远程模式参数

**命令字**: `0x2C05 REMOTE_PARA_INQUIRE`

请求包体：

```json
{
  "robot": 1
}
```

#### 返回远程模式参数查询结果

**命令字**: `0x2C06 REMOTE_PARA_RESPOND`

响应包体：

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

## Lua 程序

Lua 文件存放在 `~/robot/job/lua` 目录内。

上传文件和查看文件列表用 SCP 的方式。

### 运行程序

**上位机发送**: `0x2511`

```json
{
  "fileName": "xxx.lua"
}
```

**控制器返回**: `0x2512`

```json
{
  "fileName": "xxx.lua",
  "result": true,
  "error": "错误原因"
}
```

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| fileName | string | 是 | Lua 文件名 |
| result | bool | 是 | 运行是否成功 |
| error | string | 是 | 错误原因，成功时为空字符串 |

---

### 停止程序

**上位机发送**: `0x2513`

```json
{
  "fileName": "xxx.lua"
}
```

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| fileName | string | 是 | Lua 文件名 |

---

### 当前运行

**上位机发送**: `0x2515`

```json
{}
```

**控制器回复**: `0x2516`

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

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| fileNames | array | 是 | 运行中的文件列表 |
| fileNames[].fileName | string | 是 | Lua 文件名 |
| fileNames[].status | int | 是 | 1-暂停，2-运行 |

---

## Modbus

### 1. 设置 Modbus 程序

**命令字**: `0x5701` `EXTERN_PROGRAM_SET`

```json
{
  "robot": 1,
  "programid": 1,
  "jobname": "xxxx"
}
```

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| robot | int | 是 | 机器人编号，范围 1-4 |
| programid | int | 是 | 程序 ID，范围 1-300 |
| jobname | string | 是 | 作业文件名（不含后缀） |

---

### 2. 查询 Modbus 程序

**命令字**: `0x5702` `EXTERN_PROGRAM_INQUIRE`

```json
{
  "robot": 1,
  "startprogramid": 1,
  "num": 10
}
```

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| robot | int | 是 | 机器人编号，范围 1-4 |
| startprogramid | int | 是 | 程序起始 ID |
| num | int | 是 | 需要获取的程序个数，范围 1-10 |

---

### 3. 查询 Modbus 程序响应

**命令字**: `0x5703` `EXTERN_PROGRAM_RESPOND`

```json
{
  "robot": 1,
  "startprogramid": 1,
  "jobnamelist": ["xxx", "", "yyyy"]
}
```

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| robot | int | 是 | 机器人编号，范围 1-4 |
| startprogramid | int | 是 | 程序起始 ID |
| jobnamelist | array | 是 | 作业文件名列表，共 10 个元素，没有则填空字符串 |

---

### 4. 设置控制器的 Modbus 类型

**命令字**: `0x5711`

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

| 参数分类 | 参数名 | 类型 | 必填 | 描述 |
|----------|--------|------|------|------|
| RTU | baudrate | string | 是 | Modbus RTU 通信的波特率 |
| RTU | port | int | 是 | Modbus RTU 通信的串口号 |
| RTU | slaveId | int | 是 | Modbus RTU 通信的从设备 ID |
| TCP | IP | string | 是 | Modbus TCP 通信的服务器 IP 地址 |
| TCP | port | int | 是 | Modbus TCP 通信的端口号 |
| 通用 | master-slave | string | 是 | 主从模式：0 表示主模式，1 表示从模式 |
| 通用 | scancycle | int | 是 | 扫描周期，单位：毫秒 |
| 通用 | stoprun | bool | 是 | 运行停止标志：0 表示未停止，1 表示停止 |
| 通用 | type | string | 是 | 通信类型，可选 RTU 或 TCP |

---

### 5. 查询控制器的 Modbus 类型

**命令字**: `0x5712`

```json
{}
```

**控制器响应** (`0x5713`):

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

| 参数分类 | 参数名 | 类型 | 必填 | 描述 |
|----------|--------|------|------|------|
| RTU | baudrate | string | 是 | Modbus RTU 通信的波特率 |
| RTU | port | int | 是 | Modbus RTU 通信的串口号 |
| RTU | slaveId | int | 是 | Modbus RTU 通信的从设备 ID |
| TCP | IP | string | 是 | Modbus TCP 通信的服务器 IP 地址 |
| TCP | port | int | 是 | Modbus TCP 通信的端口号 |
| 通用 | enable | bool | 是 | 是否启用 Modbus 通信 |
| 通用 | master-slave | string | 是 | 主从模式：0 表示主模式，1 表示从模式 |
| 通用 | scancycle | int | 是 | 扫描周期，单位：毫秒 |
| 通用 | stoprun | bool | 是 | 运行停止标志：0 表示未停止，1 表示停止 |
| 通用 | type | string | 是 | 通信类型，可选 RTU 或 TCP |

---

### 6. 控制器 Modbus 使能

**命令字**: `0x5714`

```json
{
  "enable": false
}
```

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| enable | bool | 是 | 是否启用 Modbus 通信：false 禁用，true 启用 |

---

### 7. 设置 Modbus 心跳检测

**命令字**: `0x5715` `MODBUS_CHECKHEART_SET`

```json
{
  "checkheart": true
}
```

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| checkheart | bool | 是 | Modbus 心跳检测开关 |

---

### 8. 查询 Modbus 心跳检测

**命令字**: `0x5716` `MODBUS_CHECKHEART_INQUIRE`

```json
{}
```

**控制器响应** (`0x5717`):

```json
{
  "checkheart": true
}
```

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| checkheart | bool | 是 | Modbus 心跳检测状态：true 开启，false 关闭 |

---

### 9. 查询控制器作为从站是否连接

**命令字**: `0x5718`

**请求**:

```json
{}
```

**响应**:

```json
{
  "ModbusConnect": false
}
```

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| ModbusConnect | bool | 是 | 连接状态：false 未连接，true 已连接 |

---

### 10. 控制器作为主站的参数设置

**命令字**: `0x5719`

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

| 参数分类 | 参数名 | 类型 | 必填 | 描述 |
|----------|--------|------|------|------|
| masterStation | type | string | 是 | 通信类型：RTU 或 TCP |
| masterStation | processNumber | int | 是 | 工艺号 |
| masterStation.RTU | baudrate | int | 是 | 波特率 |
| masterStation.RTU | checkBit | string | 是 | 校验位：如 "E"（偶校验）、"O"（奇校验）、"N"（无校验） |
| masterStation.RTU | dataBit | int | 是 | 数据位 |
| masterStation.RTU | port | int | 是 | 串口号 |
| masterStation.RTU | slaveId | int | 是 | 从设备 ID |
| masterStation.RTU | stopBit | int | 是 | 停止位 |
| masterStation.TCP | IP | string | 是 | TCP 服务器 IP 地址 |
| masterStation.TCP | port | int | 是 | TCP 端口号 |
| 通用 | startAddress | bool | 是 | 起始地址开关 |

---

### 11. 查询控制器作为主站时的信息

**命令字**: `0x5744`

```json
{
  "processNumber": 2
}
```

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| processNumber | int | 是 | 工艺号 |

---

### 12. 查询主站信息响应

**命令字**: `0x5745`

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

| 参数分类 | 参数名 | 类型 | 必填 | 描述 |
|----------|--------|------|------|------|
| RTU | baudrate | int | 是 | 波特率 |
| RTU | checkBit | string | 是 | 校验位 |
| RTU | dataBit | int | 是 | 数据位 |
| RTU | port | int | 是 | 串口号 |
| RTU | slaveId | int | 是 | 从设备 ID |
| RTU | stopBit | int | 是 | 停止位 |
| TCP | IP | string | 是 | TCP 服务器 IP 地址 |
| TCP | port | int | 是 | TCP 端口号 |
| 通用 | modbus_state | bool | 是 | MODBUS 状态 |
| 通用 | response_time_out | int | 是 | 响应超时时间，单位：毫秒 |
| 通用 | startAddress | bool | 是 | 起始地址开关 |
| 通用 | type | string | 是 | 通信类型：RTU 或 TCP |

---

### 13. 命令字汇总

| 命令字 | 功能 | 方向 |
|--------|------|------|
| 0x5701 | 设置 Modbus 程序 | 上位机 → 控制器 |
| 0x5702 | 查询 Modbus 程序 | 上位机 → 控制器 |
| 0x5703 | 查询 Modbus 程序响应 | 控制器 → 上位机 |
| 0x5711 | 设置控制器 Modbus 类型 | 上位机 → 控制器 |
| 0x5712 | 查询控制器 Modbus 类型 | 上位机 → 控制器 |
| 0x5713 | 查询控制器 Modbus 类型响应 | 控制器 → 上位机 |
| 0x5714 | 控制器 Modbus 使能 | 上位机 → 控制器 |
| 0x5715 | 设置 Modbus 心跳检测 | 上位机 → 控制器 |
| 0x5716 | 查询 Modbus 心跳检测 | 上位机 → 控制器 |
| 0x5717 | 查询 Modbus 心跳检测响应 | 控制器 → 上位机 |
| 0x5718 | 查询从站连接状态 | 上位机 → 控制器 |
| 0x5719 | 设置主站参数 | 上位机 → 控制器 |
| 0x5744 | 查询主站信息 | 上位机 → 控制器 |
| 0x5745 | 查询主站信息响应 | 控制器 → 上位机 |

---

## TCP 通讯

### 设置网络参数

**命令字**: `0x4180 MSGCOMM_PARAM_SET`

#### 客户端

**请求参数**

| 字段 | 类型 | 描述 |
|------|------|------|
| frameHeader | string | 帧头 |
| ip | string | IP 地址 |
| numberSystem | int | 0: 十进制, 1: 十六进制 |
| port | int | 端口号 |
| separator | string | 分隔符 |
| terminator | string | 结束符 |
| craft | int | 工艺号 (1~9) |
| robot | int | 机器人号 |
| type | int | 0: 服务器, 1: 客户端 |

**请求示例**

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

**请求参数**

| 字段 | 类型 | 描述 |
|------|------|------|
| frameHeader | string | 帧头 |
| ip | string | IP 地址 |
| numberSystem | int | 0: 十进制, 1: 十六进制 |
| port | int | 端口号 |
| separator | string | 分隔符 |
| terminator | string | 结束符 |
| craft | int | 工艺号 (1~9) |
| robot | int | 机器人号 |
| type | int | 0: 服务器, 1: 客户端 |

**请求示例**

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

### 查询网络参数

**命令字**: `0x4181 MSGCOMM_PARAM_INQUIRE`

**请求参数**

| 字段 | 类型 | 描述 |
|------|------|------|
| robot | int | 机器人号 |
| craft | int | 工艺号 |
| type | int | 0: 服务器, 1: 客户端 |

**请求示例**

```json
{
  "robot": 1,
  "craft": 1,
  "type": 2
}
```

---

### 响应网络参数查询

**命令字**: `0x4182 MSGCOMM_PARAM_RESPOND`

#### 客户端

**响应参数**

| 字段 | 类型 | 描述 |
|------|------|------|
| frameHeader | string | 帧头 |
| ip | string | IP 地址 |
| numberSystem | int | 0: 十进制, 1: 十六进制 |
| port | int | 端口号 |
| separator | string | 分隔符 |
| terminator | string | 结束符 |
| craft | int | 工艺号 |
| netState | bool | true: 连接, false: 断开 |
| robot | int | 机器人号 |
| type | int | 0: 服务器, 1: 客户端 |

**响应示例**

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

**响应参数**

| 字段 | 类型 | 描述 |
|------|------|------|
| frameHeader | string | 帧头 |
| ip | string | IP 地址 |
| numberSystem | int | 0: 十进制, 1: 十六进制 |
| port | int | 端口号 |
| separator | string | 分隔符 |
| terminator | string | 结束符 |
| craft | int | 工艺号 |
| netState | bool | true: 连接, false: 断开 |
| robot | int | 机器人号 |
| type | int | 0: 服务器, 1: 客户端 |

**响应示例**

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

### 连接 MSGCOMM 网络

**命令字**: `0x4183 MSGCOMM_DEVICE_CONNECT`

**请求参数**

| 字段 | 类型 | 描述 |
|------|------|------|
| robot | int | 机器人号 |
| craft | int | 工艺号 |

**请求示例**

```json
{
  "robot": 1,
  "craft": 1
}
```

---

### 关闭 MSGCOMM 网络

**命令字**: `0x4184 MSGCOMM_DEVICE_CLOSE`

**请求参数**

| 字段 | 类型 | 描述 |
|------|------|------|
| robot | int | 机器人号 |
| craft | int | 工艺号 |

**请求示例**

```json
{
  "robot": 1,
  "craft": 1
}
```
