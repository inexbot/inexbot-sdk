# Basic Applications

Basic usage examples, suitable for users new to the C++ SDK.

## Example List

| # | File | Description |
|---|------|------|
| 1 | 1.Get-Position-in-Different-Coordinates.md | Query joint, Cartesian, tool, and user coordinate system positions |
| 2 | 2.Single-Point-Motion.md | Teach mode + power on + robot_movej single-axis movement |
| 3 | 3.Smooth-Continuous-Trajectory-Motion.md | Motion queue mode, queue dispatch + smooth transition |
| 4 | 4.Teach-Mode-Switch-and-Trajectory-Playback.md | Drag teach, trajectory recording and playback |
| 5 | 5.Tool-Calibration.md | Complete 7-point / 20-point calibration procedures |
| 6 | 6.Curve-Motion-with-Motion-Queue.md | MOVS curve interpolation, 10-point continuous trajectory |

## Prerequisites

The controller has three operating modes: teach mode, run mode, and remote mode. Motion in teach mode requires a power-on operation; run mode only requires enabling motion mode and ensuring the servo is ready.
