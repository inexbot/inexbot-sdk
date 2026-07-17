# 프로그램-명령어增删改查

### 명령어삽입

- 설명：
- 在명령어삽입前需要使用0x5100열기프로그램，삽입后需要使用프로그램저장的命令，저장的命令为0x5120
- "cmd":该노드为명령어的具体信息，详情查看명령어页面
- 호스트 컴퓨터下发삽입명령어
**명령어:** `0x5200`
- "robot":1
- 表示要操作的로봇 번호；int유형，값 범위범위[1,4]
- "pos":2
- 表示삽입的줄号；int유형
- "savejobfile":false
- 表示예아니오저장작업 파일；bool유형
- true:저장，false：不저장；
- 当选择false时可以使用0x5120저장작업 파일
- "time":"2024.08.08 14:16:39"
- 表示삽입명령어的时间；string유형
- "cmd":cmd->toJson()

```json
{
  "robot":1,
  "pos":2,
  "savejobfile":false,
  "time":"2024.08.08 14:16:39",
  "cmd":cmd->toJson()
}
```
### 명령어수정

- 表示삽입的명령어详情，见子页面；object유형
- 설명：
- 在명령어수정后선택择使用프로그램저장的命令，저장的命令为0x5120
- 호스트 컴퓨터下发，수정명령어
**명령어:** `0x5201`
- "robot":1
- 表示要조회的로봇 번호；int유형，값 범위범위[1,4]
- "pos":[2,3,4]
- 수정명령어인덱스；int유형배열
- "muti":true
- bool유형；默认존재并值为true
- "modify_para":{}
- "VJ_ENABLE_":true
- 예아니오수정관절속도；bool유형
- "VJ_VALUE_":"50"
- 관절속도；string유형；[1,100]%
- "V_ENABLE_":true
- 예아니오수정线속도；bool유형
- "V_VALUE_":"50"
- 线속도；string유형；[1,1000]mm/s
- "PL_ENABLE_":true
- 예아니오수정평활；bool유형
- "PL_VALUE_":"3"
- 평활；string유형；값 범위범위[0,5]
- "ACC_ENABLE_":true
- 예아니오수정가속도；bool유형
- "ACC_VALUE_":"50"
- 가속도；string유형；값 범위범위[1,100]
- "DEC_ENABLE_":true
- 예아니오수정감속도；bool유형
- "DEC_VALUE_":"50"
- 감속도；string유형；값 범위범위[1,100]
- "TEC_TYPE_":1
- 매개변수；int유형；값 범위범위[0,10]
- 0:网络通信클래스；1：팔레타이징제어클래스；2：비전命令클래스；3：레이저클래스；4：컨베이어클래스
- 5：그라인딩프로세스클래스；6：용접매개변수；7：위빙매개변수；8：相贯线；9：寻件文件号；10：추적文件号
- "TEC_ENABLE_":true
- 예아니오수정相关유형프로세스号；bool유형
- "TEC_VALUE_":"5"
- 相关유형프로세스号；string유형；값 범위범위与相关유형有关
- "savejobfile":false
- 예아니오저장文件；bool유형
- true저장，false不저장
- 当选择false时可以使用0x5120저장작업 파일
- "time":"2020.02.26 10:11:06"

```json
{
    "robot": 1,
    "pos": [2,3,4],
    "modify_para":
    {
        "VJ_ENABLE_":true,
        "VJ_VALUE_":"50",
        "V_ENABLE_":true,
        "V_VALUE_":"50",
        "PL_ENABLE_":true,
        "PL_VALUE_":"3",
        "ACC_ENABLE_":true,
        "ACC_VALUE_":"50",
        "DEC_ENABLE_":true,
        "DEC_VALUE_":"50",
        "TEC_TYPE_":1,
        "TEC_ENABLE_":true,
        "TEC_VALUE_":"5"
    }
    "savejobfile": false,
    "time": "2024.11.06 09:56:28"
}
```
### 삭제명령어

- 타임스탬프；string유형
- 설명：
- 在명령어삭제后需要使用프로그램저장的命令，저장的命令为0x5120
- "cmd":该노드为명령어的具体信息，详情查看명령어页面
- 호스트 컴퓨터下发，삭제명령어
**명령어:** `0x5202`
- "pos":1
- 수정명령어인덱스；int유형
- "robot":1
- 表示要조회的로봇 번호；int유형，값 범위범위[1,4]
- "time":"2020.02.26 10:11:06"
- 타임스탬프；string유형
- "savejobfile":false
- 예아니오저장文件；bool유형

```json
{
    "pos": 5,
    "robot": 1,
    "time": "2024.11.06 09:56:28",
    "savejobfile": false
}
```
### 주석명령어

- true저장，false不저장
- 当选择false时可以使用0x5120저장작업 파일
- 설명：
- 当"store"和"savejobfile"都为true时直接저장현재
- 호스트 컴퓨터下发，주석명령어
**명령어:** `0x5203`
- "logout_rows":[1,2,3]
- 수정명령어인덱스；int유형배열
- "robot":1
- 表示要조회的로봇 번호；int유형，값 범위범위[1,4]
- "store":true
- 예아니오存储현재수정
- 当"store"존재，并且值为true时존재"time","savejobfile"노드
- "time":"2020.02.26 10:11:06"
- 타임스탬프；string유형
- "savejobfile":false
- 예아니오저장文件；bool유형

```json
{
    "logout_rows":[1,2,3],
    "robot": 1,
    "store":true,
    "time": "2024.11.06 09:56:28",
    "savejobfile": false
}
```
### 外部按键삭제명령어信息

- true저장，false不저장
- 当选择false时可以使用0x5120저장작업 파일
- 컨트롤러 응답티치 펜던트外部按键삭제명령어信息
**명령어:** `0x5208`
- "jobName":""
- string유형，需要삭제명령어的작업이름
- "pos":10
- int유형，需要삭제的명령어위치
- "clearAll":false

```json
{
    "jobName":"",
    "pos":10,
    "clearAll":false
}
```
- bool유형，예아니오삭제전체작업명령어
```