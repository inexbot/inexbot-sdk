# 5. External Control and Communication Methods

## Table of Contents

- [Remote Program Settings](#remote-program-settings)
- [Lua Program](#lua-program)
- [Modbus](#modbus)
- [TCP Communication](#tcp-communication)

---

## Remote Program Settings

### Remote Mode Connection Status

#### Query Modbus and External IO Connection Status

**Command Code**: `0x5032 REMOTE_CONNECT_INQUIRE`

Request body:

```json
{}
```

#### Return Connection Status

**Command Code**: `0x5033 REMOTE_CONNECT_RESPOND`

Response body:

```json
{
  "ModbusConnect": false,
  "ExternIOConnect": true,
  "type": 2
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| ModbusConnect | bool | Modbus connection status: `false` not connected, `true` connected |
| ExternIOConnect | bool | External IO connection status: `false` not connected, `true` connected |
| type | int | Connection type: 0:NAN, 1:RTU, 2:TCP |

---

### Remote Job File Settings

#### Set Remote Job File

**Command Code**: `0x2C01 REMOTE_JOBFILE_SET`

| Parameter | Type | Description |
|-----------|------|-------------|
| robot | int | Robot number |
| jobFile | array | Job file list |

**jobFile array elements**:

| Parameter | Type | Description |
|-----------|------|-------------|
| name | string | Job file name |
| times | int | Number of runs |

Request body:

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

> Maximum 10 job files

#### Get Remote Job File

**Command Code**: `0x2C02 REMOTE_JOBFILE_INQUIRE`

Request body:

```json
{
  "robot": 1
}
```

#### Return Job File Query Result

**Command Code**: `0x2C03 REMOTE_JOBFILE_RESPOND`

Response body:

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

### Remote Mode Parameter Settings

#### Set Remote Mode Parameters

**Command Code**: `0x2C04 REMOTE_PARA_SET`

| Parameter | Type | Description |
|-----------|------|-------------|
| robot | int | Robot number |
| remoteDefaultSpeed | int | Remote mode speed, range 1~100 |
| reserveIsStart | int | Reserve and start: `1` start, `0` off |
| reserveTrgTime | int | Start confirmation time, range 200~1000ms |
| waitingTime | int | IO repeat trigger time |

Request body:

```json
{
  "robot": 1,
  "remoteDefaultSpeed": 15,
  "reserveIsStart": 1,
  "reserveTrgTime": 200,
  "waitingTime": 500
}
```

#### Query Remote Mode Parameters

**Command Code**: `0x2C05 REMOTE_PARA_INQUIRE`

Request body:

```json
{
  "robot": 1
}
```

#### Return Remote Mode Parameter Query Result

**Command Code**: `0x2C06 REMOTE_PARA_RESPOND`

Response body:

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

## Lua Program

Lua files are stored in the `~/robot/job/lua` directory.

File upload and file list viewing use the SCP method.

### Run Program

**Host PC sends**: `0x2511`

```json
{
  "fileName": "xxx.lua"
}
```

**Controller returns**: `0x2512`

```json
{
  "fileName": "xxx.lua",
  "result": true,
  "error": "Error reason"
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| fileName | string | Yes | Lua file name |
| result | bool | Yes | Whether the run was successful |
| error | string | Yes | Error reason; empty string on success |

---

### Stop Program

**Host PC sends**: `0x2513`

```json
{
  "fileName": "xxx.lua"
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| fileName | string | Yes | Lua file name |

---

### Current Running

**Host PC sends**: `0x2515`

```json
{}
```

**Controller responds**: `0x2516`

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

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| fileNames | array | Yes | List of running files |
| fileNames[].fileName | string | Yes | Lua file name |
| fileNames[].status | int | Yes | 1-paused, 2-running |

---

## Modbus

### 1. Set Modbus Program

**Command Code**: `0x5701` `EXTERN_PROGRAM_SET`

```json
{
  "robot": 1,
  "programid": 1,
  "jobname": "xxxx"
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| robot | int | Yes | Robot number, range 1-4 |
| programid | int | Yes | Program ID, range 1-300 |
| jobname | string | Yes | Job file name (without extension) |

---

### 2. Query Modbus Program

**Command Code**: `0x5702` `EXTERN_PROGRAM_INQUIRE`

```json
{
  "robot": 1,
  "startprogramid": 1,
  "num": 10
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| robot | int | Yes | Robot number, range 1-4 |
| startprogramid | int | Yes | Program start ID |
| num | int | Yes | Number of programs to retrieve, range 1-10 |

---

### 3. Query Modbus Program Response

**Command Code**: `0x5703` `EXTERN_PROGRAM_RESPOND`

```json
{
  "robot": 1,
  "startprogramid": 1,
  "jobnamelist": ["xxx", "", "yyyy"]
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| robot | int | Yes | Robot number, range 1-4 |
| startprogramid | int | Yes | Program start ID |
| jobnamelist | array | Yes | Job file name list, 10 elements total; fill with empty string if none |

---

### 4. Set Controller Modbus Type

**Command Code**: `0x5711`

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

| Category | Parameter | Type | Required | Description |
|----------|-----------|------|----------|-------------|
| RTU | baudrate | string | Yes | Baud rate for Modbus RTU communication |
| RTU | port | int | Yes | Serial port number for Modbus RTU communication |
| RTU | slaveId | int | Yes | Slave device ID for Modbus RTU communication |
| TCP | IP | string | Yes | Server IP address for Modbus TCP communication |
| TCP | port | int | Yes | Port number for Modbus TCP communication |
| General | master-slave | string | Yes | Master-slave mode: 0 for master mode, 1 for slave mode |
| General | scancycle | int | Yes | Scan cycle, unit: milliseconds |
| General | stoprun | bool | Yes | Run/stop flag: 0 for not stopped, 1 for stopped |
| General | type | string | Yes | Communication type, either RTU or TCP |

---

### 5. Query Controller Modbus Type

**Command Code**: `0x5712`

```json
{}
```

**Controller response** (`0x5713`):

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

| Category | Parameter | Type | Required | Description |
|----------|-----------|------|----------|-------------|
| RTU | baudrate | string | Yes | Baud rate for Modbus RTU communication |
| RTU | port | int | Yes | Serial port number for Modbus RTU communication |
| RTU | slaveId | int | Yes | Slave device ID for Modbus RTU communication |
| TCP | IP | string | Yes | Server IP address for Modbus TCP communication |
| TCP | port | int | Yes | Port number for Modbus TCP communication |
| General | enable | bool | Yes | Whether Modbus communication is enabled |
| General | master-slave | string | Yes | Master-slave mode: 0 for master mode, 1 for slave mode |
| General | scancycle | int | Yes | Scan cycle, unit: milliseconds |
| General | stoprun | bool | Yes | Run/stop flag: 0 for not stopped, 1 for stopped |
| General | type | string | Yes | Communication type, either RTU or TCP |

---

### 6. Controller Modbus Enable

**Command Code**: `0x5714`

```json
{
  "enable": false
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| enable | bool | Yes | Whether to enable Modbus communication: false to disable, true to enable |

---

### 7. Set Modbus Heartbeat Detection

**Command Code**: `0x5715` `MODBUS_CHECKHEART_SET`

```json
{
  "checkheart": true
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| checkheart | bool | Yes | Modbus heartbeat detection switch |

---

### 8. Query Modbus Heartbeat Detection

**Command Code**: `0x5716` `MODBUS_CHECKHEART_INQUIRE`

```json
{}
```

**Controller response** (`0x5717`):

```json
{
  "checkheart": true
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| checkheart | bool | Yes | Modbus heartbeat detection status: true enabled, false disabled |

---

### 9. Query Whether Controller as Slave Station is Connected

**Command Code**: `0x5718`

**Request**:

```json
{}
```

**Response**:

```json
{
  "ModbusConnect": false
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| ModbusConnect | bool | Yes | Connection status: false not connected, true connected |

---

### 10. Controller as Master Station Parameter Settings

**Command Code**: `0x5719`

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

| Category | Parameter | Type | Required | Description |
|----------|-----------|------|----------|-------------|
| masterStation | type | string | Yes | Communication type: RTU or TCP |
| masterStation | processNumber | int | Yes | Process number |
| masterStation.RTU | baudrate | int | Yes | Baud rate |
| masterStation.RTU | checkBit | string | Yes | Parity bit: e.g. "E" (even parity), "O" (odd parity), "N" (no parity) |
| masterStation.RTU | dataBit | int | Yes | Data bit |
| masterStation.RTU | port | int | Yes | Serial port number |
| masterStation.RTU | slaveId | int | Yes | Slave device ID |
| masterStation.RTU | stopBit | int | Yes | Stop bit |
| masterStation.TCP | IP | string | Yes | TCP server IP address |
| masterStation.TCP | port | int | Yes | TCP port number |
| General | startAddress | bool | Yes | Start address switch |

---

### 11. Query Controller Information as Master Station

**Command Code**: `0x5744`

```json
{
  "processNumber": 2
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| processNumber | int | Yes | Process number |

---

### 12. Query Master Station Information Response

**Command Code**: `0x5745`

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

| Category | Parameter | Type | Required | Description |
|----------|-----------|------|----------|-------------|
| RTU | baudrate | int | Yes | Baud rate |
| RTU | checkBit | string | Yes | Parity bit |
| RTU | dataBit | int | Yes | Data bit |
| RTU | port | int | Yes | Serial port number |
| RTU | slaveId | int | Yes | Slave device ID |
| RTU | stopBit | int | Yes | Stop bit |
| TCP | IP | string | Yes | TCP server IP address |
| TCP | port | int | Yes | TCP port number |
| General | modbus_state | bool | Yes | MODBUS status |
| General | response_time_out | int | Yes | Response timeout, unit: milliseconds |
| General | startAddress | bool | Yes | Start address switch |
| General | type | string | Yes | Communication type: RTU or TCP |

---

### 13. Command Code Summary

| Command Code | Function | Direction |
|--------------|----------|-----------|
| 0x5701 | Set Modbus program | Host PC → Controller |
| 0x5702 | Query Modbus program | Host PC → Controller |
| 0x5703 | Query Modbus program response | Controller → Host PC |
| 0x5711 | Set controller Modbus type | Host PC → Controller |
| 0x5712 | Query controller Modbus type | Host PC → Controller |
| 0x5713 | Query controller Modbus type response | Controller → Host PC |
| 0x5714 | Controller Modbus enable | Host PC → Controller |
| 0x5715 | Set Modbus heartbeat detection | Host PC → Controller |
| 0x5716 | Query Modbus heartbeat detection | Host PC → Controller |
| 0x5717 | Query Modbus heartbeat detection response | Controller → Host PC |
| 0x5718 | Query slave station connection status | Host PC → Controller |
| 0x5719 | Set master station parameters | Host PC → Controller |
| 0x5744 | Query master station information | Host PC → Controller |
| 0x5745 | Query master station information response | Controller → Host PC |

---

## TCP Communication

### Set Network Parameters

**Command Code**: `0x4180 MSGCOMM_PARAM_SET`

#### Client

**Request Parameters**

| Field | Type | Description |
|-------|------|-------------|
| frameHeader | string | Frame header |
| ip | string | IP address |
| numberSystem | int | 0: decimal, 1: hexadecimal |
| port | int | Port number |
| separator | string | Separator |
| terminator | string | Terminator |
| craft | int | Process number (1~9) |
| robot | int | Robot number |
| type | int | 0: server, 1: client |

**Request Example**

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

#### Server

**Request Parameters**

| Field | Type | Description |
|-------|------|-------------|
| frameHeader | string | Frame header |
| ip | string | IP address |
| numberSystem | int | 0: decimal, 1: hexadecimal |
| port | int | Port number |
| separator | string | Separator |
| terminator | string | Terminator |
| craft | int | Process number (1~9) |
| robot | int | Robot number |
| type | int | 0: server, 1: client |

**Request Example**

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

### Query Network Parameters

**Command Code**: `0x4181 MSGCOMM_PARAM_INQUIRE`

**Request Parameters**

| Field | Type | Description |
|-------|------|-------------|
| robot | int | Robot number |
| craft | int | Process number |
| type | int | 0: server, 1: client |

**Request Example**

```json
{
  "robot": 1,
  "craft": 1,
  "type": 2
}
```

---

### Respond to Network Parameter Query

**Command Code**: `0x4182 MSGCOMM_PARAM_RESPOND`

#### Client

**Response Parameters**

| Field | Type | Description |
|-------|------|-------------|
| frameHeader | string | Frame header |
| ip | string | IP address |
| numberSystem | int | 0: decimal, 1: hexadecimal |
| port | int | Port number |
| separator | string | Separator |
| terminator | string | Terminator |
| craft | int | Process number |
| netState | bool | true: connected, false: disconnected |
| robot | int | Robot number |
| type | int | 0: server, 1: client |

**Response Example**

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

#### Server

**Response Parameters**

| Field | Type | Description |
|-------|------|-------------|
| frameHeader | string | Frame header |
| ip | string | IP address |
| numberSystem | int | 0: decimal, 1: hexadecimal |
| port | int | Port number |
| separator | string | Separator |
| terminator | string | Terminator |
| craft | int | Process number |
| netState | bool | true: connected, false: disconnected |
| robot | int | Robot number |
| type | int | 0: server, 1: client |

**Response Example**

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

### Connect MSGCOMM Network

**Command Code**: `0x4183 MSGCOMM_DEVICE_CONNECT`

**Request Parameters**

| Field | Type | Description |
|-------|------|-------------|
| robot | int | Robot number |
| craft | int | Process number |

**Request Example**

```json
{
  "robot": 1,
  "craft": 1
}
```

---

### Close MSGCOMM Network

**Command Code**: `0x4184 MSGCOMM_DEVICE_CLOSE`

**Request Parameters**

| Field | Type | Description |
|-------|------|-------------|
| robot | int | Robot number |
| craft | int | Process number |

**Request Example**

```json
{
  "robot": 1,
  "craft": 1
}
```
