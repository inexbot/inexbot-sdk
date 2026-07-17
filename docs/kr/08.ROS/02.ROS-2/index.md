# ROS 2

## 소개

ROS 2(Robot Operating System 2)는 차세대 로봇 운영체제로, ROS 1의 핵심 설계를 계승하면서 현대 로봇의 요구사항에 맞춰 전면 업그레이드되었습니다. ROS 2는 실시간성, 분산 컴퓨팅, 크로스 플랫폼 지원 및 프로덕션급 응용에 중점을 두며, 자율주행, 산업용 로봇, 드론 및 지능형 서비스 로봇 등 다양한 분야에서 널리 사용됩니다.

## 핵심 기능

- **실시간성 및 신뢰성**: DDS(Data Distribution Service)를 기본 통신 메커니즘으로 사용, QoS(Quality of Service) 구성 지원, 높은 실시간성 요구 충족;
- **멀티 플랫폼 지원**: Linux, Windows, macOS 및 RTOS(FreeRTOS 등) 호환, Raspberry Pi, NVIDIA Jetson 등 임베디드 장치 지원;
- **분산 아키텍처**: 멀티 로봇 협업 최적화, MicroROS 지원, 대규모 로봇 클러스터에 적합;
- **현대적 설계**: 개선된 API, 더 안전한 통신(암호화 지원), 더 유연한 빌드 시스템(ament 및 colcon 기반);
- **시뮬레이션 및 개발 도구**: Gazebo, Rviz2, rqt 등 도구 통합, ROS 1 브릿지 지원으로 기존 프로젝트 마이그레이션 용이.

## 버전 및 생태계

현재 주요 버전:

- **Humble Hawksbill**(LTS, 장기 지원 버전, 권장);
- **Iron Irwini**;
- **Rolling**(최신 기능, 불안정).

커뮤니티에서 Navigation2, MoveIt 2 등 풍부한 기능 패키지를 제공하여 로봇 기술의 빠른 발전을 촉진합니다. ROS 2는 학술 연구부터 상용화까지 전 분야의 요구에 적합합니다.
