# JSON Protocol

## Packet Format

All packets specified in this protocol adopt the standard TLV (Type, Length, Value) format, including a fixed start header and CRC checksum.

| Item    | Length (Byte) | Description                                                         |
|---------|-------------|--------------------------------------------------------------|
| SyncByte | 2           | Fixed header `0x4E66`                                            |
| Length  | 2           | Hex length 0~2000; excludes header, command word, and CRC segments             |
| Command | 2           | Command word                                                       |
| data    | Length      | Data segment (primarily JSON format)                                   |
| CRC     | 4           | CRC32 checksum over all data excluding the header                             |

The data segment is primarily in JSON data format.

### Example

To set Robot 1 servo status to 0, send the following data (hexadecimal):

```
4e 66 00 17 20 01 7b 22 72 6f 62 6f 74 22 3a 31 2c 22 73 74 61 74 75 73 22 3a 30 7d 0a 6b 92 6d ff
```

Data segment breakdown:

| Field     | Content                                                         |
|----------|--------------------------------------------------------------|
| `4e 66`  | Fixed header                                                     |
| `00 17`  | Data segment length (23 bytes)                                         |
| `20 01`  | Command word                                                       |
| `7b...7d 0a` | Data segment, corresponds to ASCII string `{"robot":1,"status":0}\n` (`0x0a` is newline, optional) |
| `6b 92 6d ff` | CRC32 checksum                                              |

Data segment ASCII mapping:

```
7b  -->  {
22  -->  "
72  -->  r
6f  -->  o
62  -->  b
6f  -->  o
74  -->  t
22  -->  "
3a  -->  :
31  -->  1
2c  -->  ,
22  -->  "
73  -->  s
74  -->  t
61  -->  a
74  -->  t
75  -->  u
73  -->  s
22  -->  "
3a  -->  :
30  -->  0
7d  -->  }
0a  -->  newline (optional)
```

If the final `0x0a` newline is omitted, the transmitted data becomes:

```
4e 66 00 16 20 01 7b 22 72 6f 62 6f 74 22 3a 31 2c 22 73 74 61 74 75 73 22 3a 30 7d 53 dd eb 72
```

## Controller Ports

| Port  | Protocol   | Usage                                                         |
|-------|--------|--------------------------------------------------------------|
| 5000  | TCP    | Transfer import/export job files, configuration files, software upgrades; large job file transfers can also use FTP |
| 6000  | TCP    | Regular command transmission, primarily for teach pendant and other program development                       |
| 7000  | TCP/UDP | Receive status broadcast information, no heartbeat mechanism required                                |

## Heartbeat Mechanism

After establishing a 5000/6000 communication port connection, a heartbeat mechanism must be designed to ensure the communication status remains normal.

**Process:**

1. The teach pendant periodically sends heartbeat check packets to the controller
2. Upon receiving the heartbeat packet, the controller replies with a heartbeat response packet containing the timestamp carried in the check packet
3. The teach pendant checks whether the data in the response packet is correct
4. If the data is incorrect or a timeout occurs without receiving a response, the connection is considered potentially interrupted

**Heartbeat Timeout: 6 seconds**
