# Modbus

## 1. 上位机设置modbus主站参数

**命令字：** `0x7300`

### 参数列表

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| masterStation | object | 是 | 主站参数，包含RTU参数和TCP参数 |
| startAddress | bool | 否 | 地址偏移；true表示地址不变，false表示地址自动-1 |

#### masterStation 参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| type | string | 是 | 主站类型；取值"TCP","RTU" |
| processNumber | int | 是 | 需要设置的工艺号；范围[1,9] |
| RTU | object | 否 | RTU参数 |
| TCP | object | 否 | TCP参数 |

#### RTU 参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| baudrate | int | 是 | 波特率 |
| checkBit | string | 是 | 校验位；取值"N","E","O" |
| dataBit | int | 是 | 数据位；范围[5,8] |
| port | int | 是 | 端口号 |
| slaveId | int | 是 | 从站ID；范围[0,65535] |
| stopBit | int | 是 | 停止位；范围[0,1] |

#### TCP 参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| IP | string | 是 | IP地址 |
| endian_type | int | 是 | Float大小端；0表示AB CD，1表示CD AB，2表示BA DC，3表示DC BA |
| port | int | 是 | 端口号；范围[0,65535] |

### 请求示例

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
      "IP": "192.168.1.14",
      "endian_type": 1,
      "port": 503
    },
    "processNumber": 1,
    "type": "TCP"
  },
  "startAddress": false
}
```

---

## 2. 上位机查询modbus参数

**命令字：** `0x7301`

### 参数列表

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| processNumber | int | 是 | 需要查询的工艺号；范围[1,9] |

### 请求示例

```json
{
  "processNumber": 1
}
```

---

## 3. 控制器回复上位机modbus参数

**命令字：** `0x7302`

### 参数列表

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| type | string | 是 | 主站类型；取值"TCP","RTU" |
| RTU | object | 否 | RTU参数 |
| TCP | object | 否 | TCP参数 |
| modbus_state | bool | 是 | Modbus连接状态；true表示已连接，false表示未连接 |
| response_time_out | int | 是 | 读写响应时间；单位ms |
| startAddress | bool | 是 | 地址偏移；true表示地址不变，false表示地址自动-1 |

#### RTU 参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| baudrate | int | 是 | 波特率 |
| checkBit | string | 是 | 校验位；取值"N","E","O" |
| dataBit | int | 是 | 数据位；范围[5,8] |
| port | int | 是 | 端口号 |
| slaveId | int | 是 | 从站ID；范围[0,65535] |
| stopBit | int | 是 | 停止位；范围[0,1] |

#### TCP 参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| IP | string | 是 | IP地址 |
| endian_type | int | 是 | Float大小端；0表示AB CD，1表示CD AB，2表示BA DC，3表示DC BA |
| port | int | 是 | 端口号；范围[0,65535] |

### 响应示例

```json
{
  "RTU": {
    "baudrate": 115200,
    "checkBit": "E",
    "dataBit": 5,
    "port": 2,
    "slaveId": 1,
    "stopBit": 1
  },
  "TCP": {
    "IP": "192.168.1.14",
    "endian_type": 1,
    "port": 503
  },
  "modbus_state": false,
  "response_time_out": 100,
  "startAddress": false,
  "type": "TCP"
}
```

---

## 4. 上位机查询modbus连接状态

**命令字：** `0x7303`

### 请求示例

```json
{}
```

---

## 5. 控制器回复上位机modbus连接状态

**命令字：** `0x7304`

### 参数列表

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| ModbusConnect | bool | 是 | modbus连接状态；true表示已连接，false表示未连接 |

### 响应示例

```json
{
  "ModbusConnect": false
}
```

---

## 6. 上位机设置modbus从站参数

**命令字：** `0x7305`

### 参数列表

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| type | string | 是 | 通讯方式；取值"TCP","RTU" |
| RTU | object | 否 | RTU参数 |
| TCP | object | 否 | TCP参数 |
| master-slave | int | 是 | modbus通讯的主从模式；0表示主站，1表示从站 |
| scancycle | int | 是 | 扫描周期；范围[8,1000]ms |
| stoprun | int | 是 | 通讯断开时操作；0表示不停机，1表示停机 |

#### RTU 参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| baudrate | int | 是 | 波特率 |
| port | int | 是 | 端口号 |
| slaveId | int | 是 | 从站ID；范围[0,65535] |

#### TCP 参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| IP | string | 是 | IP地址（默认值） |
| endian_type | int | 是 | Float大小端；0表示AB CD，1表示CD AB，2表示BA DC，3表示DC BA |
| port | int | 是 | 端口号；范围[0,65535] |

### 请求示例

```json
{
  "RTU": {
    "baudrate": 115200,
    "port": 2,
    "slaveId": 1
  },
  "TCP": {
    "IP": "192.168.1.11",
    "endian_type": 0,
    "port": 502
  },
  "master-slave": 1,
  "scancycle": 100,
  "stoprun": 0,
  "type": "TCP"
}
```

---

## 7. 上位机查询modbus从站参数

**命令字：** `0x7306`

### 请求示例

```json
{}
```

---

## 8. 控制器回复上位机modbus从站参数

**命令字：** `0x7307`

### 参数列表

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| type | string | 是 | 通讯方式；取值"TCP","RTU" |
| RTU | object | 否 | RTU参数 |
| TCP | object | 否 | TCP参数 |
| enable | bool | 是 | 连接使能 |
| master-slave | int | 是 | modbus通讯的主从模式；0表示主站，1表示从站 |
| scancycle | int | 是 | 扫描周期；范围[8,1000]ms |
| stoprun | int | 是 | 通讯断开时操作；0表示不停机，1表示停机 |

#### RTU 参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| baudrate | int | 是 | 波特率 |
| port | int | 是 | 端口号 |
| slaveId | int | 是 | 从站ID；范围[0,65535] |

#### TCP 参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| IP | string | 是 | IP地址（默认值） |
| endian_type | int | 是 | Float大小端；0表示AB CD，1表示CD AB，2表示BA DC，3表示DC BA |
| port | int | 是 | 端口号；范围[0,65535] |

### 响应示例

```json
{
  "RTU": {
    "baudrate": 115200,
    "port": 2,
    "slaveId": 1
  },
  "TCP": {
    "IP": "192.168.1.11",
    "endian_type": 0,
    "port": 502
  },
  "enable": false,
  "master-slave": 1,
  "scancycle": 100,
  "stoprun": 0,
  "type": "TCP"
}
```

---

## 9. 上位机设置modbus从站连接使能

**命令字：** `0x7308`

### 参数列表

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| enable | bool | 是 | modbus从站连接使能 |

### 请求示例

```json
{
  "enable": true
}
```

---

## 10. 上位机设置modbus从站心跳检测使能

**命令字：** `0x7309`

### 参数列表

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| checkheart | bool | 是 | 心跳检测使能 |

### 请求示例

```json
{
  "checkheart": true
}
```

---

## 11. 上位机查询modbus从站心跳检测使能

**命令字：** `0x703A`

### 请求示例

```json
{}
```

---

## 12. 控制器回复上位机modbus从站心跳检测使能

**命令字：** `0x703B`

### 参数列表

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| checkheart | bool | 是 | 心跳检测使能 |

### 响应示例

```json
{
  "checkheart": true
}
```

---

## 13. 上位机设置modbus程序

**命令字：** `0x703C`

### 参数列表

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| jobname | string | 是 | 已选程序名称 |
| programid | int | 是 | 程序序号；范围[1,300] |
| robot | int | 是 | 当前机器人号 |

### 请求示例

```json
{
  "jobname": "AA",
  "programid": 1,
  "robot": 1
}
```

---

## 14. 上位机查询modbus程序

**命令字：** `0x703D`

### 参数列表

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| num | int | 是 | 查询数量；固定为10 |
| robot | int | 是 | 当前机器人号 |
| startprogramid | int | 是 | 查询序列起始程序序号；范围[1,30] |

### 请求示例

```json
{
  "num": 10,
  "robot": 1,
  "startprogramid": 1
}
```

---

## 15. 控制器回复上位机modbus程序

**命令字：** `0x703E`

### 参数列表

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| jobnamelist | array | 是 | 程序名称列表；长度为10 |
| robot | int | 是 | 当前机器人号 |
| startprogramid | int | 是 | 序列起始程序序号；范围[1,30] |
| sum | int | 是 | 可选程序总数 |

### 响应示例

```json
{
  "jobnamelist": ["AA", "", "", "", "", "", "", "", "", ""],
  "robot": 1,
  "startprogramid": 1,
  "sum": 300
}
```
