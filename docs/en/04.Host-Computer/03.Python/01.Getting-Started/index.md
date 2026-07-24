# Step-by-step Tutorial

This tutorial guides you through building a Python project environment from scratch, connecting to the controller, and executing basic motion commands.

## Prerequisites

Python 3.x is installed, and the SDK version matches the Python version.

## Quick Start

### 1. Prepare SDK Files

Obtain the Python version SDK from the resource download page. After extracting, you will get two files:

- `_nrc_host.so` — Dynamic library for Python interface calls
- `nrc_interface.py` — Python interface wrapper module

Place these two files in your project directory.

### 2. Connect to Controller

```py
# -*- coding: UTF-8 -*-
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

### 3. Next Steps

- **API Examples / Basic Applications** — Connection, message callbacks
- **API Examples / Advanced Applications** — servo_move tracking motion
