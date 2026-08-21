# 参数设置

## 1. 机器人类型

**说明：** 查询当前机器人类型

### 上位机查询机器人类型

- **命令字：** `0x2000`

```json
{}
```

### 控制器回复机器人类型

- **命令字：** `0x2001`

| 参数 | 类型 | 说明 |
|------|------|------|
| type | int | 机器人类型编号，取值范围[0,35] |

```json
{
  "type": 0
}
```

### 上位机查询可选择的机器人类型

- **命令字：** `0x2005`

```json
{}
```

### 控制器回复可选择的机器人类型

- **命令字：** `0x2006`

| 参数 | 类型 | 说明 |
|------|------|------|
| supportRobotType | array | 支持的机器人类型编号列表，int 类型 |
| supportRobotName | array | 支持的机器人类型名称列表，string 类型；与 `supportRobotType` 按索引对应 |

```json
{
  "supportRobotType": [1, 2, 3, 4],
  "supportRobotName": ["串联六轴", "六轴协作", "scara"]
}
```

### 机器人类型映射表

| 类型值 | 说明 |
|--------|------|
| 0 | 未选择机器人类型 |
| 1 | 六轴串联多关节 |
| 2 | 六轴协作 |
| 3 | 六轴喷涂机器人 |
| 4 | 六轴异型二 |
| 5 | 五轴机器人 |
| 6 | 四轴 SCARA 机器人 |
| 7 | 四轴 SCARA 异型一机器人 |
| 8 | 四轴连杆码垛机器人 |
| 9 | 四轴码垛丝杆机器人 |
| 10 | 四轴机器人 |
| 11 | 四轴直角机器人 |
| 12 | 四轴极坐标异形机器人 |
| 13 | 三轴 SCARA 机器人 |
| 14 | 三轴直角机器人 |
| 15 | 三轴异形一机器人 |
| 16 | 二轴 SCARA 机器人 |
| 17 | 七轴通用机器人 |
| 18 | 一轴机器人 |
| 19 | 五轴龙门焊接机器人 |
| 20 | delta 机器人(四轴并联机器人) |
| 21 | 酒槽机型 |
| 22 | 五轴龙门焊接机器人类型2 |
| 23 | 四轴直角异型一机器人 |
| 24 | 六轴龙门焊接机器人 |
| 25 | 五轴混动机器人 |
| 26 | 四轴 SCARA 异型2 |
| 27 | 六轴异型三 |
| 28 | 三轴 SCARA 异型1 |
| 29 | delta2D 并联机器人模型 |
| 30 | 五轴龙门焊接机器人类型3 |
| 31 | 三轴串联异形一 |
| 32 | 五轴协作机器人 |
| 33 | 四轴 SCARA 异型三机器人 |
| 34 | 六轴串联-CBBARA |
| 35 | 高格立柱旋转四轴 |

---

## 2. 机器人类型及映射

**说明：** 全部机器人类型及伺服映射的查询与设置

### 上位机设置机器人类型及映射

- **命令字：** `0x2002`

| 参数 | 类型 | 说明 |
|------|------|------|
| robot | array | 机器人参数列表 |
| robot.Num | int | 机器人编号 |
| robot.servoMap | array | 伺服映射列表，int 类型，长度为机器人轴数 |
| sum | int | 机器人总数 |
| syncAxis | array | 外部轴参数列表 |
| syncAxis.syncAxisSlave | array | 外部轴伺服类型，int 类型 |
| syncAxisSum | int | 外部轴总数 |

```json
{
  "robot": [
    {
      "Num": 0,
      "servoMap": [0, 0, 0, 0, 0, 0]
    },
    {
      "Num": 1,
      "servoMap": [0, 0, 0, 0, 0, 0]
    }
  ],
  "sum": 1,
  "syncAxis": [
    {
      "syncAxisSlave": [0]
    },
    {
      "syncAxisSlave": [0, 0, 0]
    },
    {
      "syncAxisSlave": [0]
    }
  ],
  "syncAxisSum": 3
}
```

### 上位机查询机器人类型及映射

- **命令字：** `0x2003`

> 无请求参数

```json
{}
```

### 控制器回复机器人类型及映射

- **命令字：** `0x2004`

| 参数 | 类型 | 说明 |
|------|------|------|
| robot | array | 机器人参数列表 |
| robot.robotType | int | 机器人类型编号 |
| robot.servoMap | array | 伺服映射列表，int 类型，长度为对应机器人的轴数 |
| servoSum | int | 伺服总数 |
| sum | int | 机器人总数，范围[1,4] |
| syncAxis | array | 外部轴参数列表 |
| syncAxis.syncAxisSlave | array | 外部轴伺服映射列表，int 类型 |
| syncAxisSum | int | 外部轴总数 |

```json
{
  "robot": [
    {
      "robotType": 18,
      "servoMap": [0, 0, 0, 0]
    },
    {
      "robotType": 18,
      "servoMap": [0, 0, 0, 0]
    }
  ],
  "servoSum": 0,
  "sum": 2,
  "syncAxis": [
    {
      "syncAxisSlave": [0]
    },
    {
      "syncAxisSlave": [0]
    }
  ],
  "syncAxisSum": 2
}
```

---

## 3. 所有机器人类型

**说明：** 所有机器人类型的设置与查询

### 上位机设置所有机器人类型

- **命令字：** `0x2007`

| 参数 | 类型 | 说明 |
|------|------|------|
| robotSum | int | 机器人总数，范围[1,4] |
| note |  array | 注释 |
| robotType | array | 各个机器人的类型，int 数组，元素个数最大为4 |
| robotSecondType | array | 龙门类型的细分，int 数组；当机器人类型为龙门时说明具体是哪种龙门，否则无意义 |

```json
{
  "robotSum": 4,
  "note": ["","","",""],
  "robotType": [0, 1, 2, 3],
  "robotSecondType": [2, 3, 4, 5]
}
```

### 上位机查询所有机器人类型

- **命令字：** `0x2008`

> 无请求参数

```json
{}
```

### 控制器回复所有机器人类型

- **命令字：** `0x2009`

> 回复参数同设置参数一致。

```json
{
  "robotSum": 4,
  "note": ["","","",""],
  "robotType": [0, 1, 2, 3],
  "robotSecondType": [2, 3, 4, 5]
}
```

---

## 4. 从站配置

**说明：** 外部轴（从站）伺服映射的设置与查询

### 上位机设置从站配置

- **命令字：** `0x200A`

| 参数 | 类型 | 说明 |
|------|------|------|
| syncAxis | array | 外部轴参数列表 |
| syncAxis.syncAxisSlave | array | 外部轴伺服映射列表，int 类型 |
| syncAxisSum | int | 外部轴总数 |

```json
{
  "syncAxis": [
    {
      "syncAxisSlave": [0, 0]
    }
  ],
  "syncAxisSum": 1
}
```

### 上位机查询从站配置

- **命令字：** `0x200B`

> 无请求参数

```json
{}
```

### 控制器回复从站配置

- **命令字：** `0x200C`

> 回复参数同设置参数一致。

```json
{
  "syncAxis": [
    {
      "syncAxisSlave": [0, 0]
    }
  ],
  "syncAxisSum": 1
}
```

---

## 5. 机器人数目

**说明：** 查询机器人数目

### 上位机查询机器人数目

- **命令字：** `0x2010`

```json
{}
```

### 控制器回复机器人数目

- **命令字：** `0x2011`

| 参数 | 类型 | 说明 |
|------|------|------|
| sum | int | 机器人数目，范围[1,4] |

```json
{
  "sum": 1
}
```

---

## 6. 机器人通讯周期

**说明：** 机器人通讯周期、波特率、伺服控制字、丢帧容差参数的设置与查询。其中波特率、伺服控制字、丢帧容差在 canopen 通讯时起作用，控制器重启生效

### 上位机设置机器人通讯周期

- **命令字：** `0x2020`

| 参数 | 类型 | 说明 |
|------|------|------|
| baudRate | string | 波特率，取值："10K","20K","50K","100K","500K","800K","1000K" |
| controlCycle | int | 通讯周期，取值范围：1,2,4,8 ms |
| control_word | int | 伺服控制字，取值范围[7,8] |
| pdo_lost_tolerance | int | 丢帧容差，取值范围[1,5] |

```json
{
  "baudRate":"500K",
  "controlCycle":1,
  "control_word":7,
  "pdo_lost_tolerance":2
}
```

### 上位机查询机器人通讯周期

- **命令字：** `0x2021`

```json
{}
```

### 控制器回复机器人通讯周期

- **命令字：** `0x2022`

| 参数 | 类型 | 说明 |
|------|------|------|
| baudRate | string | 波特率，范围："10K","20K","50K","100K","500K","800K","1000K" |
| busType | int | 通讯方式，范围1,16；1为 EtherCAT 通讯，16为 CanOpen 通讯 |
| controlCycle | int | 通讯周期，范围1,2,4,8 ms |
| control_word | int | 伺服控制字，范围[7,8] |
| pdo_lost_tolerance | int | 丢帧容差，范围[1,5] |

```json
{
  "baudRate":"500K",
  "busType":1,
  "controlCycle":1,
  "control_word":7,
  "pdo_lost_tolerance":2
}
```

---

## 7. 机器人同步轴

**说明：** 机器人外部轴参数设置与查询

### 上位机设置机器人同步轴

- **命令字：** `0x2030`
| 参数 | 类型 | 说明 |
|------|------|------|
| externAxisGroupSum | int | 外部轴数目 |
| externAxisGroupType | array | 外部轴类型列表，int 类型 |
| note | array | 注释列表，string 类型 |

**externAxisGroupType 类型说明：**
//todo

```json
{
  "externAxisGroupSum": 1,
  "externAxisGroupType": [0, 1, 2, 3, 4, 5, 6],
  "note": ["note1", "note2"]
}
```

### 上位机查询机器人同步轴

- **命令字：** `0x2031`

> 无请求参数

```json
{}
```

### 控制器回复机器人同步轴

- **命令字：** `0x2032`（EXTTYPE_AXISMAP_RESPOND）

> 回复参数同设置参数一致。

```json
{
  "externAxisGroupSum": 1,
  "externAxisGroupType": [0, 1, 2, 3, 4, 5, 6],
  "note": ["note1", "note2"]
}
```

---

## 8. 机器人轴组组合

**说明：** 存在多个机器人时，不能共用同一个外部轴组

### 上位机设置机器人轴组组合

- **命令字：** `0x2040`

| 参数 | 类型 | 说明 |
|------|------|------|
| binding | array | 轴组组合列表，长度为机器人数量 |

**binding 子对象参数：**

| 参数 | 类型 | 说明 |
|------|------|------|
| note | string | 注释 |
| extGroupSum | int | 机器人绑定外部轴组数量，范围[0,3] |
| extGroupNum | array | 外部轴组绑定列表，长度为3，范围为0~已设置的同步轴数 |

```json
{
  "binding":
  [
    {
      "extGroupNum":[1,2,0],
      "extGroupSum":2,
      "note":""
    },
    {
      "extGroupNum":[0,0,0],
      "extGroupSum":0,
      "note":""
    },
  ],
}
```

### 上位机查询机器人轴组组合

- **命令字：** `0x2041`

```json
{}
```

### 控制器回复机器人轴组组合

- **命令字：** `0x2042`

| 参数 | 类型 | 说明 |
|------|------|------|
| sum | int | 机器人数量，范围[1,4] |
| binding | array | 轴组组合列表 |

**binding 子对象参数：**

| 参数 | 类型 | 说明 |
|------|------|------|
| note | string | 注释 |
| extGroupSum | int | 机器人绑定外部轴组数量，范围[0,3] |
| extGroupNum | array | 外部轴组绑定列表，长度为绑定外部轴组数量，最小为1，范围为0~已设置的同步轴数 |

```json
{
  "binding":
  [
    {
      "extGroupNum":[1,2],
      "extGroupSum":2,
      "note":""
    },
    {
      "extGroupNum":[0],
      "extGroupSum":0,
      "note":""
    },
  ],
  "sum":2
}
```

---

## 9. 机器人轴从动轴配置

**说明：** 机器人或外部轴关节从动轴配置设置与查询

### 上位机设置机器人从动轴配置

- **命令字：** `0x2050`

| 参数 | 类型 | 说明 |
|------|------|------|
| robot | array | 从动轴配置参数总列表，长度为机器人数量 |

**robot 子对象参数：**

| 参数 | 类型 | 说明 |
|------|------|------|
| sum | int | 从动轴个数，范围[0,3] |
| data | array | 从动轴配置参数列表，长度为当前机器人的轴数 |

**data 子对象参数：**

| 参数 | 类型 | 说明 |
|------|------|------|
| dir | int | 相对主电机方向，范围[-1,1] |
| encoder | int | 编码器位数，范围[1,32] |
| num | int | 伺服映射 |
| reducRatio | double | 减速比，范围[0,500] |

```json
{
  "robot":
  [
    [
      {
        "data":
        [
          {
            "dir":-1,
            "encoder":8,
            "num":0,
            "reducRatio":2.0
          },
          {
            "dir":1,
            "encoder":9,
            "num":0,
            "reducRatio":3.0
          },
        ],
        "sum":2
      },
      {
        "data":
        [
          {
            "dir":-1,
            "encoder":8,
            "num":0,
            "reducRatio":2.0
          },
        ],
        "sum":1
      },
      {
        "sum":0
      },
      {
        "sum":0
      },
      {
        "sum":0
      },
      {
        "sum":0
      }
    ],
    [
      {
        "data":
        [
          {
            "dir":-1,
            "encoder":8,
            "num":0,
            "reducRatio":2.0
          },
        ],
        "sum":1
      },
      {
        "sum":0
      },
      {
        "sum":0
      },
      {
        "sum":0
      },
      {
        "sum":0
      },
      {
        "sum":0
      }
    ]
  ]
}
```

### 上位机查询机器人从动轴配置

- **命令字：** `0x2051`

```json
{}
```

### 控制器回复机器人从动轴配置

- **命令字：** `0x2052`

```json
{
  "robot":
  [
    [
      {
        "data":
        [
          {
            "dir":-1,
            "encoder":8,
            "num":0,
            "reducRatio":2.0
          }
        ],
        "sum":1
      },
      {
        "sum":0
      },
      {
        "sum":0
      },
      {
        "sum":0
      },
      {
        "sum":0
      },
      {
        "sum":0
      }
    ]
  ]
}
```

### 上位机设置机器人外部轴从动轴配置

- **命令字：** `0x2053`

| 参数 | 类型 | 说明 |
|------|------|------|
| external | array | 外部轴从动轴配置参数总列表，长度为外部轴数量 |

```json
{
  "external":
  [
    [
      {
        "data":
        [
          {
            "dir":1,
            "encoder":3,
            "num":0,
            "reducRatio":1.0
          }
        ],
        "sum":1
      }
    ],
    [
      {
        "sum":0
      },
      {
        "sum":0
      }
    ]
  ]
}
```

### 上位机查询机器人外部轴从动轴配置

- **命令字：** `0x2054`

```json
{}
```

### 控制器回复机器人外部轴从动轴配置

- **命令字：** `0x2055`

```json
{
  "external":
  [
    [
      {
        "data":
        [
          {
            "dir":1,
            "encoder":3,
            "num":0,
            "reducRatio":1.0
          }
        ],
        "sum":1
      }
    ],
    [
      {
        "sum":0
      },
      {
        "sum":0
      }
    ]
  ]
}
```

---

## 10. 机器人运行时间

**说明：** 查询当前机器人主程序运行时间

### 上位机查询机器人主程序运行时间

- **命令字：** `0x2060`

| 参数 | 类型 | 说明 |
|------|------|------|
| robot | int | 要查询的机器人，取值范围[1,4] |

```json
{
  "robot":1
}
```

### 控制器回复机器人主程序运行时间

- **命令字：** `0x2055`

| 参数 | 类型 | 说明 |
|------|------|------|
| robot | int | 当前机器人号，范围[1,4] |
| time | int | 运行时间，单位 s |

```json
{
  "robot":1,
  "time":10
}
```

---

## 11. 复制机器人参数

**说明：** 将机器人参数复制到另一个机器人上。参数可以复制到除本机的多个机器人上，与参数机型不一致的机器人会复制失败

### 上位机复制机器人参数

- **命令字：** `0x2062`

| 参数 | 类型 | 说明 |
|------|------|------|
| mainRobot | int | 复制参数的机器人号 |
| copyToRobot | array | 参数复制到机器人列表，bool 类型，长度为4；true 为进行复制，false 为不进行复制 |

```json
{
  "copyToRobot":[false,true,false,false],
  "mainRobot":1
}
```

---

## 12. 协作机器人

**说明：** 协作机器人相关参数的设置与查询，包含双机协作、防抱闸压紧等功能

### 上位机设置双机协作模式

- **命令字：** `0x2070`

| 参数 | 类型 | 说明 |
|------|------|------|
| cooperationRobots | bool | 是否启用双机同步模式，true 为启用，false 为不启用 |

```json
{
  "cooperationRobots":true
}
```

### 上位机查询双机协作模式

- **命令字：** `0x2071`

```json
{}
```

### 控制器回复双机协作模式

- **命令字：** `0x2072`

```json
{
  "cooperationRobots":true
}
```

### 上位机设置防抱闸压紧使能

- **命令字：** `0x2073`

| 参数 | 类型 | 说明 |
|------|------|------|
| enable | bool | 防抱闸压紧使能开关，true 为开启，false 为关闭 |

```json
{
  "enable":true
}
```

### 上位机查询防抱闸压紧使能

- **命令字：** `0x2074`

```json
{}
```

### 控制器回复防抱闸压紧使能

- **命令字：** `0x2075`

```json
{
  "enable":true
}
```

### 上位机设置防抱闸压紧延时

- **命令字：** `0x2076`

| 参数 | 类型 | 说明 |
|------|------|------|
| enableDelay | double | 防抱闸压紧使能延时，单位 s，范围[0,99999.99] |
| brakeOnDelay | double | 开抱闸延时，单位 s，范围[0,99999.99] |
| brakeOffDelay | double | 抱闸关闭后延时，单位 s，范围[0,99999.99] |

```json
{
  "enableDelay":0.5,
  "brakeOnDelay":0.5,
  "brakeOffDelay":0.5
}
```

### 上位机查询防抱闸压紧延时

- **命令字：** `0x2077`

```json
{}
```

### 控制器回复防抱闸压紧延时

- **命令字：** `0x2078`

```json
{
  "enableDelay":0.5,
  "brakeOnDelay":0.5,
  "brakeOffDelay":0.5
}
```

### 上位机设置抱闸参数

- **命令字：** `0x2079`

| 参数 | 类型 | 说明 |
|------|------|------|
| jointNum | int | 当前设置的关节号，范围[1,6] |
| EncodeNum | int | 编码器个数，范围[1,2]；抱闸类型为插销式时生效 |
| Encode1Resolusion | int | 编码器1位数，范围[0,99999]；抱闸类型为插销式时生效 |
| Encode2Resolusion | int | 编码器2位数，范围[0,99999]；抱闸类型为插销式且编码器个数为2时生效；编码器个数为1时需设置为0 |
| BrakeType | int | 抱闸类型，范围[1,2]；1为插销式，2为刹片式 |
| Distance | double | 运动距离，范围[0,99999.99]；抱闸类型为刹片式时需设置为0 |
| CheckDistance | double | 检测距离，范围[0,99999.99]；抱闸类型为插销式且防抱闸压紧使能开启时生效 |
| CheckTorq | double | 检测力矩，范围[0,99999.99]；抱闸类型为插销式且防抱闸压紧使能开启时生效 |

```json
{
  "BrakeType":2,
  "CheckDistance":0.0,
  "CheckTorq":0.0,
  "Distance":0,
  "Encode1Resolusion":17,
  "Encode2Resolusion":0,
  "EncodeNum":1,
  "jointNum":1
}
```

### 上位机查询抱闸参数

- **命令字：** `0x207A`

| 参数 | 类型 | 说明 |
|------|------|------|
| jointNum | int | 查询的关节抱闸参数，范围[1,6] |

```json
{
  "jointNum":1
}
```

### 控制器回复抱闸参数

- **命令字：** `0x2079`

```json
{
  "BrakeType":2,
  "CheckDistance":0.0,
  "CheckTorq":0.0,
  "Distance":0,
  "Encode1Resolusion":17,
  "Encode2Resolusion":0,
  "EncodeNum":1,
  "jointNum":1
}
```

### 上位机查询静态力矩

- **命令字：** `0x207C`

```json
{}
```

### 控制器回复静态力矩

- **命令字：** `0x207D`

| 参数 | 类型 | 说明 |
|------|------|------|
| torq | array | 静态力矩列表，double 类型，长度为6 |

```json
{
    "torq":[0.0,0.0,0.0,0.0,0.0,0.0]
}
```

### 上位机设置协作机器人个数

- **命令字：** `0x207E`

| 参数 | 类型 | 说明 |
|------|------|------|
| cooperativeRobot | int | 协作机器人个数，范围[0,4]；0时表示无协作机器人 |

```json
{
  "cooperativeRobot":1
}
```

### 上位机查询协作机器人个数

- **命令字：** `0x207F`

```json
{}
```

### 控制器回复协作机器人个数

- **命令字：** `0x2080`

```json
{
  "cooperativeRobot":1
}
```

---

## 13. 外部轴参数

**说明：** 外部轴相关参数的设置与查询，包含零点、关节参数、点动速度等

### 上位机设置外部轴零点/清多圈值

- **命令字：** `0x20A0`

| 参数 | 类型 | 说明 |
|------|------|------|
| robot | int | 当前机器人号，范围[1,4] |
| axis | int | 外部轴轴号，范围[0,5]；0时为设置全部轴 |
| clearEncoder | bool | 是否清除多圈值 |

```json
{
  "robot": 1,
  "axis": 1,
  "clearEncoder": false
}
```

### 控制器回复外部轴零点设置/清多圈值结果

- **命令字：** `0x20A1`

| 参数 | 类型 | 说明 |
|------|------|------|
| robot | int | 当前机器人号，范围[1,4] |
| axis | int | 外部轴轴号，范围[0,5] |
| result | int | 标零/清多圈值结果；0为失败，1为成功 |

```json
{
  "robot": 1,
  "axis": 1,
  "result": 0
}
```

### 上位机设置外部轴零点偏移

- **命令字：** `0x20A2`

| 参数 | 类型 | 说明 |
|------|------|------|
| robot | int | 当前机器人号，范围[1,4] |
| axis | int | 外部轴轴号，范围[0,5]；0时为设置全部轴 |
| offset | array | 轴零点偏移值列表，double 类型，长度为5；当外部轴轴号非0时，仅对应位置有值，其他轴都该为0 |

```json
{
  "axis":1,
  "offset":[6.0,0,0,0,0],
  "robot":1
}
```

### 上位机设置外部轴单圈值

- **命令字：** `0x20A3`

| 参数 | 类型 | 说明 |
|------|------|------|
| robot | int | 当前机器人号，范围[1,4] |
| axis | int | 当前轴号，范围[1,5] |
| singleEncoder | int | 单圈值数值，范围[0,999999999] |

```json
{
  "robot": 1,
  "axis": 1,
  "singleEncoder": 0
}
```

### 上位机查询外部轴单圈值

- **命令字：** `0x20A4`

| 参数 | 类型 | 说明 |
|------|------|------|
| robot | int | 当前机器人号，范围[1,4] |
| axis | int | 当前轴号，范围[1,5] |

```json
{
  "robot": 1,
  "axis": 1
}
```

### 控制器回复外部轴单圈值

- **命令字：** `0x20A5`

| 参数 | 类型 | 说明 |
|------|------|------|
| robot | int | 当前机器人号，范围[1,4] |
| axis | int | 当前轴号，范围[1,5] |
| singleEncoder | int | 单圈值数值，范围[0,999999999] |

```json
{
  "robot": 1,
  "axis": 1,
  "singleEncoder": 0
}
```

### 上位机设置外部轴关节参数

- **命令字：** `0x20A6`

| 参数 | 类型 | 说明 |
|------|------|------|
| externJointNum | int | 外部轴关节号 |
| externJointParam | object | 外部轴关节参数对象 |
| externJointParam.maxPos | double | 正限位，单位：度或毫米 |
| externJointParam.minPos | double | 反限位，单位：度或毫米 |
| externJointParam.reduceRatio | double | 硬件减速比，范围(0,1000]（开关关闭时按 1 计算） |
| externJointParam.reduceRatioEnable | bool | 硬件减速比开关 |
| externJointParam.encoderResolution | string | 编码器位数（可切换为编码器单圈值 * inc；通讯协议中 0 表示"位"，1 表示"inc"） |
| externJointParam.encodeResolutionUnit | int | 编码器单位，范围[0,1] |
| externJointParam.ratedRotSpeed | double | 额定正转速，单位：转/分（可切换为度或毫米/秒） |
| externJointParam.maxRotSpeed | double | 最大正转速 |
| externJointParam.maxAcc | double | 最大加速度 |
| externJointParam.maxDec | double | 最大减速度 |
| externJointParam.maxAccJerk | double | 最大加加速度 |
| externJointParam.maxDecJerk | double | 最大减减速度 |
| externJointParam.angleToDistance | double | 角度距离转换比（可切换为距离角度转换比，两者乘积为 1） |
| externJointParam.reverseClearance | double | 机械间隙，单位：度或毫米 |
| externJointParam.motorDirection | int | 电机方向（原模型方向），范围[-1,1] |
| externJointParam.axisDirection | int | 关节方向（原关节实际方向），范围[-1,1] |

```json
{
  "externJointNum": 1,
  "externJointParam": {
    "maxPos": 180.0,
    "minPos": -180.0,
    "reduceRatio": 100.0,
    "reduceRatioEnable": true,
    "encoderResolution": "17",
    "encodeResolutionUnit": 0,
    "ratedRotSpeed": 3000,
    "maxRotSpeed": 1.0,
    "maxAcc": 1.0,
    "maxDec": -1.0,
    "maxAccJerk": 1.0,
    "maxDecJerk": -1.0,
    "angleToDistance": 1,
    "reverseClearance": 0.0,
    "motorDirection": 1,
    "axisDirection": 1
  }
}
```

### 上位机查询外部轴关节参数

- **命令字：** `0x20A7`

| 参数 | 类型 | 说明 |
|------|------|------|
| externJointNum | int | 外部轴关节号 |

```json
{
  "externJointNum": 1
}
```

### 控制器回复外部轴关节参数

- **命令字：** `0x20A8`
> 回复参数同设置参数一致。

```json
{
  "externJointNum": 1,
  "externJointParam": {
    "maxPos": 180.0,
    "minPos": -180.0,
    "reduceRatio": 100.0,
    "reduceRatioEnable": true,
    "encoderResolution": 17,
    "encodeResolutionUnit": 0,
    "ratedRotSpeed": 3000,
    "maxRotSpeed": 1.0,
    "maxAcc": 1.0,
    "maxDec": -1.0,
    "maxAccJerk": 1.0,
    "maxDecJerk": -1.0,
    "angleToDistance": 1,
    "reverseClearance": 0.0,
    "motorDirection": 1,
    "axisDirection": 1
  }
}
```

### 上位机设置外部轴关节点动速度

- **命令字：** `0x20A9`

| 参数 | 类型 | 说明 |
|------|------|------|
| robot | int | 当前机器人号，范围[1,4] |
| externalGroupNum | int | 外部轴组号，范围[1,3] |
| isNotInsideRobot | bool | 当前控制对象是否为外部设备；非 ide 可不发 |
| externalJogParameter | array | 关节点动速度列表，长度为当前外部轴轴数 |

**externalJogParameter 子对象参数：**

| 参数 | 类型 | 说明 |
|------|------|------|
| maxAcc | double | 关节轴点动加速度，范围[1,1000]°/s^2 |
| maxSpeed | double | 关节轴最大点动速度，范围[1,100]°/s |

```json
{
  "externalGroupNum":1,
  "externalJogParameter":
  [
    {
      "maxAcc":800.0,
      "maxSpeed":40.0
    }
  ],
  "isNotInsideRobot":false,
  "robot":1
}
```

### 上位机查询外部轴关节点动速度

- **命令字：** `0x20AA`

| 参数 | 类型 | 说明 |
|------|------|------|
| robot | int | 当前机器人号，范围[1,4] |
| externalGroupNum | int | 轴组组合的组号 |
| isNotInsideRobot | bool | 当前控制对象是否为外部设备；非 ide 可不发 |

```json
{
  "externalGroupNum":1,
  "isNotInsideRobot":false,
  "robot":1
}
```

### 控制器回复外部轴关节点动速度

- **命令字：** `0x20AB`

```json
{
  "externalGroupNum":1,
  "externalJogParameter":
  [
    {
      "maxAcc":800.0,
      "maxSpeed":40.0
    }
  ],
  "isNotInsideRobot":false,
  "robot":1
}
```

### 上位机查询外部轴单轴标定结果点位

- **命令字：** `0x20AC`

| 参数 | 类型 | 说明 |
|------|------|------|
| syncPositionerNum | int | 外部轴号，范围[1,3] |
| coordNum | int | 外部轴的坐标系标号，取值范围[0,3] |

```json
{
  "syncPositionerNum":1,
  "coordNum":1
}
```

### 控制器回复外部轴单轴标定结果点位

- **命令字：** `0x20AD`

| 参数 | 类型 | 说明 |
|------|------|------|
| syncPositionerNum | int | 外部轴号，范围[1,3] |
| coordNum | int | 外部轴的坐标系标号，取值范围[0,3] |
| pos | array | 点位数据，double 数组，长度为6 |

```json
{
  "syncPositionerNum":1,
  "coordNum":1,
  "pos":[0,0,0,0,0,0]
}
```
