# 进阶应用

## servo_move 跟踪运动

`servo_move()` 接收一组点位，根据 timeStamp 平滑处理后下发到伺服进行跟踪运动。

### ServoMovePara 参数说明

| 参数 | 类型 | 说明 |
|------|------|------|
| robotNum | int | 控制第几个机器人 |
| clearBuffer | bool | 是否清除之前发送的、未开始插补计算的点位 |
| targetMode | int | 0-独立点；1-连续轨迹 |
| sendMode | int | 0-一次传输完全部轨迹；1-一次传输部分点位 |
| runMode | int | 0-接收完再运动；1-边接收边运动 |
| sum | int | 总传输次数 |
| count | int | 当前第几次传输 |
| coord | int | 0-关节坐标系；1-直角坐标系 |
| size | int | 本次传输的点位数 |
| pos | vector&lt;vector&lt;double>> | 二维数组，一维为点位数，二维为 7 个关节角度或笛卡尔坐标 |
| axisvel | vector&lt;vector&lt;double>> | 每个轴的速度 |
| axisacc | vector&lt;vector&lt;double>> | 每个轴的加速度 |
| timeStamp | vector&lt;double> | 到达该点位的时间（单位 ms） |

### 使用前提

运行模式下，需要在控制器上运行包含**外部点指令**的作业文件（外部点指令负责接收 servo_move 传输的数据）。

### 示例：连续轨迹一次传输

```py
def test_7000(socketFd):
    print('开启测试7000.....')
    socket_7000 = aa.connect_robot("192.168.1.13", "7000")
    servomovepara = aa.ServoMovePara()
    pos = aa.VectorVectorDouble()
    time = aa.VectorDouble()

    time_pos = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550]
    for value in time_pos:
        time.append(value)

    axis_pos = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 2, 0],
        [0, 0, 0, 0, 0, 3, 0],
        [0, 0, 0, 0, 0, 4, 0],
        [0, 0, 0, 0, 0, 5, 0],
        [0, 0, 0, 0, 0, 6, 0],
        [0, 0, 0, 0, 0, 7, 0],
        [0, 0, 0, 0, 0, 8, 0],
        [0, 0, 0, 0, 0, 9, 0],
        [0, 0, 0, 0, 0, 10, 0],
    ]
    for value in axis_pos:
        pos.append(value)

    for k in range(11):
        servomovepara.pos = pos
    for j in range(11):
        servomovepara.timeStamp = time

    servomovepara.runMode = 0
    servomovepara.clearBuffer = True
    servomovepara.targetMode = 1
    servomovepara.coord = 0
    servomovepara.size = 11

    result = aa.servo_move(socket_7000, servomovepara)
    print("return ", result)
```
