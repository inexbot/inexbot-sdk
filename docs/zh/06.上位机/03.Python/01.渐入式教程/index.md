# 渐入式教程

本教程带你从零搭建 Python 项目环境，连接到控制器，并执行基础运动指令。

### 前提条件

已安装 Python 3.x，且 SDK 版本与 Python 版本匹配。

### 快速开始

#### 1. 准备 SDK 文件

从资源下载页面获取 Python 版本 SDK，解压后得到两个文件：

- `_nrc_host.so` — Python 调用接口的动态库
- `nrc_interface.py` — Python 接口包装模块

将这两个文件放入项目目录。

#### 2. 连接控制器

```py
## -*- coding: UTF-8 -*-
import nrc_interface
import time

socketFd = nrc_interface.connect_robot("192.168.1.16", "6001")
print(socketFd)

if socketFd <= 0:
    import sys
    sys.exit(1)

pos = nrc_interface.VectorDouble(7)
nrc_interface.get_current_position(socketFd, 0, pos)
position = [pos[0], pos[1], pos[2], pos[3], pos[4], pos[5], pos[6]]
pos[0] = pos[0] - 1

nrc_interface.queue_motion_set_status(socketFd, True)
moveCmd = nrc_interface.MoveCmd()
moveCmd.coord = 0
moveCmd.targetPosType = nrc_interface.PosType_data
moveCmd.targetPosValue = pos
moveCmd.velocity = 20
moveCmd.acc = 20
moveCmd.dec = 20
moveCmd.pl = 5
nrc_interface.queue_motion_push_back_moveJ(socketFd, moveCmd)
nrc_interface.queue_motion_send_to_controller(socketFd, 1)
print(position)
```

#### 3. 下一步

- **接口示例 / 基础应用** — 连接、消息回调
- **接口示例 / 进阶应用** — servo_move 跟踪运动
