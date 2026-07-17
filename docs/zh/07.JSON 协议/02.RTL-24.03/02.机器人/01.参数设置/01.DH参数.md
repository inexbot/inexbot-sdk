# DH参数

## 机器人基础参数

> 说明：包含有DH参数、关节参数、笛卡尔参数等机器人基础参数的设置与查询

---

## 1. 上位机设置当前机器人DH参数

**命令字：** `0x20C0`

### 1.1 六轴串联机器人（存在耦合时动态限位生效）

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L1 | double | 120.0 | L1杆长，范围[-4000,4000] |
| L2 | double | 120.0 | L2杆长，范围[-4000,4000] |
| L3 | double | 120.0 | L3杆长，范围[-4000,4000] |
| L4 | double | 120.0 | L4杆长，范围[-4000,4000] |
| L5 | double | 120.0 | L5杆长，范围[-4000,4000] |
| L6 | double | 120.0 | L6杆长，范围[-4000,4000] |
| L7 | double | 0.0 | L7杆长，范围[-4000,4000] |
| L8 | double | 0.0 | L8杆长，范围[-4000,4000] |
| couplingRatio12 | double | 0.0 | 1/2耦合比，范围[-1000,1000] |
| couplingRatio23 | double | 0.0 | 2/3耦合比，范围[-1000,1000] |
| couplingRatio32 | double | 0.0 | 3/2耦合比，范围[-1000,1000] |
| couplingRatio34 | double | 0.0 | 3/4耦合比，范围[-1000,1000] |
| couplingRatio45 | double | 0.0 | 4/5耦合比，范围[-1000,1000] |
| couplingRatio46 | double | 0.0 | 4/6耦合比，范围[-1000,1000] |
| couplingRatio56 | double | 0.0 | 5/6耦合比，范围[-1000,1000] |
| fiveAxisDirection | double | 90.0 | 五轴方向，范围0,90度 |
| dynamicLimit | object | - | J2+J3范围限制 |
| dynamicLimit.max | double | 0.0 | J2+J3最大值，范围[-500,500] |
| dynamicLimit.min | double | 0.0 | J2+J3最小值，范围[-500,500] |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L1": 120.0,
  "L2": 120.0,
  "L3": 120.0,
  "L4": 120.0,
  "L5": 120.0,
  "L6": 120.0,
  "L7": 0.0,
  "L8": 0.0,
  "couplingRatio12": 0.0,
  "couplingRatio23": 0.0,
  "couplingRatio32": 0.0,
  "couplingRatio34": 0.0,
  "couplingRatio45": 0.0,
  "couplingRatio46": 0.0,
  "couplingRatio56": 0.0,
  "dynamicLimit": {
    "max": 0.0,
    "min": 0.0
  },
  "fiveAxisDirection": 90.0,
  "mountAngle": false,
  "robot": 1
}
```

---

### 1.2 六轴协作机器人

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L1 | double | 120.0 | L1杆长，范围[-4000,4000] |
| L2 | double | 120.0 | L2杆长，范围[-4000,4000] |
| L3 | double | 120.0 | L3杆长，范围[-4000,4000] |
| L4 | double | 120.0 | L4杆长，范围[-4000,4000] |
| L5 | double | 120.0 | L5杆长，范围[-4000,4000] |
| L6 | double | 120.0 | L6杆长，范围[-4000,4000] |
| L7 | double | 120.0 | L7杆长，范围[-4000,4000] |
| couplingRatio12 | double | 0.0 | 1/2耦合比，范围[-1000,1000] |
| couplingRatio23 | double | 0.0 | 2/3耦合比，范围[-1000,1000] |
| couplingRatio32 | double | 0.0 | 3/2耦合比，范围[-1000,1000] |
| couplingRatio34 | double | 0.0 | 3/4耦合比，范围[-1000,1000] |
| couplingRatio45 | double | 0.0 | 4/5耦合比，范围[-1000,1000] |
| couplingRatio46 | double | 0.0 | 4/6耦合比，范围[-1000,1000] |
| couplingRatio56 | double | 0.0 | 5/6耦合比，范围[-1000,1000] |
| threeAxisDirection | double | -90.0 | 三轴方向，范围-90,0度 |
| fiveAxisDirection | double | 90.0 | 五轴方向，范围0,90度 |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L1": 120.0,
  "L2": 120.0,
  "L3": 120.0,
  "L4": 120.0,
  "L5": 120.0,
  "L6": 120.0,
  "L7": 120.0,
  "couplingRatio12": 0.0,
  "couplingRatio23": 0.0,
  "couplingRatio32": 0.0,
  "couplingRatio34": 0.0,
  "couplingRatio45": 0.0,
  "couplingRatio46": 0.0,
  "couplingRatio56": 0.0,
  "fiveAxisDirection": 90.0,
  "mountAngle": false,
  "robot": 1,
  "threeAxisDirection": -90.0
}
```

---

### 1.3 六轴喷涂机器人

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L1 | double | 120.0 | L1杆长，范围[-4000,4000] |
| L2 | double | 120.0 | L2杆长，范围[-4000,4000] |
| L3 | double | 0.0 | L3杆长，范围[-4000,4000] |
| L4 | double | 120.0 | L4杆长，范围[-4000,4000] |
| L5 | double | 120.0 | L5杆长，范围[-4000,4000] |
| L6 | double | 120.0 | L6杆长，范围[-4000,4000] |
| L7 | double | 0.0 | L7杆长，范围[-4000,4000] |
| L8 | double | 0.0 | L8杆长，范围[-4000,4000] |
| couplingRatio12 | double | 0.0 | 1/2耦合比，范围[-1000,1000] |
| couplingRatio23 | double | 0.0 | 2/3耦合比，范围[-1000,1000] |
| couplingRatio32 | double | 0.0 | 3/2耦合比，范围[-1000,1000] |
| couplingRatio34 | double | 0.0 | 3/4耦合比，范围[-1000,1000] |
| couplingRatio45 | double | 0.0 | 4/5耦合比，范围[-1000,1000] |
| couplingRatio46 | double | 0.0 | 4/6耦合比，范围[-1000,1000] |
| couplingRatio56 | double | 0.0 | 5/6耦合比，范围[-1000,1000] |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L1": 120.0,
  "L2": 120.0,
  "L3": 0.0,
  "L4": 120.0,
  "L5": 120.0,
  "L6": 120.0,
  "L7": 0.0,
  "L8": 0.0,
  "couplingRatio12": 0.0,
  "couplingRatio23": 0.0,
  "couplingRatio32": 0.0,
  "couplingRatio34": 0.0,
  "couplingRatio45": 0.0,
  "couplingRatio46": 0.0,
  "couplingRatio56": 0.0,
  "mountAngle": false,
  "robot": 1
}
```

---

### 1.4 六轴异型二

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L1 | double | 120.0 | L1杆长，范围[-4000,4000] |
| L2 | double | 120.0 | L2杆长，范围[-4000,4000] |
| L3 | double | 120.0 | L3杆长，范围[-4000,4000] |
| L4 | double | 120.0 | L4杆长，范围[-4000,4000] |
| L5 | double | 120.0 | L5杆长，范围[-4000,4000] |
| L6 | double | 120.0 | L6杆长，范围[-4000,4000] |
| couplingRatio12 | double | 0.0 | 1/2耦合比，范围[-1000,1000] |
| couplingRatio23 | double | 0.0 | 2/3耦合比，范围[-1000,1000] |
| couplingRatio32 | double | 0.0 | 3/2耦合比，范围[-1000,1000] |
| couplingRatio34 | double | 0.0 | 3/4耦合比，范围[-1000,1000] |
| couplingRatio45 | double | 0.0 | 4/5耦合比，范围[-1000,1000] |
| couplingRatio46 | double | 0.0 | 4/6耦合比，范围[-1000,1000] |
| couplingRatio56 | double | 0.0 | 5/6耦合比，范围[-1000,1000] |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L1": 120.0,
  "L2": 120.0,
  "L3": 120.0,
  "L4": 120.0,
  "L5": 120.0,
  "L6": 120.0,
  "couplingRatio12": 0.0,
  "couplingRatio23": 0.0,
  "couplingRatio32": 0.0,
  "couplingRatio34": 0.0,
  "couplingRatio45": 0.0,
  "couplingRatio46": 0.0,
  "couplingRatio56": 0.0,
  "mountAngle": false,
  "robot": 1
}
```

---

### 1.5 五轴串联多关节

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L1 | double | 120.0 | L1杆长，范围[-4000,4000] |
| L2 | double | 120.0 | L2杆长，范围[-4000,4000] |
| L3 | double | 120.0 | L3杆长，范围[-4000,4000] |
| L4 | double | 120.0 | L4杆长，范围[-4000,4000] |
| L5 | double | 120.0 | L5杆长，范围[-4000,4000] |
| L6 | double | 120.0 | L6杆长，范围[-4000,4000] |
| L7 | double | 0.0 | L7杆长，范围[-4000,4000] |
| couplingRatio12 | double | 0.0 | 1/2耦合比，范围[-1000,1000] |
| couplingRatio23 | double | 0.0 | 2/3耦合比，范围[-1000,1000] |
| couplingRatio32 | double | 0.0 | 3/2耦合比，范围[-1000,1000] |
| couplingRatio34 | double | 0.0 | 3/4耦合比，范围[-1000,1000] |
| couplingRatio45 | double | 0.0 | 4/5耦合比，范围[-1000,1000] |
| couplingRatio46 | double | 0.0 | 4/6耦合比，范围[-1000,1000] |
| fiveAxisDirection | double | 90.0 | 五轴方向，范围0,90度 |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L1": 120.0,
  "L2": 120.0,
  "L3": 120.0,
  "L4": 120.0,
  "L5": 120.0,
  "L6": 120.0,
  "L7": 0.0,
  "couplingRatio12": 0.0,
  "couplingRatio23": 0.0,
  "couplingRatio32": 0.0,
  "couplingRatio34": 0.0,
  "couplingRatio45": 0.0,
  "couplingRatio46": 0.0,
  "fiveAxisDirection": 90.0,
  "mountAngle": false,
  "robot": 1
}
```

---

### 1.6 四轴SCARA

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L1 | double | 120.0 | L1杆长，范围[-4000,4000] |
| L2 | double | 120.0 | L2杆长，范围[-4000,4000] |
| L3 | double | 120.0 | L3杆长，范围[-4000,4000] |
| couplingRatio12 | double | 0.0 | 1/2耦合比，范围[-1000,1000] |
| couplingRatio23 | double | 0.0 | 2/3耦合比，范围[-1000,1000] |
| couplingRatio34 | double | 0.0 | 3/4耦合比，范围[-1000,1000] |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| pitch | double | 80.0 | 螺距，范围[-1000,0),(0,1000] |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L1": 120.0,
  "L2": 120.0,
  "L3": 120.0,
  "couplingRatio12": 0.0,
  "couplingRatio23": 0.0,
  "couplingRatio34": 0.0,
  "mountAngle": false,
  "pitch": 80.0,
  "robot": 1
}
```

---

### 1.7 四轴SCARA异型1

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L1 | double | 120.0 | L1杆长，范围[-4000,4000] |
| L2 | double | 120.0 | L2杆长，范围[-4000,4000] |
| L3 | double | 120.0 | L3杆长，范围[-4000,4000] |
| couplingRatio34 | double | 0.0 | 3/4耦合比，范围[-1000,1000] |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| pitch | double | 80.0 | 螺距，范围[-1000,0),(0,1000] |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L1": 120.0,
  "L2": 120.0,
  "L3": 120.0,
  "couplingRatio34": 0.0,
  "mountAngle": false,
  "pitch": 80.0,
  "robot": 1
}
```

---

### 1.8 四轴连杆码垛

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L1 | double | 120.0 | L1杆长，范围[-4000,4000] |
| L2 | double | 120.0 | L2杆长，范围[-4000,4000] |
| L3 | double | 120.0 | L3杆长，范围[-4000,4000] |
| L4 | double | 120.0 | L4杆长，范围[-4000,4000] |
| L5 | double | 120.0 | L5杆长，范围[-4000,4000] |
| L6 | double | 0.0 | 偏置值，默认为0，范围[-4000,4000] |
| couplingRatio23 | double | 0.0 | 2/3耦合比，范围[-1000,1000] |
| couplingRatio34 | double | 0.0 | 3/4耦合比，范围[-1000,1000] |
| maxDynamicLimit | double | 0.0 | J2+J3最大值，范围[-1000,1000] |
| minDynamicLimit | double | 0.0 | J2+J3最小值，范围[-1000,1000] |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L1": 120.0,
  "L2": 120.0,
  "L3": 120.0,
  "L4": 120.0,
  "L5": 120.0,
  "L6": 0.0,
  "couplingRatio23": 0.0,
  "couplingRatio34": 0.0,
  "maxDynamicLimit": 0.0,
  "minDynamicLimit": 0.0,
  "mountAngle": false,
  "robot": 1
}
```

---

### 1.9 四轴码垛丝杆

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L1 | double | 120.0 | L1杆长，范围[-4000,4000] |
| L2 | double | 120.0 | L2杆长，范围[-4000,4000] |
| L3 | double | 120.0 | L3杆长，范围[-4000,4000] |
| amplificationRatio | double | 100.0 | 放大比，范围[1,1000] |
| conversionRatio2 | double | 100.0 | 二轴转换比，范围[1,1000] |
| conversionRatio3 | double | 100.0 | 三轴转换比，范围[1,1000] |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L1": 120.0,
  "L2": 120.0,
  "L3": 120.0,
  "amplificationRatio": 100.0,
  "conversionRatio2": 100.0,
  "conversionRatio3": 100.0,
  "mountAngle": false,
  "robot": 1
}
```

---

### 1.10 四轴串联多关节

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L1 | double | 120.0 | L1杆长，范围[-4000,4000] |
| L2 | double | 120.0 | L2杆长，范围[-4000,4000] |
| L3 | double | 120.0 | L3杆长，范围[-4000,4000] |
| L4 | double | 120.0 | L4杆长，范围[-4000,4000] |
| L5 | double | 120.0 | L5杆长，范围[-4000,4000] |
| couplingRatio23 | double | 0.0 | 2/3耦合比，范围[-1000,1000] |
| couplingRatio34 | double | 0.0 | 3/4耦合比，范围[-1000,1000] |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L1": 120.0,
  "L2": 120.0,
  "L3": 120.0,
  "L4": 120.0,
  "L5": 120.0,
  "couplingRatio23": 0.0,
  "couplingRatio34": 0.0,
  "mountAngle": false,
  "robot": 1
}
```

---

### 1.11 四轴直角机器人

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| conversionRatio_X | double | 100.0 | X轴转换比，范围[-4000,4000] |
| conversionRatio_Y | double | 100.0 | Y轴转换比，范围[-4000,4000] |
| conversionRatio_Z | double | 100.0 | Z轴转换比，范围[-4000,4000] |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "conversionRatio_X": 100.0,
  "conversionRatio_Y": 100.0,
  "conversionRatio_Z": 100.0,
  "mountAngle": false,
  "robot": 1
}
```

---

### 1.12 四轴极坐标异型

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L1 | double | 120.0 | L1杆长，范围[-4000,4000] |
| L2 | double | 120.0 | L2杆长，范围[-4000,4000] |
| L3 | double | 120.0 | L3杆长，范围[-4000,4000] |
| conversionRatio2 | double | 100.0 | 二轴转换比，范围[-4000,4000] |
| conversionRatio3 | double | 100.0 | 三轴转换比，范围[-4000,4000] |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L1": 120.0,
  "L2": 120.0,
  "L3": 120.0,
  "conversionRatio2": 100.0,
  "conversionRatio3": 100.0,
  "mountAngle": false,
  "robot": 1
}
```

---

### 1.13 三轴SCARA

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L1 | double | 120.0 | L1杆长，范围[-4000,4000] |
| L2 | double | 120.0 | L2杆长，范围[-4000,4000] |
| L3 | double | 120.0 | L3杆长，范围[-4000,4000] |
| couplingRatio12 | double | 0.0 | 1/2耦合比，范围[-1000,1000] |
| couplingRatio23 | double | 0.0 | 2/3耦合比，范围[-1000,1000] |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| pitch | double | 80.0 | 螺距，范围[-1000,0),(0,1000] |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L1": 120.0,
  "L2": 120.0,
  "L3": 120.0,
  "couplingRatio12": 0.0,
  "couplingRatio23": 0.0,
  "mountAngle": false,
  "pitch": 80.0,
  "robot": 1
}
```

---

### 1.14 三轴直角机器人

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| conversionRatio_X | double | 100.0 | X轴转换比，范围[-4000,4000] |
| conversionRatio_Y | double | 100.0 | Y轴转换比，范围[-4000,4000] |
| conversionRatio_Z | double | 100.0 | Z轴转换比，范围[-4000,4000] |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "conversionRatio_X": 100.0,
  "conversionRatio_Y": 100.0,
  "conversionRatio_Z": 100.0,
  "mountAngle": false,
  "robot": 1
}
```

---

### 1.15 三轴直角异型1

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L1 | double | 120.0 | L1杆长，范围[-4000,4000] |
| L2 | double | 120.0 | L2杆长，范围[-4000,4000] |
| L3 | double | 120.0 | L3杆长，范围[-4000,4000] |
| conversionRatio2 | double | 100.0 | 二轴转换比，范围[-4000,4000] |
| conversionRatio3 | double | 100.0 | 三轴转换比，范围[-4000,4000] |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L1": 120.0,
  "L2": 120.0,
  "L3": 120.0,
  "conversionRatio2": 100.0,
  "conversionRatio3": 100.0,
  "mountAngle": false,
  "robot": 1
}
```

---

### 1.16 二轴SCARA

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L2 | double | 120.0 | L2杆长，范围[-4000,4000] |
| L3 | double | 120.0 | L3杆长，范围[-4000,4000] |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L2": 120.0,
  "L3": 120.0,
  "mountAngle": false,
  "robot": 1
}
```

---

### 1.17 七轴串联多关节

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| Link | object | - | DH参数列表 |
| Link.L1 | double | 120.0 | L1杆长，范围[-4000,4000] |
| Link.L2 | double | 120.0 | L2杆长，范围[-4000,4000] |
| Link.L3 | double | 120.0 | L3杆长，范围[-4000,4000] |
| Link.L4 | double | 120.0 | L4杆长，范围[-4000,4000] |
| Link.L5 | double | 120.0 | L5杆长，范围[-4000,4000] |
| Link.L6 | double | 120.0 | L6杆长，范围[-4000,4000] |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "Link": {
    "L1": 120.0,
    "L2": 120.0,
    "L3": 120.0,
    "L4": 120.0,
    "L5": 120.0,
    "L6": 120.0
  },
  "mountAngle": false,
  "robot": 1
}
```

---

### 1.18 龙门焊接模型

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L4 | double | 120.0 | L4杆长，范围[-4000,4000] |
| L5 | double | 120.0 | L5杆长，范围[-4000,4000] |
| conversionRatio_X | double | 100.0 | X轴转换比，范围[-4000,4000] |
| conversionRatio_Y | double | 100.0 | Y轴转换比，范围[-4000,4000] |
| conversionRatio_Z | double | 100.0 | Z轴转换比，范围[-4000,4000] |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L4": 120.0,
  "L5": 120.0,
  "conversionRatio_X": 100.0,
  "conversionRatio_Y": 100.0,
  "conversionRatio_Z": 100.0,
  "mountAngle": false,
  "robot": 1
}
```

---

### 1.19 四轴并联机器人

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L1 | double | 120.0 | L1杆长，范围[-4000,4000] |
| L2 | double | 110.0 | L2杆长，范围[-4000,4000]（需小于L3） |
| L3 | double | 120.0 | L3杆长，范围[-4000,4000] |
| L4 | double | 120.0 | L4杆长，范围[-4000,4000] |
| L5 | double | 120.0 | L5杆长，范围[-4000,4000] |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L1": 120.0,
  "L2": 110.0,
  "L3": 120.0,
  "L4": 120.0,
  "L5": 120.0,
  "mountAngle": false,
  "robot": 1
}
```

---

### 1.20 酒槽机型

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L1 | double | 120.0 | L1杆长，范围[-4000,4000] |
| L2 | double | 120.0 | L2杆长，范围[-4000,4000] |
| L3 | double | 120.0 | L3杆长，范围[-4000,4000] |
| L4 | double | 120.0 | L4杆长，范围[-4000,4000] |
| L5 | double | 120.0 | L5杆长，范围[-4000,4000] |
| L6 | double | 120.0 | L6杆长，范围[-4000,4000] |
| L7 | double | 120.0 | L7杆长，范围[-4000,4000] |
| L8 | double | 120.0 | L8杆长，范围[-4000,4000] |
| L9 | double | 120.0 | L9杆长，范围[-4000,4000] |
| L10 | double | 120.0 | L10杆长，范围[-4000,4000] |
| L11 | double | 120.0 | L11杆长，范围[-4000,4000] |
| L12 | double | 120.0 | 滑动电动缸导程，范围[-4000,4000] |
| L13 | double | 120.0 | 顶升电动缸导程，范围[-4000,4000] |
| L14 | double | 120.0 | 喷料距离，范围[-4000,4000] |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L1": 120.0,
  "L2": 120.0,
  "L3": 120.0,
  "L4": 120.0,
  "L5": 120.0,
  "L6": 120.0,
  "L7": 120.0,
  "L8": 120.0,
  "L9": 120.0,
  "L10": 120.0,
  "L11": 120.0,
  "L12": 120.0,
  "L13": 120.0,
  "L14": 120.0,
  "mountAngle": false,
  "robot": 1
}
```

---

### 1.21 龙门焊接2模型

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L4 | double | 120.0 | L4杆长，范围[-4000,4000] |
| L5 | double | 120.0 | L5杆长，范围[-4000,4000] |
| conversionRatio_X | double | 100.0 | X轴转换比，范围[-4000,4000] |
| conversionRatio_Y | double | 100.0 | Y轴转换比，范围[-4000,4000] |
| conversionRatio_Z | double | 100.0 | Z轴转换比，范围[-4000,4000] |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L4": 120.0,
  "L5": 120.0,
  "conversionRatio_X": 100.0,
  "conversionRatio_Y": 100.0,
  "conversionRatio_Z": 100.0,
  "mountAngle": false,
  "robot": 1
}
```

---

### 1.22 四轴直角异型一

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| Link | object | - | DH参数列表 |
| Link.L1 | double | 120.0 | L1杆长，范围[-4000,4000] |
| Link.L2 | double | 120.0 | L2杆长，范围[-4000,4000] |
| Link.conversionRatio | array | [100.0, 100.0] | 轴转换比，范围[1,1000]，长度2（一轴、四轴转换比） |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "Link": {
    "L1": 120.0,
    "L2": 120.0,
    "conversionRatio": [100.0, 100.0]
  },
  "mountAngle": false,
  "robot": 1
}
```

---

### 1.23 六轴龙门焊接模型

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L4 | double | 120.0 | L4杆长，范围[-4000,4000] |
| L5 | double | 120.0 | L5杆长，范围[-4000,4000] |
| L6 | double | 120.0 | L6杆长，范围[-4000,4000] |
| L7 | double | 120.0 | L7杆长，范围[-4000,4000] |
| conversionRatio_X | double | 100.0 | X轴转换比，范围[-4000,4000] |
| conversionRatio_Y | double | 100.0 | Y轴转换比，范围[-4000,4000] |
| conversionRatio_Z | double | 100.0 | Z轴转换比，范围[-4000,4000] |
| couplingRatio45 | double | 0.0 | 4/5耦合比，范围[-1000,1000] |
| couplingRatio56 | double | 0.0 | 5/6耦合比，范围[-1000,1000] |
| fiveAxisDirection | double | 0.0 | 五轴方向，范围-90,0度（0为竖直向下，-90为水平向右） |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L4": 120.0,
  "L5": 120.0,
  "L6": 120.0,
  "L7": 120.0,
  "conversionRatio_X": 100.0,
  "conversionRatio_Y": 100.0,
  "conversionRatio_Z": 100.0,
  "couplingRatio45": 0.0,
  "couplingRatio56": 0.0,
  "fiveAxisDirection": 0.0,
  "mountAngle": false,
  "robot": 1
}
```

---

### 1.24 五轴混动机器人

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L1 | double | 120.0 | L1杆长，范围[-4000,4000] |
| L2 | double | 120.0 | L2杆长，范围[-4000,4000] |
| L3 | double | 120.0 | L3杆长，范围[-4000,4000] |
| L4 | double | 120.0 | L4杆长，范围[-4000,4000] |
| L5 | double | 120.0 | L5杆长，范围[-4000,4000] |
| L6 | double | 120.0 | L6杆长，范围[-4000,4000] |
| L7 | double | 120.0 | L7杆长，范围[-4000,4000] |
| L8 | double | 120.0 | L8杆长，范围[-4000,4000] |
| L9 | double | 0.0 | L9杆长，范围[-4000,4000] |
| L10 | double | 120.0 | L10杆长，范围[-4000,4000] |
| conversionratio_J1 | double | 100.0 | 1轴转换比，范围[-4000,4000] |
| conversionratio_J2 | double | 100.0 | 2轴转换比，范围[-4000,4000] |
| conversionratio_J3 | double | 100.0 | 3轴转换比，范围[-4000,4000] |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L1": 120.0,
  "L2": 120.0,
  "L3": 120.0,
  "L4": 120.0,
  "L5": 120.0,
  "L6": 120.0,
  "L7": 120.0,
  "L8": 120.0,
  "L9": 0.0,
  "L10": 120.0,
  "conversionratio_J1": 100.0,
  "conversionratio_J2": 100.0,
  "conversionratio_J3": 100.0,
  "mountAngle": false,
  "robot": 1
}
```

---

### 1.25 四轴SCARA异型2

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L1 | double | 100.0 | 1轴螺距，范围[-1000,0),(0,1000] |
| L2 | double | 120.0 | L2杆长，范围[-4000,4000] |
| L3 | double | 120.0 | L3杆长，范围[-4000,4000] |
| couplingRatio34 | double | 0.0 | 3/4耦合比，范围[-4000,4000] |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| pitch | double | 80.0 | 3轴螺距，范围[-1000,0),(0,1000] |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L1": 100.0,
  "L2": 120.0,
  "L3": 120.0,
  "couplingRatio34": 0.0,
  "mountAngle": false,
  "pitch": 80.0,
  "robot": 1
}
```

---

### 1.26 六轴异型三

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L1 | double | 120.0 | L1杆长，范围[-4000,4000] |
| L2 | double | 120.0 | L2杆长，范围[-4000,4000] |
| L3 | double | 120.0 | L3杆长，范围[-4000,4000] |
| L4 | double | 120.0 | L4杆长，范围[-4000,4000] |
| L5 | double | 120.0 | L5杆长，范围[-4000,4000] |
| L6 | double | 120.0 | L6杆长，范围[-4000,4000] |
| L7 | double | 120.0 | L7杆长，范围[-4000,4000] |
| L8 | double | 120.0 | L8杆长，范围[-4000,4000] |
| L9 | double | 120.0 | L9杆长，范围[-4000,4000] |
| L10 | double | 120.0 | L10杆长，范围[-4000,4000] |
| L11 | double | 120.0 | L11杆长，范围[-4000,4000] |
| L12 | double | 120.0 | L12杆长，范围[-4000,4000] |
| L13 | double | 120.0 | L13杆长，范围[-4000,4000] |
| L14 | double | 120.0 | L14杆长，范围[-4000,4000] |
| L15 | double | 120.0 | L15杆长，范围[-4000,4000] |
| L16 | double | 120.0 | L16杆长，范围[-4000,4000] |
| L17 | double | 120.0 | L17杆长，范围[-4000,4000] |
| L18 | double | 120.0 | L18杆长，范围[-4000,4000] |
| L19 | double | 120.0 | L19杆长，范围[-4000,4000] |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L1": 120.0,
  "L2": 120.0,
  "L3": 120.0,
  "L4": 120.0,
  "L5": 120.0,
  "L6": 120.0,
  "L7": 120.0,
  "L8": 120.0,
  "L9": 120.0,
  "L10": 120.0,
  "L11": 120.0,
  "L12": 120.0,
  "L13": 120.0,
  "L14": 120.0,
  "L15": 120.0,
  "L16": 120.0,
  "L17": 120.0,
  "L18": 120.0,
  "L19": 120.0,
  "mountAngle": false,
  "robot": 1
}
```

---

### 1.27 三轴SCARA异型一

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L1 | double | 120.0 | L1杆长，范围[-4000,4000] |
| L2 | double | 120.0 | L2杆长，范围[-4000,4000] |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L1": 120.0,
  "L2": 120.0,
  "mountAngle": false,
  "robot": 1
}
```

---

### 1.28 delta2D并联机器人模型

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L1 | double | 120.0 | L1杆长，范围[-4000,4000] |
| L2 | double | 110.0 | L2杆长，范围[-4000,4000]（需小于L3） |
| L3 | double | 120.0 | L3杆长，范围[-4000,4000] |
| L4 | double | 120.0 | L4杆长，范围[-4000,4000] |
| L5 | double | 120.0 | L5杆长，范围[-4000,4000] |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L1": 120.0,
  "L2": 110.0,
  "L3": 120.0,
  "L4": 120.0,
  "L5": 120.0,
  "mountAngle": false,
  "robot": 1
}
```

---

### 1.29 龙门焊接3模型

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L4 | double | 120.0 | L4杆长，范围[-4000,4000] |
| L5 | double | 120.0 | L5杆长，范围[-4000,4000] |
| conversionRatio_X | double | 100.0 | X轴转换比，范围[-4000,4000] |
| conversionRatio_Y | double | 100.0 | Y轴转换比，范围[-4000,4000] |
| conversionRatio_Z | double | 100.0 | Z轴转换比，范围[-4000,4000] |
| threeAxisDirection | double | 90.0 | 四轴方向，范围0,90度（四轴方向为0时，L4应填0） |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L4": 120.0,
  "L5": 120.0,
  "conversionRatio_X": 100.0,
  "conversionRatio_Y": 100.0,
  "conversionRatio_Z": 100.0,
  "mountAngle": false,
  "robot": 1,
  "threeAxisDirection": 90.0
}
```

---

### 1.30 三轴串联异型一

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L1 | double | 120.0 | L1杆长，范围[-4000,4000] |
| L2 | double | 120.0 | L2杆长，范围[-4000,4000] |
| L3 | double | 120.0 | L3杆长，范围[-4000,4000] |
| threeAxisDirection | double | 90.0 | 三轴方向，范围0,90度 |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L1": 120.0,
  "L2": 120.0,
  "L3": 120.0,
  "mountAngle": false,
  "robot": 1,
  "threeAxisDirection": 90.0
}
```

---

### 1.31 五轴协作机器人

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L1 | double | 120.0 | L1杆长，范围[-4000,4000] |
| L2 | double | -120.0 | L2杆长，范围[-4000,4000]（请填负值） |
| L3 | double | 120.0 | L3杆长，范围[-4000,4000] |
| L4 | double | 120.0 | L4杆长，范围[-4000,4000] |
| L5 | double | 120.0 | L5杆长，范围[-4000,4000] |
| L6 | double | -120.0 | L6杆长，范围[-4000,4000]（请填负值） |
| L7 | double | 120.0 | L7杆长，范围[-4000,4000] |
| L8 | double | 120.0 | L8杆长，范围[-4000,4000] |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L1": 120.0,
  "L2": -120.0,
  "L3": 120.0,
  "L4": 120.0,
  "L5": 120.0,
  "L6": -120.0,
  "L7": 120.0,
  "L8": 120.0,
  "mountAngle": false,
  "robot": 1
}
```

---

### 1.32 四轴SCARA异型3

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L1 | double | 120.0 | L1杆长，范围[-4000,4000] |
| L2 | double | 120.0 | L2杆长，范围[-4000,4000] |
| L3 | double | 120.0 | L3杆长，范围[-4000,4000] |
| L4 | double | 120.0 | L4杆长，范围[-4000,4000] |
| couplingRatio12 | double | 0.0 | 1/2耦合比，范围[-1000,1000] |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| pitch | double | 80.0 | 螺距，范围[-1000,0),(0,1000] |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L1": 120.0,
  "L2": 120.0,
  "L3": 120.0,
  "L4": 120.0,
  "couplingRatio12": 0.0,
  "mountAngle": false,
  "pitch": 80.0,
  "robot": 1
}
```

---

### 1.33 六轴串联-CBBARA

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L1 | double | 120.0 | L1杆长，范围[-4000,4000] |
| L2 | double | -120.0 | L2杆长，范围[-4000,4000]（请填负值） |
| L3 | double | 120.0 | L3杆长，范围[-4000,4000] |
| L4 | double | 120.0 | L4杆长，范围[-4000,4000] |
| L5 | double | 120.0 | L5杆长，范围[-4000,4000] |
| L6 | double | 0.0 | L6杆长，范围[-4000,4000] |
| L7 | double | 0.0 | L7杆长，范围[-4000,4000] |
| L8 | double | 120.0 | L8杆长，范围[-4000,4000] |
| couplingRatio45 | double | 0.0 | 4/5耦合比，范围[-1000,1000] |
| couplingRatio46 | double | 0.0 | 4/6耦合比，范围[-1000,1000] |
| couplingRatio56 | double | 0.0 | 5/6耦合比，范围[-1000,1000] |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L1": 120.0,
  "L2": -120.0,
  "L3": 120.0,
  "L4": 120.0,
  "L5": 120.0,
  "L6": 0.0,
  "L7": 0.0,
  "L8": 120.0,
  "couplingRatio45": 0.0,
  "couplingRatio46": 0.0,
  "couplingRatio56": 0.0,
  "mountAngle": false,
  "robot": 1
}
```

---

### 1.34 高格立柱旋转四轴

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L1 | double | 120.0 | L1杆长，范围[-4000,4000] |
| L2 | double | 120.0 | L2杆长，范围[-4000,4000] |
| conversionRatio1 | double | 100.0 | 1轴转换比，范围[-4000,4000] |
| conversionRatio2 | double | 100.0 | 3轴转换比，范围[-4000,4000] |
| mountAngle | bool | false | 机器人正装或倒装（false正装，true倒装） |
| robot | int | 1 | 当前机器人号，范围[1,4] |

**示例JSON：**

```json
{
  "L1": 120.0,
  "L2": 120.0,
  "conversionRatio1": 100.0,
  "conversionRatio2": 100.0,
  "mountAngle": false,
  "robot": 1
}
```

---

## 2. 上位机查询当前机器人DH参数

**命令字：** `0x20C1`

### 请求参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| robot | int | 当前机器人号，范围[1,4] |

**请求示例JSON：**

```json
{
  "robot": 1
}
```

---

## 3. 控制器回复上位机当前机器人DH参数

**命令字：** `0x20C2`

> 说明：回复内容与设置内容类似，额外包含 robotType（机器人类型）、angleToDistance（角度转距离列表）、distanceToAngle（距离转角度列表）等字段。

### 3.1 六轴串联机器人（robotType: 1）

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| L1~L8 | double | - | 杆长参数，同设置 |
| couplingRatio12~56 | double | - | 耦合比参数，同设置 |
| fiveAxisDirection | double | 90.0 | 五轴方向，范围0,90度 |
| dynamicLimit | object | - | J2+J3范围限制 |
| dynamicLimit.max | double | 0.0 | J2+J3最大值，范围[-500,500] |
| dynamicLimit.min | double | 0.0 | J2+J3最小值，范围[-500,500] |
| mountAngle | bool | false | 机器人正装或倒装 |
| robot | int | 1 | 当前机器人号，范围[1,4] |
| angleToDistance | array | [1.0,...] | 机器人角度转距离列表，长度为当前机器人轴数 |
| angleToDistanceSync | array | [27.775,...] | 机器人外部轴角度转距离列表，长度为外部轴总轴数 |
| distanceToAngle | array | [1.0,...] | 机器人距离转角度列表，长度为当前机器人轴数 |
| distanceToAngleSync | array | [0.036,...] | 机器人外部轴距离转角度列表 |
| robotType | int | 1 | 当前机器人类型 |

**angleToDistanceSync 计算公式：**
- 旋转轴值都为1
- 直线轴公式：1 * 轴方向转换比 / 360

**distanceToAngleSync 计算公式：**
- 旋转轴值都为1
- 直线轴公式：1 / 轴方向转换比 * 360

**回复示例JSON：**

```json
{
  "L1": 120.0,
  "L2": 120.0,
  "L3": 120.0,
  "L4": 120.0,
  "L5": 120.0,
  "L6": 120.0,
  "L7": 0.0,
  "L8": 0.0,
  "couplingRatio12": 0.0,
  "couplingRatio23": 0.0,
  "couplingRatio32": 0.0,
  "couplingRatio34": 0.0,
  "couplingRatio45": 0.0,
  "couplingRatio46": 0.0,
  "couplingRatio56": 0.0,
  "dynamicLimit": {
    "max": 0.0,
    "min": 0.0
  },
  "fiveAxisDirection": 90.0,
  "mountAngle": false,
  "robot": 1,
  "angleToDistance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
  "angleToDistanceSync": [27.775, 27.775, 1.0],
  "distanceToAngle": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
  "distanceToAngleSync": [0.03600360036, 0.03600360036, 1.0],
  "robotType": 1
}
```

---

### 3.2 机器人类型对照表

| robotType | 机器人类型 |
|-----------|-----------|
| 1 | 六轴串联机器人 |
| 2 | 四轴SCARA |
| 3 | 四轴连杆码垛 |
| 4 | 四轴串联多关节 |
| 6 | 五轴串联多关节 |
| 7 | 六轴协作机器人 |
| 8 | 二轴SCARA |
| 9 | 三轴SCARA |
| 10 | 三轴直角机器人 |
| 11 | 三轴直角异型1 |
| 12 | 七轴串联多关节 |
| 13 | 四轴SCARA异型1 |
| 14 | 四轴码垛丝杆 |
| 15 | 六轴喷涂机器人 |
| 16 | 四轴直角机器人 |
| 17 | 四轴极坐标异型 |
| 18 | 六轴异型二 |
| 19 | 龙门焊接模型 |
| 20 | 四轴并联机器人 |
| 21 | 酒槽机型 |
| 22 | 龙门焊接2模型 |
| 23 | 四轴直角异型一 |
| 24 | 六轴龙门焊接模型 |
| 25 | 五轴混动机器人 |
| 26 | 四轴SCARA异型2 |
| 27 | 六轴异型三 |
| 28 | 三轴SCARA异型一 |
| 29 | delta2D并联机器人模型 |
| 30 | 龙门焊接3模型 |
| 31 | 三轴串联异型一 |
| 32 | 五轴协作机器人 |
| 33 | 四轴SCARA异型3 |
| 34 | 六轴串联-CBBARA |
| 35 | 高格立柱旋转四轴 |

> 其他类型的回复JSON结构与设置时类似，额外增加 angleToDistance、distanceToAngle、robotType 字段。

---

## 4. 上位机请求保存预置机器人参数

**命令字：** `0x20C3`

| 参数名 | 类型 | 说明 |
|--------|------|------|
| name | string | 预置机器人自定义保存名称 |

**请求示例JSON：**

```json
{
  "name": "AAA"
}
```

> 预置文件格式：当前机器人类型+"_"+自定义保存名称

**控制器回复：**

```json
{}
```

---

## 5. 上位机发送设置机器人关节参数

**命令字：** `0x20C5`

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| axis | int | 1 | 机器人轴编号，范围[1,7] |
| axisDirection | int | 1 | 关节实际方向，范围[-1,1] |
| backLash | double | 0.0 | 齿轮反向间隙，范围[0,9999.999] |
| direction | int | -1.0 | 模型方向，范围[-1,1] |
| encoderResolution | int | 17 | 编码器位数，范围[1,100] |
| isReduceRatioEnable | bool | true | 编码器是否经过减速机 |
| maxAcc | double | 6.0 | 最大加速度，范围[1,10000] |
| maxDec | double | -6.0 | 最大减速度，范围[-10000,-1] |
| maxJerkAcc | double | 1.0 | 最大加加速度，范围[1,20000]（插补方式为加加速度时生效） |
| maxJerkDec | double | -1.0 | 最大减减速度，范围[-20000,-1]（插补方式为加加速度时生效） |
| maxRPM | double | 1.0 | 最大正转速，范围[1,5] |
| maxReverseRPM | double | -1.0 | 最大反转速，范围[-5,-1] |
| positiveLimit | double | 160.0 | 关节正限位，范围[1,3000]° |
| ratedRPM | double | 3600.0 | 额定正转速，范围[1,10000]rpm |
| ratedReverseRPM | double | -3600.0 | 额定反转速，范围[-10000,-1]rpm（值为额定正速度的负值） |
| ratedReverseSpeed | double | -270.0540 | 额定反速度，单位°/s（公式：额定反速度 / 减速比 * 6 * 角度转距离值） |
| ratedSpeed | double | 270.0540 | 额定正速度，单位°/s（公式：额定正速度 / 减速比 * 6 * 角度转距离值） |
| reducRatio | double | 79.9840 | 减速比，范围(0,1000] |
| reverseLimit | double | -160.0 | 关节反限位，范围[-3000,-1]° |
| robot | int | 1 | 当前机器人，范围[1,4] |

**示例JSON：**

```json
{
  "axis": 1,
  "axisDirection": 1,
  "backLash": 0.0,
  "direction": -1.0,
  "encoderResolution": 17,
  "isReduceRatioEnable": true,
  "maxAcc": 6.0,
  "maxDec": -6.0,
  "maxJerkAcc": 1.0,
  "maxJerkDec": -1.0,
  "maxRPM": 1.0,
  "maxReverseRPM": -1.0,
  "positiveLimit": 160.0,
  "ratedRPM": 3600.0,
  "ratedReverseRPM": -3600.0,
  "ratedReverseSpeed": -270.0540,
  "ratedSpeed": 270.0540,
  "reducRatio": 79.9840,
  "reverseLimit": -160.0,
  "robot": 1
}
```

---

## 6. 上位机查询机器人关节参数

**命令字：** `0x20C6`

### 请求参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| axis | int | 机器人轴编号，范围[1,7] |

**请求示例JSON：**

```json
{
  "axis": 1
}
```

---

**命令字：** `0x20C7`（控制器回复）

> 回复参数同设置参数一致。

---

## 7. 上位机发送设置机器人笛卡尔参数

**命令字：** `0x20C8`

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| maxAcc | double | 7.50 | 最大加速度，范围[1,10000] |
| maxAttitudeVel | double | 500.0 | 姿态运动最大速度，范围[1,1000]°/s |
| maxDec | double | -7.50 | 最大减速度，范围[-10000,-1] |
| maxJerk | double | 10000.0 | 最大加加速度，范围[1,20000] |
| maxSpeed | double | 2000.0 | 最大速度，范围[1,5000]mm/s |
| robot | int | 1 | 当前机器人号，范围[1,4] |
| speedLimitMode | int | 0 | 速度限制方式，范围[0,1]（0表示位姿，1表示位置） |

**示例JSON：**

```json
{
  "maxAcc": 7.50,
  "maxAttitudeVel": 500.0,
  "maxDec": -7.50,
  "maxJerk": 10000.0,
  "maxSpeed": 2000.0,
  "robot": 1,
  "speedLimitMode": 0
}
```

---

## 8. 上位机查询机器人笛卡尔参数

**命令字：** `0x20C9`

### 请求参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| robot | int | 当前机器人号，范围[1,4] |

**请求示例JSON：**

```json
{
  "robot": 1
}
```

---

**命令字：** `0x20CA`（控制器回复）

> 回复参数同设置参数一致。

---

## 9. 上位机设置机器人关节多圈值参数

**命令字：** `0x20CB`

| 参数名 | 类型 | 说明 |
|--------|------|------|
| robot | int | 当前机器人号，范围[1,4] |
| robotAxis | array | 关节多圈值参数列表，长度为当前机器人轴数 |

### robotAxis 数组元素

| 参数名 | 类型 | 说明 |
|--------|------|------|
| axisSlaveSum | int | 从动轴数量，范围[0,3] |
| enable | int | 编码器多圈值溢出计数功能，范围[0,1]（0关闭，1开启） |
| encode | array | 编码器最大值最小值列表，长度为关节从动轴数量+1 |

### encode 数组元素

| 参数名 | 类型 | 说明 |
|--------|------|------|
| max | string | 编码器最大值，范围[-2^32,2^32] |
| min | string | 编码器最小值，范围[-2^32,2^32]（不得大于编码器最大值） |

**示例JSON：**

```json
{
  "robot": 1,
  "robotAxis": [
    {
      "axisSlaveSum": 0,
      "enable": 1,
      "encode": [
        {
          "max": "32768",
          "min": "-32768"
        }
      ]
    },
    {
      "axisSlaveSum": 0,
      "enable": 0,
      "encode": [
        {
          "max": "32768",
          "min": "-32768"
        }
      ]
    },
    {
      "axisSlaveSum": 0,
      "enable": 0,
      "encode": [
        {
          "max": "32768",
          "min": "-32768"
        }
      ]
    },
    {
      "axisSlaveSum": 0,
      "enable": 0,
      "encode": [
        {
          "max": "32768",
          "min": "-32768"
        }
      ]
    },
    {
      "axisSlaveSum": 0,
      "enable": 0,
      "encode": [
        {
          "max": "32768",
          "min": "-32768"
        }
      ]
    },
    {
      "axisSlaveSum": 0,
      "enable": 0,
      "encode": [
        {
          "max": "32768",
          "min": "-32768"
        }
      ]
    }
  ]
}
```

---

## 10. 上位机查询机器人编码器多圈值参数

**命令字：** `0x20CC`

### 请求参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| robot | int | 当前机器人号，范围[1,4] |

**请求示例JSON：**

```json
{
  "robot": 1
}
```

---

**命令字：** `0x20CD`（控制器回复）

> 回复参数同设置参数一致。

---

## 11. 上位机申请另存为预置机器人参数文件

**命令字：** `0x20CE`

| 参数名 | 类型 | 说明 |
|--------|------|------|
| name | string | 机器人类型名称 |
| presetRobotName | string | 预置机器人参数自定义名称 |

**示例JSON：**

```json
{
  "name": "R_GENERAL_6S",
  "presetRobotName": "AAA"
}
```

---

## 12. 上位机查询预置机器人文件列表

**命令字：** `0x20CF`

| 参数名 | 类型 | 说明 |
|--------|------|------|
| name | string | 机器人类型名称 |

**请求示例JSON：**

```json
{
  "name": "R_GENERAL_6S"
}
```

---

**命令字：** `0x20D0`（控制器回复）

| 参数名 | 类型 | 说明 |
|--------|------|------|
| listnum | int | 预置机器人数量 |
| nameList | array | 预置机器人自定义名称列表 |

**回复示例JSON：**

```json
{
  "listnum": 2,
  "nameList": ["AAA.json", "BBB.json"]
}
```

---

## 13. 上位机发送获取预置参数请求

**命令字：** `0x20D1`

| 参数名 | 类型 | 说明 |
|--------|------|------|
| name | string | 机器人类型名称 |
| presetRobotName | string | 预置机器人参数自定义名称 |

**请求示例JSON：**

```json
{
  "name": "R_GENERAL_6S",
  "presetRobotName": "AAA.json"
}
```

---

## 14. 控制器回复机器人已保存的预置机器人参数

**命令字：** `0x20D2`

| 参数名 | 类型 | 说明 |
|--------|------|------|
| DH | object | 保存的预置机器人DH参数 |
| Joint | array | 保存的预置机器人关节参数列表 |

### DH 参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| L1~L8 | double | 杆长参数 |
| angleToDistance | array | 机器人角度转距离列表 |
| couplingRatio12~56 | double | 耦合比参数 |
| distanceToAngle | array | 机器人距离转角度列表 |
| dynamicLimit | object | J2+J3范围限制 |
| fiveAxisDirection | double | 五轴方向 |
| mountAngle | bool | 机器人正装或倒装 |
| robotType | int | 当前机器人类型 |

### Joint 数组元素

| 参数名 | 类型 | 说明 |
|--------|------|------|
| axisDirection | int | 关节实际方向 |
| axisNum | int | 机器人轴编号 |
| backLash | double | 齿轮反向间隙 |
| direction | int | 模型方向 |
| encoderResolution | int | 编码器位数 |
| isReduceRatioEnable | bool | 编码器是否经过减速机 |
| maxAcc | double | 最大加速度 |
| maxDec | double | 最大减速度 |
| maxJerkAcc | double | 最大加加速度 |
| maxJerkDec | double | 最大减减速度 |
| maxRPM | double | 最大正转速 |
| maxReverseRPM | double | 最大反转速 |
| positiveLimit | double | 关节正限位 |
| ratedRPM | double | 额定正转速 |
| ratedReverseRPM | double | 额定反转速 |
| ratedReverseSpeed | double | 额定反速度 |
| ratedSpeed | double | 额定正速度 |
| reducRatio | double | 减速比 |
| reverseLimit | double | 关节反限位 |

**回复示例JSON：**

```json
{
  "DH": {
    "L1": 390.0,
    "L2": 450.872,
    "L3": 99.462,
    "L4": 471.29,
    "L5": 123.0,
    "L6": -0.544,
    "L7": -0.0,
    "L8": 0.0,
    "angleToDistance": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
    "couplingRatio12": 0.0,
    "couplingRatio23": 0.0,
    "couplingRatio32": 0.0,
    "couplingRatio34": 0.0,
    "couplingRatio45": 0.0,
    "couplingRatio46": 0.0,
    "couplingRatio56": 0.0,
    "distanceToAngle": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
    "dynamicLimit": {
      "max": 20.0,
      "min": -20.0
    },
    "fiveAxisDirection": 90,
    "mountAngle": false,
    "robotType": 1
  },
  "Joint": [
    {
      "axisDirection": 1,
      "axisNum": 1,
      "backLash": 0.0,
      "direction": -1,
      "encoderResolution": 17,
      "isReduceRatioEnable": true,
      "maxAcc": 6.0,
      "maxDec": -6.0,
      "maxJerkAcc": 1.0,
      "maxJerkDec": -1.0,
      "maxRPM": 1.0,
      "maxReverseRPM": -1.0,
      "positiveLimit": 160.0,
      "ratedRPM": 3600.0,
      "ratedReverseRPM": -3600.0,
      "ratedReverseSpeed": -270.05401080216,
      "ratedSpeed": 270.05401080216,
      "reducRatio": 79.984,
      "reverseLimit": -160.0
    },
    {
      "axisDirection": 1,
      "axisNum": 2,
      "backLash": 0.0,
      "direction": 1,
      "encoderResolution": 17,
      "isReduceRatioEnable": true,
      "maxAcc": 3.75,
      "maxDec": -3.75,
      "maxJerkAcc": 1.0,
      "maxJerkDec": -1.0,
      "maxRPM": 1.0,
      "maxReverseRPM": -1.0,
      "positiveLimit": 100.0,
      "ratedRPM": 3600.0,
      "ratedReverseRPM": -3600.0,
      "ratedReverseSpeed": -196.690858428112,
      "ratedSpeed": 196.690858428112,
      "reducRatio": 109.817,
      "reverseLimit": -100.0
    },
    {
      "axisDirection": 1,
      "axisNum": 3,
      "backLash": 0.0,
      "direction": 1,
      "encoderResolution": 17,
      "isReduceRatioEnable": true,
      "maxAcc": 7.5,
      "maxDec": -7.5,
      "maxJerkAcc": 1.0,
      "maxJerkDec": -1.0,
      "maxRPM": 1.0,
      "maxReverseRPM": -1.0,
      "positiveLimit": 90.0,
      "ratedRPM": 5000.0,
      "ratedReverseRPM": -5000.0,
      "ratedReverseSpeed": -299.604522030919,
      "ratedSpeed": 299.604522030919,
      "reducRatio": 100.132,
      "reverseLimit": -75.0
    },
    {
      "axisDirection": 1,
      "axisNum": 4,
      "backLash": 0.0,
      "direction": -1,
      "encoderResolution": 17,
      "isReduceRatioEnable": true,
      "maxAcc": 7.5,
      "maxDec": -7.5,
      "maxJerkAcc": 1.0,
      "maxJerkDec": -1.0,
      "maxRPM": 1.0,
      "maxReverseRPM": -1.0,
      "positiveLimit": 190.0,
      "ratedRPM": 5000.0,
      "ratedReverseRPM": -5000.0,
      "ratedReverseSpeed": -252.175009456563,
      "ratedSpeed": 252.175009456563,
      "reducRatio": 118.965,
      "reverseLimit": -190.0
    },
    {
      "axisDirection": 1,
      "axisNum": 5,
      "backLash": 0.0,
      "direction": 1,
      "encoderResolution": 17,
      "isReduceRatioEnable": true,
      "maxAcc": 7.5,
      "maxDec": -7.5,
      "maxJerkAcc": 1.0,
      "maxJerkDec": -1.0,
      "maxRPM": 1.0,
      "maxReverseRPM": -1.0,
      "positiveLimit": 20.0,
      "ratedRPM": 4500.0,
      "ratedReverseRPM": -4500.0,
      "ratedReverseSpeed": -337.491562710932,
      "ratedSpeed": 337.491562710932,
      "reducRatio": 80.002,
      "reverseLimit": -200.0
    },
    {
      "axisDirection": 1,
      "axisNum": 6,
      "backLash": 0.0,
      "direction": -1,
      "encoderResolution": 17,
      "isReduceRatioEnable": true,
      "maxAcc": 7.5,
      "maxDec": -7.5,
      "maxJerkAcc": 1.0,
      "maxJerkDec": -1.0,
      "maxRPM": 1.0,
      "maxReverseRPM": -1.0,
      "positiveLimit": 360.0,
      "ratedRPM": 4500.0,
      "ratedReverseRPM": -4500.0,
      "ratedReverseSpeed": -337.622388115692,
      "ratedSpeed": 337.622388115692,
      "reducRatio": 79.971,
      "reverseLimit": -360.0
    }
  ]
}
```

---

## 15. 上位机发送酒槽机型标记圆心请求

**命令字：** `0x20D3`

```json
{}
```
