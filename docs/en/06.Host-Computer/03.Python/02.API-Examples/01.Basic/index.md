# Basic Applications

Python SDK basic usage examples.

## Connect to Controller

```py
import nrc_interface

socketFd = nrc_interface.connect_robot("192.168.1.13", "6001")
print(socketFd)
result = nrc_interface.get_connection_status(socketFd)
print(result)
```

## Set Error/Warning Message Callback

```py
import nrc_interface
import time

def my_callback(message_type: int, message: str, message_code: int):
    print(f"[Callback] type={message_type}, message={message}, code={message_code}")

if __name__ == "__main__":
    socketFd = nrc_interface.connect_robot("192.168.1.13", "6001")
    print(socketFd)
    result = nrc_interface.get_connection_status(socketFd)
    print(result)
    nrc_interface.set_receive_error_or_warnning_message_callback(socketFd, my_callback)
    time.sleep(1000)
```
