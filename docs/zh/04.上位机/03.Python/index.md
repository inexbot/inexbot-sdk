# Python

使用 Python 语言调用 SDK 接口连接控制器。

> **Python SDK 基于 C++ SDK 通过 SWIG 自动生成**，所有函数名、参数和逻辑与 C++ 版本一致。API 详细说明参见 [API 参考](./02.接口说明/index.md)，参数含义可对照 [C++ API 文档](../01.C++/02.接口说明.md)。

## 系统要求

- **Python 版本：** 3.x（具体小版本请对照 SDK 包说明，版本不匹配会导致 `_nrc_host.so` 无法加载）
- **操作系统：** Windows x64 / Linux x64
- **依赖：** SDK 包中的 `_nrc_host.so` 及 `nrc_interface.py`

## 内容

- [渐入式教程](./01.渐入式教程/index.md) — 从零搭建 Python 项目，完成首次连接和状态读取
- [API 参考](./02.接口说明/index.md) — Python API 速查、类型映射与 C++ 对照
- [接口示例](./03.接口示例/index.md) — 连接、运动控制、servo_move 跟踪的完整代码示例
