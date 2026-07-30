# C# API 参考

C# SDK 基于 SWIG 从 C++ 头文件自动生成，所有接口签名和参数与 C++ 一致。

## 主要类

| 类 | 说明 |
|-----|------|
| `nrc_interface` | 主接口类，包含所有 SDK 方法（静态） |
| `MoveCmd` | 运动指令参数 |
| `ServoMovePara` | 伺服运动参数 |
| `ToolParam` | 工具手参数 |
| `RobotDHParam` | DH 参数 |

## C++ 对照

详细参数说明请参见 [C++ API 文档](../../01.C++/02.接口/index.md)，C# 函数名与 C++ 完全相同。
