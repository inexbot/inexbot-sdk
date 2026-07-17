# OPCUA

## 上位机设置OPCUA参数

**命令字：** `0x7350`

### 参数说明

| 字段 | 类型 | 描述 |
|------|------|------|
| client | object | 客户端参数 |
| client.enable | bool | 连接使能 |
| client.ip | string | 服务器IP地址 |
| client.port | int | 端口号，范围[0,65535] |
| client.resource | string | 服务器名称 |
| server | object | 服务器参数 |
| server.enable | bool | 连接使能 |
| server.ip | string | 控制器用作服务器时的IP地址 |
| server.port | int | 端口号，范围[0,65535] |

### 请求示例

```json
{
  "client":
  {
    "enable":false,
    "ip":"192.168.1.240",
    "port":49400,
    "resource":"ProsysServer"
  },
  "server":
  {
    "enable":false,
    "ip":"192.168.0.229",
    "port":4840
  }
}
```

---

## 上位机查询OPCUA参数

**命令字：** `0x7351`

### 请求示例

```json
{}
```

---

## 控制器回复上位机OPCUA参数

**命令字：** `0x7352`

### 参数说明

| 字段 | 类型 | 描述 |
|------|------|------|
| client | object | 客户端参数 |
| client.enable | bool | 连接使能 |
| client.ip | string | 服务器IP地址 |
| client.port | int | 端口号，范围[0,65535] |
| client.resource | string | 服务器名称 |
| server | object | 服务器参数 |
| server.enable | bool | 连接使能 |
| server.ip | string | 控制器用作服务器时的IP地址 |
| server.port | int | 端口号，范围[0,65535] |

### 响应示例

```json
{
  "client":
  {
    "enable":false,
    "ip":"192.168.1.240",
    "port":49400,
    "resource":"ProsysServer"
  },
  "server":
  {
    "enable":false,
    "ip":"192.168.0.229",
    "port":4840
  }
}
```
