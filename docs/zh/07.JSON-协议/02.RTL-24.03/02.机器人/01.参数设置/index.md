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
| sum | int | 机器人数目，取值范围[1,4] |
| robot | array | 机器人参数列表，包含机器人类型、伺服映射、注释 |

```json
{
  "robot":
  [
    {
      "note":"",
      "robotType":"R_GENERAL_7S",
      "servoMap":[0,0,0,0,0,0,0]
    },
    {
      "note":"",
      "robotType":"R_GENERAL_5S",
      "servoMap":[0,0,0,0,0]
    },
    {
      "note":"",
      "robotType":"R_GENERAL_6S",
      "servoMap":[0,0,0,0,0,0]
    }
  ],
  "sum":3
}
```

**robot 子对象参数：**

| 参数 | 类型 | 说明 |
|------|------|------|
| robotType | string | 机器人类型标识 |
| servoMap | array | 伺服映射列表，int 类型，长度为机器人轴数 |
| note | string | 注释 |

**robotType 类型映射表：**

| 类型标识 | 说明 |
|----------|------|
| R_NULL | 未选择机器人类型 |
| R_GENERAL_6S | 六轴串联多关节 |
| R_GENERAL_6S_1 | 六轴协作 |
| R_SIXAXIS_SPRAY_BBR | 六轴喷涂机器人 |
| R_GENERAL_6S_2 | 六轴异型二 |
| R_GENERAL_5S | 五轴机器人 |
| R_SCARA | 四轴 SCARA 机器人 |
| R_SCARA_1 | 四轴 SCARA 异型一机器人 |
| R_FOURAXIS_PALLET | 四轴连杆码垛机器人 |
| R_FOURAXIS_PALLET_1 | 四轴码垛丝杆机器人 |
| R_FOURAXIS | 四轴机器人 |
| R_FOUR_CARTESIAN_COORDINATE | 四轴直角机器人 |
| R_FOUR_POLAR_COORDINATE_1 | 四轴极坐标异形机器人 |
| R_SCARA_THREEAXIS | 三轴 SCARA 机器人 |
| R_THREE_CARTESIAN_COORDINATE | 三轴直角机器人 |
| R_THREE_CARTESIAN_COORDINATE_1 | 三轴异形一机器人 |
| R_SCARA_TWOAXIS | 二轴 SCARA 机器人 |
| R_GENERAL_7S | 七轴通用机器人 |
| R_GENERAL_1S | 一轴机器人 |
| R_GANTRY_WELD | 五轴龙门焊接机器人 |
| R_DELTA | delta 机器人(四轴并联机器人) |
| R_WINE_CHAMFER | 酒槽机型 |
| R_GANTRY_WELD_2 | 五轴龙门焊接机器人类型2 |
| R_FOUR_CARTESIAN_COORDINATE_1 | 四轴直角异型一机器人 |
| R_GANTRY_WELD_6 | 六轴龙门焊接机器人 |
| FIVE_AXLE_MIXED | 五轴混动机器人 |
| R_SCARA_FOURAXIS_2 | 四轴 SCARA 异型2 |
| R_SIX_AXLE_ABNORMITY_3 | 六轴异型三 |
| R_SCARA_THREEAXIS_1 | 三轴 SCARA 异型1 |
| R_DELTA_2D_ | delta2D 并联机器人模型 |
| R_GANTRY_WELD_3 | 五轴龙门焊接机器人类型3 |
| R_GENERAL_3S_1 | 三轴串联异形一 |
| R_GENERAL_5S_COLLABORATIVE_ | 五轴协作机器人 |
| R_SCARA_3_ | 四轴 SCARA 异型三机器人 |
| R_GENERAL_6S_CBBARA_ | 六轴串联-CBBARA |
| R_HEAVY_DUTY_FOUR_AXIS_ | 高格立柱旋转四轴 |

### 上位机查询机器人类型及映射

- **命令字：** `0x2003`

```json
{}
```

### 控制器回复机器人类型及映射

- **命令字：** `0x2004`

| 参数 | 类型 | 说明 |
|------|------|------|
| sum | int | 机器人数目，范围[1,4] |
| servoSum | int | 伺服个数 |
| robot | array | 机器人参数列表 |

```json
{
  "robot":
  [
    {
      "note":"",
      "robotType":"R_GENERAL_7S",
      "servoMap":[0,0,0,0,0,0,0]
    },
    {
      "note":"",
      "robotType":"R_GENERAL_5S",
      "servoMap":[0,0,0,0,0]
    },
    {
      "note":"",
      "robotType":"R_GENERAL_6S",
      "servoMap":[0,0,0,0,0,0]
    }
  ],
  "servoSum":0,
  "sum":3
}
```

---

## 3. 机器人数目

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

## 4. 机器人通讯周期

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
| busType | int | 通讯方式，范围1,16；1为 etherCat 通讯，16为 CanOpen 通讯 |
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

## 5. 机器人同步轴

**说明：** 机器人外部轴参数设置与查询

### 上位机设置机器人同步轴

- **命令字：** `0x2030`

| 参数 | 类型 | 说明 |
|------|------|------|
| sum | int | 外部轴组数，范围[0,12] |
| extGroup | array | 外部轴参数列表，包含外部轴类型、伺服映射、注释 |

**extGroup 子对象参数：**

| 参数 | 类型 | 说明 |
|------|------|------|
| groupType | int | 外部轴类型，范围[0,5] |
| servoMap | array | 伺服映射列表，int 类型，长度为3 |
| note | string | 注释 |

**groupType 类型说明：**

| 类型值 | 说明 |
|--------|------|
| 0 | 无外部轴 |
| 1 | 旋转单轴 |
| 2 | 旋转双轴 |
| 3 | 直线单轴 |
| 4 | 直线双轴 |
| 5 | 直线三轴 |

```json
{
  "extGroup":
  [
    {
      "note":"",
      "groupType":1,
      "servoMap":[0,0,0]
    },
  ],
  "sum":1
}
```

### 上位机查询机器人同步轴

- **命令字：** `0x2031`

```json
{}
```

### 控制器回复机器人同步轴

- **命令字：** `0x2032`

| 参数 | 类型 | 说明 |
|------|------|------|
| sum | int | 外部轴组数，范围[0,12] |
| servoSum | int | 伺服个数 |
| extGroup | array | 外部轴参数列表 |

```json
{
  "extGroup":
  [
    {
      "note":"",
      "groupType":1,
      "servoMap":[0,0,0]
    },
  ],
  "servoSum":0,
  "sum":1
}
```

---

## 6. 机器人轴组组合

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

## 7. 机器人轴从动轴配置

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

## 8. 机器人运行时间

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

## 9. 复制机器人参数

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

## 10. 协作机器人

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

## 11. 外部轴参数

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
| robot | int | 当前机器人号，范围[1,4] |
| isNotInsideRobot | bool | 当前控制对象是否为外部设备；非 ide 可不发 |
| externalGroupNum | int | 外部轴组号，范围[1,3]；该参数最大为当前机器人绑定的外部轴数量；当"isNotInsideRobot"为 true 时，该参数表示总编号 |
| joint | array | 关节参数列表，长度为当前外部轴的轴数 |

**joint 子对象参数：**

| 参数 | 类型 | 说明 |
|------|------|------|
| backLash | double | 齿轮反向间隙，范围[0,10]；该功能还需完善，建议填写0.0 |
| direction | int | 模型方向，范围[1,-1]；1为正方向，-1为负方向 |
| encoderResolution | int | 编码器位数，范围[1,100] |
| maxAcc | double | 关节最大加速度，范围[1,10000] |
| maxDec | double | 关节最大减速度，范围[-10000,-1] |
| maxJerkAcc | double | 最大加加速度，范围[1,20000]；机器人插补方式为加加速度时生效 |
| maxJerkDec | double | 最大减减速度，范围[-20000,-1]；机器人插补方式为加加速度时生效 |
| maxRPM | double | 最大正转速，范围[1,5] |
| maxReverseRPM | double | 最大反转速，范围[-5,-1] |
| positiveLimit | double | 关节正限位，范围[1,3000]°；值100000000表示不限速 |
| ratedRPM | double | 额定正转速，范围[1,10000]rpm |
| ratedReverseRPM | double | 额定反转速，范围[-10000,-1]rpm；数值为额定正速度的负值 |
| ratedReverseSpeed | double | 关节额定反速度，单位°/s；旋转外部轴公式：额定反速度 / 关节减速比 * 6；直线外部轴公式：方向转换比 * (额定反速度 / 关节减速比 * 6) / 360 |
| ratedSpeed | double | 关节额定正速度，单位°/s；旋转外部轴公式：额定正速度 / 关节减速比 * 6；直线外部轴公式：方向转换比 * (额定正速度 / 关节减速比 * 6) / 360 |
| reducRatio | double | 关节减速比，范围(0,1000] |
| reverseLimit | double | 关节反限位，范围[-3000,-1]°；值100000000表示不限速 |

```json
{
  "externalGroupNum": 1,
  "isNotInsideRobot":false,
  "joint":
  [
    {
      "backLash": 0.0,
      "direction": 1,
      "encoderResolution": 17,
      "maxAcc": 1.50,
      "maxDec": -1.50,
      "maxJerkAcc": 1.0,
      "maxJerkDec": -1.0,
      "maxRPM": 1.0,
      "maxReverseRPM": -1.0,
      "positiveLimit": 999.0,
      "ratedRPM": 3000.0,
      "ratedReverseRPM": -3000.0,
      "ratedReverseSpeed": -3600.0,
      "ratedSpeed": 3600.0,
      "reducRatio": 5.0,
      "reverseLimit": -999.0
    }
  ],
  "robot": 1
}
```

### 上位机查询外部轴关节参数

- **命令字：** `0x20A7`

| 参数 | 类型 | 说明 |
|------|------|------|
| robot | int | 当前机器人号，范围[1,4] |
| externalGroupNum | int | 轴组组合的组号；该参数最大为当前机器人绑定的外部轴数量 |
| isNotInsideRobot | bool | 当前控制对象是否为外部设备；非 ide 可不发 |

```json
{
  "robot": 1,
  "externalGroupNum": 1,
  "isNotInsideRobot": false
}
```

### 控制器回复外部轴关节参数

- **命令字：** `0x20A8`

```json
{
  "externalGroupNum": 1,
  "isNotInsideRobot":false,
  "joint":
  [
    {
      "backLash": 0.0,
      "direction": 1,
      "encoderResolution": 17,
      "maxAcc": 1.50,
      "maxDec": -1.50,
      "maxJerkAcc": 1.0,
      "maxJerkDec": -1.0,
      "maxRPM": 1.0,
      "maxReverseRPM": -1.0,
      "positiveLimit": 999.0,
      "ratedRPM": 3000.0,
      "ratedReverseRPM": -3000.0,
      "ratedReverseSpeed": -3600.0,
      "ratedSpeed": 3600.0,
      "reducRatio": 5.0,
      "reverseLimit": -999.0
    }
  ],
  "robot": 1
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
