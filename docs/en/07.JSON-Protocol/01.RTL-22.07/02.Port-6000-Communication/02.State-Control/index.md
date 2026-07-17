# 2. State Control

This document contains the following content:

- [Servo Status](#1-servo-status)
- [System Status](#2-system-status)
- [Digital Input/Output](#3-digital-inputoutput)
- [Remote IO Control](#4-remote-io-control)
- [Global Variables](#5-global-variables)

---

## 1. Servo Status

### 1.1 Servo Connection Status

#### 1.1.1 Query Servo Connection Status

| Item | Value |
|------|-----|
| Command Word | `0x5042` SERVO_CONNECT_INQUIRE |

**Request Parameters**: None

```json
{}
```

#### 1.1.2 Return When Receiving Connection Status Query

| Item | Value |
|------|-----|
| Command Word | `0x5043` SERVO_CONNECT_RESPOND |

| Parameter | Type | Description |
|------|------|------|
| servoType | int | Servo type |

```json
{
  "servoType": 0
}
```

---

### 1.2 Servo Status Set and Get

#### 1.2.1 Upper Computer Changes Servo Status

**Command Word**: `0x2001` SERVO_STATUS_SET

| Parameter | Type | Description | Range |
|------|------|------|----------|
| robot | int | Select robot | [1, 4] |
| status | int | Servo status | 0: Real servo, 1: Virtual servo, 2: No servo |

```json
{
  "robot": 1,
  "status": 0
}
```

#### 1.2.2 Upper Computer Queries Servo Status

**Command Word**: `0x2002` SERVO_STATUS_INQUIRE

| Parameter | Type | Description | Range |
|------|------|------|----------|
| robot | int | Select robot | [1, 4] |

```json
{
  "robot": 1
}
```

#### 1.2.3 Controller Responds Servo Status

**Command Word**: `0x2003` SERVO_STATUS_RESPOND

| Parameter | Type | Description | Range |
|------|------|------|----------|
| robot | int | Select robot | [1, 4] |
| mode | int | Run mode | 0: Single robot mode, 1: Multi-robot mode |
| status | int | Servo status | 0: Stopped, 1: Ready, 2: Error, 3: Running |

```json
{
  "mode": 0,
  "robot": 1,
  "status": 0
}
```

---

### 1.3 Operation Mode Status Set and Get

**Operation Mode Description**:

| Mode Value | Name | Description |
|--------|------|------|
| 0 | Teach Mode (Teach) | - |
| 1 | Remote Mode (Circle) | - |
| 2 | Run Mode (Repeat) | - |

#### 1.3.1 Upper Computer Sets Current Controller Operation Mode

**Command Word**: `0x2101` OPERATION_MODE_SET

| Parameter | Type | Description | Range |
|------|------|------|----------|
| mode | int | Operation mode | 0: Teach mode, 1: Remote mode, 2: Run mode |

```json
{
  "mode": 0
}
```

#### 1.3.2 Upper Computer Queries Operation Mode

**Command Word**: `0x2102` OPERATION_MODE_INQUIRE

**Request Parameters**: None

```json
{}
```

#### 1.3.3 Controller Responds Operation Mode

**Command Word**: `0x2103` OPERATION_MODE_RESPOND

| Parameter | Type | Description |
|------|------|------|
| mode | int | Operation mode |

```json
{
  "mode": 0
}
```

#### 1.3.4 Upper Computer Changes Teach Operation Mode

**Command Word**: `0x2104` TEACHTYPE_SET

| Parameter | Type | Description | Range |
|------|------|------|----------|
| teachType | int | Teach type | 0: Jog (single axis), 1: Drag teach, 2: Jog (linked axes) |

```json
{
  "teachType": 0
}
```

#### 1.3.5 Upper Computer Queries Teach Type

**Command Word**: `0x2105` TEACHTYPE_INQUIRE

**Request Parameters**: None

```json
{}
```

#### 1.3.6 Controller Responds Teach Type

**Command Word**: `0x2106` TEACHTYPE_RESPOND

| Parameter | Type | Description |
|------|------|------|
| teachType | int | Teach type |

```json
{
  "teachType": 0
}
```

---

### 1.4 Coordinate Mode Status Set and Get

**Coordinate Mode Description**:

| Mode Value | Name | Description |
|--------|------|------|
| 0 | Joint Coordinate (Joint) | - |
| 1 | Cartesian Coordinate (Cart) | - |
| 2 | Tool Coordinate (Tool) | - |
| 3 | User Coordinate (User) | - |

#### 1.4.1 Upper Computer Changes Current Coordinate Mode

**Command Word**: `0x2201` COORD_MODE_SET

| Parameter | Type | Description | Range |
|------|------|------|----------|
| robot | int | Select robot | [1, 4] |
| coord | int | Coordinate mode | 0: Joint coordinate, 1: Cartesian coordinate, 2: Tool coordinate, 3: User coordinate |

```json
{
  "robot": 1,
  "coord": 0
}
```

#### 1.4.2 Upper Computer Queries Coordinate Mode

**Command Word**: `0x2202` COORD_MODE_INQUIRE

| Parameter | Type | Description | Range |
|------|------|------|----------|
| robot | int | Select robot | [1, 4] |

```json
{
  "robot": 1
}
```

#### 1.4.3 Controller Responds Coordinate Mode

**Command Word**: `0x2203` COORD_MODE_RESPOND

| Parameter | Type | Description | Range |
|------|------|------|----------|
| robot | int | Select robot | [1, 4] |
| coord | int | Coordinate mode | 0: Joint coordinate, 1: Cartesian coordinate, 2: Tool coordinate, 3: User coordinate |

```json
{
  "robot": 1,
  "coord": 0
}
```

---

### 1.5 Servo Power On/Off Status Set and Get

#### 1.5.1 Teach Pendant Changes Current Power On/Off Status

**Command Word**: `0x2301` DEADMAN_STATUS_SET

| Parameter | Type | Description | Range |
|------|------|------|----------|
| deadman | int | Power on/off status | 0: DEADMAN power off, 1: DEADMAN power on |

```json
{
  "deadman": 0
}
```

#### 1.5.2 Teach Pendant Queries Power On/Off Status

**Command Word**: `0x2302` DEADMAN_STATUS_INQUIRE

**Request Parameters**: None

```json
{}
```

#### 1.5.3 Controller Responds Power On/Off Status

**Command Word**: `0x2303` DEADMAN_STATUS_RESPOND

| Parameter | Type | Description |
|------|------|------|
| deadman | int | Power on/off status |

```json
{
  "deadman": 0
}
```

#### 1.5.4 Upper Computer Sets Power On/Off Mode

**Command Word**: `0x2304` DEADMAN_MODE_SET

| Parameter | Type | Description | Range |
|------|------|------|----------|
| deadmanMode | int | Trigger mode | 0: Software trigger, 1: Hardware trigger |
| deadmanPortOne | int | Power on enable port IO number | Each port can be assigned up to 16 IO numbers |
| deadmanPortTwo | int | Power off enable port IO number | - |

```json
{
  "deadmanMode": 1,
  "deadmanPortOne": 9,
  "deadmanPortTwo": 0
}
```

#### 1.5.5 Upper Computer Queries Power On/Off Mode

**Command Word**: `0x2305` DEADMAN_MODE_INQUIRE

**Request Parameters**: None

```json
{}
```

#### 1.5.6 Controller Responds Power On/Off Mode

**Command Word**: `0x2306` DEADMAN_MODE_RESPOND

| Parameter | Type | Description | Range |
|------|------|------|----------|
| deadmanMode | int | Trigger mode | 0: Software trigger, 1: Hardware trigger |
| deadmanPortOne | int | Power on enable port IO number | Each port can be assigned up to 16 IO numbers |
| deadmanPortTwo | int | Power off enable port IO number | - |

```json
{
  "deadmanMode": 1,
  "deadmanPortOne": 9,
  "deadmanPortTwo": 0
}
```

#### 1.5.7 Servo Enable (Not available on teach pendant)

**Command Word**: `0x2311` MAN_BEG_OPERATION

| Parameter | Type | Description | Range |
|------|------|------|----------|
| robot | int | Select robot | [1, 4] |

```json
{
  "robot": 1
}
```

#### 1.5.8 Robot Emergency Stop

> Note: Original 2314 was servo power off, does not exist in the program

**Command Word**: `0x2314` MAN_END_OPERATION

| Parameter | Type | Description | Range |
|------|------|------|----------|
| robot | int | Select robot | [1, 4] |

```json
{
  "robot": 1
}
```

---

### 1.6 Clear Servo Error

#### 1.6.1 Teach Pendant Clears Servo Error

**Command Word**: `0x3201` FAULT_RESET

| Parameter | Type | Description | Range |
|------|------|------|----------|
| robot | int | Select robot | [1, 4] |

```json
{
  "robot": 1
}
```

#### 1.6.2 Return Clear Result After Clearing Servo Error

**Command Word**: `0x3202` FAULT_RESET_RESULT

| Parameter | Type | Description |
|------|------|------|
| robot | int | Select robot |
| clearErrflag | bool | true: Servo error cleared successfully, false: Clear failed |

```json
{
  "robot": 1,
  "clearErrflag": true
}
```

---

## 2. System Status

### 2.1 Controller Initialization Completion

#### Query Completion

**Command Word**: `0x4305` CONTROLLER_INIT_FINISH_INQUIRE

**Request Parameters**: None

```json
{}
```

#### Controller Response

**Command Word**: `0x4306` CONTROLLER_INIT_FINISH_RESPOND

| Parameter | Type | Description |
|------|------|------|
| finishinit | bool | true: completed, false: not completed |

```json
{
  "finishinit": true
}
```

---

### 2.2 Controller IP Settings

#### Set Controller IP

**Command Word**: `0x4301` CONTROLLER_IP_SET

| Parameter | Type | Description |
|------|------|------|
| name | string | Network interface name |
| address | string | IP address |
| gateway | string | Gateway |
| dns | string | DNS server |

```json
{
  "name": "p1p1",
  "address": "192.168.1.13",
  "gateway": "192.168.1.1",
  "dns": "114.114.114.114"
}
```

#### Query Controller IP

**Command Word**: `0x4302` CONTROLLER_IP_INQUIRE

**Request Parameters**: None

#### Controller Response

**Command Word**: `0x4303` CONTROLLER_IP_RESPOND

| Parameter | Type | Description |
|------|------|------|
| num | int | Number of network interfaces |
| network | array | Network interface information array |

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

### 2.3 Controller License

#### Get Controller ID

**Command Word**: `0x5052` IDENTIFY_NUMBER_INQUIRE

#### Controller Response

**Command Word**: `0x5053` IDENTIFY_NUMBER_RESPOND

| Parameter | Type | Description |
|------|------|------|
| controllerID | string | Controller ID |

```json
{
  "controllerID": "4DC9F0249098C82E"
}
```

#### Get Controller Remaining Usage Days

**Command Word**: `0x5055` USE_REST_DAYS_INQUIRE

#### Controller Response

**Command Word**: `0x5056` USE_REST_DAYS_RESPOND

| Parameter | Type | Description |
|------|------|------|
| restdays | int | Remaining days, -1: unlimited usage, 0: usage period expired |
| year | int | Expiration year |
| mon | int | Expiration month |
| day | int | Expiration day |

```json
{
  "restdays": 30,
  "year": 1,
  "mon": 1,
  "day": 1
}
```

#### Update Serial Number

**Command Word**: `0x5057` LICENSE_SERIAL_SET

| Parameter | Type | Description |
|------|------|------|
| license | string | Controller serial number |

```json
{
  "license": "ACOCWKBZHSKBEJHI"
}
```

#### Controller Response

**Command Word**: `0x5059` LICENSE_SERIAL_RESPOND

| Parameter | Type | Description |
|------|------|------|
| result | string | Key updated successfully, controller will restart |
| ivalid | string | Invalid key |
| error | string | Tampering detected, unlocking refused |

```json
{
  "result": "success",
  "ivalid": "Invalid key!",
  "error": "Tampering detected, unlocking refused!"
}
```

#### Query Image Version

**Command Word**: `0x505A` IMAGE_VERSION_INQUIRE (not available on teach pendant)

#### Return Query Result

**Command Word**: `0x505B` IMAGE_VERSION_RESPOND

| Parameter | Type | Description |
|------|------|------|
| result | bool | Whether query is successful |
| version | int | Version number (returned when query is successful) |

```json
{
  "result": true,
  "version": xx
}
```

#### Controller Send (Unauthorized Usage Notice)

**Command Word**: `0x505C` DISABLE_CONTROLLER

| Parameter | Type | Description |
|------|------|------|
| reason | string | Controller unauthorized usage notice message |

```json
{
  "reason": ""
}
```

#### Controller Send (Remaining Days Reminder)

**Command Word**: `0x505F` REST_DAYS_REMIND

| Parameter | Type | Description |
|------|------|------|
| restDays | int | Controller sends remaining usage days |

```json
{
  "restDays": 0
}
```

---

### 2.4 Version Number Acquisition

When the teach pendant needs to obtain the current controller version number, send the following command:

**Command Word**: `0x3402` VERSIONNUM_INQUIRE

#### When Controller Receives Query Command, Sends the Following Command

**Command Word**: `0x3403` VERSIONNUM_RESPOND

| Parameter | Type | Description |
|------|------|------|
| configFileVersionMismatch | bool | Whether configuration file matches, false: mismatched; true: matched |
| jobFileVersion | string | Job file version |
| rtlVersion | string | Controller version |
| sysClock | string | System clock, format: YYYY.MM.DD HH:MM:SS |
| version | string | Version number content |
| servoVersion | string | Servo version (Jiutong controller returns empty string) |
| ocmVersion | string | Static library version (Jiutong controller returns empty string) |
| ioVersion | string | IO version number (Jiutong controller returns empty string) |
| nodka_c1201 | object | C1201 controller specific node |

**nodka_c1201 Node Parameter Description**:

| Parameter | Type | Description |
|------|------|------|
| deviceId | string | Device ID |
| hw_version | string | Hardware version number |
| fw_version | string | Firmware version number |
| drv_version | string | Driver version number |

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

### 2.5 Version Verification

#### Query Whether Teach Pendant Program of Current Version Exists

**Command Word**: `0x3404` EXIST_TEACHBOX_EQUAL_QTTP_INQUIRE

| Parameter | Type | Description |
|------|------|------|
| MD5 | string | MD5 value of teach pendant program |

```json
{
  "MD5": "xx"
}
```

#### Return Query Result

**Command Word**: `0x3405` EXIST_TEACHBOX_EQUAL_QTTP_RESPOND`

If not found, the current version program needs to be uploaded.

| Parameter | Type | Description |
|------|------|------|
| backuppath | string | Teach pendant program path |

```json
{
  "backuppath": "xx"
}
```

#### Query Whether Teach Pendant Program Matching Controller Version Exists

**Command Word**: `0x3406` EXIST_CONTROLLER_MATCHED_QTTP_INQUIRE

**Request Parameters**: None

#### Return Query Result

**Command Word**: `0x3407` EXIST_CONTROLLER_MATCHED_QTTP_RESPOND

If the result is yes, a popup will appear for the user to choose whether to auto-upgrade.

| Parameter | Type | Description |
|------|------|------|
| backuppath | string | Teach pendant program path |

```json
{
  "backuppath": "xx"
}
```

---

### 2.6 Reboot Controller

When rebooting the controller, the teach pendant sends:

**Command Word**: `0x5061` REBOOT_CONTROLLER

**Request Parameters**: None

---

### 2.7 Factory Reset

When performing factory reset, the teach pendant sends:

**Command Word**: `0x5064` RETURN_FACTORY_SET

| Parameter | Type | Description |
|------|------|------|
| clearConfigFile | bool | Clear all system configuration files |
| clearExtendedFile | bool | Clear all extended files |

```json
{
  "clearConfigFile": true,
  "clearExtendedFile": true
}
```

---

### 2.8 System Auto Backup

#### Backup System

Teach pendant sends:

**Command Word**: `0x5065` CONTROLLER_BACKUP_INQUIRE

**Request Parameters**: None

#### Controller Response

**Command Word**: `0x5066` CONTROLLER_BACKUP_RESPOND

| Parameter | Type | Description |
|------|------|------|
| backUpNum | int | Backup count |
| backUpName | array | Backup system names, up to ten |

```json
{
  "backUpNum": 1,
  "backUpName": ["string", "string", "string"]
}
```

#### Restore System

Teach pendant sends:

**Command Word**: `0x5067` CONTROLLER_BACKUP_RESTORE

| Parameter | Type | Description |
|------|------|------|
| backUpOneName | string | System name to restore |

```json
{
  "backUpOneName": "string"
}
```

#### Controller Response

**Command Word**: `0x5068` CONTROLLER_BACKUP_RESTORE_RESPOND

| Parameter | Type | Description |
|------|------|------|
| success | bool | true: system restore successful, false: system restore failed |

```json
{
  "success": true
}
```

---

### 2.9 Servo Parameters

#### Set Servo Internal Parameters via Controller

**Command Word**: `0x5071` SERVO_INSIDE_PARM_SET

| Parameter | Type | Description |
|------|------|------|
| robot | int | Robot number |
| servoNum | int | Servo number |
| ParameterName | object | Servo parameter name |

```json
{
  "robot": 1,
  "servoNum": 1,
  "ParameterName": {
    "value": "",
    "unit": "",
    "upLimit": "",
    "lowLimit": ""
  }
}
```

#### Teach Pendant Query

**Command Word**: `0x5072` SERVO_INSIDE_PARM_INQUIRE

| Parameter | Type | Description |
|------|------|------|
| robot | int | Robot number |
| servoNum | int | Servo number |

```json
{
  "robot": 1,
  "servoNum": 1
}
```

#### Controller Return

**Command Word**: `0x5073` SERVO_INSIDE_PARM_RESPOND

| Parameter | Type | Description |
|------|------|------|
| robot | int | Robot number |
| servoNum | int | Servo number |
| sendNum | int | Send index |
| totalNum | int | Total count |
| servo | array | Specific servo parameter array |

```json
{
  "robot": 1,
  "servoNum": 1,
  "sendNum": 1,
  "totalNum": 1,
  "servo": [
    {
      "name": "Motor Rated Power",
      "value": 3000
    },
    {
      "name": "Motor Rated Speed",
      "value": 4000
    }
  ]
}
```

---

### 2.10 File Transfer

#### Request to Upload a File

**Command Word**: `0x5501` REQUEST_UPLOAD_FILE

| Parameter | Type | Description |
|------|------|------|
| name | string | File name |
| size | int | File size |

```json
{
  "name": "vxWorks",
  "size": 4096
}
```

#### Accept Upload Request / Reject Upload Request

**Command Word**: `0x5502` REQUEST_UPLOAD_RESPOND

| Parameter | Type | Description |
|------|------|------|
| answer | string | "yes": accept upload, "busy": controller busy |

```json
{
  "answer": "yes"
}
```

#### Request to Download a File

**Command Word**: `0x5504` REQUEST_DOWNLOAD_FILE

| Parameter | Type | Description |
|------|------|------|
| name | string | File name |

```json
{
  "name": "log.0"
}
```

#### Accept Download Request / Reject Download Request

**Command Word**: `0x5505` REQUEST_DOWNLOAD_RESPOND

| Parameter | Type | Description |
|------|------|------|
| answer | string | "yes": accept download, "busy": controller busy, "nofile": no such file |
| name | string | Job file full path |
| size | int | If rejected, size is invalid |

```json
{
  "answer": "yes",
  "name": "log.0",
  "size": 4096
}
```

---

### 2.11 File Transfer Network Exception Interruption (Teach Pendant Only)

**Command Word**: `0x5525` DownLoadInterrupt

**Request Parameters**: None

```json
{}
```

---

### 2.12 Teach Pendant Queries Controller Configuration File Directory

**Command Word**: `0x5507` CONFIG_FILE_INQUIRY

| Parameter | Type | Description |
|------|------|------|
| isExport | bool | true: export configuration, false: import configuration |

```json
{
  "isExport": true
}
```

---

### 2.13 Controller Sends Configuration File Directory to Teach Pendant

**Command Word**: `0x5508` CONFIG_FILE_RESPOND

| Parameter | Type | Description |
|------|------|------|
| filenum | int | Configuration file count |
| filelist | array | Configuration file name list |

```json
{
  "filenum": 2,
  "filelist": ["xxx.json", "yyy.json"]
}
```

---

### 2.14 Send File Binary Data

**Command Word**: `0x5511` UploadFileData (notifies controller that file sending is complete)

**Command Word**: `0x5512` UploadFileDone (sends file to controller in a loop)

#### Controller Response

**Command Word**: `0x5513` ReceiveUploadFinish

| Parameter | Type | Description |
|------|------|------|
| finish | bool | true means upload successful, false means failed |

```json
{
  "finish": true
}
```

---

### 2.15 Teach Pendant Requests Log File List

**Command Word**: `0x5542` LOGFILE_LIST_INQUIRE

| Parameter | Type | Description |
|------|------|------|
| num | int | Number of recent files to retrieve, options: 5, 30, 100 |

```json
{
  "num": 5
}
```

#### Controller Returns Log File List

**Command Word**: `0x5543` LOGFILE_LIST_RESPOND

| Parameter | Type | Description |
|------|------|------|
| absolutepath | string | Log directory |
| logfilenum | int | Note: this number may not equal the num above |
| logfilelist | array | Log file list |

```json
{
  "absolutepath": "log/",
  "logfilenum": 3,
  "logfilelist": ["logInfo.0", "logInfo.1", "logInfo.2"]
}
```

---

### 2.16 ENI File List Query

**Command Word**: `0x5545` ENIFILE_LIST_INQUIRE

| Parameter | Type | Description |
|------|------|------|
| num | int | Number of recent files to retrieve, options: 5, 30, 100 |

```json
{
  "num": 5
}
```

#### Controller Returns ENI File List

**Command Word**: `0x5546` ENIFILE_LIST_RESPOND

| Parameter | Type | Description |
|------|------|------|
| absolutepath | string | File directory |
| ENIfilenum | int | Note: this number may not equal the num above |

```json
{
  "absolutepath": "log/",
  "ENIfilenum": 3
}
```

---

### 2.17 Teach Pendant Sends Reception Complete Notification

**Command Word**: `0x5544` DownLoadControlLogFileFinish

---

### 2.18 Teach Pendant Requests Job File List

**Command Word**: `0x5532` JOBFILE_LIST_INQUIRE

#### Controller Returns Job File Directory and Count

**Command Word**: `0x5533` JOBFILE_SUM_RESPOND

| Parameter | Type | Description |
|------|------|------|
| absolutepath | array | Job file paths |
| jobfilenum | array | Job file count under each path |

```json
{
  "absolutepath": ["/job/R1/", "/job/R2/", "/job/R3/", "/job/R4/"],
  "jobfilenum": [2, 33, 233, 666]
}
```

#### Controller Returns Job File List

**Command Word**: `0x5534` JOBFILE_LIST_RESPOND

| Parameter | Type | Description |
|------|------|------|
| robot | int | Robot number |
| listnum | int | Up to 10 |
| jobfilelist | array | Job file list |

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

#### Reception Complete Sent to Teach Pendant

**Command Word**: `0x5535` JOBFILE_LIST_FINISH

**Request Parameters**: None. Sent to teach pendant after all four robots have finished sending.

---

### 2.19 Teach Pendant Queries Lua Script List

**Command Word**: `0x5552` LUASCRIPT_LIST_INQUIRE

**Request Parameters**: None

#### Controller Returns Lua Script List

**Command Word**: `0x5553` LUASCRIPT_LIST_RESPOND

| Parameter | Type | Description |
|------|------|------|
| absolutepath | string | Lua script directory |
| sum | int | Total list count |
| scriptlist | array | Script list |

```json
{
  "absolutepath": "lua/",
  "sum": 3,
  "scriptlist": ["ww.lua", "ee.lua"]
}
```

---

### 2.20 Message Notifications

#### Error Notification

**Command Word**: `0x2B03` ERROR_CODE

#### Warning Notification

**Command Word**: `0x2B04` WARNING_CODE

#### Info Bar Notification

**Command Word**: `0x2B05` INFO_CODE

| Parameter | Type | Description |
|------|------|------|
| data | string | Info bar content |
| type | int | Message code |

```json
{
  "data": "Example",
  "type": 1234
}
```

#### Popup Notification

**Command Word**: `0x2B06` POPUP_CODE

| Parameter | Type | Description |
|------|------|------|
| count | int | Number of popup buttons, up to 3 |
| text1 | string | Main text displayed in center of popup |
| text2 | string | Button 1 text |
| text3 | string | Button 2 text |
| text4 | string | Button 3 text |
| kind | int | Popup notification type, 1 for message, 2 for warning, 3 for error |
| node | string | Robot number 1-4 |
| Tips | bool | true when popup is shown |

```json
{
  "count": 1,
  "text1": "Example",
  "text2": "Example",
  "text3": "Example",
  "text4": "Example",
  "kind": 1,
  "node": "1",
  "Tips": true
}
```

#### Popup Interaction Feedback

Settings are made based on user interaction with the popup:

**Command Word**: `0x2B07` GET_OPTION

| Parameter | Type | Description |
|------|------|------|
| node | string | Robot number 1-4 |
| option | int | 1-3, corresponding to popup options 1-3 |

```json
{
  "node": "1",
  "option": 1
}
```

---

### 2.21 Controller Time Query

#### Time Query

**Command Word**: `0x5742` CONTROLLER_TIME_INQUIRE

| Parameter | Type | Description |
|------|------|------|
| type | int | 1: get seconds from system start to now, 0: display time |
| format | int | 1: get Beijing time, 0: get timestamp |

```json
{
  "type": 0,
  "format": 0
}
```

#### Return Query Result

**Command Word**: `0x5743` CONTROLLER_TIME_RESPOND

| Parameter | Type | Description |
|------|------|------|
| tType | int | 1: get seconds from system start to now, 0: display time |
| format | int | 1: get Beijing time, 0: get timestamp |
| date | object | When format is 1, expressed in Greenwich Mean Time |
| year | int | Year in date |
| mon | int | Month in date |
| day | int | Day in date |
| hour | int | Hour in time |
| min | int | Minute in time |
| sec | int | Second in time |
| msec | int | Millisecond in time |
| timestamp | object | Records timestamp in seconds and nanoseconds |
| s | int | Seconds in timestamp |
| ns | int | Nanoseconds in timestamp |

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

## 3. Digital Input/Output

### 3.1 GPIO_DOUT_SET - Set Digital Output

**Command Code**: `0x3601`

Sent when the teach pendant sets DOUT.

| Parameter | Type | Required | Description |
|--------|------|------|------|
| port | int | Yes | Port number, starting from 1 |
| status | int | Yes | Port status: 0=low level, 1=high level |

```json
{
  "port": 1,
  "status": 1
}
```

---

### 3.2 GPIO_DOUT_INQUIRE - Query Digital Output Status

**Command Code**: `0x3602`

Sent when the teach pendant queries DOUT status.

**Request Parameters**: None

---

### 3.3 GPIO_DOUT_RESPOND - Query Digital Output Status Response

**Command Code**: `0x3603`

Returned by the controller after receiving the query request.

| Parameter | Type | Required | Description |
|--------|------|------|------|
| status | array | Yes | Status array of each output port |

**status Array Element Description**:

| Value | Description |
|----|------|
| 0 | Low level |
| 1 | High level |
| -1 | No such port |

```json
{
  "status": [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, -1, -1, -1, -1]
}
```

---

### 3.4 GPIO_DIN_INQUIRE - Query Digital Input Status

**Command Code**: `0x3605`

Sent when the teach pendant queries DIN status.

**Request Parameters**: None

---

### 3.5 GPIO_DIN_RESPOND - Query Digital Input Status Response

**Command Code**: `0x3606`

Returned by the controller after receiving the query request.

| Parameter | Type | Required | Description |
|--------|------|------|------|
| status | array | Yes | Status array of each input port |

**status Array Element Description**:

| Value | Description |
|----|------|
| 0 | Low level |
| 1 | High level |
| -1 | No such port |

```json
{
  "status": [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, -1, -1, -1, -1]
}
```

---

### 3.6 ANALOG_OUT_SET - Set Analog Output

**Command Code**: `0x3607`

Sent when the teach pendant sets AOUT.

| Parameter | Type | Required | Description |
|--------|------|------|------|
| port | int | Yes | Port number, starting from 1 |
| value | float | Yes | Port voltage value (e.g. 1.33 means 1.33V) |

```json
{
  "port": 1,
  "value": 1.33
}
```

---

### 3.7 ANALOG_OUT_INQUIRE - Query Analog Output Status

**Command Code**: `0x3608`

Sent when the teach pendant queries AOUT status.

**Request Parameters**: None

---

### 3.8 ANALOG_OUT_RESPOND - Query Analog Output Status Response

**Command Code**: `0x3609`

Returned by the controller after receiving the query request.

| Parameter | Type | Required | Description |
|--------|------|------|------|
| value | array | Yes | Value array of each analog output port |

**value Array Element Description**:

| Value | Description |
|----|------|
| 0 | Low level |
| 1 | High level |
| -1 | No such port |

```json
{
  "value": [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, -1, -1, -1, -1]
}
```

---

### 3.9 ANALOG_IN_INQUIRE - Query Analog Input Status

**Command Code**: `0x360A`

Sent when the teach pendant queries AIN status.

**Request Parameters**: None

---

### 3.10 ANALOG_IN_RESPOND - Query Analog Input Status Response

**Command Code**: `0x360B`

Returned by the controller after receiving the query request.

| Parameter | Type | Required | Description |
|--------|------|------|------|
| value | array | Yes | Value array of each analog input port |

**value Array Element Description**:

| Value | Description |
|----|------|
| 0 | Low level |
| 1 | High level |
| -1 | No such port |

```json
{
  "value": [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, -1, -1, -1, -1]
}
```

---

### 3.11 FORCE_DIN_SET - Set Force Digital Input

**Command Code**: `0x360C`

Sent when the teach pendant sets force digital input.

| Parameter | Type | Required | Description |
|--------|------|------|------|
| port | int | Yes | Port number |
| enable | bool | Yes | Whether to enable force input |
| status | int | Yes | Set port high/low level: 0=low level, 1=high level |

```json
{
  "port": 1,
  "enable": true,
  "status": 0
}
```

---

### 3.12 FORCE_DIN_INQUIRE - Query Force Digital Input Status

**Command Code**: `0x360D`

Sent when the teach pendant queries force input status.

**Request Parameters**: None

---

### 3.13 FORCE_DIN_RESPOND - Query Force Digital Input Status Response

**Command Code**: `0x360E`

Returned by the controller after receiving the query request.

| Parameter | Type | Required | Description |
|--------|------|------|------|
| port | int | Yes | Port number |
| enable | bool | Yes | Whether force input is enabled |
| status | int | Yes | Set port high/low level: 0=low level, 1=high level |

```json
{
  "port": 1,
  "enable": true,
  "status": 0
}
```

---

### 3.14 FORCE_ANALOG_IN_SET - Set Force Analog Input

**Command Code**: `0x3611`

Sent when the teach pendant sets force analog input.

| Parameter | Type | Required | Description |
|--------|------|------|------|
| port | int | Yes | Port number |
| enable | bool | Yes | Whether to enable force input |
| status | int | Yes | Set port analog value |

```json
{
  "port": 1,
  "enable": true,
  "status": 0
}
```

---

### 3.15 FORCE_ANALOG_IN_INQUIRE - Query Force Analog Input Status

**Command Code**: `0x3612`

Sent when the teach pendant queries force analog input status.

**Request Parameters**: None

---

### 3.16 FORCE_ANALOG_IN_RESPOND - Query Force Analog Input Status Response

**Command Code**: `0x3613`

Returned by the controller after receiving the query request.

| Parameter | Type | Required | Description |
|--------|------|------|------|
| port | int | Yes | Port number |
| enable | bool | Yes | Whether force input is enabled |
| status | int | Yes | Set port analog value |

```json
{
  "port": 1,
  "enable": true,
  "status": 0
}
```

---

## 4. Remote IO Control

### 4.1 IO Function Interface Settings

#### 4.1.1 IO Function Interface Settings (Teach Pendant Send)

**Command Code**: `0x2F01` IO_CONTROL_SET

| Parameter | Type | Required | Description |
|--------|------|------|------|
| inPort | object | Yes | Remote IO function port binding |
| inValue | object | Yes | Port value, IO parameter, 0: active low, 1: active high |
| program | array | Yes | Remote IO program DIN and value binding, 10 in total |
| robot | int | Yes | Robot number |

**inPort Object Parameters**:

| Parameter | Type | Description |
|--------|------|------|
| start | int | Start, bound port |
| stop | int | Stop, bound port |
| pause | int | Pause, bound port |
| faultReset | int | Clear alarm, bound port |
| clearoutagekeep | int | Clear power outage keep data, bound port |

**inValue Object Parameters**:

| Parameter | Type | Description |
|--------|------|------|
| start | int | Start |
| stop | int | Stop |
| pause | int | Pause |
| faultReset | int | Clear alarm |
| clearoutagekeep | int | Clear power outage keep data |

**program Array Parameters**:

| Parameter | Type | Description |
|--------|------|------|
| port | int | Port number |
| value | int | Port value, 0 or 1 |

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

#### 4.1.2 IO Function Interface Query (Teach Pendant Send)

**Command Code**: `0x2F02` IO_CONTROL_INQUIRE

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Robot number |

```json
{
  "robot": 1
}
```

---

#### 4.1.3 IO Function Interface Response (Controller Return)

**Command Code**: `0x2F03` IO_CONTROL_RESPOND

**Parameter Description**: Same as 4.1.1 IO Function Interface Settings

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

### 4.2 Reset Point Settings

#### 4.2.1 Reset Point Position Parameter Settings (Teach Pendant Send)

**Command Code**: `0x2F04` IO_CONTROL_RESETPOS_SET

| Parameter | Type | Required | Description |
|--------|------|------|------|
| pos | array | Yes | Robot position (7 elements) |
| posSync | array | Yes | External axis position (5 elements) |
| robot | int | Yes | Robot number |

```json
{
  "pos": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  "posSync": [0.0, 0.0, 0.0, 0.0, 0.0],
  "robot": 1
}
```

---

#### 4.2.2 Reset Point IO Parameter Settings (Teach Pendant Send)

**Command Code**: `0x2F14` IO_CONTROL_RESETPORT_SET

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Robot number |
| selectPiontOrFile | int | Yes | 0: reset point, 1: reset program |
| inPort | int | Yes | Reset start, IO trigger port |
| inValue | int | Yes | Reset start, IO parameter |
| outPort | int | Yes | Reset end, IO output port |
| safeEnable | bool | Yes | Safety enable |
| returnway | int | Yes | 0: joint interpolation, 1: linear interpolation |

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

#### 4.2.3 Safety Point Deviation Parameter Settings

**Command Code**: `0x2F15` IO_CONTROL_RESETSAFEDEV_SET

| Parameter | Type | Required | Description |
|--------|------|------|------|
| deviation | array | Yes | Robot position deviation (7 elements) |
| deviationSync | array | Yes | External axis deviation (5 elements) |
| robot | int | Yes | Robot number |

```json
{
  "deviation": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 1.0],
  "deviationSync": [1.0, 1.0, 1.0, 1.0, 1.0],
  "robot": 1
}
```

---

#### 4.2.4 Safety Point Position Notification

**Command Code**: `0x2F16` IO_CONTROL_NOTIS_SAFEPOS

**Description**: When running a job file with safety enable activated, the controller sends this if not at the safety point.

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Current robot |
| isSync | bool | Yes | false: robot not in safety zone, true: external axis not in safety zone |
| currentPos | array | Yes | Current position |
| safePos | array | Yes | Reset point position |

```json
{
  "robot": 1,
  "isSync": false,
  "currentPos": [0, 0.1, 2, 3.3, 44, 555.55, 6, 7.7, 88],
  "safePos": [0, 0.1, 2, 3.3, 88, 555.55, 6, 7.7, 88]
}
```

---

#### 4.2.5 Return to Reset

**Command Code**: `0x2F17` RECOVERY_SITE

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Robot number |

```json
{
  "robot": 1
}
```

---

#### 4.2.6 Reset Point Settings Query (Teach Pendant Send)

**Command Code**: `0x2F05` IO_CONTROL_RESET_INQUIRE

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Robot number |

```json
{
  "robot": 1
}
```

---

#### 4.2.7 Reset Point Settings Response (Controller Return)

**Command Code**: `0x2F06` IO_CONTROL_RESET_RESPOND

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Robot number |
| selectPiontOrFile | int | Yes | 0: point selected, 1: program selected |
| returnWay | int | Yes | 0: movj selected, 1: movl selected |
| inPort | int | Yes | Reset start, IO trigger port |
| inValue | int | Yes | Reset start, IO parameter |
| outPort | int | Yes | Reset end, IO output port |
| safeEnable | bool | Yes | Safety enable |
| pos | array | Yes | Reset point coordinates |
| posSync | array | Yes | External axis reset point coordinates |
| deviation | array | Yes | Safety point range |
| deviationSync | array | Yes | External axis safety point range |

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

#### 4.2.8 Current Position Query (Teach Pendant Send)

**Command Code**: `0x2F07` IO_CONTROL_POS_INQUIRE

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Robot number |
| coord | int | Yes | Coordinate mode: -1-controller current coordinate, 0-joint coordinate, 1-Cartesian coordinate, 2-tool coordinate, 3-user coordinate |

```json
{
  "robot": 1,
  "coord": 0
}
```

---

#### 4.2.9 Current Position Response (Controller Return)

**Command Code**: `0x2F08` IO_CONTROL_POS_RESPOND

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Robot number |
| coord | int | Yes | Coordinate mode |
| pos | array | Yes | Radian position |
| posDeg | array | Yes | Degree position |
| configuration | int | Yes | Posture |

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

#### 4.2.10 Dual-Robot Position Query (MOVJDOUBLE Instruction)

**Command Code**: `0x2F10` IO_CONTROL_DOUBLE_POS_INQUIRE

**Description**: MOVJDOUBLE instruction requires querying both the first and second robot positions in dual-robot mode.

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot1 | int | Yes | Robot 1 |
| coord1 | int | Yes | Robot 1 coordinate: 1-Cartesian coordinate, 2-tool coordinate, 3-user coordinate |
| robot2 | int | Yes | Robot 2 |
| coord2 | int | Yes | Same as robot 1 |

```json
{
  "robot1": 1,
  "coord1": 1,
  "robot2": 2,
  "coord2": 1
}
```

---

#### 4.2.11 Dual-Robot Position Response

**Command Code**: `0x2F11` IO_CONTROL_DOUBLE_POS_RESPOND

| Parameter | Type | Required | Description |
|--------|------|------|------|
| pos1Deg | array | Yes | Robot 1 axes 1-7 current position (in degrees) |
| pos1 | array | Yes | Robot 1 axes 1-7 current position (in radians) |
| pos2Deg | array | Yes | Robot 2 axes 1-7 current position (in degrees) |
| pos2 | array | Yes | Robot 2 axes 1-7 current position (in radians) |

```json
{
  "pos1Deg": [0, 1.1, 2, 3.3, 4.4, 5.5, 6.6],
  "pos1": [0, 1.1, 2, 3.3, 4.4, 5.5, 6.6],
  "pos2Deg": [0, 1.1, 2, 3.3, 4.4, 5.5, 6.6],
  "pos2": [0, 1.1, 2, 3.3, 4.4, 5.5, 6.6]
}
```

---

#### 4.2.12 Open Job File

**Command Code**: `0x3114`

**Description**: The reset program is fixed as RobotResetProgram with suffix .ResetPro

| Parameter | Type | Required | Description |
|--------|------|------|------|
| jobName | string | Yes | Job file name (fixed: RobotResetProgram) |
| robot | int | Yes | Robot number |
| suffixname | string | Yes | Job file suffix (fixed: .ResetPro) |

```json
{
  "jobName": "RobotResetProgram",
  "robot": 1,
  "suffixname": ".ResetPro"
}
```

---

#### 4.2.13 Insert Instruction

**Command Code**: `0x3121`

---

#### 4.2.14 Save Job File

**Command Code**: `0x3120`

**Description**: The reset program is fixed as RobotResetProgram with suffix .ResetPro

| Parameter | Type | Required | Description |
|--------|------|------|------|
| jobname | string | Yes | Job file name (fixed: RobotResetProgram) |
| robot | int | Yes | Robot number |
| suffix | string | Yes | Job file suffix (fixed: .ResetPro) |

```json
{
  "jobname": "RobotResetProgram",
  "robot": 1,
  "suffix": ".ResetPro"
}
```

---

### 4.3 Status Notification Settings Interface

#### 4.3.1 Status Notification Settings (Teach Pendant Send)

**Command Code**: `0x2F09` IO_CONTROL_OUTPUT_SET

| Parameter | Type | Required | Description |
|--------|------|------|------|
| outPut | array | Yes | Output configuration array, each element corresponds to a robot |
| remoteOut | int | Yes | Remote mode |
| remoteOut_value | int | Yes | Remote mode value: 0, 1, 3 (blinking) |
| runOut | int | Yes | Run mode |
| runOut_value | int | Yes | Run mode value |
| startUp | int | Yes | Startup notification |
| startUp_value | int | Yes | Startup notification value |
| teachOut | int | Yes | Teach mode |
| teachOut_value | int | Yes | Teach mode value |

**outPut Array Element Parameters**:

| Parameter | Type | Description |
|--------|------|------|
| IOenable | int | Enable DOUT binding |
| IOenable_value | int | Value: 0, 1, 3 (blinking) |
| continuable | int | Continuable execution DOUT binding |
| continuable_value | int | Value: 0, 1, 3 (blinking) |
| fault | int | Error notification DOUT binding |
| faultIsFickler | int | Value: 0, 1, 3 (blinking) |
| mainJobFirstLine | int | Main program first line DOUT binding |
| mainJobFirstLine_value | int | Value |
| pause | int | Pause DOUT binding |
| pause_value | int | Value |
| quickStopOut1 | int | Emergency stop 1 DOUT binding |
| quickStopOut2 | int | Emergency stop 2 DOUT binding |
| quickStopOutValue1 | int | Value |
| quickStopOutValue2 | int | Value |
| running | int | Running DOUT binding |
| running_value | int | Value |
| stop | int | Stop DOUT binding |
| stop_value | int | Value |
| teachBoxStateOut | int | Teach pendant unplug DOUT binding |
| teachBoxStateOutValue | int | Value |

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

#### 4.3.2 Status Notification Query (Teach Pendant Send)

**Command Code**: `0x2F0A` IO_CONTROL_OUTPUT_INQUIRE

**Description**: data: none

---

#### 4.3.3 Status Notification Response (Controller Return)

**Command Code**: `0x2F0B` IO_CONTROL_OUTPUT_RESPOND

**Description**: data: same as 0x2F09

---

### 4.4 IO Reset Settings Interface

#### 4.4.1 IO Output Reset Settings (Teach Pendant Send)

**Command Code**: `0x2F0D` IO_CONTROL_IORESET_SET

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Robot number |
| type | int | Yes | 1-IO reset, 2-mode switch stop, 3-program error stop |
| enable | array | Yes | 16 elements, values 0 or 1, contains reset values and whether to reset |
| value | array | Yes | 16 elements, values 0 or 1, contains reset values and whether to reset |

```json
{
  "robot": 1,
  "type": 1,
  "enable": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "value": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}
```

---

#### 4.4.2 IO Output Reset Query (Teach Pendant Send)

**Command Code**: `0x2F0E` IO_CONTROL_IORESET_INQUIRE

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Robot number |
| type | int | Yes | Type |

```json
{
  "robot": 1,
  "type": 1
}
```

---

#### 4.4.3 IO Output Reset Response (Controller Return)

**Command Code**: `0x2F0F` IO_CONTROL_IORESET_RESPOND

**Description**: data: same as 0x2F0D

---

### 4.5 IO Function Status Interface

#### 4.5.1 IO Function Status Query (Teach Pendant Send)

**Command Code**: `0x2F12` IO_FUNCTION_INQUIRE

| Parameter | Type | Required | Description |
|--------|------|------|------|
| type | int | Yes | 1-digital input, 2-digital output, 3-analog input, 4-analog output |

```json
{
  "type": 1
}
```

---

#### 4.5.2 IO Function Status Response (Controller Return)

**Command Code**: `0x2F13` IO_FUNCTION_RESPOND

| Parameter | Type | Required | Description |
|--------|------|------|------|
| type | int | Yes | Type |
| IOFunction | array | Yes | 16 for digital, 8 for analog |

```json
{
  "type": 1,
  "IOFunction": [
    "Remote: Robot 1 Start Robot 1 Vision: Trigger Port",
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

### 4.6 Remote Mode Interface

#### 4.6.1 Reservation Execution Status Query (Teach Pendant Send)

**Command Code**: `0x2F1B` RESERVE_EXE_STATE_INQUIRE

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Robot number |

```json
{
  "robot": 1
}
```

---

#### 4.6.2 Reservation Execution Status Response (Controller Return)

**Command Code**: `0x2F1C` RESERVE_EXE_STATE_RESPOND

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Robot number |
| current | object | Yes | Current running status |
| queue | array | Yes | Queue (10 elements) |

**current Object Parameters**:

| Parameter | Type | Description |
|--------|------|------|
| station | int | Workstation (program number) |
| name | string | Program name |
| runtime | int | Current run completed count |
| times | int | Current run total count |
| count | int | Total run count |
| status | int | Run status: 0-no reservation, 1-reserving, 2-running, 3-reserved, 4-program paused |

**queue Array Element Parameters**:

| Parameter | Type | Description |
|--------|------|------|
| station | int | Workstation (program number) |
| name | string | Program name |
| times | int | Run count |
| count | int | Total run count |
| status | int | Status |

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

#### 4.6.3 Clear Total Run Count

**Command Code**: `0x2F1D` RESERVE_EXE_STATE_CLEAR

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Robot number |

```json
{
  "robot": 1
}
```

---

### 4.7 IO Model Settings

#### 4.7.1 IO Model Settings (Teach Pendant Send)

**Command Code**: `0x2F21` IO_TYPE_SET

**Description**: Takes effect after restart

| Parameter | Type | Required | Description |
|--------|------|------|------|
| simuNum | int | Yes | Virtual IO count |
| serialAnalog | object | Yes | Serial analog configuration |

**serialAnalog Object Parameters**:

| Parameter | Type | Description |
|--------|------|------|
| type | string | Options: SUPER_ANAIO, DAC_ANAIO |
| port | int | Port number |
| baudRate | int | Baud rate |

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

#### 4.7.2 IO Model Query (Teach Pendant Send)

**Command Code**: `0x2F22` IO_TYPE_INQUIRE

---

#### 4.7.3 IO Model Response (Controller Return)

**Command Code**: `0x2F23` IO_TYPE_RESPOND

| Parameter | Type | Required | Description |
|--------|------|------|------|
| num | int | Yes | IO board count |
| type | array | Yes | IO board type list |
| portNum | array | Yes | Port configuration |
| simuNum | int | Yes | Virtual IO count |
| serialAnalog | object | Yes | Serial analog configuration |

```json
{
  "num": 3,
  "type": ["IO Board R1", "Mengtong", "Virtual IO"],
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

### 4.8 Remote Status Notification

#### 4.8.1 Remote Status Notification Settings

**Command Code**: `0x2F24` IO_REMOTEOUTPUT_SET

| Parameter | Type | Required | Description |
|--------|------|------|------|
| outPut | array | Yes | Output configuration array |
| robot | int | Yes | Robot number |

**outPut Array Element Parameters**:

| Parameter | Type | Description |
|--------|------|------|
| outagerecover | int | Power outage keep data recovery DOUT1-2 port binding |
| outagerecover_value | int | DOUT1-2 port value: 0, 1, 2 (2 means blinking) |
| program1~program10 | int | Remote IO program DOUT port binding |
| program_value1~program_value10 | int | Remote IO program DOUT output port value: 0, 1, 2 (2 means blinking) |

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

#### 4.8.2 Remote Status Notification Query

**Command Code**: `0x2F25` IO_REMOTEOUTPUT_INQUIRE

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Robot number |

```json
{
  "robot": 1
}
```

---

#### 4.8.3 Remote Status Notification Response

**Command Code**: `0x2F26` IO_REMOTEOUTPUT_RESPOND

**Description**: Content same as 0x2F24

---

### 4.9 Safety Monitoring Settings

#### 4.9.1 Safety Monitoring Settings (Teach Pendant Send)

**Command Code**: `0x2F31` IO_SAFE_CHECK_SET

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Robot number |
| safeScreen | object | Yes | Safety light curtain configuration |
| quickStop | object | Yes | Quick stop configuration |

**safeScreen Object Parameters**:

| Parameter | Type | Description |
|--------|------|------|
| enable | bool | Enable safety light curtain |
| port1 | int | Safety light curtain 1 DIN number (1~16) |
| value1 | int | IO level parameter: 0-low level, 1-high level |
| port2 | int | Safety light curtain 2 DIN number (1~16) |

---

## 5. Global Variables

### 5.1 Current Position Mode

| Value | Mode | Description |
|---|---|---|
| -1 | Controller current coordinate | Controller current coordinate |
| 0 | Joint Coordinate (Joint) | Joint coordinate system |
| 1 | Cartesian Coordinate (Angle) | Cartesian coordinate system |
| 2 | Tool Coordinate (Tool) | Tool coordinate system |
| 3 | User Coordinate (User) | User coordinate system |

---

### 5.2 Get Global Position Variable Points

**Command**: `0x5602` GLOBAL_ALLPOSITION_INQUIRE

| Parameter | Type | Required | Description |
|---|---|---|---|
| robot | int | Yes | Robot number |

```json
{
  "robot": 1
}
```

**Controller Response**: `0x5603` GLOBAL_ALLPOSITION_RESPOUND

| Parameter | Type | Description |
|---|---|---|
| robot | int | Robot number |
| globalPosition | object | Global position list |
| note | object | Annotation list |

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

> **Note**: For 4-axis robots, the last two digits are padded with 0.

---

### 5.3 Set Global Position

**Command**: `0x5604` GLOBAL_POSITION_SET

| Parameter | Type | Required | Description |
|---|---|---|---|
| robot | int | Yes | Robot number |
| posName | string | Yes | Position name |
| pos | array | Yes | Position data (14 elements) |
| note | string | No | Annotation |

**pos Array Description** (14 elements total):

| Index | Description |
|---|---|
| 0 | Coordinate system: 0-joint, 1-Cartesian, 2-tool, 3-user |
| 1 | Unit: 0-radian, 1-degree |
| 2 | Posture: 0-none, 1-left hand, 2-right hand |
| 3 | Tool coordinate number |
| 4 | User coordinate number |
| 5-6 | Reserved |
| 7-13 | Position data: J1~J7 / xyzabc |

```json
{
  "robot": 1,
  "posName": "GP0001",
  "pos": [1, 0, 0, 0, 0, 0, 0, 459, 0, 796, 3.141, 0, 0, 0],
  "note": "data"
}
```

---

### 5.4 Query Global Position

**Command**: `0x5605` GLOBAL_POSITION_INQUIRE

| Parameter | Type | Required | Description |
|---|---|---|---|
| robot | int | Yes | Robot number |
| posName | string | Yes | Position name |

```json
{
  "robot": 1,
  "posName": "GP0001"
}
```

**Controller Response**: `0x5606` GLOBAL_POSITION_RESPOUND

| Parameter | Type | Description |
|---|---|---|
| note | string | Annotation |
| posName | string | Variable name |
| posValue | array | Radian position |
| posValueDeg | array | Degree position |
| robot | int | Robot number |

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

### 5.5 Set Global Numeric Variable

**Command**: `0x5607` GLOBAL_VARIANT_SET

| Parameter | Type | Required | Description |
|---|---|---|---|
| varName | string | Yes | Variable name |
| varType | int | Yes | Variable type: 0-int, 1-double, 2-bool, 3-string |
| varValue | double | No | Variable value (for numeric types) |
| varString | string | No | Variable value (for string type) |
| varNote | string | No | Annotation |

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

### 5.6 Get Global Numeric Variable List

**Command**: `0x5608` GLOBAL_VARIANT_INQUIRE

| Parameter | Type | Required | Description |
|---|---|---|---|
| varType | int | Yes | Variable type: 1-bool, 2-int, 3-double |

```json
{
  "varType": 1
}
```

**Controller Response**: `0x5609` GLOBAL_VARIANT_RESPOND

| Parameter | Type | Description |
|---|---|---|
| varType | int | Variable type |
| varNum | int | Numeric variable count (0-100) |
| varList | array | Numeric variable list |

**varList Array Elements**:

| Parameter | Type | Description |
|---|---|---|
| varName | string | Variable name |
| varValue | mixed | Variable value |
| varNote | string | Annotation |

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

### 5.7 Request Global Numeric Annotation

**Command**: `0x5610` GLOBAL_ALLVARIANT_NOTE_INQUIRE

| Parameter | Type | Required | Description |
|---|---|---|---|
| varType | int | Yes | Variable type: 1-bool, 2-int, 3-double, 4-string |

```json
{
  "varType": 1
}
```

**Controller Response**: `0x5611` GLOBAL_ALLVARIANT_NOTE_RESPOND

| Parameter | Type | Description |
|---|---|---|
| varNote | object | Annotation list |
| varType | int | Variable type |

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

### 5.8 Query Single Global Variable

**Command**: `0x560B` GLOBAL_VARIANT_INQUIRE

| Parameter | Type | Required | Description |
|---|---|---|---|
| varType | int | Yes | Variable type: 0-int, 1-double, 2-bool, 3-string |
| varName | string | Yes | Variable name |
| identity | string | No | Source identifier |

**identity Value Description**:

| Value | Description |
|---|---|
| VariableReview | Global variable from monitoring interface |
| NumerlcalVarWidget | Global numeric variable interface |

```json
{
  "varType": 1,
  "varName": "GI001",
  "identity": "VariableReview"
}
```

**Controller Response**: `0x560C` GLOBAL_VARIANT_RESPOUND

| Parameter | Type | Description |
|---|---|---|
| varType | int | Variable type |
| varName | string | Variable name |
| varValue | mixed | Variable value |
| varString | string | String value (for string type) |
| identity | string | Source identifier |
| varNote | string | Annotation |

```json
{
  "varType": 1,
  "varName": "GI001",
  "varValue": 666,
  "varString": "i'm a string",
  "identity": "VariableReview",
  "varNote": "Parachute simulator"
}
```

---

### 5.9 Local Variable Position P Point Query

**Command**: `0x5612` LOCAL_POS_P_VAR_INQUIRE

| Parameter | Type | Required | Description |
|---|---|---|---|
| robot | int | Yes | Robot number |
| varname | string | Yes | Position name |
| initialValue | bool | Yes | Whether it is an initial value |

```json
{
  "robot": 1,
  "varname": "P0001",
  "initialValue": true
}
```

**Controller Response**: `0x5613` LOCAL_POS_P_VAR_RESPOND

| Parameter | Type | Description |
|---|---|---|
| robot | int | Robot number |
| jobname | string | Job file name |
| varname | string | Position name |
| initialValue | bool | Whether it is an initial value |
| pos | array | Position (radian) |
| posDeg | array | Position (degree) |

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

### 5.10 Local Variable Position E Point Query

**Command**: `0x5615` LOCAL_POS_E_VAR_INQUIRE

| Parameter | Type | Required | Description |
|---|---|---|---|
| robot | int | Yes | Robot number |
| varname | string | Yes | Position name |
| initialValue | bool | Yes | Whether it is an initial value |

```json
{
  "robot": 1,
  "varname": "E0001",
  "initialValue": true
}
```

**Controller Response**: `0x5616` LOCAL_POS_E_VAR_RESPOND

| Parameter | Type | Description |
|---|---|---|
| robot | int | Robot number |
| jobname | string | Job file name |
| varname | string | Position name |
| initialValue | bool | Whether it is an initial value |
| pos | array | Position (radian, 11 elements) |
| posDeg | array | Position (degree, 11 elements) |

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

### 5.11 Local Variable Numeric Variable Query

**Command**: `0x5618` LOCAL_VALUE_VAR_INQUIRE

| Parameter | Type | Required | Description |
|---|---|---|---|
| robot | int | Yes | Robot number |
| vartype | int | Yes | Variable type: 0-int, 1-double, 2-bool, 3-string |
| varname | string | Yes | Variable name |
| initialValue | bool | Yes | Whether it is an initial value |
| identify | string | No | Source identifier |

**identify Value Description**:

| Value | Description |
|---|---|
| CommandInsert | Insert instruction interface variable |
| VariableReview | Monitoring interface numeric variable |

```json
{
  "robot": 1,
  "vartype": 1,
  "varname": "I001",
  "initialValue": true,
  "identify": "CommandInsert"
}
```

**Controller Response**: `0x5619` LOCAL_VALUE_VAR_RESPOND

| Parameter | Type | Description |
|---|---|---|
| robot | int | Robot number |
| jobname | string | Job file name |
| vartype | int | Variable type: 1-bool, 2-int, 3-double |
| varname | string | Variable name |
| value | mixed | Variable value (numeric type) |
| string | string | Variable value (string type) |
| identify | string | Source identifier |

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

### 5.12 Global External Axis Variables

> **Note**: Global external axis variable structure: Position info (7) + Robot position (7) + External axis position (5) + Reserved (2) = 21 elements

#### 5.12.1 Set Global External Axis Variable

**Command**: `0x561a` GLOBAL_EXTPOS_VAR_SET

| Parameter | Type | Required | Description |
|---|---|---|---|
| robot | int | Yes | Robot number |
| varname | string | Yes | Position name |
| pos | array | Yes | Position data (21 elements) |
| note | string | No | Remark |

**pos Array Description**:

| Index Range | Description |
|---|---|
| 0-6 | Position info |
| 7-13 | Robot position |
| 14-18 | Sync external axis position |
| 19-20 | Reserved |

```json
{
  "robot": 1,
  "varname": "GE001",
  "pos": [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 2.0, 2.1, 2.2, 2.3, 2.4, 0, 0],
  "note": "qqq"
}
```

#### 5.12.2 Query Global External Axis Variable

**Command**: `0x561b` GLOBAL_EXTPOS_VAR_INQUIRE

| Parameter | Type | Required | Description |
|---|---|---|---|
| robot | int | Yes | Robot number |
| varname | string | Yes | Position name |
| initialValue | bool | Yes | Whether it is an initial value |

```json
{
  "robot": 1,
  "varname": "GE0001",
  "initialValue": true
}
```

**Controller Response**: `0x561c` GLOBAL_EXTPOS_VAR_RESPOND

| Parameter | Type | Description |
|---|---|---|
| note | string | Annotation |
| varname | string | Variable name |
| initialValue | bool | Whether it is an initial value |
| posValue | array | GP + external point (radian) |
| posValueDeg | array | GP + external point (degree) |

```json
{
  "note": "",
  "varname": "GE001",
  "initialValue": true,
  "posValue": [0.0, 0.0, 0.0, 0.0],
  "posValueDeg": [0.0, 0.0, 0.0, 0.0]
}
```

#### 5.12.3 Get All Global External Axis Points

**Command**: `0x561d` GLOBAL_ALLEXTPOS_VAR_INQUIRE

| Parameter | Type | Required | Description |
|---|---|---|---|
| robot | int | Yes | Robot number |

```json
{
  "robot": 1
}
```

**Controller Response**: `0x561e` GLOBAL_ALLEXTPOS_VAR_RESPOND

| Parameter | Type | Description |
|---|---|---|
| robot | int | Robot number |
| globalExtPosition | object | Position list |
| note | object | Annotation list |

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

### 5.13 Robot Position Coordinate System Conversion

**Command**: `0x2A12` POS_TRANS_COORD

| Parameter | Type | Required | Description |
|---|---|---|---|
| robot | int | Yes | Robot number |
| name | string | Yes | Position name |
| pos | array | Yes | Position data (21 elements) |
| targetCoord | int | Yes | Target coordinate system: 0-joint, 1-Cartesian, 2-tool, 3-user |

```json
{
  "robot": 1,
  "name": "P001",
  "pos": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "targetCoord": 1
}
```

**Controller Response**: `0x2A13` POS_TRANS_COORD_RESPOND

| Parameter | Type | Description |
|---|---|---|
| name | string | Position name |
| pos | array | Position info (universal 21-element data, radian) |
| posDeg | array | Position info (universal 21-element data, degree) |
| robot | int | Robot number |

```json
{
  "name": "P001",
  "pos": [1, 1, 0, 0, 0, 0, 0, 459.62120, -0.1010, 796.79160, 3.141592653590, 0.0, 0.0, 0.0],
  "posDeg": [1, 1, 0, 0, 0, 0, 0, 459.62120, -0.1010, 796.79160, 180.0, 0.0, 0.0, 0.0],
  "robot": 1
}
```
