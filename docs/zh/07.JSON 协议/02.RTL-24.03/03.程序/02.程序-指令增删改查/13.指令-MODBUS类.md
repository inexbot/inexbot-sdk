# 指令-MODBUS类

---

## MODBUS_OPEN - 打开Modbus连接

### 说明

打开Modbus通讯连接

### 参数列表

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| ID | int | 是 | Modbus主站工艺号，取值范围[1,9] |
| logout | bool | 否 | 是否被注释。true：在作业文件中将不执行该指令；false：未被注释，可执行 |
| modType | string | 是 | 主站/从站。"Master"：主站；"Slave"：从站 |
| type | int | 是 | MODBUS_OPEN在枚举数列type中为210 |
| userParamInt | int | 否 | 二次开发中客户自定义，目前无意义 |
| userParamString | string | 否 | 二次开发中客户自定义，目前无意义 |

### 示例

```json
{
  "ID": 5,
  "logout": false,
  "modType": "Master",
  "type": 210,
  "userParamInt": 0,
  "userParamString": ""
}
```

---

## MODBUS_CLOSE - 关闭Modbus连接

### 说明

断开Modbus通讯连接

### 参数列表

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| ID | int | 是 | Modbus主站工艺号，取值范围[1,9] |
| logout | bool | 否 | 是否被注释。true：在作业文件中将不执行该指令；false：未被注释，可执行 |
| modType | string | 是 | 主站/从站。"Master"：主站；"Slave"：从站 |
| type | int | 是 | MODBUS_CLOSE在枚举数列type中为211 |
| userParamInt | int | 否 | 二次开发中客户自定义，目前无意义 |
| userParamString | string | 否 | 二次开发中客户自定义，目前无意义 |

### 示例

```json
{
  "ID": 9,
  "logout": false,
  "modType": "Master",
  "type": 211,
  "userParamInt": 0,
  "userParamString": "",
  "variable": {"data": 0.0, "secondvalue": 0, "value": 0, "varname": ""}
}
```

---

## MODBUS_CONNECTION_STATUS - 获取Modbus连接状态

### 说明

将Modbus通讯连接的状态存入变量，连接成功该变量值被赋值为1，连接失败选择的该变量被赋值为0

### 参数列表

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| ID | int | 是 | Modbus主站工艺号，取值范围[1,9] |
| logout | bool | 否 | 是否被注释。true：在作业文件中将不执行该指令；false：未被注释，可执行 |
| modType | string | 是 | 主站/从站。"Master"：主站；"Slave"：从站 |
| type | int | 是 | 获取Modbus连接状态在枚举数列type中为212 |
| userParamInt | int | 否 | 二次开发中客户自定义，目前无意义 |
| userParamString | string | 否 | 二次开发中客户自定义，目前无意义 |

### 示例

```json
{
  "ID": 1,
  "logout": false,
  "modType": "Master",
  "type": 212,
  "userParamInt": 0,
  "userParamString": "",
  "variable": {"data": 0.0, "secondvalue": 1, "value": 6, "varname": "GB[GI001]"}
}
```

---

## MODBUS_READ - Modbus读状态

### 说明

读取Modbus中对应地址的数值。将获取到的状态存入到变量（bool类型变量或绑定变量，全局或局部）。

**地址类型说明：**

| 地址类型 | 说明 |
|----------|------|
| 3x | 读取Modbus中对应地址的值 |
| 4x | 同3x |
| 3x-bit | 读取所选地址中所存值得任一bit的状态 |
| 4x-bit | 同3x-bit |
| 0x | 可读可写的设备类型，相当于操作PLC的输出点 |
| 1x | 只读设备类型，相当于操作PLC的输入点 |

**地址类型为3X-bit时从站地址个数范围是[0,16]**

**地址类型为3X-bit，存到变量时候的17位为符号位，0表示正数，1表示负数**

**读取字符时会将读取到的所有值存入到一个变量，它跟整型、浮点型、布尔型变量不一样，不会根据设置的首地址，读从站地址个数顺延存入其它变量**

### 参数列表

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| ID | int | 是 | Modbus主站工艺号，取值范围[1,9] |
| addressNumber | object | 是 | 读从站地址个数。手填或者int类型变量或绑定变量，全局或局部。读取的地址个数，如果设置的读从站地址个数为3，执行读指令后会从Modbus首地址开始读取3个地址（包含首地址一共读3个） |
| addressType | string | 是 | 地址类型。可选取值：3x，4x，3x-bit，4x-bit，0x，1x |
| dataType | string | 是 | 数据类型。当数据存放的首个变量选I或GI时，从站的数据类型可选short和ushort（分别对应短整型和无符号短整型，前者范围为[-32768,32767]，后者的范围为[0,65535]）。数据存放首个变量选I或GI数据类型时需要和从站的数据类型一致，否则可能导致数据出错 |
| dataVariable | object | 是 | 数据存放的首个变量。所有变量或绑定变量都可。将读取到的参数存放到变量，如果选择的首个变量为I001，读取的地址个数为3，执行读指令会把参数值依次存入到I001、I002、I003 |
| firstAddress | object | 是 | 从站寄存器首地址。手填或int类型变量或绑定变量，全局或局部。根据指令参数里面设置的首地址读取参数值，如果参数里面设置的首地址是5，在执行读指令后会从Modbus第5个地址开始读 |
| logout | bool | 否 | 是否被注释。true：在作业文件中将不执行该指令；false：未被注释，可执行 |
| modType | string | 是 | 主站/从站。"Master"：主站；"Slave"：从站 |
| type | int | 是 | MODBUS_READ在枚举数列type中为213 |
| userParamInt | int | 否 | 二次开发中客户自定义，目前无意义 |
| userParamString | string | 否 | 二次开发中客户自定义，目前无意义 |

### 示例

```json
{
  "ID": 3,
  "addressNumber": {"data": 0.0, "secondvalue": 1, "value": 4, "varname": "GI[I001]"},
  "addressType": "4x-bit",
  "dataType": "short",
  "dataVariable": {"data": 0.0, "secondvalue": 1, "value": 9, "varname": "GS[GI001]"},
  "firstAddress": {"data": 0.0, "secondvalue": 1, "value": 4, "varname": "GI[GI001]"},
  "logout": false,
  "modType": "Master",
  "type": 213,
  "userParamInt": 0,
  "userParamString": ""
}
```

---

## MODBUS_WRITE - Modbus写操作

### 说明

该指令用于通过Modbus将变量写入从站寄存器中对应位置的地址中

**地址类型说明：**

| 地址类型 | 说明 |
|----------|------|
| 4x | 将变量里的值写入地址码 |
| 4x-bit | 将变量组成16位二进制码写入地址码中 |
| 0x | 将变量值写入地址码，只有"0"，"1"两种状态，变量有值的话写入1，变量没值写入0 |

### 参数列表

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| ID | int | 是 | Modbus主站工艺号，取值范围[1,9] |
| addressNumber | object | 是 | 读从站地址个数。手填或者int类型变量或绑定变量，全局或局部。读取的地址个数，如果设置的读从站地址个数为3，执行读指令后会从Modbus首地址开始读取3个地址（包含首地址一共读3个） |
| addressType | string | 是 | 地址类型。可选取值：4x，4x-bit，0x |
| dataVariable | object | 是 | 数据存放的首个变量，写入的变量类型。手填或者所有变量或绑定变量都可 |
| firstAddress | object | 是 | 从站寄存器首地址。手填或int类型变量或绑定变量，全局或局部。开始写入的第一个地址，如果首地址为5，执行写指令会从modbus第5个地址开始写入 |
| logout | bool | 否 | 是否被注释。true：在作业文件中将不执行该指令；false：未被注释，可执行 |
| modType | string | 是 | 主站/从站。"Master"：主站；"Slave"：从站 |
| type | int | 是 | MODBUS_WRITE在枚举数列type中为214 |
| userParamInt | int | 否 | 二次开发中客户自定义，目前无意义 |
| userParamString | string | 否 | 二次开发中客户自定义，目前无意义 |

### 示例

```json
{
  "ID": 5,
  "addressNumber": {"data": 0.0, "secondvalue": 0, "value": 1, "varname": "I001"},
  "addressType": "0x",
  "dataVariable": {"data": 0.0, "secondvalue": 1, "value": 4, "varname": "GI[GI001]"},
  "firstAddress": {"data": 0.0, "secondvalue": 1, "value": 1, "varname": "I[GI001]"},
  "logout": false,
  "modType": "Master",
  "type": 214,
  "userParamInt": 0,
  "userParamString": ""
}
```
