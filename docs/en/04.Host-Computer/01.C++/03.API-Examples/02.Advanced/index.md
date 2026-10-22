# Advanced Applications

Advanced usage examples. All three dispatch points over **port 7000 (servo tracking data channel)**. They solve the same problem — the host computer streams points in real time and the controller follows — and differ in **how the points are organized when handed to the controller** and in **who performs interpolation / smoothing**.

> ⚠️ **Safety notice:** The motion examples in this section will move the robot. Read the safety warning at the top of each page and make sure the workspace is clear and the emergency stop is within reach before running them.

## Example List

| # | Example                                                                    | Description                                                                                 |
| - | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 1 | Tracking Motion with servo_move()                                          | A batch of trajectory points with `timeStamp`; the controller smooths by timestamp          |
| 2 | Servo Control Motion with servo_point_position_motion_control()            | Points dispatched straight to the servo each cycle; 12 dimensions (robot 7 + external axes 5) |
| 3 | Joint Control with servoJ                                                  | 7-dimensional target joint angles each cycle; the controller follows under v/a/j constraints |

## Differences Between the Three Examples

| Item                | 1. servo_move()                                    | 2. servo_point_position_motion_control()                        | 3. servoJ                                            |
| ------------------- | -------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------- |
| How points are sent | A batch of points at a time (may be split into partial transfers) | Several points per frame; motion starts only when `sum` / `count` match | One 7-D target joint position per call               |
| Dimensions          | 7 (joint angles or Cartesian, set by `coord`)      | 12 (robot 7 + external axes 5)                                  | 7 (joint angles, robot 1 only)                       |
| Timestamp           | **required**, arrival time per point (ms)          | none                                                            | none, driven by the send cycle                       |
| Who smooths         | The controller smooths by `timeStamp`              | **No smoothing**, points go straight to the servo               | The controller smooths under `vmax` / `amax` / `jmax` |
| External axes       | not supported                                      | **supported** (last 5)                                          | not supported                                        |
| Enter / exit        | No mode switch; call `servo_move` directly         | Call `enable_servo_position_motion_control(fd7000, 1)` first    | Call `open_servoJ` first; always `close_servoJ` at the end |
| Extra prerequisites | A job file containing an **external point instruction** must be running on the teach pendant | Servo point position control enabled                  | Clear error → servo ready → power on, `get_servo_state` = 3 |
| Port                | 7000                                               | 7000                                                            | 7000 (data) + 6001 (power on/off, read position)     |
| Timing reference    | Pacing comes from `timeStamp` (5 ms per point in the example) | Pacing comes from the host communication cycle (up to 600 points per frame in the example) | 10 ms per point in the official example |

### In One Sentence

- **servo_move**: you hand over a **timed trajectory** and the controller interpolates and smooths it by time.
- **servo_point_position_motion_control**: you pass points **through unchanged** to the servo every cycle — external axes included, no smoothing.
- **servoJ**: you feed points in **joint space** every cycle and the controller follows them under velocity / acceleration / jerk constraints.

## When to Use Each

### servo_move(): a real-time trajectory embedded in a fixed job flow

Use when:

- The cell has **one fixed process flow** (home, pick, place, IO sequencing) and one segment of its trajectory has to be **generated in real time** (sensor, vision or host-side algorithm): the job file owns the flow skeleton, while the real-time segment is sent by the host via `servo_move()`
- A full set of points with arrival times (`timeStamp`, ms) is already known and you want the controller to interpolate and smooth them, so the host does not need to feed points in a hard real-time cycle (a single transfer or several partial ones)
- Joint space (`coord = 0`) or Cartesian space (`coord = 1`)

Do not use when: the robot body must move together with external axes; points must reach the servo without controller interpolation; or no job file may be running (this interface only moves the robot while the job's external point instruction is active).

Key parameters (`ServoMovePara`, values per the header comments):

| Parameter       | Value                            | Meaning                                                                  |
| --------------- | -------------------------------- | ------------------------------------------------------------------------ |
| `targetMode`    | 0 / 1                            | 0-discrete points, 1-continuous trajectory                                |
| `sendMode`      | 0 / 1                            | 0-send all trajectory points at once, 1-send partial points at a time    |
| `runMode`       | 0 / 1                            | 0-start motion after receiving all, 1-start motion while receiving       |
| `clearBuffer`   | true / false                     | Whether to clear previously sent points that have not started interpolation |
| `sum` / `count` | total transfers / current one    | Frame counters for partial transfers                                     |
| `coord`         | 0 / 1                            | 0-joint, 1-Cartesian                                                     |
| `size`          | number of points in this transfer | Matches the length of `pos`, `axisvel`, `axisacc` and `timeStamp`       |

Note: it works together with a job file — the job running on the teach pendant must contain an **external point instruction**; only then are the points sent by the host executed. So it is normally not a "run a trajectory standalone" interface, but a real-time trajectory segment embedded in a fixed-flow job.

### servo_point_position_motion_control(): dispatched unchanged every cycle, with external axes

Use when:

- The host computes one frame of points per communication cycle and requires them to reach the servo **unchanged** (no extra interpolation or smoothing on the controller side)
- The robot body and **external axes (positioner, track, etc.)** must move together, so the points have to be sent as 12 dimensions in one frame
- One frame carries many points (the example organizes up to 600 points per frame); `sum = 1` also allows one point per frame

Notes:

- Call `enable_servo_position_motion_control(fd7000, 1)` to enable servo point position control before sending points
- `sum` is the total number of frames and `count` starts from 1 and accumulates: the batch only starts moving **when `sum == count`**, so `sum = 1` is the "one point in, one step out" mode
- If points are sent but the robot does not move, or the buffer is full, send one frame with `end = 1` to clear the points that have not been interpolated

### servoJ: joint-space following every cycle, smoothed

Use when:

- Joint-space following where an external source gives points in real time: visual servoing, force control, sensor guidance, teleoperation, online correction
- The points are noisy or the cycle jitters: the controller smooths under `vmax` / `amax` / `jmax`, so the actual motion is more continuous than the target points

Notes:

- What you send is the **absolute target joint position**; accumulate increments locally and then send
- Keep the per-cycle increment consistent with the constraints (`vmax = 10°/s` with a 10 ms cycle means at most 0.1° per cycle)
- Send points from a dedicated thread at a fixed cycle, and **always call `close_servoJ`** at the end, otherwise the robot stays in tracking mode
- These interfaces always act on robot 1; there is no `_robot` variant

## Quick Selection

| Your situation                                                                 | Use                                                                        |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| A real-time generated trajectory segment inside a fixed-flow job (points carry timestamps) | `servo_move()`                                                    |
| Points sent every cycle, with external-axis synchronization or unchanged pass-through | `servo_point_position_motion_control()`                              |
| Joint angles sent every cycle with smooth following (vision, force, teleoperation, correction) | `servoJ`                                                          |
| Ordinary point-to-point / linear motion, no per-cycle feeding needed           | `robot_movj` / `robot_movel` etc., see "Basic Applications"                 |

> `servoJ` also provides a queue mode (`open_servoJ_queue_mode` / `append_servoJ_pos_to_queue`) that accepts a batch of points after `open_servoJ`; the examples on this page do not cover it.
