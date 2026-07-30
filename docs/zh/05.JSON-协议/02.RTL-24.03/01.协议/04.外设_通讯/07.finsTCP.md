# finsTCP

## 1. 上位机设置 finsTCP 参数

**命令字：** `0x7340`

### 参数列表

| 参数名 | 类型 | 说明 | 范围/格式 |
|--------|------|------|-----------|
| IP | string | IP 地址 | - |
| PLCReadAddress | string | PLC 读取首地址 | "DM" 开头 + 数字，范围 [1, 9999] |
| PLCWriteAddress | string | PLC 写入首地址 | "DM" 开头 + 数字，范围 [1, 9999] |
| craftNum | int | 工艺号 | 范围 [1, 9] |
| localReadAddress | int[] | 本机读取首地址列表 | 范围 [1, 990]，第一位为全局布尔首地址，第二位为全局整型首地址 |
| localWriteAddress | int[] | 本机写入首地址列表 | 范围 [1, 990]，第一位为全局布尔首地址，第二位为全局整型首地址 |
| port | int | 端口号 | 范围 [0, 65535] |

### 请求示例

```json
{
  "IP": "192.168.1.10",
  "PLCReadAddress": "DM2000",
  "PLCWriteAddress": "DM1000",
  "craftNum": 1,
  "localReadAddress": [500, 500],
  "localWriteAddress": [100, 100],
  "port": 9600
}
```

---

## 2. 上位机查询 finsTCP 参数

**命令字：** `0x7341`

### 参数列表

| 参数名 | 类型 | 说明 | 范围 |
|--------|------|------|------|
| craftNum | int | 查询的工艺号名称 | 范围 [1, 9] |

### 请求示例

```json
{
  "craftNum": 1
}
```

---

## 3. 控制器回复上位机 finsTCP 参数

**命令字：** `0x7342`

### 参数列表

| 参数名 | 类型 | 说明 | 范围/格式 |
|--------|------|------|-----------|
| IP | string | IP 地址 | - |
| PLCReadAddress | string | PLC 读取首地址 | "DM" 开头 + 数字，范围 [1, 9999] |
| PLCWriteAddress | string | PLC 写入首地址 | "DM" 开头 + 数字，范围 [1, 9999] |
| craftNum | int | 工艺号 | 范围 [1, 9] |
| localReadAddress | int[] | 本机读取首地址列表 | 范围 [1, 990]，第一位为全局布尔首地址，第二位为全局整型首地址 |
| localWriteAddress | int[] | 本机写入首地址列表 | 范围 [1, 990]，第一位为全局布尔首地址，第二位为全局整型首地址 |
| port | int | 端口号 | 范围 [0, 65535] |
| status | int | 通讯状态 | 范围 [0, 1]，0 表示未连接，1 表示已连接 |

### 响应示例

```json
{
  "IP": "192.168.1.10",
  "PLCReadAddress": "DM2000",
  "PLCWriteAddress": "DM1000",
  "craftNum": 1,
  "localReadAddress": [500, 500],
  "localWriteAddress": [100, 100],
  "port": 9600,
  "status": 0
}
```

---

## 4. 上位机请求连接通讯

**命令字：** `0x7343`

### 请求示例

```json
{}
```

---

## 5. 上位机请求断开通讯

**命令字：** `0x7344`

### 请求示例

```json
{}
```

---

## 6. 控制器发送 finsTCP 通讯连接状态

**命令字：** `0x7345`

### 参数列表

| 参数名 | 类型 | 说明 | 范围 |
|--------|------|------|------|
| status | int | 通讯连接状态 | 范围 [0, 1]，0 表示未连接，1 表示已连接 |

### 响应示例

```json
{
  "status": 0
}
```

---

## 7. 控制器发送 fins 打开的程序名称

**命令字：** `0x7346`

### 参数列表

| 参数名 | 类型 | 说明 |
|--------|------|------|
| programName | string | 打开的程序名称 |

### 响应示例

```json
"AAA"
```
