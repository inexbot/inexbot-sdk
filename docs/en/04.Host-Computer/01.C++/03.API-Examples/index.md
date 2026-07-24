# API Examples

C++ SDK usage examples, divided into basic and advanced applications.

## Basic Applications

Read in order. Beginners are recommended to start with the first example:

| # | Example | Description |
|---|------|------|
| 1 | Get Position in Different Coordinates | connect_robot + get_current_position |
| 2 | Single-Point Motion without Smoothing | robot_movej, single-axis movement in teach mode |
| 3 | Smooth Continuous Trajectory Motion | queue_motion series, queue-based multi-command dispatch |
| 4 | Teach Mode Type Switching and Trajectory Playback | Drag teach, trajectory recording and playback |
| 5 | Tool Hand Calibration | 7-point and 20-point tool hand calibration procedures |
| 6 | Curve Motion with Motion Queue | MOVS curve interpolation |

## Advanced Applications

| Example | Description |
|------|------|
| servoJ Joint Control | open_servoJ / set_servoJ_pos / stop_servoJ |
| servo_move Tracking Motion | Continuous trajectory smooth dispatch |
| Servo Point Position Control | servo_point_position_motion_control |
