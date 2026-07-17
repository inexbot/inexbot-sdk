# Host Computer

libnrc_host is a C++ library built on top of the Socket_API communication protocol, providing network interfaces for host computers to quickly integrate controller functionality. It supports Linux/Windows multi-platform deployment and multiple high-level languages.

## Technical Specifications

| Item | Description |
|------|------|
| System Support | Windows, Linux; x86, x86_64, arm, arm64 |
| Ports | 6000: Control/Query; 6001: Teach Programming; 7000: Servo Tracking Data |
| API Documentation | https://doc.hmilib.inexbot.coision.cn/nrc__interface_8h.html |

## Document Structure

```
Host-Computer
├── Python/
│   ├── Getting-Started/         Build Python projects from scratch
│   └── API-Examples/
│       ├── Basic/       Connection, single-point motion, continuous trajectory, tool calibration, drag teaching
│       └── Advanced/      servo_move tracking, message callbacks
├── C++/
│   ├── Getting-Started/         MinGW+Qt / MSVC / Linux environment initialization
│   ├── API-Examples/
│   │   ├── Basic/       Coordinate positions, single-point/continuous trajectory, teach/drag, tool calibration, curve motion
│   │   └── Advanced/       servoJ joint control, servo_move tracking, servo point position control
│   └── API-Reference.md         API online documentation link
└── C#/
    ├── Getting-Started/         Windows Forms application initialization
    └── API-Examples/            Connection examples
```

## Language Comparison

| Language | Use Case | Compiler/Framework | Characteristics |
|------|----------|-------------|------|
| Python | Rapid prototyping, scripting | Python 3.x (must match SDK version) | Glue language, suitable for integration testing |
| C++ | High performance, real-time control | MSVC 2017+, MinGW64, gcc aarch64 | Highest performance, suitable for production integration |
| C# | Windows desktop applications | .NET Framework 4.8, .NET 8 | WinForms/WPF, convenient desktop integration |

## SDK Download

Visit the Downloads page to obtain the host computer SDK packages for your target platform and language.
