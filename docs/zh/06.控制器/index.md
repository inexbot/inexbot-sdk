# 控制器二次开发

## 简介

控制器二次开发是基于控制器所提供的接口来进行的二次开发。程序运行在控制器内部，适合用来开发专用工艺。

## 文档结构

```text
控制器
├── 快速开始                    # 环境搭建、项目构建、程序部署
├── 二次开发API（机器人基本参数设置）   # 系统/伺服/坐标系/IO/变量等核心接口
├── 二次开发API（作业文件，指令操作）   # 作业文件管理、指令插入、队列运行
├── 二次开发API（码垛工艺）            # 码垛工艺参数设置与控制
└── 示例
    ├── 自定义指令
    │   ├── 控制器实现                  # 控制器侧自定义指令开发
    │   └── 示教器实现                  # 示教器侧自定义 UI 开发
    └── 自定义指令demo.md              # 示例下载说明
```

## 函数索引

### 系统与初始化

| 函数 | 说明 |
|------|------|
| NRC_StartController | 启动控制器 |
| NRC_GetControlInitComplete | 等待初始化完成 |
| NRC_SetOperationMode | 设置操作模式（示教 0 / 远程 1 / 运行 2） |
| NRC_RebootController | 重启控制器 |
| NRC_RestoreFactorySettings | 恢复出厂设置 |
| NRC_ModifyControllerIP | 修改控制器 IP |
| NRC_ShieldedTeachingPendant | 屏蔽示教器连接检测（需在启动前调用） |
| NRC_GetRobotSum | 获取机器人数量 |
| NRC_SetRobotMode | 设置多机模式 |
| NRC_Delayms | 延时（毫秒） |
| NRC_LogInfo | 打印日志 |
| NRC_GetNexMotionLibVersion | 获取库版本 |
| NRC_GetSyncVersion | 获取同步版本号 |

### 伺服控制

| 函数 | 说明 |
|------|------|
| NRC_PowerOn / NRC_PowerOff | 伺服上/下使能 |
| NRC_ServoEnable / NRC_ServoDisable | 示教模式上/下使能（需按 deadman） |
| NRC_SetServoReadyStatus | 切换伺服准备状态 |
| NRC_GetServoStatus | 获取伺服状态（0-禁止 1-就绪 2-报警 3-允许） |
| NRC_GetPowerOffSaveSignal | 获取通电状态 |
| NRC_ClearServoError / NRC_ClearAllError | 清除伺服/全部错误 |

### 运动控制

| 函数 | 说明 |
|------|------|
| NRC_RobotMoveJoint | 机器人点到点运动 |
| NRC_RobotMoveJointSync | 机器人外部轴点对点运动 |
| NRC_RobotMoveLineSync | 机器人直线运动（本体+外部轴） |
| NRC_JogMove / NRC_JogMoveStop / NRC_JogMoveStopAll | 点动控制 |
| NRC_StartResetPoint | 回复位点 |
| NRC_SetTargetVelocity | 设置目标速度（PV 模式） |
| NRC_PosReachable | 判断点位是否可到达 |

### 速度控制

| 函数 | 说明 |
|------|------|
| NRC_SetTeachRunSpeedPer / NRC_GetTeachRunSpeedPer | 示教速度百分比 |
| NRC_SetAutoRunSpeedPer / NRC_GetAutoRunSpeedPer | 自动速度百分比 |
| NRC_SetTeachMaxStepSpeed / NRC_GetTeachMaxStepSpeed | 示教最大单步速度 |
| NRC_GetAngularVel | 获取关节角速度（rad/s） |
| NRC_GetLinerVel | 获取线速度（mm/s） |
| NRC_GetAxisVelSync | 获取外部轴速度 |

### 点动配置

| 函数 | 说明 |
|------|------|
| NRC_SetJogJointSpeedConfig / NRC_GetJogJointSpeedConfig | 点动关节速度 |
| NRC_SetJogRectangularSpeedConfig / NRC_GetJogRectangularSpeedConfig | 点动直角速度 |
| NRC_SetJogSensitivitySpeedConfig | 点动灵敏度 |
| NRC_SetJogMoveCalculateNum | 点动插补点位个数 |

### 坐标系与标定

| 函数 | 说明 |
|------|------|
| NRC_SetCurrentCoord / NRC_GetCurrentCoord | 切换/获取当前坐标系 |
| NRC_PositionACStoMCS / NRC_PositionMCStoACS | 关节↔直角坐标转换 |
| NRC_TcpCalculate | TCP 固定距离偏移计算 |

**工具手：**

| 函数 | 说明 |
|------|------|
| NRC_SetToolCoordParm / NRC_GetToolCoordParm | 设置/获取工具手参数 |
| NRC_CalibrationToolCoord_7Pos | 7点/6点标定 |
| NRC_CalibrationToolCoord_2Pos_SetPos / _Cacl / _Save | 2点标定（三步） |
| NRC_SwitchToolCoord / NRC_GetCurrentToolCoord | 切换/获取当前工具手 |

**用户坐标：**

| 函数 | 说明 |
|------|------|
| NRC_SetUserCoordParm / NRC_GetUserCoordParm | 设置/获取用户坐标参数 |
| NRC_CalibrationUserCoord | 用户坐标标定（3点法） |
| NRC_SwitchUserCoord / NRC_GetCurrentUserCoord | 切换/获取当前用户坐标 |

### 位置与零点

| 函数 | 说明 |
|------|------|
| NRC_GetCurrentPos / NRC_Rbt_GetCurrentPos | 获取当前位置 |
| NRC_GetOtherToolPos | 获取其他工具坐标系下的位置 |
| NRC_GetEncoderPosition | 获取编码器位置 |
| NRC_SetCurrentPosToZeroPos / NRC_Rbt_SetCurrentPosToZeroPos | 设置零点/清除多圈值 |
| NRC_Rbt_SetSingleCircleValue / NRC_Rbt_GetSingleCircleValue | 设置/获取单圈值 |

### 外部轴

| 函数 | 说明 |
|------|------|
| NRC_SetSyncJointNum | 设置外部轴数目 |
| NRC_SetSyncJointPara / NRC_GetSyncJointPara | 设置/获取外部轴参数 |
| NRC_SetSyncGroupCarbinarion / NRC_CalSyncCalibrationResult | 外部轴标定 |
| NRC_SetCurrentSyncPosToZeroPos | 外部轴零点设置 |
| NRC_SingleSyncAxisMoveJConstVel_For_CustomInstructionCB | 外部轴恒速运动 |
| NRC_GetCurrentSyncPos / NRC_Rbt_GetCurrentSyncPos | 获取外部轴位置 |

### 力矩与动力学

| 函数 | 说明 |
|------|------|
| NRC_SetTargetTorque / NRC_GetActualTorque | 设置/获取力矩 |
| NRC_GetActualCurrent / NRC_GetMaxCurrent | 电流控制 |
| NRC_GetRatedTorque / NRC_GetTorq | 额定力矩 |
| NRC_SetIdentityParam | 设置动力学辨识参数 |
| NRC_RunSafeCheckProgram / NRC_RunIdentifyProgram | 安全检测/动力学辨识 |
| NRC_SetCollisionParam / NRC_SetCollisionSwitch | 碰撞检测 |

### 作业文件操作

| 函数 | 说明 |
|------|------|
| NRC_CreateJobfile / NRC_OpenJobfile / NRC_DeleteJobfile | 作业文件 CRUD |
| NRC_JudgeJobIsExist | 判断作业文件是否存在 |
| NRC_GetJobfileLineSum | 获取作业文件总行数 |
| NRC_StartRunJobfile / NRC_PauseRunJobfile / NRC_StopRunJobfile | 运行/暂停/停止 |
| NRC_StepRunJobfile | 单步运行 |
| NRC_StopRunJobfileNotPoweroff | 停止（不下使能） |

**作业文件插入指令：**

| 函数 | 说明 |
|------|------|
| NRC_JobfileInsertMOVJ / MOVL / MOVS / MOVC / IMOV | 插入运动指令 |
| NRC_JobfileInsertMOVJEXT / MOVLEXT / MOVCEXT | 插入带外部轴的运动指令 |
| NRC_JobfileInsertDOUT / WAIT / TIMER / UNTIL | 插入 IO/等待指令 |
| NRC_JobfileInsertIF / VarIF / ELSE / ENDIF | 插入条件判断 |
| NRC_JobfileInsertWHILE / VarWHILE / ENDWHILE | 插入循环 |
| NRC_JobfileInsertSETVAR / OPCmd | 插入变量操作 |
| NRC_JobfileInsertPALON / PALOFF / PALGRIPPER ... | 插入码垛指令 |
| NRC_JobfileInsertARCON / ARCOFF | 插入焊接指令 |
| NRC_JobfileInsertCustomInstruction | 插入自定义指令 |
| NRC_JobfileInsertPOSCALALL | 插入点位全改指令 |

### 无文件运行队列

| 函数 | 说明 |
|------|------|
| NRC_CreateNoFlieRunqueue | 创建无文件队列 |
| NRC_InsertNoFlieRunqueue | 插入一组指令 |
| NRC_StartRunNoFlieRunqueue / Pause / Stop | 运行/暂停/停止 |
| NRC_RunqueueInsertMOVJ / MOVL / ... | 插入各类指令（同作业文件） |

### 追加运行模式

| 函数 | 说明 |
|------|------|
| NRC_OpenInstrAppendRunMode / NRC_CloseInstrAppendRunMode | 开启/关闭追加模式 |
| NRC_AppendRunInstr | 追加运行指令 |
| NRC_PauseInstrAppendRun / NRC_RestartInstrAppendRun | 暂停/重启 |
| NRC_StopInstrAppendRun / NRC_StopInstrAppendRunNotPoweroff | 停止（是否下使能） |
| NRC_GetIsInstrAppendRunMode | 是否处于追加模式 |
| NRC_GetRestAppendInstrNum | 剩余指令数目 |

### 局部后台程序

| 函数 | 说明 |
|------|------|
| NRC_CreatePthreadJobfile / NRC_OpenPthreadJobfile | 新建/打开后台程序 |
| NRC_DeletePthreadJobfile / NRC_JudgePthreadJobIsExist | 删除/判断 |
| NRC_JobfileInsertPthreadStart / PthreadEnd | 插入启动/结束指令 |

### 回调函数

| 函数 | 说明 |
|------|------|
| NRC_SetCompleteOneInstrCallBack | 设置指令完成回调 |
| NRC_SetJobFileCustomInstructionCB | 设置自定义指令回调 |
| NRC_SetMsgHappenCallback | 设置消息回调 |
| NRC_SetSocketCustomProtocalCB | 设置 TCP 协议回调 |
| NRC_SetFaultResetCB | 设置清错按键回调 |
| NRC_robotRunCycle_Callback | 设置通讯周期回调（1ms） |

### IO 控制

| 函数 | 说明 |
|------|------|
| NRC_DigOut / NRC_DigOutByBoard | 数字输出 |
| NRC_ReadDigOut / NRC_ReadDigOutByBoard | 读取数字输出 |
| NRC_ReadDigIn / NRC_ReadDigInByBoard | 读取数字输入 |
| NRC_AnaOut / NRC_ReadAnaOut / NRC_ReadAnaIn | 模拟 IO |

### 通信接口

| 函数 | 说明 |
|------|------|
| NRC_SetCANBaudRate / NRC_SendCANData | CAN 通信 |
| NRC_SetCommunicationParam / NRC_SetCommunicationStatus | TCP 通信参数 |
| NRC_SetTcpMessageCallback | TCP 消息回调 |
| NRC_CommSendMessage | 发送 TCP 消息 |
| NRC_GetModbusSlaveConnectStatus / NRC_GetModbusMasterConnectStatus | Modbus 状态 |
| NRC_SetSocketCustomProtocalCB / NRC_SendSocketCustomProtocal | 自定义 Socket 协议 |

### 消息与错误

| 函数 | 说明 |
|------|------|
| NRC_SetMsgHappenCallback | 消息发生回调 |
| NRC_FirstMessagePop / NRC_LastMessagePop | 弹出首/尾消息 |
| NRC_GetMessage / NRC_GetMessageSize | 获取消息 |
| NRC_ClearMessage | 清除消息队列 |
| NRC_TriggerErrorReport | 主动触发报错 |

### 变量管理

| 函数 | 说明 |
|------|------|
| NRC_SetBoolVar / NRC_ReadBoolVar | BOOL 变量 |
| NRC_SetIntVar / NRC_ReadIntVar | INT 变量 |
| NRC_SetDoubleVar / NRC_ReadDoubleVar | DOUBLE 变量 |
| NRC_SetGlobalPositionVariable / NRC_GetGlobalPositionVariable | 全局位置变量 |
| NRC_SetGlobalPositionVariableNote / NRC_GetGlobalPositionVariableNote | 全局位置变量注释 |
| NRC_GetCurrentTime | 获取当前时间 |

### 码垛工艺

| 函数 | 说明 |
|------|------|
| NRC_Pallet_SetUsePalletType / NRC_Pallet_GetUsePalletType | 简易/完整码垛 |
| NRC_Pallet_SetGripperParm / NRC_Pallet_GetGripperParm | 抓手参数 |
| NRC_Pallet_SetSimplePosParm / NRC_Pallet_GetSimplePosParm | 位置参数 |
| NRC_Pallet_SetSimpleNumParm / NRC_Pallet_GetSimpleNumParm | 数量参数 |
| NRC_Pallet_ClearCurrentStatus | 清除码垛状态 |
| NRC_Pallet_SetPalletedWpNum / NRC_Pallet_GetPalletedWpNum | 已码个数 |

### 运动状态查询

| 函数 | 说明 |
|------|------|
| NRC_GetProgramRunStatus | 程序运行状态（0-停止 1-暂停 2-运行） |
| NRC_GetRobotRunStatus | 机器人运动状态（0-停止 1-运动） |
| NRC_GetTeachBoxConnectStatus | 示教盒连接状态 |
| NRC_GetCurrentOrderRuns | 程序执行方向（顺序/倒序） |
| NRC_GetCycleIndex / NRC_GetCycleCount / NRC_GetCycleTimeSec | 循环次数/时间 |
| NRC_GetDistanceToOldTrack | 距原轨迹停止点距离 |
| NRC_GetRunqueueCurrentRunLine / NRC_GetJobfileCurrentRunLine | 当前运行行号 |

### 运动辅助

| 函数 | 说明 |
|------|------|
| NRC_SetTargetPosition | 设置机器人目标位置 |
| NRC_GetPlanningPosition | 获取规划队列第一个点位 |
| NRC_PV_SetTargetVelocity / NRC_PV_SetTargetAccAndDec | PV 模式速度/加速度 |
| NRC_SetInterpolationMethod | 设置插补方式（S 型/梯形） |
| NRC_SetAbsolutePosResolution | 绝对位置分辨率 |

### 机器人参数

| 函数 | 说明 |
|------|------|
| NRC_SetRobotTypeConfig / NRC_GetRobotTypeConfig | 机器人类型 |
| NRC_SetRobotDHConfig / NRC_GetRobotDHConfig | DH 参数 |
| NRC_SetRobotJointConfig | 关节参数 |
| NRC_SetRobotDecareConfig / NRC_GetRobotDecareConfig | 笛卡尔参数 |
| NRC_CalcConfiguration | 计算机器人形态 |
| NRC_GetRobotAxisSum | 获取机器人轴数 |
| NRC_GetSyncAxisSum | 获取外部轴轴数 |
| NRC_SetRobotRangeLimit / NRC_GetRobotRangeLimit | 范围限制 |

### 学习前提

- C++ 语言基础
- Linux 系统（Ubuntu）基本使用
- 工业机器人基础知识
- Eclipse / VS Code / Vim 等编辑器使用
