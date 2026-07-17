# Laser Cutting Process

## IO Port Settings

### 0x4401 LASER_IOPORT_SET - IO Port Settings

**Description**: Set IO port configuration for laser cutting process

#### Request Parameters

| Parameter | Type | Description |
|--------|------|------|
| DO_backMiddle | int | Return to center |
| DO_liftUp | int | Lift up |
| DO_follow | int | Follow |
| DO_lightGate | int | Light gate |
| DO_aspiration | int | Air blow |
| DOFeedCoolGas | int | Cooling gas |
| DOCleanNozzle | int | Nozzle cleaning |
| DI_liftUpArrival | int | Lift arrival |
| DI_backMiddleArrival | int | Center return arrival |
| DI_followArrival | int | Follow arrival |
| DI_perforateArrival | int | Perforation arrival |
| DI_laserFault | int | Laser fault |
| DI_regulatorFault | int | Height regulator fault |
| DI_watercoolerFault | int | Water cooler fault |
| DI_pressureFault | int | Air pressure fault |
| AO_pressure | int | Air pressure |
| AO_laserPower | int | Laser power |

#### Request Example

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

### 0x4402 LASER_IOPORT_INQUIRE - IO Port Query

**Description**: Query current IO port configuration

- data: none

### 0x4403 LASER_IOPORT_RESPOND - IO Port Response

**Description**: Controller returns IO port query result

- Return format: same as 0x4401

---

## Global Parameter Settings

### 0x4404 LASER_EQUIPMENT_SET - Global Parameter Settings

**Description**: Set global parameters for laser cutting process

#### equipment Parameters

| Parameter | Type | Description |
|--------|------|------|
| arrivalOutLightMode | int | Arrival light output mode: 0-Arrival light output mode, 1-Direct light output mode |
| preAspiratedTime | double | Pre-gas time |
| waitLiftUpTime | double | Wait lift up time |
| waitFollowTime | double | Wait follow time |
| RetreatDistance | double | Retract distance |
| delAspiratedMode | int | Gas off mode: 0-Delayed gas off, 1-Early gas off |
| delAspiratedTime | double | Gas off time |

#### perforate Parameters

| Parameter | Type | Description |
|--------|------|------|
| time | double | Perforation time |
| pressure | double | Perforation pressure |
| power | int | Perforation power |
| freq | int | Perforation frequency |
| dutyRatio | int | Perforation duty ratio |

#### Request Example

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

### 0x4405 LASER_EQUIPMENT_INQUIRE - Global Parameter Query

**Description**: Query current global parameter configuration

- data: none

### 0x4406 LASER_EQUIPMENT_RESPOND - Global Parameter Response

**Description**: Controller returns global parameter query result

- Return format: same as 0x4404

---

## Analog Matching Settings

### 0x4407 LASER_ANALOGMATCH_SET - Analog Matching Settings

**Description**: Set analog matching parameters for laser power and air pressure

#### laserPower Parameters

| Parameter | Type | Description |
|--------|------|------|
| x1 | double | x-axis 1st parameter |
| x2 | double | x-axis 2nd parameter |
| y1 | double | y-axis 1st parameter |
| y2 | double | y-axis 2nd parameter |

#### pressure Parameters

| Parameter | Type | Description |
|--------|------|------|
| x1 | double | x-axis 1st parameter |
| x2 | double | x-axis 2nd parameter |
| y1 | double | y-axis 1st parameter |
| y2 | double | y-axis 2nd parameter |

#### Request Example

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

### 0x4408 LASER_ANALOGMATCH_INQUIRE - Analog Matching Query

**Description**: Query current analog matching configuration

- data: none

### 0x4409 LASER_ANALOGMATCH_RESPOND - Analog Matching Response

**Description**: Controller returns analog matching query result

#### IO Parameters

| Parameter | Type | Description |
|--------|------|------|
| laserPower | int | Laser power port number |
| pressure | int | Air pressure port number |

#### analogMatch Parameters

| Parameter | Type | Description |
|--------|------|------|
| laserPower | object | Laser power matching parameters (x1, x2, y1, y2) |
| pressure | object | Air pressure matching parameters (x1, x2, y1, y2) |

#### Response Example

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

## Cutting Parameter Settings

### 0x440A LASER_CUTPARM_SET - Cutting Parameter Settings

**Description**: Set cutting process parameters

#### Request Parameters

| Parameter | Type | Description |
|--------|------|------|
| num | int | Process number |
| cut.pressure | double | Pressure |
| cut.power | int | Power |
| cut.freq | int | Frequency |
| cut.dutyRatio | int | Duty ratio |

#### Request Example

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

### 0x440B LASER_CUTPARM_INQUIRE - Cutting Parameter Query

**Description**: Query cutting parameters for specified process number

#### Request Parameters

| Parameter | Type | Description |
|--------|------|------|
| num | int | Process number |

#### Request Example

```json
{
  "num": 1
}
```

### 0x440C LASER_CUTPARM_RESPOND - Cutting Parameter Response

**Description**: Controller returns cutting parameter query result

- Return format: same as 0x440A

---

## Status Query

### 0x440E LASER_STATE_INQUIRE - Status Query

**Description**: Query current status of laser cutting process

- data: none

### 0x440F LASER_STATE_RESPOND - Status Response

**Description**: Controller returns current status of laser cutting process

#### Response Parameters

| Parameter | Type | Description |
|--------|------|------|
| liftUpArrival | bool | Lift arrival |
| backMiddleArrival | bool | Center return arrival |
| followArrival | bool | Follow arrival |
| perforateArrival | bool | Perforation arrival |
| lightGateEnable | bool | Light gate enable |
| laserFault | bool | Laser fault |
| regulatorFault | bool | Height regulator fault |
| watercoolerFault | bool | Water cooler fault |
| pressureFault | bool | Air pressure fault |
| currentPressure | double | Current pressure |
| currentPower | int | Current power |
| currentFreq | int | Current frequency |
| currentDutyRatio | int | Current duty ratio |

#### Response Example

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

## Shot Parameter Settings

### 0x4410 LASER_SHOTPARM_SET - Shot Parameter Settings

**Description**: Set shot parameters

#### Request Parameters

| Parameter | Type | Description |
|--------|------|------|
| shotPower | int | Shot power |
| shotTime | double | Shot time, range 0-1 |

#### Request Example

```json
{
  "shotPower": 0,
  "shotTime": 0.1
}
```

---

## Manual Operation

### 0x4411 LASER_HANDOP_SET - Manual Operation Settings

**Description**: Execute manual operation

#### Request Parameters

| Parameter | Type | Description |
|--------|------|------|
| type | int | Manual operation type: 1-Light gate switch, 2-Shot, 3-Gas detection, 4-Lift up, 5-Return to center, 6-Follow |
| value | int | 1 for on, 0 for off (for shot, only 1) |

#### Request Example

```json
{
  "type": 1,
  "value": 1
}
```

### 0x4412 LASER_HANDOP_INQUIRE - Manual Operation Status Query

**Description**: Query current manual operation status

- data: none

### 0x4413 LASER_HANDOP_RESPOND - Manual Operation Status Response

**Description**: Controller returns current manual operation status

#### Response Parameters

| Parameter | Type | Description |
|--------|------|------|
| lightGate | int | Light gate |
| shotPower | int | Shot power |
| shotTime | double | Shot time |
| aspiration | int | Gas detection |
| liftUp | int | Lift up |
| backMiddle | int | Return to center |
| follow | int | Follow |

#### Response Example

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

## Analog Output

### 0x4417 LASER_FACTCURVOL_SET - Analog Output Settings

**Description**: Send values in analog matching

#### Request Parameters

| Parameter | Type | Description |
|--------|------|------|
| type | int | Send number: 1-1st send, 2-2nd send, 3-3rd send, 4-4th send |
| value | double | Value to send, range 0-10 |

#### Request Example

```json
{
  "type": 1,
  "value": 5.5
}
```

### 0x4419 LASER_FACTCURVOL_RESPOND - Analog Output Response

**Description**: Controller returns analog output setting result

#### Response Parameters

| Parameter | Type | Description |
|--------|------|------|
| result | int | 1-Setting successful, 0-Setting failed |

#### Response Example

```json
{
  "result": 1
}
```

---

## Nozzle Cleaning

### 0x4423 LASER_CUT_NOZZLE_CLEAN - Nozzle Cleaning

**Description**: Control nozzle cleaning function

#### Request Parameters

| Parameter | Type | Description |
|--------|------|------|
| cleanNozzleTime | int | Cleaning time (ms), send a number greater than 0 to open, automatically closes after running the set number of seconds |

#### Request Example

```json
{
  "cleanNozzleTime": 0
}
```

---

## Cooling Gas Control

### 0x4422 LASER_CUT_FEED_COOL_GAS - Cooling Gas Control

**Description**: Control cooling gas switch

#### Request Parameters

| Parameter | Type | Description |
|--------|------|------|
| feedCoolGas | int | 1-Open, 0-Close |

#### Request Example

```json
{
  "feedCoolGas": 0
}
```
