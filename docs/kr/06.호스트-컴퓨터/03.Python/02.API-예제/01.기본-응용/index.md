# 기본 애플리케이션

Python SDK 기본 사용 예시입니다.

## 컨트롤러 연결

```py
import nrc_interface

socketFd = nrc_interface.connect_robot("192.168.1.13", "6001")
print(socketFd)
result = nrc_interface.get_connection_status(socketFd)
print(result)
```

## 오류/경고 메시지 콜백 설정

```py
import nrc_interface
import time

def my_callback(message_type: int, message: str, message_code: int):
    print(f"[콜백] 유형={message_type}, 정보={message}, 코드={message_code}")

if __name__ == "__main__":
    socketFd = nrc_interface.connect_robot("192.168.1.13", "6001")
    print(socketFd)
    result = nrc_interface.get_connection_status(socketFd)
    print(result)
    nrc_interface.set_receive_error_or_warnning_message_callback(socketFd, my_callback)
    time.sleep(1000)
```
