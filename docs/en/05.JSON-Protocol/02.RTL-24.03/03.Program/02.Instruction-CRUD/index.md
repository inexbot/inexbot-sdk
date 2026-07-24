# Program - Instruction CRUD

### Instruction Insert

- Description:
- Before inserting an instruction, use 0x5100 to open the program. After insertion, use the program save command (0x5120).
- "cmd": This node contains the specific instruction information. See the instruction pages for details.
- Host computer sends instruction insert command
**Command:** `0x5200`
- "robot":1
- Indicates the robot number to operate on; int type, range [1,4]
- "pos":2
- Indicates the line number to insert at; int type
- "savejobfile":false
- Indicates whether to save the job file; bool type
- true: save, false: do not save
- When false is selected, 0x5120 can be used to save the job file
- "time":"2024.08.08 14:16:39"
- Indicates the time of instruction insertion; string type
- "cmd":cmd->toJson()

```json
{
  "robot":1,
  "pos":2,
  "savejobfile":false,
  "time":"2024.08.08 14:16:39",
  "cmd":cmd->toJson()
}
```
### Instruction Modification

- Indicates the inserted instruction details; see sub-pages; object type
- Description:
- After modifying the instruction, optionally use the program save command (0x5120)
- Host computer sends, modify instruction
**Command:** `0x5201`
- "robot":1
- Indicates the robot number to query; int type, range [1,4]
- "pos":[2,3,4]
- Modify instruction index; int type array
- "muti":true
- bool type; present by default with value true
- "modify_para":{}
- "VJ_ENABLE_":true
- Whether to modify joint speed; bool type
- "VJ_VALUE_":"50"
- Joint speed; string type; [1,100]%
- "V_ENABLE_":true
- Whether to modify linear speed; bool type
- "V_VALUE_":"50"
- Linear speed; string type; [1,1000]mm/s
- "PL_ENABLE_":true
- Whether to modify smoothness; bool type
- "PL_VALUE_":"3"
- Smoothness; string type; range [0,5]
- "ACC_ENABLE_":true
- Whether to modify acceleration; bool type
- "ACC_VALUE_":"50"
- Acceleration; string type; range [1,100]
- "DEC_ENABLE_":true
- Whether to modify deceleration; bool type
- "DEC_VALUE_":"50"
- Deceleration; string type; range [1,100]
- "TEC_TYPE_":1
- Parameter; int type; range [0,10]
- 0: Network Communication; 1: Palletizing Control; 2: Vision Command; 3: Laser; 4: Conveyor
- 5: Grinding Process; 6: Welding Parameters; 7: Weave Welding Parameters; 8: Intersecting Curve; 9: Search File Number; 10: Tracking File Number
- "TEC_ENABLE_":true
- Whether to modify the relevant type process number; bool type
- "TEC_VALUE_":"5"
- Relevant type process number; string type; range depends on the relevant type
- "savejobfile":false
- Whether to save the file; bool type
- true: save, false: do not save
- When false is selected, 0x5120 can be used to save the job file
- "time":"2020.02.26 10:11:06"

```json
{
    "robot": 1,
    "pos": [2,3,4],
    "modify_para":
    {
        "VJ_ENABLE_":true,
        "VJ_VALUE_":"50",
        "V_ENABLE_":true,
        "V_VALUE_":"50",
        "PL_ENABLE_":true,
        "PL_VALUE_":"3",
        "ACC_ENABLE_":true,
        "ACC_VALUE_":"50",
        "DEC_ENABLE_":true,
        "DEC_VALUE_":"50",
        "TEC_TYPE_":1,
        "TEC_ENABLE_":true,
        "TEC_VALUE_":"5"
    }
    "savejobfile": false,
    "time": "2024.11.06 09:56:28"
}
```
### Delete Instruction

- Timestamp; string type
- Description:
- After deleting the instruction, use the program save command (0x5120)
- "cmd": This node contains the specific instruction information. See the instruction pages for details.
- Host computer sends, delete instruction
**Command:** `0x5202`
- "pos":1
- Modify instruction index; int type
- "robot":1
- Indicates the robot number to query; int type, range [1,4]
- "time":"2020.02.26 10:11:06"
- Timestamp; string type
- "savejobfile":false
- Whether to save the file; bool type

```json
{
    "pos": 5,
    "robot": 1,
    "time": "2024.11.06 09:56:28",
    "savejobfile": false
}
```
### Comment Instruction

- true: save, false: do not save
- When false is selected, 0x5120 can be used to save the job file
- Description:
- When both "store" and "savejobfile" are true, current changes are saved directly
- Host computer sends, comment instruction
**Command:** `0x5203`
- "logout_rows":[1,2,3]
- Modify instruction index; int type array
- "robot":1
- Indicates the robot number to query; int type, range [1,4]
- "store":true
- Whether to store the current modification
- When "store" exists and value is true, "time" and "savejobfile" nodes are present
- "time":"2020.02.26 10:11:06"
- Timestamp; string type
- "savejobfile":false
- Whether to save the file; bool type

```json
{
    "logout_rows":[1,2,3],
    "robot": 1,
    "store":true,
    "time": "2024.11.06 09:56:28",
    "savejobfile": false
}
```
### External Key Delete Instruction Info

- true: save, false: do not save
- When false is selected, 0x5120 can be used to save the job file
- Controller replies to teach pendant external key delete instruction info
**Command:** `0x5208`
- "jobName":""
- string type, name of the job whose instructions need to be deleted
- "pos":10
- int type, position of the instruction to delete
- "clearAll":false

```json
{
    "jobName":"",
    "pos":10,
    "clearAll":false
}
```
- bool type, whether to delete all job instructions

