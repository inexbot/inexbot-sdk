# 基础应用

Python SDK 基础接口示例，演示连接控制器、读取状态、处理错误回调等常用操作。

## 示例列表

| 示例 | 说明 |
|------|------|
| [连接控制器与错误回调](./01.设置接收到错误消息时的回调.md) | 建立 6001 端口连接、获取连接状态、注册错误/警告回调 |

## 关键知识点

- **连接流程：** `connect_robot()` → 等待 `get_connection_status() == SUCCESS` → 开始操作
- **Python 返回值：** getter 函数返回 `(Result, 数据值)` 元组，如 `get_servo_state(fd, status)` → `(0, 3)`
- **回调函数：** 使用 `set_receive_error_or_warnning_message_callback()` 注册错误处理，回调内不能做耗时操作

[← 返回接口示例](../index.md)
