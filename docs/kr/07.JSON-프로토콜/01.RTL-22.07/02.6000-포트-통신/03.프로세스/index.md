# 3.프로세스

本디렉터리包含로봇프로세스相关协议的完整文档，涵盖용접、스크류드라이빙、스프레이、그라인딩、팔레타이징、비전、심 추적、컨베이어추적、스탬핑、레이저 절단等多种프로세스유형。

---

## 디렉터리

| 프로세스유형 | 文档 | 설명 |
|---------|------|------|
| [[용접프로세스](./05.용접.md) | 0x4001~0x4015 | 용접装置、전류-전압 매칭、용접매개변수、摆焊매개변수、용접IO |
| [[스크류드라이빙프로세스](./03.스크류드라이빙.md) | 0x5731~0x5739 | 拧紧/拧松매개변수、IO상태、잠금 결과 |
| [[스프레이프로세스](./07.스프레이.md) | 0x4701~0x4718 | 模拟量설정、숫자量설정、궤적매개변수、手动조작 |
| [[그라인딩프로세스](./02.그라인딩.md) | 0x4601~0x4603 | 그라인딩매개변수설정与조회 |
| [[팔레타이징프로세스](./01.팔레타이징.md) | 0x4201~0x421F | 抓手매개변수、托盘매개변수、위치매개변수、공작물매개변수、重叠모드、平面모드 |
| [[비전프로세스](./04.비전.md) | 0x4101~0x4117 | 비전매개변수、위치매개변수、调试포인트、캘리브레이션、拍照 |
| [[심 추적프로세스](./10.심-추적.md) | 0x4130~0x4171 | 레이저器매개변수、레이저器캘리브레이션、심 검출유형、추적유형、레이저추적매개변수 |
| [[컨베이어추적](./09.컨베이어-추적.md) | 0x4801~0x4823 | 컨베이어매개변수、매개변수识别、实时조회、좌표계캘리브레이션、传感器위치캘리브레이션 |
| [[新版스탬핑프로세스](./08.스탬핑-V2.md) | 0x8000~0x80XX | 프로그램실행、料况설정、제어모드、생산 수량、스탬핑활성화、상태조회 |
| [[레이저 절단프로세스](./06.레이저-절단/index.md) | 0x4401~0x4423 | IO포트설정、全局매개변수、아날로그 매칭、절단매개변수、点射매개변수、手动조작 |

---

## 메시지ID速查表

### 용접프로세스 (0x4000)

| 메시지ID | 이름 | 설명 |
|--------|------|------|
| 0x4001 | WELDEQUIPMENT_SET | 설정용접装置 |
| 0x4002 | WELDEQUIPMENT_INQUIRE | 조회용접装置 |
| 0x4003 | WELDEQUIPMENT_RESPOND | 반환용접装置 |
| 0x4004 | CURVOLMATCH_SET | 설정전류-전압 매칭 |
| 0x4005 | CURVOLMATCH_INQUIRE | 조회전류-전압 매칭 |
| 0x4006 | CURVOLMATCH_RESPOND | 반환전류-전압 매칭 |
| 0x4007 | WELDPARAMETER_SET | 설정용접매개변수 |
| 0x4008 | WELDPARAMETER_INQUIRE | 조회용접매개변수 |
| 0x4009 | WELDPARAMETER_RESPOND | 반환용접매개변수 |
| 0x400B | WEAVPARAMETER_SET | 설정摆焊매개변수 |
| 0x400C | WEAVPARAMETER_INQUIRE | 조회摆焊매개변수 |
| 0x400D | WEAVPARAMETER_RESPOND | 반환摆焊매개변수 |
| 0x400E | WELDFACTCURVOL_SET | 설정전류-전압 매칭实际值 |
| 0x400F | WELDFACTCURVOL_RESPOND | 반환설정结果 |
| 0x4010 | WELD_CURVOLMATCH_START | 시작/종료아날로그 매칭 |
| 0x4011 | WELDIOPORT_SET | 설정용접IO인터페이스 |
| 0x4012 | WELDIOPORT_INQUIRE | 조회용접IO인터페이스 |
| 0x4013 | WELDIOPORT_RESPOND | 반환용접IO인터페이스 |
| 0x4015 | WELDMONITOR_INQUIRE | 조회용접상태 |

### 스크류드라이빙프로세스 (0x5700)

| 메시지ID | 이름 | 설명 |
|--------|------|------|
| 0x5731 | SCREWDRIVER_PARM_SET | 수정스크류드라이빙매개변수 |
| 0x5732 | SCREWDRIVER_PARM_INQUIRE | 티치 펜던트조회스크류드라이빙매개변수 |
| 0x5733 | SCREWDRIVER_PARM_RESPOND | 전송스크류드라이빙매개변수 |
| 0x5735 | SCREWDRIVER_IOSTATUS_INQUIRE | 스크류드라이빙IO상태조회 |
| 0x5736 | SCREWDRIVER_IOSTATUS_RESPOND | 전송IO상태 |
| 0x5738 | SCREWDRIVER_TWISTRES_INQUIRE | 스크류드라이빙잠금 결과조회 |
| 0x5739 | SCREWDRIVER_TWISTRES_RESPOND | 전송잠금 결과 |

### 스프레이프로세스 (0x4700)

| 메시지ID | 이름 | 설명 |
|--------|------|------|
| 0x4701 | SPRAY_ANALOGGROUP_SET | 설정模拟量 |
| 0x4702 | SPRAY_ANALOGROUP_INQUIRE | 조회模拟量 |
| 0x4703 | SPRAY_ANALOGROUP_RESPOND | 반환模拟量 |
| 0x4704 | SPRAY_DIGIT_PARM_SET | 설정숫자量매개변수 |
| 0x4705 | SPRAY_DIGIT_PARM_INQUIRE | 조회숫자量매개변수 |
| 0x4706 | SPRAY_DIGIT_PARM_RESPOND | 반환숫자量매개변수 |
| 0x4707 | SPRAY_SEQUENTIAL_SET | 설정时序 |
| 0x4708 | SPRAY_SEQUENTIAL_INQUIRE | 조회时序 |
| 0x4709 | SPRAY_SEQUENTIAL_RESPOND | 반환时序 |
| 0x470A | SPRAY_TRAJECTORY_SET | 설정궤적매개변수 |
| 0x470B | SPRAY_TRAJECTORY_INQUIRE | 조회궤적매개변수 |
| 0x470C | SPRAY_TRAJECTORY_RESPOND | 반환궤적매개변수 |
| 0x4711 | SPRAY_HAND_OPERATION_SET | 설정手动조작 |
| 0x4712 | SPRAY_HAND_OPERATION_INQUIRE | 조회手动조작 |
| 0x4713 | SPRAY_HAND_OPERATION_RESPOND | 반환手动조작상태 |
| 0x4714 | SPRAY_CUR_ANALOG_SET | 설정模拟量 |
| 0x4715 | SPRAY_CUR_ANALOG_INQUIRE | 조회模拟量 |
| 0x4716 | SPRAY_CUR_ANALOG_RESPOND | 반환模拟量 |
| 0x4717 | SPRAY_CUR_OILTIME_SET | 설정油量测试时间 |
| 0x4718 | SPRAY_CUR_OILTIME_INQUIRE | 조회油量测试时间 |

### 그라인딩프로세스 (0x4600)

| 메시지ID | 이름 | 설명 |
|--------|------|------|
| 0x4601 | POLISH_PARAM_SET | 설정그라인딩프로세스매개변수 |
| 0x4602 | POLISH_PARAM_INQUIRE | 조회그라인딩프로세스매개변수 |
| 0x4603 | POLISH_PARAM_RESPOND | 반환그라인딩프로세스매개변수 |

### 팔레타이징프로세스 (0x4200)

| 메시지ID | 이름 | 설명 |
|--------|------|------|
| 0x4201 | PAL_GRIPPER_PARM_SET | 설정抓手매개변수 |
| 0x4202 | PAL_GRIPPER_PARM_INQUIRE | 조회抓手매개변수 |
| 0x4203 | PAL_GRIPPER_PARM_RESPOND | 반환抓手매개변수 |
| 0x4204 | PAL_PALLET_PARM_SET | 설정托盘매개변수 |
| 0x4205 | PAL_PALLET_PARM_INQUIRE | 조회托盘매개변수 |
| 0x4206 | PAL_PALLET_PARM_RESPOND | 반환托盘매개변수 |
| 0x4207 | PAL_POS_PARM_SET | 설정위치매개변수 |
| 0x4208 | PAL_POS_PARM_INQUIRE | 조회위치매개변수 |
| 0x4209 | PAL_POS_PARM_RESPOND | 반환위치매개변수 |
| 0x420A | PAL_WORKPIECE_PARM_SET | 설정공작물매개변수 |
| 0x420B | PAL_WORKPIECE_PARM_INQUIRE | 조회공작물매개변수 |
| 0x420C | PAL_WORKPIECE_PARM_RESPOND | 반환공작물매개변수 |
| 0x420D | PAL_APPRO_PARM_SET | 설정接近매개변수 |
| 0x420E | PAL_APPRO_PARM_INQUIRE | 조회接近매개변수 |
| 0x420F | PAL_APPRO_PARM_RESPOND | 반환接近매개변수 |
| 0x4210 | PAL_OVERLAP_PARM_SET | 설정重叠모드매개변수 |
| 0x4211 | PAL_OVERLAP_PARM_INQUIRE | 조회重叠모드매개변수 |
| 0x4212 | PAL_OVERLAP_PARM_RESPOND | 반환重叠모드매개변수 |
| 0x4213 | PAL_PLANE_PARM_SET | 설정平面모드매개변수 |
| 0x4214 | PAL_PLANE_PARM_INQUIRE | 조회平面모드매개변수 |
| 0x4215 | PAL_PLANE_PARM_RESPOND | 반환平面모드매개변수 |

### 비전프로세스 (0x4100)

| 메시지ID | 이름 | 설명 |
|--------|------|------|
| 0x4101 | VISION_PARAMETER_SET | 설정비전매개변수 |
| 0x4102 | VISION_PARAMETER_INQUIRE | 조회비전매개변수 |
| 0x4103 | VISION_PARAMETER_RESPOND | 반환비전매개변수 |
| 0x4104 | VISION_POS_PARAMETER_SET | 설정비전위치매개변수 |
| 0x4105 | VISION_POS_PARAMETER_INQUIRE | 조회비전위치매개변수 |
| 0x4106 | VISION_POS_PARAMETER_RESPOND | 반환비전위치매개변수 |
| 0x4107 | VISION_DEBUGGING_POS_INQUIRE | 조회비전调试포인트열表 |
| 0x4108 | VISION_DEBUGGING_POS_RESPOND | 반환调试포인트열表 |
| 0x4109 | VISION_DEBUGGING_POS_CLEAR | 清空调试포인트열表 |
| 0x410A | VISION_DEBUGGING_TAKE_PICTURE | 拍照 |
| 0x410B | VISION_DEBUGGING_CALCULATE | 计算偏移 |
| 0x410C | VISION_DEBUGGING_POS_MOVE | 모션至该点 |
| 0x4110 | VISION_GESTURE_CALIBRATION_SET | 캘리브레이션抓取姿态 |
| 0x4111 | VISION_GESTURE_CALIBRATION_RESPOND | 반환캘리브레이션结果 |
| 0x4112 | VISION_TRY_TAKE_PICTURE | 试拍照 |
| 0x4113 | VISION_TAKE_PICTURE_RESPOND | 반환拍照结果 |
| 0x4114 | VISION_IPPARAM_INQUIRE | 조회비전IP매개변수 |
| 0x4115 | VISION_IPPARAM_RESPOND | 반환IP매개변수 |
| 0x4116 | VISION_GESTURE_CALIBRATION_CLEAR | 해제抓取姿态캘리브레이션 |
| 0x4117 | VISION_CALIBRATION_PARAM_SET | 설정비전캘리브레이션매개변수 |

### 심 추적프로세스 (0x4100/0x4130/0x4140/0x4160)

| 메시지ID | 이름 | 설명 |
|--------|------|------|
| 0x4130 | TRACK_LASER_PARAM_SET | 설정레이저器매개변수 |
| 0x4131 | TRACK_LASER_PARAM_INQUIRE | 조회레이저器매개변수 |
| 0x4132 | TRACK_LASER_PARAM_RESPOND | 반환레이저器매개변수 |
| 0x4133 | LOCATING_SENSORTYPE_SET | 설정심 검출유형 |
| 0x4134 | LOCATING_SENSORTYPE_INQUIRE | 조회심 검출유형 |
| 0x4135 | LOCATING_SENSORTYPE_RESPOND | 반환심 검출유형 |
| 0x4136 | TRACK_LASER_TRACKPARAM_SET | 설정레이저추적매개변수表 |
| 0x4140 | SENSOR_LASER_CALIBRATE_INQUIRE | 조회캘리브레이션记录 |
| 0x4141 | SENSOR_LASER_CALIBRATE_RESPOND | 반환캘리브레이션记录 |
| 0x4142 | SENSOR_LASER_CALIBRATE_RECORD | 记录캘리브레이션点 |
| 0x4143 | SENSOR_LASER_CALIBRATE_RECORD_RESPOND | 반환记录结果 |
| 0x4144 | SENSOR_LASER_CALIBRATE_MOVETO | 모션到캘리브레이션点 |
| 0x4145 | SENSOR_LASER_CALIBRATE_CALCULATE | 计算캘리브레이션结果 |
| 0x4146 | SENSOR_LASER_CALIBRATE_CALCULATE_RESPOND | 반환计算结果 |
| 0x4147 | SENSOR_LASER_CALIBRATE_CLEAR | 清空캘리브레이션记录 |
| 0x4148 | SENSOR_LASER_CALIBRATE_CANCEL | 取消캘리브레이션 |
| 0x4149 | SENSOR_LASER_CALIBRATE_RESULT_INQUIRE | 조회레이저器여부캘리브레이션 |
| 0x414A | SENSOR_LASER_CALIBRATE_RESULT_RESPOND | 반환캘리브레이션结果 |
| 0x4169 | TRACK_SENSORTYPE_SET | 설정추적유형 |
| 0x4170 | TRACK_SENSORTYPE_INQUIRE | 조회추적유형 |
| 0x4171 | TRACK_SENSORTYPE_RESPOND | 반환추적유형 |

### 컨베이어추적 (0x4800)

| 메시지ID | 이름 | 설명 |
|--------|------|------|
| 0x4801 | TRACK_CONVEYOR_CONVEYORPARAM_SET | 설정컨베이어매개변수 |
| 0x4802 | TRACK_CONVEYOR_CONVEYORPARAM_INQUIRE | 조회컨베이어매개변수 |
| 0x4803 | TRACK_CONVEYOR_CONVEYORPARAM_RESPOND | 반환컨베이어매개변수 |
| 0x4804 | TRACK_CONVEYOR_POSCHECKPARAM_SET | 설정매개변수识别 |
| 0x4805 | TRACK_CONVEYOR_POSCHECKPARAM_INQUIRE | 조회공작물识别매개변수 |
| 0x4806 | TRACK_CONVEYOR_POSCHECKPARAM_RESPOND | 반환공작물识别매개변수 |
| 0x4807 | TRACK_CONVEYOR_REALTIME_INQUIRE | 实时조회엔코더值和속도 |
| 0x4808 | TRACK_CONVEYOR_REALTIME_RESPOND | 반환实时데이터 |
| 0x480E | TRACK_CONVEYOR_USERCOORD_INQUIRE | 조회사용자좌표계 |
| 0x480F | TRACK_CONVEYOR_USERCOORD_RESPOND | 반환사용자좌표계 |
| 0x4810 | TRACK_CONVEYOR_USERCOORD_CALCULATE | 计算사용자좌표계 |
| 0x4811 | TRACK_CONVEYOR_USERCOORD_CALIBRATION | 캘리브레이션取좌표 |
| 0x4812 | RACK_CONVEYOR_CALIBRATION_INQUIRE | 조회已캘리브레이션的点좌표 |
| 0x4813 | TRACK_CONVEYOR_CALIBRATION_RESPOND | 반환캘리브레이션的点좌표 |
| 0x4814 | TRACK_CONVEYOR_CALIBRATION_CLEAR | 清空캘리브레이션值 |
| 0x4815 | TRACK_CONVEYOR_CALIBRATION_CANCEL | 取消캘리브레이션 |
| 0x4816 | TRACK_CONVEYOR_SENSORPOS_INQUIRE | 조회传感器위치 |
| 0x4817 | TRACK_CONVEYOR_SENSORPOS_RESPOND | 반환传感器위치 |
| 0x4818 | TRACK_CONVEYOR_SENSORPOS_CALIBRATION_INQUIRE | 조회传感器위치캘리브레이션매개변수 |
| 0x4819 | TRACK_CONVEYOR_SENSORPOS_CALIBRATION_RESPOND | 반환캘리브레이션매개변수 |
| 0x481A | TRACK_CONVEYOR_SENSORPOS_CALIBRATE | 传感器위치매개변수캘리브레이션 |

### 스탬핑프로세스 (0x8000)

| 메시지ID | 이름 | 설명 |
|--------|------|------|
| 0x8000 | PUNCH_SET_WORKPIECE_CONDITION | 前站料况설정 |
| 0x8001 | PUNCH_INQUIRE_WORKPIECE_CONDITION | 夹具料况조회 |
| 0x8002 | PUNCH_RESPOND_WORKPIECE_CONDITION | 반환料况조회结果 |
| 0x8003 | PUNCH_SET_CONTROL_MODE | 제어유형설정 |
| 0x8004 | PUNCH_INQUIRE_CONTROL_MODE | 조회제어유형 |
| 0x8005 | PUNCH_RESPOND_CONTROL_MODE | 반환제어유형 |
| 0x8006 | PUNCH_INQUIRE_PRODUCE_TARGET_WASTE_NUM | 생산 수량조회 |
| 0x8007 | PUNCH_RESPOND_PRODUCE_TARGET_WASTE_NUM | 반환생산 수량 |
| 0x8008 | PUNCH_CLEAR_PRODUCE_TARGET_WASTE_NUM | 생산 수량清零 |
| 0x8009 | PUNCH_SET_SHIELD_CHECK_RUN_WITHOUT_PIECE_PUNCH_ENABLE | 스탬핑활성화설정 |
| 0x800A | PUNCH_INQUIRE_SHIELD_CHECK_RUN_WITHOUT_PIECE_PUNCH_ENABLE | 조회스탬핑활성화 |
| 0x800B | PUNCH_RESPOND_SHIELD_CHECK_RUN_WITHOUT_PIECE_PUNCH_ENABLE | 반환스탬핑활성화 |
| 0x800C | PUNCH_SINGLE_RUN_TEST | 单机试실행 |
| 0x800D | PUNCH_ESCAPE_FROM_MOULD | 模内逃跑测试 |
| 0x800E | PUNCH_SET_FIXTURE_ACTION | 설정治具动作 |
| 0x800F | PUNCH_INQUIRE_FIXTURE_ACTION | 조회治具动作 |
| 0x8010 | PUNCH_RESPOND_FIXTURE_ACTION | 반환治具动作 |
| 0x8011 | PUNCH_ONLINE_STATUS_RESET | 联机상태리셋 |
| 0x8012 | PUNCH_JOBFILE_OPERATION | 일시정지/시작/정지 |
| 0x8013 | PUNCH_INQUIRE_RUN_STATUS | 실행주기조회 |
| 0x8014 | PUNCH_RESPOND_RUN_STATUS | 반환실행상태 |
| 0x8015 | PUNCH_SEND_ERROR_INFO | 전송오류弹窗信息 |
| 0x8016 | PUNCH_RECEIVE_ERROR_DEAL | 수신弹窗按键处理 |
| 0x8017 | PUNCH_CHOOSE_CRAFT_NUM | 选中프로세스号 |
| 0x8018 | PUNCH_APPLY_TO_ONLINE | 应用到联机 |
| 0x8019 | PUNCH_INQUIRE_CURRENT_CRAFT_NUM | 조회현재选中프로세스号 |
| 0x801A | PUNCH_RESPOND_CURRENT_CRAFT_NUM | 반환현재选中프로세스号 |
| 0x801B~0x80XX | - | 更多프로세스매개변수설정 |

### 레이저 절단프로세스 (0x4400)

| 메시지ID | 이름 | 설명 |
|--------|------|------|
| 0x4401 | LASER_IOPORT_SET | IO포트설정 |
| 0x4402 | LASER_IOPORT_INQUIRE | IO포트조회 |
| 0x4403 | LASER_IOPORT_RESPOND | IO포트응답 |
| 0x4404 | LASER_EQUIPMENT_SET | 全局매개변수설정 |
| 0x4405 | LASER_EQUIPMENT_INQUIRE | 全局매개변수조회 |
| 0x4406 | LASER_EQUIPMENT_RESPOND | 全局매개변수응답 |
| 0x4407 | LASER_ANALOGMATCH_SET | 아날로그 매칭설정 |
| 0x4408 | LASER_ANALOGMATCH_INQUIRE | 아날로그 매칭조회 |
| 0x4409 | LASER_ANALOGMATCH_RESPOND | 아날로그 매칭응답 |
| 0x440A | LASER_CUTPARM_SET | 절단매개변수설정 |
| 0x440B | LASER_CUTPARM_INQUIRE | 절단매개변수조회 |
| 0x440C | LASER_CUTPARM_RESPOND | 절단매개변수응답 |
| 0x440E | LASER_STATE_INQUIRE | 상태조회 |
| 0x440F | LASER_STATE_RESPOND | 상태응답 |
| 0x4410 | LASER_SHOTPARM_SET | 点射매개변수설정 |
| 0x4411 | LASER_HANDOP_SET | 手动조작설정 |
| 0x4412 | LASER_HANDOP_INQUIRE | 手动조작상태조회 |
| 0x4413 | LASER_HANDOP_RESPOND | 手动조작상태응답 |
| 0x4417 | LASER_FACTCURVOL_SET | 模拟量전송설정 |
| 0x4419 | LASER_FACTCURVOL_RESPOND | 模拟量전송응답 |
| 0x4422 | LASER_CUT_FEED_COOL_GAS | 冷却气제어 |
| 0x4423 | LASER_CUT_NOZZLE_CLEAN | 喷嘴清洁 |

---

## 通用매개변수 설명

### 로봇 번호 (robot)

| 유형 | 설명 |
|------|------|
| int | 로봇 번호，通常범위 1~n |

### 프로세스号 (craftID/num/visionNum/conveyorID等)

| 유형 | 설명 |
|------|------|
| int | 프로세스编号，不同프로세스유형有不同的取值범위 |

---

## 데이터结构설명

### 요청/응답通用모드

```
요청方 ──메시지ID──> 컨트롤러
       <──응답ID── 컨트롤러
```

### 通用응답형식

```json
{
  "result": 1,
  "robot": 1
}
```

| 매개변수名 | 유형 | 설명 |
|--------|------|------|
| result | int | 1-성공，0-실패 |
| robot | int | 로봇 번호 |

---

## 주의사항

1. **메시지ID형식**：所有메시지ID使用十六进制형식，如 `0x4001`
2. **필수매개변수**：매개변수 설명中的"필수"열表示该매개변수여부필수提供
3. **데이터유형**：详细매개변수유형和설명请参阅各프로세스的专门文档
4. **代码예시**：各文档中的JSON예시均可直接使用
