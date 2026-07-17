# C++

C++ 언어로 SDK 인터페이스를 호출하여 컨트롤러에 연결하고 모션 제어를 수행합니다.

## 내용

- **시작하기** — MinGW+Qt / MSVC / Linux 세 가지 개발 환경 초기화
- **API 예제** — 기본 응용, 고급 응용 전체 코드 예제
- **API 참조** — API 온라인 문서 링크

## 사전 조건

- Windows: Qt Creator 5.0.2 + Qt 5.12.12 MinGW 64-bit, 또는 Visual Studio 2022 + MSVC
- Linux: gcc, aarch64 지원

## SDK 구조

```
Cpp/
├── include/
│   ├── c_interface/        C 인터페이스 헤더 파일
│   ├── cpp_interface/      C++ 인터페이스 헤더 파일
│   └── parameter/          매개변수 정의
├── linux/
│   └── libnrc_host.so       Linux 동적 라이브러리
├── windows/
│   ├── win_mingw64_v2.x.x/  MinGW 컴파일 키트
│   └── win_msvc2017_x64_v2.x.x/  MSVC 컴파일 키트
└── Csharp_api/             C# 버전 SDK
```
