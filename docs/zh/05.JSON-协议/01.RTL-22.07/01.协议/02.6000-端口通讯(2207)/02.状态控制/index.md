# 2.状态控制

本文档包含以下内容：

- [伺服状态](#1-伺服状态)
- [系统状态](#2-系统状态)
- [数字输入输出](#3-数字输入输出)
- [远程 IO 控制](#4-远程io 控制)
- [全局变量](#5-全局变量)

---

## 1. 伺服状态

### 1.1 伺服连接状态

#### 1.1.1 查询伺服连接状态

| 项目 | 值 |
|------|-----|
| 命令字 | `0x5042` SERVO_CONNECT_INQUIRE |

**请求参数**：无

```json
{}
```

#### 1.1.2 收到查询连接状态时，返回

| 项目 | 值 |
|------|-----|
| 命令字 | `0x5043` SERVO_CONNECT_RESPOND |

| 参数 | 类型 | 说明 |
|------|------|------|
| servoType | int | 伺服类型 |

```json
{
  "servoType": 0
}
```

---

### 1.2 伺服状态设置及获取

#### 1.2.1 上位机改变伺服的状态

**命令字**：`0x2001` SERVO_STATUS_SET

| 参数 | 类型 | 说明 | 取值范围 |
|------|------|------|----------|
| robot | int | 选择机器人 | [1, 4] |
| status | int | 伺服状态 | 0: 真实伺服, 1: 虚拟伺服, 2: 无伺服 |

```json
{
  "robot": 1,
  "status": 0
}
```

#### 1.2.2 上位机查询伺服状态

**命令字**：`0x2002` SERVO_STATUS_INQUIRE

| 参数 | 类型 | 说明 | 取值范围 |
|------|------|------|----------|
| robot | int | 选择机器人 | [1, 4] |

```json
{
  "robot": 1
}
```

#### 1.2.3 控制器回复伺服状态

**命令字**：`0x2003` SERVO_STATUS_RESPOND

| 参数 | 类型 | 说明 | 取值范围 |
|------|------|------|----------|
| robot | int | 选择机器人 | [1, 4] |
| mode | int | 运行模式 | 0: 单机模式, 1: 多机模式 |
| status | int | 伺服状态 | 0: 停止, 1: 就绪, 2: 错误, 3: 运行 |

```json
{
  "mode": 0,
  "robot": 1,
  "status": 0
}
```

---

### 1.3 操作模式状态设置及获取

**操作模式说明**：

| 模式值 | 名称 | 说明 |
|--------|------|------|
| 0 | 示教模式 (Teach) | - |
| 1 | 远程模式 (Circle) | - |
| 2 | 运行模式 (Repeat) | - |

#### 1.3.1 上位机设置当前控制器操作模式

**命令字**：`0x2101` OPERATION_MODE_SET

| 参数 | 类型 | 说明 | 取值范围 |
|------|------|------|----------|
| mode | int | 操作模式 | 0: 示教模式, 1: 远程模式, 2: 运行模式 |

```json
{
  "mode": 0
}
```

#### 1.3.2 上位机查询操作模式

**命令字**：`0x2102` OPERATION_MODE_INQUIRE

**请求参数**：无

```json
{}
```

#### 1.3.3 控制器回复操作模式

**命令字**：`0x2103` OPERATION_MODE_RESPOND

| 参数 | 类型 | 说明 |
|------|------|------|
| mode | int | 操作模式 |

```json
{
  "mode": 0
}
```

#### 1.3.4 上位机改变示教的操作模式

**命令字**：`0x2104` TEACHTYPE_SET

| 参数 | 类型 | 说明 | 取值范围 |
|------|------|------|----------|
| teachType | int | 示教类型 | 0: 点动(单动), 1: 拖拽示教, 2: 点动(联动) |

```json
{
  "teachType": 0
}
```

#### 1.3.5 上位机查询示教类型

**命令字**：`0x2105` TEACHTYPE_INQUIRE

**请求参数**：无

```json
{}
```

#### 1.3.6 控制器回复示教类型

**命令字**：`0x2106` TEACHTYPE_RESPOND

| 参数 | 类型 | 说明 |
|------|------|------|
| teachType | int | 示教类型 |

```json
{
  "teachType": 0
}
```

---

### 1.4 坐标模式状态设置及获取

**坐标模式说明**：

| 模式值 | 名称 | 说明 |
|--------|------|------|
| 0 | 关节坐标 (Joint) | - |
| 1 | 直角坐标 (Cart) | - |
| 2 | 工具坐标 (Tool) | - |
| 3 | 用户坐标 (User) | - |

#### 1.4.1 上位机改变当前坐标模式

**命令字**：`0x2201` COORD_MODE_SET

| 参数 | 类型 | 说明 | 取值范围 |
|------|------|------|----------|
| robot | int | 选择机器人 | [1, 4] |
| coord | int | 坐标模式 | 0: 关节坐标, 1: 直角坐标, 2: 工具坐标, 3: 用户坐标 |

```json
{
  "robot": 1,
  "coord": 0
}
```

#### 1.4.2 上位机查询坐标模式

**命令字**：`0x2202` COORD_MODE_INQUIRE

| 参数 | 类型 | 说明 | 取值范围 |
|------|------|------|----------|
| robot | int | 选择机器人 | [1, 4] |

```json
{
  "robot": 1
}
```

#### 1.4.3 控制器回复坐标模式

**命令字**：`0x2203` COORD_MODE_RESPOND

| 参数 | 类型 | 说明 | 取值范围 |
|------|------|------|----------|
| robot | int | 选择机器人 | [1, 4] |
| coord | int | 坐标模式 | 0: 关节坐标, 1: 直角坐标, 2: 工具坐标, 3: 用户坐标 |

```json
{
  "robot": 1,
  "coord": 0
}
```

---

### 1.5 伺服上下电状态设置及获取

#### 1.5.1 示教器改变当前上下电状态

**命令字**：`0x2301` DEADMAN_STATUS_SET

| 参数 | 类型 | 说明 | 取值范围 |
|------|------|------|----------|
| deadman | int | 上下电状态 | 0: DEADMAN 下电, 1: DEADMAN 上电 |

```json
{
  "deadman": 0
}
```

#### 1.5.2 示教器查询上下电状态

**命令字**：`0x2302` DEADMAN_STATUS_INQUIRE

**请求参数**：无

```json
{}
```

#### 1.5.3 控制器回复上下电状态

**命令字**：`0x2303` DEADMAN_STATUS_RESPOND

| 参数 | 类型 | 说明 |
|------|------|------|
| deadman | int | 上下电状态 |

```json
{
  "deadman": 0
}
```

#### 1.5.4 上位机设置上下电模式

**命令字**：`0x2304` DEADMAN_MODE_SET

| 参数 | 类型 | 说明 | 取值范围 |
|------|------|------|----------|
| deadmanMode | int | 触发模式 | 0: 软件触发, 1: 硬件触发 |
| deadmanPortOne | int | 上使能端口 IO 端口号 | 每个端口最多可分配16个 IO 序号 |
| deadmanPortTwo | int | 下使能端口 IO 端口号 | - |

```json
{
  "deadmanMode": 1,
  "deadmanPortOne": 9,
  "deadmanPortTwo": 0
}
```

#### 1.5.5 上位机查询上下电模式

**命令字**：`0x2305` DEADMAN_MODE_INQUIRE

**请求参数**：无

```json
{}
```

#### 1.5.6 控制器回复上下电模式

**命令字**：`0x2306` DEADMAN_MODE_RESPOND

| 参数 | 类型 | 说明 | 取值范围 |
|------|------|------|----------|
| deadmanMode | int | 触发模式 | 0: 软件触发, 1: 硬件触发 |
| deadmanPortOne | int | 上使能端口 IO 端口号 | 每个端口最多可分配16个 IO 序号 |
| deadmanPortTwo | int | 下使能端口 IO 端口号 | - |

```json
{
  "deadmanMode": 1,
  "deadmanPortOne": 9,
  "deadmanPortTwo": 0
}
```

#### 1.5.7 伺服上使能（示教盒无该指令）

**命令字**：`0x2311` MAN_BEG_OPERATION

| 参数 | 类型 | 说明 | 取值范围 |
|------|------|------|----------|
| robot | int | 选择机器人 | [1, 4] |

```json
{
  "robot": 1
}
```

#### 1.5.8 机器人紧急停止

> 注：原2314为伺服下电，程序中不存在

**命令字**：`0x2314` MAN_END_OPERATION

| 参数 | 类型 | 说明 | 取值范围 |
|------|------|------|----------|
| robot | int | 选择机器人 | [1, 4] |

```json
{
  "robot": 1
}
```

---

### 1.6 清除伺服错误

#### 1.6.1 示教器清除伺服错误

**命令字**：`0x3201` FAULT_RESET

| 参数 | 类型 | 说明 | 取值范围 |
|------|------|------|----------|
| robot | int | 选择机器人 | [1, 4] |

```json
{
  "robot": 1
}
```

#### 1.6.2 清除伺服错误后，返回清除结果

**命令字**：`0x3202` FAULT_RESET_RESULT

| 参数 | 类型 | 说明 |
|------|------|------|
| robot | int | 选择机器人 |
| clearErrflag | bool | true: 清除伺服错误成功, false: 清除失败 |

```json
{
  "robot": 1,
  "clearErrflag": true
}
```

---

## 2. 系统状态

### 2.1 控制器初始化是否完成

#### 查询是否完成

**命令字**：`0x4305` CONTROLLER_INIT_FINISH_INQUIRE

**请求参数**：无

```json
{}
```

#### 控制器回复

**命令字**：`0x4306` CONTROLLER_INIT_FINISH_RESPOND

| 参数 | 类型 | 说明 |
|------|------|------|
| finishinit | bool | true：完成，false：未完成 |

```json
{
  "finishinit": true
}
```

---

### 2.2 控制器 IP 设置

#### 控制器 IP 设置

**命令字**：`0x4301` CONTROLLER_IP_SET

| 参数 | 类型 | 说明 |
|------|------|------|
| name | string | 网卡名称 |
| address | string | IP 地址 |
| gateway | string | 网关 |
| dns | string | DNS 服务器 |

```json
{
  "name": "p1p1",
  "address": "192.168.1.13",
  "gateway": "192.168.1.1",
  "dns": "114.114.114.114"
}
```

#### 查询控制器 IP

**命令字**：`0x4302` CONTROLLER_IP_INQUIRE

**请求参数**：无

#### 控制器回复

**命令字**：`0x4303` CONTROLLER_IP_RESPOND

| 参数 | 类型 | 说明 |
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

### 2.3 控制器 License

#### 获取控制器 ID

**命令字**：`0x5052` IDENTIFY_NUMBER_INQUIRE

#### 控制器回复

**命令字**：`0x5053` IDENTIFY_NUMBER_RESPOND

| 参数 | 类型 | 说明 |
|------|------|------|
| controllerID | string | 控制器 ID |

```json
{
  "controllerID": "4DC9F0249098C82E"
}
```

#### 获取控制器剩余使用天数

**命令字**：`0x5055` USE_REST_DAYS_INQUIRE

#### 控制器回复

**命令字**：`0x5056` USE_REST_DAYS_RESPOND

| 参数 | 类型 | 说明 |
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

**命令字**：`0x5057` LICENSE_SERIAL_SET

| 参数 | 类型 | 说明 |
|------|------|------|
| license | string | 控制器序列号 |

```json
{
  "license": "ACOCWKBZHSKBEJHI"
}
```

#### 控制器回复

**命令字**：`0x5059` LICENSE_SERIAL_RESPOND

| 参数 | 类型 | 说明 |
|------|------|------|
| result | string | 密钥更新成功，控制器即将重启 |
| ivalid | string | 无效的密钥 |
| error | string | 存在破解嫌疑，拒绝解锁 |

```json
{
  "result": "success",
  "ivalid": "无效的密钥!",
  "error": "存在破解嫌疑，拒绝解锁!"
}
```

#### 查询图片版本

**命令字**：`0x505A` IMAGE_VERSION_INQUIRE（示教器无此功能）

#### 返回查询结果

**命令字**：`0x505B` IMAGE_VERSION_RESPOND

| 参数 | 类型 | 说明 |
|------|------|------|
| result | bool | 查询是否成功 |
| version | int | 版本号（查询成功时返回） |

```json
{
  "result": true,
  "version": xx
}
```

#### 控制器发送（无权使用提示）

**命令字**：`0x505C` DISABLE_CONTROLLER

| 参数 | 类型 | 说明 |
|------|------|------|
| reason | string | 控制器无权使用提示信息 |

```json
{
  "reason": ""
}
```

#### 控制器发送（剩余天数提醒）

**命令字**：`0x505F` REST_DAYS_REMIND

| 参数 | 类型 | 说明 |
|------|------|------|
| restDays | int | 控制器发送剩余使用天数 |

```json
{
  "restDays": 0
}
```

---

### 2.4 版本号获取

示教器需要获取当前控制器版本号时，发送下面命令：

**命令字**：`0x3402` VERSIONNUM_INQUIRE

#### 控制器收到查询命令时，发送下面命令

**命令字**：`0x3403` VERSIONNUM_RESPOND

| 参数 | 类型 | 说明 |
|------|------|------|
| configFileVersionMismatch | bool | 配置文件是否匹配，false：不匹配；true：匹配 |
| jobFileVersion | string | 作业文件版本 |
| rtlVersion | string | 控制器版本 |
| sysClock | string | 系统时钟，格式：YYYY.MM.DD HH:MM:SS |
| version | string | 版本号内容 |
| servoVersion | string | 伺服版本（久同控制器返回空字符串） |
| ocmVersion | string | 静态库版本（久同控制器返回空字符串） |
| ioVersion | string | IO 版本号（久同控制器返回空字符串） |
| nodka_c1201 | object | C1201控制器专用节点 |

**nodka_c1201 节点参数说明**：

| 参数 | 类型 | 说明 |
|------|------|------|
| deviceId | string | 设备 ID |
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

#### 查询是否存在当前版本的示教器程序

**命令字**：`0x3404` EXIST_TEACHBOX_EQUAL_QTTP_INQUIRE

| 参数 | 类型 | 说明 |
|------|------|------|
| MD5 | string | 示教器程序的 MD5值 |

```json
{
  "MD5": "xx"
}
```

#### 返回查询结果

**命令字**：`0x3405` EXIST_TEACHBOX_EQUAL_QTTP_RESPOND

如果未查询到，则需要上传当前版本的程序。

| 参数 | 类型 | 说明 |
|------|------|------|
| backuppath | string | 示教器程序路径 |

```json
{
  "backuppath": "xx"
}
```

#### 查询是否存在与控制器版本匹配的示教器程序

**命令字**：`0x3406` EXIST_CONTROLLER_MATCHED_QTTP_INQUIRE

**请求参数**：无

#### 返回查询结果

**命令字**：`0x3407` EXIST_CONTROLLER_MATCHED_QTTP_RESPOND

若结果为是，则弹框让客户选择是否自动升级。

| 参数 | 类型 | 说明 |
|------|------|------|
| backuppath | string | 示教器程序路径 |

```json
{
  "backuppath": "xx"
}
```

---

### 2.6 重启控制器

重启控制器时，示教器发送：

**命令字**：`0x5061` REBOOT_CONTROLLER

**请求参数**：无

---

### 2.7 恢复出厂设置

恢复出厂设置时，示教器发送：

**命令字**：`0x5064` RETURN_FACTORY_SET

| 参数 | 类型 | 说明 |
|------|------|------|
| clearConfigFile | bool | 清除所有系统配置文件 |
| clearExtendedFile | bool | 清除所有扩展文件 |

```json
{
  "clearConfigFile": true,
  "clearExtendedFile": true
}
```

---

### 2.8 系统自动备份

#### 备份系统

示教器发送：

**命令字**：`0x5065` CONTROLLER_BACKUP_INQUIRE

**请求参数**：无

#### 控制器回复

**命令字**：`0x5066` CONTROLLER_BACKUP_RESPOND

| 参数 | 类型 | 说明 |
|------|------|------|
| backUpNum | int | 备份数 |
| backUpName | array | 备份系统的名字，最多十个 |

```json
{
  "backUpNum": 1,
  "backUpName": ["string", "string", "string"]
}
```

#### 恢复系统

示教器发送：

**命令字**：`0x5067` CONTROLLER_BACKUP_RESTORE

| 参数 | 类型 | 说明 |
|------|------|------|
| backUpOneName | string | 需要恢复的系统名称 |

```json
{
  "backUpOneName": "string"
}
```

#### 控制器回复

**命令字**：`0x5068` CONTROLLER_BACKUP_RESTORE_RESPOND

| 参数 | 类型 | 说明 |
|------|------|------|
| success | bool | true：系统恢复成功，false：系统恢复失败 |

```json
{
  "success": true
}
```

---

### 2.9 伺服参数

#### 通过控制器设置伺服内部参数

**命令字**：`0x5071` SERVO_INSIDE_PARM_SET

| 参数 | 类型 | 说明 |
|------|------|------|
| robot | int | 机器人号 |
| servoNum | int | 伺服号 |
| 参数名 | object | 伺服参数名 |

```json
{
  "robot": 1,
  "servoNum": 1,
  "参数名": {
    "value": "",
    "unit": "",
    "upLimit": "",
    "lowLimit": ""
  }
}
```

#### 示教器查询

**命令字**：`0x5072` SERVO_INSIDE_PARM_INQUIRE

| 参数 | 类型 | 说明 |
|------|------|------|
| robot | int | 机器人号 |
| servoNum | int | 伺服号 |

```json
{
  "robot": 1,
  "servoNum": 1
}
```

#### 控制器返回

**命令字**：`0x5073` SERVO_INSIDE_PARM_RESPOND

| 参数 | 类型 | 说明 |
|------|------|------|
| robot | int | 机器人号 |
| servoNum | int | 伺服号 |
| sendNum | int | 发送编号 |
| totalNum | int | 总数 |
| servo | array | 具体伺服参数数组 |

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

### 2.10 文件传输

#### 请求上传某文件

**命令字**：`0x5501` REQUEST_UPLOAD_FILE

| 参数 | 类型 | 说明 |
|------|------|------|
| name | string | 文件名称 |
| size | int | 文件大小 |

```json
{
  "name": "vxWorks",
  "size": 4096
}
```

#### 同意上传请求/拒绝上传请求

**命令字**：`0x5502` REQUEST_UPLOAD_RESPOND

| 参数 | 类型 | 说明 |
|------|------|------|
| answer | string | "yes"：同意上传，"busy"：控制器忙碌 |

```json
{
  "answer": "yes"
}
```

#### 请求下载某文件

**命令字**：`0x5504` REQUEST_DOWNLOAD_FILE

| 参数 | 类型 | 说明 |
|------|------|------|
| name | string | 文件名称 |

```json
{
  "name": "log.0"
}
```

#### 同意下载请求/拒绝下载请求

**命令字**：`0x5505` REQUEST_DOWNLOAD_RESPOND

| 参数 | 类型 | 说明 |
|------|------|------|
| answer | string | "yes"：同意下载，"busy"：控制器忙碌，"nofile"：无此文件 |
| name | string | 作业文件全路径 |
| size | int | 如果拒绝，则 size 无效 |

```json
{
  "answer": "yes",
  "name": "log.0",
  "size": 4096
}
```

---

### 2.11 文件传输网络异常中断（仅示教器）

**命令字**：`0x5525` DownLoadInterrupt

**请求参数**：无

```json
{}
```

---

### 2.12 示教器查询控制器配置文件目录

**命令字**：`0x5507` CONFIG_FILE_INQUIRY

| 参数 | 类型 | 说明 |
|------|------|------|
| isExport | bool | true：表示导出配置，false 表示导入配置 |

```json
{
  "isExport": true
}
```

---

### 2.13 控制器向示教器发送配置文件目录

**命令字**：`0x5508` CONFIG_FILE_RESPOND

| 参数 | 类型 | 说明 |
|------|------|------|
| filenum | int | 配置文件数量 |
| filelist | array | 配置文件名称列表 |

```json
{
  "filenum": 2,
  "filelist": ["xxx.json", "yyy.json"]
}
```

---

### 2.14 发送文件二进制数据

**命令字**：`0x5511` UploadFileData（告诉控制器文件发送完成）

**命令字**：`0x5512` UploadFileDone（循环给控制器发送文件）

#### 控制器回复

**命令字**：`0x5513` ReceiveUploadFinish

| 参数 | 类型 | 说明 |
|------|------|------|
| finish | bool | true 表示上传成功，false 表示失败 |

```json
{
  "finish": true
}
```

---

### 2.15 示教器请求获取日志文件列表

**命令字**：`0x5542` LOGFILE_LIST_INQUIRE

| 参数 | 类型 | 说明 |
|------|------|------|
| num | int | 表示获取最近多少个文件，可选值：5、30、100 |

```json
{
  "num": 5
}
```

#### 控制器回复日志文件列表

**命令字**：`0x5543` LOGFILE_LIST_RESPOND

| 参数 | 类型 | 说明 |
|------|------|------|
| absolutepath | string | 日志所在目录 |
| logfilenum | int | 注意，这个数和上面的 num 不一定相等 |
| logfilelist | array | 日志列表 |

```json
{
  "absolutepath": "log/",
  "logfilenum": 3,
  "logfilelist": ["logInfo.0", "logInfo.1", "logInfo.2"]
}
```

---

### 2.16 ENI 文件列表查询

**命令字**：`0x5545` ENIFILE_LIST_INQUIRE

| 参数 | 类型 | 说明 |
|------|------|------|
| num | int | 表示获取最近多少个文件，可选值：5、30、100 |

```json
{
  "num": 5
}
```

#### 控制器回复 ENI 文件列表

**命令字**：`0x5546` ENIFILE_LIST_RESPOND

| 参数 | 类型 | 说明 |
|------|------|------|
| absolutepath | string | 文件所在目录 |
| ENIfilenum | int | 注意，这个数和上面的 num 不一定相等 |

```json
{
  "absolutepath": "log/",
  "ENIfilenum": 3
}
```

---

### 2.17 示教器发送表示已接受完成

**命令字**：`0x5544` DownLoadControlLogFileFinish

---

### 2.18 示教器请求获取作业文件列表

**命令字**：`0x5532` JOBFILE_LIST_INQUIRE

#### 控制器回复作业文件目录及数量

**命令字**：`0x5533` JOBFILE_SUM_RESPOND

| 参数 | 类型 | 说明 |
|------|------|------|
| absolutepath | array | 作业文件路径 |
| jobfilenum | array | 各作业文件路径下的作业文件数量 |

```json
{
  "absolutepath": ["/job/R1/", "/job/R2/", "/job/R3/", "/job/R4/"],
  "jobfilenum": [2, 33, 233, 666]
}
```

#### 控制器回复作业文件列表

**命令字**：`0x5534` JOBFILE_LIST_RESPOND

| 参数 | 类型 | 说明 |
|------|------|------|
| robot | int | 机器人号 |
| listnum | int | 最多10个 |
| jobfilelist | array | 作业文件列表 |

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

#### 接受完成发送给示教盒

**命令字**：`0x5535` JOBFILE_LIST_FINISH

**请求参数**：无。当四个机器人发送完毕后发送给示教盒

---

### 2.19 示教器查询 Lua 脚本列表

**命令字**：`0x5552` LUASCRIPT_LIST_INQUIRE

**请求参数**：无

#### 控制器回复 Lua 脚本列表

**命令字**：`0x5553` LUASCRIPT_LIST_RESPOND

| 参数 | 类型 | 说明 |
|------|------|------|
| absolutepath | string | Lua 脚本所在目录 |
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

**命令字**：`0x2B03` ERROR_CODE

#### 警告提示

**命令字**：`0x2B04` WARNING_CODE

#### 消息条提示

**命令字**：`0x2B05` INFO_CODE

| 参数 | 类型 | 说明 |
|------|------|------|
| data | string | 消息条内容 |
| type | int | 消息代码 |

```json
{
  "data": "示例",
  "type": 1234
}
```

#### 弹窗提示

**命令字**：`0x2B06` POPUP_CODE

| 参数 | 类型 | 说明 |
|------|------|------|
| count | int | 弹窗按钮数量，最大为3 |
| text1 | string | 弹窗居中显示的主文本 |
| text2 | string | 按钮1的文本 |
| text3 | string | 按钮2的文本 |
| text4 | string | 按钮3的文本 |
| kind | int | 弹窗提示种类，1为消息，2为警告，3为报错 |
| node | string | 机器人序号1-4 |
| Tips | bool | 弹窗呼出为 true |

```json
{
  "count": 1,
  "text1": "示例",
  "text2": "示例",
  "text3": "示例",
  "text4": "示例",
  "kind": 1,
  "node": "1",
  "Tips": true
}
```

#### 弹窗交互反馈

根据用户对弹窗的操作进行相应设置：

**命令字**：`0x2B07` GET_OPTION

| 参数 | 类型 | 说明 |
|------|------|------|
| node | string | 机器人序号1-4 |
| option | int | 1-3，对应弹窗选项1-3的内容 |

```json
{
  "node": "1",
  "option": 1
}
```

---

### 2.21 控制器时间查询

#### 时间查询

**命令字**：`0x5742` CONTROLLER_TIME_INQUIRE

| 参数 | 类型 | 说明 |
|------|------|------|
| type | int | 1：获取系统开始时间至现在秒数，0：显示时间 |
| format | int | 1：获取北京时间，0：获取时间戳 |

```json
{
  "type": 0,
  "format": 0
}
```

#### 返回查询结果

**命令字**：`0x5743` CONTROLLER_TIME_RESPOND

| 参数 | 类型 | 说明 |
|------|------|------|
| tType | int | 1：获取系统开始时间至现在秒数，0：显示时间 |
| format | int | 1：获取北京时间，0：获取时间戳 |
| date | object | format 为1时用格林威治标准时间表示 |
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

### 3.1 GPIO_DOUT_SET - 设置数字输出

**命令码**: `0x3601`

示教器设置 DOUT 时发送此命令。

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| port | int | 是 | 端口号，从 1 开始 |
| status | int | 是 | 端口状态：0=低电平，1=高电平 |

```json
{
  "port": 1,
  "status": 1
}
```

---

### 3.2 GPIO_DOUT_INQUIRE - 查询数字输出状态

**命令码**: `0x3602`

示教器查询 DOUT 状态时发送此命令。

**请求参数**：无

---

### 3.3 GPIO_DOUT_RESPOND - 查询数字输出状态响应

**命令码**: `0x3603`

控制器收到查询请求后返回此命令。

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| status | array | 是 | 每个输出端口的状态数组 |

**status 数组元素说明**:

| 值 | 说明 |
|----|------|
| 0 | 低电平 |
| 1 | 高电平 |
| -1 | 无此端口 |

```json
{
  "status": [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, -1, -1, -1, -1]
}
```

---

### 3.4 GPIO_DIN_INQUIRE - 查询数字输入状态

**命令码**: `0x3605`

示教器查询 DIN 状态时发送此命令。

**请求参数**：无

---

### 3.5 GPIO_DIN_RESPOND - 查询数字输入状态响应

**命令码**: `0x3606`

控制器收到查询请求后返回此命令。

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| status | array | 是 | 每个输入端口的状态数组 |

**status 数组元素说明**:

| 值 | 说明 |
|----|------|
| 0 | 低电平 |
| 1 | 高电平 |
| -1 | 无此端口 |

```json
{
  "status": [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, -1, -1, -1, -1]
}
```

---

### 3.6 ANALOG_OUT_SET - 设置模拟输出

**命令码**: `0x3607`

示教器设置 AOUT 时发送此命令。

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| port | int | 是 | 端口号，从 1 开始 |
| value | float | 是 | 端口电压值（如 1.33 表示 1.33V） |

```json
{
  "port": 1,
  "value": 1.33
}
```

---

### 3.7 ANALOG_OUT_INQUIRE - 查询模拟输出状态

**命令码**: `0x3608`

示教器查询 AOUT 状态时发送此命令。

**请求参数**：无

---

### 3.8 ANALOG_OUT_RESPOND - 查询模拟输出状态响应

**命令码**: `0x3609`

控制器收到查询请求后返回此命令。

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| value | array | 是 | 每个模拟输出端口的值数组 |

**value 数组元素说明**:

| 值 | 说明 |
|----|------|
| 0 | 低电平 |
| 1 | 高电平 |
| -1 | 无此端口 |

```json
{
  "value": [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, -1, -1, -1, -1]
}
```

---

### 3.9 ANALOG_IN_INQUIRE - 查询模拟输入状态

**命令码**: `0x360A`

示教器查询 AIN 状态时发送此命令。

**请求参数**：无

---

### 3.10 ANALOG_IN_RESPOND - 查询模拟输入状态响应

**命令码**: `0x360B`

控制器收到查询请求后返回此命令。

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| value | array | 是 | 每个模拟输入端口的值数组 |

**value 数组元素说明**:

| 值 | 说明 |
|----|------|
| 0 | 低电平 |
| 1 | 高电平 |
| -1 | 无此端口 |

```json
{
  "value": [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, -1, -1, -1, -1]
}
```

---

### 3.11 FORCE_DIN_SET - 设置强制数字输入

**命令码**: `0x360C`

示教器设置强制数字输入时发送此命令。

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| port | int | 是 | 端口号 |
| enable | bool | 是 | 是否开启强制输入 |
| status | int | 是 | 设置端口的高低电平：0=低电平，1=高电平 |

```json
{
  "port": 1,
  "enable": true,
  "status": 0
}
```

---

### 3.12 FORCE_DIN_INQUIRE - 查询强制数字输入状态

**命令码**: `0x360D`

示教器查询强制输入状态时发送此命令。

**请求参数**：无

---

### 3.13 FORCE_DIN_RESPOND - 查询强制数字输入状态响应

**命令码**: `0x360E`

控制器收到查询请求后返回此命令。

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| port | int | 是 | 端口号 |
| enable | bool | 是 | 是否开启强制输入 |
| status | int | 是 | 设置端口的高低电平：0=低电平，1=高电平 |

```json
{
  "port": 1,
  "enable": true,
  "status": 0
}
```

---

### 3.14 FORCE_ANALOG_IN_SET - 设置强制模拟输入

**命令码**: `0x3611`

示教器设置强制模拟输入时发送此命令。

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| port | int | 是 | 端口号 |
| enable | bool | 是 | 是否开启强制输入 |
| status | int | 是 | 设置端口的模拟值 |

```json
{
  "port": 1,
  "enable": true,
  "status": 0
}
```

---

### 3.15 FORCE_ANALOG_IN_INQUIRE - 查询强制模拟输入状态

**命令码**: `0x3612`

示教器查询强制模拟输入状态时发送此命令。

**请求参数**：无

---

### 3.16 FORCE_ANALOG_IN_RESPOND - 查询强制模拟输入状态响应

**命令码**: `0x3613`

控制器收到查询请求后返回此命令。

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| port | int | 是 | 端口号 |
| enable | bool | 是 | 是否开启强制输入 |
| status | int | 是 | 设置端口的模拟值 |

```json
{
  "port": 1,
  "enable": true,
  "status": 0
}
```

---

## 4. 远程 IO 控制

### 4.1 IO 功能界面设置

#### 4.1.1 IO 功能界面设置（示教盒发送）

**命令码**: `0x2F01` IO_CONTROL_SET

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| inPort | object | 是 | 远程 IO 功能端口绑定 |
| inValue | object | 是 | 端口值，IO 参数，0：低电平有效，1：高电平有效 |
| program | array | 是 | 远程 IO 程序 DIN 和 value 绑定，共10个 |
| robot | int | 是 | 机器人号 |

**inPort 对象参数**:

| 参数名 | 类型 | 说明 |
|--------|------|------|
| start | int | 启动，绑定端口 |
| stop | int | 停止，绑定端口 |
| pause | int | 暂停，绑定端口 |
| faultReset | int | 清除报警，绑定端口 |
| clearoutagekeep | int | 清除断电保持数据，绑定端口 |

**inValue 对象参数**:

| 参数名 | 类型 | 说明 |
|--------|------|------|
| start | int | 启动 |
| stop | int | 停止 |
| pause | int | 暂停 |
| faultReset | int | 清除报警 |
| clearoutagekeep | int | 清除断电保持数据 |

**program 数组参数**:

| 参数名 | 类型 | 说明 |
|--------|------|------|
| port | int | 端口号 |
| value | int | 端口值，0或1 |

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

#### 4.1.2 IO 功能界面查询（示教盒发送）

**命令码**: `0x2F02` IO_CONTROL_INQUIRE

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| robot | int | 是 | 机器人号 |

```json
{
  "robot": 1
}
```

---

#### 4.1.3 IO 功能界面响应（控制器返回）

**命令码**: `0x2F03` IO_CONTROL_RESPOND

**参数说明**：同 4.1.1 IO 功能界面设置

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

### 4.2 复位点设置

#### 4.2.1 复位点位置参数设置（示教盒发送）

**命令码**: `0x2F04` IO_CONTROL_RESETPOS_SET

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| pos | array | 是 | 机器人位置（7个元素） |
| posSync | array | 是 | 外部轴位置（5个元素） |
| robot | int | 是 | 机器人号 |

```json
{
  "pos": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  "posSync": [0.0, 0.0, 0.0, 0.0, 0.0],
  "robot": 1
}
```

---

#### 4.2.2 复位点 IO 参数设置（示教盒发送）

**命令码**: `0x2F14` IO_CONTROL_RESETPORT_SET

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| robot | int | 是 | 机器人号 |
| selectPiontOrFile | int | 是 | 0:复位点，1:复位程序 |
| inPort | int | 是 | 复位开始，IO 触发端口 |
| inValue | int | 是 | 复位开始，IO 参数 |
| outPort | int | 是 | 复位结束，IO 输出端口 |
| safeEnable | bool | 是 | 安全使能 |
| returnway | int | 是 | 0:关节插补，1：直线插补 |

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

#### 4.2.3 安全点误差参数设置

**命令码**: `0x2F15` IO_CONTROL_RESETSAFEDEV_SET

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| deviation | array | 是 | 机器人位置偏差（7个元素） |
| deviationSync | array | 是 | 外部轴偏差（5个元素） |
| robot | int | 是 | 机器人号 |

```json
{
  "deviation": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 1.0],
  "deviationSync": [1.0, 1.0, 1.0, 1.0, 1.0],
  "robot": 1
}
```

---

#### 4.2.4 安全点位置通知

**命令码**: `0x2F16` IO_CONTROL_NOTIS_SAFEPOS

**说明**: 运行作业文件时，开始安全使能，不在安全点时控制器返回发送

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| robot | int | 是 | 当前机器人 |
| isSync | bool | 是 | false:机器人不在安全区，true:外部轴不在安全区 |
| currentPos | array | 是 | 当前坐标 |
| safePos | array | 是 | 复位点位 |

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

**命令码**: `0x2F17` RECOVERY_SITE

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| robot | int | 是 | 机器人号 |

```json
{
  "robot": 1
}
```

---

#### 4.2.6 复位点设置查询（示教盒发送）

**命令码**: `0x2F05` IO_CONTROL_RESET_INQUIRE

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| robot | int | 是 | 机器人号 |

```json
{
  "robot": 1
}
```

---

#### 4.2.7 复位点设置响应（控制器返回）

**命令码**: `0x2F06` IO_CONTROL_RESET_RESPOND

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| robot | int | 是 | 机器人号 |
| selectPiontOrFile | int | 是 | 0选择的是点，1选择的程序 |
| returnWay | int | 是 | 0表示选择的是 movj，1表示的是 movl |
| inPort | int | 是 | 复位开始，IO 触发端口 |
| inValue | int | 是 | 复位开始，IO 参数 |
| outPort | int | 是 | 复位结束，IO 输出端口 |
| safeEnable | bool | 是 | 安全使能 |
| pos | array | 是 | 复位点坐标 |
| posSync | array | 是 | 外部轴复位点坐标 |
| deviation | array | 是 | 安全点范围 |
| deviationSync | array | 是 | 外部轴安全点范围 |

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

#### 4.2.8 当前位置查询（示教盒发送）

**命令码**: `0x2F07` IO_CONTROL_POS_INQUIRE

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| robot | int | 是 | 机器人号 |
| coord | int | 是 | 坐标模式：-1-控制器当前坐标，0-关节坐标，1-直角坐标，2-工具坐标，3-用户坐标 |

```json
{
  "robot": 1,
  "coord": 0
}
```

---

#### 4.2.9 当前位置响应（控制器返回）

**命令码**: `0x2F08` IO_CONTROL_POS_RESPOND

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| robot | int | 是 | 机器人号 |
| coord | int | 是 | 坐标模式 |
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

#### 4.2.10 双机位置查询（MOVJDOUBLE 指令）

**命令码**: `0x2F10` IO_CONTROL_DOUBLE_POS_INQUIRE

**说明**: MOVJDOUBLE 指令在双机下需要同时查询第一和第二个机器人位置

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| robot1 | int | 是 | 机器人1 |
| coord1 | int | 是 | 机器人1坐标：1-直角坐标，2-工具坐标，3-用户坐标 |
| robot2 | int | 是 | 机器人2 |
| coord2 | int | 是 | 同机器人1 |

```json
{
  "robot1": 1,
  "coord1": 1,
  "robot2": 2,
  "coord2": 1
}
```

---

#### 4.2.11 双机位置响应

**命令码**: `0x2F11` IO_CONTROL_DOUBLE_POS_RESPOND

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| pos1Deg | array | 是 | 机器人1轴1-7当前位置（角度表示） |
| pos1 | array | 是 | 机器人1轴1-7当前位置（弧度表示） |
| pos2Deg | array | 是 | 机器人2轴1-7当前位置（角度表示） |
| pos2 | array | 是 | 机器人2轴1-7当前位置（弧度表示） |

```json
{
  "pos1Deg": [0, 1.1, 2, 3.3, 4.4, 5.5, 6.6],
  "pos1": [0, 1.1, 2, 3.3, 4.4, 5.5, 6.6],
  "pos2Deg": [0, 1.1, 2, 3.3, 4.4, 5.5, 6.6],
  "pos2": [0, 1.1, 2, 3.3, 4.4, 5.5, 6.6]
}
```

---

#### 4.2.12 打开作业文件

**命令码**: `0x3114`

**说明**: 复位程序固定是 RobotResetProgram，后缀是.ResetPro

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| jobName | string | 是 | 作业文件名称（固定：RobotResetProgram） |
| robot | int | 是 | 机器人号 |
| suffixname | string | 是 | 作业文件后缀（固定：.ResetPro） |

```json
{
  "jobName": "RobotResetProgram",
  "robot": 1,
  "suffixname": ".ResetPro"
}
```

---

#### 4.2.13 插入指令

**命令码**: `0x3121`

---

#### 4.2.14 保存作业文件

**命令码**: `0x3120`

**说明**: 复位程序固定是 RobotResetProgram，后缀是.ResetPro

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| jobname | string | 是 | 作业文件名称（固定：RobotResetProgram） |
| robot | int | 是 | 机器人号 |
| suffix | string | 是 | 作业文件后缀（固定：.ResetPro） |

```json
{
  "jobname": "RobotResetProgram",
  "robot": 1,
  "suffix": ".ResetPro"
}
```

---

### 4.3 状态提示设置界面

#### 4.3.1 状态提示设置（示教盒发送）

**命令码**: `0x2F09` IO_CONTROL_OUTPUT_SET

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| outPut | array | 是 | 输出配置数组，每个元素对应一个机器人 |
| remoteOut | int | 是 | 远程模式 |
| remoteOut_value | int | 是 | 远程模式值：0、1、3（闪烁） |
| runOut | int | 是 | 运行模式 |
| runOut_value | int | 是 | 运行模式值 |
| startUp | int | 是 | 开机提示 |
| startUp_value | int | 是 | 开机提示值 |
| teachOut | int | 是 | 示教模式 |
| teachOut_value | int | 是 | 示教模式值 |

**outPut 数组元素参数**:

| 参数名 | 类型 | 说明 |
|--------|------|------|
| IOenable | int | 使能 DOUT 绑定 |
| IOenable_value | int | 值：0、1、3（闪烁） |
| continuable | int | 可继续执行 DOUT 绑定 |
| continuable_value | int | 值：0、1、3（闪烁） |
| fault | int | 报错提示 DOUT 绑定 |
| faultIsFickler | int | 值：0、1、3（闪烁） |
| mainJobFirstLine | int | 主程序首行 DOUT 绑定 |
| mainJobFirstLine_value | int | 值 |
| pause | int | 暂停 DOUT 绑定 |
| pause_value | int | 值 |
| quickStopOut1 | int | 紧急急停1DOUT 绑定 |
| quickStopOut2 | int | 紧急急停2DOUT 绑定 |
| quickStopOutValue1 | int | 值 |
| quickStopOutValue2 | int | 值 |
| running | int | 运行 DOUT 绑定 |
| running_value | int | 值 |
| stop | int | 停止 DOUT 绑定 |
| stop_value | int | 值 |
| teachBoxStateOut | int | 拔出示教盒 DOUT 绑定 |
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

#### 4.3.2 状态提示查询（示教盒发送）

**命令码**: `0x2F0A` IO_CONTROL_OUTPUT_INQUIRE

**说明**: data: 无

---

#### 4.3.3 状态提示响应（控制器返回）

**命令码**: `0x2F0B` IO_CONTROL_OUTPUT_RESPOND

**说明**: data：同 0x2F09

---

### 4.4 IO 复位设置界面

#### 4.4.1 IO 输出复位设置（示教盒发送）

**命令码**: `0x2F0D` IO_CONTROL_IORESET_SET

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| robot | int | 是 | 机器人号 |
| type | int | 是 | 1-IO 复位，2-切模式停止，3-程序报错停止 |
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

#### 4.4.2 IO 输出复位查询（示教盒发送）

**命令码**: `0x2F0E` IO_CONTROL_IORESET_INQUIRE

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| robot | int | 是 | 机器人号 |
| type | int | 是 | 类型 |

```json
{
  "robot": 1,
  "type": 1
}
```

---

#### 4.4.3 IO 输出复位响应（控制器返回）

**命令码**: `0x2F0F` IO_CONTROL_IORESET_RESPOND

**说明**: data：同 0x2F0D

---

### 4.5 IO 功能状态界面

#### 4.5.1 IO 功能状态查询（示教盒发送）

**命令码**: `0x2F12` IO_FUNCTION_INQUIRE

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| type | int | 是 | 1-数字输入，2-数字输出，3-模拟输入，4-模拟输出 |

```json
{
  "type": 1
}
```

---

#### 4.5.2 IO 功能状态响应（控制器返回）

**命令码**: `0x2F13` IO_FUNCTION_RESPOND

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| type | int | 是 | 类型 |
| IOFunction | array | 是 | 数字有16个，模拟有8个 |

```json
{
  "type": 1,
  "IOFunction": [
    "远程：机器人1启动 机器人1视觉:触发端口",
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

### 4.6 远程模式界面

#### 4.6.1 预约执行状态查询（示教盒发送）

**命令码**: `0x2F1B` RESERVE_EXE_STATE_INQUIRE

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| robot | int | 是 | 机器人号 |

```json
{
  "robot": 1
}
```

---

#### 4.6.2 预约执行状态响应（控制器返回）

**命令码**: `0x2F1C` RESERVE_EXE_STATE_RESPOND

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| robot | int | 是 | 机器人号 |
| current | object | 是 | 当前运行状态 |
| queue | array | 是 | 队列（10个元素） |

**current 对象参数**:

| 参数名 | 类型 | 说明 |
|--------|------|------|
| station | int | 工作站（程序编号） |
| name | string | 程序名 |
| runtime | int | 当前运行的已运行次数 |
| times | int | 当前运行的运行总数 |
| count | int | 运行总数 |
| status | int | 运行状态：0-无预约，1-预约中，2-运行中，3-已预约，4-程序暂停 |

**queue 数组元素参数**:

| 参数名 | 类型 | 说明 |
|--------|------|------|
| station | int | 工作站（程序编号） |
| name | string | 程序名 |
| times | int | 运行次数 |
| count | int | 运行总数 |
| status | int | 状态 |

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

#### 4.6.3 运行总数清零

**命令码**: `0x2F1D` RESERVE_EXE_STATE_CLEAR

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| robot | int | 是 | 机器人号 |

```json
{
  "robot": 1
}
```

---

### 4.7 IO 型号设置

#### 4.7.1 IO 型号设置（示教盒发送）

**命令码**: `0x2F21` IO_TYPE_SET

**说明**: 重启生效

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| simuNum | int | 是 | 虚拟 IO 数量 |
| serialAnalog | object | 是 | 串口模拟量配置 |

**serialAnalog 对象参数**:

| 参数名 | 类型 | 说明 |
|--------|------|------|
| type | string | 可选：SUPER_ANAIO、DAC_ANAIO |
| port | int | 端口号 |
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

#### 4.7.2 IO 型号查询（示教盒发送）

**命令码**: `0x2F22` IO_TYPE_INQUIRE

---

#### 4.7.3 IO 型号响应（控制器返回）

**命令码**: `0x2F23` IO_TYPE_RESPOND

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| num | int | 是 | IO 板数量 |
| type | array | 是 | IO 板类型列表 |
| portNum | array | 是 | 端口配置 |
| simuNum | int | 是 | 虚拟 IO 数量 |
| serialAnalog | object | 是 | 串口模拟量配置 |

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

### 4.8 远程状态提示

#### 4.8.1 远程状态提示设置

**命令码**: `0x2F24` IO_REMOTEOUTPUT_SET

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| outPut | array | 是 | 输出配置数组 |
| robot | int | 是 | 机器人号 |

**outPut 数组元素参数**:

| 参数名 | 类型 | 说明 |
|--------|------|------|
| outagerecover | int | 断电保持数据恢复 DOUT1-2端口绑定 |
| outagerecover_value | int | DOUT1-2端口值：0、1、2（2代表闪烁） |
| program1~program10 | int | 远程 IO 程序 DOUT 端口绑定 |
| program_value1~program_value10 | int | 远程 IO 程序 DOUT 输出端口值：0、1、2（2代表闪烁） |

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

#### 4.8.2 远程状态提示查询

**命令码**: `0x2F25` IO_REMOTEOUTPUT_INQUIRE

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| robot | int | 是 | 机器人号 |

```json
{
  "robot": 1
}
```

---

#### 4.8.3 远程状态提示响应

**命令码**: `0x2F26` IO_REMOTEOUTPUT_RESPOND

**说明**: 内容同 0x2F24

---

### 4.9 安全监测设置

#### 4.9.1 安全监测设置（示教盒发送）

**命令码**: `0x2F31` IO_SAFE_CHECK_SET

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| robot | int | 是 | 机器人号 |
| safeScreen | object | 是 | 安全光幕配置 |
| quickStop | object | 是 | 快速停止配置 |

**safeScreen 对象参数**:

| 参数名 | 类型 | 说明 |
|--------|------|------|
| enable | bool | 使能安全光幕 |
| port1 | int | 安全光幕1 DIN 序号（1~16） |
| value1 | int | IO 电平参数：0-低电平，1-高电平 |
| port2 | int | 安全光幕2 DIN 序号（1~16） |

---

## 5. 全局变量

### 5.1 当前位置模式

| 值 | 模式 | 说明 |
|---|---|---|
| -1 | 控制器当前坐标 | 控制器当前坐标 |
| 0 | 关节坐标(Joint) | 关节坐标系 |
| 1 | 直角坐标(Angle) | 直角坐标系 |
| 2 | 工具坐标(Tool) | 工具坐标系 |
| 3 | 用户坐标(User) | 用户坐标系 |

---

### 5.2 获取全局位置变量点位

**命令**: `0x5602` GLOBAL_ALLPOSITION_INQUIRE

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| robot | int | 是 | 机器人号 |

```json
{
  "robot": 1
}
```

**控制器回复**: `0x5603` GLOBAL_ALLPOSITION_RESPOUND

| 参数 | 类型 | 说明 |
|---|---|---|
| robot | int | 机器人号 |
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

> **说明：** 如果是四轴机器人，最后两位补0。

---

### 5.3 设置全局点位

**命令**: `0x5604` GLOBAL_POSITION_SET

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| robot | int | 是 | 机器人号 |
| posName | string | 是 | 点位名称 |
| pos | array | 是 | 点位数据（14元素） |
| note | string | 否 | 注释 |

**pos 数组说明** (共14元素):

| 索引 | 说明 |
|---|---|
| 0 | 坐标系: 0-关节, 1-直角, 2-工具, 3-用户 |
| 1 | 单位: 0-弧度制, 1-角度制 |
| 2 | 姿态: 0-无, 1-手左, 2-右手 |
| 3 | 工具坐标编号 |
| 4 | 用户坐标编号 |
| 5-6 | 预留位 |
| 7-13 | 位置数据: J1~J7 / xyzabc |

```json
{
  "robot": 1,
  "posName": "GP0001",
  "pos": [1, 0, 0, 0, 0, 0, 0, 459, 0, 796, 3.141, 0, 0, 0],
  "note": "data"
}
```

---

### 5.4 查询全局点位

**命令**: `0x5605` GLOBAL_POSITION_INQUIRE

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| robot | int | 是 | 机器人号 |
| posName | string | 是 | 点位名称 |

```json
{
  "robot": 1,
  "posName": "GP0001"
}
```

**控制器回复**: `0x5606` GLOBAL_POSITION_RESPOUND

| 参数 | 类型 | 说明 |
|---|---|---|
| note | string | 注释 |
| posName | string | 变量名 |
| posValue | array | 弧度制点位 |
| posValueDeg | array | 角度制点位 |
| robot | int | 机器人号 |

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

### 5.5 设置全局数值变量

**命令**: `0x5607` GLOBAL_VARIANT_SET

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| varName | string | 是 | 变量名称 |
| varType | int | 是 | 变量类型: 0-int, 1-double, 2-bool, 3-string |
| varValue | double | 否 | 变量值（数值类型使用） |
| varString | string | 否 | 变量值（string 类型使用） |
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

### 5.6 获取全局数值变量列表

**命令**: `0x5608` GLOBAL_VARIANT_INQUIRE

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| varType | int | 是 | 变量类型: 1-布尔型, 2-int 型, 3-double 型 |

```json
{
  "varType": 1
}
```

**控制器回复**: `0x5609` GLOBAL_VARIANT_RESPOND

| 参数 | 类型 | 说明 |
|---|---|---|
| varType | int | 变量类型 |
| varNum | int | 数值变量个数 (0-100) |
| varList | array | 数值变量列表 |

**varList 数组元素**:

| 参数 | 类型 | 说明 |
|---|---|---|
| varName | string | 变量名字 |
| varValue | mixed | 变量值 |
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

### 5.7 请求全局数值注释

**命令**: `0x5610` GLOBAL_ALLVARIANT_NOTE_INQUIRE

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| varType | int | 是 | 变量类型: 1-bool, 2-int, 3-double, 4-string |

```json
{
  "varType": 1
}
```

**控制器回复**: `0x5611` GLOBAL_ALLVARIANT_NOTE_RESPOND

| 参数 | 类型 | 说明 |
|---|---|---|
| varNote | object | 注释列表 |
| varType | int | 变量类型 |

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

### 5.8 查询单个全局变量

**命令**: `0x560B` GLOBAL_VARIANT_INQUIRE

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| varType | int | 是 | 变量类型: 0-int, 1-double, 2-bool, 3-string |
| varName | string | 是 | 变量名称 |
| identity | string | 否 | 来源标识 |

**identity 取值说明**:

| 值 | 说明 |
|---|---|
| VariableReview | 监控界面的全局变量 |
| NumerlcalVarWidget | 全局数值变量界面 |

```json
{
  "varType": 1,
  "varName": "GI001",
  "identity": "VariableReview"
}
```

**控制器回复**: `0x560C` GLOBAL_VARIANT_RESPOUND

| 参数 | 类型 | 说明 |
|---|---|---|
| varType | int | 变量类型 |
| varName | string | 变量名称 |
| varValue | mixed | 变量值 |
| varString | string | 字符串值（string 类型） |
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

### 5.9 局部变量位置变量 P 点查询

**命令**: `0x5612` LOCAL_POS_P_VAR_INQUIRE

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| robot | int | 是 | 机器人号 |
| varname | string | 是 | 点位名称 |
| initialValue | bool | 是 | 是否为初始值 |

```json
{
  "robot": 1,
  "varname": "P0001",
  "initialValue": true
}
```

**控制器回复**: `0x5613` LOCAL_POS_P_VAR_RESPOND

| 参数 | 类型 | 说明 |
|---|---|---|
| robot | int | 机器人号 |
| jobname | string | 作业文件名称 |
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

### 5.10 局部变量位置变量 E 点查询

**命令**: `0x5615` LOCAL_POS_E_VAR_INQUIRE

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| robot | int | 是 | 机器人号 |
| varname | string | 是 | 点位名称 |
| initialValue | bool | 是 | 是否为初始值 |

```json
{
  "robot": 1,
  "varname": "E0001",
  "initialValue": true
}
```

**控制器回复**: `0x5616` LOCAL_POS_E_VAR_RESPOND

| 参数 | 类型 | 说明 |
|---|---|---|
| robot | int | 机器人号 |
| jobname | string | 作业文件名称 |
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

### 5.11 局部变量数值变量查询

**命令**: `0x5618` LOCAL_VALUE_VAR_INQUIRE

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| robot | int | 是 | 机器人号 |
| vartype | int | 是 | 变量类型: 0-int, 1-double, 2-bool, 3-string |
| varname | string | 是 | 变量名称 |
| initialValue | bool | 是 | 是否为初始值 |
| identify | string | 否 | 来源标识 |

**identify 取值说明**:

| 值 | 说明 |
|---|---|
| CommandInsert | 插入指令界面变量 |
| VariableReview | 监控界面数值变量 |

```json
{
  "robot": 1,
  "vartype": 1,
  "varname": "I001",
  "initialValue": true,
  "identify": "CommandInsert"
}
```

**控制器回复**: `0x5619` LOCAL_VALUE_VAR_RESPOND

| 参数 | 类型 | 说明 |
|---|---|---|
| robot | int | 机器人号 |
| jobname | string | 作业文件名称 |
| vartype | int | 变量类型: 1-bool, 2-int, 3-double |
| varname | string | 变量名称 |
| value | mixed | 变量值（数值类型） |
| string | string | 变量值（字符串类型） |
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

### 5.12 全局外部轴变量

> **说明：** 全局外部轴变量结构: 点位信息(7) + 机器人位置(7) + 外部轴位置(5) + 预留(2) = 21元素

#### 5.12.1 设置全局外部轴变量

**命令**: `0x561a` GLOBAL_EXTPOS_VAR_SET

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| robot | int | 是 | 机器人号 |
| varname | string | 是 | 点位名称 |
| pos | array | 是 | 点位数据（21元素） |
| note | string | 否 | 备注 |

**pos 数组说明**:

| 索引范围 | 说明 |
|---|---|
| 0-6 | 点位信息 |
| 7-13 | robot 位置 |
| 14-18 | sync 外部轴位置 |
| 19-20 | 预留 |

```json
{
  "robot": 1,
  "varname": "GE001",
  "pos": [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 2.0, 2.1, 2.2, 2.3, 2.4, 0, 0],
  "note": "qqq"
}
```

#### 5.12.2 查询全局外部轴变量

**命令**: `0x561b` GLOBAL_EXTPOS_VAR_INQUIRE

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| robot | int | 是 | 机器人号 |
| varname | string | 是 | 点位名称 |
| initialValue | bool | 是 | 是否为初始值 |

```json
{
  "robot": 1,
  "varname": "GE0001",
  "initialValue": true
}
```

**控制器回复**: `0x561c` GLOBAL_EXTPOS_VAR_RESPOND

| 参数 | 类型 | 说明 |
|---|---|---|
| note | string | 注释 |
| varname | string | 变量名称 |
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

#### 5.12.3 获取全部全局外部轴点位

**命令**: `0x561d` GLOBAL_ALLEXTPOS_VAR_INQUIRE

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| robot | int | 是 | 机器人号 |

```json
{
  "robot": 1
}
```

**控制器回复**: `0x561e` GLOBAL_ALLEXTPOS_VAR_RESPOND

| 参数 | 类型 | 说明 |
|---|---|---|
| robot | int | 机器人号 |
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

### 5.13 机器人点位坐标系转换

**命令**: `0x2A12` POS_TRANS_COORD

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| robot | int | 是 | 机器人号 |
| name | string | 是 | 点名字 |
| pos | array | 是 | 点位数据（21元素） |
| targetCoord | int | 是 | 目标坐标系: 0-关节, 1-直角, 2-工具, 3-用户 |

```json
{
  "robot": 1,
  "name": "P001",
  "pos": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "targetCoord": 1
}
```

**控制器回复**: `0x2A13` POS_TRANS_COORD_RESPOND

| 参数 | 类型 | 说明 |
|---|---|---|
| name | string | 点名字 |
| pos | array | 点位信息（通用21位数据，弧度制） |
| posDeg | array | 点位信息（通用21位数据，角度制） |
| robot | int | 机器人号 |

```json
{
  "name": "P001",
  "pos": [1, 1, 0, 0, 0, 0, 0, 459.62120, -0.1010, 796.79160, 3.141592653590, 0.0, 0.0, 0.0],
  "posDeg": [1, 1, 0, 0, 0, 0, 0, 459.62120, -0.1010, 796.79160, 180.0, 0.0, 0.0, 0.0],
  "robot": 1
}
```
