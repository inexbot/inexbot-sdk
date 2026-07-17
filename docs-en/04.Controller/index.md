# Controller Secondary Development

## Introduction

Controller secondary development is based on the interfaces provided by the controller. The program runs inside the controller, making it suitable for developing dedicated processes.

## Document Structure

```
Controller
├── Quick Start                    # Environment setup, project build, program deployment
├── Secondary Development API (Robot Basic Parameters)   # Core interfaces: system/servo/coordinate system/IO/variables
├── Secondary Development API (Job Files, Instructions)   # Job file management, instruction insertion, queue execution
├── Secondary Development API (Palletizing Process)            # Palletizing process parameter settings and control
└── Examples
    ├── Custom Instructions
    │   ├── Controller Implementation                  # Controller-side custom instruction development
    │   └── Teach Pendant Implementation                  # Teach pendant-side custom UI development
    └── Custom Instruction Demo.md              # Example download instructions
```

## Function Index

### System and Initialization

| Function | Description |
|------|------|
| NRC_StartController | Start controller |
| NRC_GetControlInitComplete | Wait for initialization to complete |
| NRC_SetOperationMode | Set operation mode (Teach 0 / Remote 1 / Run 2) |
| NRC_RebootController | Reboot controller |
| NRC_RestoreFactorySettings | Restore factory settings |
| NRC_ModifyControllerIP | Modify controller IP |
| NRC_ShieldedTeachingPendant | Disable teach pendant connection detection (must be called before startup) |
| NRC_GetRobotSum | Get robot count |
| NRC_SetRobotMode | Set multi-robot mode |
| NRC_Delayms | Delay (milliseconds) |
| NRC_LogInfo | Print log |
| NRC_GetNexMotionLibVersion | Get library version |
| NRC_GetSyncVersion | Get sync version number |

### Servo Control

| Function | Description |
|------|------|
| NRC_PowerOn / NRC_PowerOff | Servo power on/off |
| NRC_ServoEnable / NRC_ServoDisable | Teach mode power on/off (requires deadman switch) |
| NRC_SetServoReadyStatus | Switch servo ready status |
| NRC_GetServoStatus | Get servo status (0-disabled 1-ready 2-alarm 3-enabled) |
| NRC_GetPowerOffSaveSignal | Get power status |
| NRC_ClearServoError / NRC_ClearAllError | Clear servo/all errors |

### Motion Control

| Function | Description |
|------|------|
| NRC_RobotMoveJoint | Robot point-to-point motion |
| NRC_RobotMoveJointSync | Robot external axis point-to-point motion |
| NRC_RobotMoveLineSync | Robot linear motion (body + external axis) |
| NRC_JogMove / NRC_JogMoveStop / NRC_JogMoveStopAll | Jog control |
| NRC_StartResetPoint | Return to reset point |
| NRC_SetTargetVelocity | Set target velocity (PV mode) |
| NRC_PosReachable | Check if point is reachable |

### Speed Control

| Function | Description |
|------|------|
| NRC_SetTeachRunSpeedPer / NRC_GetTeachRunSpeedPer | Teach speed percentage |
| NRC_SetAutoRunSpeedPer / NRC_GetAutoRunSpeedPer | Auto speed percentage |
| NRC_SetTeachMaxStepSpeed / NRC_GetTeachMaxStepSpeed | Teach max single-step speed |
| NRC_GetAngularVel | Get joint angular velocity (rad/s) |
| NRC_GetLinerVel | Get linear velocity (mm/s) |
| NRC_GetAxisVelSync | Get external axis velocity |

### Jog Configuration

| Function | Description |
|------|------|
| NRC_SetJogJointSpeedConfig / NRC_GetJogJointSpeedConfig | Jog joint speed |
| NRC_SetJogRectangularSpeedConfig / NRC_GetJogRectangularSpeedConfig | Jog Cartesian speed |
| NRC_SetJogSensitivitySpeedConfig | Jog sensitivity |
| NRC_SetJogMoveCalculateNum | Jog interpolation point count |

### Coordinate System and Calibration

| Function | Description |
|------|------|
| NRC_SetCurrentCoord / NRC_GetCurrentCoord | Switch/get current coordinate system |
| NRC_PositionACStoMCS / NRC_PositionMCStoACS | Joint <-> Cartesian coordinate conversion |
| NRC_TcpCalculate | TCP fixed distance offset calculation |

**Tool:**

| Function | Description |
|------|------|
| NRC_SetToolCoordParm / NRC_GetToolCoordParm | Set/get tool parameters |
| NRC_CalibrationToolCoord_7Pos | 7-point/6-point calibration |
| NRC_CalibrationToolCoord_2Pos_SetPos / _Cacl / _Save | 2-point calibration (three steps) |
| NRC_SwitchToolCoord / NRC_GetCurrentToolCoord | Switch/get current tool |

**User Coordinate:**

| Function | Description |
|------|------|
| NRC_SetUserCoordParm / NRC_GetUserCoordParm | Set/get user coordinate parameters |
| NRC_CalibrationUserCoord | User coordinate calibration (3-point method) |
| NRC_SwitchUserCoord / NRC_GetCurrentUserCoord | Switch/get current user coordinate |

### Position and Zero Point

| Function | Description |
|------|------|
| NRC_GetCurrentPos / NRC_Rbt_GetCurrentPos | Get current position |
| NRC_GetOtherToolPos | Get position under other tool coordinate system |
| NRC_GetEncoderPosition | Get encoder position |
| NRC_SetCurrentPosToZeroPos / NRC_Rbt_SetCurrentPosToZeroPos | Set zero point/clear multi-turn value |
| NRC_Rbt_SetSingleCircleValue / NRC_Rbt_GetSingleCircleValue | Set/get single-turn value |

### External Axis

| Function | Description |
|------|------|
| NRC_SetSyncJointNum | Set external axis count |
| NRC_SetSyncJointPara / NRC_GetSyncJointPara | Set/get external axis parameters |
| NRC_SetSyncGroupCarbinarion / NRC_CalSyncCalibrationResult | External axis calibration |
| NRC_SetCurrentSyncPosToZeroPos | External axis zero point setting |
| NRC_SingleSyncAxisMoveJConstVel_For_CustomInstructionCB | External axis constant velocity motion |
| NRC_GetCurrentSyncPos / NRC_Rbt_GetCurrentSyncPos | Get external axis position |

### Torque and Dynamics

| Function | Description |
|------|------|
| NRC_SetTargetTorque / NRC_GetActualTorque | Set/get torque |
| NRC_GetActualCurrent / NRC_GetMaxCurrent | Current control |
| NRC_GetRatedTorque / NRC_GetTorq | Rated torque |
| NRC_SetIdentityParam | Set dynamics identification parameters |
| NRC_RunSafeCheckProgram / NRC_RunIdentifyProgram | Safety check/dynamics identification |
| NRC_SetCollisionParam / NRC_SetCollisionSwitch | Collision detection |

### Job File Operations

| Function | Description |
|------|------|
| NRC_CreateJobfile / NRC_OpenJobfile / NRC_DeleteJobfile | Job file CRUD |
| NRC_JudgeJobIsExist | Check if job file exists |
| NRC_GetJobfileLineSum | Get job file total line count |
| NRC_StartRunJobfile / NRC_PauseRunJobfile / NRC_StopRunJobfile | Run/pause/stop |
| NRC_StepRunJobfile | Single-step run |
| NRC_StopRunJobfileNotPoweroff | Stop (without power off) |

**Job File Insert Instructions:**

| Function | Description |
|------|------|
| NRC_JobfileInsertMOVJ / MOVL / MOVS / MOVC / IMOV | Insert motion instructions |
| NRC_JobfileInsertMOVJEXT / MOVLEXT / MOVCEXT | Insert motion instructions with external axis |
| NRC_JobfileInsertDOUT / WAIT / TIMER / UNTIL | Insert IO/wait instructions |
| NRC_JobfileInsertIF / VarIF / ELSE / ENDIF | Insert conditional statements |
| NRC_JobfileInsertWHILE / VarWHILE / ENDWHILE | Insert loops |
| NRC_JobfileInsertSETVAR / OPCmd | Insert variable operations |
| NRC_JobfileInsertPALON / PALOFF / PALGRIPPER ... | Insert palletizing instructions |
| NRC_JobfileInsertARCON / ARCOFF | Insert welding instructions |
| NRC_JobfileInsertCustomInstruction | Insert custom instruction |
| NRC_JobfileInsertPOSCALALL | Insert position bulk modify instruction |

### File-less Run Queue

| Function | Description |
|------|------|
| NRC_CreateNoFlieRunqueue | Create file-less queue |
| NRC_InsertNoFlieRunqueue | Insert a set of instructions |
| NRC_StartRunNoFlieRunqueue / Pause / Stop | Run/pause/stop |
| NRC_RunqueueInsertMOVJ / MOVL / ... | Insert various instructions (same as job file) |

### Append Run Mode

| Function | Description |
|------|------|
| NRC_OpenInstrAppendRunMode / NRC_CloseInstrAppendRunMode | Enable/disable append mode |
| NRC_AppendRunInstr | Append run instruction |
| NRC_PauseInstrAppendRun / NRC_RestartInstrAppendRun | Pause/restart |
| NRC_StopInstrAppendRun / NRC_StopInstrAppendRunNotPoweroff | Stop (with/without power off) |
| NRC_GetIsInstrAppendRunMode | Whether in append mode |
| NRC_GetRestAppendInstrNum | Remaining instruction count |

### Local Background Program

| Function | Description |
|------|------|
| NRC_CreatePthreadJobfile / NRC_OpenPthreadJobfile | Create/open background program |
| NRC_DeletePthreadJobfile / NRC_JudgePthreadJobIsExist | Delete/check existence |
| NRC_JobfileInsertPthreadStart / PthreadEnd | Insert start/end instruction |

### Callback Functions

| Function | Description |
|------|------|
| NRC_SetCompleteOneInstrCallBack | Set instruction completion callback |
| NRC_SetJobFileCustomInstructionCB | Set custom instruction callback |
| NRC_SetMsgHappenCallback | Set message callback |
| NRC_SetSocketCustomProtocalCB | Set TCP protocol callback |
| NRC_SetFaultResetCB | Set error clear button callback |
| NRC_robotRunCycle_Callback | Set communication cycle callback (1ms) |

### IO Control

| Function | Description |
|------|------|
| NRC_DigOut / NRC_DigOutByBoard | Digital output |
| NRC_ReadDigOut / NRC_ReadDigOutByBoard | Read digital output |
| NRC_ReadDigIn / NRC_ReadDigInByBoard | Read digital input |
| NRC_AnaOut / NRC_ReadAnaOut / NRC_ReadAnaIn | Analog IO |

### Communication Interface

| Function | Description |
|------|------|
| NRC_SetCANBaudRate / NRC_SendCANData | CAN communication |
| NRC_SetCommunicationParam / NRC_SetCommunicationStatus | TCP communication parameters |
| NRC_SetTcpMessageCallback | TCP message callback |
| NRC_CommSendMessage | Send TCP message |
| NRC_GetModbusSlaveConnectStatus / NRC_GetModbusMasterConnectStatus | Modbus status |
| NRC_SetSocketCustomProtocalCB / NRC_SendSocketCustomProtocal | Custom Socket protocol |

### Messages and Errors

| Function | Description |
|------|------|
| NRC_SetMsgHappenCallback | Message occurrence callback |
| NRC_FirstMessagePop / NRC_LastMessagePop | Pop first/last message |
| NRC_GetMessage / NRC_GetMessageSize | Get message |
| NRC_ClearMessage | Clear message queue |
| NRC_TriggerErrorReport | Actively trigger error report |

### Variable Management

| Function | Description |
|------|------|
| NRC_SetBoolVar / NRC_ReadBoolVar | BOOL variable |
| NRC_SetIntVar / NRC_ReadIntVar | INT variable |
| NRC_SetDoubleVar / NRC_ReadDoubleVar | DOUBLE variable |
| NRC_SetGlobalPositionVariable / NRC_GetGlobalPositionVariable | Global position variable |
| NRC_SetGlobalPositionVariableNote / NRC_GetGlobalPositionVariableNote | Global position variable comment |
| NRC_GetCurrentTime | Get current time |

### Palletizing Process

| Function | Description |
|------|------|
| NRC_Pallet_SetUsePalletType / NRC_Pallet_GetUsePalletType | Simple/full palletizing |
| NRC_Pallet_SetGripperParm / NRC_Pallet_GetGripperParm | Gripper parameters |
| NRC_Pallet_SetSimplePosParm / NRC_Pallet_GetSimplePosParm | Position parameters |
| NRC_Pallet_SetSimpleNumParm / NRC_Pallet_GetSimpleNumParm | Quantity parameters |
| NRC_Pallet_ClearCurrentStatus | Clear palletizing status |
| NRC_Pallet_SetPalletedWpNum / NRC_Pallet_GetPalletedWpNum | Palletized workpiece count |

### Motion Status Query

| Function | Description |
|------|------|
| NRC_GetProgramRunStatus | Program run status (0-stopped 1-paused 2-running) |
| NRC_GetRobotRunStatus | Robot motion status (0-stopped 1-moving) |
| NRC_GetTeachBoxConnectStatus | Teach pendant connection status |
| NRC_GetCurrentOrderRuns | Program execution direction (forward/reverse) |
| NRC_GetCycleIndex / NRC_GetCycleCount / NRC_GetCycleTimeSec | Cycle count/time |
| NRC_GetDistanceToOldTrack | Distance to original trajectory stop point |
| NRC_GetRunqueueCurrentRunLine / NRC_GetJobfileCurrentRunLine | Current running line number |

### Motion Auxiliary

| Function | Description |
|------|------|
| NRC_SetTargetPosition | Set robot target position |
| NRC_GetPlanningPosition | Get first point in planning queue |
| NRC_PV_SetTargetVelocity / NRC_PV_SetTargetAccAndDec | PV mode velocity/acceleration |
| NRC_SetInterpolationMethod | Set interpolation method (S-curve/trapezoidal) |
| NRC_SetAbsolutePosResolution | Absolute position resolution |

### Robot Parameters

| Function | Description |
|------|------|
| NRC_SetRobotTypeConfig / NRC_GetRobotTypeConfig | Robot type |
| NRC_SetRobotDHConfig / NRC_GetRobotDHConfig | DH parameters |
| NRC_SetRobotJointConfig | Joint parameters |
| NRC_SetRobotDecareConfig / NRC_GetRobotDecareConfig | Cartesian parameters |
| NRC_CalcConfiguration | Calculate robot configuration |
| NRC_GetRobotAxisSum | Get robot axis count |
| NRC_GetSyncAxisSum | Get external axis count |
| NRC_SetRobotRangeLimit / NRC_GetRobotRangeLimit | Range limits |

### Prerequisites

- C++ language fundamentals
- Linux system (Ubuntu) basic usage
- Industrial robot basic knowledge
- Eclipse / VS Code / Vim or other editors
