# Python SDK API 参考

> **Python 接口基于 C++ SDK 通过 SWIG 自动生成**，所有函数名、参数和逻辑与 C++ 版本完全一致。详细参数说明请对照 [C++ API 文档](../../01.C++/02.接口说明.md)。

---

## 导入方式

```python
import nrc_interface as nrc
```

也可直接 `import nrc_interface`，不加别名。纳博特 Python Demo 中常用 `nrc_interface as aa`。

---

## Python 与 C++ 对照

### 类型映射

| C++ 类型 | Python 类型 | 说明 |
|----------|------------|------|
| `SOCKETFD` (int) | int | socket 文件描述符 |
| `Result` (int) | int | 返回状态码，0=成功 |
| `std::string` | str | 字符串 |
| `std::vector<double>` | `VectorDouble` | 须先创建再 append，或传入 list |
| `std::vector<std::vector<double>>` | `VectorVectorDouble` | 二维数组 |
| `std::vector<int>` | `VectorInt` | 整数数组 |
| `std::vector<std::string>` | `VectorString` | 字符串数组 |

### 返回值差异（重要）

C++ 通过引用参数输出数据：
```cpp
int status;
get_servo_state(fd, status);  // status 被填充
```

Python 通过元组同时返回结果码和输出值：
```python
status = 0
result, status = nrc.get_servo_state(fd, status)  # 返回 (结果码, 输出值)
```

> **每次调用 getter 前必须重新初始化变量**，因为 Python 端通过引用修改原始对象的值。

### 结构体

C++ 结构体在 Python 中为同名类，字段名保持一致：

```python
# C++ MoveCmd → Python MoveCmd
cmd = nrc.MoveCmd()
cmd.coord = 0
cmd.velocity = 80
cmd.acc = 100
cmd.targetPosType = nrc.PosType_data
cmd.targetPosValue = pos   # VectorDouble
```

### 枚举常量

通过模块级常量访问：
```python
nrc.PosType_data    # 等同于 C++ 的 PosType::data
nrc.SUCCESS         # 等同于 C++ 的 Result::SUCCESS
```

---

## API 模块速查

所有 C++ 接口均可通过 `nrc_interface.` 直接调用。以下列出主要模块，详细参数说明参见 C++ 文档。

### 连接管理
| 函数 | 说明 | C++ 参考 |
|------|------|---------|
| `connect_robot(ip, port)` → int | 连接控制器 | [C++ connect_robot](../../01.C++/02.接口说明/01.基础连接与系统接口.md) |
| `disconnect_robot(fd)` → Result | 断开连接 | 同上 |
| `get_connection_status(fd)` → Result | 获取连接状态 | 同上 |
| `get_library_version()` → str | 获取 SDK 版本 | 同上 |

### 伺服控制
| 函数 | 说明 | C++ 参考 |
|------|------|---------|
| `clear_error(fd)` → Result | 清错 | 同上 |
| `set_servo_state(fd, state)` → Result | 设置伺服状态 0=停止 1=就绪 | 同上 |
| `get_servo_state(fd, status)` → (Result, int) | 获取伺服状态 | 同上 |
| `set_servo_poweron(fd)` / `poweroff(fd)` → Result | 上电/下电 | 同上 |
| `set_current_mode(fd, mode)` → Result | 0=示教 1=远程 2=运行 | 同上 |
| `get_current_mode(fd, mode)` → (Result, int) | 获取当前模式 | 同上 |
| `set_speed(fd, speed)` → Result | 速度 1~100 | 同上 |
| `get_speed(fd, speed)` → (Result, int) | 获取速度 | 同上 |

### 位置与状态
| 函数 | 说明 | C++ 参考 |
|------|------|---------|
| `get_current_position(fd, coord, pos)` → Result | coord: 0=关节 1=直角 2=工具 3=用户 | 同上 |
| `get_current_extra_position(fd, pos)` → Result | 外部轴位置 | 同上 |
| `get_robot_running_state(fd, status)` → (Result, int) | 0=停止 1=暂停 2=运行 | 同上 |

### 工具手与标定
| 函数 | 说明 | C++ 参考 |
|------|------|---------|
| `get_tool_hand_number(fd, num)` → (Result, int) | 获取工具手编号 | 同上 |
| `get_tool_hand_param(fd, num, param)` → Result | param 为 ToolParam 对象 | 同上 |
| `tool_hand_2_or_20_point_calibrate(fd, ...)` → Result | 2/20 点标定 | 同上 |

### 运动控制
| 函数 | 说明 | C++ 参考 |
|------|------|---------|
| `robot_movej(fd, cmd)` → Result | MoveJ 关节运动 | 同上 |
| `robot_movel(fd, cmd)` → Result | MoveL 直线运动 | 同上 |
| `robot_moves(fd, pos_list, vel, coord, acc, dec)` → Result | 多段直线 | 同上 |
| `robot_start_jogging(fd, axis, positive)` → Result | 开始点动 | 同上 |
| `robot_stop_jogging(fd, axis)` → Result | 停止点动 | 同上 |

### 队列运动
| 函数 | 说明 | C++ 参考 |
|------|------|---------|
| `queue_motion_set_status(fd, enable)` → Result | 开启/关闭队列模式 | [C++ 队列运动](../../01.C++/02.接口说明/08.队列运动模式.md) |
| `queue_motion_push_back_moveJ(fd, cmd)` → Result | 插入 MoveJ 指令 | 同上 |
| `queue_motion_push_back_moveL(fd, cmd)` → Result | 插入 MoveL 指令 | 同上 |
| `queue_motion_send_to_controller(fd, count)` → Result | 发送 count 条指令 | 同上 |
| `queue_motion_clear_Data(fd)` → Result | 清空队列 | 同上 |

### 伺服跟踪 (7000端口)
| 函数 | 说明 | C++ 参考 |
|------|------|---------|
| `servo_move(fd, para)` → Result | 需要单独连接 7000 端口 | 同上 |
| `enable_servo_position_motion_control(fd, enable)` → Result | 使能伺服位置控制 | 同上 |

### 作业文件
| 函数 | 说明 | C++ 参考 |
|------|------|---------|
| `job_run_times(fd, times)` → Result | 0=无限循环 | [C++ 作业文件](../../01.C++/02.接口说明/07.作业文件操作.md) |
| `job_upload_by_file(fd, path)` → Result | 上传作业文件 | 同上 |
| `job_download_by_directory(fd, path)` → Result | 下载作业文件 | 同上 |

### 消息回调
| 函数 | 说明 | C++ 参考 |
|------|------|---------|
| `set_receive_error_or_warnning_message_callback(fd, callback)` → Result | 错误/警告回调 | 同上 |
| `recv_message(fd, callback)` → Result | 消息接收回调 | 同上 |

### IO / 工艺 / Modbus
参见 [C++ IO 控制](../../01.C++/02.接口说明/02.IO控制.md)、[C++ 焊接](../../01.C++/02.接口说明/09.焊接工艺.md) 等，Python 函数名与 C++ 一致。

---

## 完整示例

参见 [Python 接口示例](../03.接口示例/index.md) 和 [渐入式教程](../01.渐入式教程/初始化项目.md)。
