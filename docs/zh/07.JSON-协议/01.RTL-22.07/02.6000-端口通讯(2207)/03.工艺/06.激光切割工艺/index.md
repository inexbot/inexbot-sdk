# 激光切割工艺

## IO 端口设置

### 0x4401 LASER_IOPORT_SET - IO 端口设置

**说明**：设置激光切割工艺的 IO 端口配置

#### 请求参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| DO_backMiddle | int | 回中 |
| DO_liftUp | int | 上抬 |
| DO_follow | int | 跟随 |
| DO_lightGate | int | 光闸 |
| DO_aspiration | int | 吹气 |
| DOFeedCoolGas | int | 冷却气 |
| DOCleanNozzle | int | 喷嘴清洁 |
| DI_liftUpArrival | int | 停靠到位 |
| DI_backMiddleArrival | int | 回中到位 |
| DI_followArrival | int | 跟随到位 |
| DI_perforateArrival | int | 穿孔到位 |
| DI_laserFault | int | 激光故障 |
| DI_regulatorFault | int | 调高器故障 |
| DI_watercoolerFault | int | 水冷机故障 |
| DI_pressureFault | int | 气压故障 |
| AO_pressure | int | 气压 |
| AO_laserPower | int | 激光功率 |

#### 请求示例

```json
{
  "IO": {
    "DO_backMiddle": 0,
    "DO_liftUp": 0,
    "DO_follow": 0,
    "DO_lightGate": 0,
    "DO_aspiration": 0,
    "DOFeedCoolGas": 0,
    "DOCleanNozzle": 0,
    "DI_liftUpArrival": 0,
    "DI_backMiddleArrival": 0,
    "DI_followArrival": 0,
    "DI_perforateArrival": 0,
    "DI_laserFault": 0,
    "DI_regulatorFault": 0,
    "DI_watercoolerFault": 0,
    "DI_pressureFault": 0,
    "AO_pressure": 0,
    "AO_laserPower": 0
  }
}
```

### 0x4402 LASER_IOPORT_INQUIRE - IO 端口查询

**说明**：查询当前 IO 端口配置

- data：无

### 0x4403 LASER_IOPORT_RESPOND - IO 端口响应

**说明**：控制器返回 IO 端口查询结果

- 返回格式：同0x4401

---

## 全局参数设置

### 0x4404 LASER_EQUIPMENT_SET - 全局参数设置

**说明**：设置激光切割工艺的全局参数

#### equipment 参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| arrivalOutLightMode | int | 到位出光模式：0-到位出光模式，1-直接出光模式 |
| preAspiratedTime | double | 提前送气时间 |
| waitLiftUpTime | double | 等待上抬时间 |
| waitFollowTime | double | 等待跟随时间 |
| RetreatDistance | double | 回退距离 |
| delAspiratedMode | int | 关气模式：0-延后关气，1-提前关气 |
| delAspiratedTime | double | 关气时间 |

#### perforate 参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| time | double | 穿孔时间 |
| pressure | double | 穿孔气压 |
| power | int | 穿孔功率 |
| freq | int | 穿孔频率 |
| dutyRatio | int | 穿孔占空比 |

#### 请求示例

```json
{
  "equipment": {
    "arrivalOutLightMode": 0,
    "preAspiratedTime": 0,
    "waitLiftUpTime": 0,
    "waitFollowTime": 0,
    "RetreatDistance": 0,
    "delAspiratedMode": 0,
    "delAspiratedTime": 0
  },
  "perforate": {
    "time": 0,
    "pressure": 0,
    "power": 0,
    "freq": 0,
    "dutyRatio": 0
  }
}
```

### 0x4405 LASER_EQUIPMENT_INQUIRE - 全局参数查询

**说明**：查询当前全局参数配置

- data：无

### 0x4406 LASER_EQUIPMENT_RESPOND - 全局参数响应

**说明**：控制器返回全局参数查询结果

- 返回格式：同0x4404

---

## 模拟量匹配设置

### 0x4407 LASER_ANALOGMATCH_SET - 模拟量匹配设置

**说明**：设置激光功率和气压的模拟量匹配参数

#### laserPower 参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| x1 | double | x 轴第1个参数 |
| x2 | double | x 轴第2个参数 |
| y1 | double | y 轴第1个参数 |
| y2 | double | y 轴第2个参数 |

#### pressure 参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| x1 | double | x 轴第1个参数 |
| x2 | double | x 轴第2个参数 |
| y1 | double | y 轴第1个参数 |
| y2 | double | y 轴第2个参数 |

#### 请求示例

```json
{
  "analogMatch": {
    "laserPower": {
      "x1": 0,
      "x2": 0,
      "y1": 0,
      "y2": 0
    },
    "pressure": {
      "x1": 0,
      "x2": 0,
      "y1": 0,
      "y2": 0
    }
  }
}
```

### 0x4408 LASER_ANALOGMATCH_INQUIRE - 模拟量匹配查询

**说明**：查询当前模拟量匹配配置

- data：无

### 0x4409 LASER_ANALOGMATCH_RESPOND - 模拟量匹配响应

**说明**：控制器返回模拟量匹配查询结果

#### IO 参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| laserPower | int | 激光功率端口号 |
| pressure | int | 气压端口号 |

#### analogMatch 参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| laserPower | object | 激光功率匹配参数（x1, x2, y1, y2） |
| pressure | object | 气压匹配参数（x1, x2, y1, y2） |

#### 响应示例

```json
{
  "IO": {
    "laserPower": 0,
    "pressure": 0
  },
  "analogMatch": {
    "laserPower": {
      "x1": 0,
      "x2": 0,
      "y1": 0,
      "y2": 0
    },
    "pressure": {
      "x1": 0,
      "x2": 0,
      "y1": 0,
      "y2": 0
    }
  }
}
```

---

## 切割参数设置

### 0x440A LASER_CUTPARM_SET - 切割参数设置

**说明**：设置切割工艺参数

#### 请求参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| num | int | 工艺号 |
| cut.pressure | double | 气压 |
| cut.power | int | 功率 |
| cut.freq | int | 频率 |
| cut.dutyRatio | int | 占空比 |

#### 请求示例

```json
{
  "num": 1,
  "cut": {
    "pressure": 0,
    "power": 0,
    "freq": 0,
    "dutyRatio": 0
  }
}
```

### 0x440B LASER_CUTPARM_INQUIRE - 切割参数查询

**说明**：查询指定工艺号的切割参数

#### 请求参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| num | int | 工艺号 |

#### 请求示例

```json
{
  "num": 1
}
```

### 0x440C LASER_CUTPARM_RESPOND - 切割参数响应

**说明**：控制器返回切割参数查询结果

- 返回格式：同0x440A

---

## 状态查看查询

### 0x440E LASER_STATE_INQUIRE - 状态查询

**说明**：查询激光切割工艺当前状态

- data：无

### 0x440F LASER_STATE_RESPOND - 状态响应

**说明**：控制器返回激光切割工艺当前状态

#### 响应参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| liftUpArrival | bool | 停靠到位 |
| backMiddleArrival | bool | 回中到位 |
| followArrival | bool | 跟随到位 |
| perforateArrival | bool | 穿孔到位 |
| lightGateEnable | bool | 光闸使能 |
| laserFault | bool | 激光故障 |
| regulatorFault | bool | 调高器故障 |
| watercoolerFault | bool | 水冷机故障 |
| pressureFault | bool | 气压故障 |
| currentPressure | double | 当前气压 |
| currentPower | int | 当前功率 |
| currentFreq | int | 当前频率 |
| currentDutyRatio | int | 当前占空比 |

#### 响应示例

```json
{
  "liftUpArrival": false,
  "backMiddleArrival": false,
  "followArrival": false,
  "perforateArrival": false,
  "lightGateEnable": false,
  "laserFault": false,
  "regulatorFault": false,
  "watercoolerFault": false,
  "pressureFault": false,
  "currentPressure": 0,
  "currentPower": 0,
  "currentFreq": 0,
  "currentDutyRatio": 0
}
```

---

## 点射参数设置

### 0x4410 LASER_SHOTPARM_SET - 点射参数设置

**说明**：设置点射参数

#### 请求参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| shotPower | int | 点射功率 |
| shotTime | double | 点射时间，取值范围为0-1 |

#### 请求示例

```json
{
  "shotPower": 0,
  "shotTime": 0.1
}
```

---

## 手动操作

### 0x4411 LASER_HANDOP_SET - 手动操作设置

**说明**：执行手动操作

#### 请求参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| type | int | 手动操作类型：1-光闸开关，2-点射，3-气体检测，4-上抬，5-回中，6-跟随 |
| value | int | 1为开，0为关（对于点射只有1） |

#### 请求示例

```json
{
  "type": 1,
  "value": 1
}
```

### 0x4412 LASER_HANDOP_INQUIRE - 手动操作状态查询

**说明**：查询手动操作当前状态

- data：无

### 0x4413 LASER_HANDOP_RESPOND - 手动操作状态响应

**说明**：控制器返回手动操作当前状态

#### 响应参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| lightGate | int | 光闸 |
| shotPower | int | 点射功率 |
| shotTime | double | 点射时间 |
| aspiration | int | 气体检测 |
| liftUp | int | 上抬 |
| backMiddle | int | 回中 |
| follow | int | 跟随 |

#### 响应示例

```json
{
  "lightGate": 0,
  "shotPower": 0,
  "shotTime": 0.1,
  "aspiration": 0,
  "liftUp": 0,
  "backMiddle": 0,
  "follow": 0
}
```

---

## 模拟量匹配发送

### 0x4417 LASER_FACTCURVOL_SET - 模拟量发送设置

**说明**：发送模拟量匹配中的值

#### 请求参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| type | int | 发送编号：1-第1个发送，2-第2个发送，3-第3个发送，4-第4个发送 |
| value | double | 发送的值，范围0-10 |

#### 请求示例

```json
{
  "type": 1,
  "value": 5.5
}
```

### 0x4419 LASER_FACTCURVOL_RESPOND - 模拟量发送响应

**说明**：控制器返回模拟量发送设置结果

#### 响应参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| result | int | 1-设置成功，0-设置失败 |

#### 响应示例

```json
{
  "result": 1
}
```

---

## 喷嘴清洁

### 0x4423 LASER_CUT_NOZZLE_CLEAN - 喷嘴清洁

**说明**：控制喷嘴清洁功能

#### 请求参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| cleanNozzleTime | int | 清洁时间（ms），发送大于0的数打开，运行设定秒数后自动关闭 |

#### 请求示例

```json
{
  "cleanNozzleTime": 0
}
```

---

## 冷却气控制

### 0x4422 LASER_CUT_FEED_COOL_GAS - 冷却气控制

**说明**：控制冷却气开关

#### 请求参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| feedCoolGas | int | 1-打开，0-关闭 |

#### 请求示例

```json
{
  "feedCoolGas": 0
}
```
