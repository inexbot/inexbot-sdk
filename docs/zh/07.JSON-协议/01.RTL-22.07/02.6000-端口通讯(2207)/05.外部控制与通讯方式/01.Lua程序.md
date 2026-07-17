# Lua程序

Lua文件存放在 `~/robot/job/lua` 目录内。

上传文件和查看文件列表用 SCP 的方式。

## 运行程序

**上位机发送：0x2511**

```json
{
  "fileName": "xxx.lua"
}
```

**控制器返回：0x2512**

```json
{
  "fileName": "xxx.lua",
  "result": true,
  "error": "错误原因"
}
```

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| fileName | string | 是 | Lua文件名 |
| result | bool | 是 | 运行是否成功 |
| error | string | 是 | 错误原因，成功时为空字符串 |

---

## 停止程序

**上位机发送：0x2513**

```json
{
  "fileName": "xxx.lua"
}
```

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| fileName | string | 是 | Lua文件名 |

---

## 当前运行

**上位机发送：0x2515**

```json
{}
```

**控制器回复：0x2516**

```json
{
  "fileNames": [
    {
      "fileName": "xxx.lua",
      "status": 1
    }
  ]
}
```

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| fileNames | array | 是 | 运行中的文件列表 |
| fileNames[].fileName | string | 是 | Lua文件名 |
| fileNames[].status | int | 是 | 1-暂停，2-运行 |
