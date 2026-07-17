# 程序-指令增删改查

### 指令插入

- 说明：
- 在指令插入前需要使用0x5100打开程序，插入后需要使用程序保存的命令，保存的命令为0x5120
- "cmd":该节点为指令的具体信息，详情查看指令页面
- 上位机下发插入指令
**命令字：** `0x5200`
- "robot":1
- 表示要操作的机器人编号；int类型，取值范围[1,4]
- "pos":2
- 表示插入的行号；int类型
- "savejobfile":false
- 表示是否保存作业文件；bool类型
- true:保存，false：不保存；
- 当选择false时可以使用0x5120保存作业文件
- "time":"2024.08.08 14:16:39"
- 表示插入指令的时间；string类型
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
### 指令修改

- 表示插入的指令详情，见子页面；object类型
- 说明：
- 在指令修改后可选择使用程序保存的命令，保存的命令为0x5120
- 上位机下发，修改指令
**命令字：** `0x5201`
- "robot":1
- 表示要查询的机器人编号；int类型，取值范围[1,4]
- "pos":[2,3,4]
- 修改指令索引；int类型数组
- "muti":true
- bool类型；默认存在并值为true
- "modify_para":{}
- "VJ_ENABLE_":true
- 是否修改关节速度；bool类型
- "VJ_VALUE_":"50"
- 关节速度；string类型；[1,100]%
- "V_ENABLE_":true
- 是否修改线速度；bool类型
- "V_VALUE_":"50"
- 线速度；string类型；[1,1000]mm/s
- "PL_ENABLE_":true
- 是否修改平滑；bool类型
- "PL_VALUE_":"3"
- 平滑；string类型；取值范围[0,5]
- "ACC_ENABLE_":true
- 是否修改加速度；bool类型
- "ACC_VALUE_":"50"
- 加速度；string类型；取值范围[1,100]
- "DEC_ENABLE_":true
- 是否修改减速度；bool类型
- "DEC_VALUE_":"50"
- 减速度；string类型；取值范围[1,100]
- "TEC_TYPE_":1
- 参数；int类型；取值范围[0,10]
- 0:网络通信类；1：码垛控制类；2：视觉命令类；3：激光类；4：传送带类
- 5：打磨工艺类；6：焊接参数；7：摆焊参数；8：相贯线；9：寻件文件号；10：跟踪文件号
- "TEC_ENABLE_":true
- 是否修改相关类型工艺号；bool类型
- "TEC_VALUE_":"5"
- 相关类型工艺号；string类型；取值范围与相关类型有关
- "savejobfile":false
- 是否保存文件；bool类型
- true保存，false不保存
- 当选择false时可以使用0x5120保存作业文件
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
### 删除指令

- 时间戳；string类型
- 说明：
- 在指令删除后需要使用程序保存的命令，保存的命令为0x5120
- "cmd":该节点为指令的具体信息，详情查看指令页面
- 上位机下发，删除指令
**命令字：** `0x5202`
- "pos":1
- 修改指令索引；int类型
- "robot":1
- 表示要查询的机器人编号；int类型，取值范围[1,4]
- "time":"2020.02.26 10:11:06"
- 时间戳；string类型
- "savejobfile":false
- 是否保存文件；bool类型

```json
{
    "pos": 5,
    "robot": 1,
    "time": "2024.11.06 09:56:28",
    "savejobfile": false
}
```
### 注释指令

- true保存，false不保存
- 当选择false时可以使用0x5120保存作业文件
- 说明：
- 当"store"和"savejobfile"都为true时直接保存当前
- 上位机下发，注释指令
**命令字：** `0x5203`
- "logout_rows":[1,2,3]
- 修改指令索引；int类型数组
- "robot":1
- 表示要查询的机器人编号；int类型，取值范围[1,4]
- "store":true
- 是否存储当前修改
- 当"store"存在，并且值为true时存在"time","savejobfile"节点
- "time":"2020.02.26 10:11:06"
- 时间戳；string类型
- "savejobfile":false
- 是否保存文件；bool类型

```json
{
    "logout_rows":[1,2,3],
    "robot": 1,
    "store":true,
    "time": "2024.11.06 09:56:28",
    "savejobfile": false
}
```
### 外部按键删除指令信息

- true保存，false不保存
- 当选择false时可以使用0x5120保存作业文件
- 控制器回复示教器外部按键删除指令信息
**命令字：** `0x5208`
- "jobName":""
- string类型，需要删除指令的作业名称
- "pos":10
- int类型，需要删除的指令位置
- "clearAll":false

```json
{
    "jobName":"",
    "pos":10,
    "clearAll":false
}
```
- bool类型，是否删除全部作业指令
```