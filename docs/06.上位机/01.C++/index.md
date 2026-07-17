# C++

使用 C++ 语言调用 SDK 接口连接控制器，进行运动控制。

## 内容

- **渐入式教程** — MinGW+Qt / MSVC / Linux 三种开发环境初始化
- **接口示例** — 基础应用、进阶应用完整代码示例
- **接口说明** — API 在线文档链接

## 前提条件

- Windows：Qt Creator 5.0.2 + Qt 5.12.12 MinGW 64-bit，或 Visual Studio 2022 + MSVC
- Linux：gcc，支持 aarch64

## SDK 结构

```
Cpp/
├── include/
│   ├── c_interface/        C 接口头文件
│   ├── cpp_interface/      C++ 接口头文件
│   └── parameter/          参数定义
├── linux/
│   └── libnrc_host.so       Linux 动态库
├── windows/
│   ├── win_mingw64_v2.x.x/  MinGW 编译套件
│   └── win_msvc2017_x64_v2.x.x/  MSVC 编译套件
└── Csharp_api/             C# 版本 SDK
```
