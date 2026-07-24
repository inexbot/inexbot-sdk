# C++

Use C++ language to call SDK interfaces, connect to the controller, and perform motion control.

## Contents

- **Getting Started Tutorial** — Development environment initialization for MinGW+Qt / MSVC / Linux
- **API Examples** — Complete code examples for basic and advanced applications
- **API Reference** — Online API documentation links

## Prerequisites

- Windows: Qt Creator 5.0.2 + Qt 5.12.12 MinGW 64-bit, or Visual Studio 2022 + MSVC
- Linux: gcc, supporting aarch64

## SDK Structure

```
Cpp/
├── include/
│   ├── c_interface/        C interface header files
│   ├── cpp_interface/      C++ interface header files
│   └── parameter/          Parameter definitions
├── linux/
│   └── libnrc_host.so      Linux dynamic library
├── windows/
│   ├── win_mingw64_v2.x.x/  MinGW build kit
│   └── win_msvc2017_x64_v2.x.x/  MSVC build kit
└── Csharp_api/             C# version SDK
```
