# Advanced Applications

Advanced usage examples, including real-time tracking control and servo position control.

## Example List

| Example | Description |
|------|------|
| Joint Control with servoJ.md | Joint space real-time tracking, open_servoJ / set_servoJ_pos / stop_servoJ |
| Servo Control Motion with star_servo_point_position_motion_control().md | Servo control mode, dispatching points per cycle |

## servoJ Joint Control

Connect to port 6000 (control/query) and port 7000 (servo tracking). Dispatch target joint angles every 10ms to achieve smooth tracking motion.

## Servo Point Position Control

Points are directly dispatched to the servo each communication cycle. Supports single-point dispatch (sum=1) and batch dispatch (up to 600 points/frame, with count accumulating to sum before motion begins).
