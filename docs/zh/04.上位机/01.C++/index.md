# C++ 上位机开发

使用 C++ 语言调用 SDK 接口连接控制器，进行运动控制、状态读取和工艺编程。

---

## 快速开始

根据你的开发环境选择对应教程：

| 环境 | 工具链 | 教程入口 |
|------|--------|---------|
| Windows | MinGW + Qt Creator | [MinGW + Qt 初始化项目](./01.渐入式教程/01.MinGW环境.md) |
| Windows | MSVC + Visual Studio | [MSVC 初始化项目](./01.渐入式教程/02.MSVC环境.md) |
| Linux | GCC | [Linux 初始化项目](./01.渐入式教程/03.Linux环境.md) |

> **重要提醒：** SDK 与编译器的 ABI 必须匹配。不同编译器、架构、配置生成的库**不能混用**。详见[版本与兼容性](../../版本与兼容性.md)。

---

## 内容导航

### [渐入式教程](./01.渐入式教程/index.md)
从零搭建项目环境，完成首次连接验证。提供 MinGW、MSVC、Linux 三套独立流程。

### [接口示例](./03.接口示例/index.md)
- **基础应用** — 单点运动、连续轨迹、坐标系获取、示教回放、工具标定、曲线运动
- **进阶应用** — `servo_move` 跟踪运动、伺服控制、关节控制

### [接口说明](./02.接口说明.md)
C++ SDK API 在线文档链接。

---

## SDK 结构

```text
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

---

## 相关资源

- [下载 SDK](../../12.相关下载.md)
- [版本与兼容性](../../版本与兼容性.md)
- [常见问题](../../11.常见问题.md)
