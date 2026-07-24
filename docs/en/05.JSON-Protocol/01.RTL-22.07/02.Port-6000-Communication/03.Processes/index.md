# 3. Processes

This directory contains complete documentation for robot process-related protocols, covering various process types including welding, screwdriving, spraying, grinding, palletizing, vision, seam tracking, conveyor tracking, stamping, and laser cutting.

---

## Table of Contents

| Process Type | Document | Description |
|---------|------|------|
| [Welding Process](./05.Welding.md) | 0x4001~0x4015 | Welding equipment, current/voltage matching, welding parameters, weave parameters, welding IO |
| [Screwdriving Process](./03.Screwdriving.md) | 0x5731~0x5739 | Tighten/loosen parameters, IO status, locking results |
| [Spraying Process](./07.Spraying.md) | 0x4701~0x4718 | Analog settings, digital settings, trajectory parameters, manual operation |
| [Grinding Process](./02.Grinding.md) | 0x4601~0x4603 | Grinding parameter settings and queries |
| [Palletizing Process](./01.Palletizing.md) | 0x4201~0x421F | Gripper parameters, pallet parameters, position parameters, workpiece parameters, overlap mode, plane mode |
| [Vision Process](./04.Vision.md) | 0x4101~0x4117 | Vision parameters, position parameters, debug points, calibration, photo capture |
| [Seam Tracking Process](./10.Seam-Tracking.md) | 0x4130~0x4171 | Laser parameters, laser calibration, locating type, tracking type, laser tracking parameters |
| [Conveyor Tracking](./09.Conveyor-Tracking.md) | 0x4801~0x4823 | Conveyor parameters, parameter identification, real-time query, coordinate system calibration, sensor position calibration |
| [New Stamping Process](./08.Stamping-V2.md) | 0x8000~0x80XX | Program execution, material condition settings, control mode, production count, stamping enable, status query |
| [Laser Cutting Process](./06.Laser-Cutting/index.md) | 0x4401~0x4423 | IO port settings, global parameters, analog matching, cutting parameters, shot parameters, manual operation |

---

## Message ID Quick Reference

### Welding Process (0x4000)

| Message ID | Name | Description |
|--------|------|------|
| 0x4001 | WELDEQUIPMENT_SET | Set welding equipment |
| 0x4002 | WELDEQUIPMENT_INQUIRE | Query welding equipment |
| 0x4003 | WELDEQUIPMENT_RESPOND | Return welding equipment |
| 0x4004 | CURVOLMATCH_SET | Set current/voltage matching |
| 0x4005 | CURVOLMATCH_INQUIRE | Query current/voltage matching |
| 0x4006 | CURVOLMATCH_RESPOND | Return current/voltage matching |
| 0x4007 | WELDPARAMETER_SET | Set welding parameters |
| 0x4008 | WELDPARAMETER_INQUIRE | Query welding parameters |
| 0x4009 | WELDPARAMETER_RESPOND | Return welding parameters |
| 0x400B | WEAVPARAMETER_SET | Set weave parameters |
| 0x400C | WEAVPARAMETER_INQUIRE | Query weave parameters |
| 0x400D | WEAVPARAMETER_RESPOND | Return weave parameters |
| 0x400E | WELDFACTCURVOL_SET | Set actual current/voltage matching values |
| 0x400F | WELDFACTCURVOL_RESPOND | Return setting result |
| 0x4010 | WELD_CURVOLMATCH_START | Start/end analog matching |
| 0x4011 | WELDIOPORT_SET | Set welding IO interface |
| 0x4012 | WELDIOPORT_INQUIRE | Query welding IO interface |
| 0x4013 | WELDIOPORT_RESPOND | Return welding IO interface |
| 0x4015 | WELDMONITOR_INQUIRE | Query welding status |

### Screwdriving Process (0x5700)

| Message ID | Name | Description |
|--------|------|------|
| 0x5731 | SCREWDRIVER_PARM_SET | Modify screwdriving parameters |
| 0x5732 | SCREWDRIVER_PARM_INQUIRE | Teach pendant query screwdriving parameters |
| 0x5733 | SCREWDRIVER_PARM_RESPOND | Send screwdriving parameters |
| 0x5735 | SCREWDRIVER_IOSTATUS_INQUIRE | Screwdriving IO status query |
| 0x5736 | SCREWDRIVER_IOSTATUS_RESPOND | Send IO status |
| 0x5738 | SCREWDRIVER_TWISTRES_INQUIRE | Screwdriving locking result query |
| 0x5739 | SCREWDRIVER_TWISTRES_RESPOND | Send locking result |

### Spraying Process (0x4700)

| Message ID | Name | Description |
|--------|------|------|
| 0x4701 | SPRAY_ANALOGGROUP_SET | Set analog |
| 0x4702 | SPRAY_ANALOGROUP_INQUIRE | Query analog |
| 0x4703 | SPRAY_ANALOGROUP_RESPOND | Return analog |
| 0x4704 | SPRAY_DIGIT_PARM_SET | Set digital parameters |
| 0x4705 | SPRAY_DIGIT_PARM_INQUIRE | Query digital parameters |
| 0x4706 | SPRAY_DIGIT_PARM_RESPOND | Return digital parameters |
| 0x4707 | SPRAY_SEQUENTIAL_SET | Set timing |
| 0x4708 | SPRAY_SEQUENTIAL_INQUIRE | Query timing |
| 0x4709 | SPRAY_SEQUENTIAL_RESPOND | Return timing |
| 0x470A | SPRAY_TRAJECTORY_SET | Set trajectory parameters |
| 0x470B | SPRAY_TRAJECTORY_INQUIRE | Query trajectory parameters |
| 0x470C | SPRAY_TRAJECTORY_RESPOND | Return trajectory parameters |
| 0x4711 | SPRAY_HAND_OPERATION_SET | Set manual operation |
| 0x4712 | SPRAY_HAND_OPERATION_INQUIRE | Query manual operation |
| 0x4713 | SPRAY_HAND_OPERATION_RESPOND | Return manual operation status |
| 0x4714 | SPRAY_CUR_ANALOG_SET | Set analog |
| 0x4715 | SPRAY_CUR_ANALOG_INQUIRE | Query analog |
| 0x4716 | SPRAY_CUR_ANALOG_RESPOND | Return analog |
| 0x4717 | SPRAY_CUR_OILTIME_SET | Set oil volume test time |
| 0x4718 | SPRAY_CUR_OILTIME_INQUIRE | Query oil volume test time |

### Grinding Process (0x4600)

| Message ID | Name | Description |
|--------|------|------|
| 0x4601 | POLISH_PARAM_SET | Set grinding process parameters |
| 0x4602 | POLISH_PARAM_INQUIRE | Query grinding process parameters |
| 0x4603 | POLISH_PARAM_RESPOND | Return grinding process parameters |

### Palletizing Process (0x4200)

| Message ID | Name | Description |
|--------|------|------|
| 0x4201 | PAL_GRIPPER_PARM_SET | Set gripper parameters |
| 0x4202 | PAL_GRIPPER_PARM_INQUIRE | Query gripper parameters |
| 0x4203 | PAL_GRIPPER_PARM_RESPOND | Return gripper parameters |
| 0x4204 | PAL_PALLET_PARM_SET | Set pallet parameters |
| 0x4205 | PAL_PALLET_PARM_INQUIRE | Query pallet parameters |
| 0x4206 | PAL_PALLET_PARM_RESPOND | Return pallet parameters |
| 0x4207 | PAL_POS_PARM_SET | Set position parameters |
| 0x4208 | PAL_POS_PARM_INQUIRE | Query position parameters |
| 0x4209 | PAL_POS_PARM_RESPOND | Return position parameters |
| 0x420A | PAL_WORKPIECE_PARM_SET | Set workpiece parameters |
| 0x420B | PAL_WORKPIECE_PARM_INQUIRE | Query workpiece parameters |
| 0x420C | PAL_WORKPIECE_PARM_RESPOND | Return workpiece parameters |
| 0x420D | PAL_APPRO_PARM_SET | Set approach parameters |
| 0x420E | PAL_APPRO_PARM_INQUIRE | Query approach parameters |
| 0x420F | PAL_APPRO_PARM_RESPOND | Return approach parameters |
| 0x4210 | PAL_OVERLAP_PARM_SET | Set overlap mode parameters |
| 0x4211 | PAL_OVERLAP_PARM_INQUIRE | Query overlap mode parameters |
| 0x4212 | PAL_OVERLAP_PARM_RESPOND | Return overlap mode parameters |
| 0x4213 | PAL_PLANE_PARM_SET | Set plane mode parameters |
| 0x4214 | PAL_PLANE_PARM_INQUIRE | Query plane mode parameters |
| 0x4215 | PAL_PLANE_PARM_RESPOND | Return plane mode parameters |

### Vision Process (0x4100)

| Message ID | Name | Description |
|--------|------|------|
| 0x4101 | VISION_PARAMETER_SET | Set vision parameters |
| 0x4102 | VISION_PARAMETER_INQUIRE | Query vision parameters |
| 0x4103 | VISION_PARAMETER_RESPOND | Return vision parameters |
| 0x4104 | VISION_POS_PARAMETER_SET | Set vision position parameters |
| 0x4105 | VISION_POS_PARAMETER_INQUIRE | Query vision position parameters |
| 0x4106 | VISION_POS_PARAMETER_RESPOND | Return vision position parameters |
| 0x4107 | VISION_DEBUGGING_POS_INQUIRE | Query vision debug point list |
| 0x4108 | VISION_DEBUGGING_POS_RESPOND | Return debug point list |
| 0x4109 | VISION_DEBUGGING_POS_CLEAR | Clear vision debug point list |
| 0x410A | VISION_DEBUGGING_TAKE_PICTURE | Take photo |
| 0x410B | VISION_DEBUGGING_CALCULATE | Calculate offset |
| 0x410C | VISION_DEBUGGING_POS_MOVE | Move to point |
| 0x4110 | VISION_GESTURE_CALIBRATION_SET | Calibrate grab pose |
| 0x4111 | VISION_GESTURE_CALIBRATION_RESPOND | Return calibration result |
| 0x4112 | VISION_TRY_TAKE_PICTURE | Trial photo |
| 0x4113 | VISION_TAKE_PICTURE_RESPOND | Return photo result |
| 0x4114 | VISION_IPPARAM_INQUIRE | Query vision IP parameters |
| 0x4115 | VISION_IPPARAM_RESPOND | Return IP parameters |
| 0x4116 | VISION_GESTURE_CALIBRATION_CLEAR | Clear grab pose calibration |
| 0x4117 | VISION_CALIBRATION_PARAM_SET | Set vision calibration parameters |

### Seam Tracking Process (0x4100/0x4130/0x4140/0x4160)

| Message ID | Name | Description |
|--------|------|------|
| 0x4130 | TRACK_LASER_PARAM_SET | Set laser parameters |
| 0x4131 | TRACK_LASER_PARAM_INQUIRE | Query laser parameters |
| 0x4132 | TRACK_LASER_PARAM_RESPOND | Return laser parameters |
| 0x4133 | LOCATING_SENSORTYPE_SET | Set locating type |
| 0x4134 | LOCATING_SENSORTYPE_INQUIRE | Query locating type |
| 0x4135 | LOCATING_SENSORTYPE_RESPOND | Return locating type |
| 0x4136 | TRACK_LASER_TRACKPARAM_SET | Set laser tracking parameter table |
| 0x4140 | SENSOR_LASER_CALIBRATE_INQUIRE | Query calibration records |
| 0x4141 | SENSOR_LASER_CALIBRATE_RESPOND | Return calibration records |
| 0x4142 | SENSOR_LASER_CALIBRATE_RECORD | Record calibration point |
| 0x4143 | SENSOR_LASER_CALIBRATE_RECORD_RESPOND | Return record result |
| 0x4144 | SENSOR_LASER_CALIBRATE_MOVETO | Move to calibration point |
| 0x4145 | SENSOR_LASER_CALIBRATE_CALCULATE | Calculate calibration result |
| 0x4146 | SENSOR_LASER_CALIBRATE_CALCULATE_RESPOND | Return calculation result |
| 0x4147 | SENSOR_LASER_CALIBRATE_CLEAR | Clear calibration records |
| 0x4148 | SENSOR_LASER_CALIBRATE_CANCEL | Cancel calibration |
| 0x4149 | SENSOR_LASER_CALIBRATE_RESULT_INQUIRE | Query whether laser is calibrated |
| 0x414A | SENSOR_LASER_CALIBRATE_RESULT_RESPOND | Return calibration result |
| 0x4169 | TRACK_SENSORTYPE_SET | Set tracking type |
| 0x4170 | TRACK_SENSORTYPE_INQUIRE | Query tracking type |
| 0x4171 | TRACK_SENSORTYPE_RESPOND | Return tracking type |

### Conveyor Tracking (0x4800)

| Message ID | Name | Description |
|--------|------|------|
| 0x4801 | TRACK_CONVEYOR_CONVEYORPARAM_SET | Set conveyor parameters |
| 0x4802 | TRACK_CONVEYOR_CONVEYORPARAM_INQUIRE | Query conveyor parameters |
| 0x4803 | TRACK_CONVEYOR_CONVEYORPARAM_RESPOND | Return conveyor parameters |
| 0x4804 | TRACK_CONVEYOR_POSCHECKPARAM_SET | Set parameter identification |
| 0x4805 | TRACK_CONVEYOR_POSCHECKPARAM_INQUIRE | Query workpiece identification parameters |
| 0x4806 | TRACK_CONVEYOR_POSCHECKPARAM_RESPOND | Return workpiece identification parameters |
| 0x4807 | TRACK_CONVEYOR_REALTIME_INQUIRE | Real-time query encoder value and speed |
| 0x4808 | TRACK_CONVEYOR_REALTIME_RESPOND | Return real-time data |
| 0x480E | TRACK_CONVEYOR_USERCOORD_INQUIRE | Query user coordinate system |
| 0x480F | TRACK_CONVEYOR_USERCOORD_RESPOND | Return user coordinate system |
| 0x4810 | TRACK_CONVEYOR_USERCOORD_CALCULATE | Calculate user coordinate system |
| 0x4811 | TRACK_CONVEYOR_USERCOORD_CALIBRATION | Calibration coordinate acquisition |
| 0x4812 | RACK_CONVEYOR_CALIBRATION_INQUIRE | Query calibrated point coordinates |
| 0x4813 | TRACK_CONVEYOR_CALIBRATION_RESPOND | Return calibrated point coordinates |
| 0x4814 | TRACK_CONVEYOR_CALIBRATION_CLEAR | Clear calibration values |
| 0x4815 | TRACK_CONVEYOR_CALIBRATION_CANCEL | Cancel calibration |
| 0x4816 | TRACK_CONVEYOR_SENSORPOS_INQUIRE | Query sensor position |
| 0x4817 | TRACK_CONVEYOR_SENSORPOS_RESPOND | Return sensor position |
| 0x4818 | TRACK_CONVEYOR_SENSORPOS_CALIBRATION_INQUIRE | Query sensor position calibration parameters |
| 0x4819 | TRACK_CONVEYOR_SENSORPOS_CALIBRATION_RESPOND | Return calibration parameters |
| 0x481A | TRACK_CONVEYOR_SENSORPOS_CALIBRATE | Sensor position parameter calibration |

### Stamping Process (0x8000)

| Message ID | Name | Description |
|--------|------|------|
| 0x8000 | PUNCH_SET_WORKPIECE_CONDITION | Upstream station material condition settings |
| 0x8001 | PUNCH_INQUIRE_WORKPIECE_CONDITION | Fixture material condition query |
| 0x8002 | PUNCH_RESPOND_WORKPIECE_CONDITION | Return material condition query result |
| 0x8003 | PUNCH_SET_CONTROL_MODE | Control mode settings |
| 0x8004 | PUNCH_INQUIRE_CONTROL_MODE | Query control mode |
| 0x8005 | PUNCH_RESPOND_CONTROL_MODE | Return control mode |
| 0x8006 | PUNCH_INQUIRE_PRODUCE_TARGET_WASTE_NUM | Production count query |
| 0x8007 | PUNCH_RESPOND_PRODUCE_TARGET_WASTE_NUM | Return production count |
| 0x8008 | PUNCH_CLEAR_PRODUCE_TARGET_WASTE_NUM | Clear production count |
| 0x8009 | PUNCH_SET_SHIELD_CHECK_RUN_WITHOUT_PIECE_PUNCH_ENABLE | Stamping enable settings |
| 0x800A | PUNCH_INQUIRE_SHIELD_CHECK_RUN_WITHOUT_PIECE_PUNCH_ENABLE | Query stamping enable |
| 0x800B | PUNCH_RESPOND_SHIELD_CHECK_RUN_WITHOUT_PIECE_PUNCH_ENABLE | Return stamping enable |
| 0x800C | PUNCH_SINGLE_RUN_TEST | Standalone test run |
| 0x800D | PUNCH_ESCAPE_FROM_MOULD | In-mold escape test |
| 0x800E | PUNCH_SET_FIXTURE_ACTION | Set fixture action |
| 0x800F | PUNCH_INQUIRE_FIXTURE_ACTION | Query fixture action |
| 0x8010 | PUNCH_RESPOND_FIXTURE_ACTION | Return fixture action |
| 0x8011 | PUNCH_ONLINE_STATUS_RESET | Online status reset |
| 0x8012 | PUNCH_JOBFILE_OPERATION | Pause/start/stop |
| 0x8013 | PUNCH_INQUIRE_RUN_STATUS | Run cycle query |
| 0x8014 | PUNCH_RESPOND_RUN_STATUS | Return run status |
| 0x8015 | PUNCH_SEND_ERROR_INFO | Send error popup message |
| 0x8016 | PUNCH_RECEIVE_ERROR_DEAL | Receive popup button handling |
| 0x8017 | PUNCH_CHOOSE_CRAFT_NUM | Select process number |
| 0x8018 | PUNCH_APPLY_TO_ONLINE | Apply to online |
| 0x8019 | PUNCH_INQUIRE_CURRENT_CRAFT_NUM | Query currently selected process number |
| 0x801A | PUNCH_RESPOND_CURRENT_CRAFT_NUM | Return currently selected process number |
| 0x801B~0x80XX | - | More process parameter settings |

### Laser Cutting Process (0x4400)

| Message ID | Name | Description |
|--------|------|------|
| 0x4401 | LASER_IOPORT_SET | IO port settings |
| 0x4402 | LASER_IOPORT_INQUIRE | IO port query |
| 0x4403 | LASER_IOPORT_RESPOND | IO port response |
| 0x4404 | LASER_EQUIPMENT_SET | Global parameter settings |
| 0x4405 | LASER_EQUIPMENT_INQUIRE | Global parameter query |
| 0x4406 | LASER_EQUIPMENT_RESPOND | Global parameter response |
| 0x4407 | LASER_ANALOGMATCH_SET | Analog matching settings |
| 0x4408 | LASER_ANALOGMATCH_INQUIRE | Analog matching query |
| 0x4409 | LASER_ANALOGMATCH_RESPOND | Analog matching response |
| 0x440A | LASER_CUTPARM_SET | Cutting parameter settings |
| 0x440B | LASER_CUTPARM_INQUIRE | Cutting parameter query |
| 0x440C | LASER_CUTPARM_RESPOND | Cutting parameter response |
| 0x440E | LASER_STATE_INQUIRE | Status query |
| 0x440F | LASER_STATE_RESPOND | Status response |
| 0x4410 | LASER_SHOTPARM_SET | Shot parameter settings |
| 0x4411 | LASER_HANDOP_SET | Manual operation settings |
| 0x4412 | LASER_HANDOP_INQUIRE | Manual operation status query |
| 0x4413 | LASER_HANDOP_RESPOND | Manual operation status response |
| 0x4417 | LASER_FACTCURVOL_SET | Analog output settings |
| 0x4419 | LASER_FACTCURVOL_RESPOND | Analog output response |
| 0x4422 | LASER_CUT_FEED_COOL_GAS | Cooling gas control |
| 0x4423 | LASER_CUT_NOZZLE_CLEAN | Nozzle cleaning |

---

## General Parameter Description

### Robot Number (robot)

| Type | Description |
|------|------|
| int | Robot number, typically range 1~n |

### Process Number (craftID/num/visionNum/conveyorID, etc.)

| Type | Description |
|------|------|
| int | Process number, different process types have different value ranges |

---

## Data Structure Description

### Request/Response General Pattern

```
Requester ──Message ID──> Controller
          <──Response ID── Controller
```

### General Response Format

```json
{
  "result": 1,
  "robot": 1
}
```

| Parameter | Type | Description |
|--------|------|------|
| result | int | 1-success, 0-failure |
| robot | int | Robot number |

---

## Notes

1. **Message ID format**: All message IDs use hexadecimal format, e.g. `0x4001`
2. **Required parameters**: The "Required" column in parameter descriptions indicates whether the parameter must be provided
3. **Data types**: For detailed parameter types and descriptions, please refer to each process's dedicated documentation
4. **Code examples**: JSON examples in each document can be used directly
