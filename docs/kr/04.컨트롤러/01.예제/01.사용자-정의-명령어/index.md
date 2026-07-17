# 사용자 정의 명령어

## 컨트롤러 2차 개발 demo는 관련 다운로드 중 컨트롤러 SDK에서 직접 다운로드할 수 있습니다

## 1. 사용자 정의 명령어에 사용되는 인터페이스 함수 소개

다음 함수들은 모두 SDK의 헤더 파일에 포함되어 있습니다:

```cpp
/**
 * @brief 사용자 정의 작업 파일 명령어 호출을 위한 MOVJ 명령어, 직접 호출 불가
 * @param robotNum 로봇 번호[1-4]
 * @param pos 로봇 운동 목표 위치, 자세한 내용은 NRC_Position 참조
 * @param vel 로봇의 실행 속도, 로봇 최대 속도의 백분율, 매개변수 범위: 0 < vel <= 100
 * @param acc 로봇 실행 가속도, 로봇 각 관절 최대 가속도의 백분율, 매개변수 범위: 0 < vel <= 100
 * @param dec 로봇 실행 감속도, 로봇 각 관절 최대 감속도의 백분율, 매개변수 범위: 0 < vel <= 100
 * @param pl 부드러움 정도, 다음 이동 명령어와 부드럽게 전환됨, 값이 클수록 더 부드럽지만 궤적 편차도 커짐, 매개변수 범위: 0 <= pl <= 5
 * @param moveToNextLine 줄 건너뛰기 여부, 마지막 명령어에서만 moveToNextLine을 true로 설정하면 됨
 */
void NRC_Jobrun_MoveDirect(int robotNum, const NRC_Position & pos, double vel,  double acc, double dec, int pl, bool moveToNextLine = false);


/**
 * @brief 사용자 정의 작업 파일 명령어 호출을 위한 MOVL 명령어, 직접 호출 불가
 * @param robotNum 로봇 번호[1-4]
 * @param pos 로봇 운동 목표 위치, 자세한 내용은 NRC_Position 참조
 * @param vel 로봇의 실행 속도, 로봇 엔드 이펙터 위치의 절대 실행 속도, 단위는 mm/s, 매개변수 범위: vel > 1
 * @param acc 로봇 실행 가속도, 로봇 각 관절 최대 가속도의 백분율, 매개변수 범위: 0 < vel <= 100
 * @param dec 로봇 실행 감속도, 로봇 각 관절 최대 감속도의 백분율, 매개변수 범위: 0 < vel <= 100
 * @param pl 부드러움 정도, 다음 이동 명령어와 부드럽게 전환됨, 값이 클수록 더 부드럽지만 궤적 편차도 커짐, 매개변수 범위: 0 <= pl <= 5
 * @param moveToNextLine 줄 건너뛰기 여부, 마지막 명령어에서만 moveToNextLine을 true로 설정하면 됨
 */
void NRC_Jobrun_MoveLinear(int robotNum, const NRC_Position & pos, double vel, double acc, double dec, int pl, bool moveToNextLine = false);


/**
 * @brief 사용자 정의 작업 파일 명령어 호출을 위한 MOVC 명령어, 직접 호출 불가
 * @param robotNum 로봇 번호[1-4]
 * @param mid_pos,end_pos 로봇 운동 목표 위치, 자세한 내용은 NRC_Position 참조
 * @param vel 로봇의 실행 속도, 로봇 엔드 이펙터 위치의 절대 실행 속도, 단위는 mm/s, 매개변수 범위: vel > 1
 * @param acc 로봇 실행 가속도, 로봇 각 관절 최대 가속도의 백분율, 매개변수 범위: 0 < vel <= 100
 * @param dec 로봇 실행 감속도, 로봇 각 관절 최대 감속도의 백분율, 매개변수 범위: 0 < vel <= 100
 * @param pl 부드러움 정도, 다음 이동 명령어와 부드럽게 전환됨, 값이 클수록 더 부드럽지만 궤적 편차도 커짐, 매개변수 범위: 0 <= pl <= 5
 * @param moveToNextLine 줄 건너뛰기 여부, 마지막 명령어에서만 moveToNextLine을 true로 설정하면 됨
 * @note 주의, MOVC는 첫 번째 명령어로 실행될 수 없으며, 처음 호출할 때 앞에 MOVJ 또는 MOVL 명령어가 반드시 있어야 합니다
 */
void NRC_Jobrun_MoveC(int robotNum, const NRC_Position& mid_pos,const NRC_Position& end_pos, double vel, double acc, double dec, int pl, bool moveToNextLine = false);


/**
 * @brief 사용자 정의 작업 파일 명령어 호출을 위한 MOVS 명령어, 직접 호출 불가
 * @param robotNum 로봇 번호[1-4]
 * @param pos 로봇 운동 목표 위치 컨테이너, 크기는 4 이상이어야 함 (즉 pos.size() >= 4), 위치점 설정 자세한 내용은 NRC_Position 참조
 * @param vel 로봇의 실행 속도, 로봇 엔드 이펙터 위치의 절대 실행 속도, 단위는 mm/s, 매개변수 범위: vel > 1
 * @param acc 로봇 실행 가속도, 로봇 각 관절 최대 가속도의 백분율, 매개변수 범위: 0 < vel <= 100
 * @param dec 로봇 실행 감속도, 로봇 각 관절 최대 감속도의 백분율, 매개변수 범위: 0 < vel <= 100
 * @param pl 부드러움 정도, 다음 이동 명령어와 부드럽게 전환됨, 값이 클수록 더 부드럽지만 궤적 편차도 커짐, 매개변수 범위: 0 <= pl <= 5
 * @param moveToNextLine 줄 건너뛰기 여부, 마지막 명령어에서만 moveToNextLine을 true로 설정하면 됨
 * @note 주의, MOVS는 첫 번째 명령어로 실행될 수 없으며, 처음 호출할 때 앞에 MOVJ 또는 MOVL 명령어가 반드시 있어야 합니다
 */
void NRC_Jobrun_MoveS(int robotNum, int pointNum, const std::vector< NRC_Position>& pos, double vel, double acc, double dec, int pl, bool moveToNextLine = false);


/**
 * @brief 사용자 정의 작업 파일 명령어 호출을 위한 IMOV 명령어, 직접 호출 불가
 * @param robotNum 로봇 번호[1-4]
 * @param pos 로봇 운동 목표 위치 컨테이너, 크기는 4 이상이어야 함 (즉 pos.size() >= 4), 위치점 설정 자세한 내용은 NRC_Position 참조
 * @param vel 로봇의 실행 속도, 로봇 엔드 이펙터 위치의 절대 실행 속도, 단위는 mm/s, 매개변수 범위: vel > 1
 * @param acc 로봇 실행 가속도, 로봇 각 관절 최대 가속도의 백분율, 매개변수 범위: 0 < vel <= 100
 * @param dec 로봇 실행 감속도, 로봇 각 관절 최대 감속도의 백분율, 매개변수 범위: 0 < vel <= 100
 * @param pl 부드러움 정도, 다음 이동 명령어와 부드럽게 전환됨, 값이 클수록 더 부드럽지만 궤적 편차도 커짐, 매개변수 범위: 0 <= pl <= 5
 * @param moveToNextLine 줄 건너뛰기 여부, 마지막 명령어에서만 moveToNextLine을 true로 설정하면 됨
 * @param tm 사전 실행 시간, 범위: [0,999999], 생략 가능, 기본값은 0
 * @note 주의, IMOV는 첫 번째 명령어로 실행될 수 없으며, 그 앞에 운동 관련 명령어가 반드시 있어야 합니다
 */
int NRC_Jobrun_IMOV(int robotNum, const NRC_Position& offset, double vel, double acc, double dec, int pl, int tm = 0, bool moveToNextLine = false);


/**
 * @brief 사용자 정의 작업 파일 명령어 호출을 위한 MOVJEXT 명령어, 직접 호출 불가
 * @param robotNum 로봇 번호[1-4]
 * @param pos 로봇 운동 목표 위치, 자세한 내용은 NRC_Position 참조
 * @param syncPos 로봇 운동 목표 위치, 자세한 내용은 NRC_SyncPosition 참조
 * @param vel 로봇의 실행 속도, 로봇 최대 속도의 백분율, 매개변수 범위: 0 < vel <= 100
 * @param acc 로봇 실행 가속도, 로봇 각 관절 최대 가속도의 백분율, 매개변수 범위: 0 < vel <= 100
 * @param dec 로봇 실행 감속도, 로봇 각 관절 최대 감속도의 백분율, 매개변수 범위: 0 < vel <= 100
 * @param pl 부드러움 정도, 다음 이동 명령어와 부드럽게 전환됨, 값이 클수록 더 부드럽지만 궤적 편차도 커짐, 매개변수 범위: 0 <= pl <= 5
 * @param moveToNextLine 줄 건너뛰기 여부, 마지막 명령어에서만 moveToNextLine을 true로 설정하면 됨
 */
void NRC_Jobrun_MoveDirectSync(int robotNum, const NRC_Position & pos, const NRC_SyncPosition & syncPos, double vel, double acc, double dec, int pl, bool moveToNextLine = false);


/**
 * @brief 사용자 정의 작업 파일 명령어 호출을 위한 MOVLEXT 명령어, 직접 호출 불가
 * @param robotNum 로봇 번호[1-4]
 * @param pos 로봇 운동 목표 위치, 자세한 내용은 NRC_Position 참조
 * @param syncPos 로봇 운동 목표 위치, 자세한 내용은 NRC_SyncPosition 참조
 * @param vel 로봇의 실행 속도, 로봇 엔드 이펙터 위치의 절대 실행 속도, 단위는 mm/s, 매개변수 범위: vel > 1
 * @param acc 로봇 실행 가속도, 로봇 각 관절 최대 가속도의 백분율, 매개변수 범위: 0 < vel <= 100
 * @param dec 로봇 실행 감속도, 로봇 각 관절 최대 감속도의 백분율, 매개변수 범위: 0 < vel <= 100
 * @param pl 부드러움 정도, 다음 이동 명령어와 부드럽게 전환됨, 값이 클수록 더 부드럽지만 궤적 편차도 커짐, 매개변수 범위: 0 <= pl <= 5
 * @param moveToNextLine 줄 건너뛰기 여부, 마지막 명령어에서만 moveToNextLine을 true로 설정하면 됨
 * @param sync 협동 여부
 */
void NRC_Jobrun_MoveLinearSync(int robotNum, const NRC_Position & pos, const NRC_SyncPosition & syncPos, double vel, double acc, double dec, int pl, int sync, bool moveToNextLine = false);
```
## 2. 사용자 정의 명령어 함수 사용 예시

![사용자 정의 명령어 사용 예시 전체 흐름도](assets/zd-01.svg)
```cpp
#include "nrcAPI.h"
#include "nrcAPI_advance.h"
#include "json/json.h"
#include <atomic>
#include <chrono>
#include <cstdlib>
#include <iostream>
#include <mutex>
#include <sstream>
#include <stdio.h>
#include <string>
#include <thread>
#include <unistd.h>
#include <vector>
#include <functional>
#include <cstdint>
#include <cstring>
#include <fstream>




using namespace std;


bool test_cmd(int line, const std::string &paramStr, const std::string &posName) {
  int robotNum = 1;             //로봇 1
  NRC_Position pos1 = {NRC_ACS, 40, 0, 0, 0, 0, 0};
  NRC_Position pos2 = {NRC_ACS, 0, 0, 0, 0, 0, 0};
  NRC_Position pos3 = {NRC_ACS, -40, 0, 0, 0, 0, 0};       //로봇 실행 목표 위치점
  NRC_Jobrun_MoveDirect(robotNum, pos1, 50, 80, 80, 5);
  NRC_Jobrun_MoveDirect(robotNum, pos2, 50, 80, 80, 5);
  NRC_Jobrun_MoveDirect(robotNum, pos3, 50, 80, 80, 5, true);    //마지막에 줄 건너뛰기가 필요할 때 moveToNextLine에 true 전달
}


int main() {
  // Nexmotion 라이브러리 버전 정보 출력
  std::cout << "라이브러리 버전：" << NRC_GetNexMotionLibVersion() << std::endl;


  // 제어 시스템 시작
  NRC_StartController();


  // 시스템 초기화 완료 대기
  while (NRC_GetControlInitComplete() != 1 )
  {
    NRC_Delayms(100);
  }
  NRC_ClearServoError();
  NRC_SetServoReadyStatus(1);
  NRC_Delayms(2000);
  NRC_SetJobFileCustomInstructionCB(test_cmd);     //사용자 정의 명령어 콜백 함수 등록
  while (1) //2차 개발 프로그램 계속 실행 유지
  {
    NRC_Delayms(1000);
  }
}
```

![사용자 정의 명령어 함수 코드 예시의 프로그램 실행 흐름도](assets/zd-02.svg)

## 3. 사용자 정의 명령어 실행하기

사용자 정의 명령어는 2차 개발 티치 펜던트에만 있으며, 사용자는 관련 다운로드에서 해당 티치 펜던트 2차 개발을 다운로드할 수 있습니다

![2차 개발 티치 펜던트에서 사용자 정의 명령어가 실행되는 효과](assets/zd-03.svg)
