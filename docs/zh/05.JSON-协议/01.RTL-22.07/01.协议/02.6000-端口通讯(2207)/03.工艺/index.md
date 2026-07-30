# 3.工艺

本目录包含机器人工艺相关协议的完整文档，涵盖焊接、电批、喷涂、打磨、码垛、视觉、寻位跟踪、传送带跟踪、冲压、激光切割等多种工艺类型。

---

## 目录

| 工艺类型 | 文档 | 说明 |
|---------|------|------|
| [焊接工艺](./05.焊接工艺.md) | 0x4001~0x4015 | 焊接装置、电流电压匹配、焊接参数、摆焊参数、焊接 IO |
| [电批工艺](./03.电批工艺.md) | 0x5731~0x5739 | 拧紧/拧松参数、IO 状态、锁定结果 |
| [喷涂工艺](./07.喷涂工艺.md) | 0x4701~0x4718 | 模拟量设置、数字量设置、轨迹参数、手动操作 |
| [打磨工艺](./02.打磨工艺.md) | 0x4601~0x4603 | 打磨参数设置与查询 |
| [码垛工艺](./01.码垛工艺.md) | 0x4201~0x421F | 抓手参数、托盘参数、位置参数、工件参数、重叠模式、平面模式 |
| [视觉工艺](./04.视觉工艺.md) | 0x4101~0x4117 | 视觉参数、位置参数、调试点位、标定、拍照 |
| [寻位跟踪工艺](./10.寻位跟踪工艺.md) | 0x4130~0x4171 | 激光器参数、激光器标定、寻位类型、跟踪类型、激光跟踪参数 |
| [传送带跟踪](./09.传送带跟踪.md) | 0x4801~0x4823 | 传送带参数、参数识别、实时查询、坐标系标定、传感器位置标定 |
| [新版冲压工艺](./08.新版冲压工艺.md) | 0x8000~0x80XX | 程序运行、料况设置、控制模式、生产数量、冲压使能、状态查询 |
| [激光切割工艺](./06.激光切割工艺/index.md) | 0x4401~0x4423 | IO 端口设置、全局参数、模拟量匹配、切割参数、点射参数、手动操作 |

---

## 消息 ID 速查表

### 焊接工艺 (0x4000)

| 消息 ID | 名称 | 说明 |
|--------|------|------|
| 0x4001 | WELDEQUIPMENT_SET | 设置焊接装置 |
| 0x4002 | WELDEQUIPMENT_INQUIRE | 查询焊接装置 |
| 0x4003 | WELDEQUIPMENT_RESPOND | 返回焊接装置 |
| 0x4004 | CURVOLMATCH_SET | 设置电流电压匹配 |
| 0x4005 | CURVOLMATCH_INQUIRE | 查询电流电压匹配 |
| 0x4006 | CURVOLMATCH_RESPOND | 返回电流电压匹配 |
| 0x4007 | WELDPARAMETER_SET | 设置焊接参数 |
| 0x4008 | WELDPARAMETER_INQUIRE | 查询焊接参数 |
| 0x4009 | WELDPARAMETER_RESPOND | 返回焊接参数 |
| 0x400B | WEAVPARAMETER_SET | 设置摆焊参数 |
| 0x400C | WEAVPARAMETER_INQUIRE | 查询摆焊参数 |
| 0x400D | WEAVPARAMETER_RESPOND | 返回摆焊参数 |
| 0x400E | WELDFACTCURVOL_SET | 设置电流电压匹配实际值 |
| 0x400F | WELDFACTCURVOL_RESPOND | 返回设置结果 |
| 0x4010 | WELD_CURVOLMATCH_START | 开始/结束模拟量匹配 |
| 0x4011 | WELDIOPORT_SET | 设置焊接 IO 接口 |
| 0x4012 | WELDIOPORT_INQUIRE | 查询焊接 IO 接口 |
| 0x4013 | WELDIOPORT_RESPOND | 返回焊接 IO 接口 |
| 0x4015 | WELDMONITOR_INQUIRE | 查询焊接状态 |

### 电批工艺 (0x5700)

| 消息 ID | 名称 | 说明 |
|--------|------|------|
| 0x5731 | SCREWDRIVER_PARM_SET | 修改电批参数 |
| 0x5732 | SCREWDRIVER_PARM_INQUIRE | 示教器查询电批参数 |
| 0x5733 | SCREWDRIVER_PARM_RESPOND | 发送电批参数 |
| 0x5735 | SCREWDRIVER_IOSTATUS_INQUIRE | 电批 IO 状态查询 |
| 0x5736 | SCREWDRIVER_IOSTATUS_RESPOND | 发送 IO 状态 |
| 0x5738 | SCREWDRIVER_TWISTRES_INQUIRE | 电批锁定结果查询 |
| 0x5739 | SCREWDRIVER_TWISTRES_RESPOND | 发送锁定结果 |

### 喷涂工艺 (0x4700)

| 消息 ID | 名称 | 说明 |
|--------|------|------|
| 0x4701 | SPRAY_ANALOGGROUP_SET | 设置模拟量 |
| 0x4702 | SPRAY_ANALOGROUP_INQUIRE | 查询模拟量 |
| 0x4703 | SPRAY_ANALOGROUP_RESPOND | 返回模拟量 |
| 0x4704 | SPRAY_DIGIT_PARM_SET | 设置数字量参数 |
| 0x4705 | SPRAY_DIGIT_PARM_INQUIRE | 查询数字量参数 |
| 0x4706 | SPRAY_DIGIT_PARM_RESPOND | 返回数字量参数 |
| 0x4707 | SPRAY_SEQUENTIAL_SET | 设置时序 |
| 0x4708 | SPRAY_SEQUENTIAL_INQUIRE | 查询时序 |
| 0x4709 | SPRAY_SEQUENTIAL_RESPOND | 返回时序 |
| 0x470A | SPRAY_TRAJECTORY_SET | 设置轨迹参数 |
| 0x470B | SPRAY_TRAJECTORY_INQUIRE | 查询轨迹参数 |
| 0x470C | SPRAY_TRAJECTORY_RESPOND | 返回轨迹参数 |
| 0x4711 | SPRAY_HAND_OPERATION_SET | 设置手动操作 |
| 0x4712 | SPRAY_HAND_OPERATION_INQUIRE | 查询手动操作 |
| 0x4713 | SPRAY_HAND_OPERATION_RESPOND | 返回手动操作状态 |
| 0x4714 | SPRAY_CUR_ANALOG_SET | 设置模拟量 |
| 0x4715 | SPRAY_CUR_ANALOG_INQUIRE | 查询模拟量 |
| 0x4716 | SPRAY_CUR_ANALOG_RESPOND | 返回模拟量 |
| 0x4717 | SPRAY_CUR_OILTIME_SET | 设置油量测试时间 |
| 0x4718 | SPRAY_CUR_OILTIME_INQUIRE | 查询油量测试时间 |

### 打磨工艺 (0x4600)

| 消息 ID | 名称 | 说明 |
|--------|------|------|
| 0x4601 | POLISH_PARAM_SET | 设置打磨工艺参数 |
| 0x4602 | POLISH_PARAM_INQUIRE | 查询打磨工艺参数 |
| 0x4603 | POLISH_PARAM_RESPOND | 返回打磨工艺参数 |

### 码垛工艺 (0x4200)

| 消息 ID | 名称 | 说明 |
|--------|------|------|
| 0x4201 | PAL_GRIPPER_PARM_SET | 设置抓手参数 |
| 0x4202 | PAL_GRIPPER_PARM_INQUIRE | 查询抓手参数 |
| 0x4203 | PAL_GRIPPER_PARM_RESPOND | 返回抓手参数 |
| 0x4204 | PAL_PALLET_PARM_SET | 设置托盘参数 |
| 0x4205 | PAL_PALLET_PARM_INQUIRE | 查询托盘参数 |
| 0x4206 | PAL_PALLET_PARM_RESPOND | 返回托盘参数 |
| 0x4207 | PAL_POS_PARM_SET | 设置位置参数 |
| 0x4208 | PAL_POS_PARM_INQUIRE | 查询位置参数 |
| 0x4209 | PAL_POS_PARM_RESPOND | 返回位置参数 |
| 0x420A | PAL_WORKPIECE_PARM_SET | 设置工件参数 |
| 0x420B | PAL_WORKPIECE_PARM_INQUIRE | 查询工件参数 |
| 0x420C | PAL_WORKPIECE_PARM_RESPOND | 返回工件参数 |
| 0x420D | PAL_APPRO_PARM_SET | 设置接近参数 |
| 0x420E | PAL_APPRO_PARM_INQUIRE | 查询接近参数 |
| 0x420F | PAL_APPRO_PARM_RESPOND | 返回接近参数 |
| 0x4210 | PAL_OVERLAP_PARM_SET | 设置重叠模式参数 |
| 0x4211 | PAL_OVERLAP_PARM_INQUIRE | 查询重叠模式参数 |
| 0x4212 | PAL_OVERLAP_PARM_RESPOND | 返回重叠模式参数 |
| 0x4213 | PAL_PLANE_PARM_SET | 设置平面模式参数 |
| 0x4214 | PAL_PLANE_PARM_INQUIRE | 查询平面模式参数 |
| 0x4215 | PAL_PLANE_PARM_RESPOND | 返回平面模式参数 |

### 视觉工艺 (0x4100)

| 消息 ID | 名称 | 说明 |
|--------|------|------|
| 0x4101 | VISION_PARAMETER_SET | 设置视觉参数 |
| 0x4102 | VISION_PARAMETER_INQUIRE | 查询视觉参数 |
| 0x4103 | VISION_PARAMETER_RESPOND | 返回视觉参数 |
| 0x4104 | VISION_POS_PARAMETER_SET | 设置视觉位置参数 |
| 0x4105 | VISION_POS_PARAMETER_INQUIRE | 查询视觉位置参数 |
| 0x4106 | VISION_POS_PARAMETER_RESPOND | 返回视觉位置参数 |
| 0x4107 | VISION_DEBUGGING_POS_INQUIRE | 查询视觉调试点位列表 |
| 0x4108 | VISION_DEBUGGING_POS_RESPOND | 返回调试点位列表 |
| 0x4109 | VISION_DEBUGGING_POS_CLEAR | 清空调试点位列表 |
| 0x410A | VISION_DEBUGGING_TAKE_PICTURE | 拍照 |
| 0x410B | VISION_DEBUGGING_CALCULATE | 计算偏移 |
| 0x410C | VISION_DEBUGGING_POS_MOVE | 运动至该点 |
| 0x4110 | VISION_GESTURE_CALIBRATION_SET | 标定抓取姿态 |
| 0x4111 | VISION_GESTURE_CALIBRATION_RESPOND | 返回标定结果 |
| 0x4112 | VISION_TRY_TAKE_PICTURE | 试拍照 |
| 0x4113 | VISION_TAKE_PICTURE_RESPOND | 返回拍照结果 |
| 0x4114 | VISION_IPPARAM_INQUIRE | 查询视觉 IP 参数 |
| 0x4115 | VISION_IPPARAM_RESPOND | 返回 IP 参数 |
| 0x4116 | VISION_GESTURE_CALIBRATION_CLEAR | 清除抓取姿态标定 |
| 0x4117 | VISION_CALIBRATION_PARAM_SET | 设置视觉标定参数 |

### 寻位跟踪工艺 (0x4100/0x4130/0x4140/0x4160)

| 消息 ID | 名称 | 说明 |
|--------|------|------|
| 0x4130 | TRACK_LASER_PARAM_SET | 设置激光器参数 |
| 0x4131 | TRACK_LASER_PARAM_INQUIRE | 查询激光器参数 |
| 0x4132 | TRACK_LASER_PARAM_RESPOND | 返回激光器参数 |
| 0x4133 | LOCATING_SENSORTYPE_SET | 设置寻位类型 |
| 0x4134 | LOCATING_SENSORTYPE_INQUIRE | 查询寻位类型 |
| 0x4135 | LOCATING_SENSORTYPE_RESPOND | 返回寻位类型 |
| 0x4136 | TRACK_LASER_TRACKPARAM_SET | 设置激光跟踪参数表 |
| 0x4140 | SENSOR_LASER_CALIBRATE_INQUIRE | 查询标定记录 |
| 0x4141 | SENSOR_LASER_CALIBRATE_RESPOND | 返回标定记录 |
| 0x4142 | SENSOR_LASER_CALIBRATE_RECORD | 记录标定点 |
| 0x4143 | SENSOR_LASER_CALIBRATE_RECORD_RESPOND | 返回记录结果 |
| 0x4144 | SENSOR_LASER_CALIBRATE_MOVETO | 运动到标定点 |
| 0x4145 | SENSOR_LASER_CALIBRATE_CALCULATE | 计算标定结果 |
| 0x4146 | SENSOR_LASER_CALIBRATE_CALCULATE_RESPOND | 返回计算结果 |
| 0x4147 | SENSOR_LASER_CALIBRATE_CLEAR | 清空标定记录 |
| 0x4148 | SENSOR_LASER_CALIBRATE_CANCEL | 取消标定 |
| 0x4149 | SENSOR_LASER_CALIBRATE_RESULT_INQUIRE | 查询激光器是否标定 |
| 0x414A | SENSOR_LASER_CALIBRATE_RESULT_RESPOND | 返回标定结果 |
| 0x4169 | TRACK_SENSORTYPE_SET | 设置跟踪类型 |
| 0x4170 | TRACK_SENSORTYPE_INQUIRE | 查询跟踪类型 |
| 0x4171 | TRACK_SENSORTYPE_RESPOND | 返回跟踪类型 |

### 传送带跟踪 (0x4800)

| 消息 ID | 名称 | 说明 |
|--------|------|------|
| 0x4801 | TRACK_CONVEYOR_CONVEYORPARAM_SET | 设置传送带参数 |
| 0x4802 | TRACK_CONVEYOR_CONVEYORPARAM_INQUIRE | 查询传送带参数 |
| 0x4803 | TRACK_CONVEYOR_CONVEYORPARAM_RESPOND | 返回传送带参数 |
| 0x4804 | TRACK_CONVEYOR_POSCHECKPARAM_SET | 设置参数识别 |
| 0x4805 | TRACK_CONVEYOR_POSCHECKPARAM_INQUIRE | 查询工件识别参数 |
| 0x4806 | TRACK_CONVEYOR_POSCHECKPARAM_RESPOND | 返回工件识别参数 |
| 0x4807 | TRACK_CONVEYOR_REALTIME_INQUIRE | 实时查询编码器值和速度 |
| 0x4808 | TRACK_CONVEYOR_REALTIME_RESPOND | 返回实时数据 |
| 0x480E | TRACK_CONVEYOR_USERCOORD_INQUIRE | 查询用户坐标系 |
| 0x480F | TRACK_CONVEYOR_USERCOORD_RESPOND | 返回用户坐标系 |
| 0x4810 | TRACK_CONVEYOR_USERCOORD_CALCULATE | 计算用户坐标系 |
| 0x4811 | TRACK_CONVEYOR_USERCOORD_CALIBRATION | 标定取坐标 |
| 0x4812 | RACK_CONVEYOR_CALIBRATION_INQUIRE | 查询已标定的点坐标 |
| 0x4813 | TRACK_CONVEYOR_CALIBRATION_RESPOND | 返回标定的点坐标 |
| 0x4814 | TRACK_CONVEYOR_CALIBRATION_CLEAR | 清空标定值 |
| 0x4815 | TRACK_CONVEYOR_CALIBRATION_CANCEL | 取消标定 |
| 0x4816 | TRACK_CONVEYOR_SENSORPOS_INQUIRE | 查询传感器位置 |
| 0x4817 | TRACK_CONVEYOR_SENSORPOS_RESPOND | 返回传感器位置 |
| 0x4818 | TRACK_CONVEYOR_SENSORPOS_CALIBRATION_INQUIRE | 查询传感器位置标定参数 |
| 0x4819 | TRACK_CONVEYOR_SENSORPOS_CALIBRATION_RESPOND | 返回标定参数 |
| 0x481A | TRACK_CONVEYOR_SENSORPOS_CALIBRATE | 传感器位置参数标定 |

### 冲压工艺 (0x8000)

| 消息 ID | 名称 | 说明 |
|--------|------|------|
| 0x8000 | PUNCH_SET_WORKPIECE_CONDITION | 前站料况设置 |
| 0x8001 | PUNCH_INQUIRE_WORKPIECE_CONDITION | 夹具料况查询 |
| 0x8002 | PUNCH_RESPOND_WORKPIECE_CONDITION | 返回料况查询结果 |
| 0x8003 | PUNCH_SET_CONTROL_MODE | 控制类型设置 |
| 0x8004 | PUNCH_INQUIRE_CONTROL_MODE | 查询控制类型 |
| 0x8005 | PUNCH_RESPOND_CONTROL_MODE | 返回控制类型 |
| 0x8006 | PUNCH_INQUIRE_PRODUCE_TARGET_WASTE_NUM | 生产数量查询 |
| 0x8007 | PUNCH_RESPOND_PRODUCE_TARGET_WASTE_NUM | 返回生产数量 |
| 0x8008 | PUNCH_CLEAR_PRODUCE_TARGET_WASTE_NUM | 生产数量清零 |
| 0x8009 | PUNCH_SET_SHIELD_CHECK_RUN_WITHOUT_PIECE_PUNCH_ENABLE | 冲压使能设置 |
| 0x800A | PUNCH_INQUIRE_SHIELD_CHECK_RUN_WITHOUT_PIECE_PUNCH_ENABLE | 查询冲压使能 |
| 0x800B | PUNCH_RESPOND_SHIELD_CHECK_RUN_WITHOUT_PIECE_PUNCH_ENABLE | 返回冲压使能 |
| 0x800C | PUNCH_SINGLE_RUN_TEST | 单机试运行 |
| 0x800D | PUNCH_ESCAPE_FROM_MOULD | 模内逃跑测试 |
| 0x800E | PUNCH_SET_FIXTURE_ACTION | 设置治具动作 |
| 0x800F | PUNCH_INQUIRE_FIXTURE_ACTION | 查询治具动作 |
| 0x8010 | PUNCH_RESPOND_FIXTURE_ACTION | 返回治具动作 |
| 0x8011 | PUNCH_ONLINE_STATUS_RESET | 联机状态复位 |
| 0x8012 | PUNCH_JOBFILE_OPERATION | 暂停/启动/停止 |
| 0x8013 | PUNCH_INQUIRE_RUN_STATUS | 运行周期查询 |
| 0x8014 | PUNCH_RESPOND_RUN_STATUS | 返回运行状态 |
| 0x8015 | PUNCH_SEND_ERROR_INFO | 发送错误弹窗信息 |
| 0x8016 | PUNCH_RECEIVE_ERROR_DEAL | 接收弹窗按键处理 |
| 0x8017 | PUNCH_CHOOSE_CRAFT_NUM | 选中工艺号 |
| 0x8018 | PUNCH_APPLY_TO_ONLINE | 应用到联机 |
| 0x8019 | PUNCH_INQUIRE_CURRENT_CRAFT_NUM | 查询当前选中工艺号 |
| 0x801A | PUNCH_RESPOND_CURRENT_CRAFT_NUM | 返回当前选中工艺号 |
| 0x801B~0x80XX | - | 更多工艺参数设置 |

### 激光切割工艺 (0x4400)

| 消息 ID | 名称 | 说明 |
|--------|------|------|
| 0x4401 | LASER_IOPORT_SET | IO 端口设置 |
| 0x4402 | LASER_IOPORT_INQUIRE | IO 端口查询 |
| 0x4403 | LASER_IOPORT_RESPOND | IO 端口响应 |
| 0x4404 | LASER_EQUIPMENT_SET | 全局参数设置 |
| 0x4405 | LASER_EQUIPMENT_INQUIRE | 全局参数查询 |
| 0x4406 | LASER_EQUIPMENT_RESPOND | 全局参数响应 |
| 0x4407 | LASER_ANALOGMATCH_SET | 模拟量匹配设置 |
| 0x4408 | LASER_ANALOGMATCH_INQUIRE | 模拟量匹配查询 |
| 0x4409 | LASER_ANALOGMATCH_RESPOND | 模拟量匹配响应 |
| 0x440A | LASER_CUTPARM_SET | 切割参数设置 |
| 0x440B | LASER_CUTPARM_INQUIRE | 切割参数查询 |
| 0x440C | LASER_CUTPARM_RESPOND | 切割参数响应 |
| 0x440E | LASER_STATE_INQUIRE | 状态查询 |
| 0x440F | LASER_STATE_RESPOND | 状态响应 |
| 0x4410 | LASER_SHOTPARM_SET | 点射参数设置 |
| 0x4411 | LASER_HANDOP_SET | 手动操作设置 |
| 0x4412 | LASER_HANDOP_INQUIRE | 手动操作状态查询 |
| 0x4413 | LASER_HANDOP_RESPOND | 手动操作状态响应 |
| 0x4417 | LASER_FACTCURVOL_SET | 模拟量发送设置 |
| 0x4419 | LASER_FACTCURVOL_RESPOND | 模拟量发送响应 |
| 0x4422 | LASER_CUT_FEED_COOL_GAS | 冷却气控制 |
| 0x4423 | LASER_CUT_NOZZLE_CLEAN | 喷嘴清洁 |

---

## 通用参数说明

### 机器人编号 (robot)

| 类型 | 说明 |
|------|------|
| int | 机器人编号，通常范围 1~n |

### 工艺号 (craftID/num/visionNum/conveyorID 等)

| 类型 | 说明 |
|------|------|
| int | 工艺编号，不同工艺类型有不同的取值范围 |

---

## 数据结构说明

### 请求/响应通用模式

```text
请求方 ──消息ID──> 控制器
       <──响应ID── 控制器
```

### 通用响应格式

```json
{
  "result": 1,
  "robot": 1
}
```

| 参数名 | 类型 | 说明 |
|--------|------|------|
| result | int | 1-成功，0-失败 |
| robot | int | 机器人编号 |

---

## 注意事项

1. **消息 ID 格式**：所有消息 ID 使用十六进制格式，如 `0x4001`
2. **必填参数**：参数说明中的"必填"列表示该参数是否必须提供
3. **数据类型**：详细参数类型和说明请参阅各工艺的专门文档
4. **代码示例**：各文档中的 JSON 示例均可直接使用
