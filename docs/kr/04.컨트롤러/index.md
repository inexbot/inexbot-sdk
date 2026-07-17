# 컨트롤러 2차 개발

## 소개

컨트롤러 2차 개발은 컨트롤러에서 제공하는 인터페이스를 기반으로 한 2차 개발입니다. 프로그램은 컨트롤러 내부에서 실행되며 전용 공정 개발에 적합합니다.

## 문서 구조

```
컨트롤러
├── 빠른 시작                    # 환경 구축, 프로젝트 빌드, 프로그램 배포
├── 2차 개발 API (로봇 기본 매개변수 설정)   # 시스템/서보/좌표계/IO/변수 등 핵심 인터페이스
├── 2차 개발 API (작업 파일, 명령어 조작)   # 작업 파일 관리, 명령어 삽입, 큐 실행
├── 2차 개발 API (팔레타이징 공정)            # 팔레타이징 공정 매개변수 설정 및 제어
└── 예제
    ├── 사용자 정의 명령어
    │   ├── 컨트롤러 구현                  # 컨트롤러 측 사용자 정의 명령어 개발
    │   └── 티치 펜던트 구현                  # 티치 펜던트 측 사용자 정의 UI 개발
    └── 사용자 정의 명령어 demo.md              # 예제 다운로드 설명
```

## 함수 인덱스

### 시스템 및 초기화

|| 함수 | 설명 |
||------|------|
|| NRC_StartController | 컨트롤러 시작 |
|| NRC_GetControlInitComplete | 초기화 완료 대기 |
|| NRC_SetOperationMode | 작동 모드 설정 (티치 0 / 원격 1 / 실행 2) |
|| NRC_RebootController | 컨트롤러 재시작 |
|| NRC_RestoreFactorySettings | 공장 초기 설정 복원 |
|| NRC_ModifyControllerIP | 컨트롤러 IP 수정 |
|| NRC_ShieldedTeachingPendant | 티치 펜던트 연결 감지 비활성화 (시작 전에 호출 필요) |
|| NRC_GetRobotSum | 로봇 수량 가져오기 |
|| NRC_SetRobotMode | 다중 로봇 모드 설정 |
|| NRC_Delayms | 지연 (밀리초) |
|| NRC_LogInfo | 로그 출력 |
|| NRC_GetNexMotionLibVersion | 라이브러리 버전 가져오기 |
|| NRC_GetSyncVersion | 동기화 버전 번호 가져오기 |

### 서보 제어

|| 함수 | 설명 |
||------|------|
|| NRC_PowerOn / NRC_PowerOff | 서보 인에이블/디스에이블 |
|| NRC_ServoEnable / NRC_ServoDisable | 티치 모드 인에이블/디스에이블 (deadman 눌러야 함) |
|| NRC_SetServoReadyStatus | 서보 준비 상태 전환 |
|| NRC_GetServoStatus | 서보 상태 가져오기 (0-금지 1-준비 2-경보 3-허용) |
|| NRC_GetPowerOffSaveSignal | 전원 상태 가져오기 |
|| NRC_ClearServoError / NRC_ClearAllError | 서보/전체 오류 클리어 |

### 모션 제어

|| 함수 | 설명 |
||------|------|
|| NRC_RobotMoveJoint | 로봇 포인트 투 포인트 이동 |
|| NRC_RobotMoveJointSync | 로봇 외부축 포인트 투 포인트 이동 |
|| NRC_RobotMoveLineSync | 로봇 직선 이동 (본체 + 외부축) |
|| NRC_JogMove / NRC_JogMoveStop / NRC_JogMoveStopAll | 조그 제어 |
|| NRC_StartResetPoint | 리셋 포인트 복귀 |
|| NRC_SetTargetVelocity | 목표 속도 설정 (PV 모드) |
|| NRC_PosReachable | 포인트 도달 가능 여부 판정 |

### 속도 제어

|| 함수 | 설명 |
||------|------|
|| NRC_SetTeachRunSpeedPer / NRC_GetTeachRunSpeedPer | 티치 속도 백분율 |
|| NRC_SetAutoRunSpeedPer / NRC_GetAutoRunSpeedPer | 자동 속도 백분율 |
|| NRC_SetTeachMaxStepSpeed / NRC_GetTeachMaxStepSpeed | 티치 최대 단步 속도 |
|| NRC_GetAngularVel | 관절 각속도 가져오기 (rad/s) |
|| NRC_GetLinerVel | 선속도 가져오기 (mm/s) |
|| NRC_GetAxisVelSync | 외부축 속도 가져오기 |

### 조그 설정

|| 함수 | 설명 |
||------|------|
|| NRC_SetJogJointSpeedConfig / NRC_GetJogJointSpeedConfig | 조그 관절 속도 |
|| NRC_SetJogRectangularSpeedConfig / NRC_GetJogRectangularSpeedConfig | 조그 직교 속도 |
|| NRC_SetJogSensitivitySpeedConfig | 조그 감도 |
|| NRC_SetJogMoveCalculateNum | 조그 보간 포인트 수 |

### 좌표계 및 캘리브레이션

|| 함수 | 설명 |
||------|------|
|| NRC_SetCurrentCoord / NRC_GetCurrentCoord | 현재 좌표계 전환/가져오기 |
|| NRC_PositionACStoMCS / NRC_PositionMCStoACS | 관절 ↔ 직교 좌표 변환 |
|| NRC_TcpCalculate | TCP 고정 거리 오프셋 계산 |

**툴 핸드:**

|| 함수 | 설명 |
||------|------|
|| NRC_SetToolCoordParm / NRC_GetToolCoordParm | 툴 핸드 매개변수 설정/가져오기 |
|| NRC_CalibrationToolCoord_7Pos | 7점/6점 캘리브레이션 |
|| NRC_CalibrationToolCoord_2Pos_SetPos / _Cacl / _Save | 2점 캘리브레이션 (3단계) |
|| NRC_SwitchToolCoord / NRC_GetCurrentToolCoord | 툴 핸드 전환/가져오기 |

**사용자 좌표:**

|| 함수 | 설명 |
||------|------|
|| NRC_SetUserCoordParm / NRC_GetUserCoordParm | 사용자 좌표 매개변수 설정/가져오기 |
|| NRC_CalibrationUserCoord | 사용자 좌표 캘리브레이션 (3점법) |
|| NRC_SwitchUserCoord / NRC_GetCurrentUserCoord | 사용자 좌표 전환/가져오기 |

### 위치 및 영점

|| 함수 | 설명 |
||------|------|
|| NRC_GetCurrentPos / NRC_Rbt_GetCurrentPos | 현재 위치 가져오기 |
|| NRC_GetOtherToolPos | 다른 툴 좌표계의 위치 가져오기 |
|| NRC_GetEncoderPosition | 엔코더 위치 가져오기 |
|| NRC_SetCurrentPosToZeroPos / NRC_Rbt_SetCurrentPosToZeroPos | 영점 설정 / 다회전 값 클리어 |
|| NRC_Rbt_SetSingleCircleValue / NRC_Rbt_GetSingleCircleValue | 단회전 값 설정/가져오기 |

### 외부축

|| 함수 | 설명 |
||------|------|
|| NRC_SetSyncJointNum | 외부축 수량 설정 |
|| NRC_SetSyncJointPara / NRC_GetSyncJointPara | 외부축 매개변수 설정/가져오기 |
|| NRC_SetSyncGroupCarbinarion / NRC_CalSyncCalibrationResult | 외부축 캘리브레이션 |
|| NRC_SetCurrentSyncPosToZeroPos | 외부축 영점 설정 |
|| NRC_SingleSyncAxisMoveJConstVel_For_CustomInstructionCB | 외부축 정속 이동 |
|| NRC_GetCurrentSyncPos / NRC_Rbt_GetCurrentSyncPos | 외부축 위치 가져오기 |

### 토크 및 동역학

|| 함수 | 설명 |
||------|------|
|| NRC_SetTargetTorque / NRC_GetActualTorque | 토크 설정/가져오기 |
|| NRC_GetActualCurrent / NRC_GetMaxCurrent | 전류 제어 |
|| NRC_GetRatedTorque / NRC_GetTorq | 정격 토크 |
|| NRC_SetIdentityParam | 동역학 식별 매개변수 설정 |
|| NRC_RunSafeCheckProgram / NRC_RunIdentifyProgram | 안전 검사 / 동역학 식별 |
|| NRC_SetCollisionParam / NRC_SetCollisionSwitch | 충돌 감지 |

### 작업 파일 조작

|| 함수 | 설명 |
||------|------|
|| NRC_CreateJobfile / NRC_OpenJobfile / NRC_DeleteJobfile | 작업 파일 CRUD |
|| NRC_JudgeJobIsExist | 작업 파일 존재 여부 판정 |
|| NRC_GetJobfileLineSum | 작업 파일 총 라인 수 가져오기 |
|| NRC_StartRunJobfile / NRC_PauseRunJobfile / NRC_StopRunJobfile | 실행 / 일시정지 / 중지 |
|| NRC_StepRunJobfile | 단步 실행 |
|| NRC_StopRunJobfileNotPoweroff | 중지 (디스에이블 안 함) |

**작업 파일 명령어 삽입:**

|| 함수 | 설명 |
||------|------|
|| NRC_JobfileInsertMOVJ / MOVL / MOVS / MOVC / IMOV | 모션 명령어 삽입 |
|| NRC_JobfileInsertMOVJEXT / MOVLEXT / MOVCEXT | 외부축 포함 모션 명령어 삽입 |
|| NRC_JobfileInsertDOUT / WAIT / TIMER / UNTIL | IO / 대기 명령어 삽입 |
|| NRC_JobfileInsertIF / VarIF / ELSE / ENDIF | 조건 판단 삽입 |
|| NRC_JobfileInsertWHILE / VarWHILE / ENDWHILE | 루프 삽입 |
|| NRC_JobfileInsertSETVAR / OPCmd | 변수 조작 삽입 |
|| NRC_JobfileInsertPALON / PALOFF / PALGRIPPER ... | 팔레타이징 명령어 삽입 |
|| NRC_JobfileInsertARCON / ARCOFF | 용접 명령어 삽입 |
|| NRC_JobfileInsertCustomInstruction | 사용자 정의 명령어 삽입 |
|| NRC_JobfileInsertPOSCALALL | 포인트 전체 변경 명령어 삽입 |

### 무파일 실행 큐

|| 함수 | 설명 |
||------|------|
|| NRC_CreateNoFlieRunqueue | 무파일 큐 생성 |
|| NRC_InsertNoFlieRunqueue | 명령어 그룹 삽입 |
|| NRC_StartRunNoFlieRunqueue / Pause / Stop | 실행 / 일시정지 / 중지 |
|| NRC_RunqueueInsertMOVJ / MOVL / ... | 다양한 명령어 삽입 (작업 파일과 동일) |

### 추가 실행 모드

|| 함수 | 설명 |
||------|------|
|| NRC_OpenInstrAppendRunMode / NRC_CloseInstrAppendRunMode | 추가 모드 열기/닫기 |
|| NRC_AppendRunInstr | 추가 실행 명령어 |
|| NRC_PauseInstrAppendRun / NRC_RestartInstrAppendRun | 일시정지 / 재시작 |
|| NRC_StopInstrAppendRun / NRC_StopInstrAppendRunNotPoweroff | 중지 (디스에이블 여부) |
|| NRC_GetIsInstrAppendRunMode | 추가 모드 여부 |
|| NRC_GetRestAppendInstrNum | 남은 명령어 수 |

### 로컬 백그라운드 프로그램

|| 함수 | 설명 |
||------|------|
|| NRC_CreatePthreadJobfile / NRC_OpenPthreadJobfile | 새 백그라운드 프로그램 / 열기 |
|| NRC_DeletePthreadJobfile / NRC_JudgePthreadJobIsExist | 삭제 / 판정 |
|| NRC_JobfileInsertPthreadStart / PthreadEnd | 시작 / 종료 명령어 삽입 |

### 콜백 함수

|| 함수 | 설명 |
||------|------|
|| NRC_SetCompleteOneInstrCallBack | 명령어 완료 콜백 설정 |
|| NRC_SetJobFileCustomInstructionCB | 사용자 정의 명령어 콜백 설정 |
|| NRC_SetMsgHappenCallback | 메시지 콜백 설정 |
|| NRC_SetSocketCustomProtocalCB | TCP 프로토콜 콜백 설정 |
|| NRC_SetFaultResetCB | 오류 클리어 키 콜백 설정 |
|| NRC_robotRunCycle_Callback | 통신 주기 콜백 설정 (1ms) |

### IO 제어

|| 함수 | 설명 |
||------|------|
|| NRC_DigOut / NRC_DigOutByBoard | 디지털 출력 |
|| NRC_ReadDigOut / NRC_ReadDigOutByBoard | 디지털 출력 읽기 |
|| NRC_ReadDigIn / NRC_ReadDigInByBoard | 디지털 입력 읽기 |
|| NRC_AnaOut / NRC_ReadAnaOut / NRC_ReadAnaIn | 아날로그 IO |

### 통신 인터페이스

|| 함수 | 설명 |
||------|------|
|| NRC_SetCANBaudRate / NRC_SendCANData | CAN 통신 |
|| NRC_SetCommunicationParam / NRC_SetCommunicationStatus | TCP 통신 매개변수 |
|| NRC_SetTcpMessageCallback | TCP 메시지 콜백 |
|| NRC_CommSendMessage | TCP 메시지 전송 |
|| NRC_GetModbusSlaveConnectStatus / NRC_GetModbusMasterConnectStatus | Modbus 상태 |
|| NRC_SetSocketCustomProtocalCB / NRC_SendSocketCustomProtocal | 사용자 정의 Socket 프로토콜 |

### 메시지 및 오류

|| 함수 | 설명 |
||------|------|
|| NRC_SetMsgHappenCallback | 메시지 발생 콜백 |
|| NRC_FirstMessagePop / NRC_LastMessagePop | 첫/마지막 메시지 팝업 |
|| NRC_GetMessage / NRC_GetMessageSize | 메시지 가져오기 |
|| NRC_ClearMessage | 메시지 큐 클리어 |
|| NRC_TriggerErrorReport | 능동적으로 오류 보고 트리거 |

### 변수 관리

|| 함수 | 설명 |
||------|------|
|| NRC_SetBoolVar / NRC_ReadBoolVar | BOOL 변수 |
|| NRC_SetIntVar / NRC_ReadIntVar | INT 변수 |
|| NRC_SetDoubleVar / NRC_ReadDoubleVar | DOUBLE 변수 |
|| NRC_SetGlobalPositionVariable / NRC_GetGlobalPositionVariable | 전역 위치 변수 |
|| NRC_SetGlobalPositionVariableNote / NRC_GetGlobalPositionVariableNote | 전역 위치 변수 주석 |
|| NRC_GetCurrentTime | 현재 시간 가져오기 |

### 팔레타이징 공정

|| 함수 | 설명 |
||------|------|
|| NRC_Pallet_SetUsePalletType / NRC_Pallet_GetUsePalletType | 간이/완전 팔레타이징 |
|| NRC_Pallet_SetGripperParm / NRC_Pallet_GetGripperParm | 그리퍼 매개변수 |
|| NRC_Pallet_SetSimplePosParm / NRC_Pallet_GetSimplePosParm | 위치 매개변수 |
|| NRC_Pallet_SetSimpleNumParm / NRC_Pallet_GetSimpleNumParm | 수량 매개변수 |
|| NRC_Pallet_ClearCurrentStatus | 팔레타이징 상태 클리어 |
|| NRC_Pallet_SetPalletedWpNum / NRC_Pallet_GetPalletedWpNum | 팔레타이즈된 작업물 수 |

### 모션 상태 조회

|| 함수 | 설명 |
||------|------|
|| NRC_GetProgramRunStatus | 프로그램 실행 상태 (0-중지 1-일시정지 2-실행) |
|| NRC_GetRobotRunStatus | 로봇 모션 상태 (0-중지 1-모션) |
|| NRC_GetTeachBoxConnectStatus | 티치 박스 연결 상태 |
|| NRC_GetCurrentOrderRuns | 프로그램 실행 방향 (순방향/역방향) |
|| NRC_GetCycleIndex / NRC_GetCycleCount / NRC_GetCycleTimeSec | 사이클 횟수 / 시간 |
|| NRC_GetDistanceToOldTrack | 원 궤적 정지점까지 거리 |
|| NRC_GetRunqueueCurrentRunLine / NRC_GetJobfileCurrentRunLine | 현재 실행 라인 번호 |

### 모션 보조

|| 함수 | 설명 |
||------|------|
|| NRC_SetTargetPosition | 로봇 목표 위치 설정 |
|| NRC_GetPlanningPosition | 계획 큐의 첫 번째 포인트 가져오기 |
|| NRC_PV_SetTargetVelocity / NRC_PV_SetTargetAccAndDec | PV 모드 속도/가속도 |
|| NRC_SetInterpolationMethod | 보간 방식 설정 (S형/사다리꼴) |
|| NRC_SetAbsolutePosResolution | 절대 위치 분해능 |

### 로봇 매개변수

|| 함수 | 설명 |
||------|------|
|| NRC_SetRobotTypeConfig / NRC_GetRobotTypeConfig | 로봇 타입 |
|| NRC_SetRobotDHConfig / NRC_GetRobotDHConfig | DH 매개변수 |
|| NRC_SetRobotJointConfig | 관절 매개변수 |
|| NRC_SetRobotDecareConfig / NRC_GetRobotDecareConfig | 데카르트 매개변수 |
|| NRC_CalcConfiguration | 로봇 형상 계산 |
|| NRC_GetRobotAxisSum | 로봇 축 수 가져오기 |
|| NRC_GetSyncAxisSum | 외부축 축 수 가져오기 |
|| NRC_SetRobotRangeLimit / NRC_GetRobotRangeLimit | 범위 제한 |

### 학습 전제 조건

- C++ 언어 기초
- Linux 시스템 (Ubuntu) 기본 사용법
- 산업용 로봇 기초 지식
- Eclipse / VS Code / Vim 등 편집기 사용법