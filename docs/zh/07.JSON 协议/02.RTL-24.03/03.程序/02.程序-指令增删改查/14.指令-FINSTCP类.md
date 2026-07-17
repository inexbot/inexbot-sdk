# 指令-FINSTCP类

## 1. 打开FINSTCP连接

**指令名**: FINSTCP_OPEN

**说明**: 用于在运行模式下打开FINSTCP通讯连接

### 参数列表

| 参数名 | 类型 | 取值范围 | 说明 |
|--------|------|----------|------|
| ID | int | [1,9] | FINSTCP主站工艺号 |
| logout | bool | - | 是否被注释；true：在作业文件中将不执行该指令；false：未被注释，可执行 |
| type | int | 215 | 打开FINSTCP连接在枚举数列type中为210 |
| userParamInt | int | - | 二次开发中客户自定义，目前无意义 |
| userParamString | string | - | 二次开发中客户自定义，目前无意义 |
| variable | object | - | 变量对象，包含data、secondvalue、value、varname等属性 |

### JSON示例

```json
{
  "ID": 5,
  "logout": false,
  "type": 215,
  "userParamInt": 0,
  "userParamString": "",
  "variable": {
    "data": 0.0,
    "secondvalue": 0,
    "value": 0,
    "varname": ""
  }
}
```

---

## 2. 断开FINSTCP连接

**指令名**: FINSTCP_CLOSE

**说明**: 在运行模式下断开FINSTCP通讯连接

### 参数列表

| 参数名 | 类型 | 取值范围 | 说明 |
|--------|------|----------|------|
| ID | int | [1,9] | FINSTCP主站工艺号 |
| logout | bool | - | 是否被注释；true：在作业文件中将不执行该指令；false：未被注释，可执行 |
| type | int | 216 | FINSTCP_CLOSE在枚举数列type中为216 |
| userParamInt | int | - | 二次开发中客户自定义，目前无意义 |
| userParamString | string | - | 二次开发中客户自定义，目前无意义 |

### JSON示例

```json
{
  "ID": 9,
  "logout": false,
  "type": 216,
  "userParamInt": 0,
  "userParamString": ""
}
```

---

## 3. FINSTCP连接状态

**指令名**: FINSTCP_CONNECTION_STATUS

**说明**: 在运行模式下获取FINSTCP连接状态

### 参数列表

| 参数名 | 类型 | 取值范围 | 说明 |
|--------|------|----------|------|
| ID | int | [1,9] | FINSTCP主站工艺号 |
| logout | bool | - | 是否被注释；true：在作业文件中将不执行该指令；false：未被注释，可执行 |
| type | int | 217 | FINSTCP_CONNECTION_STATUS在枚举数列type中为217 |
| userParamInt | int | - | 二次开发中客户自定义，目前无意义 |
| userParamString | string | - | 二次开发中客户自定义，目前无意义 |
| variable | object | - | 变量对象 |

### variable对象

| 参数名 | 类型 | 说明 |
|--------|------|------|
| data | float | 数据值 |
| secondvalue | int | 第二个值 |
| value | int | 状态值；6表示连接 |
| varname | string | 变量名，如"GB[I001]" |

### 返回值说明

FINSTCP的连接状态；bool类型变量或绑定变量，全局或局部

- `true`：连接
- `false`：未连接

### JSON示例

```json
{
  "ID": 5,
  "logout": false,
  "type": 217,
  "userParamInt": 0,
  "userParamString": "",
  "variable": {
    "data": 0.0,
    "secondvalue": 1,
    "value": 6,
    "varname": "GB[I001]"
  }
}
```
