# 1. Motion Control

---

## Table of Contents

- [Robot Motion](#robot-motion)
- [Robot Settings](#robot-settings)
- [External Axis Motion](#external-axis-motion)
- [External Axis Settings](#external-axis-settings)
- [Force Functions](#force-functions)
- [Queue Mode Motion Communication](#queue-mode-motion-communication)
- [Calibration](#calibration)
- [3D Mouse Control](#3d-mouse-control)

---

## Robot Motion

### Robot Run Status Query and Response

#### Teach Pendant Queries Robot Run Status

**Command Word:** `0x2304`

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Select robot, range [1, 4] |
| jobfilename | string | Yes | Job file name (excluding extension) |
| suffix | string | Yes | File extension: .JBR main program/.JBP background local program/.JBPG background global program |

**Request Example:**

```json
{
  "robot": 1,
  "jobfilename": "AAA",
  "suffix": ".JBR"
}
```

#### Controller Replies Robot Run Status

**Command Word:** `0x9103`

**Response Parameters:**

| Parameter | Type | Description |
|--------|------|------|
| robot | int | Robot number, range [1, 4] |
| status | int | Run status: 0-stopped, 1-paused, 2-running |
| continueRun | int | Whether breakpoint execution exists: 0/1 |
| currentRun | bool | Whether current line execution exists: false/true |
| mainProgramRun | int | Whether main program is running: 0/1 |

**Response Example:**

```json
{
  "robot": 1,
  "status": 0,
  "continueRun": 0,
  "currentRun": false,
  "mainProgramRun": 0
}
```

---

### Robot Motion Control

#### Robot Joint Motion MOVJ

**Command Word:** `0x4501`

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Select robot, range [1, 4] |
| vel | int | Yes | Speed percentage, range [1, 100] |
| coord | int | Yes | Coordinate system: 0-Joint, 1-Cartesian, 2-User, 3-Tool |
| pos | double[7] | Yes | Target position, first 7 values are robot body target position, last 5 are external axis target positions |

**Request Example:**

```json
{
  "robot": 1,
  "vel": 5,
  "coord": 0,
  "pos": [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7]
}
```

#### Robot Linear Motion MOVL

**Command Word:** `0x4502`

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Select robot, range [1, 4] |
| vel | int | Yes | Speed mm/s, range [1, 1000] |
| coord | int | Yes | Coordinate system: 0-Joint, 1-Cartesian, 2-User, 3-Tool |
| pos | double[7] | Yes | Target position, first 7 values are robot body target position, last 5 are external axis target positions |

**Request Example:**

```json
{
  "robot": 1,
  "vel": 5,
  "coord": 0,
  "pos": [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7]
}
```

#### Robot Circular Motion MOVC

**Command Word:** `0x4503`

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Select robot, range [1, 4] |
| vel | int | Yes | Speed mm/s, range [1, 1000] |
| coord | int | Yes | Coordinate system: 0-Joint, 1-Cartesian, 2-User, 3-Tool |
| isFull | bool | Yes | false-MOVC, true-MOVCA |
| posOne | double[7] | Yes | Arc start point, robot body point |
| posTwo | double[7] | Yes | Arc intermediate point, robot body point |
| posThree | double[7] | Yes | Arc target point, robot body point |

**Request Example:**

```json
{
  "robot": 1,
  "vel": 5,
  "coord": 0,
  "isFull": false,
  "posOne": [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7],
  "posTwo": [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7],
  "posThree": [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7]
}
```

#### Robot Spline Motion MOVS

**Command Word:** `0x4504`

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Select robot, range [1, 4] |
| vel | int | Yes | Speed mm/s, range [1, 1000] |
| coord | int | Yes | Coordinate system: 0-Joint, 1-Cartesian, 2-User, 3-Tool |
| size | int | Yes | Number of spline points, requires at least 4 points |
| pos | double[][7] | Yes | Spline trajectory points, two-dimensional array |

**Request Example:**

```json
{
  "robot": 1,
  "vel": 5,
  "coord": 0,
  "size": 4,
  "pos": [
    [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7],
    [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7],
    [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7],
    [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7]
  ]
}
```

---

### Move to Target Point

#### Move to Target Point

**Command Word:** `0x3003` GO_POSITION

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Robot number |
| positionName | string | Yes | Target point name: SetPosition_EntrancePoint/SetPosition_AuxiliaryPoint/SetPosition_JobPoint |
| RobotPos | object | Yes | Robot position object |

**RobotPos Internal Parameters:**

| Parameter | Type | Description |
|--------|------|------|
| ctype | int | Type: NONE_TYPE=0/P_TYPE/E_TYPE/RP_TYPE/AP_TYPE/GP_TYPE/GE_TYPE |
| data | double[21] | Position data array, see description below |
| key | string | Variable type |
| paraVarData | array | Variable array |

**data Array Description:**

| Index Position | Description |
|----------|------|
| 1st, 2nd | Coordinate type: 0,0-Joint; 1,1-Cartesian; 2,1-Tool; 3,1-User |
| 3rd | Left/right hand: 1-left, 2-right, 0-none (default 0) |
| 4th, 5th, 6th, 7th | Reserved, default 0 |
| 8th-14th | Robot body coordinate values (7 values): under joint coordinates are axis 1-6 angle values, under other coordinates are x,y,z,a,b,c |
| 15th-19th | External axis coordinate values (up to 5 external axes, padded with zeros if insufficient) |

**Request Example:**

```json
{
  "robot": 1,
  "positionName": "SetPosition_JobPoint",
  "RobotPos": {
    "ctype": 0,
    "key": "",
    "data": [1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 6.0, 0.0, 6.0, 3.141590, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    "paraVarData": [
      {"data": 1.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 1.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 6.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 6.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 3.141590, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""}
    ]
  }
}
```

> **Note:** No corresponding instruction in the program

#### Move to Job File Point

**Command Word:** `0x3005` GO_JOBFILEPOSITION

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Robot number |
| jobName | string | Yes | Job file name |
| suffixname | string | Yes | Job file extension (e.g., .JBR) |
| posName | string | Yes | Point name |

**Request Example:**

```json
{
  "robot": 1,
  "jobName": "Q1",
  "suffixname": ".JBR",
  "posName": "P001"
}
```

#### Move to User Coordinate Calibration Point

**Command Word:** `0x3006` GO_USERCALIBRATIONPOS

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Robot number |
| userNum | int | Yes | User number |
| posType | int | Yes | Point type: 0-origin, 1-X value, 2-Y value |

**Request Example:**

```json
{
  "robot": 1,
  "userNum": 1,
  "posType": 0
}
```

#### Move to Reset Point

**Command Word:** `0x3007` GO_RESET_POSITION

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Robot number |

**Request Example:**

```json
{
  "robot": 1
}
```

---

### Return to Zero Command

#### Return to Zero Command

**Command Word:** `0x3002` GO_HOME

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Robot number (1-4) |
| type | int | Yes | Return to zero type: 0-Robot return to zero, 1-External axis return to zero |

**Request Example:**

```json
{
  "robot": 1,
  "type": 1
}
```

---

## Robot Settings

### Jog Speed Settings

#### Set Joint Axis Jog Speed

**Command Word:** `0x2604` JOG_JOINTPARAMETER_SET

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| AxisNum | int | Yes | Joint axis number |
| minTrajectTime.minAccTime | float | Yes | Minimum acceleration time |
| minTrajectTime.minDecTime | float | Yes | Minimum deceleration time |
| MaxSpeed | float | Yes | Maximum jog speed of joint axis, unit: degree°/s |
| MaxAcc | float | Yes | Jog acceleration of joint axis, unit: degree°/s² |

**Request Example:**

```json
{
  "AxisNum": 1,
  "minTrajectTime": {
    "minAccTime": 0.10,
    "minDecTime": 0.10
  },
  "MaxSpeed": 10,
  "MaxAcc": 10
}
```

#### Query Joint Axis Jog Speed

**Send Command Word:** `0x2605` JOG_JOINTPARAMETER_INQUIRE

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| AxisNum | int | Yes | Joint axis number |

**Response Command Word:** `0x2606` JOG_JOINTPARAMETER_RESPOND

**Response Parameters:**

| Parameter | Type | Description |
|--------|------|------|
| AxisNum | int | Joint axis number |
| MaxSpeed | float | Maximum jog speed of joint axis, unit: degree°/s |
| MaxAcc | float | Jog acceleration of joint axis, unit: degree°/s² |

**Response Example:**

```json
{
  "AxisNum": 1,
  "MaxSpeed": 10,
  "MaxAcc": 10
}
```

#### Set Cartesian Jog Speed

**Command Word:** `0x2607` JOG_RECTPARAMETER_SET

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| MaxSpeed | float | Yes | Maximum jog speed of joint axis, unit: mm/s |
| MaxAcc | float | Yes | Jog acceleration of joint axis, unit: mm/s² |

**Request Example:**

```json
{
  "MaxSpeed": 10,
  "MaxAcc": 10
}
```

#### Query Cartesian Jog Speed

**Send Command Word:** `0x2608` JOG_RECTPARAMETER_INQUIRE

data: empty

**Response Command Word:** `0x2609` JOG_RECTPARAMETER_RESPOND

**Response Parameters:**

| Parameter | Type | Description |
|--------|------|------|
| MaxSpeed | float | Maximum jog speed of joint axis, unit: mm/s |
| MaxAcc | float | Jog acceleration of joint axis, unit: mm/s² |

**Response Example:**

```json
{
  "MaxSpeed": 10,
  "MaxAcc": 10
}
```

---

### Jog Sensitivity Settings

#### Set Jog Sensitivity

**Command Word:** `0x260A` JOG_SENSITIVITY_SET

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| Sensitivity | float | Yes | Sensitivity, unit: degree, range: 0.001 - 1 |

**Request Example:**

```json
{
  "Sensitivity": 0.001
}
```

#### Query Jog Sensitivity

**Send Command Word:** `0x260B` JOG_SENSITIVITY_INQUIRE

data: empty

**Response Command Word:** `0x260C` JOG_SENSITIVITY_RESPOND

**Response Parameters:**

| Parameter | Type | Description |
|--------|------|------|
| Sensitivity | float | Sensitivity, unit: degree, range: 0.001 - 1 |

**Response Example:**

```json
{
  "Sensitivity": 0.001
}
```

---

### Current Position Acquisition

#### Coordinate Mode Description

| Coordinate Mode Value | Description |
|------------|------|
| -1 | Controller current coordinate |
| 0 | Joint (Joint) |
| 1 | Cartesian (Cart) |
| 2 | Tool (Tool) |
| 3 | User (User) |
| 4 | Motor position |

#### Get Current Position

**Send Command Word:** `0x2A02` CURRENTPOS_INQUIRE

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Robot number (1, 2, 3, 4) |
| coord | int | Yes | Coordinate mode: -1-Controller current coordinate, 0-Joint, 1-Cartesian, 2-Tool, 3-User, 4-Motor position |

**Request Example:**

```json
{
  "robot": 1,
  "coord": 2
}
```

**Response Command Word:** `0x2A03` CURRENTPOS_RESPOND

**Response Parameters:**

| Parameter | Type | Description |
|--------|------|------|
| robot | int | Robot number (1, 2, 3, 4) |
| deg | int | Whether it is ACS coordinate system; 0: yes; 1: no |
| pos | array | Radian point values, coordinate values stored in 7 digits under joint coordinates. First six values are J1~J6 axis angle values (degrees) or Cartesian/Tool/User coordinates XYZ (millimeters), values four to six are ABC coordinate values (radians), seventh value reserved |
| posDeg | array | Angle point values, ABC radian values under Cartesian/Tool/User coordinates converted to angle values, other state values are consistent with pos |
| coord | int | Coordinate mode: -1-Controller current coordinate, 0-Joint, 1-Cartesian, 2-Tool, 3-User, 4-Motor position |
| configuration | int | Posture or (SCARA) left/right hand |

**Response Example:**

```json
{
  "robot": 1,
  "deg": 1,
  "pos": [0, 0.1, 2, 3.3, 44, 555.55, 0.0],
  "posDeg": [0.0, 0.0, 1, 2, 3.3, 44, 5.55],
  "coord": -1,
  "configuration": 1
}
```

#### Query Motor Speed

**Send Command Word:** `0x2A04` CURRENTVEL_INQUIRE

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Robot number (1, 2, 3, 4) |

**Request Example:**

```json
{
  "robot": 1
}
```

**Response Command Word:** `0x2A05` CURRENTVEL_RESPOND

**Response Parameters:**

| Parameter | Type | Description |
|--------|------|------|
| robot | int | Robot number (1, 2, 3, 4) |
| vel | array | Motor speed, 4-axis also sends six values |
| velSync | array | External axis motor speed |
| maxVel | array | Maximum motor speed |
| maxVelSync | array | Maximum external axis motor speed |

**Response Example:**

```json
{
  "robot": 1,
  "vel": [0, 0, 0, 0, 0, 0],
  "velSync": [0, 0, 0, 0, 0],
  "maxVel": [0, 0, 0, 0, 0, 0],
  "maxVelSync": [0, 0, 0, 0, 0]
}
```

#### Query Motor Torque

**Send Command Word:** `0x2A06` CURRENTTORQ_INQUIRE

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Robot number (1, 2, 3, 4) |

**Request Example:**

```json
{
  "robot": 1
}
```

**Response Command Word:** `0x2A07` CURRENTTORQ_RESPOND

**Response Parameters:**

| Parameter | Type | Description |
|--------|------|------|
| robot | int | Robot number (1, 2, 3, 4) |
| torq | array | Motor torque |
| theoTorq | array | Theoretical motor torque |
| maxTorq | array | Maximum motor torque |
| maxTheoTorq | array | Maximum theoretical motor torque |
| maxTorqSync | array | Maximum external axis motor torque |
| torqSync | array | External axis motor torque |

**Response Example:**

```json
{
  "robot": 1,
  "torq": [0, 0, 0, 0, 0, 0],
  "theoTorq": [0, 0, 0, 0, 0, 0],
  "maxTorq": [0, 0, 0, 0, 0, 0],
  "maxTheoTorq": [0, 0, 0, 0, 0, 0],
  "maxTorqSync": [0, 0, 0, 0, 0],
  "torqSync": [0, 0, 0, 0, 0]
}
```

---

### Run Parameter Settings

#### Set Run Parameters

**Command Word:** `0x2801` INTERPOLATION_MODE_SET

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| absolutePosResolution | float | Yes | Absolute position resolution, range: 0.0001 - 0.1 degrees |
| interpolationMethod | int | Yes | Robot interpolation method: 0-S-curve, 1-Trapezoidal, 2-Jerk interpolation |
| runDelayTime | int | Yes | Run delay time, range: 500 - 20000 ms |
| stopTime | int | Yes | Pause time, range: 240 - 2000 ms |

**Request Example:**

```json
{
  "absolutePosResolution": 0.010,
  "interpolationMethod": 0,
  "runDelayTime": 500,
  "stopTime": 240
}
```

#### Query Run Parameters

**Send Command Word:** `0x2802` INTERPOLATION_MODE_INQUIRE

data: none

**Response Command Word:** `0x2803` INTERPOLATION_MODE_RESPOND

**Response Parameters:**

| Parameter | Type | Description |
|--------|------|------|
| absolutePosResolution | float | Absolute position resolution, unit: degrees |
| interpolationMethod | int | Robot interpolation method: 0-S-curve, 1-Trapezoidal, 2-Jerk interpolation |
| runDelayTime | int | Run delay time, unit: ms |
| stopTime | int | Pause time, unit: ms |

**Response Example:**

```json
{
  "absolutePosResolution": 0.010,
  "interpolationMethod": 0,
  "runDelayTime": 500,
  "stopTime": 240
}
```

---

### Query Robot Type and Count

#### Query Robot Type

**Send Command Word:** `0x2E02` ROBOT_TYPE_INQUIRE

data: null

**Response Command Word:** `0x2E03` ROBOT_TYPE_RESPOND

**Response Parameters:**

| Parameter | Type | Description |
|--------|------|------|
| type | int | Current robot type |

**Response Example:**

```json
{
  "type": 1
}
```

**Robot Type Reference Table:**

| Type Value | Description |
|--------|------|
| 0 | None |
| 1 | General 6-axis serial multi-joint |
| 2 | 4-axis SCARA |
| 3 | 4-axis palletizing |
| 4 | 4-axis serial multi-joint |
| 5 | Single-axis |
| 6 | 5-axis serial multi-joint |
| 7 | 6-axis collaborative |
| 8 | 2-axis SCARA |
| 9 | 3-axis SCARA |
| 10 | 3-axis Cartesian |
| 11 | 3-axis special type 1 |
| 12 | 7-axis serial multi-joint |
| 13 | SCARA special type 1 |
| 14 | 4-axis palletizing screw |
| ... | More types omitted |

#### Query Robot Count

**Send Command Word:** `0x2E05` ROBOT_SUM_INQUIRE

data: null

**Response Command Word:** `0x2E06` ROBOT_SUM_RESPOND

**Response Parameters:**

| Parameter | Type | Description |
|--------|------|------|
| sum | int | Robot count |

**Response Example:**

```json
{
  "sum": 1
}
```

#### Set Robot Communication Cycle

**Command Word:** `0x2E07` CONTROL_CYCLE_SET

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| controlCycle | int | Yes | Communication cycle, range: 1, 2, 4, 8, takes effect after controller restart |
| baudRate | string | Yes | CAN_OPEN baud rate |

**Request Example:**

```json
{
  "controlCycle": 1,
  "baudRate": "10K"
}
```

#### Query Robot Communication Cycle

**Send Command Word:** `0x2E08` CONTROL_CYCLE_INQUIRE

data: null

**Response Command Word:** `0x2E09` CONTROL_CYCLE_RESPOND

**Response Parameters:**

| Parameter | Type | Description |
|--------|------|------|
| controlCycle | int | Communication cycle |

**Response Example:**

```json
{
  "controlCycle": 1
}
```

#### Query Controller Function Limits

**Send Command Word:** `0x2E0B` CONTROLLER_LIMIT_INQUIRE

data: null

**Response Command Word:** `0x2E0C` CONTROLLER_LIMIT_RESPOND

**Response Parameters:**

| Parameter | Type | Description |
|--------|------|------|
| robotsum | int | Robot count |
| maxRobotCount | int | Maximum robot count |
| robottypes | object | Robot type unlock status, true-unlocked, false-locked |
| craft | object | Process unlock status, true-unlocked, false-locked |

**Response Example:**

```json
{
  "robotsum": 2,
  "maxRobotCount": 4,
  "robottypes": {
    "R_GENERAL_6S": false,
    "R_SCARA": true,
    "R_FOURAXIS_PALLET": true,
    "R_FOURAXIS": true,
    "R_GENERAL_1S": true,
    "R_GENERAL_5S": true,
    "R_GENERAL_6S_1": true,
    "R_SCARA_TWOAXIS": true,
    "R_SCARA_THREEAXIS": true,
    "R_THREE_CARTESIAN_COORDINATE": true,
    "R_THREE_CARTESIAN_COORDINATE_1": true,
    "R_GENERAL_7S": true,
    "R_SCARA_1": true,
    "R_FOURAXIS_PALLET_1": true,
    "R_FOUR_CARTESIAN_COORDINATE": true,
    "R_SIXAXIS_SPRAY_BBR": true,
    "R_FOUR_POLAR_COORDINATE_1": true,
    "R_GENERAL_6S_2": true,
    "R_GANTRY_WELD": true,
    "R_DELTA": true,
    "R_WINE_CHAMFER": true
  },
  "craft": {
    "pallet": true,
    "weld": false,
    "lasercut": true,
    "polish": true,
    "spray": true,
    "search": true,
    "pun": true,
    "vision": true
  }
}
```

---

## External Axis Motion

### Robot External Axis Joint Motion MOVJEXT

**Command Word:** `0x4507`

**Request Parameters:**

| Parameter | Type | Required | Description | Range |
|--------|------|------|------|----------|
| robot | int | Yes | Select robot | [1, 4] |
| vel | int | Yes | Speed | [1, 100], unit: % |
| coord | int | Yes | Coordinate system | 0-Joint, 1-Cartesian, 2-User, 3-Tool |
| pos | double[12] | Yes | Target position: first 7 values are robot body target position, last 5 are external axis target positions | - |

**Request Example:**

```json
{
  "robot": 1,
  "vel": 5,
  "coord": 0,
  "pos": [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7, 1.0, 2.0, 3.0, 4.0, 5.0]
}
```

---

### Robot External Axis Linear Motion MOVLEXT

**Command Word:** `0x4508`

**Request Parameters:**

| Parameter | Type | Required | Description | Range |
|--------|------|------|------|----------|
| robot | int | Yes | Select robot | [1, 4] |
| vel | int | Yes | Speed | [1, 1000], unit: mm/s |
| coord | int | Yes | Coordinate system | 0-Joint, 1-Cartesian, 2-User, 3-Tool |
| pos | double[12] | Yes | Target position: first 7 values are robot body target position, last 5 are external axis target positions | - |

**Request Example:**

```json
{
  "robot": 1,
  "vel": 5,
  "coord": 0,
  "pos": [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7, 1.0, 2.0, 3.0, 4.0, 5.0]
}
```

---

### Robot External Axis Circular Motion MOVCEXT

**Command Word:** `0x4509`

**Request Parameters:**

| Parameter | Type | Required | Description | Range |
|--------|------|------|------|----------|
| robot | int | Yes | Select robot | [1, 4] |
| vel | int | Yes | Speed | [1, 1000], unit: mm/s |
| coord | int | Yes | Coordinate system | 0-Joint, 1-Cartesian, 2-User, 3-Tool |
| posOne | double[12] | Yes | Arc start point: first 7 values are robot body target position, last 5 are external axis target positions | - |
| posTwo | double[12] | Yes | Arc intermediate point: first 7 values are robot body target position, last 5 are external axis target positions | - |
| posThree | double[12] | Yes | Arc target point: first 7 values are robot body target position, last 5 are external axis target positions | - |

**Request Example:**

```json
{
  "robot": 1,
  "vel": 5,
  "coord": 0,
  "posOne": [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7, 1.0, 2.0, 3.0, 4.0, 5.0],
  "posTwo": [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7, 1.0, 2.0, 3.0, 4.0, 5.0],
  "posThree": [1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7, 1.0, 2.0, 3.0, 4.0, 5.0]
}
```

---

### External Axis Move to Target Point

**Command Word:** `0x3004` (GO_SYNCPOSITION)

#### RobotPos Structure Description

| Field | Type | Description |
|------|------|------|
| ctype | int | P type: NONE_TYPE=0, P_TYPE, E_TYPE, RP_TYPE, AP_TYPE, GP_TYPE, GE_TYPE |
| data | double[21] | Position data array, see array index description below |
| key | string | Variable type |
| paraVarData | array | Variable data array |

#### data Array Index Description

| Index Position | Meaning | Description |
|----------|------|------|
| 0, 1 | Coordinate system identifier | 0 0-Joint, 1 1-Cartesian, 2 1-Tool, 3 1-User |
| 2 | Left/right hand | 1-left, 2-right, 0-none (default 0) |
| 3, 4, 5, 6 | Reserved | Default 0 |
| 7 ~ 13 | Robot body coordinates | 7 values, under joint coordinates represents axis 1-6 angle values, under other coordinates represents x,y,z,a,b,c |
| 14 ~ 18 | External axis coordinates | Supports up to 5 external axes, only joint values, padded with zeros if insufficient |

**Request Example:**

```json
{
  "RobotPos": {
    "ctype": 0,
    "data": [1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 6.0, 0.0, 6.0, 3.141590, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    "key": "",
    "paraVarData": [
      {"data": 1.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 1.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 6.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 6.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 3.141590, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""},
      {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""}
    ]
  },
  "robot": 1
}
```

---

## External Axis Settings

### 1. Positioner Coordinate Correction Calculation Settings

**Command ID:** `0x7001` SYNCPOSITIONER_CALIBRATION_SET

**Description:** Positioner coordinate correction calculation settings, send the following command

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| calibrateNum | int | Yes | Positioner group number, available values: 1, 2, 3 |

**Request Example:**

```json
{
  "calibrateNum": 1
}
```

**Controller Response Command ID:** `0x7004` SYNCPOSITIONER_CALIBRATION_RESULT

**Response Parameters:**

| Parameter | Type | Description |
|--------|------|------|
| result | bool | Whether external axis data calculation succeeded |

**Response Example:**

```json
{
  "result": true
}
```

---

### 2. Calibration Point Coordinates

**Command ID:** `0x7002` SYNCPOSITIONER_CALIBRATION_INQUIRE

**Description:** Calibration point coordinates, send the following command

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| syncPositionerNum | int | Yes | Positioner group number, available values: 1, 2, 3 |
| pointNum | int | Yes | Range: 0~3 or 5 |

**Request Example:**

```json
{
  "syncPositionerNum": 1,
  "pointNum": 0
}
```

**Controller Response Command ID:** `0x7003` SYNCPOSITIONER_CALIBRATION_RESPOND

**Response Parameters:**

| Parameter | Type | Description |
|--------|------|------|
| syncPositionerNum | int | Positioner group number, available values: 1, 2, 3 |
| pointNum | int | Range: 0~3 or 5 |
| pos | array | Current point |

**Response Example:**

```json
{
  "syncPositionerNum": 1,
  "pointNum": 0,
  "pos": [0, 0, 0, 0, 0, 0]
}
```

---

### 3. Query All External Axis Calibration Results

**Command ID:** `0x7005` SYNCPOSITIONER_TYPEANDCALIBRATIONRESULT_INQUIRE

**Description:** Query all external axis calibration results

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Robot number |

**Request Example:**

```json
{
  "robot": 1
}
```

**Response Command ID:** `0x7006` SYNCPOSITIONER_TYPEANDCALIBRATIONRESULT_RESPOND

**Response Parameters:**

| Parameter | Type | Description |
|--------|------|------|
| robot | int | Robot number |
| calibrateResult | array | Whether calibrated, array indicates whether external axis group numbers are calibrated |
| syncType | array | Synchronization type |

**Response Example:**

```json
{
  "robot": 1,
  "calibrateResult": [false, false, true],
  "syncType": [1, 1, 1]
}
```

---

### 4. Calibration Result Query

**Command ID:** `0x7007` SYNCPOSITIONER_COORD_INQUIRE

**Description:** Calibration result query (teach pendant does not have this function)

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| syncPositionerNum | int | Yes | Positioner group number |
| coordNum | int | Yes | Get calibration result |

**Request Example:**

```json
{
  "syncPositionerNum": 1,
  "coordNum": 0
}
```

**Response Command ID:** `0x7008` SYNCPOSITIONER_COORD_RESPOND

**Response Parameters:**

| Parameter | Type | Description |
|--------|------|------|
| syncPositionerNum | int | Positioner group number |
| coordNum | int | Calibration result number |
| pos | array | Current point |

**Response Example:**

```json
{
  "syncPositionerNum": 1,
  "coordNum": 1,
  "pos": [0, 0, 0, 0, 0, 0]
}
```

---

### 5. Set Current Collaborative External Axis Group Number

**Command ID:** `0x7009` SYNCPOSITIONER_COORDNUM_SWITCH

**Description:** Set current collaborative external axis group number

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| curSyncPositionerNum | int | Yes | Current collaborative external axis group number |

**Request Example:**

```json
{
  "curSyncPositionerNum": 3
}
```

**Query Current Collaborative External Axis Group Number:**

**Command ID:** `0x700A` SYNCPOSITIONER_COORDNUM_INQUIRE

**Description:** No data needs to be sent

**Controller Response Command ID:** `0x700B` SYNCPOSITIONER_COORDNUM_RESPOND

**Response Parameters:**

| Parameter | Type | Description |
|--------|------|------|
| curSyncPositionerNum | int | Current collaborative external axis group number |

**Response Example:**

```json
{
  "curSyncPositionerNum": 2
}
```

---

### 6. Set Ground Track Parameters

**Command ID:** `0x700D` SYNCTRACK_SET

**Description:** Set ground track parameters, teach pendant sends the following command

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| calibrateResult | bool | Yes | Whether collaborative |
| xConversionRatio | float | Yes | X direction conversion ratio |
| yConversionRatio | float | Yes | Y direction conversion ratio |
| zConversionRatio | float | Yes | Z direction conversion ratio |

**Request Example:**

```json
{
  "calibrateResult": true,
  "xConversionRatio": 1.0,
  "yConversionRatio": 1.0,
  "zConversionRatio": 1.0
}
```

**Query Command ID:** `0x700E` SYNCTRACK_INQUIRE

**Controller Response Command ID:** `0x700F` SYNCTRACK_RESPOND

**Response Example:**

```json
{
  "calibrateResult": true,
  "xConversionRatio": 1.0,
  "yConversionRatio": 1.0,
  "zConversionRatio": 1.0
}
```

---

### 7. Current Position Query

**Command ID:** `0x7012` SYNC_POS_INQUIRE

**Description:** External axis settings interface, teach pendant sends the following command

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| robot | int | Yes | Robot number |
| coord | int | Yes | Coordinate mode<br>- -1: Controller current coordinate<br>- 0: Joint<br>- 1: Cartesian<br>- 2: Tool<br>- 3: User |

**Request Example:**

```json
{
  "robot": 1,
  "coord": 0
}
```

**Controller Response Command ID:** `0x7013` SYNC_POS_RESPOND

**Description:** Reset point settings interface, controller sends when receiving current position query

**Response Parameters:**

| Parameter | Type | Description |
|--------|------|------|
| robot | int | Robot number |
| coord | int | Coordinate mode<br>- -1: Controller current coordinate<br>- 0: Joint<br>- 1: Cartesian<br>- 2: Tool<br>- 3: User |
| configuration | int | Posture or left/right hand |
| pos | array | Current position (radians) |
| posDeg | array | Current position (degrees) |
| posSync | array | External axis current position |

**Response Example:**

```json
{
  "robot": 1,
  "coord": 0,
  "configuration": 1,
  "pos": [0, 0.1, 2, 3.3, 44, 555.55, 66.6, 77.77],
  "posDeg": [0, 0.1, 2, 3.3, 44, 555.55, 66.6, 77.77],
  "posSync": [0, 0.1, 2, 3.3, 44, 555.55, 66.6, 77.77]
}
```

---

### 8. Dual-Robot Collaboration Enable

**Set Dual-Robot Collaboration Enable Command ID:** `0x7015` COOPERATIVE_SET

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| cooperativeRobot | int | Yes | Collaboration setting<br>- 0: No collaboration<br>- 1: Collaboration |

**Request Example:**

```json
{
  "cooperativeRobot": 0
}
```

**Get Collaboration Status Command ID:** `0x7016` COOPERATIVE_INQUIRE

**Response Collaboration Status Command ID:** `0x7017` COOPERATIVE_RESPOND

**Response Parameters:**

| Parameter | Type | Description |
|--------|------|------|
| cooperativeRobot | int | Collaboration status<br>- 0: No collaboration<br>- 1: Collaboration |

**Response Example:**

```json
{
  "cooperativeRobot": 0
}
```

---

### 9. External Axis Joint Parameter Settings

**Command ID:** `0x7021` JOINTPARAMETER_SYNCPOSITIONER_SET

**Description:** External axis joint parameter settings

#### Single-Axis Positioner

**Request Example:**

```json
{
  "Joint": [
    {
      "BackLash": 0.0,
      "DeRatedVel": -30000.0,
      "Direction": 1.0,
      "EncoderResolution": 17.0,
      "MaxAcc": 1.0,
      "MaxDeRotSpeed": -1.0,
      "MaxDecel": -1.0,
      "MaxRotSpeed": 1.0,
      "maxJerkAcc": 1.0,
      "maxJerkDec": -1.0,
      "NegSWLimit": -360.0,
      "PosSWLimit": 720.0,
      "RatedDeRotSpeed": -5000.0,
      "RatedRotSpeed": 5000.0,
      "RatedVel": 30000.0,
      "ReducRatio": 1.0,
      "syncAxisNum": 1,
      "syncGroupNum": 1
    }
  ],
  "syncGroupNum": 1
}
```

#### Dual-Axis Positioner

**Request Example:**

```json
{
  "Joint": [
    {
      "BackLash": 0.0,
      "DeRatedVel": -18000.0,
      "Direction": 1.0,
      "EncoderResolution": 17.0,
      "MaxAcc": 1.0,
      "MaxDeRotSpeed": -1.0,
      "MaxDecel": -1.0,
      "MaxRotSpeed": 1.0,
      "NegSWLimit": -100.0,
      "PosSWLimit": 100.0,
      "RatedDeRotSpeed": -3000.0,
      "RatedRotSpeed": 3000.0,
      "RatedVel": 18000.0,
      "ReducRatio": 1.0,
      "maxJerkAcc": 1.0,
      "maxJerkDec": -1.0,
      "syncAxisNum": 1,
      "syncGroupNum": 2
    },
    {
      "BackLash": 0.0,
      "DeRatedVel": -12000.0,
      "Direction": -1.0,
      "EncoderResolution": 17.0,
      "MaxAcc": 1.0,
      "MaxDeRotSpeed": -1.0,
      "MaxDecel": -1.0,
      "MaxRotSpeed": 1.0,
      "NegSWLimit": -80.0,
      "PosSWLimit": 80.0,
      "RatedDeRotSpeed": -2000.0,
      "RatedRotSpeed": 2000.0,
      "RatedVel": 12000.0,
      "ReducRatio": 1.0,
      "maxJerkAcc": 1.0,
      "maxJerkDec": -1.0,
      "syncAxisNum": 2,
      "syncGroupNum": 2
    }
  ],
  "syncGroupNum": 2
}
```

**Joint Parameter Description:**

| Parameter | Type | Description |
|--------|------|------|
| BackLash | float | Gear backlash |
| DeRatedVel | float | Rated negative velocity |
| Direction | float | Direction: 1.0 indicates forward |
| EncoderResolution | float | Encoder resolution (bits) |
| MaxAcc | float | Maximum acceleration |
| MaxDeRotSpeed | float | Maximum reverse rotation speed |
| MaxDecel | float | Maximum deceleration |
| MaxRotSpeed | float | Maximum forward rotation speed |
| maxJerkAcc | float | Maximum jerk acceleration |
| maxJerkDec | float | Maximum jerk deceleration |
| NegSWLimit | float | Negative limit angle |
| PosSWLimit | float | Positive limit angle |
| RatedDeRotSpeed | float | Rated reverse rotation speed |
| RatedRotSpeed | float | Rated forward rotation speed |
| RatedVel | float | Rated velocity |
| ReducRatio | float | Joint reduction ratio |
| syncAxisNum | int | Axis number |
| syncGroupNum | int | Synchronization group number |

**Root Level Parameter Description:**

| Parameter | Type | Description |
|--------|------|------|
| syncGroupNum | int | Synchronization group number |

**Query Joint Parameters Command ID:** `0x7022` JOINTPARAMETER_SYNCPOSITIONER_INQUIRE

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| syncGroupNum | int | Yes | Synchronization group number |

**Request Example:**

```json
{
  "syncGroupNum": 1
}
```

**Joint Parameter Response Command ID:** `0x7023` JOINTPARAMETER_SYNCPOSITIONER_RESPOND

**Description:** Same as 0x7021

---

### 10. External Axis Jog Joint Speed Settings

**Command ID:** `0x7024` JOG_JOINTPARAMETER_SYNCPOSITIONER_SET

**Description:** External axis jog joint speed settings

---

## Force Functions

### 1. Collision Detection

#### Collision Detection Switch Settings

| Field | Type | Description |
|------|------|------|
| 0x7406 | COLLISION_DETECTION_SET | |

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| switch | bool | Yes | Collision detection switch |

**Request Example:**

```json
{
  "switch": true
}
```

#### Get Collision Detection Switch Status

| Field | Type | Description |
|------|------|------|
| 0x7407 | COLLISION_DETECTION_INQUIRE | |

**Request Parameters:** None

#### Controller Response

| Field | Type | Description |
|------|------|------|
| 0x7408 | COLLISION_DETECTION_RESPOND | |

**Response Parameters:**

| Parameter | Type | Description |
|--------|------|------|
| is_identification | bool | Identification status |
| restrart_switch | bool | Restart switch |
| switch | bool | Collision detection switch |

**Response Example:**

```json
{
  "is_identification": true,
  "restrart_switch": true,
  "switch": true
}
```

#### Collision Detection Parameter Settings

| Field | Type | Description |
|------|------|------|
| 0x7409 | COLLISION_DETECTION_PARAM_SET | |

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| Co_De_para | array[double] | Yes | Thresholds, array length 6 |
| error_enable_time | double | Yes | Error allow time |
| pos_delay_time | double | Yes | Command position response time |

**Request Example:**

```json
{
  "Co_De_para": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0],
  "error_enable_time": 2.0,
  "pos_delay_time": 1.0
}
```

#### Get Collision Detection Parameters

| Field | Type | Description |
|------|------|------|
| 0x740A | COLLISION_DETECTION_PARAM_INQUIRE | |

**Request Parameters:** None

**Controller Response Command Word:** `0x740B` COLLISION_DETECTION_PARAM_RESPOND

**Response Parameters:** Same as 0x7409

---

### 2. Torque Feedforward

#### Torque Feedforward Switch Settings

| Field | Type | Description |
|------|------|------|
| 0x740C | TORQ_FEEDBACK_SET | |

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| torqFeedback | bool | Yes | Torque feedforward switch |

**Request Example:**

```json
{
  "torqFeedback": true
}
```

#### Query Torque Feedforward Status

| Field | Type | Description |
|------|------|------|
| 0x740D | TORQ_FEEDBACK_INQUIRE | |

**Request Parameters:** None

#### Controller Response

| Field | Type | Description |
|------|------|------|
| 0x740E | TORQ_FEEDBACK_RESPOND | |

**Response Parameters:** Same as 0x740C

---

### 3. Drag Teaching

#### Query Drag Teaching

| Field | Type | Description |
|------|------|------|
| 0x7501 | DRAG_TRAJ_INQUIRE | |

**Request Parameters:** None

#### Controller Response

| Field | Type | Description |
|------|------|------|
| 0x7502 | DRAG_TRAJ_RESPOND | |

**Response Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| TrajName | array[string] | Yes | Trajectory name list |

**Response Example:**

```json
{
  "TrajName": ["RRR", "TTT"]
}
```

#### Drag Teaching Parameter Settings

| Field | Type | Description |
|------|------|------|
| 0x7504 | DRAG_PARAM_SET | |

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| DecareLimit | double | Yes | Cartesian space linear velocity limit |
| JointVelLimit | double | Yes | Joint space velocity limit |
| drag_mode | int | Yes | Drag mode: 0-Free drag, 1-Position drag, 2-Posture drag |
| frictionOffset | array[double] | Yes | Friction compensation correction coefficients for joints 1-6 |
| dragCoefficient | array[double] | Yes | Joint over-limit resistance coefficient, length 6, range [1,100] |

**Request Example:**

```json
{
  "DecareLimit": 1.0,
  "JointVelLimit": 2.0,
  "drag_mode": 0,
  "frictionOffset": [3.0, 3.0, 3.0, 3.0, 3.0, 3.0],
  "dragCoefficient": [5.0, 5.0, 5.0, 5.0, 5.0, 5.0]
}
```

#### Get Drag Teaching Parameters

| Field | Type | Description |
|------|------|------|
| 0x7505 | DRAG_PARAM_INQUIRE | |

**Request Parameters:** None

#### Controller Response

| Field | Type | Description |
|------|------|------|
| 0x7506 | DRAG_PARAM_RESPOND | |

**Response Parameters:** Same as 0x7504

---

### 4. Drag Trajectory Related

#### Drag Teaching Trajectory Playback Parameter Settings

| Field | Type | Description |
|------|------|------|
| 0x7507 | DRAG_TRAJ_PARAM_SET | |

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| MaxSamplingNum | double | Yes | Maximum sampling points |
| SamplingInterval | double | Yes | Sampling interval |
| Start | bool | Yes | false-stop, true-start |

**Request Example:**

```json
{
  "MaxSamplingNum": 3000.0,
  "SamplingInterval": 0.030,
  "Start": false
}
```

#### Query Drag Trajectory Parameters

| Field | Type | Description |
|------|------|------|
| 0x7508 | DRAG_TRAJ_PARAM_INQUIRE | |

**Request Parameters:** None

#### Controller Response

| Field | Type | Description |
|------|------|------|
| 0x7509 | DRAG_TRAJ_PARAM_RESPOND | |

**Response Parameters:** Same as 0x7507

#### Query Whether Trajectory Is Being Recorded

| Field | Type | Description |
|------|------|------|
| 0x750A | DRAG_TRAJ_RECORD_INQUIRE | |

**Request Parameters:** None

#### Controller Response

| Field | Type | Description |
|------|------|------|
| 0x750B | DRAG_TRAJ_RECORD_RESPOND | |

**Response Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| record | bool | Yes | Whether drag trajectory is being recorded |

**Response Example:**

```json
{
  "record": true
}
```

#### Trajectory Playback

| Field | Type | Description |
|------|------|------|
| 0x750C | DRAG_TRAJ_PLAYBACK | |

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| trajName | string | Yes | Trajectory name |
| vel | int | Yes | Trajectory playback speed, teach pendant fixed sends 100 |

**Request Example:**

```json
{
  "trajName": "",
  "vel": 100
}
```

#### Save Trajectory

| Field | Type | Description |
|------|------|------|
| 0x750D | DRAG_TRAJ_SAVE | |

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| TrajName | string | Yes | Trajectory name |

**Request Example:**

```json
{
  "TrajName": "SSSSS"
}
```

#### Delete Trajectory

| Field | Type | Description |
|------|------|------|
| 0x750E | DRAG_TRAJ_DELETE | |

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| TrajName | string | Yes | Trajectory name |

**Request Example:**

```json
{
  "TrajName": "SSSSS"
}
```

#### Drag Mode Settings

| Field | Type | Description |
|------|------|------|
| 0x750F | DRAG_MODE | |

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| mode | int | Yes | Drag mode: 0-None, 1-3D mouse, 2-Torque |
| port | int | Yes | External trigger signal port number |
| value | int | Yes | External trigger signal value |

**Request Example:**

```json
{
  "mode": 2,
  "port": 3,
  "value": 1
}
```

#### Query Drag Mode

| Field | Type | Description |
|------|------|------|
| 0x7510 | DRAG_MODE_INQUIRE | |

**Request Parameters:** None

#### Controller Response

| Field | Type | Description |
|------|------|------|
| 0x7511 | DRAG_MODE_RESPOND | |

**Response Parameters:** Same as 0x750F

---

### 5. External Buttons

#### Query Function Control Parameters

| Field | Type | Description |
|------|------|------|
| 0x9114 | FUNCTIONALCONTROL_INQUIRE | |

**Request Parameters:** None

#### Controller Response

| Field | Type | Description |
|------|------|------|
| 0x9115 | FUNCTIONALCONTROL_RESPOND | |

> Array index description: 0-Drag mode, 1-Jog mode, 2-Start trajectory acquisition, 3-Stop trajectory acquisition, 4-Start trajectory playback, 5-Power on, 6-Power off, 7-Gripper open, 8-Gripper close, 9-Save trajectory

**Response Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| IoInPortArr | array[int] | Yes | Trigger port (DIN), array length 11 |
| hardwareTypeArr | array[int] | Yes | Hardware type: 0-IO, array length 11 |
| modeArr | array[int] | Yes | Trigger method: 0-Long press trigger port, 1-Short press trigger port, array length 11 |
| parameterArr | array[int] | Yes | Parameter: 0-Trigger when port is off, 1-Trigger when port is on, array length 11 |

**Response Example:**

```json
{
  "IoInPortArr": [1, 2, 3, 4, 5, 0, 6, 7, 8, 9, 10],
  "hardwareTypeArr": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "modeArr": [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  "parameterArr": [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0]
}
```

#### Status Prompt Query

| Field | Type | Description |
|------|------|------|
| 0x9116 | STATUSPROMPT_INQUIRE | |

**Request Parameters:** None

#### Controller Response

| Field | Type | Description |
|------|------|------|
| 0x9117 | STATUSPROMPT_RESPOND | |

> Array index description: 0-Drag mode, 1-Jog mode, 2-Start trajectory acquisition, 3-Stop trajectory acquisition, 4-Start trajectory playback, 5-Power on, 6-Power off, 7-Gripper open, 8-Gripper close

**Response Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| IoDoutPortArr | array[int] | Yes | Trigger port (DOUT), array length 11 |
| hardwareTypeArr | array[int] | Yes | Hardware type: 0-IO, array length 11 |
| parameterArr | array[int] | Yes | Parameter: 0-Trigger port off, 1-Trigger port on, 2-Blink, array length 11 |

**Response Example:**

```json
{
  "IoDoutPortArr": [1, 2, 3, 4, 5, 0, 6, 7, 0, 0, 0],
  "hardwareTypeArr": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "parameterArr": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}
```

#### Set External Button Parameters

| Field | Type | Description |
|------|------|------|
| 0x9118 | EXTERNKEYPARA_SET | |

**Request Parameters:**

| Parameter | Type | Required | Description |
|--------|------|------|------|
| _isFunctionalControl | bool | Yes | true-Set function control parameters, false-Set status prompt parameters |
| hardwareTypeArr | array[int] | Yes | Hardware type: 0-IO, array length 11 |
| isClearTrack | int | Yes | Whether to clear trajectory after saving |
| modeArr | array[int] | Yes | Trigger method: 0-Long press trigger port, 1-Short press trigger port, array length 11 |
| parameterArr | array[int] | Yes | Parameters, array length 11 |
| portArr | array[int] | Yes | Trigger ports, array length 11 |

**Request Example:**

```json
{
  "_isFunctionalControl": true,
  "hardwareTypeArr": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "isClearTrack": 1,
  "modeArr": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "parameterArr": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "portArr": [1, 2, 3, 4, 5, 0, 6, 7, 8, 9, 10]
}
```
