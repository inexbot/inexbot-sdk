# Advanced Applications

## servo_move Tracking Motion

`servo_move()` receives a set of waypoints, performs smoothing based on timeStamp, and sends them to the servo for tracking motion.

### ServoMovePara Parameter Description

| Parameter | Type | Description |
|------|------|------|
| robotNum | int | Which robot to control |
| clearBuffer | bool | Whether to clear previously sent waypoints that have not started interpolation calculation |
| targetMode | int | 0-Independent point; 1-Continuous trajectory |
| sendMode | int | 0-Transmit all trajectory waypoints at once; 1-Transmit partial waypoints at once |
| runMode | int | 0-Move after receiving all; 1-Move while receiving |
| sum | int | Total number of transmissions |
| count | int | Current transmission number |
| coord | int | 0-Joint coordinate system; 1-Cartesian coordinate system |
| size | int | Number of waypoints in this transmission |
| pos | vector&lt;vector&lt;double>> | 2D array, first dimension is number of waypoints, second dimension is 7 joint angles or Cartesian coordinates |
| axisvel | vector&lt;vector&lt;double>> | Velocity of each axis |
| axisacc | vector&lt;vector&lt;double>> | Acceleration of each axis |
| timeStamp | vector&lt;double> | Time to reach each waypoint (unit: ms) |

### Prerequisites

In run mode, you need to run a job file containing the **external point command** on the controller (the external point command is responsible for receiving data transmitted by servo_move).

### Example: Continuous Trajectory One-time Transmission

```py
def test_7000(socketFd):
    print('Starting test 7000...')
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
